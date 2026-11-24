#!/usr/bin/env python3
"""robot10 E-FIX-3 scan (law 6c, fix the whole group): every place an allotment consumable (al* candle / hair oil, lx* son phấn box) leaves a
person's bag in jallot / jration / jstip. Each site must say where the piece went: ilUsedUp (spent: S.il.used count), ilStock (uses left: the
Nội vụ phủ counted stock), or the copy carries the uses (lxGive) / a guarded route (stipRestore → «kho» record). usage: python3 dev/test/r10e-consume-scan.py [rev]"""
import re,subprocess,sys
rev=sys.argv[1] if len(sys.argv)>1 else None
def src(f):
    return subprocess.run(['git','show',f'{rev}:{f}'],capture_output=True,text=True).stdout if rev else open(f).read()
rows=[];bad=0
for f in ['dev/build/jallot.js','dev/build/jration.js','dev/build/jstip.js']:
    for i,l in enumerate(src(f).split('\n'),1):
        for m in re.finditer(r'(\w+)\.inv\.splice\(',l):
            seg=l[max(0,m.start()-260):m.end()+200]
            fn=(re.findall(r'function (\w+)\(',l[:m.start()]) or ['(wrap)'])[-1]
            how='ilUsedUp' if 'ilUsedUp' in seg else 'ilStock' if 'ilStock' in seg else None
            if not how and fn=='stipRestore': how='guarded stipRestore → store record «kho» (a real piece, uses left)'
            if not how and fn=='stipGoods' and 'staff' not in seg: how='?'
            if not how and 'stipTeaIx' in seg: how='not an allotment consumable (tea served; IL_USED_KD «Trà», used up)'
            if not how: how='NONE'
            if how in ('NONE','?'): bad+=1
            rows.append((f.split('/')[-1],i,fn,how))
print('| file:line | function | where the piece goes |\n|---|---|---|')
for r in rows: print(f'| {r[0]}:{r[1]} | {r[2]} | {r[3]} |')
print(f'sites {len(rows)} · unmarked {bad}');sys.exit(1 if bad else 0)
