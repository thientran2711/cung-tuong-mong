"""Sheet for season_colour_classes.json -> dev/handover/review-sheets/palettes-season/deep86/season-colour-classes.png
4 big columns XUÂN | HẠ | THU | ĐÔNG; each row = one person's root PAIR (main big + sec touching), id + look group, names, hex;
changed pairs show the OLD pair small + 'CŨ → MỚI' + the stylist's one-line reason (A27: labels big on the image)."""
import json, os, textwrap
from PIL import Image, ImageDraw, ImageFont
from seasons import SEASONS, VN
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
d = json.load(open(os.path.join(ROOT, 'dev/art/face-common/season_colour_classes.json')))
OUT = os.path.join(ROOT, 'dev/handover/review-sheets/palettes-season/deep86'); os.makedirs(OUT, exist_ok=True)
F = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
T = lambda f, n: ImageFont.truetype(f, n)
f_t, f_s, f_col, f_id, f_n, f_h, f_r = T(FB, 70), T(F, 30), T(FB, 60), T(FB, 34), T(F, 24), T(F, 21), T(FB, 22)
BG, INK, SUB, RED, GRP = (250, 248, 244), (40, 36, 34), (110, 104, 98), (190, 40, 40), (120, 70, 30)
COLW, PAD, HEAD = 640, 16, 300
COLBG = {'xuan': (252, 234, 238), 'ha': (255, 243, 214), 'thu': (244, 232, 218), 'dong': (228, 238, 250)}

def row_h(r): return 150 + (96 if r['changed'] else 0)
FAMH = 70 + 64 * max(len(d['families'][s]) for s in SEASONS) + 70
H = HEAD + 110 + FAMH + max(sum(row_h(r) for r in d[s]) for s in SEASONS) + 70
W = PAD * 2 + 4 * COLW
im = Image.new('RGB', (W, H), BG); dr = ImageDraw.Draw(im)
dr.text((PAD + 6, 14), 'PHÂN LOẠI MÀU THEO MÙA · 86 PHI TẦN · CẶP GỐC ĐẬM', font=f_t, fill=INK)
dr.text((PAD + 6, 104), 'Trên: HỌ MÀU của mùa (nhạt · vừa · đậm) · Dưới: cặp màu gốc từng người (ô lớn = chính, ô nhỏ = phụ) + mã + nhóm', font=f_s, fill=SUB)
dr.text((PAD + 6, 188), 'Mùa theo màu CHÍNH: Xuân hồng/đỏ · Hạ CAM/VÀNG · Thu đất · Đông lạnh — KHÔNG theo độ đậm · * = mùa gốc cũ khác', font=f_s, fill=SUB)
dr.text((PAD + 6, 146), 'Không còn màu xám · mỗi người một cặp riêng (ΔE 8, 0 trùng) · '
        f"{len([1 for s in SEASONS for r in d[s] if r['changed']])} cặp chuyên gia sửa: chữ đỏ CŨ → MỚI + lý do", font=f_s, fill=SUB)
dr.text((PAD + 6, 230), 'Chờ chủ duyệt phân loại trước khi làm bảng 4 mùa từng người · P3', font=f_s, fill=RED)
for ci, se in enumerate(SEASONS):
    x0 = PAD + ci * COLW
    dr.rectangle([x0 + 4, HEAD, x0 + COLW - 4, H - 60], fill=COLBG[se])
    dr.text((x0 + 20, HEAD + 18), f'{VN[se].upper()} ({len(d[se])})', font=f_col, fill=INK)
    y = HEAD + 110
    dr.text((x0 + 24, y), 'Họ màu mùa ' + VN[se] + ':  nhạt · vừa · đậm', font=f_r, fill=GRP); y += 40
    for fm in d['families'][se]:
        dr.text((x0 + 24, y + 14), fm['name'], font=f_n, fill=INK)
        for i, h in enumerate(fm['swatches']):
            dr.rectangle([x0 + 280 + i * 112, y + 4, x0 + 384 + i * 112, y + 56], fill=h, outline=(150, 142, 134))
        y += 64
    y = HEAD + 110 + FAMH
    dr.line([(x0 + 14, y - 30), (x0 + COLW - 14, y - 30)], fill=(150, 142, 134), width=2)
    dr.text((x0 + 24, y - 24), f'Cặp gốc từng người ({len(d[se])})', font=f_r, fill=GRP)
    y += 12
    for r in d[se]:
        dr.rectangle([x0 + 14, y, x0 + COLW - 14, y + row_h(r) - 10], fill=(255, 253, 249), outline=(214, 208, 200))
        dr.rectangle([x0 + 24, y + 12, x0 + 174, y + 128], fill=r['main_hex'])
        dr.rectangle([x0 + 174, y + 12, x0 + 248, y + 128], fill=r['sec_hex'])
        dr.rectangle([x0 + 24, y + 12, x0 + 248, y + 128], outline=(150, 142, 134))
        tx = x0 + 262
        star = '*' if r['old_root_season'] != se else ''
        dr.text((tx, y + 8), f"{r['id']}{star}", font=f_id, fill=INK)
        dr.text((tx + dr.textlength(f"{r['id']}{star}  ", font=f_id), y + 16), r['group'], font=f_r, fill=GRP)
        dr.text((tx, y + 52), f"C: {r['main']}", font=f_n, fill=INK)
        dr.text((tx, y + 80), f"P: {r['sec']}", font=f_n, fill=INK)
        dr.text((tx, y + 108), f"{r['main_hex']} · {r['sec_hex']}", font=f_h, fill=SUB)
        if r['changed']:
            o = r['changed']['old']; yy = y + 140
            dr.text((x0 + 24, yy + 4), 'CŨ', font=f_r, fill=RED)
            dr.rectangle([x0 + 70, yy, x0 + 120, yy + 34], fill=o['main_hex']); dr.rectangle([x0 + 120, yy, x0 + 150, yy + 34], fill=o['sec_hex'])
            dr.rectangle([x0 + 70, yy, x0 + 150, yy + 34], outline=(150, 142, 134))
            dr.text((x0 + 158, yy + 4), f"{o['main_hex']} · {o['sec_hex']} → MỚI (trên)", font=f_r, fill=RED)
            why = '; '.join(r['changed']['why'])
            for i, line in enumerate(textwrap.wrap(why, 50)[:2]):
                dr.text((x0 + 24, yy + 40 + 24 * i), line, font=f_h, fill=RED)
        y += row_h(r)
dr.text((PAD + 6, H - 48), 'dev/art/face-common/season_colour_classes.json · season_classes.py (Lượt 954: Hạ = cam/vàng; mùa = họ màu, không phải độ đậm)',
        font=f_h, fill=SUB)
p = os.path.join(OUT, 'season-colour-classes.png'); im.save(p, optimize=True)
print(p, im.size, os.path.getsize(p) // 1024, 'KB')
