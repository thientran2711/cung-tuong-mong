#!/usr/bin/env python3
"""Kiêu kỳ +5 sheet (owner Lượt 760/761/763): 5 new (full figure + face zoom, tags with ROOT season + colour names + swatches),
then benchmarks s10 s11 s12 (approved Kiêu kỳ). Copy of make_sheet_lanhlung_L761.py; colours of the new ones from
s_root_colours.json (P1 NEW11 SOFT), benchmarks from their prompt files. Usage: python3 make_sheet_kieuky_L761.py <dir with sNN.png cut-outs>"""
import sys, os, re, json
from PIL import Image, ImageDraw, ImageFont
D = os.path.dirname(os.path.abspath(__file__)); R = os.path.abspath(os.path.join(D, '..', '..', '..'))
src = open(os.path.join(D, 'face_page', 'crop.py')).read(); src = src[:src.index('out=sys.argv[1]')]
NS = {}; exec(src, NS); face = NS['face']; BG = NS['BG']
cut = sys.argv[1]
sr = json.load(open(os.path.join(D, 's_root_colours.json')))
VN = {'xuan': 'Xuân', 'ha': 'Hạ', 'thu': 'Thu', 'dong': 'Đông'}
NEW = ['s51', 's52', 's53', 's54', 's55']; BEN = ['s10', 's11', 's12']
BENCH = {}
for k, f in (('s10', 's10.v5'), ('s11', 's11.v5'), ('s12', 's12.v5b')):
    p = os.path.join(D, f + '.FULL.txt'); p = p if os.path.exists(p) else os.path.join(D, k + '.v5.FULL.txt')
    BENCH[k] = re.search(r'MAIN colour (.+?) like (#\w{6}) and the SECONDARY colour (.+?) like (#\w{6})', open(p).read()).groups()
F = lambda s, b=False: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf' % ('-Bold' if b else ''), s)
CW, FH, ZH, TH, GAP = 300, 660, 340, 96, 24
cols = NEW + BEN
sheet = Image.new('RGB', (CW * len(cols) + GAP, 44 + FH + ZH + TH), (250, 247, 241)); dr = ImageDraw.Draw(sheet)
dr.text((10, 10), 'Kiêu kỳ +5 mới (s51–s55, màu = cặp gốc ★ P1 NEW11 SOFT)   |   mẫu chuẩn s10 s11 s12', fill=(40, 40, 40), font=F(20, True))
for i, s in enumerate(cols):
    x = i * CW + (GAP if i >= len(NEW) else 0); y = 44
    im = Image.open(os.path.join(cut, f'{s}.png')).convert('RGBA')
    fig = im.crop(im.split()[3].getbbox()); sc = min((CW - 10) / fig.width, (FH - 10) / fig.height)
    fig = fig.resize((int(fig.width * sc), int(fig.height * sc)), Image.LANCZOS)
    tile = Image.new('RGB', (CW, FH), BG); tile.paste(fig, ((CW - fig.width) // 2, FH - 5 - fig.height), fig); sheet.paste(tile, (x, y))
    sheet.paste(face(os.path.join(cut, f'{s}.png')).resize((CW, ZH)), (x, y + FH))
    if s in NEW:
        r = sr[s]; mn, mh, sn, sh = r['main'], r['main_hex'], r['sec'], r['sec_hex']
        l1, l2 = f'{s} · Kiêu kỳ · MỚI', f"gốc {VN.get(r.get('root_season'), '?')} ★"
    else:
        mn, mh, sn, sh = BENCH[s]; l1, l2 = f'{s} · Kiêu kỳ · mẫu', 'mẫu chuẩn (màu cũ)'
    ty = y + FH + ZH + 4
    dr.text((x + 6, ty), l1, fill=(20, 20, 20), font=F(17, True))
    dr.text((x + 6, ty + 24), l2, fill=(120, 40, 40) if s in NEW else (90, 90, 90), font=F(16, True))
    for j, (n, h) in enumerate(((mn, mh), (sn, sh))):
        yy = ty + 48 + j * 22; dr.rectangle((x + 6, yy + 2, x + 22, yy + 18), fill=h, outline=(80, 80, 80))
        dr.text((x + 28, yy), f'{n} {h}', fill=(40, 40, 40), font=F(14))
dr.line((len(NEW) * CW + GAP // 2, 44, len(NEW) * CW + GAP // 2, sheet.height), fill=(150, 150, 150), width=3)
out = os.path.join(R, 'dev/handover/review-sheets/new-faces-v4/kieuky_L761.jpg')
sheet.save(out, quality=86); print(out, os.path.getsize(out) // 1024, 'KB', sheet.size)
for s in NEW: face(os.path.join(cut, f'{s}.png')).save(os.path.join(D, 'face_page', 'faces', f'{s}.jpg'), quality=84)
