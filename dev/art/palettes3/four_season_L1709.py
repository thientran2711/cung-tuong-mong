#!/usr/bin/env python3
"""PAL4 — owner L1704/L1705/L1707/L1708 (Foreman C ROOT#19). 0 credits.
L1708 (verbatim key parts): "Cái trang 1 là cảm giác dịu mà tôi rất là ưng ... trang 2 là nó đậm hơn một xíu thôi ... trang 3 cũng cỡ
trang 2 ... chẳng qua là cái màu của nó đang bị giống nhau nhiều quá thôi ... tôi không có cái complain gì hết về cái tông độ màu sắc".
=> START from palettes_season_L1583.json and keep its TONE: every non-root main keeps its own OKLCH lightness L and chroma C
   (moved only as far as needed to pass bad_colour / HSV S cap); ONLY the hue FAMILY changes, per the L1705 distribution:
   Hạ = mostly soft YELLOW + ORANGE (royal yellow #EFBD69 banned), blue-ish only a few; blue + purple mainly Đông;
   Thu = orange + olive + muted tones; families spread evenly over the people of each season (sheet order rotates families).
Kept unchanged: every ★GỐC root (drawn), s62 all four seasons (sample row; Thu olive #9FB577 drawn). L1679 values are NOT used.
Phụ: the L1583 phụ is kept when it still suits the new main (four_season_L1583.sec_ok), else the nearest suitable light phụ.
Output NEW dev/art/face-common/palettes_season_L1709.json (L1583 / L1679 untouched).
Run from anywhere: python3 dev/art/palettes3/four_season_L1709.py"""
import json, os, sys, math, colorsys, functools, collections
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from colourlib import oklch
import four_season86 as B
import check_unique as CU
import four_season_L1583 as F

FC = os.path.join(HERE, '..', 'face-common')
SRC, DST = os.path.join(FC, 'palettes_season_L1583.json'), os.path.join(FC, 'palettes_season_L1709.json')
SEAS = ('xuan', 'ha', 'thu', 'dong')
GORDER = ['Dịu dàng', 'Đoan trang', 'Quyến rũ', 'Sắc sảo', 'Kiêu kỳ', 'Lạnh lùng']
ROYAL = '#EFBD69'
KIND = {'đỏ lá phong': 'đỏ', 'đỏ rượu trầm': 'đỏ'}   # two Thu reds read as ONE colour to the eye (owner L1679 Kiêu kỳ)
HARD = {'xanh ngọc biển': 6}   # owner L1705: blue-ish in Hạ only a few people
MAX_COST = .36       # tone move allowed: ~3*ΔL + 4*ΔC + 2.5*ΔS (ΔL .12 alone)
S_CAP = .72           # HSV saturation cap for a CHANGED main (L1583 p90 .66; owner L1704: never rực)
de = functools.lru_cache(maxsize=None)(CU.de2000)
bad = functools.lru_cache(maxsize=None)(B.bad_colour)
KEEP_ALL = {'s62'}    # sample row + drawn Thu olive (THUPAL2 PIN): never touched

# family: (name, hue lo, hue hi (OKLCH deg, may wrap), L lo, L hi, C lo, C hi, target count of 90)
FAM = {
    'xuan': [('hồng hoa đào', 0, 14, .55, .90, .07, .14, 16), ('hồng mẫu đơn', 338, 356, .42, .86, .08, .15, 14),
             ('đỏ son Tết', 18, 30, .46, .72, .11, .16, 16), ('xanh lá non', 132, 150, .42, .88, .08, .15, 18),
             ('xanh ngọc non', 158, 178, .48, .88, .07, .13, 15), ('cam đào xuân', 40, 54, .70, .88, .08, .13, 11)],
    'ha':   [('vàng bơ', 92, 108, .90, .96, .07, .13, 27), ('cam đào', 52, 68, .72, .90, .08, .14, 24),
             ('cam san hô', 26, 40, .62, .86, .09, .15, 15), ('xanh lá sen', 134, 152, .60, .88, .07, .12, 10),
             ('hồng sen', 352, 8, .62, .88, .07, .13, 10), ('xanh ngọc biển', 186, 200, .66, .84, .06, .085, 5)],
    'thu':  [('ô liu', 116, 134, .52, .82, .075, .12, 24), ('cam quả hồng', 40, 56, .72, .86, .095, .13, 24),
             ('đỏ lá phong', 12, 22, .32, .64, .12, .16, 15), ('đất nung', 30, 41, .68, .80, .095, .13, 11),
             ('xanh cổ vịt trầm', 198, 214, .30, .72, .07, .10, 12), ('đỏ rượu trầm', 350, 6, .32, .62, .12, .15, 7)],
    'dong': [('chàm', 256, 276, .36, .76, .08, .14, 18), ('tím mận', 302, 326, .38, .74, .08, .14, 16),
             ('tím hoa cà', 288, 300, .62, .86, .07, .11, 10), ('xanh băng', 222, 246, .66, .92, .07, .10, 18),
             ('xanh tùng', 158, 182, .36, .74, .07, .11, 14), ('đỏ mai đông', 4, 18, .38, .56, .12, .16, 14)],
}


def hue_in(h, lo, hi):
    return lo <= h <= hi if lo <= hi else (h >= lo or h <= hi)


def hue_mid(lo, hi, t):
    span = (hi - lo) % 360
    return (lo + span * t) % 360


def hue_gap(h, lo, hi):
    if hue_in(h, lo, hi): return 0
    return min(min(abs(h - x), 360 - abs(h - x)) for x in (lo, hi))


def fam_of(x, s):
    """root / kept main -> family name (nearest hue range)"""
    L, c, h = oklch(x)
    return min(FAM[s], key=lambda f: hue_gap(h, f[1], f[2]))[0]


def hsv_s(x):
    r, g, b = (int(x[i:i + 2], 16) / 255 for i in (1, 3, 5)); return colorsys.rgb_to_hsv(r, g, b)[1]


@functools.lru_cache(maxsize=None)
def ok(x, s):
    L, c, h = oklch(x)
    if hsv_s(x) > S_CAP or de(x, ROYAL) < 14 or c < .055: return False
    if s == 'ha' and 88 <= h <= 125:   # owner L1705 verbatim: "Tôi chỉ cấm màu vàng hoàng gia thôi chứ tôi đâu có cấm những cái màu vàng nhạt hơn"
        # -> a PALE butter/lemon yellow (L >= .90, ΔE >= 14 from royal #EFBD69) is allowed even inside bad_colour's 'royal band'
        return bad(x) in (None, 'royal band') and L >= .90 and h <= 114 and c >= .07 and (c >= .10 or L >= .93)
    if bad(x): return False
    return F.looks_right(x, s)


@functools.lru_cache(maxsize=None)
def fit(L0, C0, fam, t, S0=None, s=None, mc=None):
    """nearest passing colour of family fam to the person's own tone (L0, C0); t in 0..1 picks the hue inside the range"""
    n, lo, hi, Ll, Lh, Cl, Ch, _ = fam
    H = hue_mid(lo, hi, t)
    best = None
    for dL in [i * .01 for i in range(-25, 26)]:
        for dC in [i * .005 for i in range(-16, 13)]:
            L, C = L0 + dL, C0 + dC
            if not (Ll <= L <= Lh and Cl <= C <= Ch): continue
            x = B.lch2hex(L, C, H)
            if not ok(x, s): continue
            cost = abs(dL) * 3 + abs(dC) * 4 + (max(0, hsv_s(x) - S0) * 2.5 + max(0, S0 - hsv_s(x)) * .2 if S0 is not None else 0)
            if best is None or cost < best[0]: best = (cost, x)
    return best if best and best[0] <= (mc or MAX_COST) else None   # (cost, hex) or None; MAX_COST keeps her L1583 depth (no deep person turned light)


def tone_word(L):
    return 'thẫm' if L < .45 else 'đậm' if L < .56 else 'đậm vừa' if L < .64 else 'dịu' if L < .74 else 'sáng' if L < .86 else 'nhạt'


@functools.lru_cache(maxsize=None)
def near_secs(old):
    return tuple(sorted(F.SECS, key=lambda y: de(y, old)))


def repair(d, out, P, log, rounds=6):
    """per free (person, season): pick family + hue (+ phụ) that removes check_unique FAILs (main AND phụ < 8 vs anyone),
    keeps her 4 mains apart (A31, ΔE >= 20 wanted), keeps group neighbours apart; a family change only within quota slack"""
    for rnd in range(rounds):
        for s in SEAS:
            fams = {f[0]: f for f in FAM[s]}
            cnt = collections.Counter(out[p][s]['_fam'] for p in P)
            for p in P:
                if d[p][s]['root'] or p in KEEP_ALL: continue
                e = out[p][s]; cur = e['_fam']; g = d[p]['group']
                L0, C0, _ = oklch(d[p][s]['main_hex']); S0 = round(hsv_s(d[p][s]['main_hex']), 2)
                rest = [q for q in P if q != p]
                own = [out[p][t]['main_hex'] for t in SEAS if t != s]
                old_sec = d[p][s]['sec_hex']
                i = P.index(p)   # sheet neighbours (P is in sheet order): the owner reads rows side by side
                nb = collections.Counter(out[q][s]['_fam'] for q in P[max(0, i - 2):i] + P[i + 1:i + 3])
                best = None
                gcur = sum(1 for q in P if q != p and d[q]['group'] == g and KIND.get(out[q][s]['_fam'], out[q][s]['_fam']) == KIND.get(cur, cur))
                mc = .8 if gcur + 1 > sum(1 for q in P if d[q]['group'] == g) / 3 + 1 else None   # stuck in a group monotony: may lighten a bit more
                for n, f in fams.items():
                    if n != cur and not (cnt[n] < min(f[7] + 2, HARD.get(n, 99)) and cnt[cur] > fams[cur][7] - 2): continue
                    gsame = sum(1 for q in P if q != p and d[q]['group'] == g and KIND.get(out[q][s]['_fam'], out[q][s]['_fam']) == KIND.get(n, n))
                    gpen = max(0, gsame + 1 - (sum(1 for q in P if d[q]['group'] == g) / 3)) * 5
                    for k in range(11):
                        r = fit(round(L0, 3), round(C0, 3), f, k / 10, S0, s, mc if n != cur else None)
                        if r is None: continue
                        x = r[1]
                        dm = [de(x, out[q][s]['main_hex']) for q in rest]
                        near = [q for q, v in zip(rest, dm) if v < 8]
                        secs = [e['sec_hex']] if F.sec_ok(g, x, e['sec_hex']) else []
                        if F.sec_ok(g, x, old_sec) and old_sec not in secs: secs.append(old_sec)
                        for y in near_secs(old_sec):
                            if len(secs) >= 24: break
                            if y not in secs and F.sec_ok(g, x, y): secs.append(y)
                        nsec = [q_sec for q_sec in (out[q][s]['sec_hex'] for q in near)]
                        if near and all(any(de(y, z) < 8 for z in nsec) for y in secs):
                            secs += [y for y in near_secs(old_sec) if y not in secs and F.sec_ok(g, x, y)
                                     and all(de(y, z) >= 8 for z in nsec)][:3]
                        for y in secs:
                            fails = sum(1 for z in nsec if de(y, z) < 8)
                            a31 = min(de(x, z) for z in own)
                            grp = min([v for q, v in zip(rest, dm) if d[q]['group'] == g] or [99])
                            sc = (fails * 500 + nb.get(n, 0) * 7 + gpen + max(0, 20 - a31) * 6 + (12 if n != cur else 0) + r[0] * 20
                                  - min(grp, 12) * .6 - min(min(dm), 8) * .5 + (de(y, old_sec) * .15 if y != old_sec else 0))
                            if best is None or sc < best[0]: best = (sc, n, x, y)
                if best is None: continue
                _, n, x, y = best
                if n != cur: cnt[cur] -= 1; cnt[n] += 1; log['fam_moved_in_repair'] += 1
                e['_fam'] = n; e['main_hex'] = x
                if y != e['sec_hex']:
                    e['sec_hex'] = y; e['sec_vi'] = d[p][s]['sec_vi'] if y == old_sec else F.vi_sec(y)
                e['main_vi'] = f'{n} {tone_word(oklch(x)[0])}'
                e['main'] = f"{e['main_vi']} {x}"; e['sec'] = f"{e['sec_vi']} {e['sec_hex']}"


DEEP_SECS = tuple(B.lch2hex(L, C, h) for L in (.42, .50, .58) for C in (.07, .09) for h in range(0, 360, 20))


def final_fix(d, out, P, log):
    """any check_unique FAIL left: give the free side the nearest suitable phụ that clears every pair"""
    for s in SEAS:
        for p in P:
            if d[p][s]['root'] or p in KEEP_ALL: continue
            e = out[p][s]
            bad_q = [q for q in P if q != p and CU.pair_verdict(e, out[q][s])[0] == 'FAIL']
            if not bad_q: continue
            for y in list(near_secs(e['sec_hex'])) + list(DEEP_SECS):
                if F.bad(y) or not F.sec_ok(d[p]['group'], e['main_hex'], y): continue
                t = dict(e, sec_hex=y, sec=f'x {y}')
                if all(CU.pair_verdict(t, out[q][s])[0] != 'FAIL' for q in P if q != p):
                    e['sec_hex'] = y; e['sec_vi'] = F.vi_sec(y); e['sec'] = f"{e['sec_vi']} {y}"; log['final_fix_sec'] += 1
                    break


def main():
    d = json.load(open(SRC))
    P = sorted([k for k in d if not k.startswith('_') and k != 'status'], key=lambda k: (GORDER.index(d[k]['group']), k))
    out = json.loads(json.dumps(d))
    log = collections.Counter()
    for s in SEAS:
        fams = {f[0]: f for f in FAM[s]}
        fixed = {p: fam_of(d[p][s]['main_hex'], s) for p in P if d[p][s]['root'] or p in KEEP_ALL}
        left = {n: f[7] for n, f in fams.items()}
        for p, n in fixed.items(): left[n] -= 1
        free = [p for p in P if p not in fixed]
        # rescale positive quotas to the number of free people
        pos = {n: max(0, v) for n, v in left.items()}; tot = sum(pos.values())
        quota = {n: v * len(free) / tot for n, v in pos.items()}
        used = collections.Counter(); prev = []
        assign = {}
        for p in P:
            if p in fixed: prev = (prev + [fixed[p]])[-2:]; continue
            L0, C0, _ = oklch(d[p][s]['main_hex']); S0 = round(hsv_s(d[p][s]['main_hex']), 2)
            other = [oklch(out[p][t]['main_hex'])[2] for t in SEAS if t != s]
            best = None
            for n, f in fams.items():
                r = fit(round(L0, 3), round(C0, 3), f, .5, S0, s)
                if r is None: continue
                if n in HARD and used[n] + sum(1 for v in fixed.values() if v == n) >= HARD[n]: continue
                need = quota[n] - used[n]
                sc = r[0] * 8 - need * 1.0 + (2.5 if n in prev else 0) + (1.5 if prev and n == prev[-1] else 0)
                if need < .5: sc += 3
                sc += sum(2 for h in other if hue_gap(h, f[1], f[2]) < 6)   # A31: not the same hue as her other seasons
                if best is None or sc < best[0]: best = (sc, n)
            if best is None: best = (0, fam_of(d[p][s]['main_hex'], s)); log['no_fit_kept_family'] += 1
            n = best[1]; assign[p] = n; used[n] += 1; prev = (prev + [n])[-2:]
        # place hues inside each family: spread members over the range, then push apart close mains (same season)
        mem = collections.defaultdict(list)
        for p in free: mem[assign[p]].append(p)
        for n, ps in mem.items():
            ps.sort(key=lambda p: oklch(d[p][s]['main_hex'])[0])
            for i, p in enumerate(ps):
                L0, C0, _ = oklch(d[p][s]['main_hex'])
                t = (i * 0.618) % 1
                S0 = round(hsv_s(d[p][s]['main_hex']), 2)
                r = fit(round(L0, 3), round(C0, 3), fams[n], round(t, 3), S0, s)
                for k in range(11):
                    if r: break
                    r = fit(round(L0, 3), round(C0, 3), fams[n], k / 10, S0, s)
                out[p][s]['main_hex'] = r[1] if r else d[p][s]['main_hex']; out[p][s]['_fam'] = n
        for p in fixed: out[p][s]['_fam'] = fixed[p]
        for it in range(4):   # maximin over hue t for free people
            for p in free:
                n = assign[p]; L0, C0, _ = oklch(d[p][s]['main_hex']); S0 = round(hsv_s(d[p][s]['main_hex']), 2)
                others = [out[q][s]['main_hex'] for q in P if q != p]
                grp = [out[q][s]['main_hex'] for q in P if q != p and d[q]['group'] == d[p]['group']]
                cand = []
                for k in range(11):
                    r = fit(round(L0, 3), round(C0, 3), fams[n], k / 10, S0, s)
                    if r is None: continue
                    x = r[1]
                    m_all = min(de(x, y) for y in others); m_grp = min([de(x, y) for y in grp] or [99])
                    m_own = min(de(x, out[p][t]['main_hex']) for t in SEAS if t != s)
                    cand.append((min(m_all, 8) + min(m_grp, 12) * .6 + min(m_own, 20) * .3 - r[0] * 20, x))
                if cand: out[p][s]['main_hex'] = max(cand)[1]
        for p in free:
            m = out[p][s]['main_hex']; e = out[p][s]
            old = d[p][s]['sec_hex']
            if F.sec_ok(d[p]['group'], m, old): sec = old
            else:
                c = [x for x in F.SECS if F.sec_ok(d[p]['group'], m, x)]
                sec = min(c, key=lambda x: de(x, old)); log['sec_changed'] += 1
            L = oklch(m)[0]
            w = 'thẫm' if L < .45 else 'đậm' if L < .56 else 'đậm vừa' if L < .64 else 'dịu' if L < .74 else 'sáng' if L < .86 else 'nhạt'
            e.update(main_hex=m, sec_hex=sec, main_vi=f"{assign[p]} {w}", sec_vi=F.vi_sec(sec) if sec != old else d[p][s]['sec_vi'],
                     main_L1583=d[p][s]['main_hex'], sec_L1583=d[p][s]['sec_hex'])
            e['main'] = f"{e['main_vi']} {m}"; e['sec'] = f"{e['sec_vi']} {sec}"
            if m != d[p][s]['main_hex']: log['main_changed'] += 1
        for p in fixed:
            out[p][s]['main_L1583'] = d[p][s]['main_hex']; out[p][s]['sec_L1583'] = d[p][s]['sec_hex']
    repair(d, out, P, log)
    final_fix(d, out, P, log)
    out['_note'] = ('L1709 PAL4 (owner L1708): L1583 tone kept (each main keeps its own OKLCH L/C, only moved to pass bad_colour / HSV S<=.74); '
                    'only hue FAMILIES changed per L1705 (Hạ yellow+orange, blue/purple mainly Đông, Thu orange+olive+muted), spread evenly. '
                    '★GỐC roots + s62 unchanged. Script dev/art/palettes3/four_season_L1709.py. L1679 values not used.')
    out['status'] = 'PROPOSAL L1709 — owner verdict pending; palettes_season_L1583.json / _L1679.json unchanged'
    out['_families'] = {s: {f[0]: sum(1 for p in P if out[p][s].get('_fam') == f[0]) for f in FAM[s]} for s in SEAS}
    json.dump(out, open(DST, 'w'), ensure_ascii=False, indent=1)
    print(dict(log)); print(json.dumps(out['_families'], ensure_ascii=False))


if __name__ == '__main__':
    main()
