#!/usr/bin/env python3
"""sharp.py BASEDIR OUTDIR NAME... — is a fixed file softer than its original? (owner live bug: stage face looked blurry)
Per pair: Laplacian variance + Tenengrad (Sobel energy) of gray over solid-alpha pixels, whole fig and head zone (top 22% of the
alpha bbox), ratio after/before (1.00 = same; <0.97 would be visibly softer), and PSNR of L* (OpenCV Lab) over solid pixels.
Prints TSV: name lap_ratio_all lap_ratio_head ten_ratio_head psnrL bytes_before bytes_after"""
import sys, os, numpy as np, cv2
def m(im, box=None):
    g = cv2.cvtColor(im[..., :3], cv2.COLOR_BGR2GRAY).astype(np.float32)
    sol = im[..., 3] >= 250
    sol = cv2.erode(sol.astype(np.uint8), np.ones((5, 5), np.uint8)) > 0   # keep the alpha edge out of it
    lap = cv2.Laplacian(g, cv2.CV_32F, ksize=3); gx = cv2.Sobel(g, cv2.CV_32F, 1, 0); gy = cv2.Sobel(g, cv2.CV_32F, 0, 1)
    ys, xs = np.where(im[..., 3] > 20); y0, y1 = ys.min(), ys.max(); head = np.zeros_like(sol); head[y0:y0 + int(0.22 * (y1 - y0)), :] = True
    out = []
    for z in (sol, sol & head):
        out += [float(lap[z].var()), float((gx[z] ** 2 + gy[z] ** 2).mean())]
    return out, sol
def ratios(a, b):
    ma, _ = m(a); mb, _ = m(b); return mb[2] / ma[2], mb[3] / ma[3]

if __name__ == "__main__":
  bd, od = sys.argv[1], sys.argv[2]
  for n in sys.argv[3:]:
      a = cv2.imread(os.path.join(bd, n), cv2.IMREAD_UNCHANGED); b = cv2.imread(os.path.join(od, n), cv2.IMREAD_UNCHANGED)
      if a is None or b is None or a.shape != b.shape: print(n, "ERR", sep="\t"); continue
      ma, sol = m(a); mb, _ = m(b)
      La = cv2.cvtColor(a[..., :3], cv2.COLOR_BGR2LAB)[..., 0].astype(np.float32); Lb = cv2.cvtColor(b[..., :3], cv2.COLOR_BGR2LAB)[..., 0].astype(np.float32)
      mse = float(((La - Lb)[sol] ** 2).mean()); ps = 99.0 if mse == 0 else 10 * np.log10(255 ** 2 / mse)
      print(n, f"{mb[0]/ma[0]:.4f}", f"{mb[2]/ma[2]:.4f}", f"{mb[3]/ma[3]:.4f}", f"{ps:.1f}", os.path.getsize(os.path.join(bd, n)), os.path.getsize(os.path.join(od, n)), sep="\t")
