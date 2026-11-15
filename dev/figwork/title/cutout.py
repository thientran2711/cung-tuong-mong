# python3 cutout.py OUT.webp URL : calligraphy on (textured, vignetted) paper -> transparent cut-out of ink + red seal, trimmed, longest side <= 1200
# alpha = darkness against a local paper estimate (85th-percentile brightness in 32px blocks, smoothed) OR redness (seal)
import sys, io, urllib.request, numpy as np
from PIL import Image, ImageFilter
out, url = sys.argv[1], sys.argv[2]
im = Image.open(io.BytesIO(urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'ctm-title'}), timeout=120).read())).convert('RGB')
a = np.asarray(im).astype(np.float32); h, w, _ = a.shape
L = a @ np.array([0.299, 0.587, 0.114], np.float32)
B = 32; gh, gw = -(-h // B), -(-w // B)
pad = np.pad(L, ((0, gh * B - h), (0, gw * B - w)), mode='edge')
blk = np.percentile(pad.reshape(gh, B, gw, B).transpose(0, 2, 1, 3).reshape(gh, gw, -1), 85, axis=2).astype(np.float32)
bgL = np.asarray(Image.fromarray(np.clip(blk, 0, 255).astype(np.uint8)).resize((w, h), Image.BILINEAR).filter(ImageFilter.GaussianBlur(12)), np.float32)
dark = np.clip((bgL - L - 30) / 50, 0, 1)
red = np.clip(((a[..., 0] - a[..., 1]) - 45) / 35, 0, 1) * (L < bgL - 20)
al = np.maximum(dark, red)
al[al < 0.08] = 0
my, mx = int(h * 0.05), int(w * 0.05)   # renders keep wide margins; the darkened vignette at the edge is not ink
al[:my] = 0; al[-my:] = 0; al[:, :mx] = 0; al[:, -mx:] = 0
ink = np.array([38, 28, 22], np.float32)
col = np.where(red[..., None] > dark[..., None], a, ink + (a - ink) * 0.25)
rgba = np.dstack([np.clip(col, 0, 255), al * 255]).astype(np.uint8)
img = Image.fromarray(rgba, 'RGBA')
A = np.asarray(img.getchannel('A')).astype(np.float32)
A[A < 60] = 0                                   # specks of paper fibre do not count for the trim
cs, rs = A.sum(0), A.sum(1)
cols = np.where(cs > cs.max() * 0.03)[0]; rows = np.where(rs > rs.max() * 0.03)[0]
x0, x1, y0, y1 = cols[0], cols[-1] + 1, rows[0], rows[-1] + 1; p = 10
al2 = np.asarray(img.getchannel('A')).copy(); keep = np.zeros_like(al2); keep[y0:y1, x0:x1] = 1; img.putalpha(Image.fromarray(al2 * keep))
img = img.crop((max(0, x0 - p), max(0, y0 - p), min(w, x1 + p), min(h, y1 + p)))
s = max(img.size)
if s > 1200 or s < 900: img = img.resize((round(img.width * 1200 / s), round(img.height * 1200 / s)), Image.LANCZOS)
img.save(out, 'WEBP', quality=90, method=6)
print(out, img.size, 'alpha>0 share', round(float((np.asarray(img.getchannel('A')) > 0).mean()), 3))
