# python3 cutout.py OUT.webp URL : paper-tone calligraphy render -> transparent cut-out (alpha from distance to the paper colour), trimmed, 1200 wide max
import sys, io, urllib.request, numpy as np
from PIL import Image
out, url = sys.argv[1], sys.argv[2]
im = Image.open(io.BytesIO(urllib.request.urlopen(url, timeout=120).read())).convert('RGB')
a = np.asarray(im).astype(np.float32)
h, w, _ = a.shape
border = np.concatenate([a[:20].reshape(-1,3), a[-20:].reshape(-1,3), a[:, :20].reshape(-1,3), a[:, -20:].reshape(-1,3)])
paper = np.median(border, 0)
d = np.sqrt(((a - paper) ** 2).sum(2))
lo, hi = 28.0, 150.0
al = np.clip((d - lo) / (hi - lo), 0, 1)
# un-premultiply the paper out of the colour so soft edges do not keep a cream halo
c = np.where(al[..., None] > 0.02, (a - paper * (1 - al[..., None])) / np.maximum(al[..., None], 0.02), a)
rgba = np.dstack([np.clip(c, 0, 255), al * 255]).astype(np.uint8)
img = Image.fromarray(rgba, 'RGBA')
bb = img.getchannel('A').point(lambda v: 255 if v > 10 else 0).getbbox()
x0, y0, x1, y1 = bb; p = 12
img = img.crop((max(0, x0-p), max(0, y0-p), min(w, x1+p), min(h, y1+p)))
if img.width > 1200: img = img.resize((1200, round(img.height * 1200 / img.width)), Image.LANCZOS)
img.save(out, 'WEBP', quality=90, method=6)
print(out, img.size, 'paper', paper.round())
