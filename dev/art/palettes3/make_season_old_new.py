"""Before / after review sheets for owner Lượt 741 (Xuân -> mostly pink) and Lượt 742/744 (one tone level).
  python3 make_season_old_new.py xuan  <before.json>   -> season_xuan_old_new.jpg (old vs new Xuân, every person)
  python3 make_season_old_new.py ha    <before.json>   -> season_ha_old_new.jpg (old vs new Hạ, owner Lượt 752)
  python3 make_season_old_new.py tone  <before.json>   -> season_tone_old_new.jpg (4 seasons before/after tone change,
                                                          C/L numbers per season, ★ roots: gốc cũ | gốc chỉnh tông)
After = the current dev/art/face-common/palettes_season.json. Before = an older copy of it (git show <rev>:...).
  python3 make_season_old_new.py v86   <before.json>   -> v86/changes_old_new.jpg (owner Lượt 763: only the people whose
                                                          non-root pairs changed to break a duplicate; old | new per season)
Both <= 900 KB."""
import json, os, sys, statistics as st
from PIL import Image, ImageDraw, ImageFont
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from colourlib import oklch, is_white
from seasons import SEASONS, VN

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
OUT = os.path.join(ROOT, 'dev/handover/review-sheets/palettes-season')
F = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
fnt = lambda s, b=False: ImageFont.truetype(FB if b else F, s)
BG, INK, SUB, STAR = (250, 248, 244), (40, 36, 34), (110, 104, 98), (176, 120, 20)

def ids_of(d): return [k for k in d if not k.startswith('_') and k not in ('status', 'root_season_counts')]

def save(im, name):
    path = os.path.join(OUT, name); q = 88
    while True:
        im.save(path, quality=q, optimize=True)
        if os.path.getsize(path) <= 900 * 1024 or q <= 40: break
        q -= 6
    print(path, im.size, q, os.path.getsize(path) // 1024, 'KB')

def fit(dr, t, font, w):
    while dr.textlength(t, font=font) > w and len(t) > 4: t = t[:-2] + '…'
    return t

def pair(dr, x, y, w, h, m, s):
    dr.rectangle([x, y, x + w // 2, y + h], fill=m); dr.rectangle([x + w // 2, y, x + w, y + h], fill=s)
    dr.rectangle([x, y, x + w, y + h], outline=(150, 142, 134))

def stats(d, se):
    out = {}
    for r in ('main_hex', 'sec_hex'):
        hs = [d[k][se][r] for k in ids_of(d) if not d[k][se].get('root') and not is_white(d[k][se][r])]
        out[r] = (st.mean(oklch(h)[1] for h in hs), st.mean(oklch(h)[0] for h in hs))
    return out

def sheet_xuan(old, new, se='xuan', title='Mùa Xuân — cũ (cam/đào) → mới (chủ yếu hồng)', out='season_xuan_old_new.jpg'):
    ids = ids_of(new); COLS, CW, CH, PAD, HEAD = 6, 300, 150, 10, 110
    rows = (len(ids) + COLS - 1) // COLS; W = PAD * 2 + COLS * CW; H = HEAD + rows * CH + 30
    im = Image.new('RGB', (W, H), BG); dr = ImageDraw.Draw(im)
    dr.text((PAD + 4, 14), title, font=fnt(38, True), fill=INK)
    dr.text((PAD + 4, 66), 'Mỗi ô: hàng trên = cũ, hàng dưới = mới · trái = màu chính, phải = màu phụ · ★ gốc giữ nguyên',
            font=fnt(20), fill=SUB)
    for i, k in enumerate(ids):
        r, c = divmod(i, COLS); x, y = PAD + c * CW, HEAD + r * CH
        o, n = old[k][se], new[k][se]; root = bool(n.get('root')); same = (o['main_hex'], o['sec_hex']) == (n['main_hex'], n['sec_hex'])
        dr.rectangle([x + 3, y + 3, x + CW - 3, y + CH - 3], fill=(255, 246, 222) if root else (255, 253, 249),
                     outline=STAR if root else (214, 208, 200), width=3 if root else 1)
        dr.text((x + 10, y + 7), k + ('  ★ gốc' if root else ('  (giữ)' if same else '')), font=fnt(19, True), fill=STAR if root else INK)
        for j, (lab, p) in enumerate((('cũ', o), ('mới', n))):
            yy = y + 34 + j * 56
            dr.text((x + 10, yy + 12), lab, font=fnt(15), fill=SUB)
            pair(dr, x + 48, yy, 110, 46, p['main_hex'], p['sec_hex'])
            dr.text((x + 164, yy + 2), fit(dr, p['main'], fnt(15), CW - 172), font=fnt(15), fill=INK)
            dr.text((x + 164, yy + 24), fit(dr, '+ ' + p['sec'], fnt(15), CW - 172), font=fnt(15), fill=SUB)
    save(im, out)

def sheet_ha(old, new):
    sheet_xuan(old, new, 'ha', 'Mùa Hạ — cũ (toàn xanh/tím) → mới (thêm vàng / cam mùa hè)', 'season_ha_old_new.jpg')

def sheet_tone(old, new):
    ids = ids_of(new)
    roots = [k for k in ids if 'root_tone_adjusted' in new[k][new[k]['root_season']]]
    RH, colW, PAD = 18, 450, 10; W = PAD * 2 + 4 * colW
    top = 330; body = 40 + len(ids) * RH; rrows = (len(roots) + 2) // 3; rootH = 70 + rrows * 34
    H = top + body + rootH + 30
    im = Image.new('RGB', (W, H), BG); dr = ImageDraw.Draw(im)
    dr.text((PAD + 4, 10), 'Tông màu 4 mùa — trước | sau (mức chung = tông Xuân + Hạ)', font=fnt(34, True), fill=INK)
    dr.text((PAD + 4, 56), 'C = độ rực (OKLCH chroma), L = độ sáng · trung bình các màu không phải ★ gốc · mục tiêu Xuân+Hạ: '
            'chính C 0.080 L 0.77, phụ C 0.082 L 0.74 · giữ hue + tên màu', font=fnt(17), fill=SUB)
    hdr = ['mùa', 'chính C trước→sau', 'chính L', 'phụ C trước→sau', 'phụ L trước→sau']
    xs = [PAD + 4, 150, 470, 700, 1030]; y0 = 92
    for x, t in zip(xs, hdr): dr.text((x, y0), t, font=fnt(19, True), fill=INK)
    for i, se in enumerate(SEASONS):
        a, b = stats(old, se), stats(new, se); y = y0 + 34 + i * 34
        vals = [VN[se], f"{a['main_hex'][0]:.3f} → {b['main_hex'][0]:.3f}", f"{a['main_hex'][1]:.2f} → {b['main_hex'][1]:.2f}",
                f"{a['sec_hex'][0]:.3f} → {b['sec_hex'][0]:.3f}", f"{a['sec_hex'][1]:.2f} → {b['sec_hex'][1]:.2f}"]
        for x, t in zip(xs, vals): dr.text((x, y), t, font=fnt(19), fill=INK)
    dr.text((PAD + 4, y0 + 34 * 5 + 6), 'Thu/Đông: màu phụ phải đậm theo luật mùa (Thu ≤ 0.64, Đông ≤ 0.58) nên độ sáng màu phụ chỉ nâng tới giới hạn đó; '
            'độ rực đã hạ về mức Xuân/Hạ. Cột Xuân "trước" = Xuân đã đổi sang hồng (Lượt 741).', font=fnt(16), fill=SUB)
    dr.line([(0, top - 14), (W, top - 14)], fill=(180, 172, 164), width=2)
    for c, se in enumerate(SEASONS):
        x0 = PAD + c * colW
        dr.text((x0 + 4, top - 6), f'{VN[se]}:  trước   |   sau', font=fnt(20, True), fill=INK)
        for i, k in enumerate(ids):
            y = top + 26 + i * RH; o, n = old[k][se], new[k][se]
            dr.text((x0 + 4, y), k, font=fnt(13, n.get('root', False)), fill=STAR if n.get('root') else INK)
            pair(dr, x0 + 46, y, 170, RH - 3, o['main_hex'], o['sec_hex'])
            pair(dr, x0 + 228, y, 170, RH - 3, n['main_hex'], n['sec_hex'])
            if n.get('root'): dr.text((x0 + 404, y), '★', font=fnt(13, True), fill=STAR)
    y1 = top + body + 10
    dr.line([(0, y1 - 6), (W, y1 - 6)], fill=(180, 172, 164), width=2)
    dr.text((PAD + 4, y1), f'★ gốc rực / tối hơn tông Xuân+Hạ ({len(roots)} người): gốc cũ | gốc chỉnh tông '
            '(chỉ đề xuất — mã gốc trong JSON giữ nguyên, trường root_tone_adjusted)', font=fnt(19, True), fill=INK)
    for i, k in enumerate(roots):
        r, c = divmod(i, 3); x, y = PAD + c * 600, y1 + 40 + r * 34
        p = new[k][new[k]['root_season']]; a = p['root_tone_adjusted']
        dr.text((x + 4, y + 4), f"{k} {VN[new[k]['root_season']]}", font=fnt(15, True), fill=INK)
        pair(dr, x + 100, y, 150, 28, p['main_hex'], p['sec_hex'])
        dr.text((x + 256, y + 4), '→', font=fnt(16), fill=SUB)
        pair(dr, x + 278, y, 150, 28, a['main_hex'], a['sec_hex'])
        dr.text((x + 436, y + 6), fit(dr, f"{p['main']} + {p['sec']}", fnt(13), 155), font=fnt(13), fill=SUB)
    save(im, 'season_tone_old_new.jpg')

def sheet_v86(old, new):
    """one row per changed person; 4 season columns; a changed season shows cũ (top) / mới (bottom), unchanged = one pair"""
    ids = [k for k in ids_of(new) if k in old and any(not new[k][se].get('root') and
           (old[k][se]['main'], old[k][se]['main_hex'], old[k][se]['sec'], old[k][se]['sec_hex']) !=
           (new[k][se]['main'], new[k][se]['main_hex'], new[k][se]['sec'], new[k][se]['sec_hex']) for se in SEASONS)]
    IDW, CW, RH, PAD, HEAD = 130, 560, 176, 12, 150
    W = PAD * 2 + IDW + 4 * CW; H = HEAD + len(ids) * RH + 50
    im = Image.new('RGB', (W, H), BG); dr = ImageDraw.Draw(im)
    dr.text((PAD + 4, 14), f'Cặp màu đã đổi để không trùng ai (Lượt 763) — {len(ids)} người', font=fnt(46, True), fill=INK)
    dr.text((PAD + 4, 74), 'Ô có đổi: trên = cũ, dưới = mới · ô không đổi: chỉ một cặp · ★ gốc không bao giờ đổi · trái = màu chính, phải = màu phụ',
            font=fnt(24), fill=SUB)
    for c, se in enumerate(SEASONS):
        dr.text((PAD + IDW + c * CW + 10, HEAD - 40), VN[se], font=fnt(32, True), fill=INK)
    for r, k in enumerate(ids):
        y = HEAD + r * RH
        dr.line([(PAD, y), (W - PAD, y)], fill=(200, 192, 184), width=2)
        dr.text((PAD + 6, y + 60), k, font=fnt(34, True), fill=INK)
        for c, se in enumerate(SEASONS):
            x = PAD + IDW + c * CW; o, n = old[k][se], new[k][se]; root = bool(n.get('root'))
            ch = (o['main'], o['main_hex'], o['sec'], o['sec_hex']) != (n['main'], n['main_hex'], n['sec'], n['sec_hex'])
            if root or not ch:
                pair(dr, x + 10, y + 50, 170, 60, n['main_hex'], n['sec_hex'])
                dr.text((x + 190, y + 52), fit(dr, ('★ ' if root else '') + n['main'], fnt(22), CW - 200), font=fnt(22), fill=STAR if root else SUB)
                dr.text((x + 190, y + 82), fit(dr, '+ ' + n['sec'], fnt(22), CW - 200), font=fnt(22), fill=SUB)
                continue
            dr.rectangle([x + 4, y + 6, x + CW - 6, y + RH - 6], outline=(46, 120, 160), width=3)
            for j, (lab, p) in enumerate((('cũ', o), ('mới', n))):
                yy = y + 14 + j * 80
                dr.text((x + 12, yy + 20), lab, font=fnt(22, True), fill=SUB if j == 0 else (46, 120, 160))
                pair(dr, x + 66, yy, 150, 64, p['main_hex'], p['sec_hex'])
                dr.text((x + 226, yy + 2), fit(dr, p['main'] + ' ' + p['main_hex'], fnt(21), CW - 236), font=fnt(21), fill=INK)
                dr.text((x + 226, yy + 32), fit(dr, '+ ' + p['sec'] + ' ' + p['sec_hex'], fnt(21), CW - 236), font=fnt(21), fill=INK)
    global OUT
    OUT = os.path.join(OUT, 'v86'); os.makedirs(OUT, exist_ok=True)
    save(im, 'changes_old_new.jpg')

def sheet_roots(old, new):
    """owner Lượt 770: root codes changed (picture not redrawn): drawn colours | new code, per person"""
    ch = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'palette86_changes.json')))['roots']
    ch = [c for c in ch if c['drawn'] and any(c['drawn'][x] != c['new'][x] for x in ('main_hex', 'sec_hex'))]
    COLS, CW, RH, PAD, HEAD = 3, 790, 150, 12, 140
    rows = (len(ch) + COLS - 1) // COLS; W = PAD * 2 + COLS * CW; H = HEAD + rows * RH + 40
    im = Image.new('RGB', (W, H), BG); dr = ImageDraw.Draw(im)
    dr.text((PAD + 4, 14), f'Mã màu gốc đổi, tranh giữ nguyên (Lượt 769/770) — {len(ch)} người', font=fnt(44, True), fill=INK)
    dr.text((PAD + 4, 72), 'Trái = màu đã vẽ · phải = mã mới (cùng tông nhẹ tươi Xuân/Hạ) · trái của mỗi cặp = màu chính, phải = màu phụ',
            font=fnt(23), fill=SUB)
    for i, c in enumerate(ch):
        r, cc = divmod(i, COLS); x, y = PAD + cc * CW, HEAD + r * RH
        dr.rectangle([x + 4, y + 4, x + CW - 6, y + RH - 6], outline=(214, 208, 200), width=1)
        dr.text((x + 14, y + 12), c['id'], font=fnt(32, True), fill=INK)
        dr.text((x + 14, y + 54), VN[c['new']['season']], font=fnt(22), fill=SUB)
        o, n = c['drawn'], c['new']
        pair(dr, x + 120, y + 14, 150, 60, o['main_hex'], o['sec_hex']); dr.text((x + 282, y + 30), '→', font=fnt(30, True), fill=SUB)
        pair(dr, x + 320, y + 14, 150, 60, n['main_hex'], n['sec_hex'])
        dr.text((x + 484, y + 14), fit(dr, n['main'], fnt(21), CW - 496), font=fnt(21), fill=INK)
        dr.text((x + 484, y + 44), fit(dr, '+ ' + n['sec'], fnt(21), CW - 496), font=fnt(21), fill=INK)
        dr.text((x + 120, y + 86), fit(dr, f"vẽ: {o['main']} {o['main_hex']} + {o['sec']} {o['sec_hex']}", fnt(18), CW - 134), font=fnt(18), fill=SUB)
        dr.text((x + 120, y + 112), f"mới: {n['main_hex']} + {n['sec_hex']}", font=fnt(18), fill=SUB)
    global OUT
    OUT = os.path.join(OUT, 'v86'); os.makedirs(OUT, exist_ok=True)
    save(im, 'roots_drawn_vs_new.jpg')

if __name__ == '__main__':
    new = json.load(open(os.path.join(ROOT, 'dev/art/face-common/palettes_season.json')))
    old = json.load(open(sys.argv[2]))
    dict(xuan=sheet_xuan, ha=sheet_ha, tone=sheet_tone, v86=sheet_v86, roots=sheet_roots)[sys.argv[1]](old, new)
