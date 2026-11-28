#!/usr/bin/env python3
"""E-TIER-B14b (row 42, Foreman E C11 ruling Q1 «check each pick's RESULT rises with its cost»; law 2 TIERED CHOICES, owner OD 27/11 ~00:46Z):
after dev/tools/cseeds_tier.py some tiered sets still had steps rising 1 / 2 / 3 while the gain KIND did not rise on the rough audit scale
(a step × BAL.<fam>.fx[tier] × bạc ×0.1, Sức ×0.5 — tier-audit/classify.js): one ANẶNG step of a light key weighed no more than the VỪA way.
ONE rule for every such set (law 11): keep the step counts (way i Σgain == Σloss == BAL.<fam>.tier[i]); re-pick the fewest gain / loss KEYS,
only for the sets the audit calls FLAT, from keys the writer already used in THAT set (else, as a fallback, the heavier common gains Danh / Đức, then
the common costs Sức / Bạc, then the small gains Tai mắt / Tâm cơ for NHẸ), so that on the audit scale the cost rises strictly AND the gain
rises strictly from NHẸ to NẶNG; a way never gains and loses the same thing and never turns its own gain into a loss (or back); no two ways end with the same kind of
result (law 2: those would be one tier); NHẸ keeps a real (non-liking) cost when it had one; a set that had a
bạc-free way keeps one (the j68 soft-lock rule). Ties → change the heavier tier first, then the writer's first keys.
usage: python3 dev/tools/cseeds_rise.py <fam> <files…> [--dry]     fam = j68 | j72       (idempotent: a set that already rises is left as it is)"""
import json, os, sys, itertools
sys.path.insert(0, os.path.dirname(__file__))
import cseeds_tier as C

def rises(F, ways, tier):
    c = [F.pts(w['loss'], tier) for w in ways]; g = [F.pts(w['gain'], tier) for w in ways]
    return all(c[i] < c[i + 1] for i in range(len(c) - 1)) and all(g[i] < g[i + 1] for i in range(len(g) - 1))

def audit_ok(F, ways, tier):
    """the tier-audit verdict (classify.js): OK = costs all different AND, by cost, the gain never falls (ties allowed) — else FLAT"""
    P = sorted((F.pts(w['loss'], tier), F.pts(w['gain'], tier)) for w in ways)
    return len({round(c * 10) for c, _ in P}) == len(P) and all(P[i][1] >= P[i - 1][1] - 0.01 for i in range(1, len(P)))

def fix(F, ways, tier, more=(), lmore=()):
    """ways = list of {gain, loss} in NHẸ → NẶNG order (already tier-sized). → new list or None (cannot)"""
    if rises(F, ways, tier): return ways
    T = [sum(w['gain'].values()) for w in ways]
    GK = list(dict.fromkeys([k for w in ways for k in w['gain']] + list(more))); LK = list(dict.fromkeys([k for w in ways for k in w['loss']] + list(lmore)))
    bacfree = any('bac' not in w['loss'] for w in ways)
    opts = []
    for p, w in enumerate(ways):
        G = [(0, w['gain'])] + [(1, {k: T[p]}) for k in GK if {k: T[p]} != w['gain']]
        L = [(0, w['loss'])] + [(1, {k: T[p]}) for k in LK if {k: T[p]} != w['loss']]
        real0 = any(not C.isrel(k) for k in w['loss'])
        O = []
        for (cg, g), (cl, l) in itertools.product(G, L):
            if {C.base(k) for k in g} & {C.base(k) for k in l}: continue
            if {C.base(k) for k in g} & {C.base(k) for k in w['loss']} or {C.base(k) for k in l} & {C.base(k) for k in w['gain']}: continue   # never flip a gain into a loss
            if p == 0 and real0 and cl and all(C.isrel(k) for k in l): continue
            O.append((cg + cl, (len(ways) - p) * (cg + cl) * 0.01 + 0.001 * (GK.index(next(iter(g))) if cg else 0), g, l))
        opts.append(O)
    best = None
    for combo in itertools.product(*opts):
        W = [{'gain': g, 'loss': l} for _, _, g, l in combo]
        if bacfree and all('bac' in w['loss'] for w in W): continue
        if len({frozenset(map(C.base, w['gain'])) for w in W}) < len(W): continue   # law 2: two ways with the same kind of result would be one tier
        if not rises(F, W, tier): continue
        sc = (sum(x[0] for x in combo), sum(x[1] for x in combo))
        if best is None or sc < best[0]: best = (sc, W)
    return best and best[1]

HEAVY = ('danh', 'duc')   # fallback when the set's own keys cannot rise: the NẶNG side may gain a heavier common stat (Danh / Đức, BAL fx)
LIGHT = ('suc', 'bac')    # last fallback: a way may pay in Sức / Bạc (the common costs) instead

def main(argv):
    fam = argv[0]; files = [a for a in argv[1:] if not a.startswith('--')]; F = C.Fam(fam); n = bad = 0; rep = []
    for f in files:
        out = []
        for line in open(f, encoding='utf-8').read().split('\n'):
            if not line.strip().startswith('{'): out.append(line); continue
            r = json.loads(line); tier = r.get('tier') or 'm'
            sets = []
            if fam == 'j72': sets = [(f"{r['id']}#{i}", st['opts']) for i, st in enumerate(r.get('steps') or []) if st.get('t') == 'pick']
            elif r.get('type') == 'comp' and r.get('stances'): sets = [(r['id'], list(r['stances'].values()))]
            for sid, ways in sets:
                ways = [w for w in ways if w.get('gain') is not None]
                if len(ways) < 2 or audit_ok(F, ways, tier): continue   # only the audit's FLAT sets (C11 Q1 scope); OK sets are left as written
                new = fix(F, ways, tier) or fix(F, ways, tier, HEAVY) or fix(F, ways, tier, HEAVY, LIGHT) or fix(F, ways, tier, HEAVY + ('mat', 'tamco'), LIGHT)
                if not new: bad += 1; rep.append(f'{sid}\tCANNOT'); continue
                for w, x in zip(ways, new):
                    if (w['gain'], w['loss']) != (x['gain'], x['loss']):
                        rep.append(f"{sid}\t{w.get('n') or w.get('text')}\t{w['gain']}|{w['loss']} → {x['gain']}|{x['loss']}")
                    w['gain'], w['loss'] = x['gain'], x['loss']
                n += 1
            out.append(json.dumps(r, ensure_ascii=False, separators=(',', ':')))
        if '--dry' not in argv: open(f, 'w', encoding='utf-8').write('\n'.join(out))
    print('\n'.join(rep)); print(f'cseeds_rise {fam}: {n} sets now rise in cost AND result, {bad} cannot', file=sys.stderr)

if __name__ == '__main__': main(sys.argv[1:])
