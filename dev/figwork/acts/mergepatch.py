# python3 mergepatch.py ACTS_IN.json _index.json PATCH_OUT.json ACTS_OUT.json [CORPUS.txt]
# Step 2 (coordinator 15/11 late): bring EVERY meanings.py rule into the live ACTS.json log, in meanings.py order.
#  - a rule already live (same regex) keeps its live key (e.g. a -h redraw) and its relative order is asserted unchanged;
#  - a new rule is added when its key is "-" or img/act-<key>-h.webp / img/act-<key>.webp is in the CDN _index;
#  - a new rule whose picture is missing is HELD (left out, listed in the patch) so the line keeps its old behaviour;
#  - a regex listed twice in meanings.py stays twice (the live file already has both copies).
#  - with CORPUS.txt (one plain first-sentence per line, e.g. from inv_ast.js via corpus.py): a new rule that would take a line
#    away from a live PICTURE rule (old key not None, new key different) is HELD too (reason 'steals'), so no line loses its picture.
# acts / prefix are not touched.
import json, sys, os
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from meanings import R
src, idx, pout, aout = sys.argv[1:5]
A = json.load(open(src)); ks = {f[0] for f in json.load(open(idx))['files']}
live = {r[0]: r[1] for r in A['log']}
last = {rx: i for i, (k, rx, s) in enumerate(R)}
def pic(k):
    if k == '-': return k
    for c in (k + '-h', k):
        if 'img/act-' + c + '.webp' in ks: return c
    return None
out, add, held = [], [], []
for i, (k, rx, s) in enumerate(R):
    if rx in live: out.append([rx, live[rx]]); continue
    p = pic(k)
    if p: out.append([rx, p]); add.append([rx, p, len(out) - 1])
    else: held.append([k, rx, s])
import re
corp = [l.strip() for l in open(sys.argv[5])] if len(sys.argv) > 5 else []
CC = {}
def first(log, t):
    for rx, k in log:
        c = CC.get(rx) or CC.setdefault(rx, re.compile(rx, re.I))
        if c.search(t): return rx, k
    return None, None
before = {t: first(A['log'], t)[1] for t in corp}
steal = []
while corp:
    bad = set()
    for t in corp:
        rx, k = first(out, t)
        if before[t] not in (None, k) and rx in {a[0] for a in add}: bad.add(rx)
    if not bad: break
    for a in [a for a in add if a[0] in bad]:
        steal.append([a[1], a[0], [t for t in corp if before[t] and first(out, t)[0] == a[0]][:3]])
    out = [r for r in out if r[0] not in bad]; add = [a for a in add if a[0] not in bad]
for a in add: a[2] = out.index([a[0], a[1]])
old = [r[0] for r in A['log']]; kept = [r[0] for r in out if r[0] in live]
assert kept == old, 'relative order of live rules would change'
P = {'_doc': 'act-pics2 step 2: all meanings.py rules merged into the live ACTS.json log in meanings.py order. add = [regex, key, index in the new log]; held = rules left out because their picture is not on the CDN [key, regex, scene].', 'add': add, 'held': held, 'heldSteals': steal}
A['log'] = out
json.dump(P, open(pout, 'w'), ensure_ascii=False, indent=1)
json.dump(A, open(aout, 'w'), ensure_ascii=False, separators=(',', ':'))
print('meanings rules', len(R), 'live before', len(old), 'added', len(add), '("-":', sum(1 for a in add if a[1] == '-'), ') held', len(held), 'live after', len(out))
