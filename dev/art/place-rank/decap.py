"""PLACES2 (L2370, ROOT-C3): 0-cr removal of the burned-in picture code (CAPTION 'M2370-NN', top-left) before a live swap.
Finds the white caption letters in the top-left box, takes their bounding rectangle (+ margin), and refills it with the
right-hand neighbour block of the same rows (beams, friezes, eaves, sky run horizontally), feathered at the seams.
python3 decap.py IN OUT [--show BOX.png]"""
import sys, numpy as np
from PIL import Image, ImageFilter
src, out = sys.argv[1:3]
im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(np.float32); H, W = a.shape[:2]
bw, bh = int(W * 0.16), int(H * 0.07)                       # search box (caption sits top-left)
box = a[:bh, :bw]; mx, mn = box.max(2), box.min(2)
txt = (mn > 225) & (mx - mn < 30)                            # white letters
ys, xs = np.nonzero(txt)
if len(xs) < 50: Image.fromarray(a.astype(np.uint8)).save(out, quality=92); print(src, 'no caption found'); sys.exit()
m = max(10, int(W * 0.006))
x0, x1, y0, y1 = max(0, xs.min() - m), min(W, xs.max() + m), max(0, ys.min() - m), min(H, ys.max() + m)
x0 = 0 if x0 < 3 * m else x0; y0 = 0 if y0 < 3 * m else y0
mask = np.zeros((H, W), bool); mask[y0:y1, x0:x1] = True
w = x1 - x0; f = a.copy()
f[y0:y1, x0:x1] = a[y0:y1, x1:x1 + w] if x1 + w <= W else a[y0:y1, x0 - w:x0]
r = Image.fromarray(np.clip(f, 0, 255).astype(np.uint8))
soft = Image.fromarray((mask * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(m // 2))
res = Image.composite(r, im, soft)
res.save(out, quality=92) if not out.endswith('.webp') else res.save(out, 'WEBP', quality=88)
print(src, 'caption box', (x0, y0, x1, y1))
if '--show' in sys.argv: res.crop((0, 0, bw + 100, bh + 60)).save(sys.argv[sys.argv.index('--show') + 1])
