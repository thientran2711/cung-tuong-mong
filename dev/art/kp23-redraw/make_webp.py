#!/usr/bin/env python3
"""png (1536x2048 gpt-2-6 3:4) -> img/_review/kp23-redraw/<key>.webp (768x1012, game ratio 384:506) + <key>-orig.webp (1536x2023). Usage: make_webp.py <png> <key>"""
import sys, os
from PIL import Image
R = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
src, key = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB"); w, h = im.size
nh = round(w * 506 / 384); top = (h - nh) // 2
im = im.crop((0, top, w, top + nh))
out = os.path.join(R, "img", "_review", "kp23-redraw")
im.save(os.path.join(out, key + "-orig.webp"), quality=88, method=6)
im.resize((768, 1012), Image.LANCZOS).save(os.path.join(out, key + ".webp"), quality=86, method=6)
print(key, im.size)
