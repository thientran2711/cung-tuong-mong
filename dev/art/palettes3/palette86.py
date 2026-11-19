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
    h2 = tone_lift(h, role)
    if h2 == h or dE(h, h2) < 0.015: return n, h
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

if __name__ == '__main__' and sys.argv[1:2] == ['roots2']:
    cmd_roots2()
