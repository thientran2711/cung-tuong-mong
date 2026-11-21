"""Sheets for palettes_season_L1583.json (THUPAL1, owner L1583 / rule B30). No gens.
s62 sample (cũ vs mới) + one sheet per group: per person 4 seasons, main + phụ swatches, Vietnamese name + hex, old pair small."""
import json, os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', '..', 'handover', 'review-sheets', 'thu_palette_L1582', 'L1583')
NEW = json.load(open(os.path.join(HERE, '..', 'face-common', 'palettes_season_L1583.json')))
OLD = json.load(open(os.path.join(HERE, '..', 'face-common', 'palettes_season_deep.json')))
FR, FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
f = lambda n, b=False: ImageFont.truetype(FB if b else FR, n)
SEAS = ('xuan', 'ha', 'thu', 'dong'); VN = dict(xuan='Xuân', ha='Hạ', thu='Thu', dong='Đông')
BG, INK, MUT, OK, BAD, GOLD = '#FAF7F2', '#2B2622', '#7A716A', '#2E7D32', '#C62828', '#B8860B'
PPL = [k for k in NEW if not k.startswith('_') and k != 'status']


def cell(dr, x, y, e, old, w=440):
    """main block + phụ band, names, hex; old pair small at right when changed"""
    dr.rectangle([x, y, x + 120, y + 96], fill=e['main_hex'], outline='#00000022')
    dr.rectangle([x, y + 66, x + 120, y + 80], fill=e['sec_hex'])
    dr.rectangle([x + 124, y, x + 160, y + 96], fill=e['sec_hex'], outline='#00000022')
    ok = e['reads'] == VN[old['_s']]
    tag = ('★gốc ' if e['root'] else '') + ('✓' if ok else '✗ ra ' + e['reads'])
    dr.text((x + 170, y), e['main_vi'][:24], font=f(17, 1), fill=INK)
    dr.text((x + 170, y + 22), e['main_hex'], font=f(16), fill=INK)
    dr.text((x + 170, y + 46), 'phụ: ' + e['sec_vi'][:20], font=f(15), fill=INK)
    dr.text((x + 170, y + 66), e['sec_hex'] + '  ' + tag, font=f(15, 1), fill=OK if ok else BAD)
    if e['main_before'] or e['sec_before']:
        dr.text((x + 362, y + 2), 'cũ', font=f(13), fill=MUT)
        dr.rectangle([x + 362, y + 20, x + 398, y + 56], fill=old['main_hex']); dr.rectangle([x + 400, y + 20, x + 414, y + 56], fill=old['sec_hex'])


def group_sheet(g, ids, name):
    W, RH = 40 + 4 * 470 + 160, 118
    img = Image.new('RGB', (W, 170 + RH * len(ids) + 40), BG); dr = ImageDraw.Draw(img)
    band = NEW[ids[0]].get('band') or ''
    dr.text((30, 22), f'Bảng màu 4 mùa L1583 — nhóm {g} ({len(ids)} người) · màu CHÍNH ra cảm giác mùa, màu PHỤ hợp màu chính', font=f(30, 1), fill=INK)
    dr.text((30, 68), f'Tông nhóm: {band}'[:150], font=f(18), fill=MUT)
    dr.text((30, 94), 'Ô nhỏ "cũ" = cặp màu trước (P6) khi có đổi · ★gốc = màu tranh đã vẽ, giữ nguyên (L27) · ✗ = ★gốc không ra mùa (chủ quyết)', font=f(18), fill=MUT)
    for j, s in enumerate(SEAS): dr.text((190 + j * 470, 132), VN[s], font=f(24, 1), fill=INK)
    for i, p in enumerate(ids):
        y = 170 + i * RH
        dr.line([20, y - 8, W - 20, y - 8], fill='#E3DBD0', width=1)
        dr.text((30, y + 30), p, font=f(24, 1), fill=INK)
        a31 = NEW[p].get('a31') or []
        if a31: dr.text((30, y + 64), 'A31: ' + str(len(a31)), font=f(14), fill=BAD)
        for j, s in enumerate(SEAS):
            old = dict(OLD[p][s]); old['_s'] = s
            cell(dr, 190 + j * 470, y, NEW[p][s], old)
    img.save(os.path.join(OUT, name))


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    group_sheet('Dịu dàng — MẪU s62', ['s62'], '00_s62_sample.png')
    groups = {}
    for p in PPL: groups.setdefault(NEW[p]['group'], []).append(p)
    for i, (g, ids) in enumerate(sorted(groups.items())):
        group_sheet(g, sorted(ids), f'{i + 1:02d}_{g.replace(" ", "_")}.png')
    print(sorted(os.listdir(OUT)))
