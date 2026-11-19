#!/usr/bin/env python3
"""Quyến rũ +6 sheet (owner Lượt 760/761/763, GO Lượt 789): 6 new (a new one with no cut-out = empty slot with its note) (full figure + face zoom, tags with ROOT season + colour names + swatches),
then benchmarks s16 s33 s34 (approved Quyến rũ). Copy of make_sheet_kieuky_L761.py; colours of the new ones from
s_root_colours.json (P1 SOFT); benchmarks from s_root_colours.json too (their drawn colours). Usage: python3 make_sheet_kieuky_L761.py <dir with sNN.png cut-outs>"""
import sys, os, re, json
from PIL import Image, ImageDraw, ImageFont
D = os.path.dirname(os.path.abspath(__file__)); R = os.path.abspath(os.path.join(D, '..', '..', '..'))
src = open(os.path.join(D, 'face_page', 'crop.py')).read(); src = src[:src.index('out=sys.argv[1]')]
NS = {}; exec(src, NS); face = NS['face']; BG = NS['BG']
cut = sys.argv[1]
sr = json.load(open(os.path.join(D, 's_root_colours.json')))
VN = {'xuan': 'Xuân', 'ha': 'Hạ', 'thu': 'Thu', 'dong': 'Đông'}
NEW = ['s56', 's57', 's58', 's59', 's60', 's61']; BEN = ['s16', 's33', 's34']
MISSING = {'s60': ['chưa có hình:', 'Magnific chặn (NSFW)', 'lượt 1/1, chờ quản đốc']}
BENCH = {k: (sr[k]['main'], sr[k]['main_hex'], sr[k]['sec'], sr[k]['sec_hex']) for k in BEN}
F = lambda s, b=False: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf' % ('-Bold' if b else ''), s)
CW, FH, ZH, TH, GAP = 280, 660, 340, 96, 24
cols = NEW + BEN
sheet = Image.new('RGB', (CW * len(cols) + GAP, 44 + FH + ZH + TH), (250, 247, 241)); dr = ImageDraw.Draw(sheet)
dr.text((10, 10), 'Quyến rũ +6 mới (s56–s61, màu = cặp gốc ★ P1 SOFT)   |   mẫu chuẩn s16 s33 s34', fill=(40, 40, 40), font=F(20, True))
for i, s in enumerate(cols):
    x = i * CW + (GAP if i >= len(NEW) else 0); y = 44
    if s in MISSING:
        dr.rectangle((x + 4, y + 4, x + CW - 4, y + FH + ZH - 4), outline=(170, 60, 60), width=3)
        for j, t in enumerate(MISSING[s]): dr.text((x + 20, y + 260 + j * 26), t, fill=(150, 40, 40), font=F(17, True))
    else:
      im = Image.open(os.path.join(cut, f'{s}.png')).convert('RGBA')
      fig = im.crop(im.split()[3].getbbox()); sc = min((CW - 10) / fig.width, (FH - 10) / fig.height)
      fig = fig.resize((int(fig.width * sc), int(fig.height * sc)), Image.LANCZOS)
      tile = Image.new('RGB', (CW, FH), BG); tile.paste(fig, ((CW - fig.width) // 2, FH - 5 - fig.height), fig); sheet.paste(tile, (x, y))
      sheet.paste(face(os.path.join(cut, f'{s}.png')).resize((CW, ZH)), (x, y + FH))
    if s in NEW:
        r = sr[s]; mn, mh, sn, sh = r['main'], r['main_hex'], r['sec'], r['sec_hex']
        l1, l2 = f'{s} · Quyến rũ · MỚI', f"gốc {VN.get(r.get('root_season'), '?')} ★"
    else:
        mn, mh, sn, sh = BENCH[s]; l1, l2 = f'{s} · Quyến rũ · mẫu', 'mẫu chuẩn (đã duyệt)'
    ty = y + FH + ZH + 4
    dr.text((x + 6, ty), l1, fill=(20, 20, 20), font=F(17, True))
    dr.text((x + 6, ty + 24), l2, fill=(120, 40, 40) if s in NEW else (90, 90, 90), font=F(16, True))
    for j, (n, h) in enumerate(((mn, mh), (sn, sh))):
        yy = ty + 48 + j * 22; dr.rectangle((x + 6, yy + 2, x + 22, yy + 18), fill=h, outline=(80, 80, 80))
        dr.text((x + 28, yy), f'{n} {h}', fill=(40, 40, 40), font=F(14))
dr.line((len(NEW) * CW + GAP // 2, 44, len(NEW) * CW + GAP // 2, sheet.height), fill=(150, 150, 150), width=3)
out = os.path.join(R, 'dev/handover/review-sheets/new-faces-v4/quyenru_L761.jpg')
sheet.save(out, quality=86); print(out, os.path.getsize(out) // 1024, 'KB', sheet.size)
for s in NEW:
    if s not in MISSING: face(os.path.join(cut, f'{s}.png')).save(os.path.join(D, 'face_page', 'faces', f'{s}.jpg'), quality=84)
