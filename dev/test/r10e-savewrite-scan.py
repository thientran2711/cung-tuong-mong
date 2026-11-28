#!/usr/bin/env python3
"""robot10 E-FIX-3 r3 scan (E81r item 3, law 11): every localStorage write in dev/build, classified. A SAVE writer (her slot SK(n), the co-op
week snapshot SNK, the co-op guest copy ELS, cloud writeSlot, Sổ › Ghi vào ô) must tell her when the browser refuses (saveBlocked / CTM_WAIT.saveBlocked).
usage: python3 dev/test/r10e-savewrite-scan.py [rev]   exit 1 when a save writer is silent"""
import re,subprocess,sys,glob,os
rev=sys.argv[1] if len(sys.argv)>1 else None
files=[f for f in sorted(glob.glob('dev/build/j*.js')) if not f.endswith('all.js')] if not rev else [l for l in subprocess.run(['git','ls-tree','--name-only',rev,'dev/build/'],capture_output=True,text=True).stdout.split() if re.search(r'/j[^/]*\.js$',l) and not l.endswith('all.js')]
src=lambda f:subprocess.run(['git','show',f'{rev}:{f}'],capture_output=True,text=True).stdout if rev else open(f).read()
SAVE=re.compile(r'SK\((SLOT|n|XIO\.to)\)|\bSNK\b|ELS\(\)|\bPD_KEY\b|\bSUCC_BK\b|\bNR_KEY\b|"ctm-(rare97|arcs|routes|emproad|kyngo)"')
# save-fail-warn-r2 (reviewer): + the cross-life ledgers written straight to localStorage (kết hiếm, tuyến truyện, lối riêng, Hoàng đế road, kỳ ngộ, successor book, no-repeat book)
# save-fail-warn (27/11): + slotPut (the codec writer every slot / week copy / guest copy goes through), + phúc duyên PD_KEY,
# + the co-op host's per-room store ctm-thin-d (jcoopthin LSK), + j1 store.set must tell for the cross-life stores (luân hồi / next life / life log)
rows=[];bad=0
for f in files:
    for i,l in enumerate(src(f).split('\n'),1):
        for m in re.finditer(r'localStorage\.setItem\(|LS\.set\(|slotPut\(',l):
            arg=l[m.end():m.end()+40]
            if l[max(0,m.start()-9):m.start()]=='function ': continue
            if not (SAVE.search(arg) or (os.path.basename(f)=='jcoopthin.js' and arg.startswith('LSK()'))): continue
            seg=l[m.start():m.start()+700]
            told='saveBlocked' in seg
            if not told: bad+=1
            rows.append((os.path.basename(f),i,arg.split(',')[0],'told' if told else 'SILENT'))
for f in files:
    if os.path.basename(f)!='j1.js': continue
    t=src(f);m=re.search(r'const store=\{.*',t)
    if m:
        told='saveBlocked' in m.group(0) and re.search(r'STORE_LIFE=/\^\(cung-luanhoi\|cung-kiep\|ctm-nextlife\|cung-colms\|ctm-ge\|ctm-gech\|ctm-kct\)',t) is not None
        if not told: bad+=1
        rows.append(('j1.js',t[:m.start()].count('\n')+1,'store.set cung-luanhoi/cung-kiep/ctm-nextlife/cung-colms/ctm-ge/ctm-gech/ctm-kct','told' if told else 'SILENT'))
print('| file:line | key | refused write |\n|---|---|---|')
for r in rows: print(f'| {r[0]}:{r[1]} | {r[2]} | {r[3]} |')
print(f'save writers {len(rows)} · silent {bad}  (other localStorage keys = settings / caches / co-op timers, not saves)');sys.exit(1 if bad else 0)
