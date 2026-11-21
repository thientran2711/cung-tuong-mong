#!/usr/bin/env python3
"""Swatch sheet of the 10 phoenix plumage sets (owner L2227), local PIL, 0 credits."""
import json, pathlib
from PIL import Image, ImageDraw, ImageFont
R = pathlib.Path(__file__).resolve().parents[3]
d = json.load(open(R / "dev/art/phoenix_plumage_L2227.json"))
F = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"; FB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
f1, f2, f3 = ImageFont.truetype(FB, 30), ImageFont.truetype(F, 20), ImageFont.truetype(F, 17)
W, RH, SW = 1500, 150, 210
img = Image.new("RGB", (W, 90 + RH * 10), "#FBF7EE"); g = ImageDraw.Draw(img)
g.text((30, 25), "Bảng màu lông phượng L2227 — 10 bộ (viền chỉ vàng)", font=f1, fill="#3A332A")
for i, (k, s) in enumerate(d["sets"].items()):
    y = 90 + i * RH
    who = [p for p, v in d["people"].items() if v["set"] == k]
    g.text((30, y + 18), f"{i+1}. {s['vi']}", font=f1, fill="#3A332A")
    g.text((30, y + 62), s["en"], font=f2, fill="#6B6255")
    g.text((30, y + 92), ", ".join(who), font=f3, fill="#6B6255")
    for j, c in enumerate(s["colours"]):
        x = 420 + j * SW
        g.rounded_rectangle((x, y + 12, x + SW - 18, y + 92), 12, fill=c["hex"], outline="#C9A44C", width=4)
        g.text((x, y + 98), c["name"], font=f3, fill="#3A332A"); g.text((x, y + 120), c["hex"], font=f3, fill="#6B6255")
out = R / "dev/handover/prompts_L2095/PHOENIX_PALETTE_L2227.png"; img.save(out); print(out, img.size)
