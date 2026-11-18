#!/usr/bin/env python3
"""cutcheck.py — find background-removal residue in transparent figure/portrait art.

Usage:
  python3 dev/figwork/cutcheck.py img/fig-*.webp            # ranked list (worst first)
  python3 dev/figwork/cutcheck.py --sheet out.jpg --top 60 img/fig-consort-*.webp
  python3 dev/figwork/cutcheck.py --min 1 img/fig-maid-*.webp   # only flagged files, exit 1 if any

What it looks for (alpha > 0 pixels that are probably NOT the figure):
  * pale  : flat, low-saturation, bright blobs touching the silhouette edge
            (leftover cream/white/grey backdrop beside jaw, neck, between arms, floor)
  * ghost : large semi-transparent (alpha 8..200) regions whose colour is pale/flat
            (half-removed backdrop, smoky halos)
  * fringe: a light rim along the outline (bright pixels in the outer alpha band
            that are much lighter than the figure just inside)
Score ~ area (in 1/10000 of figure area) of suspicious pixels, weighted. >= 1.0 = flagged,
>= 3 = clearly visible. Calibrated on 900px-tall figures and 256px portraits.
Low memory: one image at a time, works at <=900px height.
"""
import sys, os, argparse
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

def load(path, maxh=450):
    im = Image.open(path).convert("RGBA")
    if im.height > maxh:
        im = im.resize((round(im.width * maxh / im.height), maxh), Image.BILINEAR)
    return np.asarray(im).astype(np.float32)

P0 = np.array([230, 213, 195], np.float32)   # "plain light parchment" backdrop used in every generation prompt

def analyse(path):
    A = load(path)
    rgb, a = A[..., :3], A[..., 3]
    h, w = a.shape
    k = h / 900.0 if h > 300 else 0.5          # portraits (256px) are ~2x zoomed crops
    outside = a <= 10
    area = max(1, int((a > 40).sum()))
    d_in = ndi.distance_transform_edt(~outside)  # distance from the transparent area
    dist = np.linalg.norm(rgb - P0, axis=-1)     # distance from parchment colour
    semi = (a > 15) & (a < 235)
    # R: backdrop showing through - semi-transparent, parchment-coloured, not the 1-2px anti-alias rim
    R = semi & (dist < 28) & (d_in > 1.5)
    R = ndi.binary_opening(R)
    # G: ghost holes - semi-transparent pixels deep inside the silhouette (garment eaten by the cutter)
    G = semi & (d_in > 4 * max(k, 0.5)) & ~R
    G = ndi.binary_opening(G)
    # Q: opaque flat backdrop blobs attached to the outline
    mx = rgb.max(-1); mn = rgb.min(-1)
    L = rgb.mean(-1); m1 = ndi.uniform_filter(L, 7); sd = np.sqrt(np.maximum(ndi.uniform_filter(L * L, 7) - m1 * m1, 0))
    Q = (a >= 235) & (dist < 14) & (sd < 1.5)
    Q = ndi.binary_opening(Q, iterations=2)
    lab, n = ndi.label(Q); qpx = 0
    if n:
        near = ndi.binary_dilation(outside, iterations=int(6 * max(k, 0.5) + 1))
        sz = ndi.sum(Q, lab, range(1, n + 1)); tc = ndi.sum(near, lab, range(1, n + 1))
        keep = [i + 1 for i in range(n) if sz[i] > 40 * k * k and tc[i] > 0.2 * sz[i]]
        Q = np.isin(lab, keep); qpx = int(Q.sum())
    rpx, gpx = int(R.sum()), int(G.sum())
    score = (rpx + 0.35 * gpx + 0.5 * qpx) / area * 1e3
    boxes = []
    for nm, M in (("resid", R), ("ghost", G), ("flat", Q)):
        lab, n = ndi.label(ndi.binary_dilation(M, iterations=3))
        if not n: continue
        sz = ndi.sum(M, lab, range(1, n + 1))
        for i, sl in enumerate(ndi.find_objects(lab)):
            ys, xs = sl; boxes.append((int(sz[i]), xs.start, ys.start, xs.stop, ys.stop, nm))
    boxes.sort(reverse=True)
    return dict(file=path, score=round(float(score), 2), pale=rpx, ghost=gpx, fringe=qpx,
                area=area, boxes=boxes[:6], size=(w, h))

def sheet(results, out, top, tile=300):
    rs = results[:top]
    if not rs: return
    cols = 6; rows = (len(rs) + cols - 1) // cols
    from PIL import ImageDraw
    S = Image.new("RGB", (cols * tile, rows * (tile + 18)), (24, 24, 24))
    d = ImageDraw.Draw(S)
    for i, r in enumerate(rs):
        im = Image.open(r["file"]).convert("RGBA")
        sc = r["size"][1] / im.height
        if r["boxes"]:
            _, x0, y0, x1, y1, _ = r["boxes"][0]
            x0, y0, x1, y1 = [int(v / sc) for v in (x0, y0, x1, y1)]
            cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
            half = max(x1 - x0, y1 - y0, 140 if im.height > 300 else 60)
            box = (max(0, cx - half), max(0, cy - half), min(im.width, cx + half), min(im.height, cy + half))
        else:
            box = (0, 0, im.width, im.height)
        crop = im.crop(box)
        bg = Image.new("RGBA", crop.size, (20, 110, 60, 255)); bg.alpha_composite(crop)
        crop = bg.convert("RGB"); crop.thumbnail((tile, tile))
        x = (i % cols) * tile; y = (i // cols) * (tile + 18)
        S.paste(crop, (x, y + 18))
        d.text((x + 2, y + 2), f"{r['score']} {os.path.basename(r['file'])[4:40]}", fill=(255, 230, 120))
    S.save(out, quality=82)

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="+")
    ap.add_argument("--sheet"); ap.add_argument("--top", type=int, default=60)
    ap.add_argument("--min", type=float, default=0.0, help="only print files scoring >= this")
    ap.add_argument("--tsv", help="append rows to this file")
    o = ap.parse_args()
    res = []
    for f in o.files:
        try:
            r = analyse(f)
        except Exception as e:
            print("ERR", f, e, file=sys.stderr); continue
        res.append(r)
        if o.tsv:
            with open(o.tsv, "a") as t:
                t.write(f"{r['score']}\t{r['pale']}\t{r['ghost']}\t{r['fringe']}\t{f}\t{r['boxes'][:2]}\n")
    res.sort(key=lambda r: -r["score"])
    flagged = [r for r in res if r["score"] >= max(o.min, 1e-9)] if o.min else res
    for r in flagged:
        print(f"{r['score']:7.2f}  resid={r['pale']:6d} ghost={r['ghost']:6d} flat={r['fringe']:5d}  {r['file']}")
    if o.sheet: sheet(res, o.sheet, o.top)
    if o.min and flagged: sys.exit(1)
