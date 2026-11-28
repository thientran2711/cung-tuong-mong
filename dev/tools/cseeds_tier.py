#!/usr/bin/env python3
"""E-TIER-B14 (row 42, reviewer N1, law 11; law 2 TIERED CHOICES, owner OD 27/11 ~00:46Z): convert the composed-seed writer files of
j7c (j7seeds.md), j68c (j68seeds_*.md comp rows), j71c (fseeds_*.md comp rows), jworldc (wseeds_*.md) and j72c (j72seeds_*.md pick steps)
from the OLD equal-value law («4 stances, every stance Σgain == Σloss == the seed's tier steps s1 m2 l3»; j72: «every pick option the same total»)
to the tier law: at most 3 ways = NHẸ · VỪA · NẶNG, way i Σgain == Σloss == BAL.<fam>.tier[i] = 1 / 2 / 3 steps (Tốn and Được rise together);
the seed's s / m / l stays the size of ONE step (BAL.<fam>.fx[tier], unchanged).
usage: python3 dev/tools/cseeds_tier.py <fam> <files…> [--dry]      fam = j7 | j68 | j71 | wc | j72      (one-shot; a converted row is left as it is)
Per 4-stance seed (one rule, the same for every seed — law 11; the batch-1 rule of dev/tools/rdseeds_tier.py):
  1. MERGE one of the 4 stances into its most-alike sibling (same-result merge, law 2): the stance whose gain / loss keys look most like a
     sibling's is removed (stance + its outcome); jworldc keeps ≥2 different npc tags. The first drop in that order whose 3 kept ways can rise
     together (step 3) is taken. Law 3: every kept way keeps a gain.
  2. ORDER the 3 kept ways by what they cost (owner ~00:50Z: Sức / Tâm cơ / Tai mắt light · Bạc / a person's liking middle · Sủng / Danh / Đức /
     Thái hậu / Hoàng hậu heavy); the stances dict is rewritten in that order (the card shows NHẸ · VỪA · NẶNG).
  3. SIZE way i to tier[i] steps of gain and of loss, from the writer's own keys (closest to the writer's mix); keys picked so that on one rough
     scale (a step × BAL.<fam>.fx[tier] × the audit weights bạc ×0.1, Sức ×0.5, relation = its rel step — tier-audit/classify.js) the cost
     rises strictly and the gain never falls from NHẸ to NẶNG; NHẸ never hides its cost in a liking-only loss when the writer gave a stat cost.
  4. om = {removed stance id: kept sibling id} on the seed: an old save that stored the removed id (jworldc S.wc.ch / the NPC round w.x.wc.r)
     reads the sibling (jworldc wcOm).
j72 pick steps (2–3 ways, no way removed — already ≤ 3): ordered by cost kind and sized 1 / 2 (/ 3) steps the same way; the step keeps its
ways, so a saved favour's step index is untouched.
"""
import json, os, re, sys, itertools
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
TIER = [1, 2, 3]                                        # BAL.<fam>.tier (jbal2.js), the validators read it from there
W = {'suc': 1, 'tamco': 1, 'mat': 1, 'bac': 2, 'an': 2, 'maid': 2, 'rel': 2, 'relb': 2, 'sung': 3, 'danh': 3, 'duc': 3, 'th': 3, 'hh': 3}
AW = {'bac': 0.1, 'suc': 0.5}
BALF = {'j7': 'j7c', 'j68': 'j68c', 'j71': 'j71c', 'wc': 'wc', 'j72': 'j72c'}

def fx_of(name):
    s = open(os.path.join(ROOT, 'dev/build/jbal2.js'), encoding='utf-8').read()
    i = s.index('BAL.' + name + '={'); j = s.index('fx:{', i) + 3; d = 0
    for k in range(j, len(s)):
        if s[k] == '{': d += 1
        elif s[k] == '}':
            d -= 1
            if not d: break
    t = re.sub(r'(\w+):', r'"\1":', s[j:k + 1])
    return json.loads(t)

def base(k):
    a = k.split('.')[0]
    return 'rel' if a in ('rel', 'relb', 'friend', 'grudge') else a
def kw(k): return W.get(base(k), 2)
def isrel(k): return base(k) in ('rel', 'proof')
def cost_w(st):
    L = st.get('loss') or {}; t = sum(L.values()) or 1
    return sum(kw(k) * n for k, n in L.items()) / t
def jac(a, b):
    a, b = set(map(base, a)), set(map(base, b)); return len(a & b) / (len(a | b) or 1)
def like(o, p): return 2 * jac(o.get('gain') or {}, p.get('gain') or {}) + jac(o.get('loss') or {}, p.get('loss') or {})

class Fam:
    def __init__(s, fam): s.fam = fam; s.FX = fx_of(BALF[fam])
    def pts(s, d, tier):
        F = s.FX.get(tier) or s.FX['m']; v = 0
        for k, n in d.items():
            b = base(k); x = F.get(b, F.get('rel', 0)) if b != 'proof' else F.get('proof', 1)
            v += n * x * AW.get(b, 1)
        return v

def shapes(d0, t, cost):
    """every way to write t steps with the writer's keys (each key 0..t), closest to the writer's mix first."""
    K = list(d0); s0 = sum(d0.values()) or 1; R = []
    for c in itertools.product(range(t + 1), repeat=len(K)):
        if sum(c) != t: continue
        d = {k: n for k, n in zip(K, c) if n}
        if cost and t == 1 and all(isrel(k) for k in d) and any(not isrel(k) for k in K): continue   # NHẸ shows a real cost
        pen = sum(abs(n - t * d0[k] / s0) for k, n in zip(K, c)) + sum(n * j for j, n in enumerate(c)) * 0.001   # tie → the writer's first keys
        R.append((pen, d))
    R.sort(key=lambda x: x[0]); return R[:3]

def place(F, ways, tier, T):
    """ways = list of stance dicts (kept), T = tier steps per position → (score, order, [(gain, loss)])"""
    best = None; base_o = sorted(range(len(ways)), key=lambda i: (cost_w(ways[i]), i))
    for perm in itertools.permutations(base_o):
        moved = sum(abs(perm.index(i) - base_o.index(i)) for i in base_o)
        opts = [[(pg + pl, g, l) for pg, g in shapes(ways[i].get('gain') or {}, T[p], False) for pl, l in shapes(ways[i].get('loss') or {}, T[p], True)] for p, i in enumerate(perm)]
        for combo in itertools.product(*opts):
            c = [F.pts(l, tier) for _, g, l in combo]; w = [F.pts(g, tier) for _, g, l in combo]
            ok = all(c[i] < c[i + 1] for i in range(len(c) - 1)) and all(w[i] <= w[i + 1] for i in range(len(w) - 1))
            sc = (0 if ok else 1, moved, round(sum(x[0] for x in combo), 3))
            if best is None or sc < best[0]: best = (sc, perm, [(g, l) for _, g, l in combo])
    return best

def conv4(F, r):
    ST = r.get('stances') or {}
    if len(ST) != 4 or r.get('om') is not None: return False
    ids = list(ST); tier = r.get('tier') or 'm'
    cand = []
    for d in ids:
        rest = [x for x in ids if x != d]
        if F.fam == 'wc' and len({ST[x].get('npc') for x in rest}) < 2: continue
        cand.append((max(like(ST[d], ST[x]) for x in rest) + ids.index(d) * 0.01, d))
    cand.sort(reverse=True); pick = None
    for _, d in cand:
        keep = [x for x in ids if x != d]; b = place(F, [ST[x] for x in keep], tier, TIER)
        if pick is None: pick = (d, keep, b)
        if b[0][0] == 0: pick = (d, keep, b); break
    d, keep, (sc, perm, sz) = pick
    order = [keep[i] for i in perm]
    NS = {}
    for k, (g, l) in zip(order, sz):
        X = dict(ST[k]); X['gain'] = g; X['loss'] = l; NS[k] = X
    r['stances'] = NS
    oc = r.get('outcomes') or {}
    r['outcomes'] = {k: oc[k] for k in order if k in oc}
    sib = max(keep, key=lambda k: (like(ST[d], ST[k]), -keep.index(k)))
    r['om'] = {d: sib}
    return sc[0] == 0

def conv72(F, r):
    tier = r.get('tier') or 'm'; n = 0; bad = 0
    for st in r.get('steps') or []:
        if st.get('t') != 'pick': continue
        O = st['opts']; T = TIER[:len(O)]
        if all(sum((o.get('gain') or {}).values()) == t == sum((o.get('loss') or {}).values()) for o, t in zip(O, T)): continue   # already tiered
        sc, perm, sz = place(F, O, tier, T)
        new = []
        for i, (g, l) in zip(perm, sz):
            X = dict(O[i]); X['gain'] = g; X['loss'] = l; new.append(X)
        st['opts'] = new; n += 1; bad += sc[0]
    return n, bad

def main(argv):
    fam = argv[0]; files = [a for a in argv[1:] if not a.startswith('--')]; F = Fam(fam); n = up = 0
    for f in files:
        out = []
        for line in open(f, encoding='utf-8').read().split('\n'):
            if not line.strip().startswith('{'): out.append(line); continue
            r = json.loads(line)
            if fam == 'j72':
                a, b = conv72(F, r); n += a; up += b
            elif r.get('stances'):
                ok = conv4(F, r); n += 1; up += (not ok)
            out.append(json.dumps(r, ensure_ascii=False, separators=(',', ':')))
        if '--dry' not in argv: open(f, 'w', encoding='utf-8').write('\n'.join(out))
    print(f'cseeds_tier {fam}: {n} sets converted to NHẸ · VỪA · NẶNG ({up} cannot rise on the rough audit scale with any choice) in {len(files)} file(s)')

if __name__ == '__main__': main(sys.argv[1:])
