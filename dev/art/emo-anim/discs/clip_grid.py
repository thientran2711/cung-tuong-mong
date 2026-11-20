#!/usr/bin/env python3
"""Clip review sheet (SEAL9, 0 cr): rows of animated webp clips, N evenly spaced frames each (PIL decode), with a BIG
label ON the sheet per row (A27: group + emotion + clip part) and the frame number under each frame.
usage: clip_grid.py OUT.jpg TITLE "LABEL=path.webp" ...   [N frames via env N, default 8]"""
import sys, os
from PIL import Image, ImageDraw, ImageFont, ImageSequence
FP = "/usr/share/fonts/truetype/dejavu/DejaVuSans"
f = lambda s, b=True: ImageFont.truetype(FP + ("-Bold" if b else "") + ".ttf", s)
OUT, TITLE, rows = sys.argv[1], sys.argv[2], [a.split("=", 1) for a in sys.argv[3:]]
N, T, LH = int(os.environ.get("N", 8)), 232, 64
W = 16 + N * (T + 8)
im = Image.new("RGB", (W, 90 + len(rows) * (LH + T + 34)), (246, 242, 234)); dr = ImageDraw.Draw(im)
dr.text((16, 18), TITLE, fill=(25, 25, 25), font=f(50))
for r, (lab, p) in enumerate(rows):
    fr = [x.convert("RGBA") for x in ImageSequence.Iterator(Image.open(p))]
    idx = [round(i * (len(fr) - 1) / (N - 1)) for i in range(N)]
    y = 90 + r * (LH + T + 34)
    dr.text((16, y + 6), f"{lab}  ({len(fr)} khung)", fill=(170, 0, 0), font=f(46))
    for j, i in enumerate(idx):
        x = 16 + j * (T + 8); bg = Image.new("RGBA", (T, T), (255, 255, 255, 255))
        t = fr[i].resize((T, T), Image.LANCZOS); bg.alpha_composite(t)
        im.paste(bg.convert("RGB"), (x, y + LH)); dr.text((x + 4, y + LH + T + 2), f"#{i + 1}", fill=(90, 90, 90), font=f(24, False))
im.save(OUT, quality=86); print(OUT, im.size)
