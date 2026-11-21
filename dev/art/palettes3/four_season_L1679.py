#!/usr/bin/env python3
"""DESIGN21 — owner L1679 (21/11, via Foreman C #18), verbatim key parts:
  "tại sao cái nhóm kiêu kỳ có rất là nhiều người đỏ rượu trầm thẳm ... mỗi người một mã ... Bên Hạ cũng vậy, toàn là màu cam ...
   mỗi một mùa nó sẽ có những cái màu đặc trưng riêng, nhưng mà mình nên có phải vài ba cái màu đặc trưng chứ ... từ S10 cho tới S50 toàn là màu cam."
WHY the L1583 palette clustered: its season test (season_feel_L1582 PROTO) knew only ONE colour family per season-feel
(Hạ = only orange/yellow prototypes; Thu = olive/terracotta + 'đỏ rượu trầm' as the only DEEP autumn prototype), and looks_right
forbade a deep Hạ orange and a deep Thu olive/orange -> every deep group (Kiêu kỳ/Sắc sảo) fell into wine red in Thu, every Hạ into orange.
FIX (this file, NEW output palettes_season_L1679.json; L1583 untouched until the owner approves):
  * each season has 5 signature colour FAMILIES (SEASON_FAM), each reading as that season (B30), pink only Xuân (capped) and as phụ;
  * per group + season the members are spread over the families the group's tone band (A32) can wear (quota = ceil(n/k));
  * inside a group + season every main differs clearly (ΔE2000 >= 12 target, >= 9 floor) and from everyone in the season (>= 5);
  * one person's 4 mains stay distinct (A31, ΔE >= 20); ★GỐC roots kept (drawn); s62 Thu kept (owner sample row);
  * phụ: the L1583 phụ is kept when it still suits the new main (same contrast rule), else the nearest light phụ that does.
Run from the repo root: python3 dev/art/palettes3/four_season_L1679.py     (~1 min, deterministic)"""
import json, os, sys, math, itertools, functools, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from colourlib import oklch, oklab
import four_season86 as B
import check_unique as CU
import four_season_L1583 as F

HERE = os.path.dirname(os.path.abspath(__file__))
FC = os.path.join(HERE, '..', 'face-common')
SRC, DST = os.path.join(FC, 'palettes_season_L1583.json'), os.path.join(FC, 'palettes_season_L1679.json')
SEAS = ('xuan', 'ha', 'thu', 'dong'); VN = dict(xuan='Xuân', ha='Hạ', thu='Thu', dong='Đông')
de = functools.lru_cache(maxsize=None)(CU.de2000)
import numpy as np
LAB = functools.lru_cache(maxsize=None)(CU._lab)


def de_vec(x, ys):
    """CIEDE2000 of hex x against a list of hexes ys (numpy; same formula as check_unique.de2000)"""
    if not ys: return np.array([99.0])
    L1, a1, b1 = LAB(x); A = np.array([LAB(y) for y in ys]); L2, a2, b2 = A[:, 0], A[:, 1], A[:, 2]
    C1, C2 = math.hypot(a1, b1), np.hypot(a2, b2); Cb = (C1 + C2) / 2
    G = 0.5 * (1 - np.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)))
    a1p, a2p = a1 * (1 + G), a2 * (1 + G)
    C1p, C2p = np.hypot(a1p, b1), np.hypot(a2p, b2)
    h1p = np.degrees(np.arctan2(b1, a1p)) % 360; h2p = np.degrees(np.arctan2(b2, a2p)) % 360
    dLp, dCp = L2 - L1, C2p - C1p
    dh = h2p - h1p; dh = np.where(dh > 180, dh - 360, np.where(dh < -180, dh + 360, dh)); dh = np.where(C1p * C2p == 0, 0, dh)
    dHp = 2 * np.sqrt(C1p * C2p) * np.sin(np.radians(dh / 2))
    Lbp, Cbp = (L1 + L2) / 2, (C1p + C2p) / 2
    hs = h1p + h2p; hb = np.where(np.abs(h1p - h2p) > 180, np.where(hs < 360, (hs + 360) / 2, (hs - 360) / 2), hs / 2)
    hb = np.where(C1p * C2p == 0, hs, hb)
    T = 1 - .17 * np.cos(np.radians(hb - 30)) + .24 * np.cos(np.radians(2 * hb)) + .32 * np.cos(np.radians(3 * hb + 6)) - .2 * np.cos(np.radians(4 * hb - 63))
    dth = 30 * np.exp(-((hb - 275) / 25) ** 2); RC = 2 * np.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7))
    SL = 1 + .015 * (Lbp - 50) ** 2 / np.sqrt(20 + (Lbp - 50) ** 2); SC, SH = 1 + .045 * Cbp, 1 + .015 * Cbp * T
    RT = -np.sin(np.radians(2 * dth)) * RC
    return np.sqrt((dLp / SL) ** 2 + (dCp / SC) ** 2 + (dHp / SH) ** 2 + RT * (dCp / SC) * (dHp / SH))

# family: name, hue lo-hi (OKLCH deg), C lo-hi, L lo-hi, pink
SEASON_FAM = {   # (bad_colour forbids: royal yellow / mustard / dark yellow, brown = warm L<.67 C<.15, wine = red L<.56 C<.12)
    'xuan': [('hồng hoa đào', 354, 20, .09, .15, .55, .88, 1), ('xanh lá non', 132, 152, .09, .16, .42, .88, 0),
             ('đỏ son Tết', 10, 26, .15, .20, .44, .66, 0), ('xanh ngọc non', 160, 186, .07, .13, .50, .88, 0),
             ('xanh trời xuân', 220, 244, .09, .15, .55, .88, 0)],
    'ha':   [('cam đào', 40, 62, .12, .15, .74, .88, 0), ('vàng chanh', 100, 112, .10, .14, .88, .95, 0),
             ('xanh ngọc lam biển', 194, 218, .08, .14, .48, .86, 0), ('xanh lá sen', 148, 168, .07, .13, .48, .78, 0),
             ('đỏ dưa hấu', 18, 30, .15, .19, .56, .76, 0), ('cam san hô đậm', 34, 46, .15, .19, .56, .74, 0), ('tím oải hương', 286, 310, .07, .12, .70, .90, 0)],
    'thu':  [('cam quả hồng', 44, 58, .08, .11, .67, .80, 0), ('đất nung', 28, 40, .10, .13, .67, .80, 0),
             ('ô liu', 110, 134, .07, .12, .38, .74, 0), ('đỏ lá phong', 24, 40, .15, .18, .38, .62, 0),
             ('xanh cổ vịt trầm', 190, 214, .055, .09, .34, .68, 0)],
    'dong': [('xanh băng', 224, 252, .055, .09, .70, .93, 0), ('chàm', 254, 280, .08, .15, .34, .70, 0),
             ('tím mận', 292, 330, .08, .15, .36, .72, 0), ('xanh tùng', 158, 188, .06, .11, .34, .76, 0),
             ('đỏ thẫm mai đông', 0, 12, .12, .15, .30, .50, 0)],
}
COOL = {'xanh trời xuân', 'tím oải hương', 'xanh ngọc non', 'xanh ngọc lam biển', 'xanh lá sen', 'xanh cổ vịt trầm', 'xanh băng', 'chàm', 'tím mận', 'xanh tùng', 'xanh lá non'}
TOL = .06          # a group band may stretch this much in L to reach a family
FAM_CAP = 24      # no family carries more than 24 of the 90 mains of a season (owner: never one colour per season)
PINK_CAP = .30     # share of Xuân mains that may be pink (B30: pink mostly phụ)
GRP_T, GRP_F, SEA_F, A31 = 11, 8, 5, 20
SEA_T = 5   # whole-season main target (check_unique WARN level); pairs are kept unique by the phụ (FAIL needs main AND phụ < 8)


def fam_points(f, step=(3, .03, .015)):
    n, h0, h1, c0, c1, l0, l1, _ = f
    out = []
    h = h0
    if h1 < h0: h1 += 360
    while h <= h1:
        L = l0
        while L <= l1 + 1e-9:
            c = c0
            while c <= c1 + 1e-9:
                out.append((round(L, 3), round(c, 3), h % 360)); c += step[2]
            L += step[1]
        h += step[0]
    return out


# 'reads as' = nearest family point (OKLab distance) of any season; a main must read as its own season with a margin
REF = [(s, f[0], oklab(B.lch2hex(L, c, h))) for s in SEAS for f in SEASON_FAM[s] for (L, c, h) in fam_points(f, (4, .04, .02))]


@functools.lru_cache(maxsize=None)
def reads(x):
    a = oklab(x)
    best = {}
    for s, n, b in REF:
        d = math.dist(a, b)
        if d < best.get(s, (9, ''))[0]: best[s] = (d, n)
    s = min(best, key=lambda k: best[k][0])
    others = min(v[0] for k, v in best.items() if k != s)
    return s, best[s][1], others - best[s][0]


def cands(group, s, fam):
    lo, hi, clo, chi, _ = F.BAND[group]; n = F.NOTCH[s]
    lo, hi = lo + n - TOL, hi + n + TOL
    out = []
    for (L, c, h) in fam_points(fam):
        if not (lo <= L <= hi): continue
        x = B.lch2hex(L, c, h)
        if F.bad(x): continue
        r = reads(x)
        if r[0] != s or r[2] < .004: continue
        out.append(x)
    return list(dict.fromkeys(out))


def fam_of(x, s):
    r = reads(x)
    if r[0] == s: return r[1]
    a = oklab(x)
    return min(((math.dist(a, b), n) for t, n, b in REF if t == s))[1]


def vi_main(x, fam):
    L = oklch(x)[0]
    w = 'thẫm' if L < .45 else 'đậm' if L < .56 else 'đậm vừa' if L < .64 else 'dịu' if L < .74 else 'sáng'
    return f'{fam} {w}'


def main():
    d = json.load(open(SRC))
    P = [k for k in d if not k.startswith('_') and k != 'status']
    groups = collections.defaultdict(list)
    for p in P: groups[d[p]['group']].append(p)
    chosen = {p: {} for p in P}
    fixed = {}
    for p in P:
        for s in SEAS:
            if d[p][s].get('root'): fixed[(p, s)] = d[p][s]['main_hex']
    fixed[('s62', 'thu')] = d['s62']['thu']['main_hex']
    for (p, s), x in fixed.items(): chosen[p][s] = (x, fam_of(x, s))
    log = []
    for s in SEAS:
        season_taken = [chosen[p][s][0] for p in P if s in chosen[p]]
        pink_n = sum(1 for p in P if s in chosen[p] and SEASON_FAM[s][0][0] == chosen[p][s][1]) if s == 'xuan' else 0
        for g, mem in groups.items():
            fams = [f for f in SEASON_FAM[s] if cands(g, s, f)]
            if g == 'Lạnh lùng':   # A32 cool clear: cool families first
                fams.sort(key=lambda f: f[0] not in COOL)
            k = len(fams); quota = math.ceil(len(mem) / k)
            cnt = collections.Counter(chosen[p][s][1] for p in mem if s in chosen[p])
            todo = [p for p in mem if s not in chosen[p]]
            # family preference per person: least change from the L1583 main (its family first)
            def pref(p):
                cur = d[p][s]['main_hex']; cf = fam_of(cur, s)
                return sorted(fams, key=lambda f: (f[0] != cf, min(de(cur, x) for x in cands(g, s, f))))
            todo.sort(key=lambda p: len(pref(p)))
            for p in todo:
                cur = d[p][s]['main_hex']
                own = [chosen[p][t][0] for t in SEAS if t in chosen[p]]
                grp = [chosen[q][s][0] for q in mem if s in chosen[q]]
                best = None
                for floor_g, floor_a, useq, sea_f in ((GRP_T, A31, 1, SEA_F), (GRP_F, A31, 1, SEA_F), (GRP_T, A31, 0, SEA_F), (GRP_F, A31, 0, SEA_F), (GRP_F, 16, 0, 3), (6, 14, 0, 2), (4, 10, 0, 0), (0, 8, 0, 0)):
                    for f in pref(p):
                        if useq and cnt[f[0]] >= quota: continue
                        if f[7] and pink_n >= PINK_CAP * len(P): continue
                        for x in cands(g, s, f):
                            if any(de(x, o) < floor_a for o in own): continue
                            mg = min([de(x, y) for y in grp] or [99])
                            if mg < floor_g: continue
                            ms = min([de(x, y) for y in season_taken] or [99])
                            if ms < sea_f: continue
                            cost = de(x, cur) * .35 - min(mg, 30) - .3 * min(ms, 20) + (6 if g == 'Lạnh lùng' and f[0] not in COOL else 0)
                            if best is None or cost < best[0]: best = (cost, x, f[0], floor_g, floor_a)
                    if best: break
                if not best:
                    log.append(f'{p} {VN[s]}: NO FIT, kept L1583'); x, fn = cur, fam_of(cur, s)
                else:
                    _, x, fn, fg, fa = best[:5]
                    if (fg, fa) != (GRP_T, A31): log.append(f'{p} {VN[s]}: relaxed group ΔE≥{fg} / A31 ΔE≥{fa}')
                chosen[p][s] = (x, fn); cnt[fn] += 1; season_taken.append(x)
                if fn == SEASON_FAM['xuan'][0][0] and s == 'xuan': pink_n += 1
    # LOCAL SEARCH (maximin): move the tightest person to the candidate with the largest slack
    # slack = min(group ΔE / 10, season ΔE / 6, own other seasons ΔE / 20); family quota per group+season = ceil(n/k)+1
    free = [(p, s) for p in P for s in SEAS if (p, s) not in fixed]
    famq = {}
    for g, mem in groups.items():
        for s in SEAS:
            fams = [f for f in SEASON_FAM[s] if cands(g, s, f)]
            famq[(g, s)] = (fams, math.ceil(len(mem) / len(fams)) + 2)
    def slack(p, s, x, excl=True):
        g = d[p]['group']
        grp = [chosen[q][s][0] for q in groups[g] if q != p]
        sea = [chosen[q][s][0] for q in P if q != p]
        own = [chosen[p][t][0] for t in SEAS if t != s]
        return min(de_vec(x, grp).min() / GRP_T, de_vec(x, sea).min() / SEA_T, de_vec(x, own).min() / A31)
    for rnd in range(12):
        cur_sl = {(p, s): slack(p, s, chosen[p][s][0]) for p, s in free}
        order = sorted(free, key=lambda k: cur_sl[k])
        moved = 0
        for p, s in order:
            if cur_sl[(p, s)] >= 1: continue
            g = d[p]['group']; fams, q = famq[(g, s)]
            cnt = collections.Counter(chosen[o][s][1] for o in groups[g] if o != p)
            old = d[p][s]['main_hex']; best = (slack(p, s, chosen[p][s][0]), chosen[p][s])
            pinks = sum(chosen[o]['xuan'][1] == SEASON_FAM['xuan'][0][0] for o in P if o != p)
            grp = [chosen[o][s][0] for o in groups[g] if o != p]; sea = [chosen[o][s][0] for o in P if o != p]
            own = [chosen[p][t][0] for t in SEAS if t != s]
            gcnt = collections.Counter(chosen[o][s][1] for o in P if o != p)
            for f in fams:
                if cnt[f[0]] >= q or gcnt[f[0]] >= FAM_CAP: continue
                if f[7] and pinks >= PINK_CAP * len(P): continue
                cs = cands(g, s, f)
                for x in cs:
                    sl = min(de_vec(x, grp).min() / GRP_T, de_vec(x, sea).min() / SEA_T, de_vec(x, own).min() / A31)
                    sl = min(sl, 1.0) - de(x, old) / 400 + (-.05 if g == 'Lạnh lùng' and f[0] not in COOL else 0)
                    if sl > best[0] + .01: best = (sl, (x, f[0]))
            if best[1] != chosen[p][s]: chosen[p][s] = best[1]; moved += 1
        worst = min(slack(p, s, chosen[p][s][0]) for p, s in free)
        print(f'round {rnd}: moved {moved}, worst slack {worst:.2f}')
        if not moved: break
    log = [f'{p} {VN[s]}: slack {slack(p, s, chosen[p][s][0]):.2f} (group ΔE/10, season ΔE/6, A31 ΔE/20)' for p, s in free if slack(p, s, chosen[p][s][0]) < 1]
    # phụ
    out = {'_note': 'L1679 proposal (owner L1679: vài ba màu đặc trưng mỗi mùa, mỗi người một mã) by DESIGN21 four_season_L1679.py on top of palettes_season_L1583.json; '
                    '5 colour families per season, spread inside each group (A32 bands), ★GỐC + s62 Thu kept. L1583 file unchanged.',
           'status': 'PROPOSAL L1679 — owner verdict pending', '_families': {s: [f[0] for f in SEASON_FAM[s]] for s in SEAS}, '_log': log}
    taken = {t: [] for t in SEAS}
    for p in P:
        r = d[p]; e = dict(group=r['group'], root_season=r.get('root_season'), band=r.get('band'))
        for s in SEAS:
            x, fn = chosen[p][s]; o = r[s]
            keep = x == o['main_hex']
            mvi = o['main_vi'] if keep else vi_main(x, fn)
            sc = F.sec_cands(r, s, x, {s: [dict(main=q['main_hex'], main_hex=q['main_hex'], sec=q['sec_hex'], sec_hex=q['sec_hex']) for q in taken[s]]})
            sec = sc[0][1] if sc else o['sec_hex']
            if not sc: log.append(f'{p} {VN[s]}: no unique phụ, kept L1583 phụ')
            e[s] = dict(main_hex=x, sec_hex=sec, root=bool(o.get('root')), family=fn, main_vi=mvi,
                        sec_vi=o['sec_vi'] if sec == o['sec_hex'] else F.vi_sec(sec),
                        main_L1583=o['main_hex'], sec_L1583=o['sec_hex'], reads=VN[reads(x)[0]])
            e[s]['main'] = f"{e[s]['main_vi']} {x}"; e[s]['sec'] = f"{e[s]['sec_vi']} {sec}"
            taken[s].append(e[s])
        out[p] = e
    json.dump(out, open(DST, 'w'), ensure_ascii=False, indent=1)
    # report
    fails = []
    for s in SEAS:
        pals = [(p, out[p][s]) for p in P]
        for (p, a), (q, b) in itertools.combinations(pals, 2):
            v = CU.pair_verdict(a, b)[0]
            if v == 'FAIL': fails.append(f'{VN[s]} {p}~{q}')
        print(VN[s], collections.Counter(out[p][s]['family'] for p in P).most_common())
        for g, mem in groups.items():
            ms = [out[p][s]['main_hex'] for p in mem]
            mn = min(de(a, b) for a, b in itertools.combinations(ms, 2))
            print(f'   {g:10s} families={dict(collections.Counter(out[p][s]["family"] for p in mem))} minΔE={mn:.1f}')
    a31bad = [p for p in P if min(de(out[p][a]['main_hex'], out[p][b]['main_hex']) for a, b in itertools.combinations(SEAS, 2)) < A31]
    print('unique FAIL', len(fails), fails[:10]); print('A31 mains <20:', a31bad); print('log', len(log)); [print(' ', l) for l in log]
    changed = sum(out[p][s]['main_hex'] != d[p][s]['main_hex'] for p in P for s in SEAS)
    print('mains changed vs L1583:', changed, '/ 360')


if __name__ == '__main__':
    main()
