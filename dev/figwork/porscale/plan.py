#!/usr/bin/env python3
"""porscale/plan.py: per GROUP target face height + face centre, and the list of portraits to re-crop.
usage: python3 plan.py <measure.json> <plan.json> [tolS=.04] [tolY=.015] [tolX=.025]
Target face height T = median forehead->chin height of the group (children = sons + daughters: median of the big-face close-ups, fh >= .265,
owner 15/11: "zoom the small-face boys to match the big-face ones"; coordinator: daughters on the same target). Target centre (tx, ty) = group median. A portrait is re-cropped when its face
height is off by more than tolS (relative) or its face centre by more than tolY / tolX (fraction of H / W); the others stay byte-identical.
Faces measured < .6 T or > 1.6 T, or without landmarks, are not touched and are listed as 'suspect'."""
import sys, os, json
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from groups import group
BIG_BOYS = .265
def main(mj, out, tolS=.04, tolY=.015, tolX=.025):
    tolS, tolY, tolX = float(tolS), float(tolY), float(tolX)
    M = json.load(open(mj)); G = {}
    for k, v in M.items(): G.setdefault(group(k), []).append(k)
    groups, plan, suspect = {}, {}, {}
    for g, L in sorted(G.items()):
        ok = [k for k in L if M[k].get('ok') == 1]
        fh = np.array([M[k]['fh'] for k in ok])
        ref = [k for k in ok if M[k]['fh'] >= BIG_BOYS] if g == 'children' else ok
        T = float(np.median([M[k]['fh'] for k in ref]))
        tx = float(np.median([M[k]['cx'] for k in ok])); ty = float(np.median([M[k]['cy'] for k in ok]))
        n_re = 0
        for k in L:
            v = M[k]
            if v.get('ok') != 1 or not (.6 * T <= v['fh'] <= 1.6 * T): suspect[k] = v; continue
            if abs(v['fh'] / T - 1) > tolS or abs(v['cy'] - ty) > tolY or abs(v['cx'] - tx) > tolX:
                plan[k] = dict(s=T / v['fh'], cx=v['cx'], cy=v['cy'], tx=tx, ty=ty, top=v.get('top', 0), g=g); n_re += 1
        groups[g] = dict(n=len(L), T=round(T, 4), tx=round(tx, 4), ty=round(ty, 4), recrop=n_re, ref=len(ref),
                         before=[round(float(fh.min()), 4), round(float(np.percentile(fh, 5)), 4), round(float(np.median(fh)), 4), round(float(np.percentile(fh, 95)), 4), round(float(fh.max()), 4)],
                         zoom_in=sum(1 for k in plan if plan[k]['g'] == g and plan[k]['s'] > 1), zoom_out=sum(1 for k in plan if plan[k]['g'] == g and plan[k]['s'] < 1))
    json.dump(dict(tol=[tolS, tolY, tolX], groups=groups, plan={k: {a: (round(b, 4) if isinstance(b, float) else b) for a, b in v.items()} for k, v in plan.items()},
                   suspect=suspect), open(out, 'w'), indent=0, sort_keys=True)
    for g, s in groups.items(): print(g, s)
    print('recrop', len(plan), 'suspect', len(suspect))
if __name__ == '__main__': main(*sys.argv[1:])
