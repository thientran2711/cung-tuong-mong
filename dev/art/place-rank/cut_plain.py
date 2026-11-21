"""PR21: 0-cr cut-out of a figure drawn on a plain parchment background. python3 cut_plain.py IN OUT.png [thr]
bg colour = median of the border; background = pixels within thr (RGB distance) that connect to the border (geodesic grow);
figure = the connected foreground region that holds the picture centre column (drops captions/text); 1 px erode + soft edge."""
import sys, numpy as np
from PIL import Image, ImageFilter, ImageDraw
i, o = sys.argv[1:3]; thr = float(sys.argv[3]) if len(sys.argv) > 3 else 22
im = Image.open(i).convert('RGB'); a = np.asarray(im, dtype=float); H, W = a.shape[:2]
b = np.concatenate([a[:4].reshape(-1, 3), a[-4:].reshape(-1, 3), a[:, :4].reshape(-1, 3), a[:, -4:].reshape(-1, 3)])
d = np.linalg.norm(a - np.median(b, 0), axis=2)
near = d < thr
seed = np.zeros_like(near); seed[0], seed[-1], seed[:, 0], seed[:, -1] = near[0], near[-1], near[:, 0], near[:, -1]
bg = seed.copy()
while True:
    g = np.asarray(Image.fromarray(bg.astype(np.uint8) * 255).filter(ImageFilter.MaxFilter(3))) > 0
    nb = g & near
    if (nb == bg).all(): break
    bg = nb
fg = Image.fromarray((~bg).astype(np.uint8) * 255).copy()
cx = W // 2; col = np.where(~bg[:, cx])[0]; sy = int(col[len(col) // 2])
ImageDraw.floodfill(fg, (int(cx), int(sy)), 128)
m = (np.asarray(fg) == 128)
al = Image.fromarray(m.astype(np.uint8) * 255).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
out = im.convert('RGBA'); out.putalpha(al); out.save(o); print(o, 'fg %.1f%%' % (m.mean() * 100))
