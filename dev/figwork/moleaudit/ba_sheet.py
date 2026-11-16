#!/usr/bin/env python3
"""ba_sheet.py ORIG_DIR NEW_DIR hits.json OUT_PREFIX [fig]: before|after tiles around each hit (por coords; fig uses figlog-free
centre = locate by identical hit scaling is not available, so 'fig' mode centres on the pixel diff between before and after)."""
import sys, json, numpy as np
from PIL import Image, ImageDraw
O, N, HJ, out = sys.argv[1:5]; kind = sys.argv[5] if len(sys.argv) > 5 else 'por'
H = json.load(open(HJ)); tiles = []
def fl(p):
    im = Image.open(p).convert('RGBA'); b = Image.new('RGBA', im.size, (200, 200, 200, 255)); b.alpha_composite(im); return b.convert('RGB')
for k in H:
    nm = k if kind == 'por' else 'fig-' + k[4:]
    try: a = fl(f'{O}/{nm}.webp'); b = fl(f'{N}/{nm}.webp')
    except Exception: continue
    d = np.abs(np.asarray(a).astype(int) - np.asarray(b).astype(int)).sum(2)
    if kind == 'por': cx, cy = H[k][0][0], H[k][0][1]
    else:
        import cv2
        bl = cv2.GaussianBlur((d > 12).astype(np.float32), (0, 0), 2.0); cy, cx = np.unravel_index(bl.argmax(), bl.shape); cx, cy = int(cx), int(cy)
        if bl.max() < .06: d = d * 0
    R = (30, 22) if kind == 'por' else (22, 16); box = (cx - R[0], cy - R[1], cx + R[0], cy + R[1])
    t = Image.new('RGB', (480, 190), 'white'); t.paste(a.crop(box).resize((240, 176), Image.LANCZOS), (0, 14)); t.paste(b.crop(box).resize((240, 176), Image.LANCZOS), (240, 14))
    ImageDraw.Draw(t).text((3, 1), nm + ('  (no change)' if d.max() == 0 else ''), fill=0); tiles.append(t)
n = 4
for s in range(0, len(tiles), 24):
    ch = tiles[s:s + 24]; sh = Image.new('RGB', (n * 482, ((len(ch) + n - 1) // n) * 192), 'white')
    for i, t in enumerate(ch): sh.paste(t, ((i % n) * 482, (i // n) * 192))
    sh.save(f'{out}_{s // 24}.jpg', quality=85)
print(len(tiles))
