#!/usr/bin/env python3
"""PAL5 (owner: sheets hard to compare): one season per sheet, CŨ L1583 LEFT | MỚI L1726 RIGHT, same person on the same row,
90 people in group order, phone width 1080 px, split in 2 halves (45 rows) so text stays readable.
Out: dev/handover/review-sheets/pal_L1726/sosanh_{xuan,ha,thu,dong}_{1,2}.png   Run from repo root."""
import json, os, sys
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import four_season_L1726  # noqa: F401
import four_season_L1709 as M
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
FC = os.path.join(ROOT, 'dev/art/face-common')
new = json.load(open(os.path.join(FC, 'palettes_season_L1726.json'))); old = json.load(open(os.path.join(FC, 'palettes_season_L1583.json')))
OUT = os.path.join(ROOT, 'dev/handover/review-sheets/pal_L1726'); os.makedirs(OUT, exist_ok=True)
FR, FBD = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
f = lambda n, b=False: ImageFont.truetype(FBD if b else FR, n)
SEAS = [('xuan', 'XUÂN'), ('ha', 'HẠ'), ('thu', 'THU'), ('dong', 'ĐÔNG')]
P = sorted([k for k in new if k[0] in 'mcs' and k[1:].isdigit()], key=lambda k: (M.GORDER.index(new[k]['group']), k))
W, RH, TOP, XO, XN, HALF = 1080, 96, 170, 200, 640, 45


def fit(dr, txt, size, bold, maxw):
    while size > 14 and dr.textlength(txt, font=f(size, bold)) > maxw: size -= 1
    return f(size, bold)


def side(dr, x, y, e, dim=False):
    dr.rectangle([x, y + 10, x + 84, y + RH - 10], fill=e['main_hex'], outline='#777')
    dr.rectangle([x + 90, y + 26, x + 124, y + RH - 10], fill=e['sec_hex'], outline='#777')
    c1, c2 = ('#888', '#999') if dim else ('#111', '#444')
    t = ('★ ' if e.get('root') else '') + e['main_vi']; tx = x + 132; mw = (XN - 52 if x < XN else W - 8) - tx
    dr.text((tx, y + 14), t, font=fit(dr, t, 25, True, mw), fill=c1)
    t2 = '+ ' + e['sec_vi']; dr.text((tx, y + 52), t2, font=fit(dr, t2, 22, False, mw), fill=c2)


for s, sn in SEAS:
    for h in range(2):
        rows = P[h * HALF:(h + 1) * HALF]
        im = Image.new('RGB', (W, TOP + RH * len(rows) + 20), 'white'); dr = ImageDraw.Draw(im)
        dr.text((16, 12), f'MÙA {sn} · so sánh bảng màu · tờ {h + 1}/2', font=f(40, True), fill='#111')
        dr.text((16, 64), '★ = màu gốc · ô to = màu chính, ô nhỏ = màu phụ · chữ xám = không đổi', font=f(22), fill='#555')
        dr.rectangle([XO - 6, 104, XN - 14, 160], fill='#EEE'); dr.rectangle([XN - 6, 104, W - 6, 160], fill='#E3F1E6')
        dr.text((XO + 4, 114), 'CŨ (L1583)', font=f(30, True), fill='#555'); dr.text((XN + 4, 114), 'MỚI (L1726) ✓ duyệt', font=f(30, True), fill='#0B5A33')
        dr.text((16, 118), 'Người', font=f(28, True), fill='#111')
        g0 = None
        for i, p in enumerate(rows):
            y = TOP + i * RH; o, n = old[p][s], new[p][s]
            if i % 2: dr.rectangle([0, y, W, y + RH], fill='#F6F6F6')
            gr = new[p]['group']
            if gr != g0: dr.line([0, y, W, y], fill='#333', width=3); g0 = gr
            dr.text((16, y + 12), p, font=f(32, True), fill='#111'); dr.text((16, y + 56), gr, font=f(19), fill='#555')
            same = (o['main_hex'], o['sec_hex']) == (n['main_hex'], n['sec_hex'])
            side(dr, XO, y, o, dim=same); side(dr, XN, y, n, dim=same)
            dr.text((XN - 44, y + 28), '=' if same else '→', font=f(30, True), fill='#999' if same else '#B00')
        im.save(os.path.join(OUT, f'sosanh_{s}_{h + 1}.png'))
print('ok', len(P))
