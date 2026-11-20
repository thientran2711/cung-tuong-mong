"""Sheets for season_colour_classes.json -> dev/handover/review-sheets/palettes-season/deep86/
season-colour-classes-1.png (XUÂN | HẠ) and season-colour-classes-2.png (THU | ĐÔNG), each < 8000 px tall (ROOT-64).
Each season block: its colour FAMILIES (pale · medium · deep) on top, then every person's root PAIR (main big + sec touching),
id + look group, names, hex; changed pairs show the OLD pair small + 'CŨ' + the stylist's reason (A27: labels big)."""
import json, os, textwrap
from PIL import Image, ImageDraw, ImageFont
from seasons import SEASONS, VN
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
d = json.load(open(os.path.join(ROOT, 'dev/art/face-common/season_colour_classes.json')))
OUT = os.path.join(ROOT, 'dev/handover/review-sheets/palettes-season/deep86'); os.makedirs(OUT, exist_ok=True)
F = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
T = lambda f, n: ImageFont.truetype(f, n)
f_t, f_s, f_col, f_id, f_n, f_h, f_r = T(FB, 66), T(F, 30), T(FB, 64), T(FB, 34), T(F, 24), T(F, 21), T(FB, 22)
BG, INK, SUB, RED, GRP = (250, 248, 244), (40, 36, 34), (110, 104, 98), (190, 40, 40), (120, 70, 30)
COLW, PAD, HEAD = 640, 16, 290
COLBG = {'xuan': (252, 234, 238), 'ha': (255, 243, 214), 'thu': (252, 232, 222), 'dong': (228, 238, 250)}
NCHG = sum(1 for s in SEASONS for r in d[s] if r['changed'])

def row_h(r): return 150 + (100 if r['changed'] else 0)
def split(rows):
    tot = sum(row_h(r) for r in rows); acc, a = 0, []
    for r in rows:
        if acc >= tot / 2: break
        a.append(r); acc += row_h(r)
    return a, rows[len(a):]
FAMH = 60 + 64 * max((len(d['families'][s]) + 1) // 2 for s in SEASONS) + 60

def page(n, ses):
    cols = [split(d[se]) for se in ses]
    H = HEAD + 100 + FAMH + max(max(sum(row_h(r) for r in c) for c in cc) for cc in cols) + 70
    W = PAD * 2 + 4 * COLW
    im = Image.new('RGB', (W, H), BG); dr = ImageDraw.Draw(im)
    dr.text((PAD + 6, 14), f'PHÂN LOẠI MÀU THEO MÙA · 86 PHI TẦN · tờ {n}/2: ' + ' + '.join(VN[s].upper() for s in ses), font=f_t, fill=INK)
    dr.text((PAD + 6, 100), 'Trên: HỌ MÀU của mùa (nhạt · vừa · đậm) · Dưới: cặp màu gốc từng người (ô lớn = chính, ô nhỏ = phụ) + mã + nhóm',
            font=f_s, fill=SUB)
    dr.text((PAD + 6, 142), 'Mùa theo màu CHÍNH: Xuân hồng/đỏ · Hạ CAM/VÀNG · Thu san hô/quả mọng/lá tươi · Đông lạnh — không theo độ đậm',
            font=f_s, fill=SUB)
    dr.text((PAD + 6, 184), f'Không xám · không nâu / màu già · mỗi người một cặp riêng (0 trùng) · {NCHG} cặp sửa: đỏ = CŨ + lý do · * = mùa gốc cũ khác',
            font=f_s, fill=SUB)
    dr.text((PAD + 6, 226), 'Chờ chủ duyệt phân loại trước khi làm bảng 4 mùa từng người · P3', font=f_s, fill=RED)
    for bi, se in enumerate(ses):
        x0 = PAD + bi * 2 * COLW
        dr.rectangle([x0 + 4, HEAD, x0 + 2 * COLW - 4, H - 60], fill=COLBG[se])
        dr.text((x0 + 20, HEAD + 14), f'{VN[se].upper()} ({len(d[se])} người)', font=f_col, fill=INK)
        y0 = HEAD + 100
        dr.text((x0 + 24, y0), 'Họ màu mùa ' + VN[se] + ':  nhạt · vừa · đậm', font=f_r, fill=GRP)
        for i, fm in enumerate(d['families'][se]):
            fx = x0 + (i % 2) * COLW; fy = y0 + 40 + (i // 2) * 64
            dr.text((fx + 24, fy + 14), fm['name'], font=f_n, fill=INK)
            for j, h in enumerate(fm['swatches']):
                dr.rectangle([fx + 280 + j * 112, fy + 4, fx + 384 + j * 112, fy + 56], fill=h, outline=(150, 142, 134))
        ys = HEAD + 100 + FAMH
        dr.line([(x0 + 14, ys - 34), (x0 + 2 * COLW - 14, ys - 34)], fill=(150, 142, 134), width=2)
        dr.text((x0 + 24, ys - 28), f'Cặp gốc từng người ({len(d[se])})', font=f_r, fill=GRP)
        for ci, rows in enumerate(cols[bi]):
            cx = x0 + ci * COLW; y = ys + 6
            for r in rows:
                dr.rectangle([cx + 14, y, cx + COLW - 14, y + row_h(r) - 10], fill=(255, 253, 249), outline=(214, 208, 200))
                dr.rectangle([cx + 24, y + 12, cx + 174, y + 128], fill=r['main_hex'])
                dr.rectangle([cx + 174, y + 12, cx + 248, y + 128], fill=r['sec_hex'])
                dr.rectangle([cx + 24, y + 12, cx + 248, y + 128], outline=(150, 142, 134))
                tx = cx + 262; star = '*' if r['old_root_season'] != se else ''
                dr.text((tx, y + 8), f"{r['id']}{star}", font=f_id, fill=INK)
                dr.text((tx + dr.textlength(f"{r['id']}{star}  ", font=f_id), y + 16), r['group'], font=f_r, fill=GRP)
                dr.text((tx, y + 52), f"C: {r['main']}", font=f_n, fill=INK)
                dr.text((tx, y + 80), f"P: {r['sec']}", font=f_n, fill=INK)
                dr.text((tx, y + 108), f"{r['main_hex']} · {r['sec_hex']}", font=f_h, fill=SUB)
                if r['changed']:
                    o = r['changed']['old']; yy = y + 140
                    dr.text((cx + 24, yy + 4), 'CŨ', font=f_r, fill=RED)
                    dr.rectangle([cx + 70, yy, cx + 120, yy + 34], fill=o['main_hex']); dr.rectangle([cx + 120, yy, cx + 150, yy + 34], fill=o['sec_hex'])
                    dr.rectangle([cx + 70, yy, cx + 150, yy + 34], outline=(150, 142, 134))
                    dr.text((cx + 158, yy + 4), f"{o['main_hex']} · {o['sec_hex']} → MỚI (trên)", font=f_r, fill=RED)
                    for i, line in enumerate(textwrap.wrap('; '.join(r['changed']['why']), 52)[:2]):
                        dr.text((cx + 24, yy + 40 + 24 * i), line, font=f_h, fill=RED)
                y += row_h(r)
    dr.text((PAD + 6, H - 48), 'dev/art/face-common/season_colour_classes.json · season_classes.py · không xám (B19), không vàng hoàng gia (B21)',
            font=f_h, fill=SUB)
    p = os.path.join(OUT, f'season-colour-classes-{n}.png'); im.save(p, optimize=True)
    print(p, im.size, os.path.getsize(p) // 1024, 'KB')

page(1, ('xuan', 'ha')); page(2, ('thu', 'dong'))
