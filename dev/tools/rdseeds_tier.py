#!/usr/bin/env python3
"""E-TIER-B13 batch 1 (row 42, law 2 TIERED CHOICES, owner OD 27/11 ~00:46Z): convert the composed-road writer files
dev/handover/content/thin/rdseeds_*.md from the OLD equal-value law («4 options, every option Σgain == Σloss == 2 steps»)
to the tier law: 3 options per hồi = NHẸ · VỪA · NẶNG, Σgain == Σloss == BAL.road.c.tier[i] = 1 / 2 / 3 steps (Tốn and Được rise together).
usage: python3 dev/tools/rdseeds_tier.py [files…] [--dry]   (no files = every rdseeds_*.md; dev/test/rdc-fixture.jsonl is converted by naming it)   (one-shot; a file already converted is left as it is)
Per hồi (rule, the same for every hồi — law 11):
  1. DROP one of the 4 ways (the first in this order whose 3 kept ways can rise together, step 3): the stance way («Sai người dò … trước», «Từ chối …», «Dò …») first; else the way whose result kind looks most like
     a sibling's (same gain keys); a climax keeps one «lo» and one «hi» risk and, when it can, 3 different roll stats. Law 3: the 3 kept ways
     each keep a gain.
  2. ORDER the 3 kept ways by what they cost (owner ~00:50Z: Sức / Tâm cơ / Tai mắt = light, Bạc / a person's liking = middle, Sủng / Danh /
     Đức / Thái hậu / Hoàng hậu = heavy); a climax puts its «lo» risk ways first (the light way never risks the chapter more than the heavy one).
  3. SIZE: NHẸ keeps one gain key and one cost key at 1 step; VỪA keeps its 2 + 2 steps; NẶNG adds one step to one gain key and one cost key.
     Which key (and, within the cost-kind order of step 2, which way sits at which tier) is chosen so that on one rough scale (a step × BAL.road.c.fx
     × the audit weights, bạc ×0.1, Sức ×0.5 — dev/handover/reports/tier-audit/classify.js) the cost rises strictly and the gain never falls from
     NHẸ to NẶNG; when no choice does, the writer's first-listed keys are kept.
  4. om = old index → new index as a digit string («0120») (the dropped way → the kept way most like it), kept on the hồi so an old save's pledge / refusal index maps
     to the merged sibling (jroadc.js rdcOm).
"""
import json, glob, os, re, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
TIER = [1, 2, 3]                                       # BAL.road.c.tier
DROP = re.compile(r'^(Sai người|Sai |Từ chối|Cho người dò|Dò |Cho người )', re.I)
W = {'suc': 1, 'tamco': 1, 'mat': 1, 'sc': 1, 'tin': 2, 'bac': 2, 'sung': 3, 'danh': 3, 'duc': 3, 'th': 3, 'hh': 3}

def kw(k): return 2 if k.startswith('rel.') else W.get(k, 2)
def cost_w(o):
    L = o.get('loss') or {}; t = sum(L.values()) or 1
    return sum(kw(k) * n for k, n in L.items()) / t
def main_key(d):
    return max(d.items(), key=lambda kv: kv[1])[0]      # ties → first written key (max keeps the first maximum)
def jac(a, b):
    a, b = set(a), set(b); return len(a & b) / (len(a | b) or 1)
def like(o, p):
    return 2 * jac(o.get('gain') or {}, p.get('gain') or {}) + jac(o.get('loss') or {}, p.get('loss') or {})

def drop_index(h, clim, all_=False):
    O = h['opts']; best = None; L = []
    for i, o in enumerate(O):
        rest = [p for j, p in enumerate(O) if j != i]
        sc = 0.0
        if DROP.search(o.get('n') or ''): sc += 3
        sc += max(like(o, p) for p in rest)
        if clim:
            R = [p.get('risk') for p in rest]
            if 'lo' not in R or 'hi' not in R: continue
            if len(set(p.get('stat') for p in rest)) == 3: sc += 2
        sc += i * 0.01                                  # tie → the later way (the 4th way most often)
        L.append((sc, i))
        if best is None or sc > best[0]: best = (sc, i)
    return [i for sc, i in sorted(L, reverse=True)] if all_ else best[1]

def size(o, t):
    g = dict(o.get('gain') or {}); l = dict(o.get('loss') or {})
    if t == 1:
        kg, kl = main_key(g), main_key(l); g = {kg: 1}; l = {kl: 1}
    elif t == 3:
        g[main_key(g)] += 1; l[main_key(l)] += 1
    X = dict(o); X['gain'] = g; X['loss'] = l; return X

FX = {'sung': 3, 'danh': 2, 'bac': 30, 'suc': 3, 'mat': 1, 'th': 3, 'hh': 3, 'duc': 2, 'tamco': 1, 'tin': 5}   # BAL.road.c.fx (sc / rel ride elsewhere)
AW = {'bac': 0.1, 'suc': 0.5}                                                                                    # audit weights (classify.js W)
def pts(d): return sum(n * FX.get(k, 0) * AW.get(k, 1) for k, n in d.items() if not k.startswith('rel.') and k != 'sc')
def sizes(o, t):
    g0 = dict(o.get('gain') or {}); l0 = dict(o.get('loss') or {}); R = []
    if t == 2: return [(g0, l0, 0)]
    for kg in g0:
        for kl in l0:
            pen = (kg != main_key(g0)) + (kl != main_key(l0))
            if t == 1: R.append(({kg: 1}, {kl: 1}, pen))
            else:
                g = dict(g0); l = dict(l0); g[kg] += 1; l[kl] += 1; R.append((g, l, pen))
    return R
def rises(T):
    c = [pts(l) for g, l, _ in T]; w = [pts(g) for g, l, _ in T]
    return c[0] < c[1] < c[2] and w[0] <= w[1] <= w[2]
def place(O, keep, clim):
    import itertools
    base = sorted(keep, key=lambda i: ((O[i].get('risk') == 'hi') if clim else 0, cost_w(O[i]), i))
    best = None
    for perm in itertools.permutations(base):
        if clim and (O[perm[0]].get('risk') != 'lo' or O[perm[2]].get('risk') != 'hi' or O[perm[1]].get('risk') == 'lo' and O[perm[0]].get('risk') == 'hi'): continue
        if clim and [O[i].get('risk') for i in perm] != sorted([O[i].get('risk') for i in perm], key=lambda x: x == 'hi'): continue
        moved = sum(abs(perm.index(i) - base.index(i)) for i in base)
        for a in sizes(O[perm[0]], 1):
            for b in sizes(O[perm[1]], 2):
                for c in sizes(O[perm[2]], 3):
                    T = (a, b, c); sc = (0 if rises(T) else 1, moved, a[2] + c[2])
                    if best is None or sc < best[0]: best = (sc, perm, T)
    return best
def convert(h, clim):
    O = h['opts']
    if len(O) != 4: return False
    for d in drop_index(h, clim, True):                  # the best drop whose 3 kept ways can rise together; else the best drop as it is
        sc, keep, T = place(O, [i for i in range(4) if i != d], clim)
        if sc[0] == 0: break
    else:
        d = drop_index(h, clim); sc, keep, T = place(O, [i for i in range(4) if i != d], clim)
    keep = list(keep)
    new = []
    for i, (g, l, _) in zip(keep, T):
        X = dict(O[i]); X['gain'] = g; X['loss'] = l; new.append(X)
    om = [None] * 4
    for k, i in enumerate(keep): om[i] = k
    om[d] = max(range(3), key=lambda k: (like(O[d], O[keep[k]]), -k))
    h['opts'] = new; h['om'] = ''.join(str(x) for x in om)   # a digit string, not a number table (one-core guard)
    return True

def hois(r):
    if r.get('type') == 'prem':
        for s in 'sctx':
            for h in r.get(s) or []: yield h, s == 'x'
    else: yield r, r.get('type') == 'clim'

def main(argv):
    n = 0; files = [a for a in argv if not a.startswith('--')] or sorted(glob.glob(os.path.join(ROOT, 'dev/handover/content/thin/rdseeds_*.md')))
    for f in files:
        out = []
        for line in open(f, encoding='utf-8').read().split('\n'):
            if not line.strip().startswith('{'): out.append(line); continue
            r = json.loads(line)
            for h, clim in hois(r): n += convert(h, clim)
            out.append(json.dumps(r, ensure_ascii=False, separators=(',', ':')))
        if '--dry' not in argv: open(f, 'w', encoding='utf-8').write('\n'.join(out))
    print(f'rdseeds_tier: {n} hồi converted 4 → 3 ways (NHẸ · VỪA · NẶNG) in {len(files)} file(s)')

if __name__ == '__main__': main(sys.argv[1:])
