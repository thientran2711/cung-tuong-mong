# python3 sheet.py OUT.jpg a.webp b.webp ... : each cut-out shown on a light book-paper tone and a dark lacquer tone, labelled v1..vN
import sys
from PIL import Image, ImageDraw
out, fs = sys.argv[1], sys.argv[2:]
W, H = 600, 260
S = Image.new('RGB', (W * 2 + 30, (H + 30) * len(fs) + 10), (90, 90, 90))
d = ImageDraw.Draw(S)
for i, f in enumerate(fs):
    t = Image.open(f).convert('RGBA'); t.thumbnail((W - 40, H - 40))
    for j, bg in enumerate([(244, 233, 210), (58, 30, 24)]):
        x, y = 10 + j * (W + 10), 10 + i * (H + 30)
        tile = Image.new('RGBA', (W, H), bg + (255,)); tile.alpha_composite(t, ((W - t.width) // 2, (H - t.height) // 2))
        S.paste(tile.convert('RGB'), (x, y))
    d.text((14, 10 + i * (H + 30) + H + 4), f.split('/')[-1], fill=(255, 255, 255))
S.save(out, quality=88)
