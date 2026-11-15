# python3 mapfetch.py OUT.webp BASE.png URL : festival map edit -> 1792x1000 webp; prints the shift vs the season base map (phase correlation on
# grayscale gradients) and the mean absolute difference: the hotspots stay valid only when the shift is ~0 px.
import sys, io, urllib.request, numpy as np
from PIL import Image, ImageFilter
out, base, url = sys.argv[1:4]
im = Image.open(io.BytesIO(urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'ctm-fetch'}), timeout=180).read())).convert('RGB')
src = im.size; im = im.resize((1792, 1000), Image.LANCZOS)
B = Image.open(base).convert('RGB')
def g(x): a = np.asarray(x.convert('L').filter(ImageFilter.FIND_EDGES).resize((896, 500)), np.float32); return a - a.mean()
A, C = g(im), g(B)
F = np.fft.fft2(A) * np.conj(np.fft.fft2(C)); r = np.fft.ifft2(F / (np.abs(F) + 1e-6)).real
dy, dx = np.unravel_index(np.argmax(r), r.shape); dy = dy - 500 if dy > 250 else dy; dx = dx - 896 if dx > 448 else dx
mad = float(np.abs(np.asarray(im, np.float32) - np.asarray(B, np.float32)).mean())
im.save(out, 'WEBP', quality=86, method=6)
print(out, 'src', src, 'shift px (at 1792x1000):', dx * 2, dy * 2, 'peak', round(float(r.max()), 3), 'mean abs diff', round(mad, 1))
