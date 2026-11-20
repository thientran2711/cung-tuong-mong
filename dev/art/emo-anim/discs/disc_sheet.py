#!/usr/bin/env python3
"""A26 audit sheet: one row per emotion = official swatch (disc_colours.json) + every group's still with its measured disc swatch + ΔE.
usage: disc_sheet.py out.jpg   (reads audit_20-11.json, stills from img/_review/emo-anim-groups/still)"""
import json, sys, os
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); ST = os.path.join(H, "../../../../img/_review/emo-anim-groups/still")
C = json.load(open(f"{H}/disc_colours.json"))["colours"]; A = json.load(open(f"{H}/audit_20-11.json"))
G = ["th", "hh", "pt", "ptl", "ht", "htg", "tg", "tv", "bt", "bg", "mm"]
rows = {}
for k, g, h, off, d, st in A: rows.setdefault(k, {})[g] = (h, d, st)
keys = [k for k in C if k in rows] + [k for k in rows if k not in C]
CW, RH, LW = 104, 132, 230
try: F = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 13); FB = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 14)
except Exception: F = FB = ImageFont.load_default()
im = Image.new("RGB", (LW + CW * len(G), 30 + RH * len(keys)), (246, 242, 234)); dr = ImageDraw.Draw(im)
for j, g in enumerate(G): dr.text((LW + j * CW + 40, 8), g, fill=(40, 40, 40), font=FB)
for i, k in enumerate(keys):
    y = 30 + i * RH; kk = "dau" if k == "dau2" else k; c = C[kk]
    dr.rectangle([8, y + 8, 78, y + 78], fill=c["hex"], outline=(60, 60, 60))
    dr.text((86, y + 8), k, fill=(20, 20, 20), font=FB); dr.text((86, y + 28), c["hex"], fill=(20, 20, 20), font=F)
    dr.text((8, y + 84), c["vi"][:34], fill=(60, 60, 60), font=F)
    for j, g in enumerate(G):
        if g not in rows[k]: continue
        h, d, st = rows[k][g]; x = LW + j * CW
        f = f"{ST}/{g}-{k}.webp"
        if os.path.exists(f):
            t = Image.open(f).convert("RGBA").resize((84, 84)); im.paste(t, (x + 10, y + 4), t)
        col = (200, 30, 30) if st == "MISMATCH" else ((200, 120, 0) if st == "slight" else (40, 120, 40))
        dr.rectangle([x + 10, y + 92, x + 34, y + 116], fill=h, outline=(60, 60, 60))
        dr.text((x + 38, y + 92), h, fill=(30, 30, 30), font=F); dr.text((x + 38, y + 107), f"ΔE {d}", fill=col, font=F)
    dr.line([0, y + RH - 2, im.width, y + RH - 2], fill=(215, 208, 196))
im.save(sys.argv[1], quality=88); print(sys.argv[1], im.size)
