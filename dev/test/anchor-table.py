#!/usr/bin/env python3
"""ONE anchor table per face picture (owner 17/11, toil-reveal-fix; repeat of OD:L1482): offline sanity check of every player-face picture's anchors.
For every por-/fig- picture of the 32 consort faces + the old player looks (dev/art/mkfit/*.json = img/mk-fit, dev/art/toil-fit2.json = img/toil-fit2.json):
  1. both eyes sit above the lips, both brows above their eye, the eye line is level within 25 degrees, the eye distance is a plausible share of the face width;
  2. the toil-fit mouth (what places the mirror / reveal) is within 10 % of the face width of the face-mesh lip centre (the two tables never disagree);
  3. the independent whole-picture face mesh agreed or the points were replaced by it (dev/art/mkfit/verify.py, needs mediapipe, run when pictures change).
usage: python3 dev/test/anchor-table.py   (exit 1 + the list of bad pictures)"""
import json, glob, math, os, re, sys
ROOT = os.environ.get("ANCHOR_ROOT") or os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../.."))   # ANCHOR_ROOT = the worktree whose data is checked (quickcheck hook)
fit = json.load(open(os.path.join(ROOT, "dev/art/toil-fit2.json"))); fit = fit.get("fit", fit)
mk = {}
for f in glob.glob(os.path.join(ROOT, "dev/art/mkfit/consort-*.json")) + glob.glob(os.path.join(ROOT, "dev/art/mkfit/player-*.json")): mk.update(json.load(open(f)))
import statistics
AK = {}
for n, t in fit.items(): AK.setdefault(re.sub(r"-[a-z0-9]+-a\d+\.webp$", "", n), []).append(t[8])   # picture aspect (H/W) per face + kind (por / fig); a picture without a toil-fit row borrows it
bad = []
for n, v in sorted(mk.items()):
    t = fit.get(n)
    if len(v) < 120: bad.append((n, "short")); continue
    A = t[8] if t else statistics.median(AK.get(re.sub(r"-[a-z0-9]+-a\d+\.webp$", "", n), [1.3]))
    P = [(v[2 * i] / 40, v[2 * i + 1] / 40 * A) for i in range(60)]
    c = lambda a, b: (sum(p[0] for p in P[a:b]) / (b - a), sum(p[1] for p in P[a:b]) / (b - a))
    lip, e1, e2, b1, b2 = c(0, 12), c(20, 30), c(30, 40), c(40, 50), c(50, 60)
    ed = math.hypot(e1[0] - e2[0], e1[1] - e2[1])
    why = []
    mx, my = (e1[0] + e2[0]) / 2, (e1[1] + e2[1]) / 2
    if not (lip[1] > max(e1[1], e2[1]) + .5 * ed): why.append("lips not below eyes")
    elif not (.55 < (lip[1] - my) / ed < 1.7 and abs(lip[0] - mx) < .5 * ed): why.append("lips %.2f eye-distances below the eyes / %.2f off centre (chin or nose?)" % ((lip[1] - my) / ed, (lip[0] - mx) / ed))
    if not (b1[1] < e1[1] and b2[1] < e2[1]) and not (b1[1] < e2[1] and b2[1] < e1[1]): why.append("brows not above eyes")
    if abs(math.degrees(math.atan2(e2[1] - e1[1], e2[0] - e1[0]))) > 25 and abs(math.degrees(math.atan2(e1[1] - e2[1], e1[0] - e2[0]))) > 25: why.append("eye line tilted")
    if t:
        if not (.22 < ed / t[6] < 1.1): why.append("eye distance %.2f of face width" % (ed / t[6]))
        d = math.hypot(lip[0] - t[0], lip[1] - t[1] * A) / t[6]
        if d > .10: why.append("toil-fit mouth %.0f%% of face width off the mesh lips" % (d * 100))
    if why: bad.append((n, "; ".join(why)))
print("pictures", len(mk), "bad", len(bad))
for b in bad[:60]: print(" ", *b)
sys.exit(1 if bad else 0)
