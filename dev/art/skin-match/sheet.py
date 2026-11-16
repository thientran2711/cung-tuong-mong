#!/usr/bin/env python3
"""sheet.py OUT.jpg BEFORE_DIR AFTER_DIR NAME... — before|after pairs (upper 60 % of a fig, whole por), small JPEG"""
import sys, os, numpy as np, cv2
def comp(im):
    a = im[..., 3:] / 255.0; return (im[..., :3] * a + np.array([195, 213, 230]) * (1 - a)).astype(np.uint8)
out, bd, ad, names = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4:]
H = int(os.environ.get("SH", 360)); tiles = []
for n in names:
    ims = [cv2.imread(os.path.join(d, n), cv2.IMREAD_UNCHANGED) for d in (bd, ad)]
    if any(i is None for i in ims): continue
    pair = []
    for im in ims:
        c = comp(im)
        if n.startswith("fig-"): c = c[:int(0.6 * c.shape[0])]
        pair.append(cv2.resize(c, (int(c.shape[1] * H / c.shape[0]), H), interpolation=cv2.INTER_AREA))
    t = np.hstack([pair[0], np.full((H, 3, 3), 255, np.uint8), pair[1]])
    cv2.putText(t, n[4:-5][:30], (3, 12), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (0, 0, 0), 1)
    tiles.append(np.pad(t, ((0, 0), (0, 8), (0, 0)), constant_values=60))
rows, cur, wmax = [], [], int(os.environ.get("SW", 1900))
for t in tiles:
    if cur and sum(x.shape[1] for x in cur) + t.shape[1] > wmax: rows.append(cur); cur = []
    cur.append(t)
if cur: rows.append(cur)
rows = [np.hstack(r + [np.full((H, wmax - sum(x.shape[1] for x in r), 3), 60, np.uint8)]) for r in rows]
cv2.imwrite(out, np.vstack(rows), [cv2.IMWRITE_JPEG_QUALITY, 82]); print(out, len(tiles))
