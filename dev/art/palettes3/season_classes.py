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
Classification: season = seasons.classify (colour character: family + temperature, NOT depth — Thu/Đông are not darker).
Output: dev/art/face-common/season_colour_classes.json + dev/handover/review-sheets/palettes-season/deep86/season-colour-classes.png"""
import json, os, sys, functools, itertools
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import colourlib
colourlib.oklab = functools.lru_cache(maxsize=None)(colourlib.oklab)
_ok = colourlib.oklch
colourlib.oklch = functools.lru_cache(maxsize=None)(lambda h: _ok(h))
from colourlib import *
from seasons import SEASONS, VN, classify, summer_warm
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
        R[k] = q
        if why: log[k] = dict(old=old, why=why)
    # season by colour character (same pair, any depth)
    S = {k: classify(R[k]['main_hex'], R[k]['sec_hex']) for k in ids}
    # twins: two roots in one season failing the gate -> move the one whose smallest hue shift clears ALL its clashes
    def clashes(k, q):
        return [o for o in ids if o != k and S[o] == S[k] and pair_verdict(q, R[o])[0] == 'FAIL']
    for rnd in range(4):
        moved = False
        for a, b in itertools.combinations(ids, 2):
            if S[a] != S[b] or pair_verdict(R[a], R[b])[0] != 'FAIL': continue
            best = None
            for k in (b, a) if k_pref(a, b) else (a, b):
                for role, dh in sorted(((r, d) for r in ('sec', 'main') for d in (12, -12, 20, -20, 28, -28, 36, -36, 44, -44, 52, -52)),
                                       key=lambda x: abs(x[1]) + (0 if x[0] == 'sec' else 5)):
                    L, C, H = oklch(R[k][role + '_hex']); h2 = lch2hex(L, max(C, 0.05), (H + dh) % 360)
                    q = dict(R[k]); q[role + '_hex'] = h2; q[role] = cname(h2)
                    if is_grey(h2, '') or classify(q['main_hex'], q['sec_hex']) != S[k] or clashes(k, q): continue
                    best = (k, role, q, dh); break
                if best: break
            if best:
                k, role, q, dh = best; other = b if k == a else a
                log.setdefault(k, dict(old=dict(R[k]), why=[]))
                log[k]['why'].append(f"{'phụ' if role == 'sec' else 'chính'} gần trùng {other} → xoay sắc {dh:+d}°, giữ độ đậm")
                R[k] = q; moved = True
        if not moved: break
    # stylist hand picks (replace an auto move that changed her character)
    HAND = {'c32': (dict(main='soft ivory', main_hex='#EDDCC6', sec='indigo blue', sec_hex='#49659C'),
                    'phụ gần trùng c14 → chàm ngả xanh hơn 10°, giữ ngà + chàm (cặp kinh điển), giữ độ đậm'),
            's19': (dict(main='soft garnet red', main_hex='#AA3C4E', sec='pale jade', sec_hex='#B2D3C6'),
                    'phụ xám → ngọc nhạt cùng độ sáng: đỏ lựu + ngọc bích (cặp lụa cổ điển), khác s07 đỏ rượu + xanh lam')}
    for k, (q, why) in HAND.items():
        log.setdefault(k, dict(old=dict(R[k]), why=[]))
        log[k]['old'] = {x: D[k][D[k]['root_season']][x] for x in ('main', 'main_hex', 'sec', 'sec_hex')}
        log[k]['why'] = [why]; R[k] = q
    left = [(a, b) for a, b in itertools.combinations(ids, 2) if S[a] == S[b] and pair_verdict(R[a], R[b])[0] == 'FAIL']
    out = {'_note': __doc__.strip(), 'status': 'PROPOSAL — owner approves the classification before per-person seasons',
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
