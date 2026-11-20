#!/usr/bin/env python3
"""Measure the real disc colour of a seal picture (A26 colour codes). Disc = the dominant colour in the ring 0.78–0.88 R of the
medallion (gold rim outside ~0.9 R). Stills only: in burst-out frames the figure covers too much of the ring. Works on stills (160 px) and webp clip frames.
usage: disc_measure.py FILE.webp [frame]   → hex      |   import: disc_hex(img_rgba) -> '#RRGGBB'"""
import sys, numpy as np
from PIL import Image
def disc_hex(im):
    a = np.asarray(im.convert("RGBA")).astype(int); al = a[:, :, 3] > 200
    ys, xs = np.nonzero(al)
    if len(xs) < 50: return None
    # medallion circle from the alpha of the still/last frame: use the bbox of the largest round part
    cx, cy = (xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2; R = min(xs.max() - xs.min(), ys.max() - ys.min()) / 2
    yy, xx = np.mgrid[:a.shape[0], :a.shape[1]]; r = np.hypot(xx - cx, yy - cy) / max(R, 1)
    m = al & (r > 0.78) & (r < 0.88)      # full ring just inside the gold rim: the disc owns most of it in a still
    px = a[:, :, :3][m]
    if len(px) < 30: px = a[:, :, :3][al & (r < 0.88)]
    q = px // 12; key = q[:, 0] * 10000 + q[:, 1] * 100 + q[:, 2]
    vals, cnt = np.unique(key, return_counts=True); k = vals[cnt.argmax()]
    c = np.array([k // 10000, (k // 100) % 100, k % 100]) * 12 + 6
    near = px[np.abs(px - c).sum(1) < 60]
    col = np.median(near, 0).astype(int)
    return "#%02X%02X%02X" % tuple(col)
if __name__ == "__main__":
    im = Image.open(sys.argv[1])
    if len(sys.argv) > 2: im.seek(int(sys.argv[2]))
    print(disc_hex(im))
