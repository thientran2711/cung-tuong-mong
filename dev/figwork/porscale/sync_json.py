#!/usr/bin/env python3
"""porscale/sync_json.py: keep the face-box manifests in step with the re-cropped portraits.
usage: python3 sync_json.py <plan.json> <recrop.json> <measure-before.json> <in dir with POR_FACE2/veil-fit/scar-fit/toil-fit .json> <out dir>
Each re-cropped picture moved its pixels by x' = tx + (x - cx) * s (fractions of W; same for y with cy, ty):
 - veil-fit.json / scar-fit.json  por-* [left%, top%, width%, height%, rot]   -> box moved + scaled (rot kept)
 - toil-fit.json                  por-* [mouthX, mouthY, cheekLX, cheekLY, cheekRX, cheekRY, faceW, faceH, aspect, rot] (%) -> points moved, sizes scaled
 - POR_FACE2.json (jkpor)         EVERY por-* [faceTop, faceH, faceX, opaqueTop, bodyX]: faceH = the group's Haar-equivalent target
   (group median of old Haar faceH / landmark faceH  x  target), faceTop/faceX = group target, opaqueTop = group median, bodyX = group tx
   -> jkpor gives everyone in a group the same zoom and lift (no per-picture Haar noise). fig-* entries are never touched."""
import sys, os, json
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from groups import group
def main(pj, rj, mj, ind, outd):
    P = json.load(open(pj)); plan, G = P['plan'], P['groups']; R = json.load(open(rj)); M = json.load(open(mj))
    done = {n: plan[n] for n in R if n in plan and not any(f.startswith(('ERR', 'no-fig', 'fig-mismatch')) for f in R[n].get('flags', []))}
    X = lambda p, x: p['tx'] + (x - p['cx']) * p['s']
    Y = lambda p, y: p['ty'] + (y - p['cy']) * p['s']
    os.makedirs(outd, exist_ok=True); rep = {}
    for fn in ('veil-fit', 'scar-fit'):
        d = json.load(open(os.path.join(ind, fn + '.json'))); c = 0
        for k, v in d.items():
            n = k[:-5]
            if n in done:
                p = done[n]; l, t, w, h, r = v; cxb, cyb = (l + w / 2) / 100, (t + h / 2) / 100
                w2, h2 = w * p['s'], h * p['s']
                d[k] = [round(X(p, cxb) * 100 - w2 / 2, 1), round(Y(p, cyb) * 100 - h2 / 2, 1), round(w2, 1), round(h2, 1), r]; c += 1
        json.dump(d, open(os.path.join(outd, fn + '.json'), 'w'), separators=(',', ':'), sort_keys=True); rep[fn] = c
    d = json.load(open(os.path.join(ind, 'toil-fit.json'))); c = 0
    for k, v in d.items():
        n = k[:-5]
        if n in done:
            p = done[n]; v = list(v)
            for i in (0, 2, 4): v[i] = round(X(p, v[i] / 100) * 100, 2)
            for i in (1, 3, 5): v[i] = round(Y(p, v[i] / 100) * 100, 2)
            v[6] = round(v[6] * p['s'], 2); v[7] = round(v[7] * p['s'], 2); d[k] = v; c += 1
    json.dump(d, open(os.path.join(outd, 'toil-fit.json'), 'w'), separators=(',', ':'), sort_keys=True); rep['toil-fit'] = c
    old = json.load(open(os.path.join(ind, 'POR_FACE2.json')))['f']
    byg = {}
    for n in M: byg.setdefault(group(n), []).append(n)
    F = {}
    for g, L in byg.items():
        gg = G[g]; T = gg['T']
        rat = [old[n[4:]][1] / M[n]['fh'] for n in L if n[4:] in old and 0 < old[n[4:]][1] <= .40 and M[n].get('ok') == 1 and n not in done]
        if len(rat) < 3: rat = [old[n[4:]][1] / M[n]['fh'] for n in M if n[4:] in old and 0 < old[n[4:]][1] <= .40 and M[n].get('ok') == 1]
        kg = float(np.median(rat)); fh = round(kg * T, 3)
        tops = []
        for n in L:
            t = M[n].get('top', 0)
            if n in done: t = max(0.0, Y(done[n], t)) if t > 0 else 0.0
            if t > 0: tops.append(t)
        top = round(float(np.median(tops)), 3) if tops else .02
        ft = round(gg['ty'] - fh * .55, 3)  # Haar box top sits ~.55 of its height above the landmark face centre (not read by jkpor)
        for n in L: F[n[4:]] = [ft, fh, round(gg['tx'], 3), top, round(gg['tx'], 3)]
        rep['POR_FACE2:' + g] = dict(haar_ratio=round(kg, 3), faceH=fh, top=top)
    json.dump({'v': 2, 'f': F}, open(os.path.join(outd, 'POR_FACE2.json'), 'w'), separators=(',', ':'))
    rep['POR_FACE2'] = len(F); rep['recropped_ok'] = len(done)
    print(json.dumps(rep, indent=1))
if __name__ == '__main__': main(*sys.argv[1:6])
