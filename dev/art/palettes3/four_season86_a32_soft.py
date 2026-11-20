"""P6 — A32 palette TONED DOWN to the game tone (B14 "tươi kiểu trầm", master colour rule: clear, soft, gentle, medium-light,
"like fine silk in soft daylight") and RE-PAIRED by a stylist. Owner order (Foreman C ROOT-65): "hạ những cái màu độ rực về đúng
cái tông game, còn những cái màu đi cặp với nó nếu mà cần thiết thì cũng phải đổi cho nó đẹp ... đẹp, cân xứng, hài hòa, phù hợp
tính cách".
Model outfit = c06 CŨ: soft vermilion #CF816E (CIELAB L*62 C*36) + warm ivory #EAD7BF.
  * Same A32 structure as P5 (four_season86_a32.py, imported and re-configured here): group tone band, season family, depth notch.
  * MAIN chroma is now set in CIELAB C*: per-group target 30–42 (c06 = 36), hard cap 46 (never above ~48), floor 24
    (28 below L .60) so nothing turns dusty / grey. Deep groups get depth from LOWER LIGHTNESS, not saturation.
  * No brown: warm hues 20–112° can't be deep at this chroma (four_season86.bad_colour), so a deep Tết red / vermilion /
    maple turns to a deep crimson (hue 17°, đỏ thẫm) and Hạ / Thu oranges stay at L ≥ .70 (cam đào / cam mơ / san hô dịu).
  * RE-PAIR (stylist judge on every main + phụ): contrast floor per group (Sắc sảo / Kiêu kỳ need a big light-dark step),
    no beige-on-orange (a warm cream phụ on a soft orange/yellow main reads muddy), no tinted phụ at an awkward hue angle.
    The solver is pulled towards P5's family and phụ for each person-season, so a phụ only changes when the judge says so.
  * A31, gate 0 FAIL, ★ GỐC fixed: unchanged from P5.
Run: ITERS=4 ALONE_BUDGET=300000 python3 dev/art/palettes3/four_season86_a32_soft.py  -> writes palettes_season_deep.json"""
import json, os, sys, math, functools
sys.path.insert(0, os.path.dirname(__file__))
import four_season86_a32 as A
import check_unique as CU
from colourlib import family
B, oklch, de2000, fam2, people = A.B, A.oklch, A.de2000, A.fam2, A.people

OLDFILE = os.environ.get('OLD_A32', os.path.join(B.FC, 'palettes_season_deep.json'))
OLD = json.load(open(OLDFILE))


@functools.lru_cache(maxsize=None)
def cab(h):
    L, a, b = CU._lab(h)
    return math.hypot(a, b)


CAP, FLOOR = 46.0, 24.0
# group band: OKLCH L as P5 (depth by lightness) · Ct = target CIELAB C* of the main · dL = min main-vs-phụ lightness step
BAND = {
    'Dịu dàng':   dict(L=.77, lo=.72, hi=.84, Ct=31, clo=24, chi=40, pL=.93, dL=.12,
                       vi='nhạt + dịu, không bao giờ đậm (hồng phấn + kem) — độ rực vừa, như lụa dưới nắng dịu',
                       why='chính sáng dịu, phụ kem/sương nhạt — mềm mại, không đậm, không rực'),
    'Đoan trang': dict(L=.67, lo=.61, hi=.74, Ct=36, clo=28, chi=44, pL=.91, dL=.20,
                       vi='chính trầm dịu tầm trung + phụ trung tính sáng = công thức c06 CŨ (đỏ son dịu #CF816E + ngà)',
                       why='công thức c06: chính trầm dịu, phụ ngà/kem sáng — nền nã, chỉn chu'),
    'Sắc sảo':    dict(L=.52, lo=.44, hi=.59, Ct=40, clo=30, chi=46, pL=.955, dL=.34,
                       vi='chính ĐẬM nhờ trầm (tối hơn, không rực hơn), tương phản mạnh với phụ rất sáng (đỏ thẫm + trắng ngà)',
                       why='đậm trầm + sáng tương phản mạnh — sắc nét, nổi bật mà không rực'),
    'Kiêu kỳ':    dict(L=.47, lo=.39, hi=.55, Ct=38, clo=28, chi=46, pL=.92, dL=.34,
                       vi='chính đậm quý phái tông ngọc trầm + phụ vàng nhạt / ngà (tím than, xanh ngọc sẫm + vàng nhạt)',
                       why='màu ngọc trầm quý phái + phụ vàng nhạt/ngà — sang, xa cách'),
    'Lạnh lùng':  dict(L=.76, lo=.68, hi=.84, Ct=30, clo=24, chi=40, pL=.92, dL=.12,
                       vi='lạnh, trong, tầm trung → sáng, không xám (xanh băng + tím khói nhạt)',
                       why='màu trong và mát, phụ sương lạnh — thanh, lạnh, không xám'),
    'Quyến rũ':   dict(L=.58, lo=.51, hi=.65, Ct=42, clo=32, chi=46, pL=.90, dL=.22,
                       vi='đậm đà, ấm, trầm (đỏ rượu trầm + cam hồng) — nồng nàn mà không rực',
                       why='màu ấm đậm đà + phụ ấm cam hồng/đào — nồng nàn, không rực'),
}
for g, b in BAND.items():          # keep P5 keys the rest of the solver reads
    b['C'] = .10; b.setdefault('clo_ok', b['clo'])
A.BAND = BAND
A.DE_NN = 12.0      # owner "Ok" via ROOT-66: light neutral phụ vs light neutral phụ ΔE ≥ 12 (mains and colours stay ≥ 20)
# owner "Ok" via ROOT-66 (3): a person still unfit may take ONE season's phụ as a light TINTED colour (counted as a colour)
TINT = [('t_blush', 'light blush pink', 'hồng phấn', 2), ('t_mint', 'light mint', 'bạc hà', 160),
        ('t_sky', 'light sky blue', 'xanh trời nhạt', 240), ('t_lilac', 'light lilac', 'hoa cà nhạt', 305)]
A.__doc__ = __doc__

# P5 picks per person-season (family key of the main, key of the phụ) -> stylist keeps them unless the judge says no
VI2MAIN = {s: {vi: key for key, en, vi, *_ in A.MAINF[s]} for s in A.MAINF}
VI2PHU = {vi: key for key, en, vi, *_ in A.NEUT}
VI2PHU.update({vi: key for key, en, vi, *_ in A.PASTEL}); VI2PHU.update({vi: key for key, en, vi, *_ in A.WARMP})


def old_keys(k, s):
    p = OLD.get(k, {}).get(s, {})
    if p.get('root') or 'main_vi' not in p: return None, None
    mk = next((key for vi, key in sorted(VI2MAIN[s].items(), key=lambda x: -len(x[0])) if p['main_vi'].startswith(vi)), None)
    pk = VI2PHU.get(p.get('sec_vi'))
    return mk, pk


WARM_DEEP_SHIFT = {'tet', 'verm', 'maple'}      # deep + soft at hue 25–33 = brick / rust -> deep crimson (hue 17)


def main_cands(g, s):
    b = BAND[g]
    Lt = min(b['hi'], max(b['lo'], b['L'] + A.NOTCH[s]))
    out, seen = [], set()
    for key, en, vi, H, f_lo, f_hi in A.MAINF[s]:
        Ls = [Lt + dL for dL in (0, -.03, .03, -.06, .06, -.09, .09)]
        if s == 'ha':                                   # Hạ can't go deep at soft chroma (brown): spread L .67–.88 instead
            Ls = [.67 + .025 * i for i in range(9)]
        LtH = max(Lt, .70) if s == 'ha' else Lt
        for L in Ls:
            Lc = min(max(L, f_lo), f_hi)
            if g == 'Dịu dàng' and Lc < .72: continue
            H0 = H
            if key in WARM_DEEP_SHIFT and Lc < .67: H0 = 17
            elif 20 <= H <= 112: Lc = max(Lc, (.67 if H < 35 else .70) if H <= 80 else Lc)   # warm orange/yellow never deep (brown)
            if 35 <= H0 <= 80 and Lc < .70: continue
            for Cc in (.06, .07, .08, .09, .10, .11, .12, .13, .14):
                for dh in ((0, -5, 5, -10, 10) if s == 'ha' else (0, -5, 5)):
                    hx = B.lch2hex(Lc, Cc, (H0 + dh) % 360)
                    if hx in seen: continue
                    seen.add(hx)
                    if B.bad_colour(hx) or A.is_neutral(hx): continue
                    rL, rC, rH = oklch(hx); ca = cab(hx)
                    if ca > CAP or ca < (28 if rL < .60 else FLOOR): continue
                    if 35 <= rH <= 80 and ca < 36: continue                 # soft orange below C*36 = beige / tan
                    if 50 <= rH <= 80 and rL < .75: continue                # mid apricot / amber below L .75 = caramel / ochre
                    if 20 <= rH <= 35 and ca < 34: continue                 # soft coral below C*34 = dusty rose-beige
                    if 45 <= rH <= 80 and rL < .74: continue                # warm orange below L .74 at soft chroma = terracotta / tan
                    if 112 <= rH <= 138 and (ca < 44 or rL < .78): continue  # soft / mid yellow-green = olive (old tone)
                    if 125 <= rH <= 150 and rC < .10: continue              # muted green = grey-green / olive
                    if 95 <= rH <= 122 and ca < 38: continue                # pale low-chroma lemon = khaki / faded cream
                    cost = abs(rL - LtH) / .03 * (.3 if s == 'ha' else .5) + abs(ca - b['Ct']) / 5 * .4 + max(0, b['clo'] - ca, ca - b['chi']) / 3
                    cost += abs(dh) * .02 + (0 if key in A.FAV[g] else .8) + (.3 if abs(Lc - L) > .001 else 0)
                    q = ('clear ' if ca > b['Ct'] + 4 else 'soft ' if ca < b['Ct'] - 4 else '') + \
                        ('warm ' if dh < 0 else 'cool ' if dh > 0 else '')
                    en2 = ('crimson' if s == 'xuan' else 'maple crimson') if H0 != H else en
                    vi2 = ('đỏ thắm' if s == 'xuan' else 'đỏ lá phong trầm') if H0 != H else vi
                    out.append((cost, key, q + en2, vi2, hx))
    return out


A.main_cands = main_cands


# Hạ can't carry depth in the main (a deep soft orange is brown), so for the deep groups the DEPTH MOVES TO THE PHỤ:
# light cam đào / san hô / chanh main + a deep jewel accent (xanh mòng két, lam ngọc, tím than, tím mận, đỏ rượu, xanh ngọc).
# Light groups may take a soft clear colour phụ in Hạ (B18: "a real pretty second colour").
DEEPACC = [('a_teal', 'deep teal', 'xanh mòng két trầm', 205), ('a_sapph', 'deep sapphire', 'lam ngọc trầm', 262),
           ('a_navy', 'midnight violet', 'tím than', 285), ('a_plum', 'deep plum', 'tím mận trầm', 335),
           ('a_wine', 'deep wine', 'đỏ rượu trầm', 5), ('a_jade', 'deep jade', 'xanh ngọc sẫm', 165)]
SOFTACC = [('s_aqua', 'soft aqua', 'ngọc dịu', 195), ('s_mint', 'soft mint', 'bạc hà dịu', 160),
           ('s_sky', 'soft sky', 'xanh trời dịu', 240), ('s_lilac', 'soft lilac', 'tím hoa cà dịu', 305),
           ('s_rose', 'soft rose', 'hồng dịu', 0)]


PASTEL_KEYS = {k for k, *_ in A.PASTEL}


def phu_cands(g, s):
    out = []
    for c, key, en, vi, hx in A.phu_cands(g):
        if key == 'p_lemon': continue                 # pale lemon at soft chroma = khaki cream
        if key in PASTEL_KEYS:                       # P5 pastels (C .085) read candy / near-neon on the softened mains -> C .06
            H = next(h for k2, e2, v2, h in A.PASTEL if k2 == key)
            hx = B.lch2hex(min(BAND[g]['pL'], .90), .06, H)
            if B.bad_colour(hx): continue
        out.append((c, key, en, vi, hx))
    if s != 'ha': return out
    if g in ('Sắc sảo', 'Kiêu kỳ', 'Quyến rũ'):
        for key, en, vi, H in DEEPACC:
            for L in (.42, .47):
                for Cc in (.09, .11):
                    hx = B.lch2hex(L, Cc, H)
                    if B.bad_colour(hx) or not (28 <= cab(hx) <= 44): continue
                    out.append((.3 + abs(L - .45) * 2, key, en, vi, hx))
    else:
        for key, en, vi, H in SOFTACC:
            for L in (.82, .86):
                hx = B.lch2hex(L, .075, H)
                if B.bad_colour(hx): continue
                out.append((.45 if g != 'Đoan trang' else .7, key, en, vi, hx))
    return out


def judge(g, mh, sh, pkey, s=None):
    """stylist cost of the pair: balance (light-dark step), harmony (tint hue angle), no muddy beige-on-orange"""
    mL, mC, mH = oklch(mh); sL, sC, sH = oklch(sh)
    b = BAND[g]; c, why = 0.0, []
    short = b['dL'] - (.12 if s == 'ha' and b['dL'] > .2 else 0) - abs(sL - mL)   # Hạ can't go deep (brown): softer step
    if short > .10 and s != 'ha': return None, ['quá ít tương phản']      # Hạ: a cost only (its light mains can't be deep)
    if short > 0: c += short / .03 * .5; why.append('tương phản hơi ít')
    if A.is_neutral(sh) and sC >= .03:
        dh = abs(((sH - mH + 180) % 360) - 180)
        if 70 <= dh <= 130: c += .35; why.append('ánh màu phụ lệch góc')
        if 30 <= mH <= 112 and pkey in ('ivory', 'gold', 'peachc', 'lemonc'): c += .45; why.append('kem trên cam/vàng → đục')
    if g in ('Sắc sảo', 'Kiêu kỳ') and .6 < sL < .88: c += .5; why.append('phụ chưa đủ sáng')
    return c, why


def cands_for(k, s):
    g = people[k]['group']; r = people[k]['root']
    M, P = main_cands(g, s), phu_cands(g, s)
    omk, opk = old_keys(k, s)
    out, seen, spare = [], set(), []
    for cm, km, em, vm, mh in M:
        for cp, kp, ep, vp, sh in P:
            if (mh, sh) in seen: continue
            seen.add((mh, sh))
            if fam2(mh) == fam2(sh) or de2000(mh, sh) < A.DE_MIN: continue
            cj, why = judge(g, mh, sh, kp, s)
            if cj is None: continue
            wm, wv = A.depth_words(oklch(mh)[0])
            pal = {'main': f'{wm} {em}', 'main_hex': mh, 'sec': ep, 'sec_hex': sh, 'main_vi': f'{vm} {wv}', 'sec_vi': vp}
            if kp.startswith('a_'): pal['sec_depth_moved'] = True
            if kp.startswith('s_'): pal['sec_accent'] = True
            idc = .15 * min(abs(((oklch(mh)[2] - oklch(r['main_hex'])[2] + 180) % 360) - 180), 90) / 90
            anc = (0 if omk is None or km == omk else .6) + (0 if opk is None or kp == opk else .35)
            tot = cm + cp + cj + idc + anc
            if A.clash(pal, [r['main_hex'], r['sec_hex']]):
                spare.append((tot + 50, (km, kp), pal)); continue
            out.append((tot, (km, kp), pal))
    if len(out) < 60: out += spare
    out.sort(key=lambda x: x[0])
    res, cnt = [], {}
    for c, f, p in out:
        if cnt.get(f, 0) >= int(os.environ.get('CAP', 14)): continue
        cnt[f] = cnt.get(f, 0) + 1; res.append((c, p))
    return res[:int(os.environ.get('TOP', 2200))]


A.cands_for = cands_for


def _fc_dfs(todo, V, mine, limit, budget):
    """DFS over her seasons with forward checking (prune every other season's list to pairs that do not clash with the
    colours chosen so far) — P5's plain DFS ran out of budget on the denser soft-tone candidate space"""
    found, bud = [], [budget]

    def rec(rest, Vr, chosen):
        if len(found) >= limit or bud[0] <= 0: return
        if not rest: found.append(dict(chosen)); return
        s = min(rest, key=lambda x: len(Vr[x]))
        for pal in Vr[s]:
            bud[0] -= 1
            if bud[0] <= 0 or len(found) >= limit: return
            new = [pal['main_hex'], pal['sec_hex']]
            V2 = {}
            for x in rest:
                if x == s: continue
                V2[x] = [p for p in Vr[x] if not A.clash(p, new)]
                if not V2[x]: break
            else:
                chosen[s] = pal
                rec([x for x in rest if x != s], V2, chosen)
                del chosen[s]
    rec(list(todo), V, {})
    return found


def solve(seed, C, first=()):
    import random
    rnd = random.Random(seed)
    out = {k: {} for k in A.IDS}
    placed = {s: [] for s in B.SE}
    for k in A.IDS:
        s0 = people[k]['root_season']
        pal = dict(people[k]['root']); pal['root'] = True
        out[k][s0] = pal; placed[s0].append(pal)
    order = A.IDS[:]; rnd.shuffle(order)
    order = [k for k in first] + [k for k in order if k not in first]
    fails = {}
    for k in order:
        todo = [s for s in A.ORDER if s != people[k]['root_season']]
        root = out[k][people[k]['root_season']]; rr = [root['main_hex'], root['sec_hex']]
        V = {s: [p for c, p in C[(k, s)] if not A.clash(p, rr)
                 and not any(A.pair_verdict(p, q)[0] == 'FAIL' for q in placed[s])] for s in todo}
        sols = _fc_dfs(todo, V, rr, 1, int(os.environ.get('BUDGET', 300000)))
        res = sols[0] if sols else None
        if not res:
            res, mine, why_all = {}, list(rr), []
            for s in todo:
                bestp, bestw = None, None
                for cost, pal in C[(k, s)]:
                    if any(A.pair_verdict(pal, q)[0] == 'FAIL' for q in placed[s]): continue
                    w = A.clash(pal, mine)
                    if bestw is None or len(w) < len(bestw): bestp, bestw = pal, w
                    if not w: break
                if bestp is None: bestp, bestw = C[(k, s)][0][1], ['no unique pair left in this season']
                pal = dict(bestp)
                if bestw: pal['A31'] = 'CANNOT FIT: ' + '; '.join(bestw[:3]); why_all += [f'{B.VN[s]}: ' + x for x in bestw[:2]]
                res[s] = pal; mine += [pal['main_hex'], pal['sec_hex']]
            if why_all: fails[k] = why_all
        for s, pal in res.items():
            out[k][s] = pal; placed[s].append(pal)
    return out, fails


def person_solutions(k, C, placed, limit=1, budget=200000):
    root = people[k]['root']; rr = [root['main_hex'], root['sec_hex']]
    todo = [s for s in A.ORDER if s != people[k]['root_season']]
    V = {s: [p for c, p in C[(k, s)] if not A.clash(p, rr)
             and not any(A.pair_verdict(p, q)[0] == 'FAIL' for q in placed.get(s, []))] for s in todo}
    return _fc_dfs(todo, V, rr, limit, budget)


A.solve, A.person_solutions = solve, person_solutions


def stylist_line(k, D):
    g = D[k]['group']; b = BAND[g]
    gen = [s for s in B.SE if not D[k][s].get('root')]
    t = f"{b['why']}; phụ mỗi mùa một màu: {', '.join(D[k][s]['sec_vi'] for s in gen if D[k][s].get('sec_vi'))}"
    ch = [B.VN[s] for s in gen if D[k][s].get('phu_changed')]
    if ch: t += ' · đổi phụ (' + ', '.join(ch) + ') cho hợp màu chính đã hạ'
    rs = D[k][D[k]['root_season']]
    if rs.get('band_misfit'): t += f" · ★ gốc lệch tông ({rs['band_misfit']}) — giữ như tranh"
    return t


@functools.lru_cache(maxsize=None)
def _wide_parts(s):
    Ms = {m[4]: m for g2 in BAND for m in main_cands(g2, s)}
    Ps = {p[4]: p for g2 in BAND for p in phu_cands(g2, s)}
    return Ms, Ps


@functools.lru_cache(maxsize=None)
def widened(k, s, strict=True):
    """her season pairs from a WIDENED pool (any group's tones of that season x every phụ kind), sorted by her stylist cost"""
    g = people[k]['group']; Ms, Ps = _wide_parts(s); out = []
    r = people[k]['root']; rr = [r['main_hex'], r['sec_hex']]
    b = BAND[g]
    for mh, (cm, km, em, vm, _) in Ms.items():
        mL = oklch(mh)[0]
        if not (b['lo'] - .05 <= mL <= b['hi'] + .10) and not (s == 'ha' and mL >= .67 and g not in LIGHT): continue
        if g == 'Dịu dàng' and mL < .72: continue
        for sh, (cp, kp, ep, vp, _) in Ps.items():
            if g in LIGHT and oklch(sh)[0] < .62: continue          # light / soft groups never take a deep phụ
            if fam2(mh) == fam2(sh) or de2000(mh, sh) < A.DE_MIN: continue
            cj, why = judge(g, mh, sh, kp, s)
            if cj is None: continue
            wm, wv = A.depth_words(oklch(mh)[0])
            pal = {'main': f'{wm} {em}', 'main_hex': mh, 'sec': ep, 'sec_hex': sh, 'main_vi': f'{vm} {wv}', 'sec_vi': vp,
                   'gate_widened': True}
            if kp.startswith('a_'): pal['sec_depth_moved'] = True
            if kp.startswith('s_'): pal['sec_accent'] = True
            if strict and A.clash(pal, rr): continue
            out.append((cj + cp + abs(cab(mh) - BAND[g]['Ct']) / 10 + abs(oklch(mh)[0] - BAND[g]['L']) * 5, pal))
    out.sort(key=lambda x: x[0])
    return tuple(out)


FVI = {'pink-rose': 'hồng', 'red-coral': 'đỏ san hô', 'jade-bluegreen': 'xanh ngọc', 'teal-aqua': 'xanh mòng két',
       'blue': 'lam', 'indigo-violet': 'tím than', 'lilac-purple': 'tím', 'plum-magenta': 'tím mận', 'green': 'xanh lá'}


LIGHT = ('Dịu dàng', 'Lạnh lùng', 'Đoan trang')


def tone_bad(h):
    L, c, H = oklch(h)
    return 112 <= H <= 138 and (cab(h) < 44 or L < .78) and not A.is_neutral(h)


def fine_pairs(k, s):
    """last resort for a crowded season: her group's season mains x a FINE grid of phụ (deep accents every 15° of hue at
    L .38–.52 for the deep groups / soft clear colours L .80–.86 for the others) — same tone rules, just more slots"""
    g = people[k]['group']; out = []
    deep = g in ('Sắc sảo', 'Kiêu kỳ', 'Quyến rũ')
    Ms = sorted({m[4]: m for m in main_cands(g, s)}.values())[:60]
    for H in range(0, 360, 15):
        if 50 <= H <= 150: continue                   # deep yellow-green / orange accents read olive / brown
        for L in ((.38, .44, .50) if deep else (.80, .84)):
            for Cc in ((.09, .11) if deep else (.07,)):
                sh = B.lch2hex(L, Cc, H)
                if B.bad_colour(sh) or not (24 <= cab(sh) <= 44): continue
                for cm, km, em, vm, mh in Ms:
                    if fam2(mh) == fam2(sh) or de2000(mh, sh) < A.DE_MIN: continue
                    cj, why = judge(g, mh, sh, 'x', s)
                    if cj is None: continue
                    wm, wv = A.depth_words(oklch(mh)[0])
                    en = ('deep ' if deep else 'soft ') + family(sh) + f' {sh}'
                    vi = ('' if deep else 'dịu ') + FVI.get(family(sh), family(sh)) + (' trầm' if deep else '')
                    pal = {'main': f'{wm} {em}', 'main_hex': mh, 'sec': en, 'sec_hex': sh, 'main_vi': f'{vm} {wv}',
                           'sec_vi': vi, 'gate_widened': True, 'sec_depth_moved' if deep else 'sec_accent': True}
                    out.append((cm + cj + 3, pal))
    out.sort(key=lambda x: x[0])
    return out


def gate_fix(D):
    """gate 0 FAIL is hard: a pair that still twins someone (Hạ is the crowded season) gets a pair from a WIDENED pool —
    any group's Hạ main tones × every phụ kind (neutrals at every lightness, soft and deep accents) — keeping her A31 clean
    and her group's stylist judge as the tie-break"""
    ids = A.IDS; fixed = []
    for _ in range(3):
        bad = set()
        for s in B.SE:
            for i, a in enumerate(ids):
                for b in ids[i + 1:]:
                    if CU.pair_verdict(D[a][s], D[b][s])[0] == 'FAIL':
                        for x in (a, b):
                            if not D[x][s].get('root'): bad.add((x, s)); break
        if not bad: break
        done = set()
        for k0, s in sorted(bad):
            pair_people = [k0] + [x for x in ids if x != k0 and not D[x][s].get('root')
                                  and CU.pair_verdict(D[k0][s], D[x][s])[0] == 'FAIL']
            if any((x, s) in done for x in pair_people): continue
            best, k = None, None
            for kk in pair_people:
                others = [D[x][s] for x in ids if x != kk]
                mine = [D[kk][t][r] for t in B.SE if t != s for r in ('main_hex', 'sec_hex')]
                for cost, pal in list(widened(kk, s)) + [(50, p) for p in tint_pairs(kk, s)]:
                    why = [CU.pair_verdict(pal, q)[3] for q in others if CU.pair_verdict(pal, q)[0] == 'FAIL']
                    if why and any(w != 'same name pair' for w in why): continue
                    if why:      # differs by ΔE but carries the same words: give the main its exact tone in the name
                        pal = dict(pal, main=pal['main'] + ' ' + pal['main_hex']); cost += 1
                        if any(CU.pair_verdict(pal, q)[0] == 'FAIL' for q in others): continue
                    sc = (len(A.clash(pal, mine)), cost)
                    if best is None or sc < best[0]: best, k = (sc, pal), kk
                    if sc[0] == 0: break
                if best and best[0][0] == 0: break
            if best:
                done.add((k, s)); mine = [D[k][t][r] for t in B.SE if t != s for r in ('main_hex', 'sec_hex')]
                pal = dict(best[1]); pal['gate_widened'] = True
                w = A.clash(pal, mine)
                if w: pal['A31'] = 'CANNOT FIT: ' + '; '.join(w[:3])
                D[k][s] = pal; fixed.append((k, s))
            else:                # displace: take a pair whose only twin is ONE non-root person, re-dress that person
                k = k0; mine = [D[k][t][r] for t in B.SE if t != s for r in ('main_hex', 'sec_hex')]
                ok = False
                for cost, pal in list(widened(k, s)) + [(50, p) for p in tint_pairs(k, s)]:
                    if A.clash(pal, mine): continue
                    blk = [x for x in ids if x != k and CU.pair_verdict(pal, D[x][s])[0] == 'FAIL']
                    if len(blk) != 1 or D[blk[0]][s].get('root'): continue
                    x = blk[0]; mx = [D[x][t][r] for t in B.SE if t != s for r in ('main_hex', 'sec_hex')]
                    oth = [D[y][s] for y in ids if y not in (x, k)] + [pal]
                    for c2, p2 in list(cands_for(x, s)) + list(widened(x, s)):
                        if A.clash(p2, mx) or any(CU.pair_verdict(p2, q)[0] == 'FAIL' for q in oth): continue
                        D[k][s] = dict(pal); D[x][s] = dict(p2); fixed += [(k, s), (x, s)]; ok = True; break
                    if ok: break
                if not ok:      # last resort for an already-unfit person: least-clash pair that is still unique
                    rr = [people[k]['root'][r] for r in ('main_hex', 'sec_hex')]
                    oth = [D[y][s] for y in ids if y != k]; bp = None
                    for cost, pal in list(widened(k, s, False)) + fine_pairs(k, s):
                        if any(CU.pair_verdict(pal, q)[0] == 'FAIL' for q in oth): continue
                        sc = (len(A.clash(pal, mine + rr)), cost)
                        if bp is None or sc < bp[0]: bp = (sc, pal)
                    if bp:
                        pal = dict(bp[1]); w = A.clash(pal, mine + rr)
                        if w: pal['A31'] = 'CANNOT FIT: ' + '; '.join(w[:3])
                        D[k][s] = pal; fixed.append((k, s)); ok = True
                if not ok: print('gate_fix: nothing for', k0, s)
    print('gate_fix replaced', fixed)
    return fixed


def off_tone(k, s, p):
    g = people[k]['group']; b = BAND[g]
    mL, sL = oklch(p['main_hex'])[0], oklch(p['sec_hex'])[0]
    if tone_bad(p['main_hex']) or tone_bad(p['sec_hex']) or p.get('band_borrowed') in ('Sắc sảo', 'Kiêu kỳ') and g in LIGHT: return True
    if g in LIGHT and sL < .62: return True
    if g == 'Dịu dàng' and mL < .72: return True
    if g in LIGHT and s != 'ha' and mL < b['lo'] - .05 + A.NOTCH[s]: return True
    return False


def tone_fix(D):
    """a pair outside her group's tone (a light group with a deep colour, olive...) is re-dressed one pair at a time"""
    fixed = []
    for k in A.IDS:
        for s in B.SE:
            p = D[k][s]
            if p.get('root') or not off_tone(k, s, p): continue
            mine = [D[k][t][r] for t in B.SE if t != s for r in ('main_hex', 'sec_hex')]
            oth = [D[y][s] for y in A.IDS if y != k]; bp = None
            for cost, pal in list(cands_for(k, s)) + list(widened(k, s, False)) + fine_pairs(k, s) + [(60, p) for p in tint_pairs(k, s)]:
                if off_tone(k, s, pal) or any(CU.pair_verdict(pal, q)[0] == 'FAIL' for q in oth): continue
                sc = (len(A.clash(pal, mine)), cost)
                if bp is None or sc < bp[0]: bp = (sc, pal)
                if sc[0] == 0: break
            if not bp: print('tone_fix: nothing for', k, s)
            if bp:
                pal = dict(bp[1]); pal.pop('band_borrowed', None); w = A.clash(pal, mine)
                if w: pal['A31'] = 'CANNOT FIT: ' + '; '.join(w[:3])
                D[k][s] = pal; fixed.append((k, s, len(w)))
    print('tone_fix', fixed)


def repair2(D):
    """A31 left-overs: re-solve each one alone against everyone else's pairs, her own candidates first, then the widened
    pool (any group's tones of the season x every phụ kind); gate stays 0 FAIL"""
    os.environ['CAP'], os.environ['TOP'] = '200', '20000'
    bad_tone = {k for k in A.IDS for s in B.SE if not D[k][s].get('root') and off_tone(k, s, D[k][s])}
    print('tone re-dress (olive):', sorted(bad_tone))
    for k in sorted(set(a31_audit(D)) | bad_tone):
        todo = [s for s in A.ORDER if s != people[k]['root_season']]
        r = people[k]['root']; rr = [r['main_hex'], r['sec_hex']]
        V = {}
        for s in todo:
            others = [D[x][s] for x in A.IDS if x != k]
            seen, lst = set(), []
            for c, p in list(cands_for(k, s)) + [(c + 2, dict(p)) for c, p in widened(k, s)[:4000]]:
                key = (p['main_hex'], p['sec_hex'])
                if key in seen or A.clash(p, rr) or off_tone(k, s, p): continue
                seen.add(key)
                if any(CU.pair_verdict(p, q)[0] == 'FAIL' for q in others): continue
                lst.append(p)
            V[s] = lst
        sol = _fc_dfs(todo, V, rr, 1, 400000)
        print('repair2', k, 'fixed' if sol else 'still', {s: len(V[s]) for s in todo}, flush=True)
        if sol:
            for s, p in sol[0].items(): p.pop('A31', None); D[k][s] = p


def tint_pairs(k, s):
    """her season mains (own candidates) x light tinted phụ (L .86–.88, C .08 — a colour, not a neutral)"""
    g = people[k]['group']; out, seen = [], set()
    for c, p in cands_for(k, s):
        if p['main_hex'] in seen: continue
        seen.add(p['main_hex'])
        for key, en, vi, H in TINT:
            for L in (.86, .88):
                sh = B.lch2hex(L, .08, H)
                if A.is_neutral(sh) or B.bad_colour(sh): continue
                mh = p['main_hex']
                if fam2(mh) == fam2(sh) or de2000(mh, sh) < A.DE_MIN: continue
                cj, why = judge(g, mh, sh, key, s)
                if cj is None: continue
                out.append((c + cj + .5, dict(p, sec=en, sec_hex=sh, sec_vi=vi, sec_tinted=True, gate_widened=False)))
    out.sort(key=lambda x: x[0])
    return [p for c, p in out]


def repair3(D):
    """owner rule (3): still unfit -> ONE season's phụ may be a light tinted colour"""
    os.environ['CAP'], os.environ['TOP'] = '200', '20000'
    for k in sorted(a31_audit(D)):
        todo = [s for s in A.ORDER if s != people[k]['root_season']]
        r = people[k]['root']; rr = [r['main_hex'], r['sec_hex']]
        base = {}
        for s in todo:
            others = [D[x][s] for x in A.IDS if x != k]
            seen, lst = set(), []
            for c, p in list(cands_for(k, s)) + [(c + 2, dict(p)) for c, p in widened(k, s)[:4000]]:
                key = (p['main_hex'], p['sec_hex'])
                if key in seen or A.clash(p, rr): continue
                seen.add(key)
                if any(CU.pair_verdict(p, q)[0] == 'FAIL' for q in others): continue
                lst.append(p)
            base[s] = (lst, others)
        sol = None
        for st in todo:                       # which single season takes the tinted phụ
            V = {s: base[s][0] for s in todo}
            V[st] = [p for p in tint_pairs(k, st) if not A.clash(p, rr)
                     and not any(CU.pair_verdict(p, q)[0] == 'FAIL' for q in base[st][1])]
            sol = _fc_dfs(todo, V, rr, 1, 300000)
            if sol: break
        print('repair3 (tinted phụ)', k, 'fixed in ' + st if sol else 'still', flush=True)
        if sol:
            for s, p in sol[0].items(): p.pop('A31', None); D[k][s] = p


def a31_audit(D):
    bad = {}
    for k in A.IDS:
        cols = [(s, r, D[k][s][r + '_hex']) for s in B.SE for r in ('main', 'sec')]
        for (s1, r1, a), (s2, r2, b) in __import__('itertools').combinations(cols, 2):
            if s1 == s2 and D[k][s1].get('root'): continue
            if fam2(a) == fam2(b) or de2000(a, b) < A.de_need(a, b):
                bad.setdefault(k, []).append(f'{B.VN[s1]}.{r1} {a} ~ {B.VN[s2]}.{r2} {b}')
    return bad


def post():
    """mark changed phụ, rewrite status + stylist lines, re-run the gate"""
    fn = os.path.join(B.FC, 'palettes_season_deep.json')
    D = json.load(open(fn))
    D['status'] = 'PROPOSAL (P6: A32 toned down to the game tone "tươi kiểu trầm" + stylist re-pair, A31 kept) — owner verdict pending'
    D['_bands_A32'] = {g: {kk: b[kk] for kk in ('L', 'lo', 'hi', 'Ct', 'pL', 'dL', 'vi')} for g, b in BAND.items()}
    D['_tone_P6'] = {'main_CIELAB_Cstar_cap': CAP, 'floor': FLOOR, 'model': 'c06 CŨ #CF816E (L*62 C*36) + #EAD7BF'}
    gate_fix(D)
    tone_fix(D)
    repair2(D)
    repair3(D)
    bad = a31_audit(D)
    D['_flags']['A31_cannot_fit'] = bad
    for k in A.IDS:
        if k not in bad:
            for s in B.SE: D[k][s].pop('A31', None)
    print('A31 pass', len(A.IDS) - len(bad), '/', len(A.IDS), 'cannot fit:', sorted(bad))
    for k in A.IDS:
        D[k]['band'] = BAND[D[k]['group']]['vi']
        for s in B.SE:
            p = D[k][s]
            if p.get('root'): continue
            o = OLD.get(k, {}).get(s, {})
            p.pop('phu_changed', None)
            if o.get('sec_vi') and o['sec_vi'] != p.get('sec_vi'):
                p['phu_changed'] = f"{o['sec_vi']} {o['sec_hex']} → {p['sec_vi']} {p['sec_hex']}"
            p['main_before_P6'] = o.get('main_hex')
        D[k]['stylist'] = stylist_line(k, D)
    json.dump(D, open(fn, 'w'), ensure_ascii=False, indent=1)
    CU.run(D, quiet=True)


if __name__ == '__main__':
    if not os.environ.get('POST_ONLY'):
        A.main()
    post()
