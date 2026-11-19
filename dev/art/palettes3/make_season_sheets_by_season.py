"""One sheet per season for palettes_season.json ->
dev/handover/review-sheets/palettes-season/season_{xuan,ha,thu,dong}.jpg (<= 900 KB, ~1800 px wide).
Each cell = person id, màu chính (left) | màu phụ (right) with names; ★ gốc = approved root palette.
Data reading as in make_season_sheets.py (the older 3 sheets split by people)."""
import json, os
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
W = PAD * 2 + COLS * CW
cnt = d['root_season_counts']

def fit(dr, t, font, w):
    while dr.textlength(t, font=font) > w and len(t) > 4: t = t[:-2] + '…'
    return t

for se in SEASONS:
    rows = (len(ids) + COLS - 1) // COLS
    H = HEAD + rows * CH + 50
    im = Image.new('RGB', (W, H), BG); dr = ImageDraw.Draw(im)
    dr.text((PAD + 4, 18), f'Bảng màu mùa {VN[se]} — {len(ids)} người', font=f_title, fill=INK)
    dr.text((PAD + 4, 80), f'Trái = màu chính · phải = màu phụ · ★ gốc = màu gốc đã duyệt '
            f'({cnt[VN[se]]} người có màu gốc thuộc mùa {VN[se]})', font=f_sub, fill=SUB)
    dr.line([(0, HEAD - 12), (W, HEAD - 12)], fill=(180, 172, 164), width=2)
    for i, k in enumerate(ids):
        r, c = divmod(i, COLS)
        x, y = PAD + c * CW, HEAD + r * CH
        p = d[k][se]; root = bool(p.get('root'))
        dr.rectangle([x + 4, y + 4, x + CW - 4, y + CH - 6], fill=(255, 253, 249) if not root else (255, 246, 222),
                     outline=STAR if root else (214, 208, 200), width=4 if root else 1)
        dr.text((x + 14, y + 10), k, font=f_id, fill=INK)
        if root:
            t = '★ gốc'; tw = dr.textlength(t, font=f_star)
            dr.rounded_rectangle([x + CW - 24 - tw, y + 12, x + CW - 12, y + 42], 6, fill=STAR)
            dr.text((x + CW - 18 - tw, y + 14), t, font=f_star, fill=(255, 255, 255))
        sx, sy, sw, sh = x + 14, y + 50, (CW - 28) // 2, 104
        dr.rectangle([sx, sy, sx + sw, sy + sh], fill=p['main_hex'])
        dr.rectangle([sx + sw, sy, sx + 2 * sw, sy + sh], fill=p['sec_hex'])
        dr.rectangle([sx, sy, sx + 2 * sw, sy + sh], outline=(150, 142, 134), width=1)
        dr.text((sx, sy + sh + 6), fit(dr, 'C: ' + p['main'], f_name, CW - 28), font=f_name, fill=INK)
        dr.text((sx, sy + sh + 30), fit(dr, 'P: ' + p['sec'], f_name, CW - 28), font=f_name, fill=INK)
        dr.text((sx, sy + sh + 55), f"{p['main_hex']} · {p['sec_hex']}", font=f_hex, fill=SUB)
    dr.text((PAD + 4, H - 38), f'C = màu chính · P = màu phụ · đề xuất B20 (Lượt 616), chưa đưa vào build', font=f_hex, fill=SUB)
    path = os.path.join(OUT, f'season_{se}.jpg')
    q = 88
    while True:
        im.save(path, quality=q, optimize=True)
        if os.path.getsize(path) <= 900 * 1024 or q <= 50: break
        q -= 6
    print(path, im.size, q, os.path.getsize(path) // 1024, 'KB', len(ids), 'people',
          sum(1 for k in ids if d[k][se].get('root')), 'roots')
