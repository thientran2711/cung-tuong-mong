#!/usr/bin/env python3
"""PAL4 (owner L1726; copy of sheet_L1726.py): readable sheets of palettes_season_L1726.json. 0 credits. Run from anywhere.
  bangmau_L1726_to1..3.png  — bangmau_90 format (3 sheets × 30 people, 4 seasons)
  bangmau_theomua_L1583.png / bangmau_theomua_L1726.png — per season: one row per colour family, count, every main (dark → light)
  s33_s42_cu_moi.png        — s33–s42, every season CŨ (L1583) | MỚI (L1726)"""
import json, os, sys, collections
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from colourlib import oklch
import four_season_L1726  # noqa: F401  (patches the engine: L1726 families + DST)
import four_season_L1709 as M
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
new = json.load(open(M.DST)); old = json.load(open(M.SRC))
OUT = os.path.join(ROOT, 'dev/handover/review-sheets/pal_L1726'); os.makedirs(OUT, exist_ok=True)
FR, FBD = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
f = lambda n, b=False: ImageFont.truetype(FBD if b else FR, n)
SEAS = [('xuan', 'XUÂN'), ('ha', 'HẠ'), ('thu', 'THU'), ('dong', 'ĐÔNG')]
P = sorted([k for k in new if not k.startswith('_') and k != 'status'], key=lambda k: (M.GORDER.index(new[k]['group']), k))
W, RH, TOP, X0, CW = 2200, 62, 130, 330, 465


def cell(dr, x, y, e):
    dr.rectangle([x, y + 8, x + 70, y + 56], fill=e['main_hex'], outline='#888')
    dr.rectangle([x + 76, y + 18, x + 106, y + 56], fill=e['sec_hex'], outline='#888')
    dr.text((x + 116, y + 8), ('★' if e['root'] else '') + e['main_vi'], font=f(21, True), fill='#111')
    dr.text((x + 116, y + 36), '+ ' + e['sec_vi'], font=f(19), fill='#444')


for i in range(3):
    rows = P[i * 30:(i + 1) * 30]
    im = Image.new('RGB', (W, TOP + RH * len(rows) + 30), 'white'); dr = ImageDraw.Draw(im)
    dr.text((20, 14), f'Bảng màu MỚI L1726 · theo cảm giác mùa, độ dịu L1583 · tờ {i + 1}/3 (người {i * 30 + 1}–{i * 30 + len(rows)}) · ★ = màu gốc · 0 cr', font=f(29, True), fill='#111')
    dr.text((20, 72), 'Mã · nhóm', font=f(28, True), fill='#111')
    for j, (s, n) in enumerate(SEAS): dr.text((X0 + j * CW, 70), n, font=f(34, True), fill='#111')
    dr.line([0, TOP - 4, W, TOP - 4], fill='#999', width=2)
    for r, p in enumerate(rows):
        y = TOP + r * RH
        if r % 2: dr.rectangle([0, y, W, y + RH], fill='#F3F3F3')
        dr.text((20, y + 14), p, font=f(30, True), fill='#111'); dr.text((110, y + 20), new[p]['group'], font=f(21), fill='#444')
        for j, (s, n) in enumerate(SEAS): cell(dr, X0 + j * CW, y, new[p][s])
    im.save(os.path.join(OUT, f'bangmau_L1726_to{i + 1}.png'))


def theomua(d, tag, title):
    BW, BH, G = 36, 34, 4
    im = Image.new('RGB', (2060, 1760), 'white'); dr = ImageDraw.Draw(im)
    dr.text((20, 14), title, font=f(44, True), fill='#111')
    dr.text((20, 76), 'Mỗi dòng = 1 họ màu · số = bao nhiêu người · ô = màu chính của từng người (từ đậm → nhạt) · chấm trắng = màu gốc ★ · 0 cr · TỔNG 0 cr',
            font=f(22, True), fill='#9A0E2A')
    for k, (s, n) in enumerate(SEAS):
        bx, by = 20 + (k % 2) * 1020, 130 + (k // 2) * 815
        dr.rectangle([bx, by, bx + 1000, by + 795], outline='#BBB', width=2)
        groups = collections.defaultdict(list)
        for p in P:
            e = d[p][s]; groups[e.get('_fam') or M.fam_of(e['main_hex'], s)].append(e)
        fams = [x[0] for x in M.FAM[s]]
        dr.text((bx + 16, by + 10), f'{n}  ({sum(1 for x in fams if groups[x])} họ màu)', font=f(38, True), fill='#111')
        y = by + 66
        for fam in fams:
            es = sorted(groups[fam], key=lambda e: oklch(e['main_hex'])[0])
            dr.text((bx + 16, y), f'{fam} · {len(es)} người', font=f(27, True), fill='#0B5A33'); y += 38
            for i, e in enumerate(es):
                cx, cy = bx + 16 + (i % 24) * (BW + G), y + (i // 24) * (BH + G)
                dr.rectangle([cx, cy, cx + BW, cy + BH], fill=e['main_hex'], outline='#777')
                if e['root']: dr.ellipse([cx + 13, cy + 12, cx + 23, cy + 22], fill='white', outline='#333')
            y += ((max(len(es), 1) - 1) // 24 + 1) * (BH + G) + 14
    im.save(os.path.join(OUT, f'bangmau_theomua_{tag}.png'))


theomua(new, 'L1726', 'Bảng màu chung từng mùa · MỚI L1726 (chờ duyệt) · 90 người')
theomua(old, 'L1583', 'Bảng màu chung từng mùa · CŨ L1583 (đã ưng tông) · 90 người')

# s33–s42: CŨ | MỚI, every season
ids = [f's{i}' for i in range(33, 43)]
RH2, X2, CW2 = 92, 250, 485
im = Image.new('RGB', (2200, 160 + RH2 * len(ids) + 20), 'white'); dr = ImageDraw.Draw(im)
dr.text((20, 14), 'Bảng màu s33–s42 · mỗi mùa: CŨ (L1583) → MỚI (L1726) · ô to = màu chính, ô nhỏ = màu phụ · ★ = màu gốc · 0 cr', font=f(29, True), fill='#111')
dr.text((20, 100), 'Mã · nhóm', font=f(24, True), fill='#111')
for j, (s, n) in enumerate(SEAS):
    dr.text((X2 + j * CW2, 66), n, font=f(34, True), fill='#111')
    dr.text((X2 + j * CW2, 110), 'CŨ', font=f(22, True), fill='#555'); dr.text((X2 + j * CW2 + 150, 110), 'MỚI', font=f(22, True), fill='#555')
dr.line([0, 150, 2200, 150], fill='#999', width=2)
for r, p in enumerate(ids):
    y = 156 + r * RH2
    if r % 2: dr.rectangle([0, y, 2200, y + RH2], fill='#F3F3F3')
    dr.text((20, y + 16), p, font=f(32, True), fill='#111'); dr.text((20, y + 56), new[p]['group'], font=f(20), fill='#444')
    for j, (s, n) in enumerate(SEAS):
        x = X2 + j * CW2; o, e = old[p][s], new[p][s]
        dr.rectangle([x, y + 8, x + 80, y + 62], fill=o['main_hex'], outline='#888')
        dr.rectangle([x + 86, y + 20, x + 112, y + 62], fill=o['sec_hex'], outline='#888')
        dr.text((x + 118, y + 18), '→', font=f(26, True), fill='#111')
        dr.rectangle([x + 150, y + 8, x + 230, y + 62], fill=e['main_hex'], outline='#888')
        dr.rectangle([x + 236, y + 20, x + 262, y + 62], fill=e['sec_hex'], outline='#888')
        dr.text((x + 270, y + 10), ('★' if e['root'] else '') + e['main_vi'], font=f(15, True), fill='#111')
        dr.text((x + 270, y + 36), '+ ' + e['sec_vi'], font=f(14), fill='#444')
        dr.text((x, y + 66), 'giữ nguyên' if o['main_hex'] == e['main_hex'] else o['main_vi'], font=f(16), fill='#666')
im.save(os.path.join(OUT, 's33_s42_cu_moi.png'))
print('ok', OUT)
