"""grid.py img_path x0 y0 x1 y1 zoom out.png : zoomed crop with grid labels every 10px"""
import sys
from PIL import Image, ImageDraw
p, x0, y0, x1, y1, z, out = sys.argv[1], *map(int, sys.argv[2:7]), sys.argv[7]
im = Image.open(p).convert('RGBA'); bg = Image.new('RGBA', im.size, (200, 200, 200, 255)); bg.alpha_composite(im)
c = bg.crop((x0, y0, x1, y1)).resize(((x1 - x0) * z, (y1 - y0) * z), Image.NEAREST).convert('RGB')
d = ImageDraw.Draw(c)
for x in range((x0 // 10 + 1) * 10, x1, 10):
    d.line([((x - x0) * z, 0), ((x - x0) * z, c.height)], fill=(0, 160, 255), width=1); d.text(((x - x0) * z + 2, 2), str(x), fill=(0, 0, 255))
for y in range((y0 // 10 + 1) * 10, y1, 10):
    d.line([(0, (y - y0) * z), (c.width, (y - y0) * z)], fill=(0, 160, 255), width=1); d.text((2, (y - y0) * z + 2), str(y), fill=(0, 0, 255))
c.save(out)
