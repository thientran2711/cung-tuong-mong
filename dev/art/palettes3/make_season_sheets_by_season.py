"""One sheet per season for palettes_season.json ->
dev/handover/review-sheets/palettes-season/season_{xuan,ha,thu,dong}.jpg (<= 900 KB, ~1800 px wide).
Each cell = person id, màu chính (left) | màu phụ (right) with names; ★ gốc = approved root palette.
Data reading as in make_season_sheets.py (the older 3 sheets split by people).
--v86 (owner Lượt 763): -> palettes-season/v86/season_*.jpg, all 86 consorts grouped by look group (OWNER_GROUPS_L686.json),
7 columns, bigger labels (<= 2400 px wide, phone-readable), "MỚI" on people not in the approved Lượt 758 palette."""
import json, os, sys
from PIL import Image, ImageDraw, ImageFont
from seasons import SEASONS, VN
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
d = json.load(open(os.path.join(ROOT, 'dev/art/face-common/palettes_season.json')))
ids = [k for k in d if not k.startswith('_') and k not in ('status', 'root_season_counts')]
OUT = os.path.join(ROOT, 'dev/handover/review-sheets/palettes-season'); os.makedirs(OUT, exist_ok=True)
F = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
f_title, f_sub, f_id, f_name, f_hex, f_star = (ImageFont.truetype(FB, 46), ImageFont.truetype(F, 22), ImageFont.truetype(FB, 28),
                                               ImageFont.truetype(F, 19), ImageFont.truetype(F, 16), ImageFont.truetype(FB, 22))
BG, INK, SUB, STAR = (250, 248, 244), (40, 36, 34), (110, 104, 98), (176, 120, 20)
COLS, CW, CH, PAD, HEAD = 6, 296, 236, 12, 150
V86 = '--v86' in sys.argv
GROUP_ORDER = ['Sắc sảo', 'Đoan trang', 'Dịu dàng', 'Kiêu kỳ', 'Lạnh lùng', 'Quyến rũ']
if V86:
    OUT = os.path.join(OUT, 'v86'); os.makedirs(OUT, exist_ok=True)
    COLS, CW, CH, HEAD = 7, 336, 262, 150
    f_title, f_sub, f_id, f_name, f_hex, f_star = (ImageFont.truetype(FB, 52), ImageFont.truetype(F, 26), ImageFont.truetype(FB, 34),
                                                   ImageFont.truetype(F, 23), ImageFont.truetype(F, 19), ImageFont.truetype(FB, 23))
    f_grp = ImageFont.truetype(FB, 36)
    grp = json.load(open(os.path.join(ROOT, 'dev/art/face-common/OWNER_GROUPS_L686.json')))
    old = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'palettes_season_L761.json')))
    NEW = {k for k in ids if k not in old or k in ('s46', 's47', 's48', 's49', 's50')}
    GH = 58
W = PAD * 2 + COLS * CW
cnt = d['root_season_counts']

def fit(dr, t, font, w):
    while dr.textlength(t, font=font) > w and len(t) > 4: t = t[:-2] + '…'
    return t

def layout():
    """[(x, y, id) ...], group headers [(y, name, n)], total height"""
    if not V86:
        return [(PAD + (i % COLS) * CW, HEAD + (i // COLS) * CH, k) for i, k in enumerate(ids)], [], HEAD + ((len(ids) + COLS - 1) // COLS) * CH + 50
    cells, heads, y = [], [], HEAD
    for g in GROUP_ORDER:
        mem = [k for k in ids if grp.get(k) == g]
        heads.append((y, g, len(mem))); y += GH
        for i, k in enumerate(mem): cells.append((PAD + (i % COLS) * CW, y + (i // COLS) * CH, k))
        y += ((len(mem) + COLS - 1) // COLS) * CH + 10
    assert len(cells) == len(ids), (len(cells), len(ids))
    return cells, heads, y + 50

CELLS, HEADS, HTOT = layout()
for se in SEASONS:
    H = HTOT
    im = Image.new('RGB', (W, H), BG); dr = ImageDraw.Draw(im)
    dr.text((PAD + 4, 18), f'Bảng màu mùa {VN[se]} — {len(ids)} người', font=f_title, fill=INK)
    dr.text((PAD + 4, 80), f'Trái = màu chính · phải = màu phụ · ★ gốc = màu gốc đã duyệt '
            f'({cnt[VN[se]]} người có màu gốc thuộc mùa {VN[se]})', font=f_sub, fill=SUB)
    dr.line([(0, HEAD - 12), (W, HEAD - 12)], fill=(180, 172, 164), width=2)
    for gy, g, n in HEADS:
        dr.rectangle([PAD, gy + 6, W - PAD, gy + GH - 6], fill=(236, 230, 222))
        dr.text((PAD + 14, gy + 10), f'{g} ({n})', font=f_grp, fill=INK)
    for x, y, k in CELLS:
        p = d[k][se]; root = bool(p.get('root'))
        dr.rectangle([x + 4, y + 4, x + CW - 4, y + CH - 6], fill=(255, 253, 249) if not root else (255, 246, 222),
                     outline=STAR if root else (214, 208, 200), width=4 if root else 1)
        dr.text((x + 14, y + 10), k, font=f_id, fill=INK)
        if V86 and k in NEW:
            tx = x + 22 + dr.textlength(k, font=f_id)
            dr.rounded_rectangle([tx, y + 14, tx + dr.textlength('MỚI', font=f_star) + 14, y + 44], 6, fill=(46, 120, 160))
            dr.text((tx + 7, y + 16), 'MỚI', font=f_star, fill=(255, 255, 255))
        if root:
            t = '★ gốc'; tw = dr.textlength(t, font=f_star)
            dr.rounded_rectangle([x + CW - 24 - tw, y + 12, x + CW - 12, y + 42], 6, fill=STAR)
            dr.text((x + CW - 18 - tw, y + 14), t, font=f_star, fill=(255, 255, 255))
        sx, sy, sw, sh = x + 14, y + 54, (CW - 28) // 2, (112 if V86 else 104)
        dr.rectangle([sx, sy, sx + sw, sy + sh], fill=p['main_hex'])
        dr.rectangle([sx + sw, sy, sx + 2 * sw, sy + sh], fill=p['sec_hex'])
        dr.rectangle([sx, sy, sx + 2 * sw, sy + sh], outline=(150, 142, 134), width=1)
        dr.text((sx, sy + sh + 6), fit(dr, 'C: ' + p['main'], f_name, CW - 28), font=f_name, fill=INK)
        dr.text((sx, sy + sh + (33 if V86 else 30)), fit(dr, 'P: ' + p['sec'], f_name, CW - 28), font=f_name, fill=INK)
        dr.text((sx, sy + sh + (61 if V86 else 55)), f"{p['main_hex']} · {p['sec_hex']}", font=f_hex, fill=SUB)
    dr.text((PAD + 4, H - 38), f'C = màu chính · P = màu phụ · đề xuất B20 (Lượt 616)' + (' · 86 phi tần, mỗi người một cặp riêng (Lượt 763) · MỚI = chưa có trong bảng đã duyệt' if V86 else ', chưa đưa vào build'), font=f_hex, fill=SUB)
    path = os.path.join(OUT, f'season_{se}.jpg')
    q = 88
    while True:
        im.save(path, quality=q, optimize=True)
        if os.path.getsize(path) <= 900 * 1024 or q <= 50: break
        q -= 6
    print(path, im.size, q, os.path.getsize(path) // 1024, 'KB', len(ids), 'people',
          sum(1 for k in ids if d[k][se].get('root')), 'roots')
