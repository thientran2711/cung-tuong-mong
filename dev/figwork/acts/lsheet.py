# python3 lsheet.py OUT.jpg COLS file1.webp ... : contact sheet of LOCAL images (labelled by file name)
import sys
from PIL import Image, ImageDraw
out, cols, fs = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
W, H = 300, 395
rows = (len(fs) + cols - 1) // cols
S = Image.new('RGB', (cols * (W + 6) + 6, rows * (H + 22) + 6), (40, 40, 40)); d = ImageDraw.Draw(S)
for i, f in enumerate(fs):
    im = Image.open(f).convert('RGB'); im.thumbnail((W, H)); x, y = 6 + (i % cols) * (W + 6), 6 + (i // cols) * (H + 22)
    S.paste(im, (x, y)); d.text((x, y + H + 4), f'{i+1}. ' + f.split('/')[-1][4:-7], fill=(255, 255, 255))
S.save(out, quality=85)
