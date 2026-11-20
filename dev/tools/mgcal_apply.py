#!/usr/bin/env python3
"""mgcal_apply.py — write a minigame calibration code into BAL (one core).
usage: python3 dev/tools/mgcal_apply.py [--p2] "CTM-CAL dan:6.4/5@11/17/2026 co:5.1/5@11/17/2026"
The code comes from the owner-only test (jmgcal, Thiết lập row «Thử tay tài nghệ», button «Chép mã»).
Default: her profile (player 1) → merges each kind into BAL.ag.mg2.cal.k in dev/build/jbal2.js.
--p2: PLAYER 2's profile (owner OD 20/11 ~05:00Z: her second tries are Kingston's = a second player's numbers) → BAL.ag.mg2.cal.k2.
      The two profiles are never mixed: a --p2 code never touches k, a plain code never touches k2.
FIRST TRY ONLY, per profile (owner OD 20/11 ~04:30Z: "bất kì lần 2 nào của game đều không tính. Chỉ tính kết quả lần 1"): a kind already in
that profile is KEPT; only kinds not there yet are added. A re-done kind in a later code is reported as 'kept (first try)' and never overwrites.
Rebuild after: python3 dev/build/assemble.py (and the site build)."""
import re, sys, json, os
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
P = os.environ.get('MGCAL_BAL') or os.path.join(ROOT, 'dev/build/jbal2.js')  # MGCAL_BAL: a copy (tests)
# the line of each profile: (prefix, the {kind:…} object, suffix)
RX = {'k': re.compile(r'(BAL\.ag\.mg2\.cal=\{.*?,k:)(\{.*?\})(\};)'),
      'k2': re.compile(r'(BAL\.ag\.mg2\.cal\.k2=)(\{.*?\})(;)')}
def main():
    a = sys.argv[1:]
    prof = 'k2' if a and a[0] == '--p2' else 'k'
    if prof == 'k2':
        a = a[1:]
    if not a or not a[0].strip().startswith('CTM-CAL'):
        sys.exit(__doc__)
    new = {}
    for tok in a[0].split()[1:]:
        m = re.fullmatch(r'([a-z0-9]+):(\d+(?:\.\d+)?)/(\d+)@(\d\d/\d\d/\d{4})', tok)
        if not m:
            sys.exit('bad token: ' + tok)
        b = float(m.group(2))
        if not 0 <= b <= 10:
            sys.exit('base out of 0..10: ' + tok)
        new[m.group(1)] = {'b': b, 'n': int(m.group(3)), 'at': m.group(4)}
    s = open(P, encoding='utf-8').read()
    m = RX[prof].search(s)
    if not m:
        sys.exit(f'BAL.ag.mg2.cal {prof} line not found in jbal2.js')
    cur = json.loads(re.sub(r'([{,])([a-z0-9]+):', r'\1"\2":', m.group(2))) if m.group(2) != '{}' else {}
    for k, v in new.items():
        if k in cur:
            if cur[k] != v:
                print(f"{k}: kept first try b {cur[k]['b']} (later try b {v['b']} not counted)")
        else:
            cur[k] = v
    js = json.dumps(cur, separators=(',', ':'), ensure_ascii=False)
    js = re.sub(r'"([a-z0-9]+)":', r'\1:', js)
    s = s[:m.start()] + m.group(1) + js + m.group(3) + s[m.end():]
    open(P, 'w', encoding='utf-8').write(s)
    print(f"profile {'player 2 (cal.k2)' if prof == 'k2' else 'player 1 (cal.k)'}")
    print('kind | base b | rounds | date')
    for k, v in sorted(cur.items()):
        print(f"{k} | {v['b']} | {v['n']} | {v['at']}")
main()
