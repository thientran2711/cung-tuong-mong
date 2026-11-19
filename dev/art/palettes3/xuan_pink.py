"""Owner Lượt 741: Xuân sheet was mostly orange -> make the Xuân MAIN colours mostly pink (>= 60 %).
Re-picks main (and, only where needed, secondary) of the non-root Xuân palettes in palettes_season.json.
Kept as they were: ★ root pairs, and a few greens / peach-apricots for variety (KEEP). Hạ / Thu / Đông untouched.
Same rules as check_seasons.py. Run once, then check_seasons.py, then make_season_sheets_by_season.py."""
import json, os, sys, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from colourlib import *
from seasons import SEASONS, target_ok
from gen_palettes3 import load_p1, contrast_ok, lookalike, COOL_ONLY
from gen_seasons import POOL, COOL_X, season_contrast

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
F = os.path.join(ROOT, 'dev/art/face-common/palettes_season.json')

def lch2hex(L, C, H):
    a, b = C * math.cos(math.radians(H)), C * math.sin(math.radians(H))
    l_, m_, s_ = L + 0.3963377774*a + 0.2158037573*b, L - 0.1055613458*a - 0.0638541728*b, L - 0.0894841775*a - 1.2914855480*b
    l, m, s = l_**3, m_**3, s_**3
    rgb = (4.0767416621*l - 3.3077115913*m + 0.2309699292*s, -1.2684380046*l + 2.6097574011*m - 0.3413193965*s,
           -0.0041960863*l - 0.7034186147*m + 1.7076147010*s)
    enc = lambda c: 12.92*c if c <= 0.0031308 else 1.055*c**(1/2.4) - 0.055
    return '#%02X%02X%02X' % tuple(round(enc(max(0.0, min(1.0, x))) * 255) for x in rgb)

# spring pinks, soft clear medium tone (OKLCH L 0.70-0.85, C 0.066-0.092, hue 354-26°)
PINKS = [(n, lch2hex(L, C, H)) for n, L, C, H in (
    ("cherry-blossom pink", 0.83, 0.068, 6), ("rose pink", 0.74, 0.088, 8), ("blush pink", 0.80, 0.072, 16),
    ("lotus pink", 0.76, 0.084, 0), ("soft coral-pink", 0.77, 0.084, 24), ("mauve pink", 0.72, 0.080, 354),
    ("camellia pink", 0.73, 0.090, 12), ("peach-blossom pink", 0.81, 0.070, 26), ("carnation pink", 0.78, 0.084, 358),
    ("apple-blossom pink", 0.85, 0.066, 12), ("azalea pink", 0.70, 0.092, 4), ("silk rose pink", 0.79, 0.078, 20))]
PINKS += [("peony pink", "#E29DA2"), ("warm rose", "#D88C8C")]
KEEP = {'m01', 'm06', 'm18', 'm24', 'm32', 'm51', 'c12',          # greens (with a pink secondary)
        'm07', 'm14', 'm19', 'm31', 'm39', 'c05', 'c26'}          # peach / apricot / persimmon

def tone_ok(h):
    L, C, H = oklch(h)
    return not greyish(h) and C <= 0.127 and 0.45 <= L <= 0.93 and not ((80 <= H < 100 and C > 0.06) or dE(h, '#EFBD69') < 0.045)

def main():
    d = json.load(open(F)); roots = load_p1()
    ids = [k for k in d if not k.startswith('_') and k not in ('status', 'root_season_counts')]
    secs = [(n, h) for n, h, r in POOL if n not in COOL_ONLY and n not in COOL_X and tone_ok(h)]
    todo = [k for k in ids if not d[k]['xuan'].get('root') and k not in KEEP]
    fixed = set(ids) - set(todo)
    pairs = {}
    for i, k in enumerate(ids):
        for se in SEASONS:
            if se == 'xuan' and k in todo: continue
            pairs.setdefault((d[k][se]['main'], d[k][se]['sec']), []).append(i)
    use = {}
    for k in ids:
        if k in fixed: use[d[k]['xuan']['main']] = use.get(d[k]['xuan']['main'], 0) + 1
    for k in todo:
        i = ids.index(k); root = roots[k]; old = d[k]['xuan']; rdE = dE(root['main_hex'], root['sec_hex'])
        near = [(d[ids[j]]['xuan'], abs(j - i)) for j in range(i - 2, i + 3) if 0 <= j < len(ids) and j != i and ids[j] in fixed]
        own = [d[k][se] for se in SEASONS if se != 'xuan']
        best = None
        for m in PINKS:
            if any(g == 1 and q['main'] == m[0] for q, g in near): continue
            for s in [(old['sec'], old['sec_hex'])] + secs:
                if s[0] == m[0]: continue
                mh, sh = m[1], s[1]
                pu = pairs.get((m[0], s[0]), [])
                if len(pu) >= 2 or any(abs(p - i) < 10 for p in pu): continue
                if not (target_ok('xuan', mh, sh) and contrast_ok(mh, sh, rdE) and season_contrast(mh, sh) and tone_ok(mh) and tone_ok(sh)): continue
                if any(lookalike((mh, sh), (q['main_hex'], q['sec_hex']), g) for q, g in near): continue
                if any(lookalike((mh, sh), (q['main_hex'], q['sec_hex']), 1) for q in own): continue
                c = (0 if s[0] == old['sec'] else 1.0) + 0.6 * use.get(m[0], 0) + 0.2 * use.get('s:' + s[0], 0)
                if best is None or c < best[0]: best = (c, m, s)
        if best is None: print('NO CANDIDATE', k); continue
        _, m, s = best
        d[k]['xuan'] = dict(main=m[0], main_hex=m[1], sec=s[0], sec_hex=s[1])
        use[m[0]] = use.get(m[0], 0) + 1; use['s:' + s[0]] = use.get('s:' + s[0], 0) + 1
        pairs.setdefault((m[0], s[0]), []).append(i); fixed.add(k)
        print(k, f"{old['main']} + {old['sec']}  ->  {m[0]} {m[1]} + {s[0]} {s[1]}")
    d['_note_xuan'] = ('Owner Lượt 741: Xuân main colours re-picked to mostly pink by dev/art/palettes3/xuan_pink.py '
                       '(★ roots and a few greens / peach kept).')
    json.dump(d, open(F, 'w'), ensure_ascii=False, indent=1)

if __name__ == '__main__':
    main()
