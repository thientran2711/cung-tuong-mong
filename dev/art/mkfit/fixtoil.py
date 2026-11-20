#!/usr/bin/env python3
"""Whole-class fix of img/toil-fit.json from the face-mesh anchors (review/mk-colour): a picture whose measured mouth (colour centroid) sits
more than THR of the face width away from the face-mesh lip centre gets its whole point set moved onto the lips (mouth + both cheeks move
together, the approved cheek layout kept); a face width off by > 25 % from the median face-width / eye-distance ratio is rescaled about the mouth.
usage: python3 -I dev/art/mkfit/fixtoil.py [--dry] [--fit F] [--mk DIR] [--out F]   (default: reads img/mk-fit/*.json, writes dev/art/toil-fit.json + img/toil-fit.json;
       toil-reveal-fix 17/11: --fit toil-fit2.json --mk <corrected mk-fit dir> --out toil-fit2.json re-seats every mouth the corrected face-mesh points moved)"""
import json, glob, math, os, sys, statistics
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../.."))
THR = .10
_a = sys.argv[1:]; _g = lambda k, d=None: _a[_a.index(k) + 1] if k in _a else d
FITF = _g("--fit", os.path.join(ROOT, "dev/art/toil-fit.json")); MKD = _g("--mk", os.path.join(ROOT, "img/mk-fit")); OUTF = _g("--out")
fit = json.load(open(FITF)); fit = fit.get("fit", fit)
mk = {}
for f in glob.glob(os.path.join(MKD, "*.json")):
    if os.path.basename(f) != "md5.json": mk.update(json.load(open(f)))
def geo(n):
    v, t = mk[n], fit[n]; A = t[8]
    P = [(v[2 * i] / 40, v[2 * i + 1] / 40 * A) for i in range(60)]   # % of width on both axes
    lc = [sum(p[0] for p in P[:12]) / 12, sum(p[1] for p in P[:12]) / 12]
    ea = [sum(p[0] for p in P[20:30]) / 10, sum(p[1] for p in P[20:30]) / 10]; eb = [sum(p[0] for p in P[30:40]) / 10, sum(p[1] for p in P[30:40]) / 10]
    return lc, math.hypot(ea[0] - eb[0], ea[1] - eb[1])
rows = []
for n in mk:
    if n not in fit: continue
    lc, ed = geo(n); t = fit[n]; A = t[8]
    rows.append((n, math.hypot(lc[0] - t[0], lc[1] - t[1] * A) / t[6], t[6] / ed, lc))
ratio = statistics.median(r[2] for r in rows if r[1] < .05)
before = {k: sum(r[1] > k for r in rows) for k in (.08, .10, .12, .18)}
fixed = 0
for n, d, rr, lc in rows:
    t = fit[n]; A = t[8]; s = 1.0
    if abs(rr / ratio - 1) > .25 and d > THR: s = ratio / rr
    if d <= THR and s == 1.0: continue
    mx, my = lc[0], lc[1] / A
    def mv(x, y):  # cheek relative to the old mouth, scaled, onto the new mouth (in % width / % width*A space)
        return [round(mx + (x - t[0]) * s, 2), round((my * A + (y - t[1]) * A * s) / A, 2)]
    fit[n] = [round(mx, 2), round(my, 2)] + mv(t[2], t[3]) + mv(t[4], t[5]) + [round(t[6] * s, 2), round(t[7] * s, 2), t[8], t[9]]
    fixed += 1
after = {}
for k in (.08, .10, .12, .18):
    c = 0
    for n, d, rr, lc in rows:
        t = fit[n]; c += math.hypot(lc[0] - t[0], lc[1] - t[1] * t[8]) / t[6] > k
    after[k] = c
print(json.dumps({"pictures": len(rows), "ratio fw/eye": round(ratio, 3), "fixed": fixed, "mouth off > k·face width, before": before, "after": after}))
if "--dry" not in sys.argv:
    for p in ([OUTF] if OUTF else [os.path.join(ROOT, "dev/art/toil-fit.json"), os.path.join(ROOT, "img/toil-fit.json")]):
        json.dump(fit, open(p, "w"), separators=(",", ":"))
