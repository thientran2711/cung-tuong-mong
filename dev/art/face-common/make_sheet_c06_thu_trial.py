#!/usr/bin/env python3
"""ROOT-65 / owner Lượt 982 trial sheet: c06 Sắc sảo CŨ (current, xuân root vermilion + ivory) | MỚI (Thu pair of palettes_season_deep.json).
Big labels on the image (A27), full figure + face zoom + swatches. Usage: python3 make_sheet_c06_thu_trial.py <dir with c06_old.png c06_thu.png>"""
import sys, os, json
from PIL import Image, ImageDraw, ImageFont
D = os.path.dirname(os.path.abspath(__file__)); R = os.path.abspath(os.path.join(D, '..', '..', '..'))
src = open(os.path.join(D, 'face_page', 'crop.py')).read(); src = src[:src.index('out=sys.argv[1]')]
NS = {}; exec(src, NS); face = NS['face']; BG = NS['BG']
cut = sys.argv[1]; th = json.load(open(os.path.join(D, 'palettes_season_deep.json')))['c06']['thu']
F = lambda s, b=False: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf' % ('-Bold' if b else ''), s)
CW, FH, ZH, HH = 460, 1000, 520, 80
COLS = [('c06_old.png', 'CŨ (hiện tại)', (110, 110, 110), ('soft vermilion', '#CF816E', 'warm ivory', '#EAD7BF')),
        ('c06_thu.png', 'MỚI · THU', (170, 30, 60), (th['main'], th['main_hex'], th['sec'], th['sec_hex']))]
sh = Image.new('RGB', (CW * 2 + 20, 120 + HH + FH + ZH + 90), (250, 247, 241)); dr = ImageDraw.Draw(sh)
dr.text((12, 10), 'c06 · Sắc sảo · THU', fill=(30, 30, 30), font=F(44, True))
dr.text((12, 64), f"{th['main_hex']} + {th['sec_hex']}  (bảng màu mới, thử 1 cô)", fill=(150, 30, 50), font=F(32, True))
for i, (fn, lab, col, (mn, mh, sn, shx)) in enumerate(COLS):
    x = i * (CW + 20); y = 120
    dr.rectangle((x, y, x + CW, y + HH - 6), fill=col); dr.text((x + 12, y + 14), 'c06 · ' + lab, fill='white', font=F(36, True)); y += HH
    im = Image.open(os.path.join(cut, fn)).convert('RGBA'); fig = im.crop(im.split()[3].getbbox())
    sc = min((CW - 10) / fig.width, (FH - 10) / fig.height); fig = fig.resize((int(fig.width * sc), int(fig.height * sc)), Image.LANCZOS)
    t = Image.new('RGB', (CW, FH), BG); t.paste(fig, ((CW - fig.width) // 2, FH - 5 - fig.height), fig); sh.paste(t, (x, y))
    sh.paste(face(os.path.join(cut, fn)).resize((CW, ZH)), (x, y + FH)); ty = y + FH + ZH + 8
    for j, (n, h) in enumerate(((mn, mh), (sn, shx))):
        yy = ty + j * 38; dr.rectangle((x + 8, yy, x + 40, yy + 32), fill=h, outline=(60, 60, 60)); dr.text((x + 50, yy + 2), f'{n} {h}', fill=(30, 30, 30), font=F(24, True))
out = os.path.join(R, 'dev/handover/review-sheets/new-faces-v4/c06_thu_trial_F3.jpg'); sh.save(out, quality=86); print(out, sh.size)
