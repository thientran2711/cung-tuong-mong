#!/usr/bin/env python3
"""Lượt 761 sheet: 5 new Lạnh lùng (full figure + face zoom, 3-line tags with ROOT season + colour names + swatches),
then benchmarks s13 s14 s15. Usage: python3 make_sheet_lanhlung_L761.py <dir with sNN.png cut-outs>"""
import sys, os, json, importlib.util
from PIL import Image, ImageDraw, ImageFont
D = os.path.dirname(os.path.abspath(__file__)); R = os.path.abspath(os.path.join(D, '..', '..', '..'))
spec = importlib.util.spec_from_file_location('crop', os.path.join(D, 'face_page', 'crop.py'))
src = open(os.path.join(D, 'face_page', 'crop.py')).read(); src = src[:src.index('out=sys.argv[1]')]
NS = {}; exec(src, NS); face = NS['face']; BG = NS['BG']
cut = sys.argv[1]
pal = json.load(open(os.path.join(D, 'palettes_season.json')))
VN = {'xuan': 'Xuân', 'ha': 'Hạ', 'thu': 'Thu', 'dong': 'Đông'}
BENCH = {'s13': ('soft frost white', '#E2E6E9', 'slate blue', '#536D93'), 's14': ('soft ink blue', None, 'pale silver grey', None), 's15': ('soft pale celadon', None, 'deep teal', None)}
for k in ('s14', 's15'):
    t = open(os.path.join(D, f'{k}.v5.FULL.txt')).read()
    import re
    m = re.search(r'MAIN colour (.+?) like (#\w{6}) and the SECONDARY colour (.+?) like (#\w{6})', t); BENCH[k] = m.groups()
F = lambda s, b=False: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf' % ('-Bold' if b else ''), s)
CW, FH, ZH, TH = 300, 660, 340, 96
cols = ['s46', 's47', 's48', 's49', 's50', 's13', 's14', 's15']
GAP = 24
sheet = Image.new('RGB', (CW * 8 + GAP, 44 + FH + ZH + TH), (250, 247, 241)); dr = ImageDraw.Draw(sheet)
dr.text((10, 10), 'Lượt 761 — Lạnh lùng +5 mới (s46–s50, màu = mùa gốc ★ trong bảng 4 mùa)   |   mẫu chuẩn s13 s14 s15', fill=(40, 40, 40), font=F(20, True))
for i, s in enumerate(cols):
    x = i * CW + (GAP if i >= 5 else 0); y = 44
    im = Image.open(os.path.join(cut, f'{s}.png')).convert('RGBA')
    bb = im.split()[3].getbbox(); fig = im.crop(bb); sc = min((CW - 10) / fig.width, (FH - 10) / fig.height)
    fig = fig.resize((int(fig.width * sc), int(fig.height * sc)), Image.LANCZOS)
    tile = Image.new('RGB', (CW, FH), BG); tile.paste(fig, ((CW - fig.width) // 2, FH - 5 - fig.height), fig); sheet.paste(tile, (x, y))
    sheet.paste(face(os.path.join(cut, f'{s}.png')).resize((CW, ZH)), (x, y + FH))
    if s in pal:
        rs = pal[s]['root_season']; p = pal[s][rs]; mn, mh, sn, sh = p['main'], p['main_hex'], p['sec'], p['sec_hex']
        l1, l2 = f'{s} · Lạnh lùng · MỚI', f'gốc {VN[rs]} ★'
    else:
        mn, mh, sn, sh = BENCH[s]; l1, l2 = f'{s} · Lạnh lùng · mẫu', 'mẫu chuẩn (màu cũ)'
    ty = y + FH + ZH + 4
    dr.text((x + 6, ty), l1, fill=(20, 20, 20), font=F(17, True))
    dr.text((x + 6, ty + 24), l2, fill=(120, 40, 40) if s in pal else (90, 90, 90), font=F(16, True))
    for j, (n, h) in enumerate(((mn, mh), (sn, sh))):
        yy = ty + 48 + j * 22; dr.rectangle((x + 6, yy + 2, x + 22, yy + 18), fill=h, outline=(80, 80, 80))
        dr.text((x + 28, yy), f'{n} {h}', fill=(40, 40, 40), font=F(14))
dr.line((5 * CW + GAP // 2, 44, 5 * CW + GAP // 2, sheet.height), fill=(150, 150, 150), width=3)
out = os.path.join(R, 'dev/handover/review-sheets/new-faces-v4/lanhlung_L761.jpg')
sheet.save(out, quality=86); print(out, os.path.getsize(out) // 1024, 'KB', sheet.size)
