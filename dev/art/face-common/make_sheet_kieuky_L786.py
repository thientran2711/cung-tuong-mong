#!/usr/bin/env python3
"""Owner Lượt 786 OLD|NEW sheet for the s51/s54 eye redraw (eye words 'long narrow almond eyes with sharply UP-SWEPT outer corners'
-> 'long almond eyes with gently lifted outer corners (natural, never slanted)'), with s10 s11 s12 for reference.
Usage: python3 make_sheet_kieuky_L786.py <dir with s51.png s51n.png s54.png s54n.png s10.png s11.png s12.png cut-outs>"""
import sys, os
from PIL import Image, ImageDraw, ImageFont
D = os.path.dirname(os.path.abspath(__file__)); R = os.path.abspath(os.path.join(D, '..', '..', '..'))
src = open(os.path.join(D, 'face_page', 'crop.py')).read(); src = src[:src.index('out=sys.argv[1]')]
NS = {}; exec(src, NS); face = NS['face']; BG = NS['BG']
cut = sys.argv[1]
F = lambda s, b=False: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf' % ('-Bold' if b else ''), s)
CW, FH, ZH, TH, GAP = 300, 660, 340, 60, 24
cols = [('s51', 's51 CŨ (mắt xếch)'), ('s51n', 's51 MỚI (mắt tự nhiên)'), ('s54', 's54 CŨ (mắt xếch)'), ('s54n', 's54 MỚI (mắt tự nhiên)'),
        ('s10', 's10 mẫu'), ('s11', 's11 mẫu'), ('s12', 's12 mẫu')]
sheet = Image.new('RGB', (CW * len(cols) + 2 * GAP, 44 + FH + ZH + TH), (250, 247, 241)); dr = ImageDraw.Draw(sheet)
dr.text((10, 10), 'Lượt 786 — Kiêu kỳ s51 s54 vẽ lại: chỉ đổi chữ mắt ("sharply UP-SWEPT" → "gently lifted, never slanted")   |   mẫu s10 s11 s12', fill=(40, 40, 40), font=F(19, True))
for i, (s, lab) in enumerate(cols):
    x = i * CW + (GAP if i >= 2 else 0) + (GAP if i >= 4 else 0); y = 44
    im = Image.open(os.path.join(cut, f'{s}.png')).convert('RGBA')
    fig = im.crop(im.split()[3].getbbox()); sc = min((CW - 10) / fig.width, (FH - 10) / fig.height)
    fig = fig.resize((int(fig.width * sc), int(fig.height * sc)), Image.LANCZOS)
    tile = Image.new('RGB', (CW, FH), BG); tile.paste(fig, ((CW - fig.width) // 2, FH - 5 - fig.height), fig); sheet.paste(tile, (x, y))
    sheet.paste(face(os.path.join(cut, f'{s}.png')).resize((CW, ZH)), (x, y + FH))
    dr.text((x + 6, y + FH + ZH + 8), lab, fill=(120, 40, 40) if 'MỚI' in lab else (40, 40, 40), font=F(17, True))
for xx in (2 * CW + GAP // 2, 4 * CW + GAP + GAP // 2):
    dr.line((xx, 44, xx, sheet.height), fill=(150, 150, 150), width=3)
out = os.path.join(R, 'dev/handover/review-sheets/new-faces-v4/kieuky_L786_s51_s54.jpg')
sheet.save(out, quality=86); print(out, os.path.getsize(out) // 1024, 'KB', sheet.size)
