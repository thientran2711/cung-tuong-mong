#!/usr/bin/env python3
"""F3 sheet: s43 s44 s45 moved Sắc sảo → Quyến rũ. Per person OLD (Sắc sảo cut) | NEW (Quyến rũ cut), full figure + face zoom,
BIG labels on the image (A27), swatches = root_drawn (L27); then benchmarks s16 s33 s34 (approved Quyến rũ).
A person whose new cut is missing gets an empty NEW slot with a note. Copy of make_sheet_quyenru_L761.py layout.
Usage: python3 make_sheet_quyenru_s43_45.py <dir with sNN.png (new) + sNN_old.png (old) + benchmark sNN.png>"""
import sys, os, json
from PIL import Image, ImageDraw, ImageFont
D = os.path.dirname(os.path.abspath(__file__)); R = os.path.abspath(os.path.join(D, '..', '..', '..'))
src = open(os.path.join(D, 'face_page', 'crop.py')).read(); src = src[:src.index('out=sys.argv[1]')]
NS = {}; exec(src, NS); face = NS['face']; BG = NS['BG']
cut = sys.argv[1]
ps = json.load(open(os.path.join(D, 'palettes_season.json'))); sr = json.load(open(os.path.join(D, 's_root_colours.json')))
VN = {'xuan': 'Xuân', 'ha': 'Hạ', 'thu': 'Thu', 'dong': 'Đông'}
def rd(k):
    p = ps[k]; r = p[p['root_season']].get('root_drawn') or p[p['root_season']]; return r['main'], r['main_hex'], r['sec'], r['sec_hex'], VN[p['root_season']]
PEOPLE = ['s43', 's44', 's45']; BEN = ['s16', 's33', 's34']
MISSING = {}
OK = {'s43': 'chủ OK Lượt 950', 's45': 'chủ OK Lượt 950', 's44': 'chờ chủ xem (mới vẽ)'}
DEEP = json.load(open(os.path.join(D, 'palettes_season_deep.json')))   # s44 NEW: sec sage grey -> sage green (owner 'Xám là bỏ hết')
F = lambda s, b=False: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf' % ('-Bold' if b else ''), s)
CW, FH, ZH, HH, TH, GAP = 300, 700, 360, 60, 110, 30
cols = [(s, 'old') for s in PEOPLE for _ in [0]] ; cols = []
for s in PEOPLE: cols += [(s, 'old'), (s, 'new')]
cols += [(s, 'ben') for s in BEN]
W = CW * len(cols) + GAP * 3
sheet = Image.new('RGB', (W, 70 + HH + FH + ZH + TH), (250, 247, 241)); dr = ImageDraw.Draw(sheet)
dr.text((12, 12), 'Thiếu nữ khuê các · Sắc sảo → QUYẾN RŨ (s43 s44 s45) · CŨ | MỚI   ‖   mẫu Quyến rũ đã duyệt s16 s33 s34', fill=(30, 30, 30), font=F(30, True))
x = 0
for i, (s, kind) in enumerate(cols):
    if i and kind == 'old' or (kind == 'ben' and cols[i - 1][1] != 'ben'): x += GAP
    y = 70
    hdr = {'old': f'{s} · Sắc sảo → QUYẾN RŨ · CŨ', 'new': f'{s} · Sắc sảo → QUYẾN RŨ · MỚI', 'ben': f'{s} · Quyến rũ · MẪU'}[kind]
    col = {'old': (110, 110, 110), 'new': (170, 30, 60), 'ben': (40, 90, 40)}[kind]
    dr.rectangle((x + 2, y, x + CW - 2, y + HH - 4), fill=col)
    dr.text((x + 8, y + 4), hdr.split(' · ', 1)[0] + ' · ' + {'old': 'CŨ (Sắc sảo)', 'new': 'MỚI (Quyến rũ)', 'ben': 'MẪU (đã duyệt)'}[kind], fill='white', font=F(22, True))
    dr.text((x + 8, y + 32), 'Sắc sảo → QUYẾN RŨ' if kind != 'ben' else 'Quyến rũ', fill='white', font=F(18, True))
    y += HH
    fn = os.path.join(cut, f'{s}_old.png' if kind == 'old' else f'{s}.png')
    if (kind == 'new' and s in MISSING) or not os.path.exists(fn):
        dr.rectangle((x + 4, y + 4, x + CW - 4, y + FH + ZH - 4), outline=(170, 60, 60), width=3)
        for j, t in enumerate(MISSING.get(s, ['(không có ảnh)'])): dr.text((x + 20, y + 300 + j * 30), t, fill=(150, 40, 40), font=F(19, True))
    else:
        im = Image.open(fn).convert('RGBA'); fig = im.crop(im.split()[3].getbbox())
        sc = min((CW - 10) / fig.width, (FH - 10) / fig.height); fig = fig.resize((int(fig.width * sc), int(fig.height * sc)), Image.LANCZOS)
        tile = Image.new('RGB', (CW, FH), BG); tile.paste(fig, ((CW - fig.width) // 2, FH - 5 - fig.height), fig); sheet.paste(tile, (x, y))
        sheet.paste(face(fn).resize((CW, ZH)), (x, y + FH))
    if kind == 'ben': mn, mh, sn, sh = sr[s]['main'], sr[s]['main_hex'], sr[s]['sec'], sr[s]['sec_hex']; l2 = 'mẫu chuẩn'
    else:
        mn, mh, sn, sh, season = rd(s); l2 = f'gốc {season} ★ màu đậm (L27)'
        if kind == 'new' and s == 's44':
            r = next(v for v in DEEP['s44'].values() if isinstance(v, dict) and v.get('root')); mn, mh, sn, sh = r['main'], r['main_hex'], r['sec'], r['sec_hex']; l2 = l2.replace(' (L27)', ' · hết xám')
    ty = y + FH + ZH + 6
    dr.text((x + 6, ty), l2, fill=(90, 40, 40), font=F(17, True))
    for j, (n, h) in enumerate(((mn, mh), (sn, sh))):
        yy = ty + 28 + j * 26; dr.rectangle((x + 6, yy + 2, x + 26, yy + 22), fill=h, outline=(80, 80, 80))
        dr.text((x + 32, yy + 2), f'{n} {h}', fill=(40, 40, 40), font=F(15))
    if kind == 'new': dr.text((x + 6, ty + 80), OK[s], fill=(0, 120, 0) if 'OK' in OK[s] else (170, 30, 60), font=F(18, True))
    x += CW
out = os.path.join(R, 'dev/handover/review-sheets/new-faces-v4/quyenru_s43_45_F3.jpg')
sheet.save(out, quality=86); print(out, os.path.getsize(out) // 1024, 'KB', sheet.size)
for s in []:   # old crops stay until the owner approves the new pictures
  for s in PEOPLE:
    fn = os.path.join(cut, f'{s}.png')
    if s not in MISSING and os.path.exists(fn): face(fn).save(os.path.join(D, 'face_page', 'faces', f'{s}.jpg'), quality=84)
