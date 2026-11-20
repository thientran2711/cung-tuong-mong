"""P4 (Foreman C ROOT-64): every one of the 86 consorts gets FOUR pairs (main + sec): Xuân, Hạ, Thu, Đông.
Owner: "Ủa là sao, người nào cũng có 4 bảng màu 4 mùa mà" (each PERSON has all 4 seasons), on top of the earlier orders
("Xám là bỏ hết" · phân loại màu theo mùa · chuyên gia phối 2 màu cho đẹp · thu/đông KHÔNG có nghĩa là đậm hơn ·
Hạ cam/vàng nhiều vô · bỏ màu nâu, màu già · "Thôi đại đi, có người màu này màu kia" = depth not evened out).

Input : dev/art/face-common/season_colour_classes.json (families per season + each person's ROOT pair in its season column)
        dev/art/face-common/palettes_season_deep.json (only s44's drawn root block is kept, F3 draw #A6593F + #94B594)
Output: dev/art/face-common/palettes_season_deep.json (overwritten; s44 root block kept)

Method
  root   : her root pair (classes file, CŨ→MỚI already marked there) stays in its season. s44: F3's drawn pair kept (flag nâu).
  depth  : her depth per role = OKLCH L of her root main / root sec -> family depth index t (pale .85 = 0, medium .72 = 1,
           deep .58 = 2; extrapolated to t 2.6 ≈ L .50 for very deep people, chroma kept, so deep = jewel, never brown).
           The SAME t is used in all 4 seasons. Hạ families go at most to t 2.5 (L ≈ .68) and only as vivid (C ≥ .165) pumpkin/tangerine:
           a darker yellow/orange is brown (owner: no brown).
  pairing: main + sec both from THAT season's families (Hạ = orange/yellow only). Stylist score: complementary / far hue
           best (pink + spring green, coral + leaf green, blue/violet + jade/teal, orange + lemon), analogous only with a clear
           depth step; same family never. Identity: main family nearest her root main hue, sec nearest her root sec hue.
  rules  : no grey (C >= .06), no brown / old, no royal yellow (ΔE2000 >= 12 from #EFBD69 and no H 80–100 yellow),
           no dark yellow (H 65–122 below L .76 = mustard / olive),
           unique per season (check_unique gate: ΔE2000 max(main, sec) >= 8, same-name pair = FAIL; WARN avoided).
"""
import json, math, os, sys, itertools, random
sys.path.insert(0, os.path.dirname(__file__))
from colourlib import oklch, hue_dist
from check_unique import de2000, pair_verdict, run as gate_run

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
FC = os.path.join(ROOT, 'dev', 'art', 'face-common')
SE = ('xuan', 'ha', 'thu', 'dong')
VN = {'xuan': 'Xuân', 'ha': 'Hạ', 'thu': 'Thu', 'dong': 'Đông'}
ROYAL = '#EFBD69'
RENAME = {'saffron': 'tangerine'}          # 'saffron' is on the old-word list (season_classes OLDW)

C = json.load(open(os.path.join(FC, 'season_colour_classes.json')))
OLD = json.load(open(os.path.join(FC, 'palettes_season_deep.json')))


# ---------- OKLCH -> hex ----------
def _oklab_to_srgb(L, a, b):
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    return r, g, bb

def _gam(c): return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055

def lch2hex(L, Cc, H):
    for _ in range(60):                       # gamut clip: lower chroma until in sRGB
        a, b = Cc * math.cos(math.radians(H)), Cc * math.sin(math.radians(H))
        rgb = _oklab_to_srgb(L, a, b)
        if all(-0.0005 <= x <= 1.0005 for x in rgb): break
        Cc *= 0.97
    return '#' + ''.join(f'{round(max(0, min(1, _gam(max(0, x)))) * 255):02X}' for x in rgb)


# ---------- families ----------
FAM = {}
for s in SE:
    FAM[s] = []
    for f in C['families'][s]:
        FAM[s].append({'name': RENAME.get(f['name'], f['name']), 'sw': [oklch(h) for h in f['swatches']]})
BORROW = [f for ss in ('thu', 'xuan') for f in FAM[ss] if f['name'] in ('coral orange', 'coral red', 'leaf green', 'spring green')]

# THU v2 (owner on four-seasons sheets: "Cái bảng màu của mùa thu nó chưa có ra mùa thu nha"): real autumn-leaf families,
# richer + warmer than Hạ (Hạ = bright light cam/vàng), still no brown / grey / old colour. OKLCH (L, C, H) pale·medium·deep.
THU_V2 = [
    ('maple red',        [(0.80, 0.11, 27), (0.66, 0.18, 28), (0.54, 0.19, 27)]),
    ('persimmon',        [(0.82, 0.10, 42), (0.70, 0.17, 42), (0.60, 0.18, 40)]),
    ('pumpkin',          [(0.83, 0.11, 50), (0.74, 0.16, 52), (0.66, 0.17, 50)]),
    ('amber',            [(0.84, 0.13, 60), (0.77, 0.17, 60), (0.72, 0.18, 60)]),
    ('ginkgo yellow',    [(0.91, 0.11, 104), (0.885, 0.14, 104), (0.87, 0.15, 104)]),
    ('wine berry',       [(0.78, 0.10, 0), (0.60, 0.17, 2), (0.48, 0.17, 4)]),
    ('plum',             [(0.78, 0.09, 335), (0.60, 0.15, 335), (0.47, 0.15, 333)]),
    ('moss green',       [(0.84, 0.10, 132), (0.70, 0.14, 132), (0.56, 0.14, 134)]),
    ('fresh olive green',[(0.86, 0.10, 124), (0.74, 0.14, 125), (0.62, 0.15, 126)]),
]
FAM['thu'] = [{'name': n, 'sw': sw} for n, sw in THU_V2]

TMAX = {'xuan': 2.6, 'thu': 2.6, 'dong': 2.6, 'ha': 2.5}

def t_of(L):
    if L >= 0.85: return 0.0
    if L >= 0.72: return (0.85 - L) / 0.13
    return 1 + (0.72 - L) / 0.14

def fam_colour(s, f, t, dh=0.0):
    t = max(0.0, min(TMAX[s], t))
    if f['name'] in ('persimmon', 'pumpkin', 'amber'): t = min(t, 2.0)   # darker autumn orange = rust / brown
    sw = f['sw']
    if t <= 2:
        i = min(1, int(t)); u = t - i
        (L1, C1, H1), (L2, C2, H2) = sw[i], sw[i + 1]
        dhh = ((H2 - H1 + 180) % 360) - 180
        L, Cc, H = L1 + (L2 - L1) * u, C1 + (C2 - C1) * u, H1 + dhh * u
    else:                                     # deeper than the deep swatch: same chroma, lower L
        L, Cc, H = sw[2][0] - (0.14 if s != 'ha' else 0.12) * (t - 2), sw[2][1], sw[2][2]
        if s == 'ha': Cc = max(Cc, 0.165)       # deeper Hạ only as vivid pumpkin/tangerine, never brown
    Cc = max(Cc, 0.06 if t < 0.3 else 0.08)   # never grey (ice blue)
    return lch2hex(L, Cc, (H + dh) % 360)

def depth_word(t):
    return 'pale' if t < 0.35 else 'light' if t < 0.8 else '' if t < 1.3 else 'rich' if t < 1.75 else 'deep'

def nm(t, f): w = depth_word(t); return (w + ' ' + f['name']).strip()

def bad_colour(h):
    L, Cc, H = oklch(h)
    if Cc < 0.055: return 'grey'
    if 20 <= H <= 112 and L < 0.67 and Cc < 0.15: return 'brown'
    if (H >= 340 or H < 20) and L < 0.56 and Cc < 0.12: return 'wine'
    if de2000(h, ROYAL) < 12: return 'royal yellow'
    if 80 <= H <= 100 and Cc > 0.06: return 'royal band'
    if 65 <= H <= 122 and L < 0.76: return 'mustard / olive (dark yellow reads old)'
    if 95 <= H <= 122 and L < 0.86: return 'lemon below L .86 reads olive / chartreuse'
    return None


# ---------- people ----------
people = {}
for s in SE:
    for e in C[s]:
        people[e['id']] = {'id': e['id'], 'group': e['group'], 'root_season': s,
                           'root': {k: e[k] for k in ('main', 'main_hex', 'sec', 'sec_hex')},
                           'changed': e.get('changed')}
# s44: F3's draw stays (foreman: keep the drawn root; classes proposal kept as a note)
p44 = people['s44']; o44 = OLD['s44']['thu']
p44['proposal'] = dict(p44['root']); p44['proposal_changed'] = p44['changed']
p44['root'] = {k: o44[k] for k in ('main', 'main_hex', 'sec', 'sec_hex')}
p44['changed'] = None; p44['old_block'] = o44
p44['flag'] = 'nâu: main #A6593F (burnt sienna) is brown by the owner rule; stylist proposal deep coral red #B94738 + soft leaf green #87BA87 — foreman decides'
IDS = sorted(people)


def pair_score(s, fm, fs, tm, ts):
    """stylist score, lower = better, None = not allowed"""
    if fm is fs: return None
    hm, hs = fm['sw'][1][2], fs['sw'][1][2]
    hd = min(abs(hm - hs) % 360, 360 - abs(hm - hs) % 360)
    dd = abs(tm - ts)
    if hd >= 90: sc = 0.0
    elif hd >= 45: sc = 0.4
    elif hd >= 25: sc = 0.9
    elif hd >= 10: sc = 1.4 if dd >= 0.6 else 2.4
    else: sc = 1.8 if dd >= 0.9 else None
    if sc is None: return None
    if s == 'ha' and hd < 25 and dd < 0.6: return None        # orange + orange at one depth: no contrast
    gm = 'green' in fm['name']; gs = 'green' in fs['name']
    if gm and gs: return None
    return sc


def ident(h, f):
    return hue_dist(h, lch2hex(*f['sw'][1])) / 180.0


def solve(seed=0, verbose=False):
    rnd = random.Random(seed)
    out = {k: {} for k in IDS}
    for s in SE:
        placed = []                                   # (id, pal)
        for k in IDS:
            if people[k]['root_season'] == s:
                pal = dict(people[k]['root']); pal['root'] = True
                out[k][s] = pal; placed.append((k, pal))
        use = {f['name']: 0 for f in FAM[s]}
        todo = [k for k in IDS if people[k]['root_season'] != s]
        rnd.shuffle(todo)
        for k in todo:
            P = people[k]; r = P['root']
            tm, ts = t_of(oklch(r['main_hex'])[0]), t_of(oklch(r['sec_hex'])[0])
            cands = []
            for fm, fs in itertools.permutations(FAM[s], 2):
                sc = pair_score(s, fm, fs, tm, ts)
                if sc is None: continue
                base = sc + 0.8 * ident(r['main_hex'], fm) + 0.5 * ident(r['sec_hex'], fs)
                for dh in ((0, -7, 7, -14, 14, -21, 21) if s == 'ha' else (0, -7, 7, -14, 14)):
                    for dl in (0, -0.15, 0.15, -0.3, 0.3):
                        cands.append((base + 0.05 * abs(dh) / 7 + 0.3 * abs(dl) / 0.15
                                      + (0.25 if s == 'ha' else 0.12) * use[fm['name']] + 0.05 * use[fs['name']] + rnd.random() * 0.05,
                                      fm, fs, dh, dl))
            cands.sort(key=lambda x: x[0])
            def try_family(strict, free, mfree):
                tsl = [ts] if not free else sorted((0.0, 0.7, 1.4, 2.0, 2.5), key=lambda x: abs(x - ts))[1:]
                tml = [tm] if not mfree else sorted((0.0, 0.5, 1.0, 1.5, 2.0, 2.5), key=lambda x: abs(x - tm))[1:]
                for ts2, tm2 in itertools.product(tsl, tml):
                    for sc, fm, fs, dh, dl in cands:
                        if free and pair_score(s, fm, fs, tm2, ts2) is None: continue
                        mh, sh = fam_colour(s, fm, tm2 + dl, dh), fam_colour(s, fs, ts2 + dl, -dh)
                        if bad_colour(mh) or bad_colour(sh): continue
                        if s == 'ha' and max(oklch(mh)[2], oklch(sh)[2]) > 110: continue   # lemon jitter must not turn lime
                        if de2000(mh, sh) < 15: continue
                        pal = {'main': nm(tm2, fm), 'main_hex': mh, 'sec': nm(ts2, fs), 'sec_hex': sh}
                        if mfree: pal['main_depth_moved'] = f't {tm:.1f} -> {tm2:.1f}'
                        if free: pal['sec_depth_moved'] = f't {ts:.1f} -> {ts2:.1f} (no free {VN[s]} pair at her own secondary depth)'
                        if s == 'thu' and 'ha' in out[k] and max(de2000(mh, out[k]['ha']['main_hex']), de2000(sh, out[k]['ha']['sec_hex'])) < 14: continue   # her Thu must not look like her Hạ
                        vs = [pair_verdict(pal, q)[0] for _, q in placed]
                        if 'FAIL' not in vs and not (strict and 'WARN' in vs): return (pal, fm, fs)
                return None

            def try_borrow(any_depth):     # Hạ: orange/yellow MAIN + a borrowed fresh coral / green accent
                borrow = BORROW
                bc = []
                tms = sorted((tm, 0.0, 0.5, 1.0, 1.5, 2.0, 2.5), key=lambda x: abs(x - tm)) if any_depth else [tm]
                for fm in FAM['ha']:
                    for fs in borrow:
                        for dh in (0, -7, 7, -14, 14):
                            for dl in (0, -0.15, 0.15):
                                for tm2 in tms:
                                    bc.append((abs(tm2 - tm) + 0.3 * abs(dl) / 0.15 + 0.05 * abs(dh) / 7 + 0.25 * use[fm['name']]
                                               + 0.15 * use.get(fs['name'], 0) + 0.8 * ident(r['main_hex'], fm), fm, fs, dh, tm2, dl))
                bc.sort(key=lambda x: x[0])
                for sc, fm, fs, dh, tm2, dl in bc:
                    mh, sh = fam_colour('ha', fm, tm2 + dl, dh), fam_colour('thu', fs, ts + dl, -dh)
                    if bad_colour(mh) or bad_colour(sh) or oklch(mh)[2] > 110 or de2000(mh, sh) < 15: continue
                    pal = {'main': nm(tm2, fm), 'main_hex': mh, 'sec': nm(ts, fs), 'sec_hex': sh,
                           'sec_borrowed': f"Hạ full: secondary borrowed from {fs['name']} (fresh accent, main stays orange/yellow)"}
                    if abs(tm2 - tm) > 1e-9: pal['main_depth_moved'] = f't {tm:.1f} -> {tm2:.1f}'
                    if all(pair_verdict(pal, q)[0] != 'FAIL' for _, q in placed): return (pal, fm, fs)
                return None

            stages = [lambda: try_family(True, False, False), lambda: try_family(False, False, False)]
            if s == 'ha': stages.append(lambda: try_borrow(False))
            stages += [lambda: try_family(False, True, False), lambda: try_family(False, True, True)]
            if s == 'ha': stages.append(lambda: try_borrow(True))
            got = None
            for st in stages:
                got = st()
                if got: break
            if not got:
                if verbose: print('NO PAIR', s, k)
                return None
            pal, fm, fs = got
            use[fm['name']] = use.get(fm['name'], 0) + 1; use[fs['name']] = use.get(fs['name'], 0) + 1
            out[k][s] = pal; placed.append((k, pal))
    return out


def stylist_note(s, pal):
    return ''


def main():
    out = None
    for seed in range(int(os.environ.get('SEEDS', 3))):
        out = solve(seed)
        if out: break
    if not out: solve(0, verbose=True); sys.exit('no solution')
    only = os.environ.get('ONLY')
    if only:
        for k in IDS:
            for ss in SE:
                if ss != only: out[k][ss] = OLD[k][ss]
    D = {'_note': __doc__ + f'\nseed {seed}' + ('\nTHU v2 autumn families (owner: "Cái bảng màu của mùa thu nó chưa có ra mùa thu nha"): ' + ', '.join(n for n, _ in THU_V2) + '. Xuân/Hạ/Đông unchanged from commit 44715a2a6.' if only else ''),
         '_thu_families_v2': {n: [lch2hex(*x) for x in sw] for n, sw in THU_V2}, 'status': 'PROPOSAL (P4) — 4 pairs per person, owner verdict pending',
         '_flags': {'s44_brown_root': people['s44']['flag'],
                    'root_changed_CU_MOI': [k for k in IDS if people[k]['changed']]}}
    for k in IDS:
        P = people[k]
        e = {'root_season': P['root_season'], 'group': P['group']}
        for s in SE:
            pal = out[k][s]
            if pal.get('root'):
                if P['changed']: pal['changed'] = P['changed']
                if k == 's44':
                    ob = P['old_block']
                    for kk in ('root_code', 'root_drawn', 'note'):
                        if kk in ob: pal[kk] = ob[kk]
                    pal['flag'] = P['flag']; pal['proposal'] = P['proposal']
            e[s] = pal
        D[k] = e
    json.dump(D, open(os.path.join(FC, 'palettes_season_deep.json'), 'w'), ensure_ascii=False, indent=1)
    fails, warns = gate_run(D, quiet=True)
    bad = [(k, s, r, h) for k in IDS for s in SE for r in ('main_hex', 'sec_hex')
           for h in [D[k][s][r]] if not D[k][s].get('root') and bad_colour(h)]
    print('bad colours in new pairs:', bad)
    from collections import Counter
    for s in SE:
        print(VN[s], Counter(D[k][s]['main'].split()[-1] if not D[k][s].get('root') else 'ROOT' for k in IDS).most_common())


if __name__ == '__main__':
    main()
