#!/usr/bin/env python3
"""DESIGN21 (owner L1679): readable sheets of palettes_season_L1679.json in the bangmau_90 format (3 sheets × 30 people)
+ one small sheet Hạ s10–s50 CŨ (L1583) | MỚI (L1679). 0 credits. Run from the repo root."""
import json, os
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
d = json.load(open(os.path.join(ROOT, 'dev/art/face-common/palettes_season_L1679.json')))
OUT = os.path.join(ROOT, 'dev/handover/review-sheets/pal_L1679'); os.makedirs(OUT, exist_ok=True)
F, FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
f = lambda n, b=False: ImageFont.truetype(FB if b else F, n)
GORDER = ['Dịu dàng', 'Đoan trang', 'Quyến rũ', 'Sắc sảo', 'Kiêu kỳ', 'Lạnh lùng']
SEAS = [('xuan', 'XUÂN'), ('ha', 'HẠ'), ('thu', 'THU'), ('dong', 'ĐÔNG')]
P = sorted([k for k in d if not k.startswith('_') and k != 'status'], key=lambda k: (GORDER.index(d[k]['group']), k))
W, RH, TOP, X0, CW = 2200, 62, 130, 330, 465


def cell(dr, x, y, e, w_name=True):
    dr.rectangle([x, y + 8, x + 70, y + 56], fill=e['main_hex'], outline='#888')
    dr.rectangle([x + 76, y + 18, x + 106, y + 56], fill=e['sec_hex'], outline='#888')
    star = '★' if e['root'] else ''
    dr.text((x + 116, y + 8), star + e['main_vi'], font=f(21, True), fill='#111')
    dr.text((x + 116, y + 36), '+ ' + e['sec_vi'], font=f(19), fill='#444')


for i in range(3):
    rows = P[i * 30:(i + 1) * 30]
    im = Image.new('RGB', (W, TOP + RH * len(rows) + 30), 'white'); dr = ImageDraw.Draw(im)
    dr.text((20, 14), f'Bảng màu mới L1679 · 0 cr · tờ {i + 1}/3 (người {i * 30 + 1}–{i * 30 + len(rows)}) · ô to = màu chính, ô nhỏ = màu phụ · ★ = màu gốc', font=f(30, True), fill='#111')
    dr.text((20, 72), 'Mã · nhóm', font=f(28, True), fill='#111')
    for j, (s, n) in enumerate(SEAS): dr.text((X0 + j * CW, 70), n, font=f(34, True), fill='#111')
    dr.line([0, TOP - 4, W, TOP - 4], fill='#999', width=2)
    for r, p in enumerate(rows):
        y = TOP + r * RH
        if r % 2: dr.rectangle([0, y, W, y + RH], fill='#F3F3F3')
        dr.text((20, y + 14), p, font=f(30, True), fill='#111'); dr.text((110, y + 20), d[p]['group'], font=f(21), fill='#444')
        for j, (s, n) in enumerate(SEAS): cell(dr, X0 + j * CW, y, d[p][s])
    im.save(os.path.join(OUT, f'bangmau_L1679_to{i + 1}.png'))

# Hạ s10–s50: CŨ | MỚI
ha = [p for p in sorted(d) if p.startswith('s') and p[1:].isdigit() and 10 <= int(p[1:]) <= 50]
cols = 2; per = (len(ha) + 1) // cols; RH2 = 54
im = Image.new('RGB', (2200, 150 + RH2 * per), 'white'); dr = ImageDraw.Draw(im)
dr.text((20, 14), 'Bảng màu mới L1679 · 0 cr · MÙA HẠ s10–s50: CŨ (L1583) → MỚI (L1679)', font=f(32, True), fill='#111')
for c in range(cols):
    x = 20 + c * 1090
    dr.text((x, 74), 'Mã', font=f(24, True), fill='#111'); dr.text((x + 110, 74), 'CŨ', font=f(26, True), fill='#111'); dr.text((x + 560, 74), 'MỚI', font=f(26, True), fill='#111')
    for r, p in enumerate(ha[c * per:(c + 1) * per]):
        y = 112 + r * RH2; e = d[p]['ha']
        if r % 2: dr.rectangle([x - 10, y, x + 1070, y + RH2], fill='#F3F3F3')
        dr.text((x, y + 12), p, font=f(26, True), fill='#111')
        dr.rectangle([x + 110, y + 6, x + 180, y + 48], fill=e['main_L1583'], outline='#888')
        dr.rectangle([x + 186, y + 14, x + 210, y + 48], fill=e['sec_L1583'], outline='#888')
        dr.text((x + 222, y + 14), e['main_L1583'], font=f(18), fill='#444')
        dr.text((x + 470, y + 8), '→', font=f(30, True), fill='#111')
        dr.rectangle([x + 560, y + 6, x + 630, y + 48], fill=e['main_hex'], outline='#888')
        dr.rectangle([x + 636, y + 14, x + 660, y + 48], fill=e['sec_hex'], outline='#888')
        dr.text((x + 672, y + 12), ('★' if e['root'] else '') + e['main_vi'], font=f(21, True), fill='#111')
im.save(os.path.join(OUT, 'ha_s10_s50_cu_moi.png'))
print('ok', OUT)
