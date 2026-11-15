"""Cut a 5x2 sheet of round emotion badges on chroma green into img/kit/emo-<set>-<k>.webp (160 px, transparent outside the circle).
Order = jemo EMO_ORDER: vui binh buon gian so ghen lo dau muu an.
usage: python3 dev/art/emo_cut.py sheet.png <set: m | mo> <out dir (img/kit)>"""
import sys, os
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

KS = "vui binh buon gian so ghen lo dau muu an".split()
src, tag, out = sys.argv[1], sys.argv[2], sys.argv[3]
im = np.array(Image.open(src).convert('RGB')).astype(np.int16)
H, W = im.shape[:2]
r, g, b = im[..., 0], im[..., 1], im[..., 2]
green = (g - np.maximum(r, b) > 40) & (g > 110)
fg = ndimage.binary_opening(~green, iterations=2)
lab, n = ndimage.label(fg)
sizes = ndimage.sum(fg, lab, range(1, n + 1))
blobs = [i + 1 for i in np.argsort(sizes)[::-1][:10]]
boxes = []
for i in blobs:
    ys, xs = np.where(lab == i)
    boxes.append((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
# reading order: row by centre y, then x
boxes.sort(key=lambda bx: (int(((bx[1] + bx[3]) / 2) / (H / 2)), bx[0]))
os.makedirs(out, exist_ok=True)
for k, (x0, y0, x1, y1) in zip(KS, boxes):
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    R = max(x1 - x0, y1 - y0) / 2
    s = int(R * 2) + 2
    crop = Image.open(src).convert('RGB').crop((int(cx - R) - 1, int(cy - R) - 1, int(cx - R) - 1 + s, int(cy - R) - 1 + s))
    a = np.array(crop).astype(np.int16)
    # despill: the gold rim picks up green at the edge
    a[..., 1] = np.minimum(a[..., 1], np.maximum(a[..., 0], a[..., 2]) + 6)
    crop = Image.fromarray(a.clip(0, 255).astype(np.uint8))
    m = Image.new('L', (s * 4, s * 4), 0)
    e = int(s * 4 * .028); ImageDraw.Draw(m).ellipse((e, e, s * 4 - 1 - e, s * 4 - 1 - e), fill=255)   # just inside the rim: no green ring
    m = m.resize((s, s), Image.LANCZOS)
    o = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    o.paste(crop, (0, 0), m)
    o.resize((160, 160), Image.LANCZOS).save(os.path.join(out, f'emo-{tag}-{k}.webp'), 'WEBP', quality=90)
    print(k, (x0, y0, x1, y1))
