"""PAL3 — owner L1675: readable sheets of the NEW palette (G50) for the owner to judge the season feel.
One row per person, columns XUÂN | HẠ | THU | ĐÔNG; each cell = big main swatch + small phụ swatch + Vietnamese names.
~15 people per sheet, ordered by group. Source dev/art/face-common/palettes_season_L1583.json. 0 credits.
Out: dev/handover/review-sheets/palette_G50_L1675/bang_mau_moi_NN.png"""
import json, os
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'face-common', 'palettes_season_L1583.json')
OUT = os.path.join(HERE, '..', '..', 'handover', 'review-sheets', 'palette_G50_L1675')
F = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
T = lambda f, n: ImageFont.truetype(f, n)
SEAS = [('xuan', 'XUÂN', 'tươi, trong, hoa nở: hồng đào, xanh lá non', '#E9F5E1', '#3E7D3A'),
        ('ha', 'HẠ', 'nắng sáng, rực vừa: cam đào, vàng chanh, xanh trời', '#FFF3D6', '#B5651D'),
        ('thu', 'THU', 'trầm ấm, lá úa: ô liu, rêu, đất nung, đỏ rượu', '#F4E6D2', '#7A4A1E'),
        ('dong', 'ĐÔNG', 'lạnh, trong: tím, xanh ngọc, mòng két', '#E3ECF7', '#2F4F86')]
GORDER = ['Dịu dàng', 'Đoan trang', 'Sắc sảo', 'Kiêu kỳ', 'Quyến rũ', 'Lạnh lùng']
W, PAD, IDW, CW, RH = 2600, 30, 300, 560, 230
BG, INK, SUB = '#FBF8F2', '#222222', '#666666'
d = json.load(open(SRC))
ppl = [k for k in d if not k.startswith('_') and k != 'status']
ppl.sort(key=lambda k: (GORDER.index(d[k]['group']) if d[k]['group'] in GORDER else 9, k))
pages = [ppl[i:i + 15] for i in range(0, len(ppl), 15)]
os.makedirs(OUT, exist_ok=True)
fT, fS, fH, fF, fID, fG, fN, fX = T(FB, 56), T(F, 30), T(FB, 46), T(F, 26), T(FB, 46), T(F, 28), T(FB, 30), T(F, 25)

def wrap(dr, text, font, width):
    out, line = [], ''
    for w in text.split():
        t = (line + ' ' + w).strip()
        if dr.textlength(t, font=font) <= width: line = t
        else: out.append(line); line = w
    return out + [line]

for n, page in enumerate(pages, 1):
    HEAD = 290
    H = HEAD + RH * len(page) + 90
    im = Image.new('RGB', (W, H), BG); dr = ImageDraw.Draw(im)
    dr.text((PAD, 24), f'Bảng màu mới (G50) · 0 cr   —   tờ {n}/{len(pages)}', font=fT, fill=INK)
    dr.text((PAD, 96), 'Ô LỚN = màu CHÍNH (áo)   ·   ô nhỏ = màu PHỤ   ·   ★ gốc = mùa gốc của người đó (★ đổi = màu gốc đã đổi theo luật mùa, hình cũ vào kho skin)', font=fS, fill=SUB)
    for i, (s, name, feel, bg, fg) in enumerate(SEAS):
        x = PAD + IDW + i * CW
        dr.rounded_rectangle((x + 6, 145, x + CW - 6, HEAD - 14), 16, fill=bg)
        dr.text((x + 22, 150), name, font=fH, fill=fg)
        for j, ln in enumerate(wrap(dr, feel, fF, CW - 44)[:2]):
            dr.text((x + 22, 204 + j * 32), ln, font=fF, fill=fg)
    y = HEAD
    for k, p in enumerate(page):
        e = d[p]
        if k % 2: dr.rectangle((PAD, y, W - PAD, y + RH), fill='#F3EEE4')
        dr.text((PAD + 12, y + 30), p, font=fID, fill=INK)
        dr.text((PAD + 12, y + 92), e['group'], font=fG, fill=SUB)
        for i, (s, *_r) in enumerate(SEAS):
            c = e[s]; x = PAD + IDW + i * CW
            dr.rounded_rectangle((x + 14, y + 20, x + 214, y + 160), 14, fill=c['main_hex'], outline='#00000033', width=2)
            dr.rounded_rectangle((x + 168, y + 116, x + 248, y + 196), 10, fill=c['sec_hex'], outline='#555555', width=2)
            tx = x + 262; ty = y + 18
            if c.get('root'):
                tag = '★ gốc (đổi)' if c.get('g50_released') else '★ gốc'
                dr.text((tx, ty), tag, font=fN, fill='#B8860B'); ty += 40
            for ln in wrap(dr, c['main_vi'], fN, CW - 280)[:2]:
                dr.text((tx, ty), ln, font=fN, fill=INK); ty += 36
            ty += 6
            for ln in wrap(dr, 'phụ: ' + c['sec_vi'], fX, CW - 280)[:2]:
                dr.text((tx, ty), ln, font=fX, fill=SUB); ty += 32
        y += RH
    dr.text((PAD, y + 24), 'Nguồn: palettes_season_L1583.json (G50 + B30) — mỗi người một cặp màu riêng mỗi mùa; mọi màu chính đã qua kiểm tra "ra đúng mùa".', font=fX, fill=SUB)
    fn = os.path.join(OUT, f'bang_mau_moi_{n:02d}.png'); im.save(fn, optimize=True); print(fn, im.size)
