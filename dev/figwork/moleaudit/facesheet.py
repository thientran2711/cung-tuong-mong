#!/usr/bin/env python3
"""facesheet.py OUT.jpg files... : haar face box crop (x1.3) of every file, 8 per row, label under; to LOOK for moles (detector is a helper only)."""
import sys, os, cv2, numpy as np
from PIL import Image, ImageDraw
cc = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
out = sys.argv[1]; fs = sys.argv[2:]; T = 250; tiles = []
for f in fs:
    im = Image.open(f).convert('RGBA'); bg = Image.new('RGBA', im.size, (200, 200, 200, 255)); bg.alpha_composite(im); rgb = bg.convert('RGB')
    FIG = os.path.basename(f).startswith('fig-'); crop = rgb.crop((0, 0, rgb.width, int(rgb.height * .2))) if FIG else rgb
    g = cv2.cvtColor(np.asarray(crop), cv2.COLOR_RGB2GRAY); r = cc.detectMultiScale(g, 1.08, 4, minSize=(max(18, crop.width // 12),) * 2)
    t = Image.new('RGB', (T, T + 12), 'white')
    if len(r):
        x, y, w, h = max(r, key=lambda q: q[2] * q[3]); m = int(w * .15); t.paste(crop.crop((x - m, y - m, x + w + m, y + h + m)).resize((T, T), Image.LANCZOS), (0, 12))
    ImageDraw.Draw(t).text((2, 0), os.path.basename(f)[:-5].replace('por-', '').replace('fig-', ''), fill=0); tiles.append(t)
n = 8; s = Image.new('RGB', (n * T, ((len(tiles) + n - 1) // n) * (T + 12)), 'white')
for i, t in enumerate(tiles): s.paste(t, ((i % n) * T, (i // n) * (T + 12)))
s.save(out, quality=82); print(out, len(tiles))
