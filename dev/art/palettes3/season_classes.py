"""Season colour classification of the 86 DEEP root pairs (P3, owner orders ~02:27–02:34Z 20/11 via ROOT-64):
"Xám là bỏ hết" · "phải phân loại màu theo mùa đã" · "chuyên gia thiết kế thời trang và phối màu làm bảng màu cho đẹp, 2 màu
phối cho đẹp" · "Chuyên gia khuyến nghị sửa màu nào thì sửa, ngay cả sửa bảng đã duyệt" · "thu và đông không có nghĩa là màu
đậm hơn".
Input : palettes_season_deep.json (root pair = root_drawn, or code for the 16 without one).
Expert fixes (each logged CŨ → MỚI + reason):
  1 GREY  : a non-white colour with chroma < .045, a silvery cold white (C < .012, blue-grey hue), or a colour named grey /
            silver / pewter -> same lightness,
            a real hue (her own hue, else her root-code hue for that role), chroma .06 (.035 for a pale tint L >= .86).
  2 TWINS : two roots that fail the ΔE2000 8 gate in the same season -> the one with the smaller move shifts hue (same
            lightness = same depth) until both read as different people.
Classification (owner Lượt 954 "Hạ phải có kiểu màu cam, màu vàng nhiều vô ... khá giống như mùa đông"): season = character of
  the MAIN colour (an ivory/white main -> her secondary), by colour word then hue, NEVER by depth:
  XUÂN pinks / rose / coral / red / raspberry / fuchsia (Tết reds), and spring greens worn with a pink
  HẠ   orange / apricot / peach / mango / marigold / yellow / honey / saffron / amber / caramel / persimmon / gold (warm sun)
  THU  terracotta / rust / brick / sienna / olive / moss / bamboo / sage / khaki / brown / aubergine (earth)
  ĐÔNG blue / navy / indigo / violet / purple / lilac / lavender / orchid / plum / jade / teal / aqua / celadon / mint / emerald
       / pine / ice / white (cool, icy).
Output: dev/art/face-common/season_colour_classes.json + dev/handover/review-sheets/palettes-season/deep86/season-colour-classes.png"""
import json, os, sys, functools, itertools
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import colourlib
colourlib.oklab = functools.lru_cache(maxsize=None)(colourlib.oklab)
_ok = colourlib.oklch
colourlib.oklch = functools.lru_cache(maxsize=None)(lambda h: _ok(h))
from colourlib import *
from seasons import SEASONS, VN
import re
KW = [('thu', 'coral pomegranate cranberry berry olive leaf'),
      ('ha', 'orange apricot peach mango marigold sunflower yellow honey saffron persimmon melon cantaloupe gold lemon butter'),
      ('xuan', 'pink rose blush peony cherry lotus raspberry fuchsia magenta crimson red garnet wine burgundy lychee'),
      ('dong', 'blue navy indigo violet purple lilac lavender orchid plum jade teal aqua celadon mint emerald pine ice frost white ivory pearl cream')]
def word_season(name):
    n = name.lower()
    for se, ws in KW:                          # first listed wins: 'peach-blossom pink' -> pink handled below
        pass
    if re.search(r'blossom|pink', n): return 'xuan'
    for se, ws in KW:
        if any(re.search(r'\b' + w, n) for w in ws.split()): return se
    return None
def hue_season(h):
    L, C, H = oklch(h)
    if is_white(h): return 'dong'
    if H >= 345 or H < 35: return 'xuan'
    if H < 100: return 'ha'
    if H < 140: return 'thu'
    return 'dong'
def green(name, h):
    return bool(re.search(r'green|celadon|jade|mint|leaf', name.lower())) and 120 <= oklch(h)[2] < 175
def classify(m, s, mn='', sn=''):
    if is_white(m) or re.search(r'ivory|white|cream|pearl', mn.lower()):
        return word_season(sn) or hue_season(s)
    if green(mn, m) and not re.search(r'olive|moss|sage|bamboo', mn.lower()) and (word_season(sn) == 'xuan'):
        return 'xuan'                          # spring green worn with a pink
    return word_season(mn) or hue_season(m)
from xuan_pink import lch2hex
from check_unique import pair_verdict, de2000

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
FC = os.path.join(ROOT, 'dev', 'art', 'face-common')
D = json.load(open(os.path.join(FC, 'palettes_season_deep.json')))
ids = [k for k in D if not k.startswith('_') and k != 'status']

HUENAME = [(0, 'rose'), (20, 'coral'), (40, 'apricot'), (65, 'honey'), (95, 'olive'), (120, 'leaf green'), (150, 'jade'),
           (180, 'teal'), (205, 'sky blue'), (240, 'blue'), (268, 'periwinkle'), (290, 'lavender'), (310, 'orchid'),
           (335, 'raspberry pink'), (352, 'rose')]
def cname(h):
    L, C, H = oklch(h); n = [x for a, x in HUENAME if H >= a][-1]
    return ('pale ' if L >= 0.84 else 'deep ' if L < 0.55 else 'soft ') + n

def is_grey(h, name):
    L, C, H = oklch(h)
    if any(w in name for w in ('grey', 'gray', 'silver', 'pewter')): return True
    if is_white(h): return C < 0.012 and 200 <= H <= 300      # silvery cold white reads grey; ivory / cream / pearl stay
    return C < 0.045

def ungrey(h, ref):
    L, C, H = oklch(h)
    Hn = H if C >= 0.015 else oklch(ref)[2]
    return lch2hex(L, 0.035 if L >= 0.86 else 0.06, Hn)

# season colour FAMILIES (the classification itself): name, OKLCH hue, chroma — each shown pale / medium / deep
# (depth is NOT the season; yellow / honey / mango 'deep' stays bright, a dark yellow reads brown). Yellows kept off the royal-yellow band H 80–100 (B21): mango H 72, lemon H 106.
FAMILIES = {
 'xuan': [('cherry-blossom pink', 2, .09), ('rose', 10, .11), ('coral pink', 18, .11), ('peony', 350, .12),
          ('raspberry', 355, .14), ('Tết red', 22, .16), ('spring green', 138, .11)],
 'ha':   [('peach', 45, .09), ('apricot', 55, .11), ('orange', 50, .15), ('mango', 72, .13), ('marigold', 65, .15),
          ('honey', 78, .12), ('saffron', 60, .15), ('lemon yellow', 106, .13)],
 'thu':  [('coral orange', 35, .15), ('coral red', 28, .16), ('pomegranate red', 20, .16), ('cranberry', 5, .15),
          ('berry', 350, .14),
          ('fresh olive green', 125, .12), ('leaf green', 135, .12)],
 'dong': [('ice blue', 230, .06), ('sapphire', 260, .12), ('indigo', 275, .11), ('violet', 300, .12), ('orchid', 320, .10),
          ('jade', 160, .09), ('teal', 195, .08), ('emerald', 165, .12)],
}

OLDW = r'brown|rust|brick|sienna|terracotta|caramel|chestnut|olive|aubergine|burgundy|wine|dusty|muddy|smoky|khaki|bamboo|moss|sage|beige|champagne|slate|amber|saffron'
def freshen(h, name):
    """owner Lượt 9xx 'bỏ những cái tông màu nâu, màu già': brown / dull / old-named colour -> young colour, SAME lightness"""
    L, C, H = oklch(h); n = name.lower()
    if is_white(h):
        if re.search(r'beige|champagne|gold', n):
            return lch2hex(L, 0.05, 50), 'pale peach', 'be/champagne (màu già) → hồng đào nhạt tươi'
        return None
    if 20 <= H <= 112 and L < 0.67 and C < 0.15:              # brown: dark warm hue
        if H > 95: return lch2hex(L, 0.13, 138), cname(lch2hex(L, 0.13, 138)) .replace('leaf green', 'leaf green'), 'nâu ô-liu (màu già) → xanh lá tươi'
        return lch2hex(L, 0.15, 30), ('deep ' if L < 0.55 else 'soft ') + 'coral red', 'nâu (màu già) → đỏ san hô tươi'
    if (H >= 340 or H < 20) and L < 0.56 and C < 0.12:        # brown-red: burgundy / wine / rose-brown
        return lch2hex(L, 0.14, 355), 'deep berry', 'đỏ nâu / rượu (màu già) → đỏ quả mọng'
    if 0.40 < L < 0.80 and C < 0.07:                          # dull / dusty / smoky
        h2 = lch2hex(L, 0.09, H); return h2, cname(h2), 'xỉn (màu già) → cùng màu, tươi hơn'
    if re.search(OLDW, n):                                    # old name, colour already fine: freshen a touch + young name
        h2 = lch2hex(L, min(C + 0.02, 0.17), H); return h2, cname(h2), 'tên/sắc già → tươi hơn một chút'
    return None

def main():
    R, log = {}, {}
    for k in ids:
        rs = D[k]['root_season']; p = D[k][rs]; code = p['root_code']
        q = dict(main=p['main'], main_hex=p['main_hex'], sec=p['sec'], sec_hex=p['sec_hex'])
        old = dict(q); why = []
        for role in ('main', 'sec'):
            if is_grey(q[role + '_hex'], q[role]):
                h2 = ungrey(q[role + '_hex'], code[role + '_hex'])
                q[role + '_hex'] = h2; q[role] = cname(h2)
                why.append(f"{'chính' if role == 'main' else 'phụ'} xám → {q[role]} cùng độ sáng (bỏ xám)")
        for role in ('main', 'sec'):
            f = freshen(q[role + '_hex'], q[role])
            if f:
                q[role + '_hex'], q[role] = f[0], f[1]
                why.append(f"{'chính' if role == 'main' else 'phụ'} {f[2]}")
        R[k] = q
        if why: log[k] = dict(old=old, why=why)
    # season by colour character (same pair, any depth)
    S = {k: classify(R[k]['main_hex'], R[k]['sec_hex'], R[k]['main'], R[k]['sec']) for k in ids}
    # twins: two roots in one season failing the gate -> move the one whose smallest hue shift clears ALL its clashes
    def clashes(k, q):
        return [o for o in ids if o != k and S[o] == S[k] and pair_verdict(q, R[o])[0] == 'FAIL']
    for rnd in range(10):
        moved = False
        for a, b in itertools.combinations(ids, 2):
            if S[a] != S[b] or pair_verdict(R[a], R[b])[0] != 'FAIL': continue
            best = None
            for k in (b, a) if k_pref(a, b) else (a, b):
                for role, dh in sorted(((r, d) for r in ('sec', 'main') for d in (12, -12, 20, -20, 28, -28, 36, -36, 44, -44, 52, -52, 64, -64, 80, -80)),
                                       key=lambda x: abs(x[1]) + (0 if x[0] == 'sec' else 5)):
                    L, C, H = oklch(R[k][role + '_hex']); h2 = lch2hex(L, max(C, 0.05), (H + dh) % 360)
                    q = dict(R[k]); q[role + '_hex'] = h2; q[role] = cname(h2)
                    if is_grey(h2, '') or classify(q['main_hex'], q['sec_hex'], q['main'], q['sec']) != S[k] or clashes(k, q): continue
                    best = (k, role, q, dh); break
                if best: break
            if best:
                k, role, q, dh = best; other = b if k == a else a
                log.setdefault(k, dict(old=dict(R[k]), why=[]))
                log[k]['why'].append(f"{'phụ' if role == 'sec' else 'chính'} gần trùng {other} → xoay sắc {dh:+d}°, giữ độ đậm")
                R[k] = q; moved = True
        if not moved: break
    # stylist hand picks (replace an auto move that changed her character)
    HAND = {'c31': (dict(main='soft pale jade', main_hex='#ABD4BB', sec='soft coral', sec_hex='#D67064'),
                    'phụ gần trùng m29 (cùng ngọc + hồng) → san hô tươi cùng độ đậm: ngọc nhạt + san hô (cặp xuân trẻ)'),
            'c32': (dict(main='soft ivory', main_hex='#EDDCC6', sec='indigo blue', sec_hex='#49659C'),
                    'phụ gần trùng c14 → chàm ngả xanh hơn 10°, giữ ngà + chàm (cặp kinh điển), giữ độ đậm'),
            's19': (dict(main='soft garnet red', main_hex='#AA3C4E', sec='pale jade', sec_hex='#B2D3C6'),
                    'phụ xám → ngọc nhạt cùng độ sáng: đỏ lựu + ngọc bích (cặp lụa cổ điển), khác s07 đỏ rượu + xanh lam')}
    for k, (q, why) in HAND.items():
        log.setdefault(k, dict(old=dict(R[k]), why=[]))
        src = D[k][D[k]['root_season']]; src = src.get('root_drawn', src)     # the DRAWN pair (s44 deep root already patched)
        log[k]['old'] = {x: src[x] for x in ('main', 'main_hex', 'sec', 'sec_hex')}
        log[k]['why'] = [why]; R[k] = q
    left = [(a, b) for a, b in itertools.combinations(ids, 2) if S[a] == S[b] and pair_verdict(R[a], R[b])[0] == 'FAIL']
    fam = {}
    for se, lst in FAMILIES.items():
        fam[se] = [dict(name=n, swatches=[lch2hex(L, min(C * f, 0.18), H) for L, f in
                   (((0.90, 0.7), (0.82, 1.0), (0.74, 1.15)) if 40 <= H <= 112 else ((0.85, 0.7), (0.72, 1.0), (0.58, 1.1)))])
                   for n, H, C in lst]
    out = {'_note': __doc__.strip(), 'families': fam, 'status': 'PROPOSAL — owner approves the classification before per-person seasons',
           'counts': {VN[s]: sum(1 for k in ids if S[k] == s) for s in SEASONS}, 'gate_fails_left': left}
    for s in SEASONS:
        out[s] = [dict(id=k, group=D[k]['group'], **R[k], old_root_season=D[k]['root_season'],
                       changed=log.get(k)) for k in ids if S[k] == s]
    json.dump(out, open(os.path.join(FC, 'season_colour_classes.json'), 'w'), ensure_ascii=False, indent=1)
    print(out['counts'], 'changed', len(log), 'left', left)
    return out

def k_pref(a, b):     # move the later id (s-ids drawn later; keep m/c drawn roots where possible)
    return True

if __name__ == '__main__':
    main()
