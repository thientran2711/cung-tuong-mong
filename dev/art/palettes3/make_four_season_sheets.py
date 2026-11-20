"""Sheets for palettes_season_deep.json (P4; P5 A32: band per group, stylist line, Vietnamese names): EACH ROW = ONE PERSON, her 4 pairs side by side XUÂN | HẠ | THU | ĐÔNG.
-> dev/handover/review-sheets/palettes-season/four86/four-seasons-{1..4}.png (~22 people each, < 8000 px, A27 labels big)."""
import json, os
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
d = json.load(open(os.path.join(ROOT, 'dev/art/face-common/palettes_season_deep.json')))
OUT = os.path.join(ROOT, 'dev/handover/review-sheets/palettes-season/four86'); os.makedirs(OUT, exist_ok=True)
F = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
T = lambda f, n: ImageFont.truetype(f, n)
f_t, f_s, f_col, f_id, f_grp, f_n, f_h, f_tag = T(FB, 60), T(F, 28), T(FB, 52), T(FB, 56), T(FB, 30), T(F, 23), T(F, 20), T(FB, 22)
BG, INK, SUB, RED, GRP = (250, 248, 244), (40, 36, 34), (110, 104, 98), (190, 40, 40), (120, 70, 30)
SE = ('xuan', 'ha', 'thu', 'dong'); VN = {'xuan': 'XUÂN', 'ha': 'HẠ', 'thu': 'THU', 'dong': 'ĐÔNG'}
SUBT = {'xuan': 'đậm hơn 1 nấc · hồng · đỏ · lá xuân', 'ha': 'giữ nấc · cam · vàng', 'thu': 'đậm hơn 1 nấc · phong · bí · mận · rêu', 'dong': 'nhạt hơn 1 nấc · lam · tím · ngọc'}
COLBG = {'xuan': (252, 234, 238), 'ha': (255, 243, 214), 'thu': (252, 232, 222), 'dong': (228, 238, 250)}
PAD, IDW, CW, HEAD = 18, 330, 580, 370
GORDER = ['Dịu dàng', 'Đoan trang', 'Sắc sảo', 'Kiêu kỳ', 'Quyến rũ', 'Lạnh lùng']
ids = [k for k in d if not k.startswith('_') and k != 'status']
ids.sort(key=lambda k: (GORDER.index(d[k]['group']) if d[k]['group'] in GORDER else 9, k[0] != 'm', k[0] != 'c', k))


def row_h(k):
    extra = any(d[k][s].get('changed') or d[k][s].get('flag') or d[k][s].get('A31') for s in SE)
    return 234 + (70 if extra else 0) + 44


def hexrgb(h): h = h.lstrip('#'); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def fit(dr, txt, font, w):
    while dr.textlength(txt, font=font) > w and len(txt) > 4: txt = txt[:-2] + '…' if not txt.endswith('…') else txt[:-2] + '…'
    return txt


def cell(dr, x, y, p, s, h):
    root = p.get('root')
    if root:
        dr.rectangle([x + 4, y + 4, x + CW - 6, y + h - 6], outline=(60, 50, 40), width=4)
    # main big + sec touching
    mx, my = x + 18, y + 16
    dr.rectangle([mx, my, mx + 300, my + 120], fill=hexrgb(p['main_hex']))
    dr.rectangle([mx + 300, my + 20, mx + 450, my + 120], fill=hexrgb(p['sec_hex']))
    if root:
        dr.rectangle([mx + 458, my, mx + 548, my + 34], fill=(60, 50, 40))
        dr.text((mx + 466, my + 5), '★ GỐC', font=f_tag, fill=(255, 255, 255))
        if p.get('band_misfit'):
            dr.rectangle([mx + 458, my + 40, mx + 548, my + 116], fill=(150, 60, 150))
            dr.text((mx + 464, my + 46), 'LỆCH', font=f_tag, fill=(255, 255, 255))
            dr.text((mx + 464, my + 74), 'TÔNG', font=f_tag, fill=(255, 255, 255))
    dr.text((mx, my + 128), fit(dr, 'C: ' + p.get('main_vi', p['main']), f_n, CW - 40), font=f_n, fill=INK)
    dr.text((mx, my + 156), fit(dr, 'P: ' + p.get('sec_vi', p['sec']), f_n, CW - 40), font=f_n, fill=INK)
    tag = p['main_hex'] + ' + ' + p['sec_hex']
    if p.get('sec_depth_moved') or p.get('main_depth_moved'):
        tag += '  ~đậm: ' + ('chính ' if p.get('main_depth_moved') else '') + ('phụ' if p.get('sec_depth_moved') else '')
    if p.get('sec_borrowed'): tag += '  phụ mượn'
    if p.get('sec_accent'): tag += '  phụ điểm'
    if p.get('band_borrowed'): tag += '  mượn tông ' + p['band_borrowed']
    dr.text((mx, my + 184), tag, font=f_h, fill=SUB)
    yy = my + 212
    if p.get('changed'):
        o = p['changed']['old']
        dr.rectangle([mx, yy + 4, mx + 60, yy + 34], fill=hexrgb(o['main_hex']))
        dr.rectangle([mx + 60, yy + 10, mx + 90, yy + 34], fill=hexrgb(o['sec_hex']))
        dr.text((mx + 98, yy + 2), 'CŨ → MỚI', font=f_tag, fill=RED)
        why = '; '.join(p['changed']['why'])
        dr.text((mx + 98, yy + 30), fit(dr, why, f_h, CW - 130), font=f_h, fill=RED)
    if p.get('A31') and not p.get('changed'):
        dr.text((mx, yy + 4), 'A31 CHƯA ĐẠT: trùng họ màu', font=f_tag, fill=RED)
        dr.text((mx, yy + 32), fit(dr, p['A31'].replace('CANNOT FIT: ', ''), f_h, CW - 40), font=f_h, fill=RED)
    if p.get('flag'):
        dr.text((mx, yy + 4), 'NÂU — nét vẽ F3 giữ nguyên, chờ quản đốc', font=f_tag, fill=RED)
        pr = p['proposal']
        dr.rectangle([mx, yy + 36, mx + 60, yy + 64], fill=hexrgb(pr['main_hex']))
        dr.rectangle([mx + 60, yy + 40, mx + 90, yy + 64], fill=hexrgb(pr['sec_hex']))
        dr.text((mx + 98, yy + 38), 'đề xuất: ' + pr['main_hex'] + ' + ' + pr['sec_hex'], font=f_h, fill=RED)


def page(n, rows, N):
    groups = []
    for k in rows:
        if not groups or groups[-1] != d[k]['group']: groups.append(d[k]['group'])
    H = HEAD + 120 + sum(row_h(k) for k in rows) + 64 * len(groups) + 40
    W = PAD * 2 + IDW + 4 * CW
    im = Image.new('RGB', (W, H), BG); dr = ImageDraw.Draw(im)
    dr.text((PAD + 6, 14), f'BẢNG 4 MÙA · TÔNG THEO TÍNH CÁCH · tờ {n}/{N} · 1 hàng = 1 phi tần', font=f_t, fill=INK)
    for i, t in enumerate([
        'CÁCH PHỐI MỚI (A32): TÔNG THEO TÍNH CÁCH · HỌ MÀU THEO MÙA — như bộ c06 CŨ: chính dịu/đậm + phụ trung tính sáng',
        'Ô lớn = CHÍNH, ô nhỏ = PHỤ · phụ = màu nhạt trung tính, mỗi mùa một màu: ngà, vàng nhạt, kem đào, hồng phấn nhạt, bạc hà, xanh sương, tím khói, trắng ngà',
        'Mùa chọn họ màu CHÍNH: Xuân hồng/đỏ/lá xuân · Hạ cam/vàng · Thu lá phong/hồng/bí/mận/rêu · Đông lam/tím/ngọc · Xuân, Thu đậm hơn 1 nấc · Đông nhạt hơn',
        '★ GỐC = cặp tranh đã vẽ, giữ nguyên · LỆCH TÔNG = gốc không khớp tông nhóm (không tô lại, chờ chủ) · không xám/nâu/màu già/vàng hoàng gia · mỗi cặp riêng mỗi mùa',
        'A31: 8 màu của 1 người không trùng họ, ΔE ≥ 20 (giữa 2 màu trung tính nhạt: ≥ 15) · dòng ✎ dưới mỗi hàng = lời chuyên gia']):
        dr.text((PAD + 6, 92 + 40 * i), t, font=f_s, fill=RED if i >= 3 else SUB)
    y = HEAD
    for j, s in enumerate(SE):
        x = PAD + IDW + j * CW
        dr.rectangle([x, y, x + CW - 4, y + 110], fill=COLBG[s])
        dr.text((x + 18, y + 6), VN[s], font=f_col, fill=INK)
        dr.text((x + 18, y + 70), SUBT[s], font=f_s, fill=SUB)
    y += 120
    g = None
    for k in rows:
        if d[k]['group'] != g:
            g = d[k]['group']
            dr.rectangle([PAD, y + 8, W - PAD, y + 56], fill=(236, 226, 212))
            dr.text((PAD + 12, y + 12), 'NHÓM ' + g.upper() + '  —  tông: ' + d[k].get('band', ''), font=f_grp, fill=GRP)
            y += 64
        h = row_h(k)
        dr.rectangle([PAD, y, PAD + IDW - 8, y + h - 6], fill=(255, 255, 255))
        dr.text((PAD + 16, y + 20), k, font=f_id, fill=INK)
        dr.text((PAD + 16, y + 92), d[k]['group'], font=f_grp, fill=GRP)
        dr.text((PAD + 16, y + 140), 'gốc: ' + VN[d[k]['root_season']], font=f_n, fill=SUB)
        for j, s in enumerate(SE):
            x = PAD + IDW + j * CW
            dr.rectangle([x, y, x + CW - 4, y + h - 6], fill=COLBG[s])
            cell(dr, x, y, d[k][s], s, h - 46)
        if d[k].get('stylist'):
            dr.rectangle([PAD, y + h - 50, W - PAD, y + h - 6], fill=(255, 252, 240))
            dr.text((PAD + 16, y + h - 46), fit(dr, '✎ ' + d[k]['stylist'], f_s, W - 2 * PAD - 30), font=f_s, fill=(70, 60, 50))
        y += h
    dr.text((PAD + 6, y + 6), 'P5 (A32) · đề xuất, chờ chủ duyệt · 0 gen · dev/art/face-common/palettes_season_deep.json', font=f_h, fill=SUB)
    p = os.path.join(OUT, f'four-seasons-{n}.png'); im.save(p, optimize=True)
    print(p, im.size)


N = 4
per = [22, 22, 21, 21]
a = 0
for n in range(1, N + 1):
    page(n, ids[a:a + per[n - 1]], N); a += per[n - 1]
