#!/usr/bin/env python3
"""make_game.py: transparent cut PNG -> game files (fig 900 tall, hd 1800 tall, por 384x506 bust, tn 128 wide).
usage: make_game.py <cut.png> <game-name e.g. consort-bd1-t1-a18> <outdir>
Uniform LANCZOS scale only (no squeeze); alpha-bbox crop like the c26 sprites (fig 362x900 / hd 724x1800 measured on the CDN)."""
import sys, os
from PIL import Image
src, name, out = sys.argv[1:4]
os.makedirs(out + "/hd", exist_ok=True); os.makedirs(out + "/tn", exist_ok=True)
im = Image.open(src).convert("RGBA")
bb = im.split()[-1].point(lambda v: 255 if v > 8 else 0).getbbox()
c = im.crop(bb); W, H = c.size
def fig(h, q):
    w = round(W * h / H); return c.resize((w, h), Image.LANCZOS)
fig(900, 0).save(f"{out}/fig-{name}.webp", "WEBP", quality=88, method=6)
fig(1800, 0).save(f"{out}/hd/fig-{name}.webp", "WEBP", quality=88, method=6)
# bust: top of the figure, 3:4-ish like por-*.webp (384x506); centred on the face (alpha centre of the top 12 %)
bh = round(H * 0.215); bw = round(bh * 384 / 506)
top = c.crop((0, 0, W, round(H * 0.12))).split()[-1].getbbox()
cx = (top[0] + top[2]) // 2
x0 = max(0, min(W - bw, cx - bw // 2))
por = c.crop((x0, 0, x0 + bw, bh)).resize((384, 506), Image.LANCZOS)
por.save(f"{out}/por-{name}.webp", "WEBP", quality=85, method=6)
por.resize((128, round(506 * 128 / 384)), Image.LANCZOS).save(f"{out}/tn/por-{name}.webp", "WEBP", quality=80, method=4)
fig(240, 0).save(f"{out}/tn/fig-{name}.webp", "WEBP", quality=70, method=4)
print(name, "bbox", bb, "fig", fig(900, 0).size)
