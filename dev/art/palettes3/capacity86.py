"""P2 diagnostic (owner Lượt 763 gate vs Lượt 769 one tone): how many (main, sec) pairs of one season's valid pool can be
mutually unique under the check_unique.py gate (max ΔE2000(main, sec) >= T, distinct name pairs)? Greedy packing over several
orderings = a LOWER bound of the true maximum. Needs the pool cache written by palette86.py solve (P86_CACHE).
Run: python3 dev/art/palettes3/capacity86.py <cache.json> <threshold> <season> [<season> ...]"""
import json, sys, os, random, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import palette86 as P
from colourlib import oklch
stat = json.load(open(sys.argv[1])); T = float(sys.argv[2])
for se in sys.argv[3:]:
    pr = stat[se]; n = len(pr)
    M = P.lab_arr([p[0][1] for p in pr]); S = P.lab_arr([p[1][1] for p in pr])
    H = [(oklch(p[0][1])[2], oklch(p[1][1])[2], oklch(p[0][1])[1]) for p in pr]
    orders = [sorted(range(n), key=lambda j: (H[j][0], H[j][1])), sorted(range(n), key=lambda j: (H[j][1], H[j][0]))]
    for t in range(2): o = list(range(n)); random.Random(t).shuffle(o); orders.append(o)
    best = 0
    for order in orders:
        chosen, names = [], set()
        for j in order:
            nm = (pr[j][0][0], pr[j][1][0])
            if nm in names: continue
            if chosen:
                c = np.array(chosen)
                if (np.maximum(P.de2000_np(M[j:j+1], M[c]), P.de2000_np(S[j:j+1], S[c])) < T).any(): continue
            chosen.append(j); names.add(nm)
        best = max(best, len(chosen))
    print(f'{se} gate dE {T}: greedy packing (lower bound of max) {best} of 86 needed', flush=True)
