# python3 swap_order.py LIVE.json OUT.json CORPUS.txt : reorder the live ACTS log to meanings.py order (coordinator-approved picture swap,
# 15/11: the 5 specific rules to-giac-truoc-hh/-ht/to-giac-truoc/to-giac-khong-thanh/tu-thong-ban-chet go back ABOVE the general
# "^Ngươi tố giác" / "bị ban chết" rules). Keys unchanged, no rule added or removed. Prints every corpus line whose picture changes;
# fails unless every change is one of the ALLOWED (old key -> new key) swaps and 0 lines go to none.
import json, re, sys, os
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from meanings import R
A = json.load(open(sys.argv[1])); live = {rx: k for rx, k in A['log']}
out = [[rx, live[rx]] for k, rx, s in R if rx in live]
assert sorted(map(tuple, out)) == sorted(map(tuple, A['log'])), 'rule set changed'
ALLOWED = {('to-giac', 'to-giac-truoc-hh-h'), ('to-giac', 'to-giac-truoc-ht-h'), ('to-giac', 'to-giac-truoc-h'),
           ('to-giac', 'to-giac-khong-thanh-h'), ('bi-ban-chet-h', 'tu-thong-ban-chet-h')}
def hit(log, t):
    for rx, k in log:
        if re.search(rx, t, re.I): return k
C = [l.strip() for l in open(sys.argv[3]) if l.strip()]; bad = 0; n = 0
for t in C:
    b, a = hit(A['log'], t), hit(out, t)
    if b == a: continue
    n += 1; ok = (b, a) in ALLOWED or b in (None, '-')
    bad += not ok; print('MOVED' if ok else 'NOT-ALLOWED', b, '->', a, '|', t)
print('lines', len(C), 'changed', n, 'not allowed', bad, 'rules', len(A['log']), '->', len(out))
if bad: sys.exit(1)
A['log'] = out; json.dump(A, open(sys.argv[2], 'w'), ensure_ascii=False, separators=(',', ':'))
