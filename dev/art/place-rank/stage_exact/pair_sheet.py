"""Pair sheet (owner L13/L14): (1) góc trực diện | (2) đổi góc, each panel = ipad_tags.py output (people + 3-line tags), title + labels.
python3 pair_sheet.py TITLE TAGGED1.jpg LABEL1 TAGGED2.jpg LABEL2 OUT.jpg   (keeps OUT <= 600 KB)"""
import sys, os
from PIL import Image, ImageDraw, ImageFont
title, a, la, b, lb, out = sys.argv[1:7]
F = '/usr/share/fonts/truetype/dejavu/'
ft = ImageFont.truetype(F + 'DejaVuSans-Bold.ttf', 24); fl = ImageFont.truetype(F + 'DejaVuSans.ttf', 18)
PW = 985; pads = 10
ims = []
for p in (a, b):
    im = Image.open(p).convert('RGB'); ims.append(im.resize((PW, round(im.height * PW / im.width)), Image.LANCZOS))
H = 82 + ims[0].height + pads
sh = Image.new('RGB', (pads * 3 + PW * 2, H), (250, 244, 232)); d = ImageDraw.Draw(sh)
d.text((pads, 8), title + '  ·  iPad ngang – dư đồ (toàn màn hình)', font=ft, fill=(90, 40, 20))
for i, (im, lab) in enumerate(zip(ims, (la, lb))):
    x = pads + i * (PW + pads)
    d.text((x, 48), lab, font=fl, fill=(30, 30, 30) if i == 0 else (150, 30, 30))
    sh.paste(im, (x, 76))
for q in (88, 84, 80, 76, 72, 68):
    sh.save(out, quality=q, optimize=True)
    if os.path.getsize(out) <= 600 * 1024: break
print(out, os.path.getsize(out) // 1024, 'KB q', q)
