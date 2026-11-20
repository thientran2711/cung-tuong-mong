"""FRUITPET2 (ROOT-68 job b, 20/11): the other 3 season pairs of the 4 new consorts s62 s63 s64 (Dịu dàng) + s65 (Đoan trang)
by the P6 / A32 method (four_season86_a32_soft: same candidates cands_for, same tone band, same stylist judge, same forward-checking DFS),
with the 86 people of palettes_season_deep.json FIXED (nobody else moves). Root pair = s_root_colours.json (owner Lượt 1042), ★ root kept.
A31 (owner Lượt 991): no shared colour across one person's 8 colours; gate: pair_verdict vs every same-season pair (86 + the new ones placed before) = 0 FAIL.
Run: python3 dev/art/palettes3/add_s62_65.py  [--write]   (without --write only prints)."""
import json, os, sys, itertools
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('CAP', '40'); os.environ.setdefault('TOP', '3000')
import four_season86_a32_soft as P
A, B, people = P.A, P.B, P.people
NEW = {"s62": "Dịu dàng", "s63": "Dịu dàng", "s64": "Dịu dàng", "s65": "Đoan trang"}
FC = B.FC; FN = os.path.join(FC, 'palettes_season_deep.json')
SR = json.load(open(os.path.join(FC, 's_root_colours.json')))
D = json.load(open(FN))
for k, g in NEW.items():
    r = SR[k]; people[k] = {'id': k, 'group': g, 'root_season': r['root_season'], 'root': {x: r[x] for x in ('main', 'main_hex', 'sec', 'sec_hex')}, 'changed': None}
placed = {s: [D[k][s] for k in A.IDS if k in D and s in D[k]] for s in B.SE}
out = {}
for k in NEW:
    rr = [people[k]['root']['main_hex'], people[k]['root']['sec_hex']]
    todo = [s for s in A.ORDER if s != people[k]['root_season']]
    V, src = {}, {}
    for s in todo:   # P6 escalation pools (gate_fix): her group's candidates, then the WIDENED pool, then the FINE grid — all kept, in that order (DFS tries cands first)
        V[s], seen = [], set()
        for name, L in (('cands', [p for c, p in P.cands_for(k, s)]), ('widened', [p for c, p in P.widened(k, s)]), ('fine', [p for c, p in P.fine_pairs(k, s)])):
            for p in L:
                if (p['main_hex'], p['sec_hex']) in seen or A.clash(p, rr) or any(A.pair_verdict(p, q)[0] == 'FAIL' for q in placed[s]): continue
                seen.add((p['main_hex'], p['sec_hex'])); V[s].append(p)
        src[s] = 'cands+widened+fine'
    sols = P._fc_dfs(todo, V, rr, 1, int(os.environ.get('BUDGET', 600000)))
    print(k, 'pool per season:', {s: (src[s], len(V[s])) for s in todo})
    if not sols:   # same fallback as P6 solve(): gate 0 FAIL stays hard, take the pair with the FEWEST A31 clashes, mark 'A31': 'CANNOT FIT'
        allp = {s: [p for L in ([p for c, p in P.cands_for(k, s)], [p for c, p in P.widened(k, s, False)], [p for c, p in P.fine_pairs(k, s)]) for p in L
                    if not any(A.pair_verdict(p, q)[0] == 'FAIL' for q in placed[s])] for s in todo}
        tight = min(todo, key=lambda x: len(V[x]) if V[x] else -1)
        best = None
        for first in allp[tight][:400]:
            w0 = A.clash(first, rr)
            mine = rr + [first['main_hex'], first['sec_hex']]
            V2 = {x: [p for p in V[x] if not A.clash(p, mine)] for x in todo if x != tight}
            ss = P._fc_dfs([x for x in todo if x != tight], V2, mine, 1, 50000)
            if ss and (best is None or len(w0) < len(best[1])): best = ({**ss[0], tight: dict(first)}, w0)
            if best and len(best[1]) <= 1: break
        if not best: print(k, 'NO SOLUTION even with one clash'); continue
        best[0][tight]['A31'] = 'CANNOT FIT: ' + '; '.join(best[1][:3]); sols = [best[0]]
        print(k, 'A31 CANNOT FIT in', tight, best[1][:3])
    rs = people[k]['root_season']; e = {'root_season': rs, 'group': NEW[k], 'band': P.BAND[NEW[k]]['vi']}
    e[rs] = dict(people[k]['root']); e[rs]['root'] = True
    for s in B.SE:
        if s != rs: e[s] = sols[0][s]
    for s in B.SE: placed[s].append(e[s])
    out[k] = e
# checks: A31 inside each person, gate vs every same-season pair of everyone else
bad = 0; gfail = 0; a31 = {}
for k, e in out.items():
    cols = [(s, r, e[s][r + '_hex']) for s in B.SE for r in ('main', 'sec')]
    for (s1, r1, a), (s2, r2, b) in itertools.combinations(cols, 2):
        if s1 == s2 and e[s1].get('root'): continue
        if A.fam2(a) == A.fam2(b) or A.de2000(a, b) < A.de_need(a, b): print('A31', k, s1, r1, a, '~', s2, r2, b); bad += 1; a31.setdefault(k, []).append(f'{B.VN[s1]}.{r1} {a} ~ {B.VN[s2]}.{r2} {b}')
    for s in B.SE:
        others = [D[x][s] for x in A.IDS if x in D and x not in NEW] + [out[x][s] for x in out if x != k]
        for q in others:
            v = A.pair_verdict(e[s], q)[0]
            if v == 'FAIL': print('GATE FAIL', k, s, e[s]['main_hex'], e[s]['sec_hex'], 'vs', q['main_hex'], q['sec_hex']); gfail += 1
    print(k, NEW[k], '★' + e['root_season'], ' | '.join(f"{B.VN[s]}: {e[s].get('main_vi', e[s]['main'])} {e[s]['main_hex']} + {e[s].get('sec_vi', e[s]['sec'])} {e[s]['sec_hex']}" for s in B.SE))
print('new people', len(out), '/ 4 · gate FAIL', gfail, '· A31 clashes', bad, '(CANNOT FIT, as P6 kept 8:', sorted(a31), ')')
if '--write' in sys.argv and len(out) == 4 and not gfail:   # gate 0 FAIL hard; A31 cannot-fit allowed + flagged (same as P6's 8)
    for k, e in out.items(): e['stylist'] = P.stylist_line(k, {**D, **out}); D[k] = e
    for k, w in a31.items(): D['_flags'].setdefault('A31_cannot_fit', {})[k] = w
    D.setdefault('_flags', {})['s62_65_added'] = 'FRUITPET2 20/11: s62–s65 other 3 seasons by add_s62_65.py (P6 method, 86 people fixed); owner verdict pending'
    json.dump(D, open(FN, 'w'), ensure_ascii=False, indent=1); print('written', FN)
