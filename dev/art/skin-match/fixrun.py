#!/usr/bin/env python3
"""fixrun.py BASE.json BASEDIR OUTDIR REC.jsonl NAME...  — fix neck/hands of each fig (full-res re-measure) + the matching por neck.
BASE.json = {"neck":[da,db],"hands":[da,db],"thr":[ta,tb]} natural face-minus-region offsets from calibrate.py.
A region is changed only per fix.shift_for (face rosier than the region by >= 2.5 a* beyond the natural offset). por-<same id> (if present in BASEDIR) gets the fig's neck shift."""
import sys, os, json, numpy as np, cv2
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import seg, measure, fix
base = json.load(open(sys.argv[1])); bd, od, rec = sys.argv[2], sys.argv[3], sys.argv[4]; os.makedirs(od, exist_ok=True)
ta, tb = base["thr"]; done = set()
if os.path.exists(rec): done = {json.loads(l)["f"] for l in open(rec)}
fo = open(rec, "a")
for n in sys.argv[5:]:
    if n in done: continue
    im = cv2.imread(os.path.join(bd, n), cv2.IMREAD_UNCHANGED); R = {"f": n}
    r = measure.regions(im, seg.probs(im)) if im is not None else None
    if r is None: R["err"] = "noface"; fo.write(json.dumps(R) + "\n"); continue
    st = measure.stats(r); R["before"] = st
    sh = {}
    for g in ("neck", "hands"):
        da, db = fix.shift_for(st, base, g)
        sh[g] = (round(da, 2), round(db, 2))
    R["shift"] = sh
    if any(v != (0.0, 0.0) for v in sh.values()):
        out = fix.apply(im, r, sh["neck"], sh["hands"]); cv2.imwrite(os.path.join(od, n), out, [cv2.IMWRITE_WEBP_QUALITY, 92])
        R["after"] = measure.stats(measure.regions(out, r["P"]))
        pn = "por-" + n[4:]; pp = os.path.join(bd, pn)
        if sh["neck"] != (0.0, 0.0) and os.path.exists(pp):
            pim = cv2.imread(pp, cv2.IMREAD_UNCHANGED); pr = fix.por_regions(pim)
            if pr is not None and pr["body"].sum() >= 40:
                cv2.imwrite(os.path.join(od, pn), fix.apply(pim, pr, sh["neck"], sh["neck"], por=True), [cv2.IMWRITE_WEBP_QUALITY, 92]); R["por"] = pn
    fo.write(json.dumps(R) + "\n"); fo.flush()
