"""P5 — rule A32 (owner Lượt 999 "Ok, làm theo các khuyến nghị ở trên đi." + "Bảng màu nói chuyên gia thời trang phối lại ...
nếu cần thì có thể phối giữa đậm và nhạt cho 1 bộ") on top of A31.
PALETTE = PERSONALITY TONE + SEASON FAMILY, styled like the c06 CŨ outfit (#CF816E soft mid main + #EAD7BF light ivory phụ):
  * GROUP sets the tone band of the MAIN and the kind of PHỤ (BAND below);
  * SEASON sets the colour family of the main (Xuân hồng/đỏ/lá xuân · Hạ cam/vàng · Thu lá phong/hồng/bí/mận/rêu/hổ phách ·
    Đông lam/tím/ngọc) and nudges depth ONE notch inside the band (Xuân/Thu deeper, Đông lighter, Hạ as is);
  * PHỤ = a light tinted NEUTRAL (ngà, vàng nhạt, kem đào, hồng phấn nhạt, bạc hà nhạt, xanh sương, tím khói nhạt, trắng ngà),
    a different one each season; Quyến rũ may take a warm light colour (cam hồng, đào, hồng san hô) instead.
A31 kept: a person's 8 colours never alike — no family twice (colourlib.family for colours; every named light neutral is its
own family, a root neutral counts as its nearest named neutral) and ΔE2000 ≥ 20 (neutral vs neutral ≥ 15, owner allowance).
No grey / brown / old / royal yellow (four_season86.bad_colour for colours), unique pair per season across people
(check_unique, gate 0 FAIL). ★ GỐC drawn pairs stay fixed; misfits vs their group band are counted, never recoloured.
Run: python3 dev/art/palettes3/four_season86_a32.py   -> writes palettes_season_deep.json"""
import json, os, sys, itertools, random
sys.path.insert(0, os.path.dirname(__file__))
import four_season86 as B
from colourlib import oklch, family
import functools
import check_unique as CU
from check_unique import pair_verdict, run as gate_run
de2000 = CU.de2000 = functools.lru_cache(maxsize=None)(CU.de2000)     # speed: the solver asks the same pairs again and again
oklch = functools.lru_cache(maxsize=None)(oklch)

SE, VN, IDS, people = B.SE, B.VN, B.IDS, B.people
ORDER = ('ha', 'thu', 'xuan', 'dong')
DE_MIN, DE_NN = 20.0, 15.0
NOTCH = {'xuan': -0.04, 'ha': 0.0, 'thu': -0.04, 'dong': +0.04}       # L shift: Xuân/Thu one notch deeper, Đông lighter

# group -> main band (L target, L lo, L hi, C target, C lo, C hi), phụ L for neutrals, fav main families, phụ costs, text
BAND = {
    'Dịu dàng':   dict(L=.77, lo=.72, hi=.84, C=.095, clo=.07, chi=.12, pL=.93,
                       vi='nhạt + dịu, không bao giờ đậm (hồng phấn + kem)',
                       why='chính sáng dịu, phụ kem/sương nhạt — mềm mại, không đậm'),
    'Đoan trang': dict(L=.67, lo=.61, hi=.74, C=.10, clo=.08, chi=.13, pL=.91,
                       vi='chính trầm dịu tầm trung + phụ trung tính sáng = công thức c06 CŨ (đỏ son + ngà)',
                       why='công thức c06: chính trầm dịu, phụ ngà/kem sáng — nền nã, chỉn chu'),
    'Sắc sảo':    dict(L=.52, lo=.44, hi=.59, C=.15, clo=.12, chi=.19, pL=.955,
                       vi='chính ĐẬM, tương phản mạnh với phụ rất sáng (đỏ thắm + trắng ngà)',
                       why='đậm + sáng tương phản mạnh — sắc nét, nổi bật'),
    'Kiêu kỳ':    dict(L=.47, lo=.39, hi=.55, C=.13, clo=.10, chi=.17, pL=.92,
                       vi='chính đậm quý phái tông ngọc + phụ vàng nhạt / ngà (tím than, xanh ngọc + vàng nhạt)',
                       why='màu ngọc đậm quý phái + phụ vàng nhạt/ngà — sang, xa cách'),
    'Lạnh lùng':  dict(L=.76, lo=.68, hi=.84, C=.10, clo=.08, chi=.13, pL=.92,
                       vi='lạnh, trong, tầm trung → sáng, không xám (xanh băng + tím khói nhạt)',
                       why='màu trong và mát, phụ sương lạnh — thanh, lạnh, không xám'),
    'Quyến rũ':   dict(L=.58, lo=.51, hi=.65, C=.16, clo=.13, chi=.20, pL=.90,
                       vi='đậm đà, ấm, rực (đỏ rượu + cam hồng)',
                       why='màu ấm rực đậm đà + phụ ấm cam hồng/đào — nồng nàn'),
}
# season main families: key, english, vietnamese, OKLCH hue, L floor, L ceiling
MAINF = {
    'xuan': [('peony', 'peony pink', 'hồng mẫu đơn', 350, .40, .90), ('rose', 'rose pink', 'hồng', 2, .40, .90),
             ('peach_bl', 'peach-blossom pink', 'hồng hoa đào', 13, .45, .90), ('tet', 'Tết red', 'đỏ Tết', 25, .42, .80),
             ('verm', 'vermilion', 'đỏ son', 33, .45, .78), ('leaf', 'spring leaf green', 'xanh lá xuân', 140, .42, .90),
             ('bud', 'young bud green', 'xanh chồi non', 130, .66, .90)],
    'ha':   [('coral_o', 'coral orange', 'cam san hô', 40, .62, .86), ('peach', 'peach orange', 'cam đào', 48, .64, .90),
             ('tang', 'tangerine', 'cam quýt', 55, .66, .86), ('apricot', 'apricot', 'cam mơ', 62, .66, .90),
             ('mango', 'mango', 'vàng xoài', 70, .78, .90), ('lemon', 'lemon', 'vàng chanh', 106, .91, .95),
             ('melon', 'cantaloupe', 'cam dưa lưới', 66, .76, .90), ('limelemon', 'lime lemon', 'vàng chanh non', 113, .91, .95)],
    'thu':  [('maple', 'maple red', 'đỏ lá phong', 27, .42, .82), ('persim', 'persimmon', 'cam quả hồng', 40, .55, .84),
             ('pumpkin', 'pumpkin', 'cam bí ngô', 52, .62, .86), ('amber', 'amber', 'hổ phách', 62, .70, .88),
             ('wine', 'wine berry', 'đỏ rượu', 0, .38, .80), ('autrose', 'autumn rose', 'hồng thu', 10, .42, .84),
             ('plum', 'plum', 'tím mận', 335, .36, .82), ('moss', 'moss green', 'xanh rêu', 135, .52, .84)],
    'dong': [('ice', 'ice blue', 'xanh băng', 232, .55, .92), ('cerul', 'cerulean', 'xanh da trời', 245, .45, .90),
             ('sapph', 'sapphire', 'lam ngọc bích', 262, .36, .85), ('navy_v', 'midnight violet', 'tím than', 282, .34, .84),
             ('violet', 'violet', 'tím', 300, .38, .86), ('lilac', 'lilac', 'tím hoa cà', 315, .45, .88),
             ('jade', 'jade', 'xanh ngọc', 168, .42, .90), ('teal', 'teal', 'xanh mòng két', 200, .40, .88)],
}
FAV = {   # main families the group's stylist reaches for first (others cost more)
    'Dịu dàng': {'peony', 'rose', 'peach_bl', 'bud', 'peach', 'apricot', 'lemon', 'mango', 'melon', 'limelemon', 'autrose', 'persim', 'amber',
                 'ice', 'lilac', 'jade', 'cerul'},
    'Đoan trang': {'verm', 'tet', 'rose', 'leaf', 'coral_o', 'peach', 'tang', 'apricot', 'maple', 'persim', 'autrose',
                   'plum', 'moss', 'sapph', 'cerul', 'jade', 'violet', 'teal'},
    'Sắc sảo': {'tet', 'peony', 'leaf', 'verm', 'coral_o', 'tang', 'maple', 'wine', 'plum', 'pumpkin', 'sapph', 'teal',
                'violet', 'navy_v', 'jade'},
    'Kiêu kỳ': {'tet', 'peony', 'leaf', 'rose', 'coral_o', 'tang', 'wine', 'plum', 'maple', 'navy_v', 'sapph', 'jade',
                'teal', 'violet'},
    'Lạnh lùng': {'peony', 'rose', 'leaf', 'bud', 'apricot', 'peach', 'mango', 'lemon', 'limelemon', 'plum', 'moss', 'autrose', 'ice', 'cerul',
                  'lilac', 'jade', 'teal', 'sapph', 'violet'},
    'Quyến rũ': {'tet', 'verm', 'peony', 'rose', 'coral_o', 'tang', 'peach', 'wine', 'maple', 'persim', 'pumpkin', 'plum',
                 'violet', 'lilac', 'sapph', 'navy_v'},
}
# light tinted neutrals (phụ): key, english, vietnamese, chroma, hue — L comes from the group (pL)
NEUT = [('ivory', 'ivory', 'ngà', .035, 85), ('gold', 'pale gold', 'vàng nhạt', .058, 96),
        ('peachc', 'peach cream', 'kem đào', .05, 60), ('blush', 'blush', 'hồng phấn nhạt', .045, 0),
        ('mint', 'mint mist', 'bạc hà nhạt', .045, 165), ('mist', 'mist blue', 'xanh sương', .045, 240),
        ('smoke', 'smoke lilac', 'tím khói nhạt', .055, 302), ('white', 'ivory white', 'trắng ngà', .014, 88),
        ('lemonc', 'lemon cream', 'kem chanh', .055, 112), ('orchid', 'orchid mist', 'hồng tím phấn', .05, 335),
        ('aqua', 'aqua mist', 'xanh ngọc sương', .045, 200)]
WARMP = [('coralp', 'coral pink', 'cam hồng', .80, .10, 38), ('peachp', 'soft peach', 'đào', .84, .085, 56),
         ('rosep', 'coral rose', 'hồng san hô', .78, .10, 16)]          # Quyến rũ warm light phụ (colours, not neutrals)
PCOST = {   # phụ preference per group (missing = 0.5)
    'Dịu dàng': dict(ivory=0, peachc=0, blush=0, mist=0, mint=.1, smoke=.1, gold=.3, white=.2, lemonc=.2, orchid=.1, aqua=.1),
    'Đoan trang': dict(ivory=0, peachc=0, blush=.1, gold=.1, white=.1, mist=.3, mint=.3, smoke=.3, lemonc=.3, orchid=.3, aqua=.3),
    'Sắc sảo': dict(white=0, ivory=0, mist=.1, blush=.1, peachc=.1, mint=.2, smoke=.2, gold=.2),
    'Kiêu kỳ': dict(gold=0, ivory=0, white=.1, lemonc=.2, peachc=.2, smoke=.3, mist=.3, blush=.3, mint=.4),
    'Lạnh lùng': dict(mist=0, smoke=0, mint=0, white=.1, aqua=0, orchid=.2, lemonc=.4, blush=.4, ivory=.5, peachc=.7, gold=.8),
    'Quyến rũ': dict(coralp=0, peachp=0, rosep=0, peachc=.3, blush=.3, ivory=.4, gold=.4, white=.6, smoke=.7, mist=.9, mint=.9),
}
PASTEL = [('p_peach', 'pastel peach', 'đào pastel', 55), ('p_lemon', 'pastel lemon', 'chanh pastel', 106),
          ('p_pink', 'pastel pink', 'hồng pastel', 0), ('p_aqua', 'pastel aqua', 'ngọc pastel', 200),
          ('p_lilac', 'pastel lilac', 'tím pastel', 300), ('p_mint', 'pastel mint', 'bạc hà pastel', 160)]
NHEX = {k: B.lch2hex(.91, c, h) for k, e, v, c, h in NEUT}


@functools.lru_cache(maxsize=None)
def is_neutral(h):
    L, c, H = oklch(h)
    return L >= .85 and c <= .075


@functools.lru_cache(maxsize=None)
def fam2(h):
    """A31 family: a light neutral = its nearest named neutral; any other colour = colourlib.family"""
    if is_neutral(h):
        L, c, H = oklch(h)
        if c < .022: return 'n:white'
        return 'n:' + min((k for k in NHEX if k != 'white'), key=lambda k: de2000(h, NHEX[k]))
    return family(h)


def de_need(a, b):
    return DE_NN if is_neutral(a) and is_neutral(b) else DE_MIN


def depth_words(L):
    if L >= .84: return 'pale', 'nhạt'
    if L >= .75: return 'light', 'sáng'
    if L >= .63: return 'soft', 'dịu'
    if L >= .54: return 'rich', 'đậm vừa'
    if L >= .45: return 'deep', 'đậm'
    return 'jewel-deep', 'thẫm'


def main_cands(g, s):
    b = BAND[g]
    Lt = min(b['hi'], max(b['lo'], b['L'] + NOTCH[s]))
    out = []
    for key, en, vi, H, f_lo, f_hi in MAINF[s]:
        for dL in (0, -.03, .03, -.06, .06, -.09, .09) + ((-.12, .12, -.15, .15) if s == 'ha' else ()):
            L = Lt + dL
            Lc = min(max(L, f_lo), f_hi)               # family floor/ceiling (Hạ/Thu oranges never go brown)
            if g == 'Dịu dàng' and Lc < .72: continue   # never deep
            for dC in (0, -.02, .02) + ((-.04, .04) if s == 'ha' else ()):
                Cc = b['C'] + dC
                if g in ('Sắc sảo', 'Quyến rũ', 'Kiêu kỳ') and 20 <= H <= 112 and Lc < .67: Cc = max(Cc, .16)
                if key in ('lemon', 'limelemon', 'mango', 'melon', 'amber'): Cc = max(Cc, .13)   # P4 weak spot: soft lemon reads khaki -> keep it clear
                if key in ('lemon', 'limelemon'): Cc = min(Cc, .14)         # ...but never a neon / imperial yellow
                if 35 <= H <= 75 and Lc < .78: Cc = max(Cc, .17 + dC)     # mid orange/apricot below L .78 at low chroma = tan / caramel (brown)
                if 125 <= H <= 150: Cc = max(Cc, .11)                     # greens: muted = grey-green / olive
                for dh in (0, -5, 5):
                    hx = B.lch2hex(Lc, Cc, (H + dh) % 360)
                    if B.bad_colour(hx) or is_neutral(hx): continue      # the main is always a real colour
                    rL, rC, rH = oklch(hx)
                    if 35 <= rH <= 80 and (rC < .10 or (rL < .78 and rC < .14)): continue   # dull peach/apricot/orange reads beige / tan / brown
                    cost = abs(rL - Lt) / .03 * .5 + max(0, b['clo'] - rC, rC - b['chi']) / .02 + abs(dh) * .02
                    cost += 0 if key in FAV[g] else .8
                    if abs(Lc - L) > .001: cost += .3
                    q = ('clear ' if dC > 0 else 'muted ' if dC < 0 else '') + ('warm ' if dh < 0 else 'cool ' if dh > 0 else '')
                    out.append((cost, key, q + en, vi, hx))
    return out


def phu_cands(g):
    b = BAND[g]; out = []
    for key, en, vi, c, H in NEUT:
        for dL in (0, -.02, .02):
            L = min(.97, b['pL'] + dL)
            hx = B.lch2hex(L, c, H)
            q = 'soft ' if dL < 0 else 'bright ' if dL > 0 else ''
            out.append((PCOST[g].get(key, .5) + abs(dL) * 5, key, q + en, vi, hx))
    for key, en, vi, H in PASTEL:                      # light pastel phụ: last resort when her root eats the neutrals
        hx = B.lch2hex(min(b['pL'], .90), .085, H)
        if B.bad_colour(hx): continue
        out.append((PCOST[g].get(key, .7), key, en, vi, hx))
    if g == 'Quyến rũ':
        for key, en, vi, L, c, H in WARMP:
            for dL in (0, -.03, .03):
                hx = B.lch2hex(L + dL, c, H)
                if B.bad_colour(hx): continue
                q = 'deeper ' if dL < 0 else 'paler ' if dL > 0 else ''
                out.append((PCOST[g][key] + abs(dL) * 5, key, q + en, vi, hx))
    return out


def cands_for(k, s):
    g = people[k]['group']
    r = people[k]['root']
    M, P = main_cands(g, s), phu_cands(g)
    out, seen, spare = [], set(), []
    for cm, km, em, vm, mh in M:
        for cp, kp, ep, vp, sh in P:
            if (mh, sh) in seen: continue
            seen.add((mh, sh))
            if fam2(mh) == fam2(sh) or de2000(mh, sh) < DE_MIN: continue
            wm, wv = depth_words(oklch(mh)[0])
            pal = {'main': f'{wm} {em}', 'main_hex': mh, 'sec': ep, 'sec_hex': sh,
                   'main_vi': f'{vm} {wv}', 'sec_vi': vp}
            # tiny identity pull towards her drawn root hue (keeps the person recognisable)
            idc = .15 * min(abs(((oklch(mh)[2] - oklch(r['main_hex'])[2] + 180) % 360) - 180), 90) / 90
            if clash(pal, [r['main_hex'], r['sec_hex']]):              # fights her own drawn root: last resort only
                spare.append((cm + cp + idc + 50, (km, kp), pal)); continue
            out.append((cm + cp + idc, (km, kp), pal))
    if len(out) < 60: out += spare
    out.sort(key=lambda x: x[0])
    # keep variety: at most 14 per (main family, phụ)
    res, cnt = [], {}
    for c, f, p in out:
        if cnt.get(f, 0) >= int(os.environ.get("CAP", 14)): continue
        cnt[f] = cnt.get(f, 0) + 1; res.append((c, p))
    return res[:int(os.environ.get("TOP", 2200))]


def clash(pal, mine):
    why = []
    for c in (pal['main_hex'], pal['sec_hex']):
        for x in mine:
            if fam2(c) == fam2(x): why.append(f'{c} same family {fam2(c)} as {x}')
            elif de2000(c, x) < de_need(c, x): why.append(f'{c} ΔE {de2000(c, x):.1f} to {x}')
    return why


def solve(seed, C, first=()):
    rnd = random.Random(seed)
    out = {k: {} for k in IDS}
    placed = {s: [] for s in SE}
    for k in IDS:
        s0 = people[k]['root_season']
        pal = dict(people[k]['root']); pal['root'] = True
        out[k][s0] = pal; placed[s0].append(pal)
    order = IDS[:]; rnd.shuffle(order)
    order = [k for k in first] + [k for k in order if k not in first]
    fails = {}
    for k in order:
        todo = [s for s in ORDER if s != people[k]['root_season']]
        root = out[k][people[k]['root_season']]
        budget = [int(os.environ.get('BUDGET', 300000))]
        V = {s: [p for c, p in C[(k, s)] if not any(pair_verdict(p, q)[0] == 'FAIL' for q in placed[s])] for s in todo}
        V = {s: [p for p in V[s] if not clash(p, [root['main_hex'], root['sec_hex']])] for s in todo}
        todo.sort(key=lambda s: len(V[s]))            # fewest options first

        def dfs(i, chosen, mine):
            if i == len(todo): return dict(chosen)
            s = todo[i]
            for pal in V[s]:
                budget[0] -= 1
                if budget[0] <= 0: return None
                if clash(pal, mine): continue
                chosen[s] = pal
                res = dfs(i + 1, chosen, mine + [pal['main_hex'], pal['sec_hex']])
                if res: return res
                del chosen[s]
                if budget[0] <= 0: return None
            return None

        res = dfs(0, {}, [root['main_hex'], root['sec_hex']])
        if not res:
            res, mine, why_all = {}, [root['main_hex'], root['sec_hex']], []
            for s in todo:
                bestp, bestw = None, None
                for cost, pal in C[(k, s)]:
                    w = clash(pal, mine)
                    if any(pair_verdict(pal, q)[0] == 'FAIL' for q in placed[s]): continue   # gate 0 FAIL is hard
                    if bestw is None or len(w) < len(bestw): bestp, bestw = pal, w
                    if not w: break
                if bestp is None: bestp, bestw = C[(k, s)][0][1], ['no unique pair left in this season']
                pal = dict(bestp)
                if bestw: pal['A31'] = 'CANNOT FIT: ' + '; '.join(bestw[:3]); why_all += [f'{VN[s]}: ' + x for x in bestw[:2]]
                res[s] = pal; mine += [pal['main_hex'], pal['sec_hex']]
            if why_all: fails[k] = why_all
        for s, pal in res.items():
            out[k][s] = pal; placed[s].append(pal)
    return out, fails


# ---------- band audit (roots are never recoloured; only counted) ----------
def root_misfit(g, main, sec):
    mL, mC, mH = oklch(main); sL, sC, sH = oklch(sec)
    warm = mH >= 330 or mH <= 75
    why = []
    if g == 'Dịu dàng':
        if min(mL, sL) < .66: why.append(f'có màu đậm (L {min(mL, sL):.2f}) — Dịu dàng không bao giờ đậm')
    elif g == 'Đoan trang':
        if not (.60 <= mL <= .76): why.append(f'chính L {mL:.2f} ngoài tầm trung dịu')
        if not is_neutral(sec): why.append('phụ không phải trung tính sáng')
    elif g == 'Sắc sảo':
        if mL > .60: why.append(f'chính không đậm (L {mL:.2f})')
        if sL < .84: why.append('phụ không sáng — thiếu tương phản')
    elif g == 'Kiêu kỳ':
        if mL > .58: why.append(f'chính không đậm quý phái (L {mL:.2f})')
        if sL < .84: why.append('phụ không phải vàng nhạt/ngà sáng')
    elif g == 'Lạnh lùng':
        if mL < .62: why.append(f'chính đậm (L {mL:.2f}) — Lạnh lùng tầm trung → sáng')
        if warm and mC > .06: why.append('chính ấm, không lạnh')
        if min(mC, sC) < .03 and not is_neutral(main if mC < sC else sec): why.append('có màu xám')
        if min(mC, sC) < .012: why.append('trắng xám không tông')
    elif g == 'Quyến rũ':
        if mC < .12: why.append(f'chính không rực (C {mC:.2f})')
        if not warm: why.append('chính không ấm')
    return why


def c06_style(p):
    """main soft/deep colour (not neutral, L ≤ .80) + light neutral phụ"""
    return (not is_neutral(p['main_hex'])) and oklch(p['main_hex'])[0] <= .80 and is_neutral(p['sec_hex'])


def stylist_line(k, D):
    g = D[k]['group']; b = BAND[g]
    gen = [s for s in SE if not D[k][s].get('root')]
    neut = [D[k][s]['sec_vi'] for s in gen if D[k][s].get('sec_vi')]
    t = f"{b['why']}; phụ mỗi mùa một màu: {', '.join(neut)}"
    rs = D[k][D[k]['root_season']]
    if rs.get('band_misfit'): t += f" · ★ gốc lệch tông ({rs['band_misfit']}) — giữ như tranh"
    return t



def person_solutions(k, C, placed, limit=1, budget=200000):
    """yield up to `limit` A31-clean sets of her non-root pairs, unique vs `placed` (season -> list of pairs)"""
    root = people[k]['root']
    todo = [s for s in ORDER if s != people[k]['root_season']]
    V = {s: [p for c, p in C[(k, s)] if not clash(p, [root['main_hex'], root['sec_hex']])
             and not any(pair_verdict(p, q)[0] == 'FAIL' for q in placed.get(s, []))] for s in todo}
    todo.sort(key=lambda s: len(V[s]))
    found, bud = [], [budget]

    def dfs(i, chosen, mine):
        if len(found) >= limit or bud[0] <= 0: return
        if i == len(todo): found.append(dict(chosen)); return
        s = todo[i]
        for pal in V[s]:
            bud[0] -= 1
            if bud[0] <= 0 or len(found) >= limit: return
            if clash(pal, mine): continue
            chosen[s] = pal
            dfs(i + 1, chosen, mine + [pal['main_hex'], pal['sec_hex']])
            del chosen[s]
    dfs(0, {}, [root['main_hex'], root['sec_hex']])
    return found


def repair(out, fails, C):
    """for a person who could not fit: take one of her A31-clean sets (ignoring the others), find who blocks it per season,
    and re-solve those blockers around her; commit only if every blocker still fits cleanly"""
    fixed, alone_impossible = [], []
    for k in sorted(fails):
        sols = person_solutions(k, C, {}, limit=int(os.environ.get('SOLS', 40)), budget=int(os.environ.get('ALONE_BUDGET', 2000000)))
        if not sols: alone_impossible.append(k); continue
        done = False
        for sol in sols:
            blockers = set()
            for s, pal in sol.items():
                for b in IDS:
                    if b != k and pair_verdict(pal, out[b][s])[0] == 'FAIL':
                        blockers.add((b, s))
            if any(out[b][s].get('root') or b in fails for b, s in blockers) or len(blockers) > int(os.environ.get('MAXBLOCK', 3)): continue
            trial = {x: dict(out[x]) for x in IDS}
            for s, pal in sol.items(): trial[k][s] = pal
            ok = True
            for b in sorted({b for b, s in blockers}):
                placed = {s: [trial[x][s] for x in IDS if x != b] for s in SE}
                bs = person_solutions(b, C, placed, limit=1)
                if not bs: ok = False; break
                for s, pal in bs[0].items(): trial[b][s] = pal
            if ok:
                for x in IDS: out[x] = trial[x]
                fixed.append(k); done = True; break
    for k in fixed: fails.pop(k)
    return fixed, alone_impossible


class LazyC(dict):
    def __missing__(self, key):
        v = self[key] = cands_for(*key); return v


def main():
    if os.environ.get('REPAIR_ONLY'):                 # re-run only the repair pass on the committed file
        old = json.load(open(os.path.join(B.FC, 'palettes_season_deep.json')))
        os.environ['CAP'], os.environ['TOP'] = '200', '20000'
        C = LazyC()
        out = {k: {s: old[k][s] for s in SE} for k in IDS}
        fails = dict(old['_flags']['A31_cannot_fit']); seed = old['_note'].rsplit('seed ', 1)[-1].strip(' .\n')
        best = (out, fails, seed)
        return finish(best, C)
    C = {}
    for k in IDS:
        for s in SE:
            if s != people[k]['root_season']: C[(k, s)] = cands_for(k, s)
    print('candidates built, min per person-season', min(len(v) for v in C.values()),
          min(C, key=lambda x: len(C[x])))
    best, first = None, []
    seed = int(os.environ.get('SEED', 1))
    for it in range(int(os.environ.get('ITERS', 4))):
        out, fails = solve(seed + it, C, first)
        print('iter', it, 'people that cannot fit:', len(fails), sorted(fails), flush=True)
        if best is None or len(fails) < len(best[1]): best = (out, fails, seed + it)
        if not fails: break
        first = sorted(fails) + [k for k in first if k not in fails]
    return finish(best, C)


def finish(best, C):
    out, fails, seed = best
    os.environ['CAP'], os.environ['TOP'] = '200', '20000'          # repair: full candidate sets for the people left over
    for k in fails:
        for s in SE:
            if s != people[k]['root_season']: C[(k, s)] = cands_for(k, s)
    for rnd_ in range(3):
        fixed, alone_impossible = repair(out, fails, C)
        print('repair round', rnd_, 'fixed', fixed, '| impossible even alone', alone_impossible, '| still', sorted(fails), flush=True)
        if not fixed: break
    # gate 0 FAIL is hard: a left-over person whose fallback pair twins someone else gets the least-bad UNIQUE pair
    for k in sorted(fails):
        for s in SE:
            if out[k][s].get('root'): continue
            others = [out[x][s] for x in IDS if x != k]
            if not any(pair_verdict(out[k][s], q)[0] == 'FAIL' for q in others): continue
            mine = [out[k][t][r] for t in SE if t != s for r in ('main_hex', 'sec_hex')]
            pool = [p for c, p in C[(k, s)] if not any(pair_verdict(p, q)[0] == 'FAIL' for q in others)]
            if not pool:                              # her band is full in this season: borrow the nearest band's tones
                g0 = people[k]['group']
                for g2 in ('Sắc sảo', 'Quyến rũ', 'Đoan trang', 'Kiêu kỳ', 'Lạnh lùng', 'Dịu dàng'):
                    if g2 == g0: continue
                    people[k]['group'] = g2
                    pool = [dict(p, band_borrowed=g2) for c, p in cands_for(k, s)
                            if not any(pair_verdict(p, q)[0] == 'FAIL' for q in others)]
                    people[k]['group'] = g0
                    if pool: break
            if not pool: print('WARNING gate: no unique pair for', k, s); continue
            best_ = min(pool, key=lambda p: len(clash(p, mine)))
            w = clash(best_, mine); best_ = dict(best_)
            if w: best_['A31'] = 'CANNOT FIT: ' + '; '.join(w[:3])
            out[k][s] = best_
    for k in sorted(fails):                           # re-audit: drop people who came out clean after the gate fix
        cols = [(s, out[k][s][r]) for s in SE for r in ('main_hex', 'sec_hex')]
        if not any(not (s1 == s2 and out[k][s1].get('root')) and (fam2(a) == fam2(b) or de2000(a, b) < de_need(a, b))
                   for (s1, a), (s2, b) in itertools.combinations(cols, 2)):
            fails.pop(k)
    # clear stale A31 flags of repaired people
    for k in IDS:
        if k not in fails:
            for s in SE: out[k][s].pop('A31', None)
    misfit = {}
    for k in IDS:
        r = people[k]['root']; w = root_misfit(people[k]['group'], r['main_hex'], r['sec_hex'])
        if w: misfit[k] = w
    D = {'_note': __doc__ + f'\nseed {seed}.',
         'status': 'PROPOSAL (P5, A32 personality tone + season family, A31 kept) — owner verdict pending',
         '_bands_A32': {g: {kk: b[kk] for kk in ('L', 'lo', 'hi', 'C', 'pL', 'vi')} for g, b in BAND.items()},
         '_neutrals_A32': {v: B.lch2hex(.91, c, h) for k, e, v, c, h in NEUT},
         '_flags': {'s44_brown_root': people['s44']['flag'],
                    'root_changed_CU_MOI': [k for k in IDS if people[k]['changed']],
                    'A31_cannot_fit': fails, 'A31_impossible_even_alone': alone_impossible, 'root_band_misfit': misfit}}
    for k in IDS:
        P = people[k]; e = {'root_season': P['root_season'], 'group': P['group'], 'band': BAND[P['group']]['vi']}
        for s in SE:
            pal = out[k][s]
            if pal.get('root'):
                if P['changed']: pal['changed'] = P['changed']
                if k in misfit: pal['band_misfit'] = '; '.join(misfit[k])
                if k == 's44':
                    ob = P['old_block']
                    for kk in ('root_code', 'root_drawn', 'note'):
                        if kk in ob: pal[kk] = ob[kk]
                    pal['flag'] = P['flag']; pal['proposal'] = P['proposal']
            e[s] = pal
        D[k] = e
        e['stylist'] = stylist_line(k, D)
    json.dump(D, open(os.path.join(B.FC, 'palettes_season_deep.json'), 'w'), ensure_ascii=False, indent=1)
    gate_run(D, quiet=True)
    bad, nn_low = {}, []
    for k in IDS:
        cols = [(s, r, D[k][s][r + '_hex']) for s in SE for r in ('main', 'sec')]
        for (s1, r1, a), (s2, r2, b) in itertools.combinations(cols, 2):
            if s1 == s2 and D[k][s1].get('root'): continue
            if fam2(a) == fam2(b) or de2000(a, b) < de_need(a, b): bad.setdefault(k, []).append(f'{s1}.{r1}~{s2}.{r2}')
            elif is_neutral(a) and is_neutral(b) and de2000(a, b) < DE_MIN: nn_low.append(k)
    allp = [D[k][s] for k in IDS for s in SE]
    gen = [p for p in allp if not p.get('root')]
    print('A31 audit: people with a clash', len(bad), sorted(bad))
    print('people using the neutral-vs-neutral ΔE 15 allowance:', len(set(nn_low)))
    print('c06-style pairs: all', sum(map(c06_style, allp)), '/', len(allp), ' generated', sum(map(c06_style, gen)), '/', len(gen),
          ' roots', sum(c06_style(p) for p in allp if p.get('root')), '/', len(IDS))
    print('root band misfits', len(misfit))
    for k, w in fails.items(): print(' ', k, w[:2])


if __name__ == '__main__':
    main()
