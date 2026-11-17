#!/usr/bin/env python3
"""mgcal_apply.py — write the owner's minigame calibration code into BAL (one core).
usage: python3 dev/tools/mgcal_apply.py "CTM-CAL dan:6.4/5@11/17/2026 co:5.1/5@11/17/2026"
The code comes from the owner-only test (jmgcal, Thiết lập row «Thử tay tài nghệ», button «Chép mã»).
It merges each kind into BAL.ag.mg2.cal.k in dev/build/jbal2.js (a kind already there is overwritten by the newer code), then prints the table.
Rebuild after: python3 dev/build/assemble.py (and the site build)."""
import re, sys, json, os
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
P = os.environ.get('MGCAL_BAL') or os.path.join(ROOT, 'dev/build/jbal2.js')  # MGCAL_BAL: a copy (tests)
def main():
    if len(sys.argv) < 2 or not sys.argv[1].strip().startswith('CTM-CAL'):
        sys.exit(__doc__)
    new = {}
    for tok in sys.argv[1].split()[1:]:
        m = re.fullmatch(r'([a-z0-9]+):(\d+(?:\.\d+)?)/(\d+)@(\d\d/\d\d/\d{4})', tok)
        if not m:
            sys.exit('bad token: ' + tok)
        b = float(m.group(2))
        if not 0 <= b <= 10:
            sys.exit('base out of 0..10: ' + tok)
        new[m.group(1)] = {'b': b, 'n': int(m.group(3)), 'at': m.group(4)}
    s = open(P, encoding='utf-8').read()
    rx = re.compile(r'(BAL\.ag\.mg2\.cal=\{.*?,k:)(\{.*?\})(\};)')
    m = rx.search(s)
    if not m:
        sys.exit('BAL.ag.mg2.cal line not found in jbal2.js')
    cur = json.loads(re.sub(r'([{,])([a-z0-9]+):', r'\1"\2":', m.group(2))) if m.group(2) != '{}' else {}
    cur.update(new)
    js = json.dumps(cur, separators=(',', ':'), ensure_ascii=False)
    js = re.sub(r'"([a-z0-9]+)":', r'\1:', js)
    s = s[:m.start()] + m.group(1) + js + m.group(3) + s[m.end():]
    open(P, 'w', encoding='utf-8').write(s)
    print('kind | base b | rounds | date')
    for k, v in sorted(cur.items()):
        print(f"{k} | {v['b']} | {v['n']} | {v['at']}")
main()
