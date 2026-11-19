#!/usr/bin/env python3
"""Frame sheet for one group seal: EVERY frame of -out, LOOP, -back on alternating light/dark rows (≤600 KB JPG).
usage: th_sheet.py <name e.g. th-vui> [dir=img/_review/emo-anim-groups] [out.jpg]"""
import sys
from PIL import Image, ImageDraw
name = sys.argv[1]; d = sys.argv[2] if len(sys.argv) > 2 else "img/_review/emo-anim-groups"
dst = sys.argv[3] if len(sys.argv) > 3 else f"{d}/{name}-frames.jpg"
T, N = 96, 20
LIGHT, DARK = (242, 238, 230), (40, 40, 44)
rows = []
for part, f in (("OUT", f"{d}/{name}-out.webp"), ("LOOP", f"{d}/{name}.webp"), ("BACK", f"{d}/{name}-back.webp")):
    im = Image.open(f); fr = []
    for i in range(im.n_frames):
        im.seek(i); fr.append(im.convert("RGBA").resize((T, T), Image.LANCZOS))
    for r in range(0, len(fr), N): rows.append((part, r, fr[r:r + N]))
LW = 60
W, H = LW + N * T, len(rows) * T
sheet = Image.new("RGB", (W, H)); dr = ImageDraw.Draw(sheet)
for y, (part, r, fr) in enumerate(rows):
    bg = LIGHT if y % 2 == 0 else DARK
    band = Image.new("RGBA", (W, T), bg + (255,))
    for x, f in enumerate(fr): band.alpha_composite(f, (LW + x * T, 0))
    sheet.paste(band.convert("RGB"), (0, y * T))
    dr.text((4, y * T + 40), f"{part}\n{r}-{r + len(fr) - 1}", fill=DARK if y % 2 == 0 else LIGHT)
q = 85
while True:
    sheet.save(dst, quality=q)
    import os
    if os.path.getsize(dst) <= 600_000 or q < 40: break
    q -= 8
print(dst, sheet.size, os.path.getsize(dst), "q", q)
