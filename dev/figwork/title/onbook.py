# python3 onbook.py COVER.webp OUT.jpg title1.webp ... : contact sheet — each vertical title alone (paper + dark) and placed in the
# paper label slot of the Tuần lục cover art (img/book-cover.webp 768x1024: label inner area x 74..170, y 44..626)
import sys
from PIL import Image, ImageDraw
cov, out, fs = sys.argv[1], sys.argv[2], sys.argv[3:]
C = Image.open(cov).convert('RGBA')
SX0, SY0, SX1, SY1 = 74, 44, 170, 626
def place(t):
    c = C.copy(); bw, bh = SX1 - SX0 - 12, SY1 - SY0 - 16
    t = t.copy(); t.thumbnail((bw, bh), Image.LANCZOS)
    c.alpha_composite(t, (SX0 + (SX1 - SX0 - t.width) // 2, SY0 + 10))
    return c
H = 520; tiles = []
for f in fs:
    t = Image.open(f).convert('RGBA'); row = []
    for bg in [(244, 233, 210), (58, 30, 24)]:
        s = t.copy(); s.thumbnail((H * 0.6, H - 20)); tile = Image.new('RGBA', (int(H * 0.62), H), bg + (255,))
        tile.alpha_composite(s, ((tile.width - s.width) // 2, (H - s.height) // 2)); row.append(tile)
    b = place(t); b = b.resize((round(b.width * H / b.height), H), Image.LANCZOS); row.append(b)
    z = place(t).crop((40, 20, 210, 660)); z = z.resize((round(z.width * H / z.height), H), Image.LANCZOS); row.append(z)
    tiles.append((f.split('/')[-1], row))
W = sum(x.width for x in tiles[0][1]) + 10 * (len(tiles[0][1]) + 1)
S = Image.new('RGB', (W, len(tiles) * (H + 28) + 10), (70, 70, 70)); d = ImageDraw.Draw(S)
for i, (name, row) in enumerate(tiles):
    x, y = 10, 10 + i * (H + 28)
    for t in row: S.paste(t.convert('RGB'), (x, y)); x += t.width + 10
    d.text((14, y + H + 6), name + '   (alone on paper | alone on dark | placed on the book cover | label close-up)', fill=(255, 255, 255))
S.save(out, quality=86)
print(out, S.size)
