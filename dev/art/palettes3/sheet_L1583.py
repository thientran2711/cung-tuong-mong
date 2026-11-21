"""Sheets for palettes_season_L1583.json (owner L1583 / rule B30; owner L1593: same LIST format as the old approved
four-seasons sheets — one row per person, XUÂN | HẠ | THU | ĐÔNG, big CHÍNH + PHỤ swatches, Vietnamese names; changed cells
marked small). Layout copied from make_four_season_sheets.py (P6). THUPAL1 first version, THUPAL2 old-format rewrite. 0 gens.
-> dev/handover/review-sheets/thu_palette_L1582/L1583/00_s62_sample.png + 01..06 per group."""
import json, os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
d = json.load(open(os.path.join(ROOT, 'dev/art/face-common/palettes_season_L1583.json')))
OUT = os.path.join(ROOT, 'dev/handover/review-sheets/thu_palette_L1582/L1583'); os.makedirs(OUT, exist_ok=True)
F = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
T = lambda f, n: ImageFont.truetype(f, n)
f_t, f_s, f_col, f_id, f_grp, f_n, f_h, f_tag = T(FB, 58), T(F, 28), T(FB, 52), T(FB, 56), T(FB, 30), T(F, 24), T(F, 21), T(FB, 22)
BG, INK, SUB, RED, GRP, GRN = (250, 248, 244), (40, 36, 34), (110, 104, 98), (190, 40, 40), (120, 70, 30), (40, 110, 60)
SE = ('xuan', 'ha', 'thu', 'dong'); VN = {'xuan': 'XUÂN', 'ha': 'HẠ', 'thu': 'THU', 'dong': 'ĐÔNG'}
VNs = {'xuan': 'Xuân', 'ha': 'Hạ', 'thu': 'Thu', 'dong': 'Đông'}
SUBT = {'xuan': 'hồng · đỏ tươi · lá non · san hô hồng', 'ha': 'cam đào · san hô · cam mơ · chanh sáng',
        'thu': 'ô liu · rêu · đất nung · rượu đậm', 'dong': 'lam · tím · ngọc · xanh băng'}
COLBG = {'xuan': (252, 234, 238), 'ha': (255, 243, 214), 'thu': (252, 232, 222), 'dong': (228, 238, 250)}
PAD, IDW, CW, HEAD = 18, 330, 580, 330
GORDER = ['Dịu dàng', 'Đoan trang', 'Sắc sảo', 'Kiêu kỳ', 'Quyến rũ', 'Lạnh lùng']
ids = [k for k in d if not k.startswith('_') and k != 'status']


def hexrgb(h): h = h.lstrip('#'); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def fit(dr, txt, font, w):
    while dr.textlength(txt, font=font) > w and len(txt) > 4: txt = txt[:-2] + '…'
    return txt


def row_h(k): return 250 + (36 if d[k].get('a31') else 0)


def cell(dr, x, y, e, s, h):
    root, miss = e['root'], e['reads'] != VNs[s]
    if root: dr.rectangle([x + 4, y + 4, x + CW - 6, y + h - 6], outline=(60, 50, 40), width=4)
    mx, my = x + 18, y + 16
    dr.rectangle([mx, my, mx + 300, my + 120], fill=hexrgb(e['main_hex']))                 # Ô lớn = CHÍNH
    dr.rectangle([mx + 300, my + 20, mx + 450, my + 120], fill=hexrgb(e['sec_hex']))        # ô nhỏ = PHỤ
    if root:
        dr.rectangle([mx + 458, my, mx + 548, my + 34], fill=(60, 50, 40))
        dr.text((mx + 466, my + 5), '★ GỐC', font=f_tag, fill=(255, 255, 255))
        if miss:
            dr.rectangle([mx + 458, my + 40, mx + 548, my + 116], fill=RED)
            dr.text((mx + 466, my + 46), 'ra', font=f_tag, fill=(255, 255, 255))
            dr.text((mx + 466, my + 74), e['reads'].upper(), font=f_tag, fill=(255, 255, 255))
    elif e['main_before'] or e['sec_before']:                                                   # changed: small "cũ" chip
        o_m = e['main_before'] or e['main_hex']; o_s = e['sec_before'] or e['sec_hex']
        dr.text((mx + 458, my - 2), 'cũ', font=f_h, fill=SUB)
        dr.rectangle([mx + 458, my + 22, mx + 518, my + 56], fill=hexrgb(o_m))
        dr.rectangle([mx + 518, my + 30, mx + 548, my + 56], fill=hexrgb(o_s))
        tag = 'ĐỔI' if e['main_before'] else 'ĐỔI'
        dr.rectangle([mx + 458, my + 66, mx + 548, my + 118], fill=(40, 110, 90))
        dr.text((mx + 466, my + 68), tag, font=f_tag, fill=(255, 255, 255))
        dr.text((mx + 466, my + 92), 'CHÍNH' if e['main_before'] else 'PHỤ', font=T(FB, 18), fill=(255, 255, 255))
    dr.text((mx, my + 130), fit(dr, 'C: ' + e['main_vi'], f_n, CW - 40), font=f_n, fill=INK)
    dr.text((mx, my + 160), fit(dr, 'P: ' + e['sec_vi'], f_n, CW - 40), font=f_n, fill=INK)
    dr.text((mx, my + 190), e['main_hex'] + ' + ' + e['sec_hex'], font=f_h, fill=SUB)
    ok = '✓ ra ' + VNs[s] if not miss else '✗ màu chính ra ' + e['reads']
    dr.text((mx + 250, my + 190), ok, font=f_tag, fill=GRN if not miss else RED)


def sheet(name, rows, title):
    groups = []
    for k in rows:
        if d[k]['group'] not in groups: groups.append(d[k]['group'])
    H = HEAD + 120 + sum(row_h(k) for k in rows) + 64 * len(groups) + 60
    W = PAD * 2 + IDW + 4 * CW
    im = Image.new('RGB', (W, H), BG); dr = ImageDraw.Draw(im)
    dr.text((PAD + 6, 14), title, font=f_t, fill=INK)
    for i, t in enumerate([
        'Luật B30 (chủ L1583): màu CHÍNH mỗi mùa phải ra cảm giác mùa đó · màu PHỤ tự do nhưng hợp màu chính · hồng chỉ làm PHỤ ở Thu',
        'Ô lớn = CHÍNH, ô nhỏ = PHỤ · C: tên màu chính · P: tên màu phụ · ✓ ra Thu = màu chính đọc ra đúng mùa',
        'Ô nhỏ "cũ" + ĐỔI CHÍNH / ĐỔI PHỤ = ô này đã đổi so với bảng cũ P6 (ô "cũ" = cặp màu cũ) · ô không có dấu = giữ nguyên bảng cũ',
        '★ GỐC = cặp màu tranh đã vẽ, giữ nguyên (L27) · ô đỏ "ra …" = màu gốc đọc ra mùa khác — chờ chủ quyết · A31: 8 màu 1 người không trùng']):
        dr.text((PAD + 6, 92 + 40 * i), t, font=f_s, fill=RED if i == 3 else SUB)
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
            dr.text((PAD + 12, y + 12), fit(dr, 'NHÓM ' + g.upper() + '  —  tông: ' + (d[k].get('band') or ''), f_grp, W - 2 * PAD - 30), font=f_grp, fill=GRP)
            y += 64
        h = row_h(k)
        dr.rectangle([PAD, y, PAD + IDW - 8, y + h - 6], fill=(255, 255, 255))
        dr.text((PAD + 16, y + 20), k, font=f_id, fill=INK)
        dr.text((PAD + 16, y + 92), d[k]['group'], font=f_grp, fill=GRP)
        if d[k].get('root_season'): dr.text((PAD + 16, y + 140), 'gốc: ' + VN[d[k]['root_season']], font=f_n, fill=SUB)
        nch = sum(bool(d[k][s]['main_before'] or d[k][s]['sec_before']) for s in SE)
        dr.text((PAD + 16, y + 172), f'đổi {nch}/4 mùa' if nch else 'giữ nguyên', font=f_h, fill=SUB)
        for j, s in enumerate(SE):
            x = PAD + IDW + j * CW
            dr.rectangle([x, y, x + CW - 4, y + h - 6], fill=COLBG[s])
            cell(dr, x, y, d[k][s], s, 250)
        if d[k].get('a31'):
            dr.text((PAD + IDW + 18, y + h - 38), fit(dr, 'A31 gần nhau (do màu ★gốc kẹt): ' + ' · '.join(d[k]['a31']), f_h, W - IDW - 60), font=f_h, fill=RED)
        y += h
    dr.text((PAD + 6, y + 14), 'L1583 (B30) · đề xuất, chờ chủ duyệt · 0 gen · dev/art/face-common/palettes_season_L1583.json (bảng cũ palettes_season_deep.json chưa đụng)', font=f_h, fill=SUB)
    p = os.path.join(OUT, name); im.save(p, optimize=True); print(p, im.size)


if __name__ == '__main__':
    for f in os.listdir(OUT):
        if f.endswith('.png'): os.remove(os.path.join(OUT, f))
    sheet('00_s62_sample.png', ['s62'], 'BẢNG 4 MÙA L1583 · MẪU s62 (nhóm Dịu dàng) · 1 hàng = 1 phi tần')
    by = {}
    for k in ids: by.setdefault(d[k]['group'], []).append(k)
    for i, g in enumerate(GORDER):
        rows = sorted(by[g], key=lambda k: (k[0] != 'm', k[0] != 'c', k))
        sheet(f'{i + 1:02d}_{g.replace(" ", "_")}.png', rows, f'BẢNG 4 MÙA L1583 · NHÓM {g.upper()} ({len(rows)} người) · tờ {i + 1}/6 · 1 hàng = 1 phi tần')
