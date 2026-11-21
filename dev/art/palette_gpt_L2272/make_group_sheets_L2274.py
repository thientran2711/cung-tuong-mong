#!/usr/bin/env python3
"""PALGPT1: one swatch sheet per group: our id (sNN) next to the GPT code, 4 seasons x 8 slots
(Chính, Phụ, Nhấn, Hoa, Voan, Lông ngoài/trong/đầu). Reads LIVE palettes_season.json gpt_code + parsed.json. Out: sheet_L2274_<GROUP>.png here."""
import json, os
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__)); FC = os.path.join(os.path.dirname(HERE), 'face-common')
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
P = json.load(open(os.path.join(FC, 'palettes_season.json'), encoding='utf-8'))
G = {c: s for c, s in json.load(open(os.path.join(HERE, 'parsed.json'), encoding='utf-8'))}
SEAS = [('xuan', 'XUÂN'), ('ha', 'HẠ'), ('thu', 'THU'), ('dong', 'ĐÔNG')]
SL = ['Chính', 'Phụ', 'Nhấn', 'Hoa', 'Voan', 'L.ngoài', 'L.trong', 'L.đầu']
GN = {'QR': 'Quyến rũ', 'SS': 'Sắc sảo', 'KK': 'Kiêu kỳ', 'LL': 'Lạnh lùng', 'DD': 'Dịu dàng', 'DT': 'Đoan trang'}
f = ImageFont.truetype(FONT, 15); fs = ImageFont.truetype(FONT, 12); fb = ImageFont.truetype(FB, 18); ft = ImageFont.truetype(FB, 28)
SW, SH, LW, GAP = 52, 40, 150, 24
for pre, gname in GN.items():
    ppl = sorted((v['gpt_code'], k) for k, v in P.items() if isinstance(v, dict) and v.get('gpt_code', '').startswith(pre))
    W = LW + 4 * (8 * SW + GAP) + 20; H = 110 + len(ppl) * (SH + 30) + 20
    im = Image.new('RGB', (W, H), '#FAF8F4'); d = ImageDraw.Draw(im)
    d.text((20, 14), f'{gname} ({pre}) — bảng màu ChatGPT v3 vào game (L2274) · tên của mình ↔ mã GPT', font=ft, fill='#302A35')
    for j, (s, sv) in enumerate(SEAS):
        x0 = LW + j * (8 * SW + GAP); d.text((x0, 58), sv, font=fb, fill='#302A35')
        for i, n in enumerate(SL): d.text((x0 + i * SW + 2, 84), n, font=fs, fill='#555')
    for r, (code, k) in enumerate(ppl):
        y = 110 + r * (SH + 30)
        d.text((16, y + 6), f'{k}', font=fb, fill='#302A35'); d.text((80, y + 9), f'= {code}', font=f, fill='#683967')
        for j, (s, _) in enumerate(SEAS):
            x0 = LW + j * (8 * SW + GAP)
            for i, hx in enumerate(G[code][j]):
                d.rectangle([x0 + i * SW, y, x0 + i * SW + SW - 4, y + SH], fill=hx, outline='#0003')
            d.text((x0, y + SH + 3), f"{P[k][s]['main_vi']} / {P[k][s]['sec_vi']}"[:58], font=fs, fill='#444')
    im.save(os.path.join(HERE, f'sheet_L2274_{pre}.png'), optimize=True)
    print(pre, len(ppl), im.size)
