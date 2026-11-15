# python3 syspatch.py ACTS_IN.json _index.json PATCH_OUT.json ACTS_OUT.json
# Merges the "Tổng lược system lines" block of meanings.py (lines between the block header and the tu-dung rule) into the CURRENT
# ACTS.json log, at the same place as in meanings.py (right before the first rule that follows the block). A rule is only added when its
# key is "-" or its picture img/act-<key>.webp (or <key>-h) is on the CDN; others are listed as "held" and left out (the line keeps
# its old meaning until the picture exists). Rules already present (same regex) are not duplicated.
import json, sys, os, re
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from meanings import R
src, idx, pout, aout = sys.argv[1:5]
A = json.load(open(src)); ks = {f[0] for f in json.load(open(idx))['files']}
txt = open(os.path.join(H, 'meanings.py'), encoding='utf-8').read().splitlines()
s = next(i for i, l in enumerate(txt) if l.startswith('# --- Tổng lược system lines'))
e = next(i for i, l in enumerate(txt) if i > s and l.startswith('("tu-dung"'))
block_rx = set()
for l in txt[s + 1:e]:
    m = re.match(r'\("([^"]+)",\s*r"(.*?)",\s*"', l)
    if m: block_rx.add(m.group(2))
blk = [(k, rx) for k, rx, sc in R if rx in block_rx]
have = {r[0] for r in A['log']}
def pic(k):
    if k == '-': return k
    for c in (k + '-h', k):
        if 'img/act-' + c + '.webp' in ks: return c
    return None
add, held, dup = [], [], 0
for k, rx in blk:
    if rx in have: dup += 1; continue
    p = pic(k)
    if p: add.append([rx, p])
    else: held.append(k)
# insert right before the tu-dung rule (the rule that follows the block in meanings.py)
tu = next((i for i, r in enumerate(A['log']) if r[1] in ('tu-dung', 'tu-dung-h')), len(A['log']))
A['log'] = A['log'][:tu] + add + A['log'][tu:]
P = {'_doc': 'act-pics2 system-line rules (meanings.py "Tổng lược system lines" block): insert these log rules, in this order, right before the tu-dung rule of the CURRENT img/ACTS.json. Every key is on the CDN (or "-" = no thumbnail).', 'insertBefore': 'tu-dung', 'log': add, 'held': sorted(set(held))}
json.dump(P, open(pout, 'w'), ensure_ascii=False, indent=1)
json.dump(A, open(aout, 'w'), ensure_ascii=False, separators=(',', ':'))
print('block rules', len(blk), 'already present', dup, 'added', len(add), '(of which "-":', sum(1 for r in add if r[1] == '-'), ') held (no picture)', len(held), sorted(set(held)))
print('log', len(json.load(open(src))['log']), '->', len(A['log']), 'insert at', tu)
