"""Owner Lượt 763 (B20, TOP): the season palette covers EXACTLY the 86 consort faces, each person a UNIQUE (main, secondary)
pair in every season (gate: check_unique.py). Brief: dev/handover/briefs/palette86-L763.md.
Steps (all in this one script, rules reused from seasons.py / gen_seasons.py / check_seasons.py — no new framework):
  roots   : s07–s45 root = the two colours of her approved drawn prompt (FACE_MAP_L703.json prompt_file), classified with
            seasons.classify; s46–s50 roots already drawn (Lượt 761, s_root_colours.json) — kept; s51–s61 (new, Lượt 761) get a
            root pair picked from colours ALREADY in the approved palette (Lượt 750/754: never self-picked), fitting her group,
            at the Xuân/Hạ tone level, no royal yellow, unique vs every other root in that season. Written to
            s_root_colours.json (read by gen_palettes3.load_p1 so check_seasons.py checks them); s51–s61 added to OWNER_GROUPS.
  move    : Kho / Công chúa / nc1–nc3 ids move unchanged to palettes_season_nonconsort.json.
  solve   : the 3 non-root seasons of the 55 new people are generated, and the non-root pairs of the 31 + s46–s50 are changed
            ONLY where a duplicate forces it, smallest change first (same name with a small hue / lightness shift, then
            another colour of the same family, then anything). Candidates = colours of the approved palette (all seasons,
            non-root) + small hue/lightness variants, kept only when they pass the check_seasons.py rules for that season
            (season rule, contrast, tone, no grey, no yellow, own-4 look-alike, neighbour rows, pair re-use) and the gate.
            Min-conflict local search; ★ roots never change.
Run: python3 dev/art/palettes3/palette86.py roots   (then)   python3 dev/art/palettes3/palette86.py solve
Then: check_unique.py, check_seasons.py, make_season_sheets_by_season.py --v86, make_v86_changes.py."""
import json, os, sys, random, re, math, functools, colorsys
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import colourlib
colourlib.oklab = functools.lru_cache(maxsize=None)(colourlib.oklab)
_ok = colourlib.oklch
colourlib.oklch = functools.lru_cache(maxsize=None)(lambda h: _ok(h))
from colourlib import *
from seasons import SEASONS, classify, target_ok, VN, summer_warm, temp
from gen_palettes3 import contrast_ok, lookalike, COOL_ONLY, WARM_ONLY
from gen_seasons import season_contrast, COOL_X, SEASON_SIDE
from xuan_pink import lch2hex, tone_ok
from check_unique import consort_ids, de2000, _lab, FAIL_DE, WARN_MAIN, WARN_SEC

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
FC = os.path.join(ROOT, 'dev', 'art', 'face-common')
PS = os.path.join(FC, 'palettes_season.json')
PS_OLD = os.path.join(os.path.dirname(__file__), 'palettes_season_L761.json')   # frozen copy of the approved file before Lượt 763 (input)
NONC = os.path.join(FC, 'palettes_season_nonconsort.json')
SROOT = os.path.join(FC, 's_root_colours.json')
GROUPS = os.path.join(FC, 'OWNER_GROUPS_L686.json')
NEW11 = {**{f's{i}': 'Kiêu kỳ' for i in range(51, 56)}, **{f's{i}': 'Quyến rũ' for i in range(56, 62)}}
LOG = []

def jload(p): return json.load(open(p))
def jsave(p, d): open(p, 'w').write(json.dumps(d, ensure_ascii=False, indent=1) + '\n')
def pid(d): return [k for k in d if not k.startswith('_') and k not in ('status', 'root_season_counts')]
def hsl(h):
    H, L, S = colorsys.rgb_to_hls(*hex2rgb(h)); return H * 360, L, S

def approved_colours(d0):
    """every (name, hex) of the approved palette (non-root slots, all seasons, all 92 people) — tone-unified colours"""
    cols = {}
    for k in pid(d0):
        for se in SEASONS:
            p = d0[k][se]
            for n, h in ((p['main'], p['main_hex']), (p['sec'], p['sec_hex'])):
                if not p.get('root') or tone_ok(h): cols[(n, h)] = 1
    return sorted(cols)

# ------------------------------------------------------------------ roots
def drawn_root(k):
    fm = jload(os.path.join(FC, 'FACE_MAP_L703.json'))[k]
    t = open(os.path.join(ROOT, fm['prompt_file'])).read()
    m = re.search(r'the MAIN colour (.+?) like (#[0-9A-Fa-f]{6})', t); s = re.search(r'the SECONDARY colour (.+?) like (#[0-9A-Fa-f]{6})', t)
    return dict(main=m.group(1), main_hex=m.group(2).upper(), sec=s.group(1), sec_hex=s.group(2).upper(), ver=fm['ver'],
                prompt=fm['prompt_file'])

def group_fit(grp, mh, sh):
    """0 = fits the look group well (brief rule 3), larger = worse; >= 2 = not allowed"""
    Hm = oklch(mh)[2]; Hs = oklch(sh)[2]; S = hsl(mh)[2]
    if grp == 'Kiêu kỳ':      # proud: rich jewel hues (violet / plum / sapphire / peacock / wine), soft tone
        f = 0 if 275 <= Hm < 345 else 0.2 if 215 <= Hm < 275 else 0.8 if (Hm >= 345 or Hm < 12) else 2
        f += 0.4 * (S < 0.35)
        f += 0 if (is_white(sh) or Hs >= 275 or Hs < 20 or 200 <= Hs < 275) else 0.4
        return f
    if grp == 'Quyến rũ':     # alluring: warm rose / coral mains, wine / plum / rose / ivory secondaries
        f = 0 if (Hm >= 350 or Hm < 35) else 0.3 if 320 <= Hm < 350 else 0.6 if 35 <= Hm < 55 else 2
        f += 0 if (is_white(sh) or Hs >= 300 or Hs < 25) else 0.3 if 220 <= Hs < 300 else 0.8
        return f
    return 0

def tone_level(h, role):
    """Xuân/Hạ tone level (owner Lượt 744/750): HSL L 0.62–0.75, S 0.30–0.50 — distance outside the box"""
    _, L, S = hsl(h)
    lo, hi = (0.62, 0.78) if role == 'm' else (0.46, 0.80)
    return max(0, lo - L, L - hi) * 10 + max(0, 0.28 - S, S - 0.55) * 6

def pick_new_roots(d0, roots):
    cols = [c for c in approved_colours(d0) if tone_ok(c[1]) and not greyish(c[1])]
    taken_names = {(r['main'], r['sec']) for r in roots.values()}
    chosen, usedn = {}, {}
    for r in roots.values(): usedn[r['main']] = usedn.get(r['main'], 0) + 1; usedn[r['sec']] = usedn.get(r['sec'], 0) + 1
    seas_cnt = {}
    for sid, grp in NEW11.items():
        best = None
        for m in cols:
            if tone_level(m[1], 'm') > 0.4: continue
            for s in cols:
                if s[0] == m[0] or (m[0], s[0]) in taken_names: continue
                mh, sh = m[1], s[1]
                if not (contrast_ok(mh, sh, None) and season_contrast(mh, sh)): continue
                rs = classify(mh, sh)
                if SEASON_SIDE[rs] == 'warm' and (m[0] in COOL_ONLY or s[0] in COOL_ONLY or m[0] in COOL_X or s[0] in COOL_X): continue
                if SEASON_SIDE[rs] == 'cool' and (m[0] in WARM_ONLY or s[0] in WARM_ONLY): continue
                gf = group_fit(grp, mh, sh)
                if gf >= 2: continue
                # unique vs every other root in that season (gate) and vs the other new roots
                bad = False
                for q in list(roots.values()) + list(chosen.values()):
                    if q['root_season'] != rs: continue
                    if max(de2000(mh, q['main_hex']), de2000(sh, q['sec_hex'])) < FAIL_DE + 2: bad = True; break
                if bad: continue
                c = gf + tone_level(mh, 'm') + 0.5 * tone_level(sh, 's') + 0.6 * usedn.get(m[0], 0) + 0.3 * usedn.get(s[0], 0)
                c += 0.5 * seas_cnt.get((grp, rs), 0) + 0.15 * abs(dE(mh, sh) - 0.22) / 0.05
                c += random.Random(sid + m[0] + s[0]).random() * 0.3            # deterministic tie-break / variety
                if best is None or c < best[0]: best = (c, m, s, rs)
        assert best, sid
        _, m, s, rs = best
        chosen[sid] = dict(main=m[0], main_hex=m[1], sec=s[0], sec_hex=s[1], root_season=rs)
        taken_names.add((m[0], s[0])); usedn[m[0]] = usedn.get(m[0], 0) + 1; usedn[s[0]] = usedn.get(s[0], 0) + 1
        seas_cnt[(grp, rs)] = seas_cnt.get((grp, rs), 0) + 1
    return chosen

def cmd_roots():
    d0 = jload(PS_OLD)
    sroot = jload(SROOT)
    roots = {}
    for k in pid(d0):
        rs = d0[k]['root_season']; p = d0[k][rs]
        roots[k] = dict(main=p['main'], main_hex=p['main_hex'], sec=p['sec'], sec_hex=p['sec_hex'], root_season=rs)
    for i in range(7, 46):
        k = f's{i:02d}'; r = drawn_root(k); rs = classify(r['main_hex'], r['sec_hex'])
        roots[k] = dict(r, root_season=rs)
        sroot[k] = dict(main=r['main'], main_hex=r['main_hex'], sec=r['sec'], sec_hex=r['sec_hex'], root_season=rs,
                        src=f"drawn colours of the approved {r['prompt'].split('/')[-1]} (owner Lượt 763: root = her current drawn colours)")
    cons, _ = consort_ids()
    roots = {k: v for k, v in roots.items() if k in cons}
    new = pick_new_roots(d0, roots)
    for k, v in new.items():
        sroot[k] = dict(v, src=f'Lượt 763 new {NEW11[k]} root, picked by palette86.py from approved palette colours')
    sroot['_note'] = ('root (★) pairs of the s-ids: s07–s45 = the colours of the approved drawn prompt (Lượt 763), s46–s50 '
                      '(Lượt 761) and s51–s61 (Lượt 763) chosen from the approved season palette colours (owner Lượt 750/760); '
                      'read by palettes3/gen_palettes3.load_p1')
    jsave(SROOT, sroot)
    g = jload(GROUPS)
    for k, grp in NEW11.items(): g[k] = grp
    jsave(GROUPS, g)
    for k, v in new.items():
        print(k, NEW11[k], VN[v['root_season']], v['main'], v['main_hex'], '+', v['sec'], v['sec_hex'],
              'HSL main L%.2f S%.2f' % hsl(v['main_hex'])[1:], 'sec L%.2f S%.2f' % hsl(v['sec_hex'])[1:])

# ------------------------------------------------------------------ solve
def lab_arr(hexes): return np.array([_lab(h) for h in hexes])

def de2000_np(A, B):
    """ΔE2000 between every row of A (n,3) and every row of B (m,3) -> (n,m)"""
    L1, a1, b1 = (A[:, i][:, None] for i in range(3)); L2, a2, b2 = (B[:, i][None, :] for i in range(3))
    C1, C2 = np.hypot(a1, b1), np.hypot(a2, b2); Cb = (C1 + C2) / 2
    G = 0.5 * (1 - np.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)))
    a1p, a2p = a1 * (1 + G), a2 * (1 + G)
    C1p, C2p = np.hypot(a1p, b1), np.hypot(a2p, b2)
    h1p = np.degrees(np.arctan2(b1, a1p)) % 360; h2p = np.degrees(np.arctan2(b2, a2p)) % 360
    dLp, dCp = L2 - L1, C2p - C1p
    dh = h2p - h1p; dh = np.where(dh > 180, dh - 360, np.where(dh < -180, dh + 360, dh)); dh = np.where(C1p * C2p == 0, 0, dh)
    dHp = 2 * np.sqrt(C1p * C2p) * np.sin(np.radians(dh / 2))
    Lbp, Cbp = (L1 + L2) / 2, (C1p + C2p) / 2
    s = h1p + h2p; ad = np.abs(h1p - h2p)
    hbp = np.where(ad <= 180, s / 2, np.where(s < 360, (s + 360) / 2, (s - 360) / 2)); hbp = np.where(C1p * C2p == 0, s, hbp)
    T = (1 - 0.17 * np.cos(np.radians(hbp - 30)) + 0.24 * np.cos(np.radians(2 * hbp)) + 0.32 * np.cos(np.radians(3 * hbp + 6))
         - 0.20 * np.cos(np.radians(4 * hbp - 63)))
    dth = 30 * np.exp(-(((hbp - 275) / 25) ** 2)); RC = 2 * np.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7))
    SL = 1 + 0.015 * (Lbp - 50) ** 2 / np.sqrt(20 + (Lbp - 50) ** 2); SC = 1 + 0.045 * Cbp; SH = 1 + 0.015 * Cbp * T
    RT = -np.sin(np.radians(2 * dth)) * RC
    return np.sqrt((dLp / SL) ** 2 + (dCp / SC) ** 2 + (dHp / SH) ** 2 + RT * (dCp / SC) * (dHp / SH))

def variants(n, h, steps):
    L, C, H = oklch(h); out = [(n, h)]
    for dl in steps[0]:
        for dh in steps[1]:
            if dl == 0 and dh == 0: continue
            h2 = lch2hex(min(0.92, max(0.46, L + dl)), C, (H + dh) % 360)
            if family(h2) == family(h) and tone_ok(h2) and is_white(h2) == is_white(h): out.append((n, h2))
    return out

def pair_static_ok(se, m, s):
    if m[0] == s[0]: return False
    side = SEASON_SIDE[se]
    if side == 'warm' and (m[0] in COOL_ONLY or s[0] in COOL_ONLY or m[0] in COOL_X or s[0] in COOL_X): return False
    if side == 'cool' and (m[0] in WARM_ONLY or s[0] in WARM_ONLY): return False
    if not (tone_ok(m[1]) and tone_ok(s[1])): return False
    if not season_contrast(m[1], s[1]): return False
    if not contrast_ok(m[1], s[1], 0.0): return False            # the p1-clause, smallest need; person need checked later
    return target_ok(se, m[1], s[1])

def need_of(root): return max(0.12, min(0.7 * dE(root['main_hex'], root['sec_hex']), 0.14))

class Cands:
    """valid pairs of one season: arrays for vectorised cost / conflicts"""
    def __init__(self, se, pairs):
        self.se, self.pairs = se, pairs
        mh = [p[0][1] for p in pairs]; sh = [p[1][1] for p in pairs]
        self.mL = np.array([oklch(h)[0] for h in mh]); self.mH = np.array([oklch(h)[2] for h in mh])
        self.sL = np.array([oklch(h)[0] for h in sh]); self.sH = np.array([oklch(h)[2] for h in sh])
        self.dEms = np.array([dE(a, b) for a, b in zip(mh, sh)])
        self.pink = np.array([(oklch(h)[2] >= 345 or oklch(h)[2] <= 30) and not is_white(h) for h in mh])
        self.warmha = np.array([summer_warm(a, b) for a, b in zip(mh, sh)]) if se == 'ha' else None

def hue_d(a, b):
    x = np.abs(a - b) % 360; return np.minimum(x, 360 - x)

def cmd_solve(seed=1, iters=60000):
    rnd = random.Random(seed)
    d0 = jload(PS_OLD); sroot = jload(SROOT)
    cons, groups = consort_ids()
    old_ids = pid(d0)
    order = [k for k in old_ids if k in cons and not k.startswith('s')] + sorted([k for k in cons if k.startswith('s')])
    assert len(order) == 86 and set(order) == set(cons), (len(order), set(cons) ^ set(order))
    existing = {k for k in old_ids if k in cons}
    roots = {}
    for k in order:
        if k in sroot: r = sroot[k]; rs = r['root_season']
        else: rs = d0[k]['root_season']; r = d0[k][rs]
        roots[k] = dict(main=r['main'], main_hex=r['main_hex'], sec=r['sec'], sec_hex=r['sec_hex'], root_season=rs)
        assert classify(r['main_hex'], r['sec_hex']) == rs, k
    # ---- candidate pools
    base = approved_colours(d0)
    pool = []
    for n, h in base: pool += variants(n, h, ((-0.035, 0, 0.035), (-7, 0, 7)))
    pool = sorted(set(pool))
    cands = {}
    for se in SEASONS:
        mains = [c for c in pool if not is_white(c[1]) or True]
        prs = [(m, s) for m in mains for s in pool if pair_static_ok(se, m, s)]
        cands[se] = Cands(se, prs)
        print(f'{VN[se]}: {len(prs)} valid pairs from {len(pool)} colours', flush=True)
    # ---- variables: (person, season) not root
    cur = {k: {} for k in order}
    for k in order:
        rs = roots[k]['root_season']
        cur[k][rs] = dict(roots[k], root=True); cur[k][rs].pop('root_season')
        if k in existing:
            for se in SEASONS:
                if se != rs: cur[k][se] = {x: d0[k][se][x] for x in ('main', 'main_hex', 'sec', 'sec_hex')}
    VARS = [(k, se) for k in order for se in SEASONS if se != roots[k]['root_season']]
    # per-variable candidate list (indices into cands[se].pairs) + cost
    vc = {}
    for k, se in VARS:
        C = cands[se]; r = roots[k]; need = need_of(r)
        rL, rH = oklch(r['main_hex'])[0], oklch(r['main_hex'])[2]; rsH = oklch(r['sec_hex'])[2]
        ok = C.dEms >= need
        # recognisably hers (gen_seasons.cost) + season character
        cost = hue_d(C.mH, rH) / 60.0 + 0.8 * np.abs(C.mL - rL) + 0.35 * hue_d(C.sH, rsH) / 60.0
        if se == 'xuan': cost = cost - 0.45 * C.pink
        if se == 'ha': cost = cost - 0.25 * C.warmha
        if k in existing:
            o = d0[k][se]
            om, os_ = o['main_hex'], o['sec_hex']
            chg = []
            for i, (m, s) in enumerate(C.pairs):
                cm = 0 if m == (o['main'], om) else (0.6 + 8 * dE(m[1], om) if m[0] == o['main'] else
                                                     (2.5 + 6 * dE(m[1], om) if family(m[1]) == family(om) else 6 + 6 * dE(m[1], om)))
                cs = 0 if s == (o['sec'], os_) else (0.6 + 8 * dE(s[1], os_) if s[0] == o['sec'] else
                                                    (2.5 + 6 * dE(s[1], os_) if family(s[1]) == family(os_) else 6 + 6 * dE(s[1], os_)))
                chg.append(cm + cs)
            cost = np.array(chg) * 3 + 0.05 * cost          # smallest change dominates
            # make sure the current pair is a candidate even if it is not in the pool
            if (o['main'], om) not in [p[0] for p in C.pairs[:0]]:
                pass
        idx = np.where(ok)[0]
        idx = idx[np.argsort(cost[idx])][:700]
        vc[(k, se)] = (idx, cost[idx])
    # ---- conflict evaluation
    pos = {k: i for i, k in enumerate(order)}
    def pal_of(k, se): return cur[k].get(se)
    namepair_use = {}
    def np_add(k, se, p, s=1):
        key = (p['main'], p['sec']); namepair_use.setdefault(key, {}); u = namepair_use[key]
        u[(k, se)] = u.get((k, se), 0) + s
        if u[(k, se)] <= 0: u.pop((k, se))
    def assign(k, se, p):
        old = cur[k].get(se)
        if old: np_add(k, se, old, -1)
        cur[k][se] = p; np_add(k, se, p, 1)
    for k in order:
        for se, p in cur[k].items(): np_add(k, se, p, 1)
    def conflicts_for(k, se, idx):
        """hard (FAIL-level) and soft (WARN) conflict counts of candidates idx for variable (k, se)"""
        C = cands[se]; i = pos[k]
        others = [q for q in order if q != k and se in cur[q]]
        oM = lab_arr([cur[q][se]['main_hex'] for q in others]); oS = lab_arr([cur[q][se]['sec_hex'] for q in others])
        mh = [C.pairs[j][0][1] for j in idx]; sh = [C.pairs[j][1][1] for j in idx]
        dm = de2000_np(lab_arr(mh), oM); ds = de2000_np(lab_arr(sh), oS)
        names = [(cur[q][se]['main'], cur[q][se]['sec']) for q in others]
        hard = (np.maximum(dm, ds) < FAIL_DE).sum(1).astype(float)
        soft = ((dm < WARN_MAIN) & (ds < WARN_SEC)).sum(1).astype(float)
        nset = {}
        for t, nm in enumerate(names): nset.setdefault(nm, []).append(others[t])
        for t, j in enumerate(idx):
            m, s = C.pairs[j]
            if (m[0], s[0]) in nset: hard[t] += 1
            # check_seasons pair re-use over all seasons: at most twice, >= 10 rows apart
            u = [x for x in namepair_use.get((m[0], s[0]), {}) if x != (k, se)]
            if u and (len(u) >= 2 or any(abs(pos[x[0]] - i) < 10 for x in u)): hard[t] += 1
            # neighbour rows (check_seasons): share main with next row; look-alike within 2 rows
            for jj in (i - 2, i - 1, i + 1, i + 2):
                if not (0 <= jj < len(order)): continue
                q = cur[order[jj]].get(se)
                if not q: continue
                g = abs(jj - i)
                if g == 1 and q['main'] == m[0]: hard[t] += 1
                if lookalike((m[1], s[1]), (q['main_hex'], q['sec_hex']), g): hard[t] += 1
            for s2, q in cur[k].items():
                if s2 != se and lookalike((m[1], s[1]), (q['main_hex'], q['sec_hex']), 1): hard[t] += 1
        return hard, soft
    def var_hard(k, se):
        p = cur[k][se]; C = cands[se]
        j = C.index.get((( p['main'], p['main_hex']), (p['sec'], p['sec_hex'])))
        if j is None: return 99
        h, s = conflicts_for(k, se, np.array([j])); return h[0] + 0.0 * s[0]
    for se in SEASONS: cands[se].index = {p: j for j, p in enumerate(cands[se].pairs)}
    # existing palettes not representable in the pool: add them to the candidate list
    for (k, se) in VARS:
        if k in existing:
            p = cur[k][se]; key = ((p['main'], p['main_hex']), (p['sec'], p['sec_hex']))
            C = cands[se]
            if key not in C.index:
                C.pairs.append(key); C.index[key] = len(C.pairs) - 1
                idx, cst = vc[(k, se)]; vc[(k, se)] = (np.append(idx, len(C.pairs) - 1), np.append(cst, 0.0))
    # ---- initial greedy for new variables
    for k, se in VARS:
        if se in cur[k]: continue
        idx, cst = vc[(k, se)]
        h, s = conflicts_for(k, se, idx)
        t = int(np.argmin(h * 100 + s * 2 + cst))
        m, sp = cands[se].pairs[idx[t]]
        assign(k, se, dict(main=m[0], main_hex=m[1], sec=sp[0], sec_hex=sp[1]))
    # ---- min-conflict local search
    def all_conf():
        bad = []
        for k, se in VARS:
            if var_hard(k, se) > 0: bad.append((k, se))
        return bad
    bad = all_conf(); print('after greedy: conflicted variables', len(bad), flush=True)
    it = 0; best_n = len(bad); tabu = {}
    while bad and it < iters:
        it += 1
        k, se = rnd.choice(bad)
        idx, cst = vc[(k, se)]
        h, s = conflicts_for(k, se, idx)
        score = h * 100 + s * 2 + cst + np.array([rnd.random() * 0.5 for _ in idx])
        for t, j in enumerate(idx):
            if tabu.get((k, se, j), -1) > it: score[t] += 50
        t = int(np.argmin(score))
        m, sp = cands[se].pairs[idx[t]]
        old = cur[k][se]; oj = cands[se].index.get(((old['main'], old['main_hex']), (old['sec'], old['sec_hex'])))
        if oj is not None: tabu[(k, se, oj)] = it + 15
        assign(k, se, dict(main=m[0], main_hex=m[1], sec=sp[0], sec_hex=sp[1]))
        if it % 25 == 0:
            bad = all_conf()
            if len(bad) < best_n: best_n = len(bad)
            if it % 500 == 0: print('iter', it, 'conflicted', len(bad), flush=True)
        else:
            bad = [b for b in bad if b != (k, se)] + ([(k, se)] if h[t] > 0 else [])
            # neighbours of the change may now be in conflict: re-evaluated every 25 iterations
    bad = all_conf()
    print('final conflicted variables:', len(bad), bad[:20])
    # ---- soft pass: reduce WARNs where free (no new hard conflict, small cost)
    for rep in range(2):
        for k, se in VARS:
            idx, cst = vc[(k, se)]
            h, s = conflicts_for(k, se, idx)
            p = cur[k][se]; j0 = cands[se].index[((p['main'], p['main_hex']), (p['sec'], p['sec_hex']))]
            t0 = int(np.where(idx == j0)[0][0]) if j0 in idx else None
            if t0 is None or s[t0] == 0 or h[t0] > 0: continue
            score = h * 100 + s * 2 + cst
            t = int(np.argmin(score))
            if score[t] < score[t0] - 0.5:
                m, sp = cands[se].pairs[idx[t]]
                assign(k, se, dict(main=m[0], main_hex=m[1], sec=sp[0], sec_hex=sp[1]))
    return order, roots, cur, existing, d0

def root_adjust(rs, p):
    """advisory root_tone_adjusted, same rule as tone_unify.py"""
    TGT = {'main_hex': dict(cap=0.095, floor=0.70), 'sec_hex': dict(cap=0.100, floor=0.64)}
    DEEP_MAX = {'thu': 0.63, 'dong': 0.575}
    adj = {}; darker = min(('main_hex', 'sec_hex'), key=lambda r: oklch(p[r])[0])
    for r in TGT:
        h = p[r]; L, C, H = oklch(h)
        if is_white(h): continue
        C2 = min(C, TGT[r]['cap']); L2 = max(L, TGT[r]['floor'])
        if rs in DEEP_MAX and r == darker: L2 = min(L2, max(L, DEEP_MAX[rs]))
        if dE(h, lch2hex(L2, C2, H)) >= 0.015: adj[r] = lch2hex(L2, C2, H)
    if not adj: return None
    return dict(main_hex=adj.get('main_hex', p['main_hex']), sec_hex=adj.get('sec_hex', p['sec_hex']),
                note='advisory only (owner Lượt 744/757): same hue at the Xuân/Hạ tone level; main_hex / sec_hex above stay '
                     'the approved / drawn colours (base pictures are NOT redrawn)')

def cmd_write(order, roots, cur, existing, d0):
    cons, groups = consort_ids()
    out = {'_note': ('B20 (owner Lượt 616; coverage owner Lượt 763): one palette per season for EXACTLY the 86 consort faces '
                     '(OWNER_GROUPS_L686.json minus Kho / Công chúa), each person a UNIQUE (main, secondary) pair in every season '
                     '(gate dev/art/palettes3/check_unique.py). root (★) = approved palette (m_colours_proposed.json FINAL / '
                     'c_rank_colours.json) or, for s07–s45, the colours of her approved drawn prompt; s46–s61 roots from '
                     's_root_colours.json (picked from approved palette colours). Other 3 seasons: gen_seasons.py rules, built '
                     'for the 86 by palette86.py (existing pairs changed only to break a duplicate). Kho / Công chúa / nc1–nc3 '
                     'moved unchanged to palettes_season_nonconsort.json. No royal yellow (B21). PROPOSAL — not wired into build.py.'),
           'status': 'PROPOSAL'}
    out['root_season_counts'] = {VN[s]: sum(1 for k in order if roots[k]['root_season'] == s) for s in SEASONS}
    for x in ('_note_xuan', '_note_tone', '_note_ha'): out[x] = d0[x]
    changes = []
    for k in order:
        rs = roots[k]['root_season']; e = {'root_season': rs}
        for se in [rs] + [s for s in SEASONS if s != rs]:
            p = dict(cur[k][se])
            if se == rs:
                p = {x: roots[k][x] for x in ('main', 'main_hex', 'sec', 'sec_hex')}; p['root'] = True
                if k in existing and 'root_tone_adjusted' in d0[k][rs]: p['root_tone_adjusted'] = d0[k][rs]['root_tone_adjusted']
                elif k not in existing:
                    a = root_adjust(rs, p)
                    if a: p['root_tone_adjusted'] = a
            elif k in existing:
                o = d0[k][se]
                if any(o[x] != p[x] for x in ('main', 'main_hex', 'sec', 'sec_hex')):
                    changes.append(dict(id=k, season=se, old={x: o[x] for x in ('main', 'main_hex', 'sec', 'sec_hex')},
                                        new={x: p[x] for x in ('main', 'main_hex', 'sec', 'sec_hex')}))
            e[se] = p
        out[k] = e
    jsave(PS, out)
    nonc = {'_note': ('Kho / Công chúa / nc1–nc3 season palettes, moved UNCHANGED out of palettes_season.json by palette86.py '
                      '(owner Lượt 763: the season palette covers only the 86 consorts; princesses get colours later).'),
            'status': 'PARKED'}
    for k in pid(d0):
        if k not in cons: nonc[k] = d0[k]
    jsave(NONC, nonc)
    jsave(os.path.join(os.path.dirname(__file__), 'palette86_changes.json'), changes)
    print(len(changes), 'changed non-root pairs of existing people;', len(nonc) - 2, 'ids moved to nonconsort file')

if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'solve'
    if cmd == 'roots': cmd_roots()
    elif cmd == 'solve':
        res = cmd_solve(seed=int(sys.argv[2]) if len(sys.argv) > 2 else 1)
        cmd_write(*res)
