"""Season sheets for palettes_season.json -> dev/handover/review-sheets/palettes-season/season_sheetN.jpg (<= 600 KB)
Columns Xuân | Hạ | Thu | Đông; ★ = her approved root palette (in the season it classifies into)."""
import json, os
from PIL import Image, ImageDraw, ImageFont
from seasons import SEASONS, VN
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
d = json.load(open(os.path.join(ROOT, 'dev/art/face-common/palettes_season.json')))
ids = [k for k in d if not k.startswith('_') and k not in ('status', 'root_season_counts')]
OUT = os.path.join(ROOT, 'dev/handover/review-sheets/palettes-season'); os.makedirs(OUT, exist_ok=True)
F = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
f_name, f_hex, f_id, f_head, f_small = (ImageFont.truetype(F, 19), ImageFont.truetype(F, 16), ImageFont.truetype(FB, 26),
                                         ImageFont.truetype(FB, 30), ImageFont.truetype(F, 17))
BG, INK, SUB, STAR = (250, 248, 244), (40, 36, 34), (110, 104, 98), (176, 120, 20)
IDW, COLW, ROWH, HEAD = 74, 282, 168, 150
W = IDW + 4 * COLW + 8
CHUNKS = [ids[0:29], ids[29:58], ids[58:]]
cnt = d['root_season_counts']

def fit(dr, t, font, w):
    while dr.textlength(t, font=font) > w and len(t) > 4: t = t[:-2] + '…'
    return t

for n, chunk in enumerate(CHUNKS, 1):
    H = HEAD + ROWH * len(chunk) + 44
    im = Image.new('RGB', (W, H), BG); dr = ImageDraw.Draw(im)
    dr.text((12, 10), f'Bảng màu 4 mùa (B20, Lượt 616) — tờ {n}/3: {chunk[0]}–{chunk[-1]}', font=f_name, fill=SUB)
    dr.text((12, 36), '★ (gốc) = màu gốc đã duyệt (nằm ở mùa của nó) · số = bao nhiêu màu gốc thuộc mùa đó (cả 87 người)', font=f_small, fill=SUB)
    for i, se in enumerate(SEASONS):
        x = IDW + i * COLW
        dr.text((x + 8, 70), VN[se], font=f_head, fill=INK)
        dr.text((x + 8, 110), f'{cnt[VN[se]]} màu gốc', font=f_small, fill=SUB)
    dr.line([(0, HEAD - 6), (W, HEAD - 6)], fill=(180, 172, 164), width=2)
    for r, k in enumerate(chunk):
        y = HEAD + r * ROWH
        if r % 2: dr.rectangle([0, y, W, y + ROWH], fill=(242, 239, 233))
        dr.text((8, y + 56), k, font=f_id, fill=INK)
        for i, se in enumerate(SEASONS):
            p = d[k][se]; x = IDW + i * COLW + 6
            dr.rectangle([x, y + 8, x + 172, y + 88], fill=p['main_hex'])
            dr.rectangle([x + 172, y + 8, x + 268, y + 88], fill=p['sec_hex'])
            if p.get('root'):
                dr.rectangle([x - 3, y + 5, x + 271, y + 91], outline=STAR, width=4)
                dr.text((x + 6, y + 10), '★', font=f_head, fill=(255, 255, 255), stroke_width=2, stroke_fill=STAR)
                dr.text((x + 40, y + 14), '(gốc)', font=f_name, fill=(255, 255, 255), stroke_width=2, stroke_fill=STAR)
            else:
                dr.rectangle([x, y + 8, x + 268, y + 88], outline=(150, 142, 134), width=1)
            dr.text((x, y + 94), fit(dr, 'C: ' + p['main'], f_name, 272), font=f_name, fill=INK)
            dr.text((x, y + 117), fit(dr, 'P: ' + p['sec'], f_name, 272), font=f_name, fill=INK)
            dr.text((x, y + 141), f"{p['main_hex']} · {p['sec_hex']}", font=f_hex, fill=SUB)
        dr.line([(0, y + ROWH), (W, y + ROWH)], fill=(214, 208, 200), width=1)
    for i in range(1, 4):
        x = IDW + i * COLW; dr.line([(x, HEAD - 6), (x, H - 40)], fill=(200, 192, 184), width=2)
    dr.text((12, H - 30), 'C = màu chính · P = màu phụ', font=f_hex, fill=SUB)
    path = os.path.join(OUT, f'season_sheet{n}.jpg')
    q = 82
    while True:   # CLONE_RULE: review sheets = JPG <= 600 KB
        im.save(path, quality=q, optimize=True)
        if os.path.getsize(path) <= 600 * 1024 or q <= 50: break
        q -= 6
    print(path, im.size, q, os.path.getsize(path) // 1024, 'KB')
