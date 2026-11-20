#!/usr/bin/env python3
"""Frame sheet for one group seal: EVERY frame of -out, LOOP, -back on alternating light/dark rows (≤600 KB JPG).
usage: th_sheet.py <name e.g. th-vui> [dir=img/_review/emo-anim-groups] [out.jpg]"""
import sys
from PIL import Image, ImageDraw, ImageFont
import os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); from th_names import caption   # Vietnamese caption with accents (owner)
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
W, CAP = LW + N * T, 44
H = CAP + len(rows) * T
sheet = Image.new("RGB", (W, H), LIGHT); dr = ImageDraw.Draw(sheet)
FT = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 28)
dr.text((LW, 6), caption(name, True), font=FT, fill=(60, 40, 40))
for y, (part, r, fr) in enumerate(rows):
    bg = LIGHT if y % 2 == 0 else DARK
    band = Image.new("RGBA", (W, T), bg + (255,))
    for x, f in enumerate(fr): band.alpha_composite(f, (LW + x * T, 0))
    sheet.paste(band.convert("RGB"), (0, CAP + y * T))
    dr.text((4, CAP + y * T + 40), f"{part}\n{r}-{r + len(fr) - 1}", fill=DARK if y % 2 == 0 else LIGHT)
q = 85
while True:
    sheet.save(dst, quality=q)
    import os
    if os.path.getsize(dst) <= 600_000 or q < 40: break
    q -= 8
print(dst, sheet.size, os.path.getsize(dst), "q", q)
