#!/usr/bin/env python3
"""reenc.py BASEDIR OUTDIR FIXREC.jsonl[,FIXREC2...] NAME... — re-encode fixed files that came out softer than the original.
Finding (sharp.py): the a*/b* colour fix itself keeps detail; the loss is WebP q92 generation loss (worst on 506x384 por-*: head
Laplacian var down to 0.91x). This rebuilds the same fixed pixels (deterministic, shifts from FIXREC) and encodes at the first
quality in 92/95/98 whose head Laplacian-variance and Tenengrad ratios vs the original are both >= 0.98. Prints name q ratios bytes."""
import sys, os, json, cv2
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import seg, measure, fix, sharp
bd, od = sys.argv[1], sys.argv[2]
SH = {}; PORSH = {}
for fn in sys.argv[3].split(","):
    for l in open(fn):
        r = json.loads(l)
        if "shift" in r:
            SH[r["f"]] = r["shift"]
            if r.get("por"): PORSH[r["por"]] = r["shift"]["neck"]
for n in sys.argv[4:]:
    im = cv2.imread(os.path.join(bd, n), cv2.IMREAD_UNCHANGED)
    if "player-look1" in n:
        import player; out, _ = player.run(im, n.startswith("por-"))
    elif n.startswith("por-"):
        sh = tuple(PORSH[n]); out = fix.apply(im, fix.por_regions(im), sh, sh, por=True)
    else:
        sh = SH[n]; out = fix.apply(im, measure.regions(im, seg.probs(im)), tuple(sh["neck"]), tuple(sh["hands"]))
    for q in (92, 95, 98):
        ok, buf = cv2.imencode(".webp", out, [cv2.IMWRITE_WEBP_QUALITY, q]); dec = cv2.imdecode(buf, cv2.IMREAD_UNCHANGED)
        rl, rt = sharp.ratios(im, dec)
        if rl >= 0.98 and rt >= 0.98: break
    open(os.path.join(od, n), "wb").write(buf.tobytes())
    print(n, q, f"{rl:.4f}", f"{rt:.4f}", len(buf), sep="\t", flush=True)
