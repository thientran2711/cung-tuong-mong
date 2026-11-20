"""DEEP 4-season palette for the 86 consorts (owner Lượt 934 "làm lại bảng 4 mùa cho từng người", rule L27 "Giữ lại bảng
áo đậm màu"; worker P3 for Foreman C ROOT-64). Writes ONLY dev/art/face-common/palettes_season_deep.json — the light file
palettes_season.json is read, never written.

Method (one rule, no new colour families):
  root   : her ROOT season pair = root_drawn (the two colours her picture was drawn with), kept EXACTLY as drawn.
           16 people have no root_drawn (m08 m16 c20 s47 s48 s51–s61) -> root = her current code (flag NO_DRAWN).
           Owner ~02:25Z 20/11 "Thôi đại đi, có người màu này màu kia": darkness levels are NOT evened out.
  shift  : her other three seasons = her light pair of that season (palettes_season.json) moved by exactly how much her
           drawn root is deeper than her root code, per role (main / secondary): OKLCH ΔL and ΔC, same hue.
           A role whose drawn or code colour is white/ivory or grey (C < .045) carries no shift (white stays white; a grey
           root does not grey her other seasons — B19). Chroma never drops more than .015, never below .045 (B19).
  rules  : B20 kept except its tone line (L27): season = classify() (summer-warm Hạ allowed), main vs secondary contrast,
           no grey (B19), no royal yellow (B21), unique (main, sec) pair per person per season (check_unique gate ΔE2000 8,
           same-name pair = FAIL), her four seasons not look-alikes. A pair that breaks a rule or the gate moves to the
           nearest variant (hue ±8/16/24°, L ±.04/.08, C ±.02) that passes, else to another person's light pair of that
           season moved by HER offsets (nearest in hue to her own pair; flag from_pool); roots never move.
  grey   : 10 drawn roots are grey (s07 s11 s14 s19 s21 s25 s26 s30 s32 s44) — kept as drawn, flagged XAM (owner undecided).
Run: python3 dev/art/palettes3/deep86.py   (writes the json, prints a summary, runs the gate)
     python3 dev/art/palettes3/check_unique.py dev/art/face-common/palettes_season_deep.json"""
import json, os, sys, re, functools, itertools
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import colourlib
colourlib.oklab = functools.lru_cache(maxsize=None)(colourlib.oklab)
_ok = colourlib.oklch
colourlib.oklch = functools.lru_cache(maxsize=None)(lambda h: _ok(h))
from colourlib import *
from seasons import SEASONS, VN, classify, summer_warm, scores, side, metrics
from gen_palettes3 import contrast_ok, lookalike
from gen_seasons import season_contrast
from xuan_pink import lch2hex
from check_unique import consort_ids, pair_verdict, FAIL_DE

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
FC = os.path.join(ROOT, 'dev', 'art', 'face-common')
LIGHT = os.path.join(FC, 'palettes_season.json')
OUT = os.path.join(FC, 'palettes_season_deep.json')
GREY_ROOTS = ['s07', 's11', 's14', 's19', 's21', 's25', 's26', 's30', 's32', 's44']   # Foreman C ROOT-64 list (B19)
NOSHIFT_C = 0.045

def flat(h): return is_white(h) or oklch(h)[1] < NOSHIFT_C

def royal_yellow(h):
    L, C, H = oklch(h); return (80 <= H < 100 and C > 0.06) or dE(h, '#EFBD69') < 0.045

def shift(h, dL, dC):
    if is_white(h): return h
    L, C, H = oklch(h)
    L2 = min(max(L + dL, 0.30), 0.92); C2 = min(max(C + dC, NOSHIFT_C + 0.005), 0.17)
    return lch2hex(L2, C2, H)

def deep_name(n, dL):
    if dL > -0.10 or re.search(r'\b(deep|dark)\b', n): return n
    n2 = re.sub(r'^(pale|light|soft|powder|icy|misty|baby)\s+', '', n)
    return 'deep ' + n2

def rules_ok(se, m, s):
    """B20 without the tone line: season, contrast, no grey, no royal yellow"""
    for h in (m, s):
        if greyish(h) or royal_yellow(h): return False
    if not contrast_ok(m, s) or not season_contrast(m, s): return False
    if se == 'ha' and summer_warm(m, s): return True
    if classify(m, s) != se: return False
    sc = scores(m, s); a, b = side(m, s)
    if abs(sc[a] - sc[b]) < 0.10: return False
    if se == 'xuan': return metrics(m, s)['Cmax'] >= 0.07
    return True

def variants(h):
    """(hex, change cost) nearest first: hue ±8/16/24, L ±.04/.08, C ±.02"""
    if is_white(h): return [(h, 0.0)]
    L, C, H = oklch(h); out = {}
    for dh, dl, dc in itertools.product((0, -8, 8, -16, 16, -24, 24), (0, -0.04, 0.04, -0.08, 0.08), (0, -0.02, 0.02)):
        C2 = max(C + dc, NOSHIFT_C + 0.005); L2 = min(max(L + dl, 0.28), 0.93)
        h2 = lch2hex(L2, C2, (H + dh) % 360)
        if h2 not in out: out[h2] = dE(h, h2)
    return sorted(out.items(), key=lambda x: x[1])

def build():
    light = json.load(open(LIGHT)); cons, groups = consort_ids()
    order = [k for k in light if k in cons]; assert len(order) == 86, len(order)
    D, info = {}, {}
    for k in order:
        rs = light[k]['root_season']; code = light[k][rs]; drawn = code.get('root_drawn')
        r = drawn or code
        off = {}
        for role in ('main', 'sec'):
            c, d_ = code[role + '_hex'], r[role + '_hex']
            if flat(c) or flat(d_): off[role] = (0.0, 0.0)
            else:
                (Lc, Cc, _), (Ld, Cd, _) = oklch(c), oklch(d_); off[role] = (Ld - Lc, max(Cd - Cc, -0.015))
        D[k] = {'root_season': rs, 'group': groups[k]}
        info[k] = dict(off=off, nodrawn=not drawn, grey=k in GREY_ROOTS)
        for se in SEASONS:
            if se == rs:
                D[k][se] = dict(main=r['main'], main_hex=r['main_hex'], sec=r['sec'], sec_hex=r['sec_hex'], root=True,
                                root_code=dict(main=code['main'], main_hex=code['main_hex'], sec=code['sec'], sec_hex=code['sec_hex']))
                continue
            p = light[k][se]; o = {}
            for role in ('main', 'sec'):
                dL, dC = off[role]
                o[role] = deep_name(p[role], dL); o[role + '_hex'] = shift(p[role + '_hex'], dL, dC)
            o['light'] = dict(main_hex=p['main_hex'], sec_hex=p['sec_hex'])
            D[k][se] = o
    return order, D, info

def clashes(order, D, k, se, cand):
    n = 0
    for q in order:
        if q == k: continue
        if pair_verdict(cand, D[q][se])[0] == 'FAIL': n += 1 + (2 if D[q][se].get('root') else 0)
    return n

def own_ok(D, k, se, cand):
    return not any(lookalike((cand['main_hex'], cand['sec_hex']), (D[k][s2]['main_hex'], D[k][s2]['sec_hex']), 1)
                   for s2 in SEASONS if s2 != se)

POOL, pool_name, OFF = {}, {}, {}
def pool_cands(k, se):
    """every light pair of season se (all 86 people, root codes included), shifted by k's offsets; cost = hue / lightness
    distance to her own light pair of that season (recognisably hers)"""
    p = LIGHTD[k][se]; rm, rs_ = oklch(p['main_hex']), oklch(p['sec_hex']); out = []
    (dLm, dCm), (dLs, dCs) = OFF[k]['main'], OFF[k]['sec']
    for (mn, mh, sn, sh) in POOL[se]:
        m, s = shift(mh, dLm, dCm), shift(sh, dLs, dCs)
        pool_name[m] = deep_name(mn, dLm); pool_name[s] = deep_name(sn, dLs)
        a, b = oklch(mh), oklch(sh)
        hd = lambda x, y: min(abs(x - y) % 360, 360 - abs(x - y) % 360)
        cost = hd(a[2], rm[2]) / 60 + 0.35 * hd(b[2], rs_[2]) / 60 + 0.8 * abs(a[0] - rm[0])
        out.append((cost, m, s))
    return sorted(set(out))

def repair(order, D, moved):
    """move a non-root pair to its nearest variant that passes the rules and clears its gate clashes"""
    def bad(k, se):
        p = D[k][se]
        if p.get('root'): return False
        return not rules_ok(se, p['main_hex'], p['sec_hex']) or clashes(order, D, k, se, p) > 0 or not own_ok(D, k, se, p)
    for rnd in range(6):
        todo = [(k, se) for k in order for se in SEASONS if bad(k, se)]
        print(f'repair round {rnd}: {len(todo)} pairs to fix', flush=True)
        if not todo: break
        for k, se in todo:
            if not bad(k, se): continue
            p = D[k][se]; base_m, base_s = p['main_hex'], p['sec_hex']
            VM, VS = variants(base_m)[:60], variants(base_s)[:60]
            best = None
            cands = sorted(((cm + cs, m, s) for (m, cm) in VM for (s, cs) in VS), key=lambda x: x[0])[:1500]
            for cost, m, s in cands:
                if best and cost >= best[0]: break
                if not rules_ok(se, m, s): continue
                c = dict(p, main_hex=m, sec_hex=s)
                if not own_ok(D, k, se, c): continue
                n = clashes(order, D, k, se, c)
                sc = cost + 10 * n
                if best is None or sc < best[0]: best = (sc, c, n)
            if best is None or best[2] > 0:               # fallback: another person's light pair of this season, at her depth
                for cost, m, s in pool_cands(k, se):
                    if best and best[2] == 0 and cost + 3 >= best[0]: break
                    if not rules_ok(se, m, s): continue
                    c = dict(p, main=pool_name[m], sec=pool_name[s], main_hex=m, sec_hex=s, from_pool=True)
                    if not own_ok(D, k, se, c): continue
                    n = clashes(order, D, k, se, c); sc = 3 + cost + 10 * n
                    if best is None or sc < best[0]: best = (sc, c, n)
            if best:
                D[k][se] = best[1]; moved.add((k, se))
    return [(k, se) for k in order for se in SEASONS if bad(k, se)]

def main():
    order, D, info = build()
    global LIGHTD
    LIGHTD = json.load(open(LIGHT))
    for k in order:
        OFF[k] = info[k]['off']
        for se in SEASONS:
            p = LIGHTD[k][se]; POOL.setdefault(se, set()).add((p['main'], p['main_hex'], p['sec'], p['sec_hex']))
    moved = set(); left = repair(order, D, moved)
    for k, se in moved:
        D[k][se]['nudged'] = True
    rr = []                                               # root-root gate clashes (roots never move -> owner question)
    for se in SEASONS:
        R = [k for k in order if D[k][se].get('root')]
        for a, b in itertools.combinations(R, 2):
            v = pair_verdict(D[a][se], D[b][se])
            if v[0] == 'FAIL': rr.append((se, a, b, round(v[1], 1), round(v[2], 1), v[3]))
    out = {'_note': __doc__.split('Run:')[0].strip(), 'status': 'PROPOSAL (P3, owner Lượt 934)',
           '_flags': {'XAM_grey_root': GREY_ROOTS, 'NO_DRAWN_root_is_code': [k for k in order if info[k]['nodrawn']],
                     'root_root_gate_fails': rr, 'still_bad': left},
           '_offsets': {k: {r: [round(x, 3) for x in info[k]['off'][r]] for r in ('main', 'sec')} for k in order}}
    for k in order: out[k] = D[k]
    open(OUT, 'w').write(json.dumps(out, ensure_ascii=False, indent=1) + '\n')
    print('nudged pairs:', len(moved), '| still bad:', left, '| root-root FAILs:', rr)
    print('wrote', OUT)

if __name__ == '__main__':
    main()
