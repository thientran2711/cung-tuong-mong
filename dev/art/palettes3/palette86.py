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
from seasons import SEASONS, classify, target_ok, VN, summer_warm, temp, in_tone, tone_lift, scores
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

# ------------------------------------------------------------------ one tone (owner Lượt 769) + root codes (Lượt 770)
GREYWORD = [((200, 275), 'blue'), ((275, 330), 'lilac'), ((130, 200), 'green'), ((330, 400), 'rose'), ((0, 30), 'rose'), ((30, 130), 'beige')]
def lift_named(n, h, role):
    """the colour brought into the one tone; name kept, or 'deep/dark X' -> 'soft X', 'grey' -> its hue word (B19)"""
    if in_tone(h, role): return n, h
    h2 = tone_lift(h, role)
    if dE(h, h2) < 0.015: return n, h2
    n2 = n
    for w in ('deep ', 'dark '):
        if n2.startswith(w): n2 = 'soft ' + n2[len(w):]
    if 'grey' in n2 or 'gray' in n2:
        H = oklch(h2)[2]; word = next(w for (a, b), w in GREYWORD if a <= H < b or a <= H + 360 < b)
        n2 = n2.replace('grey-', '').replace('gray-', '').replace('grey', word).replace('gray', word)
    if n2 == n and not n2.startswith(('soft', 'pale', 'light', 'clear', 'cool', 'warm', 'ice', 'icy')) and oklch(h2)[0] - oklch(h)[0] > 0.04:
        n2 = 'soft ' + n2
    return n2, h2

def lifted_pair(r):
    mn, mh = lift_named(r['main'], r['main_hex'], 'm'); sn, sh = lift_named(r['sec'], r['sec_hex'], 's')
    return dict(main=mn, main_hex=mh, sec=sn, sec_hex=sh)

def current_roots():
    """per consort: drawn pair (picture), current code (before this run), lifted base code"""
    d0 = jload(PS_OLD); sroot = jload(SROOT); cons, _ = consort_ids()
    out = {}
    for k in cons:
        if k in sroot:
            r = sroot[k]; cur = {x: r[x] for x in ('main', 'main_hex', 'sec', 'sec_hex')}
            dr = r.get('root_old') or r.get('root_drawn') or (None if k in NEW11 else cur)
        else:
            rs = d0[k]['root_season']; p = d0[k][rs]; cur = {x: p[x] for x in ('main', 'main_hex', 'sec', 'sec_hex')}; dr = cur
        out[k] = dict(drawn=dr, cur=cur, base=lifted_pair(cur))
    return out

def cmd_roots2():
    """Lượt 769/770: the 11 new roots must be in the one tone; re-pick from tone-lifted approved colours, unique vs the
    lifted roots of everybody else (gate margin +2)."""
    d0 = jload(PS_OLD); R = current_roots(); sroot = jload(SROOT)
    others = {}
    for k, r in R.items():
        if k in NEW11: continue
        b = r['base']; others[k] = dict(b, root_season=classify(b['main_hex'], b['sec_hex']))
    cols = sorted({lift_named(n, h, 'm') for n, h in approved_colours(d0)} | {lift_named(n, h, 's') for n, h in approved_colours(d0)})
    seen, cols2 = set(), []
    for c in cols:                                   # one name per hex (lifting can merge two colours)
        if c[1] not in seen and not greyish(c[1]): seen.add(c[1]); cols2.append(c)
    cols = cols2
    taken = {(r['main'], r['sec']) for r in others.values()}
    usedn = {}
    for r in others.values():
        for n in (r['main'], r['sec']): usedn[n] = usedn.get(n, 0) + 1
    chosen, seas_cnt = {}, {}
    for sid, grp in NEW11.items():
        prev = sroot[sid]; pl = lifted_pair(prev); best = None
        for m in cols:
            if not in_tone(m[1], 'm'): continue
            for s_ in cols:
                if s_[0] == m[0] or (m[0], s_[0]) in taken or not in_tone(s_[1], 's'): continue
                mh, sh = m[1], s_[1]
                if not (contrast_ok(mh, sh, None) and season_contrast(mh, sh)): continue
                rs = classify(mh, sh)
                if SEASON_SIDE[rs] == 'warm' and (m[0] in COOL_ONLY or s_[0] in COOL_ONLY or m[0] in COOL_X or s_[0] in COOL_X): continue
                if SEASON_SIDE[rs] == 'cool' and (m[0] in WARM_ONLY or s_[0] in WARM_ONLY): continue
                sc = scores(mh, sh); a, b = (('xuan', 'thu') if rs in ('xuan', 'thu') else ('ha', 'dong'))
                if not summer_warm(mh, sh) and abs(sc[a] - sc[b]) < 0.10: continue
                gf = group_fit(grp, mh, sh)
                if gf >= 2: continue
                if any(q['root_season'] == rs and max(de2000(mh, q['main_hex']), de2000(sh, q['sec_hex'])) < FAIL_DE + 2
                       for q in list(others.values()) + list(chosen.values())): continue
                c = gf + 0.6 * usedn.get(m[0], 0) + 0.3 * usedn.get(s_[0], 0) + 0.5 * seas_cnt.get((grp, rs), 0)
                c += 12 * dE(mh, pl['main_hex']) + 8 * dE(sh, pl['sec_hex'])          # stay close to the first pick (F1 prompts)
                c += 0.15 * abs(dE(mh, sh) - 0.20) / 0.05
                if best is None or c < best[0]: best = (c, m, s_, rs)
        assert best, sid
        _, m, s_, rs = best
        chosen[sid] = dict(main=m[0], main_hex=m[1], sec=s_[0], sec_hex=s_[1], root_season=rs)
        taken.add((m[0], s_[0])); seas_cnt[(grp, rs)] = seas_cnt.get((grp, rs), 0) + 1
        for n in (m[0], s_[0]): usedn[n] = usedn.get(n, 0) + 1
    for sid, v in chosen.items():
        old = {x: sroot[sid][x] for x in ('main', 'main_hex', 'sec', 'sec_hex')}
        if old != {x: v[x] for x in old}: sroot[sid]['root_prev_L763'] = old
        sroot[sid].update(v); sroot[sid]['src'] = (f'Lượt 763 new {NEW11[sid]} root, picked by palette86.py from approved palette '
                                                   'colours; re-picked in the one Xuân/Hạ tone (owner Lượt 769)')
        print(sid, NEW11[sid], VN[v['root_season']], f"{old['main']} {old['main_hex']} + {old['sec']} {old['sec_hex']}  ->  "
              f"{v['main']} {v['main_hex']} + {v['sec']} {v['sec_hex']}")
    jsave(SROOT, sroot)

# ------------------------------------------------------------------ solve (one tone, roots as variables)
def lab_arr(hexes): return np.array([_lab(h) for h in hexes]).reshape(-1, 3)

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
    sm = h1p + h2p; ad = np.abs(h1p - h2p)
    hbp = np.where(ad <= 180, sm / 2, np.where(sm < 360, (sm + 360) / 2, (sm - 360) / 2)); hbp = np.where(C1p * C2p == 0, sm, hbp)
    T = (1 - 0.17 * np.cos(np.radians(hbp - 30)) + 0.24 * np.cos(np.radians(2 * hbp)) + 0.32 * np.cos(np.radians(3 * hbp + 6))
         - 0.20 * np.cos(np.radians(4 * hbp - 63)))
    dth = 30 * np.exp(-(((hbp - 275) / 25) ** 2)); RC = 2 * np.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7))
    SL = 1 + 0.015 * (Lbp - 50) ** 2 / np.sqrt(20 + (Lbp - 50) ** 2); SC = 1 + 0.045 * Cbp; SH = 1 + 0.015 * Cbp * T
    RT = -np.sin(np.radians(2 * dth)) * RC
    return np.sqrt((dLp / SL) ** 2 + (dCp / SC) ** 2 + (dHp / SH) ** 2 + RT * (dCp / SC) * (dHp / SH))

def variants(n, h, role, dls=(-0.03, 0, 0.03), dhs=(-7, 0, 7)):
    L, C, H = oklch(h); out = {(n, h)}
    for dl in dls:
        for dh in dhs:
            h2 = lch2hex(L + dl, C, (H + dh) % 360)
            if in_tone(h2, role) and family(h2) == family(h) and is_white(h2) == is_white(h): out.add((n, h2))
    return out

def dedupe(cols):
    seen, out = set(), []
    for c in sorted(cols):
        if c[1] not in seen and not greyish(c[1]): seen.add(c[1]); out.append(c)
    return out

def pair_static_ok(se, m, s, need=0.12):
    if m[0] == s[0]: return False
    sd = SEASON_SIDE[se]
    if sd == 'warm' and (m[0] in COOL_ONLY or s[0] in COOL_ONLY or m[0] in COOL_X or s[0] in COOL_X): return False
    if sd == 'cool' and (m[0] in WARM_ONLY or s[0] in WARM_ONLY) and not (se == 'ha' and summer_warm(m[1], s[1])): return False
    if not (tone_ok(m[1]) and tone_ok(s[1]) and season_contrast(m[1], s[1])): return False
    if not contrast_ok(m[1], s[1], 0.0) or dE(m[1], s[1]) < need: return False
    return target_ok(se, m[1], s[1])

def need_of(r): return max(0.12, min(0.7 * dE(r['main_hex'], r['sec_hex']), 0.14))
def hue_d(a, b):
    x = np.abs(a - b) % 360; return np.minimum(x, 360 - x)
def key(p): return ((p['main'], p['main_hex']), (p['sec'], p['sec_hex']))
def pd(m, s): return dict(main=m[0], main_hex=m[1], sec=s[0], sec_hex=s[1])

def cmd_solve(seed=1, iters=20000):
    rnd = random.Random(seed)
    d0 = jload(PS_OLD); cons, groups = consort_ids(); R = current_roots()
    order = [k for k in pid(d0) if k in cons and not k.startswith('s')] + sorted(k for k in cons if k.startswith('s'))
    assert len(order) == 86
    existing = {k for k in pid(d0) if k in cons}
    base = {k: (R[k]['cur'] if k in NEW11 else R[k]['base']) for k in order}
    RS = {k: classify(base[k]['main_hex'], base[k]['sec_hex']) for k in order}
    for k in order: assert in_tone(base[k]['main_hex'], 'm') and in_tone(base[k]['sec_hex'], 's'), (k, base[k])
    # ---- pools: approved colours lifted into the tone (main / secondary role) + small variants
    appr = approved_colours(d0)
    M = dedupe(c for n, h in appr for c in variants(*lift_named(n, h, 'm'), 'm'))
    S = dedupe(c for n, h in appr for c in variants(*lift_named(n, h, 's'), 's'))
    cache = os.environ.get('P86_CACHE'); stat = json.load(open(cache)) if cache and os.path.exists(cache) else {}
    pairs = {}
    for se in SEASONS:
        pairs[se] = [(tuple(m), tuple(s)) for m, s in stat[se]] if se in stat else [(m, s) for m in M for s in S if pair_static_ok(se, m, s)]
        stat[se] = pairs[se]; print(f'{VN[se]}: {len(pairs[se])} valid pairs ({len(M)} mains, {len(S)} secondaries)', flush=True)
    if cache: json.dump(stat, open(cache, 'w'))
    arr = {}
    for se in SEASONS:
        P = pairs[se]
        arr[se] = dict(mH=np.array([oklch(m[1])[2] for m, s in P]), mL=np.array([oklch(m[1])[0] for m, s in P]),
                       sH=np.array([oklch(s[1])[2] for m, s in P]), dms=np.array([dE(m[1], s[1]) for m, s in P]),
                       pink=np.array([(oklch(m[1])[2] >= 345 or oklch(m[1])[2] <= 30) for m, s in P]),
                       warm=np.array([summer_warm(m[1], s[1]) for m, s in P]) if se == 'ha' else None)
    # ---- variables and candidate lists: vc[(k, se)] = (list of pair dicts, cost array)
    vc, cur = {}, {k: {} for k in order}
    for k in order:
        rs = RS[k]; b = base[k]
        cand = [dict(b)]; cost = [0.0]
        if k not in NEW11:            # a root code may move a little (same names, same season) to break a ROOT-ROOT clash
            for m in variants(b['main'], b['main_hex'], 'm', (-0.03, 0, 0.03), (-10, -5, 0, 5, 10)):
                for s_ in variants(b['sec'], b['sec_hex'], 's', (-0.03, 0, 0.03), (-10, -5, 0, 5, 10)):
                    if (m[1], s_[1]) == (b['main_hex'], b['sec_hex']): continue
                    if classify(m[1], s_[1]) != rs or not contrast_ok(m[1], s_[1], 0.0) or not season_contrast(m[1], s_[1]): continue
                    cand.append(pd(m, s_)); cost.append(25 + 100 * (dE(m[1], b['main_hex']) + dE(s_[1], b['sec_hex'])))
        vc[(k, rs)] = (cand, np.array(cost)); cur[k][rs] = dict(b, root=True)
        for se in SEASONS:
            if se == rs: continue
            P = pairs[se]; A = arr[se]; need = need_of(b)
            rL, rH, rsH = oklch(b['main_hex'])[0], oklch(b['main_hex'])[2], oklch(b['sec_hex'])[2]
            cost = hue_d(A['mH'], rH) / 60.0 + 0.8 * np.abs(A['mL'] - rL) + 0.35 * hue_d(A['sH'], rsH) / 60.0
            if se == 'xuan': cost = cost - 0.45 * A['pink']
            if se == 'ha': cost = cost - 0.25 * A['warm']
            if k in existing:
                ref = lifted_pair(d0[k][se])          # her old pair brought into the tone = the smallest possible change
                def ch(c, rn, rh):
                    if c == (rn, rh): return 0.0
                    e = dE(c[1], rh)
                    return 0.6 + 8 * e if c[0] == rn else (2.5 + 6 * e if family(c[1]) == family(rh) else 6 + 6 * e)
                cost = np.array([3 * (ch(m, ref['main'], ref['main_hex']) + ch(s_, ref['sec'], ref['sec_hex'])) for m, s_ in P]) + 0.05 * cost
            ok = np.where(A['dms'] >= need)[0]
            ok = ok[np.argsort(cost[ok], kind='stable')]
            keep, seen = list(ok[:250]), set()
            for j in ok:
                nm = (P[j][0][0], P[j][1][0])
                if nm not in seen: seen.add(nm); keep.append(j)
                if len(keep) >= 1100: break
            keep = sorted(set(keep), key=lambda j: cost[j])
            vc[(k, se)] = ([pd(*P[j]) for j in keep], cost[keep])
    VARS = [(k, se) for k in order for se in SEASONS]
    pos = {k: i for i, k in enumerate(order)}
    use = {}
    def np_add(k, se, p, sgn):
        u = use.setdefault((p['main'], p['sec']), {}); u[(k, se)] = u.get((k, se), 0) + sgn
        if u[(k, se)] <= 0: u.pop((k, se))
    def assign(k, se, p):
        if se in cur[k]: np_add(k, se, cur[k][se], -1)
        cur[k][se] = p; np_add(k, se, p, 1)
    def conf(k, se, cands):
        """hard / soft conflict counts for candidate pair dicts of variable (k, se)"""
        i = pos[k]; others = [q for q in order if q != k and se in cur[q]]
        oM = lab_arr([cur[q][se]['main_hex'] for q in others]); oS = lab_arr([cur[q][se]['sec_hex'] for q in others])
        dm = de2000_np(lab_arr([c['main_hex'] for c in cands]), oM); ds = de2000_np(lab_arr([c['sec_hex'] for c in cands]), oS)
        hard = (np.maximum(dm, ds) < FAIL_DE).sum(1).astype(float); soft = ((dm < WARN_MAIN) & (ds < WARN_SEC)).sum(1).astype(float)
        names = {}
        for q in others: names[(cur[q][se]['main'], cur[q][se]['sec'])] = 1
        isroot = cands[0].get('root', False) or se == RS[k]
        for t, c in enumerate(cands):
            nm = (c['main'], c['sec'])
            if nm in names: hard[t] += 1
            u = [x for x in use.get(nm, {}) if x != (k, se)]
            if u and not (isroot and all(cur[x[0]][x[1]].get('root') for x in u)) and (len(u) >= 2 or any(abs(pos[x[0]] - i) < 10 for x in u)): hard[t] += 1
            for jj in (i - 2, i - 1, i + 1, i + 2):
                if not 0 <= jj < len(order): continue
                q = cur[order[jj]].get(se)
                if not q or (isroot and q.get('root')): continue
                g = abs(jj - i)
                if g == 1 and q['main'] == c['main']: hard[t] += 1
                if lookalike((c['main_hex'], c['sec_hex']), (q['main_hex'], q['sec_hex']), g): hard[t] += 1
            for s2, q in cur[k].items():
                if s2 != se and lookalike((c['main_hex'], c['sec_hex']), (q['main_hex'], q['sec_hex']), 1): hard[t] += 1
        return hard, soft
    for k in order:
        for se, p in cur[k].items(): np_add(k, se, p, 1)
    for k, se in VARS:                                   # greedy start
        if se in cur[k]: continue
        cands, cost = vc[(k, se)]; h, so = conf(k, se, cands)
        assign(k, se, dict(cands[int(np.argmin(h * 100 + so * 2 + cost))]))
    def is_bad(k, se):
        h, so = conf(k, se, [dict(cur[k][se], root=(se == RS[k]))]); return h[0] > 0
    bad = [v for v in VARS if is_bad(*v)]; print('after greedy: conflicted variables', len(bad), flush=True)
    it, tabu = 0, {}
    while bad and it < iters:
        it += 1
        k, se = rnd.choice(bad); cands, cost = vc[(k, se)]
        h, so = conf(k, se, cands)
        score = h * 100 + so * 2 + cost + np.array([rnd.random() * 0.5 for _ in cands])
        for t, c in enumerate(cands):
            if tabu.get((k, se, c['main_hex'], c['sec_hex']), -1) > it: score[t] += 50
        t = int(np.argmin(score)); o = cur[k][se]
        tabu[(k, se, o['main_hex'], o['sec_hex'])] = it + 15
        p = dict(cands[t]);
        if se == RS[k]: p['root'] = True
        assign(k, se, p)
        if it % 25 == 0:
            bad = [v for v in VARS if is_bad(*v)]
            if it % 250 == 0: print('iter', it, 'conflicted', len(bad), flush=True)
        else:
            bad = [b for b in bad if b != (k, se)] + ([(k, se)] if h[t] > 0 else [])
    bad = [v for v in VARS if is_bad(*v)]
    print('final conflicted variables:', len(bad), bad[:20], flush=True)
    for rep in range(2):                                  # soft pass: fewer WARNs where free
        for k, se in VARS:
            cands, cost = vc[(k, se)]; h, so = conf(k, se, cands)
            o = cur[k][se]; t0 = next((t for t, c in enumerate(cands) if (c['main_hex'], c['sec_hex'], c['main'], c['sec']) ==
                                       (o['main_hex'], o['sec_hex'], o['main'], o['sec'])), None)
            if t0 is None or so[t0] == 0 or h[t0] > 0: continue
            sc = h * 100 + so * 2 + cost; t = int(np.argmin(sc))
            if sc[t] < sc[t0] - 0.5:
                p = dict(cands[t])
                if se == RS[k]: p['root'] = True
                assign(k, se, p)
    return order, RS, cur, existing, d0, R

def cmd_write(order, RS, cur, existing, d0, R):
    cons, groups = consort_ids(); sroot = jload(SROOT)
    out = {'_note': ('B20 (owner Lượt 616; coverage owner Lượt 763; one tone owner Lượt 769; root codes owner Lượt 770): one '
                     'palette per season for EXACTLY the 86 consort faces (OWNER_GROUPS_L686.json minus Kho / Công chúa), each '
                     'person a UNIQUE (main, secondary) pair in every season (gate dev/art/palettes3/check_unique.py, no '
                     'exemptions). ALL four seasons in the one Xuân/Hạ tone; a season = a group of colour families '
                     '(seasons.py). root (★) = her root code; root_drawn = the colours her existing picture was drawn with '
                     '(pictures are never redrawn, codes may change). Built by palette86.py (existing pairs changed only '
                     'where the tone or a duplicate forces it). Kho / Công chúa / nc1–nc3 moved unchanged to '
                     'palettes_season_nonconsort.json. No royal yellow (B21). PROPOSAL — not wired into build.py.'),
           'status': 'PROPOSAL'}
    out['root_season_counts'] = {VN[s]: sum(1 for k in order if RS[k] == s) for s in SEASONS}
    changes, rootch = [], []
    F = ('main', 'main_hex', 'sec', 'sec_hex')
    for k in order:
        rs = RS[k]; e = {'root_season': rs}
        for se in [rs] + [x for x in SEASONS if x != rs]:
            p = {x: cur[k][se][x] for x in F}
            if se == rs:
                p['root'] = True; dr = R[k]['drawn']
                if dr and any(dr[x] != p[x] for x in F): p['root_drawn'] = {x: dr[x] for x in F}
                if dr and any(dr[x] != p[x] for x in F) or (k in existing and d0[k]['root_season'] != rs):
                    rootch.append(dict(id=k, drawn=dr, old_season=d0[k]['root_season'] if k in existing else None, new=dict(p, season=rs)))
            elif k in existing:
                o = d0[k][se]
                if any(o[x] != p[x] for x in F):
                    changes.append(dict(id=k, season=se, old={x: o[x] for x in F}, new=dict(p)))
            e[se] = p
        out[k] = e
        if k.startswith('s'):
            r = sroot.setdefault(k, {}); dr = R[k]['drawn']
            if dr and any(dr[x] != e[rs][x] for x in F): r['root_drawn'] = {x: dr[x] for x in F}
            r.update({x: e[rs][x] for x in F}); r['root_season'] = rs
    jsave(PS, out); jsave(SROOT, sroot)
    nonc = {'_note': ('Kho / Công chúa / nc1–nc3 season palettes, moved UNCHANGED out of palettes_season.json by palette86.py '
                      '(owner Lượt 763: the season palette covers only the 86 consorts; princesses get colours later). '
                      'Old rules (before the one-tone rule of Lượt 769).'), 'status': 'PARKED'}
    for k in pid(d0):
        if k not in cons: nonc[k] = d0[k]
    jsave(NONC, nonc)
    jsave(os.path.join(os.path.dirname(__file__), 'palette86_changes.json'), dict(nonroot=changes, roots=rootch))
    print(len(changes), 'changed non-root pairs of existing people;', len(rootch), 'root code / season changes;',
          len(nonc) - 2, 'ids moved to the nonconsort file')

if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'solve'
    if cmd == 'roots': cmd_roots()
    elif cmd == 'roots2': cmd_roots2()
    elif cmd == 'solve': cmd_write(*cmd_solve(seed=int(sys.argv[2]) if len(sys.argv) > 2 else 1))
