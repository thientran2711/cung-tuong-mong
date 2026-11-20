"""Sheets for palettes_season_deep.json (P3, owner Lượt 934) -> dev/handover/review-sheets/palettes-season/deep86/season_*.jpg
One sheet per season, all 86 consort faces grouped by look group, 6 columns, phone-readable.
A27 LABEL ON THE PICTURE: title = 'PHI TẦN · MÙA X · BẢNG ĐẬM'; each cell shows the face id + her look group BIG.
Badges: ★ GỐC (her drawn root pair) · XÁM (grey drawn root, owner undecided) · CHƯA VẼ (no drawn root, root = code) ·
'≈ id' red = her drawn root fails the ΔE 8 gate against that other drawn root (roots never move -> question for the owner)."""
import json, os
from PIL import Image, ImageDraw, ImageFont
from seasons import SEASONS, VN
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
d = json.load(open(os.path.join(ROOT, 'dev/art/face-common/palettes_season_deep.json')))
ids = [k for k in d if not k.startswith('_') and k != 'status']
OUT = os.path.join(ROOT, 'dev/handover/review-sheets/palettes-season/deep86'); os.makedirs(OUT, exist_ok=True)
F = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
T = lambda f, n: ImageFont.truetype(f, n)
f_title, f_sub, f_grp, f_id, f_g, f_name, f_hex, f_b = T(FB, 64), T(F, 28), T(FB, 46), T(FB, 40), T(FB, 26), T(F, 23), T(F, 20), T(FB, 24)
BG, INK, SUB, STAR, GREYB, NOD, RED = (250, 248, 244), (40, 36, 34), (110, 104, 98), (176, 120, 20), (96, 96, 104), (46, 120, 160), (196, 40, 40)
COLS, CW, CH, PAD, HEAD, GH = 6, 380, 348, 14, 230, 70
GROUP_ORDER = ['Sắc sảo', 'Đoan trang', 'Dịu dàng', 'Kiêu kỳ', 'Lạnh lùng', 'Quyến rũ']
GREY = set(d['_flags']['XAM_grey_root']); NOD_ = set(d['_flags']['NO_DRAWN_root_is_code'])
RR = {}
for se, a, b, *_ in d['_flags']['root_root_gate_fails']:
    RR.setdefault((se, a), []).append(b); RR.setdefault((se, b), []).append(a)
W = PAD * 2 + COLS * CW

def fit(dr, t, font, w):
    while dr.textlength(t, font=font) > w and len(t) > 4: t = t[:-2] + '…'
    return t

def layout():
    cells, heads, y = [], [], HEAD
    for g in GROUP_ORDER:
        mem = [k for k in ids if d[k]['group'] == g]
        heads.append((y, g, len(mem))); y += GH
        for i, k in enumerate(mem): cells.append((PAD + (i % COLS) * CW, y + (i // COLS) * CH, k))
        y += ((len(mem) + COLS - 1) // COLS) * CH + 10
    assert len(cells) == len(ids), (len(cells), len(ids))
    return cells, heads, y + 60

def badge(dr, x, y, t, col):
    w = dr.textlength(t, font=f_b); dr.rounded_rectangle([x, y, x + w + 14, y + 32], 6, fill=col)
    dr.text((x + 7, y + 3), t, font=f_b, fill=(255, 255, 255)); return x + w + 20

CELLS, HEADS, HTOT = layout()
for se in SEASONS:
    nroot = sum(1 for k in ids if d[k][se].get('root'))
    im = Image.new('RGB', (W, HTOT), BG); dr = ImageDraw.Draw(im)
    dr.text((PAD + 6, 16), f'PHI TẦN · MÙA {VN[se].upper()} · BẢNG ĐẬM', font=f_title, fill=INK)
    dr.text((PAD + 6, 100), f'86 mặt phi tần (dùng cho mọi phẩm vị) · nhóm nét mặt ghi trên từng ô · trái = màu chính, phải = màu phụ',
            font=f_sub, fill=SUB)
    dr.text((PAD + 6, 140), f'★ GỐC = màu đã vẽ ({nroot} người gốc mùa {VN[se]}) · XÁM = gốc đã vẽ màu xám (chờ chủ quyết) · '
            f'CHƯA VẼ = chưa có màu vẽ, gốc = mã', font=f_sub, fill=SUB)
    dr.text((PAD + 6, 178), '≈ đỏ = hai gốc đã vẽ quá giống nhau (ΔE < 8), gốc không đổi → chờ chủ quyết', font=f_sub, fill=RED)
    dr.line([(0, HEAD - 10), (W, HEAD - 10)], fill=(180, 172, 164), width=2)
    for gy, g, n in HEADS:
        dr.rectangle([PAD, gy + 6, W - PAD, gy + GH - 6], fill=(236, 230, 222))
        dr.text((PAD + 16, gy + 8), f'Nhóm {g} ({n} người)', font=f_grp, fill=INK)
    for x, y, k in CELLS:
        p = d[k][se]; root = bool(p.get('root'))
        dr.rectangle([x + 4, y + 4, x + CW - 4, y + CH - 6], fill=(255, 246, 222) if root else (255, 253, 249),
                     outline=STAR if root else (214, 208, 200), width=5 if root else 1)
        dr.text((x + 14, y + 8), k, font=f_id, fill=INK)
        bx = x + 26 + dr.textlength(k, font=f_id)
        if root: bx = badge(dr, bx, y + 14, '★ GỐC', STAR)
        if k in GREY: bx = badge(dr, bx, y + 14, 'XÁM', GREYB)
        if k in NOD_: bx = badge(dr, bx, y + 14, 'CHƯA VẼ', NOD)
        dr.text((x + 14, y + 56), d[k]['group'], font=f_g, fill=(120, 70, 30))
        rr = RR.get((se, k))
        if rr:
            dr.text((x + 14, y + 88), fit(dr, 'gốc ≈ ' + ' '.join(rr), f_g, CW - 28), font=f_g, fill=RED)
        sx, sy, sw, sh = x + 14, y + 122, (CW - 28) // 2, 120
        dr.rectangle([sx, sy, sx + sw, sy + sh], fill=p['main_hex'])
        dr.rectangle([sx + sw, sy, sx + 2 * sw, sy + sh], fill=p['sec_hex'])
        dr.rectangle([sx, sy, sx + 2 * sw, sy + sh], outline=(150, 142, 134), width=1)
        dr.text((sx, sy + sh + 6), fit(dr, 'C: ' + p['main'], f_name, CW - 28), font=f_name, fill=INK)
        dr.text((sx, sy + sh + 34), fit(dr, 'P: ' + p['sec'], f_name, CW - 28), font=f_name, fill=INK)
        dr.text((sx, sy + sh + 63), f"{p['main_hex']} · {p['sec_hex']}", font=f_hex, fill=SUB)
    dr.text((PAD + 6, HTOT - 44), 'P3 · Lượt 934 · bảng 4 mùa ĐẬM từ màu gốc đã vẽ (L27) · mỗi người một cặp riêng mỗi mùa (ΔE 8) · '
            'palettes_season_deep.json', font=f_hex, fill=SUB)
    path = os.path.join(OUT, f'season_{se}.jpg'); q = 88
    while True:
        im.save(path, quality=q, optimize=True)
        if os.path.getsize(path) <= 1600 * 1024 or q <= 60: break
        q -= 6
    print(path, im.size, q, os.path.getsize(path) // 1024, 'KB', nroot, 'roots')
