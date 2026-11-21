"""THUPAL1 — owner L1583 redo (rule B30): every season's MAIN colour must read as that season; SECONDARY free but must suit.
Costume-colour expert solver on top of palettes_season_deep.json (P6). Writes a SEPARATE file palettes_season_L1583.json
(palettes_season_deep.json is NOT touched until the owner approves the sheets).

Per person, per season:
  * keep the current pair when its main passes the season-feel test (season_feel_L1582.feel) and all gates;
<<<<<<< HEAD
  * ★GỐC root pairs (root:true) are never recoloured (L27) — EXCEPT (G50, owner L1645) a root whose main fails B30:
    it is released to the solver like any other pair (least change), marked g50_released, old pictures → kho skins;
=======
  * ★GỐC root pairs (root:true) are never recoloured (L27) — a root main that fails B30 is listed as a clash;
>>>>>>> 60c0578d (B ROOT-4 claim map-places mem fix)
  * else re-pick the MAIN from a colour grid inside her group tone band (A32 L range + season notch), filtered by
    bad_colour (no grey / brown / old mustard / royal yellow) and the season-feel test with a clear margin; cost prefers
    HER OWN colours (a colour she already wears in the wrong season moves to the season it reads as — e.g. a Hạ main that
    reads Thu becomes her Thu), then the nearest to her current main;
  * SECONDARY: keep the current one when it still suits (contrast, A31); else a light tint/neutral (pink allowed anywhere);
    Quyến rũ may take a warm light colour; contrast floor per group (deep groups need a big light-dark step);
  * A31 inside her 8 colours (ΔE2000 ≥ 20, light neutral vs light neutral ≥ 12, one family once) and check_unique across
    people (pair FAIL if both colours within ΔE 8) — gate 0 FAIL.
Run: python3 dev/art/palettes3/four_season_L1583.py
"""
import json, os, sys, functools, itertools, copy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from colourlib import oklch, family
import four_season86 as B
import check_unique as CU
import season_feel_L1582 as SF

HERE = os.path.dirname(os.path.abspath(__file__))
FC = os.path.join(HERE, '..', 'face-common')
SRC, DST = os.path.join(FC, 'palettes_season_deep.json'), os.path.join(FC, 'palettes_season_L1583.json')
SEAS = ('xuan', 'ha', 'thu', 'dong'); VN = SF.VN
de = functools.lru_cache(maxsize=None)(CU.de2000)
feel = functools.lru_cache(maxsize=None)(SF.feel)
bad = functools.lru_cache(maxsize=None)(B.bad_colour)
NOTCH = {'xuan': -0.04, 'ha': 0.0, 'thu': -0.04, 'dong': +0.04}
BAND = {  # main L lo/hi, C lo/hi (OKLCH), contrast floor main↔phụ
    'Dịu dàng': (.70, .84, .07, .12, 20), 'Đoan trang': (.60, .75, .07, .12, 22), 'Sắc sảo': (.42, .60, .09, .15, 30),
    'Kiêu kỳ': (.38, .56, .08, .14, 30), 'Lạnh lùng': (.66, .84, .06, .12, 20), 'Quyến rũ': (.50, .66, .09, .15, 22)}
NEUT = [('ngà', 85, .035), ('vàng nhạt', 96, .058), ('kem đào', 60, .05), ('hồng phấn nhạt', 0, .045),
        ('bạc hà nhạt', 165, .045), ('xanh sương', 240, .045), ('tím khói nhạt', 302, .055), ('trắng ngà', 88, .014),
        ('kem chanh', 112, .055), ('hồng tím phấn', 335, .05), ('xanh ngọc sương', 200, .045), ('hồng đất nhạt', 25, .04),
        ('kem mơ', 62, .045)]


@functools.lru_cache(maxsize=None)
def neu(h):
    L, c, _ = oklch(h); return L >= .85 and c <= .075


@functools.lru_cache(maxsize=None)
def clear_feel(h, s):
    """main reads as season s with a margin: nearest own-season prototype ≥ 2 ΔE closer than any other season's"""
    if feel(h)[0] != s: return False
    own = min(de(h, p[3]) for p in SF.PROTOS if p[0] == s)
    oth = min(de(h, p[3]) for p in SF.PROTOS if p[0] != s)
    return oth - own >= 2.0


def looks_right(x, s):
    """THUPAL2 colour-expert check on a NEW or kept non-root MAIN (owner L1583/B30: the main must READ as its season, never grey/dirty):
    no greyish main (C < .07); Hạ warm (hue 20-92) L >= .70 (darker reads tan / rust); Hạ lemon only bright (L >= .905, C >= .11, hue <= 114 — lower reads olive / khaki, higher reads lime);
    Thu warm (terracotta / persimmon / amber, hue 28-100) needs C >= .095, hue <= 54, L >= .68 (persimmon hue >= 42: L >= .72) — a muted or yellower warm reads brown/tan;
    Xuân green only fresh leaf (hue >= 132, L >= .40); Thu green only olive/moss with a yellow cast (hue 114-134, C >= .075, L >= .52) — a bluer or greyer sage reads spring / grey."""
    L, c, h = oklch(x)
    if c < .07: return False
    if s == 'xuan' and 95 <= h < 170 and (h < 132 or L < .40): return False   # spring green = fresh leaf; a yellow-cast green reads olive (autumn)
    if s == 'ha' and 20 <= h < 92 and L < .70: return False   # Hạ warm = sunlit: a darker orange reads tan / rust (Thu)
    if s == 'ha' and 92 <= h <= 125 and (L < .905 or c < .11 or h > 114): return False
    if s == 'thu':
        if 28 <= h < 100 and (c < .095 or h > 54 or L < (.72 if h >= 42 else .68)): return False   # persimmon below L .72 reads brown
        if 100 <= h < 170 and not (114 <= h <= 134 and c >= .075 and L >= .52): return False   # darker olive reads army drab
    return True


def thu_warm(x):
    """warm Thu that passes looks_right reads as Thu by the feel test even without the 2-ΔE margin (it sits next to Hạ peach)"""
    L, c, h = oklch(x)
    return feel(x)[0] == 'thu' and 28 <= h <= 54 and looks_right(x, 'thu')


LIM = [20, 12]


def a31_ok(cols):
    """only the LAST colour against the others (incremental); owner A31 = ΔE2000 ≥ 20, light neutral pair ≥ 12"""
    x = cols[-1][0]
    for y, _ in cols[:-1]:
        if de(x, y) < (LIM[1] if neu(x) and neu(y) else LIM[0]): return False
    return True


def a31_list(cols):
    out = []
    for (x, a), (y, b) in itertools.combinations(cols, 2):
        e = de(x, y)
        if e < (12 if neu(x) and neu(y) else 20): out.append(f'{a}~{b} ΔE{e:.0f}')
    return out


def pink_thu(x, s):
    """owner L1583: pink only as SECONDARY in Thu — a dusty rose / light salmon must not be a new Thu main"""
    if s != 'thu': return False
    L, c, h = oklch(x)
    return feel(x)[1] == 'hồng đất' or (h < 30 or h >= 330) and L > .56 or (30 <= h < 50 and L > .74)


@functools.lru_cache(maxsize=None)
def main_grid(group, s):
    lo, hi, clo, chi, _ = BAND[group]; n = NOTCH[s]
    if s == 'ha': hi = max(hi, .93)                # sun colours: lemon / mango only exist light (bad_colour), deep orange = brown
    if s == 'thu' and hi < .74: hi = .74
    out = []
    for h in range(0, 360, 4):
        for L in [round(lo + n + i * (hi - lo) / 7, 3) for i in range(8)]:
            for C in [round(clo + i * (chi - clo) / 3, 3) for i in range(4)]:
                x = B.lch2hex(L, C, h)
                if not bad(x) and (clear_feel(x, s) or s == 'thu' and thu_warm(x)) and not pink_thu(x, s) and looks_right(x, s): out.append(x)
    return tuple(dict.fromkeys(out))


SECS = tuple(dict.fromkeys(B.lch2hex(L, C, h) for L in (.86, .89, .92, .95, .97) for C in (.015, .03, .045, .06)
                           for h in range(0, 360, 15) if not (C < .03 and L < .94) and not (C < .045 and L < .89)))  # B19 no grey
WARM = tuple(B.lch2hex(L, C, h) for L in (.78, .82, .86) for C in (.08, .10) for h in (16, 26, 38, 50, 60))


def sec_ok(group, m, x):
    if de(m, x) < BAND[group][4]: return False
    Lm, cm, hm = oklch(m); Lx, cx, hx = oklch(x)
    if 30 <= hm <= 110 and 40 <= hx <= 100 and cx > .02 and de(m, x) < 30: return False   # beige-on-orange reads muddy
    return True


def vi_main(x):
    L = oklch(x)[0]; name = feel(x)[1]
    w = 'thẫm' if L < .45 else 'đậm' if L < .56 else 'đậm vừa' if L < .64 else 'dịu' if L < .74 else 'sáng'
    return f'{name} {w}'


def vi_sec(x):
    L, c, h = oklch(x)
    if not neu(x): return vi_main(x)
    if c < .022: return 'trắng ngà' if 40 <= h <= 130 else 'trắng sương' if 150 <= h <= 290 else 'trắng hồng'
    return min(NEUT, key=lambda n: min(abs(h - n[1]), 360 - abs(h - n[1])))[0]


# THUPAL2: s62 = the sample row the owner sees first — keep her Xuân/Hạ (they read right) and give Thu the olive of
# THUPAL1's option 1 (olive + pink phụ), not a terracotta that pushes her Xuân/Hạ around.
PIN = {'s62': {'xuan': lambda m: m == '#EB8186', 'ha': lambda m: m == '#F8B287',
               'thu': lambda m: 114 <= oklch(m)[2] <= 134}}


def main_cands(p, r, s):
    """[(cost, main)] diverse, for person p season s"""
    g = r['group']; cm = r[s]['main_hex']
    own = [r[t]['main_hex'] for t in SEAS if not r[t].get('root') and t != s]       # ★GỐC colours stay where they are
    mains = []
    if feel(cm)[0] == s and not bad(cm) and not pink_thu(cm, s) and looks_right(cm, s): mains.append((0.0, cm))       # least change: current main already reads right
    for o in own:
        if clear_feel(o, s) and not bad(o) and not pink_thu(o, s) and looks_right(o, s): mains.append((3.0, o))                   # her colour moved to the season it reads as
    for x in main_grid(g, s):
        mains.append((min(de(x, cm), min([de(x, o) + 4 for o in own] or [99])) + 2, x))
    if p in PIN and s in PIN[p]: mains = [(c, m) for c, m in mains if PIN[p][s](m)] or mains
    best = {}
    for c, m in mains: best[m] = min(c, best.get(m, 1e9))
    keep, per = [], {}
    for m, c in sorted(best.items(), key=lambda t: t[1]):
        f = family(m)
        if per.get(f, 0) < 10: keep.append((c, m)); per[f] = per.get(f, 0) + 1
        if len(keep) >= 60: break
    return keep


def sec_cands(r, s, m, taken):
    g = r['group']; cs = r[s]['sec_hex']
    Lc, Cc, _ = oklch(cs)
    out = [(0.0, cs)] if sec_ok(g, m, cs) and not (neu(cs) and Cc < .03 and Lc < .9) else []
    pool = SECS + (WARM if g == 'Quyến rũ' else ())
    out += sorted((.5 * de(x, cs) + 1, x) for x in pool if sec_ok(g, m, x))
    res = []
    for c, x in out:
        pal = dict(main=m, main_hex=m, sec=x, sec_hex=x)
        if any(CU.pair_verdict(pal, q)[0] == 'FAIL' for q in taken[s]): continue
        res.append((c, x))
        if len(res) >= 40: break
    return res


<<<<<<< HEAD
def solve(first=()):
    d = json.load(open(SRC))
    ppl = [k for k in d if not k.startswith('_') and k != 'status']
    # G50 (owner L1645): a ★GOC root whose MAIN misses its season (B30) is no longer fixed — release it to the solver
    # (least change from the drawn colours, same group band); the old drawn pictures go to the kho as skins (SKINS.md).
    released = []
    for p in ppl:
        for s in SEAS:
            o = d[p][s]
            if o.get('root') and feel(o['main_hex'])[0] != s:
                o['root'] = False; o['_g50'] = True; released.append((p, s))
=======
def solve():
    d = json.load(open(SRC))
    ppl = [k for k in d if not k.startswith('_') and k != 'status']
>>>>>>> 60c0578d (B ROOT-4 claim map-places mem fix)
    taken = {s: [] for s in SEAS}
    res, fails, clashes = {}, [], []
    # roots first into the uniqueness pool
    for p in ppl:
        for s in SEAS:
            if d[p][s].get('root'):
                taken[s].append(dict(main=d[p][s]['main_hex'], main_hex=d[p][s]['main_hex'], sec=d[p][s]['sec_hex'], sec_hex=d[p][s]['sec_hex']))
    # hardest people first: most seasons needing change
    HARD = ('s62', 'm08', 's09', 's52', 's22', 'm20', 's39', 'm28', 's10', 's58', 'c08', 'm02', 'm10', 'm14', 'c20', 'c26', 'm18', 'c22', 'm05')   # tightest ★GỐC rooms (run 3)
<<<<<<< HEAD
    REL_P = {q for q, _ in released}
    G50_FIRST = tuple(first) + ('c28', 's24', 's55', 's23', 's50', 's63', 's42', 's65')   # PAL3: people that found no room when solved late (runs 1-3) → solve first
    order = sorted(ppl, key=lambda p: (p not in HARD and p not in G50_FIRST, p not in G50_FIRST, p not in REL_P,
                                       -sum(bool(d[p][s].get('root')) for s in SEAS),
=======
    order = sorted(ppl, key=lambda p: (p not in HARD, -sum(bool(d[p][s].get('root')) for s in SEAS),
>>>>>>> 60c0578d (B ROOT-4 claim map-places mem fix)
                                       -sum(not clear_feel(d[p][s]['main_hex'], s) for s in SEAS)))
    for p in order:
        r = d[p]; free = [s for s in SEAS if not r[s].get('root')]
        fixed = [(r[s]['main_hex'], VN[s] + 'c') for s in SEAS if r[s].get('root')] + \
                [(r[s]['sec_hex'], VN[s] + 'p') for s in SEAS if r[s].get('root')]
        for s in SEAS:
            if r[s].get('root') and feel(r[s]['main_hex'])[0] != s:
                clashes.append(f'{p} {VN[s]} ★GỐC {r[s]["main_hex"]} reads {VN[feel(r[s]["main_hex"])[0]]} — kept (L27)')
        mc = {s: main_cands(p, r, s) for s in free}
        best = [None, 1e9]
        sc_cache = {}

        def sec_dfs(i, cols, cost, pick, mains):
            if cost >= best[1]: return
            if i == len(free): best[0], best[1] = dict(pick), cost; return
            s = free[i]; m = mains[s]
            if (s, m) not in sc_cache: sc_cache[(s, m)] = sec_cands(r, s, m, taken)
            for c, x in sc_cache[(s, m)]:
                nc = cols + [(x, VN[s] + 'p')]
                if not a31_ok(nc): continue
                pick[s] = (m, x); sec_dfs(i + 1, nc, cost + c, pick, mains); pick.pop(s)

        combos = []
        def main_dfs(i, cols, cost, pick):
            if i == len(free): combos.append((cost, dict(pick), list(cols))); return
            s = free[i]
            for c, m in mc[s]:
                nc = cols + [(m, VN[s] + 'c')]
                if a31_ok(nc): pick[s] = m; main_dfs(i + 1, nc, cost + c, pick); pick.pop(s)
<<<<<<< HEAD
        for lim, ncomb in (([20, 12], 1500), ([16, 10], 1500), ([12, 8], 1500), ([16, 10], 40000), ([12, 8], 40000)):   # PAL3: wide retry
=======
        for lim in ([20, 12], [16, 10], [12, 8]):
>>>>>>> 60c0578d (B ROOT-4 claim map-places mem fix)
            LIM[:] = lim; combos.clear(); sc_cache.clear()
            main_dfs(0, [], 0.0, {}) if False else None
            def main_dfs2(i, cols, cost, pick):
                if i == len(free): combos.append((cost, dict(pick), list(cols))); return
                s = free[i]
                for c, m in mc[s]:
                    nc = cols + [(m, VN[s] + 'c')]
                    if a31_ok(nc): pick[s] = m; main_dfs2(i + 1, nc, cost + c, pick); pick.pop(s)
            main_dfs2(0, list(fixed), 0.0, {})
            combos.sort(key=lambda t: t[0])
<<<<<<< HEAD
            for cost, mains, cols in combos[:ncomb]:
=======
            for cost, mains, cols in combos[:1500]:
>>>>>>> 60c0578d (B ROOT-4 claim map-places mem fix)
                if cost >= best[1]: break
                sec_dfs(0, cols, cost, {}, mains)
            if best[0] is not None:
                if lim != [20, 12]: fails.append(f'{p}: A31 only at ΔE ≥ {lim[0]} (neutral ≥ {lim[1]}) — ★GỐC roots leave no room')
                break
        LIM[:] = [20, 12]
        if best[0] is None:
            fails.append(f'{p}: no fit even at ΔE 12 — kept current, flagged')
            best[0] = {s: (r[s]['main_hex'], r[s]['sec_hex']) for s in free}
        res[p] = best[0]
        for s in free:
            taken[s].append(dict(main=best[0][s][0], main_hex=best[0][s][0], sec=best[0][s][1], sec_hex=best[0][s][1]))
    # build output
    out = {'_note': 'L1583 redo (rule B30) by THUPAL1 four_season_L1583.py on top of palettes_season_deep.json (P6). '
<<<<<<< HEAD
                    'MAIN reads as its season (season_feel_L1582 test); SECONDARY free but suits; ★GỐC fixed except the '
                    'off-season roots released by G50 (owner L1645, PAL3; see _g50_released); A31 + unique.',
           'status': 'PROPOSAL L1583 — owner verdict pending; palettes_season_deep.json unchanged',
           '_clashes': clashes, '_fails': fails,
           '_g50_released': [f'{p} {VN[s]}' for p, s in released]}
=======
                    'MAIN reads as its season (season_feel_L1582 test); SECONDARY free but suits; ★GỐC fixed; A31 + unique.',
           'status': 'PROPOSAL L1583 — owner verdict pending; palettes_season_deep.json unchanged',
           '_clashes': clashes, '_fails': fails}
>>>>>>> 60c0578d (B ROOT-4 claim map-places mem fix)
    diff = []
    for p in ppl:
        r = copy.deepcopy(d[p]); e = dict(group=r['group'], root_season=r.get('root_season'), band=r.get('band'))
        cols = []
        for s in SEAS:
            o = r[s]
            if o.get('root'): m, x = o['main_hex'], o['sec_hex']
            else: m, x = res[p][s]
            ch_m, ch_s = m != o['main_hex'], x != o['sec_hex']
<<<<<<< HEAD
            e[s] = dict(main_hex=m, sec_hex=x, root=bool(o.get('root') or o.get('_g50')),
=======
            e[s] = dict(main_hex=m, sec_hex=x, root=bool(o.get('root')),
>>>>>>> 60c0578d (B ROOT-4 claim map-places mem fix)
                        main_vi=(o.get('main_vi') if not ch_m and o.get('main_vi') else vi_main(m)),
                        sec_vi=(o.get('sec_vi') if not ch_s and o.get('sec_vi') else vi_sec(x)),
                        main_before=o['main_hex'] if ch_m else None, sec_before=o['sec_hex'] if ch_s else None,
                        reads=VN[feel(m)[0]])
            e[s]['main'] = e[s]['main_vi'] + ' ' + m; e[s]['sec'] = e[s]['sec_vi'] + ' ' + x   # check_unique keys
<<<<<<< HEAD
            if o.get('_g50'):
                e[s]['g50_released'] = dict(old_main=o['main_hex'], old_sec=o['sec_hex'], old_reads=VN[feel(o['main_hex'])[0]],
                                            note='G50 owner L1645: ★GỐC recoloured per B30; old pictures = kho skins (dev/art/SKINS.md)')
=======
>>>>>>> 60c0578d (B ROOT-4 claim map-places mem fix)
            cols += [(m, VN[s] + ' chính'), (x, VN[s] + ' phụ')]
            if ch_m or ch_s: diff.append(dict(id=p, season=s, main=[o['main_hex'], m], sec=[o['sec_hex'], x]))
        e['a31'] = a31_list(cols)
        out[p] = e
    json.dump(out, open(DST, 'w'), ensure_ascii=False, indent=1)
    gate = CU.run(out, quiet=True) if hasattr(CU, 'run') else None
    return out, diff, gate


if __name__ == '__main__':
<<<<<<< HEAD
    first = []
    for rnd in range(5):   # PAL3 (G50): anyone left with 'no fit' is solved first in the next round
        out, diff, gate = solve(first)
        nf = [f.split(':')[0] for f in out['_fails'] if 'no fit' in f]
        print('round', rnd, 'no fit:', nf)
        if not nf or set(nf) <= set(first): break
        first += [q for q in nf if q not in first]
=======
    out, diff, gate = solve()
>>>>>>> 60c0578d (B ROOT-4 claim map-places mem fix)
    ppl = [k for k in out if not k.startswith('_') and k != 'status']
    for s in SEAS:
        print(VN[s], 'mains reading as season:', sum(out[p][s]['reads'] == VN[s] for p in ppl), '/', len(ppl),
              '| changed:', sum(1 for x in diff if x['season'] == s and x['main'][0] != x['main'][1]))
    print('A31 issues:', sum(bool(out[p]['a31']) for p in ppl), [(p, out[p]['a31']) for p in ppl if out[p]['a31']][:12])
    print('clashes:', out['_clashes']); print('fails:', out['_fails']); print('gate:', gate if not isinstance(gate, tuple) else gate[:2])
    json.dump(diff, open(os.path.join(HERE, '..', '..', 'handover', 'review-sheets', 'thu_palette_L1582', 'diff_L1583.json'), 'w'),
              ensure_ascii=False, indent=1)
