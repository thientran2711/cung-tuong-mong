#!/usr/bin/env python3
"""PALBACH1 (owner L1821): a real 3rd colour for the phi bach, per person x {ha, thu}.
Method: curated library of soft Chinese traditional tints per season; per person score each
candidate on (a) distance from main + secondary (OKLab), (b) hue harmony with the main
(analogous 25-70deg or complementary/split 130-210deg), (c) season family; greedy assignment with a
reuse penalty so the court stays varied; ha != thu for one person. Thin gold edge kept (G56)."""
import json, math, os, sys
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
PAL = os.path.join(ROOT, 'dev/art/face-common/palettes_season_L1726.json')
OUT = os.path.join(ROOT, 'dev/art/face-common/phibach_3rd_L1821.json')
SHEETS = os.path.join(ROOT, 'dev/handover/review-sheets/phibach_3rd_L1821')

# (hex, chinese, vi, en)
LIB = {
 'ha': [
  ('#D6ECF0', '月白', 'xanh trăng', 'moon-white blue'),
  ('#C8E6DC', '天水碧', 'xanh nước trời', 'sky-water jade'),
  ('#D2E9E3', '湖色', 'xanh mặt hồ', 'lake green'),
  ('#E0EEE8', '鸭卵青', 'xanh trứng vịt', 'duck-egg green'),
  ('#CFE3C8', '竹青', 'xanh trúc nhạt', 'pale bamboo green'),
  ('#E3ECC6', '松花', 'xanh phấn thông', 'pine-pollen green'),
  ('#E6D6EE', '丁香', 'tím đinh hương', 'lilac'),
  ('#D9D3EE', '雪青', 'tím tuyết', 'snow-violet'),
  ('#E8D6E0', '藕荷', 'tím ngó sen', 'lotus-root mauve'),
  ('#F3D9E6', '水红', 'hồng nước', 'water pink'),
  ('#F6E0CC', '杏', 'vàng hạnh nhạt', 'pale apricot'),
  ('#F7DDD6', '桃夭', 'hồng đào phấn', 'peach blossom'),
  ('#CFDCF0', '菘蓝', 'lam tùng nhạt', 'pale woad blue'),
  ('#D5E0E9', '天青', 'thiên thanh', 'sky celadon'),
 ],
 'thu': [
  ('#E4CCD4', '藕荷', 'tím ngó sen', 'lotus-root mauve'),
  ('#EBD3CB', '檀色', 'hồng gỗ đàn', 'sandalwood rose'),
  ('#E7D5BF', '驼色', 'nâu lạc đà nhạt', 'pale camel'),
  ('#E9DDB9', '香色', 'vàng hương trầm', 'incense buff'),
  ('#DEDCB4', '秋香', 'vàng thu hương', 'autumn-fragrance olive'),
  ('#F2DFC8', '杏', 'vàng hạnh nhạt', 'pale apricot'),
  ('#E7D2C2', '赭白', 'son đất nhạt', 'pale earth-rose'),
  ('#DCD5EC', '雪青', 'tím tuyết', 'snow-violet'),
  ('#E6D8EA', '丁香', 'tím đinh hương', 'lilac'),
  ('#D8E9EE', '月白', 'xanh trăng thu', 'autumn moon-white'),
  ('#D4DFEA', '天青', 'thiên thanh', 'sky celadon'),
  ('#D3E3D6', '苍青', 'xanh rêu sương', 'misty sage'),
  ('#ECD9DD', '粉藕', 'hồng ngó sen', 'pink lotus-root'),
  ('#E2E4C6', '葭灰绿', 'xanh lau nhạt', 'reed green'),
 ]}

def srgb2lin(c):
    c /= 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
def oklab(h):
    r, g, b = (srgb2lin(int(h[i:i+2], 16)) for i in (1, 3, 5))
    l = (0.4122214708*r + 0.5363325363*g + 0.0514459929*b) ** (1/3)
    m = (0.2119034982*r + 0.6806995451*g + 0.1073969566*b) ** (1/3)
    s = (0.0883024619*r + 0.2817188376*g + 0.6299787005*b) ** (1/3)
    return (0.2104542553*l + 0.7936177850*m - 0.0040720468*s,
            1.9779984951*l - 2.4285922050*m + 0.4505937099*s,
            0.0259040371*l + 0.7827717662*m - 0.8086757660*s)
def lch(h):
    L, a, b = oklab(h); return L, math.hypot(a, b), math.degrees(math.atan2(b, a)) % 360
def dE(x, y):
    return 100 * math.dist(oklab(x), oklab(y))
def hd(a, b):
    d = abs(a - b) % 360; return min(d, 360 - d)

def lab2hex(L, a, b):
    l, m, s_ = (L + 0.3963377774*a + 0.2158037573*b) ** 3, (L - 0.1055613458*a - 0.0638541728*b) ** 3, (L - 0.0894841775*a - 1.2914855480*b) ** 3
    rgb_ = (4.0767416621*l - 3.3077115913*m + 0.2309699292*s_, -1.2684380046*l + 2.6097574011*m - 0.3413193965*s_,
            -0.0041960863*l - 0.7034186147*m + 1.7076147010*s_)
    def enc(v):
        v = max(0.0, min(1.0, v)); v = 12.92*v if v <= 0.0031308 else 1.055*v ** (1/2.4) - 0.055
        return round(v * 255)
    return '#%02X%02X%02X' % tuple(enc(v) for v in rgb_)

def variants(season):
    """each library tint in 2 strengths: pale (as listed) and 'soft' (a little deeper, for pale robes)."""
    out = []
    for h, zh, vi, en in LIB[season]:
        out.append((h, zh, vi, en, 'pale'))
        L, a, b = oklab(h)
        out.append((lab2hex(L - 0.075, a * 1.7, b * 1.7), zh, vi + ' đậm dịu', en + ' (soft-deep)', 'soft'))
    return out

def score(c, main, sec):
    dm, ds = dE(c, main), dE(c, sec)
    _, cm, hm = lch(main); _, cs, hs = lch(sec); _, cc, hc = lch(c)
    if dm < 8 or ds < 6:
        return None
    # 'clearly a separate shawl': small distance only allowed with a clear hue change
    for dd, cx, hx in ((dm, cm, hm), (ds, cs, hs)):
        if dd < 12 and not (cx > 0.025 and hd(hc, hx) >= 60):
            return None
    # L1847 (owner: 'phi bạch is a COMPLETELY DIFFERENT colour'): hue must differ >= 60deg from BOTH main and
    # secondary whenever that colour carries any tint (OKLCH C > 0.018); near-neutral (white/ivory/mist) secondaries: dE only
    for cx, hx in ((cm, hm), (cs, hs)):
        if cx > 0.018 and hd(hc, hx) < 60:
            return None
    s = min(dm, 30) * 0.8 + min(ds, 18) * 1.4
    d = hd(hc, hm)                       # harmony with the main (the robe that dominates)
    if d >= 120: s += 12                 # complementary / split-complementary pastel
    elif d >= 60: s += 9                 # triadic pastel
    return s

def main():
    pal = json.load(open(PAL))
    persons = [k for k in pal if k[0] in 'cms' and isinstance(pal[k], dict) and 'ha' in pal[k]]
    # s62 first, then the rest by id
    persons = ['s62'] + sorted(p for p in persons if p != 's62')
    res, use = {}, {s: {} for s in LIB}
    # L1847: keep every owner-approved L1834 pick that still passes the new hue rule; re-pick only the collisions
    APPR = json.load(open(os.path.join(ROOT, 'dev/art/face-common/phibach_3rd_L1834_approved.json')))
    FORCE = {('s62', 'thu'): '#B6D3DB'}   # designer pick: soft 月白 autumn moon-white (olive main + pink-lilac secondary; Mid-Autumn)
    VAR = {s: {c[0]: c for c in variants(s)} for s in LIB}
    for season in LIB:
        for p in persons:
            q = pal[p][season]; h = FORCE.get((p, season)) or APPR.get(p, {}).get(season, {}).get('hex')
            if h in VAR[season] and score(h, q['main_hex'], q['sec_hex']) is not None:
                use[season][h] = use[season].get(h, 0) + 1
    for season in ('ha', 'thu'):
        # hardest persons (fewest valid candidates) first
        def nvalid(p):
            q = pal[p][season]; return sum(score(c[0], q['main_hex'], q['sec_hex']) is not None for c in variants(season))
        order = sorted(persons, key=lambda p: (p != 's62', nvalid(p), p))
        for p in order:
            q = pal[p][season]; best = None
            h = FORCE.get((p, season)) or APPR.get(p, {}).get(season, {}).get('hex')
            if h in VAR[season] and score(h, q['main_hex'], q['sec_hex']) is not None:
                best = (0, VAR[season][h])
            for c in ([] if best else variants(season)):
                sc = score(c[0], q['main_hex'], q['sec_hex'])
                if sc is None: continue
                if c[4] == 'pale': sc += 3
                if season == 'thu' and dE(c[0], res[p]['ha']['hex']) < 8: sc -= 30   # ha != thu (soft)
                if season == 'ha' and APPR.get(p, {}).get('thu') and dE(c[0], APPR[p]['thu']['hex']) < 8: sc -= 30
                sc -= 4.5 * use[season].get(c[0], 0)
                if best is None or sc > best[0]: best = (sc, c)
            if best is None: sys.exit(f'no candidate {p} {season}')
            c = best[1]
            if best[0] != 0: use[season][c[0]] = use[season].get(c[0], 0) + 1
            res.setdefault(p, {})[season] = {
                'hex': c[0], 'name_zh': c[1], 'name_vi': f'{c[2]} ({c[1]})', 'name_en': c[3],
                'main_hex': q['main_hex'], 'main_vi': q['main_vi'], 'sec_hex': q['sec_hex'], 'sec_vi': q['sec_vi'],
                'dE_main': round(dE(c[0], q['main_hex']), 1), 'dE_sec': round(dE(c[0], q['sec_hex']), 1),
                'harmony': rel(c[0], q['main_hex']), 'prompt_colour': prompt_colour(c[3], c[0])}
    out = {'_note': 'PALBACH1 L1821 (approved L1834; L1847 hue rule: 3rd hue >= 60deg from main AND tinted secondary). Phi bach 3rd colour per '
           'person x season (ha/thu only; ranks t1-t6, same colour at every rank per G13; t6 = thicker silk G54; '
           'thin gold edge kept G56; t7/t8 + xuan/dong none). Overrides only the IVORY-CREAM colour part of G56 if approved. '
           'APPROVED owner L1834 (via Foreman C #23). prompt_colour = words used by build_all phi_bach(). dE = OKLab x100. Script dev/art/palettes3/phibach_3rd_L1821.py; palette source palettes_season_L1726.json.',
           '_usage': use}
    out.update({p: res[p] for p in persons})
    json.dump(out, open(OUT, 'w'), ensure_ascii=False, indent=1)
    draw_sheets(persons, res)

def prompt_colour(en, hexv):
    """L1834 apply: colour words for the phi bach sentence, e.g. 'soft snow-violet silk (like #C6BAE0)'."""
    soft = en.endswith('(soft-deep)'); base = en.replace(' (soft-deep)', '')
    if base.startswith('pale '): base = base[5:]
    return f"{'soft' if soft else 'pale'} {base} silk (like {hexv})"

def rel(c, main):
    d = hd(lch(c)[2], lch(main)[2])
    return 'complementary' if d >= 120 else ('triadic' if d >= 60 else 'analogous')

# ---------------- sheets ----------------
F = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
FZ = '/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc'
def font(p, s): return ImageFont.truetype(p, s)
def rgb(h): return tuple(int(h[i:i+2], 16) for i in (1, 3, 5))
GOLD = (201, 162, 74)

def figure(dr, x, y, main, sec, pb, thick=False):
    """flat robe-with-shawl silhouette, ~150x230 at (x,y) top-left"""
    cx = x + 75
    dr.ellipse([cx-16, y, cx+16, y+34], fill=(236, 214, 196), outline=(90, 70, 60))      # head
    dr.ellipse([cx-18, y-6, cx+18, y+14], fill=(40, 34, 34))                                 # hair
    # robe (main): trapezoid
    dr.polygon([(cx-28, y+38), (cx+28, y+38), (cx+62, y+228), (cx-62, y+228)], fill=rgb(main), outline=(80, 70, 70))
    # sleeves (main)
    dr.polygon([(cx-28, y+42), (cx-70, y+150), (cx-46, y+165), (cx-22, y+80)], fill=rgb(main), outline=(80, 70, 70))
    dr.polygon([(cx+28, y+42), (cx+70, y+150), (cx+46, y+165), (cx+22, y+80)], fill=rgb(main), outline=(80, 70, 70))
    # secondary: collar V, sash, skirt panel
    dr.polygon([(cx-14, y+38), (cx, y+70), (cx+14, y+38), (cx+20, y+38), (cx, y+82), (cx-20, y+38)], fill=rgb(sec))
    dr.rectangle([cx-30, y+92, cx+30, y+104], fill=rgb(sec))
    dr.polygon([(cx-10, y+104), (cx+10, y+104), (cx+22, y+228), (cx-22, y+228)], fill=rgb(sec))
    # phi bach: arc behind back over both arms, hanging ends
    a = 255 if thick else 175
    lay = Image.new('RGBA', dr._image.size, (0, 0, 0, 0)); ld = ImageDraw.Draw(lay)
    col = rgb(pb) + (a,)
    ld.polygon([(cx-74, y+120), (cx-56, y+58), (cx, y+46), (cx+56, y+58), (cx+74, y+120),
                (cx+80, y+200), (cx+66, y+202), (cx+60, y+122), (cx+44, y+72), (cx, y+62),
                (cx-44, y+72), (cx-60, y+122), (cx-66, y+202), (cx-80, y+200)], fill=col, outline=GOLD + (255,))
    ld.line([(cx-80, y+200), (cx-66, y+202)], fill=GOLD + (255,), width=3)
    ld.line([(cx+80, y+200), (cx+66, y+202)], fill=GOLD + (255,), width=3)
    dr._image.alpha_composite(lay)

def sw(dr, x, y, w, h, hexv, label, sub):
    dr.rectangle([x, y, x+w, y+h], fill=rgb(hexv), outline=(60, 60, 60), width=2)
    dr.text((x, y+h+4), label, font=font(FB, 26), fill=(30, 30, 30))
    dr.text((x, y+h+36), sub, font=font(F, 19), fill=(70, 70, 70))

def text_mixed(dr, xy, s, size, fill=(30, 30, 30)):
    """Vietnamese in DejaVu, CJK chars in WenQuanYi."""
    x, y = xy
    for ch in s:
        f = font(FZ, size) if ord(ch) > 0x2E80 else font(FB, size)
        dr.text((x, y), ch, font=f, fill=fill); x += dr.textlength(ch, font=f)

W, ROWH = 2400, 330
def draw_sheets(persons, res):
    os.makedirs(SHEETS, exist_ok=True)
    pages = [('p01_s62_t1-t6', [('s62', f't{t}') for t in range(1, 7)])]
    rest = [(p, '') for p in persons if p != 's62']
    for i in range(0, len(rest), 10):
        pages.append((f'p{len(pages)+1:02d}_{rest[i][0]}-{rest[min(i+9, len(rest)-1)][0]}', rest[i:i+10]))
    paths = []
    for name, rows in pages:
        H = 140 + ROWH * len(rows)
        im = Image.new('RGBA', (W, H), (250, 247, 240, 255)); dr = ImageDraw.Draw(im)
        dr.text((30, 24), 'PHI BẠCH — MÀU THỨ 3 (L1821, đề xuất)  ·  chính | phụ | phi bạch (viền vàng mảnh)', font=font(FB, 38), fill=(40, 30, 30))
        dr.text((30, 80), 'Trái: HẠ   ·   Phải: THU   ·   chỉ bậc t1–t6; t6 Quý phi = lụa dày (G54); t7/t8, xuân, đông: không có phi bạch', font=font(F, 24), fill=(80, 60, 60))
        for r, (p, tag) in enumerate(rows):
            y0 = 140 + r * ROWH
            dr.line([(20, y0), (W-20, y0)], fill=(200, 190, 180), width=2)
            dr.text((30, y0+16), p, font=font(FB, 40), fill=(20, 20, 20))
            if tag: dr.text((30, y0+66), tag + (' Quý phi\nlụa dày' if tag == 't6' else '\nsa mỏng'), font=font(FB, 28), fill=(120, 60, 40))
            for k, season in enumerate(('ha', 'thu')):
                q = res[p][season]; x0 = 190 + k * 1105
                dr.text((x0, y0+12), 'HẠ' if season == 'ha' else 'THU', font=font(FB, 30), fill=(120, 60, 40))
                sw(dr, x0, y0+52, 170, 150, q['main_hex'], 'Chính', q['main_vi'][:17])
                sw(dr, x0+200, y0+52, 170, 150, q['sec_hex'], 'Phụ', q['sec_vi'][:17])
                dr.rectangle([x0+400, y0+52, x0+620, y0+202], fill=rgb(q['hex']), outline=GOLD, width=6)
                dr.text((x0+640, y0+56), 'PHI BẠCH', font=font(FB, 26), fill=(150, 110, 40))
                text_mixed(dr, (x0+640, y0+92), q['name_vi'].split(' (')[0].replace(' đậm dịu', ''), 26)
                text_mixed(dr, (x0+640, y0+128), q['name_zh'], 34)
                dr.text((x0+640, y0+176), q['hex'] + ('  đậm dịu' if 'đậm dịu' in q['name_vi'] else ''), font=font(F, 22), fill=(70, 70, 70))
                dr.text((x0+400, y0+210), q['name_en'], font=font(F, 22), fill=(70, 70, 70))
                figure(dr, x0+900, y0+60, q['main_hex'], q['sec_hex'], q['hex'], thick=(tag == 't6'))
        path = os.path.join(SHEETS, name + '.png'); im.convert('RGB').save(path, optimize=True); paths.append(path)
    print('\n'.join(paths))

if __name__ == '__main__':
    main()
