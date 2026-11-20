"""P4 round 4 — rule A31 (owner via ROOT-65: "Tại sao thu và hạ có chung màu xanh, cùng 1 người không được có màu giống nhau").
Within ONE person her 8 colours (4 seasons × main + phụ) must not look alike, every colour vs every other:
  FAIL  same hue family twice (colourlib.family: pink-rose, red-coral, orange-apricot, yellow, olive-yellowgreen, green,
        jade-bluegreen, teal-aqua, blue, indigo-violet, lilac-purple, plum-magenta, ivory)
  FAIL  ΔE2000 < 20 between any two
★ GỐC drawn pairs stay fixed (inside the root pair itself nothing is changed); the other 3 seasons move.
Everything else kept: season families (Xuân hồng/đỏ/lá xuân · Hạ cam/vàng · Thu autumn v2 · Đông lạnh), depth per season
(Xuân hơi đậm · Hạ giữ độ đậm · Thu hơi đậm · Đông nhạt), no grey/brown/old/royal yellow, unique pair per season across people.
Solver: per person (random order), depth-first search over her non-root seasons (Hạ, Thu, Xuân, Đông) through ranked candidate
pairs; a person who cannot fit keeps her least-bad pairs, flagged A31 with the reason (never silently broken).
Run: python3 dev/art/palettes3/four_season86_a31.py   (reads four_season86.py helpers; writes palettes_season_deep.json)"""
import json, os, sys, itertools, random
sys.path.insert(0, os.path.dirname(__file__))
import four_season86 as B
from colourlib import oklch, family
from check_unique import de2000, pair_verdict, run as gate_run

SE, VN, IDS, people = B.SE, B.VN, B.IDS, B.people
ORDER = ('ha', 'thu', 'xuan', 'dong')            # most constrained first
DE_MIN = 20.0

# Seasonal cool ACCENTS for the SECONDARY only (main always keeps the season's character). Needed because A31 leaves
# exactly 6 warm families for Hạ+Xuân+Thu (6 slots) — any root using pink/coral/green makes the person impossible.
ACCENT = {
    'xuan': [('wisteria lilac', [(0.85, 0.08, 305), (0.72, 0.12, 305), (0.58, 0.13, 305)]),     # tử đằng, spring
             ('spring sky blue', [(0.86, 0.07, 235), (0.73, 0.10, 235), (0.59, 0.11, 237)])],
    'ha':   [('sea turquoise', [(0.87, 0.08, 195), (0.75, 0.11, 195), (0.62, 0.11, 197)])],         # biển hè
    'thu':  [('peacock teal', [(0.84, 0.07, 200), (0.66, 0.10, 202), (0.52, 0.10, 205)]),
             ('autumn indigo', [(0.82, 0.07, 275), (0.62, 0.12, 275), (0.48, 0.13, 275)])],
    'dong': [],
}
ACC = {se: [{'name': n, 'sw': sw} for n, sw in v] for se, v in ACCENT.items()}


def fam_of(h):
    return family(h)


def cands_for(k, s):
    """ranked candidate pairs (cost, pal) for person k, season s"""
    r = people[k]['root']
    tm0, ts0 = B.t_of(oklch(r['main_hex'])[0]), B.t_of(oklch(r['sec_hex'])[0])
    tm, ts = max(0.0, tm0 + B.OFF[s]), max(0.0, ts0 + B.OFF[s])
    out, seen = [], set()
    combos = [(fm, fs, s, 0.0) for fm, fs in itertools.permutations(B.FAM[s], 2)]
    if s == 'ha':
        combos += [(fm, fs, 'thu', 1.0) for fm in B.FAM['ha'] for fs in B.BORROW]
    combos += [(fm, fs, s, 0.8) for fm in B.FAM[s] for fs in ACC[s]]
    grid = (0.0, 0.5, 1.0, 1.5, 2.0, 2.5)
    for fm, fs, ss, extra in combos:
        borrowed = extra == 1.0
        accent = fs in ACC[s]
        sc = B.pair_score(s, fm, fs, tm, ts) if not (borrowed or accent) else 0.4
        if sc is None and not borrowed: sc = 2.5          # allowed only as a later option
        base = sc + extra + 0.8 * B.ident(r['main_hex'], fm) + 0.5 * B.ident(r['sec_hex'], fs)
        variants = [(tm + dl, ts + dl, dh, 0.3 * abs(dl) / 0.15 + 0.05 * abs(dh) / 7)
                    for dh in (0, -7, 7, -14, 14) for dl in (0, -0.15, 0.15, -0.3, 0.3)]
        variants += [(a, b, 0, 1.2 + 0.8 * (abs(a - tm) + abs(b - ts))) for a in grid for b in grid
                     if abs(a - tm) > 0.35 or abs(b - ts) > 0.35]
        for a, b, dh, vc in variants:
            a, b = max(0.0, a), max(0.0, b)
            mh = B.fam_colour(s, fm, a, dh)
            sh = B.fam_colour(ss, fs, b, -dh)
            if (mh, sh) in seen: continue
            seen.add((mh, sh))
            if B.bad_colour(mh) or B.bad_colour(sh): continue
            if s == 'ha' and oklch(mh)[2] > 110: continue
            if s == 'ha' and not borrowed and not accent and oklch(sh)[2] > 110: continue
            if fam_of(mh) == fam_of(sh) or de2000(mh, sh) < DE_MIN: continue
            pal = {'main': B.nm(a, fm), 'main_hex': mh, 'sec': B.nm(b, fs), 'sec_hex': sh}
            if abs(a - tm) > 0.35: pal['main_depth_moved'] = f't {tm:.1f} -> {a:.1f}'
            if abs(b - ts) > 0.35: pal['sec_depth_moved'] = f't {ts:.1f} -> {b:.1f}'
            if accent: pal['sec_accent'] = f"A31: secondary is the {VN[s]} cool accent {fs['name']} (her warm families are all used)"
            if borrowed: pal['sec_borrowed'] = f"Hạ: secondary borrowed from {fs['name']} (main stays orange/yellow)"
            out.append((base + vc, pal))
    out.sort(key=lambda x: x[0])
    return out[:600]


def clash(pal, mine):
    """A31 problems of pal against her already chosen colours"""
    why = []
    for c in (pal['main_hex'], pal['sec_hex']):
        for x in mine:
            if fam_of(c) == fam_of(x): why.append(f'{c} same family {fam_of(c)} as {x}')
            elif de2000(c, x) < DE_MIN: why.append(f'{c} ΔE {de2000(c, x):.1f} to {x}')
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
    # most constrained people first: roots with many families used / Hạ roots
    fails = {}
    for k in order:
        todo = [s for s in ORDER if s != people[k]['root_season']]
        root = out[k][people[k]['root_season']]
        budget = [int(os.environ.get('BUDGET', 60000))]
        best = [None, 10 ** 9]

        def dfs(i, chosen, mine):
            if budget[0] <= 0: return None
            if i == len(todo): return dict(chosen)
            s = todo[i]; n = 0
            for cost, pal in C[(k, s)]:
                budget[0] -= 1
                if budget[0] <= 0: return None
                if clash(pal, mine): continue
                if any(pair_verdict(pal, q)[0] == 'FAIL' for q in placed[s]): continue
                chosen[s] = pal
                res = dfs(i + 1, chosen, mine + [pal['main_hex'], pal['sec_hex']])
                if res: return res
                del chosen[s]; n += 1
            return None

        res = dfs(0, {}, [root['main_hex'], root['sec_hex']])
        if not res:                                   # least-bad fill, flagged
            res, mine, why_all = {}, [root['main_hex'], root['sec_hex']], []
            for s in todo:
                bestp, bestw = None, None
                for cost, pal in C[(k, s)]:
                    w = clash(pal, mine)
                    if any(pair_verdict(pal, q)[0] == 'FAIL' for q in placed[s]): w = w + ['same pair as another person'] * 3
                    if bestw is None or len(w) < len(bestw): bestp, bestw = pal, w
                    if not w: break
                pal = dict(bestp)
                if bestw: pal['A31'] = 'CANNOT FIT: ' + '; '.join(bestw[:3]); why_all += [f'{VN[s]}: ' + x for x in bestw[:2]]
                res[s] = pal; mine += [pal['main_hex'], pal['sec_hex']]
            if why_all: fails[k] = why_all
        for s, pal in res.items():
            out[k][s] = pal; placed[s].append(pal)
    return out, fails


def main():
    C = {}
    for k in IDS:
        for s in SE:
            if s != people[k]['root_season']: C[(k, s)] = cands_for(k, s)
    print('candidates built', min(len(v) for v in C.values()), 'min per person-season')
    best, first = None, []
    seed = int(os.environ.get('SEED', 1))
    for it in range(int(os.environ.get('ITERS', 4))):
        out, fails = solve(seed, C, first)
        print('iter', it, 'people that cannot fit:', len(fails), sorted(fails))
        if best is None or len(fails) < len(best[1]): best = (out, fails, seed)
        if not fails: break
        first = sorted(fails) + [k for k in first if k not in fails]
    out, fails, seed = best
    OLD = B.OLD
    D = {'_note': __doc__ + f'\nseed {seed}. Thu families v2 + depth offsets {B.OFF} from four_season86.py.',
         'status': 'PROPOSAL (P4 round 4, A31) — owner verdict pending',
         '_accents_A31': {se: {n: [B.lch2hex(*x) for x in sw] for n, sw in v} for se, v in ACCENT.items()},
         '_thu_families_v2': {n: [B.lch2hex(*x) for x in sw] for n, sw in B.THU_V2},
         '_flags': {'s44_brown_root': people['s44']['flag'],
                    'root_changed_CU_MOI': [k for k in IDS if people[k]['changed']],
                    'A31_cannot_fit': fails}}
    for k in IDS:
        P = people[k]; e = {'root_season': P['root_season'], 'group': P['group']}
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
    json.dump(D, open(os.path.join(B.FC, 'palettes_season_deep.json'), 'w'), ensure_ascii=False, indent=1)
    gate_run(D, quiet=True)
    # A31 audit on the written file
    bad = {}
    for k in IDS:
        cols = [(s, r, D[k][s][r + '_hex']) for s in SE for r in ('main', 'sec')]
        for (s1, r1, a), (s2, r2, b) in itertools.combinations(cols, 2):
            if s1 == s2 and D[k][s1].get('root'): continue
            if fam_of(a) == fam_of(b) or de2000(a, b) < DE_MIN: bad.setdefault(k, []).append(f'{s1}.{r1}~{s2}.{r2}')
    print('A31 audit: people with a clash', len(bad), sorted(bad))
    for k, w in fails.items(): print(' ', k, w[:2])


if __name__ == '__main__':
    main()
