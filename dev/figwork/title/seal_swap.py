# compose.py IN.webp SEAL512.png OUT.webp : d4 -> d4s. Clears the plum-blossom seal (rows >= CUT, letters end at y 1096) and
# places the game's Trân nữ seal (kitSeal SVG rendered to PNG) there, small, aged to match the ink.
import sys, numpy as np
from PIL import Image, ImageFilter
src, sealp, out = sys.argv[1:4]
CUT, S = 1100, 62
t = Image.open(src).convert('RGBA'); a = np.asarray(t).copy()
old = a[1130:1192][(a[1130:1192, :, 3] > 150) & (a[1130:1192, :, 0].astype(int) - a[1130:1192, :, 1] > 60)][:, :3]
print('old seal mean rgb', old.mean(0).round())
a[CUT:, :, 3] = 0; a[CUT:, :, :3] = 0
s = Image.open(sealp).convert('RGBA').resize((S, S), Image.LANCZOS)
sa = np.asarray(s).astype(np.float32)
rng = np.random.default_rng(7)
lo = np.asarray(Image.fromarray((rng.random((S // 6 + 1, S // 6 + 1)) * 255).astype(np.uint8)).resize((S, S), Image.BICUBIC)).astype(np.float32) / 255
fine = rng.random((S, S)).astype(np.float32)
age = np.clip(0.80 + 0.17 * lo, 0, 1) * np.where(fine < 0.06, 0.55, 1.0)     # uneven pressure + a few dry specks
sa[..., 3] *= age
tint = np.array([150, 40, 30], np.float32)                                     # cinnabar dulled toward the old ink
sa[..., :3] = sa[..., :3] * 0.55 + tint * 0.45
seal = Image.fromarray(np.clip(sa, 0, 255).astype(np.uint8), 'RGBA').filter(ImageFilter.GaussianBlur(0.35))
img = Image.fromarray(a, 'RGBA')
img.alpha_composite(seal, ((img.width - S) // 2, 1128))
img.save(out, 'WEBP', quality=90, method=6)
print(out, img.size)
