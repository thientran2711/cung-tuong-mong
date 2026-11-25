#!/usr/bin/env python3
"""robot10 E-FIX-6 family scan: every bot option pushed in dev/measure/inpage6.js (+ robot10-in / inty / intn __xOpts files) —
does it carry an L label (so the 3-per-buổi «no progress» ban can reach it)? Before E-FIX-6 only labelled ones could be banned;
after, sensibleStep labels every option from its note("key") (or its source) before the ban filter.
usage: python3 dev/test/r10e-optlabel-scan.py [inpage6.js]"""
import re,sys,os
M=os.path.join(os.path.dirname(os.path.abspath(__file__)),'../measure')
p=sys.argv[1] if len(sys.argv)>1 else os.path.join(M,'inpage6.js')
s=open(p,encoding='utf-8').read()
# option sources: inpage6 sensibleStep + the hooks it calls (__persOpts robot10-in, __xOpts intn / instory)
srcs=[(os.path.basename(p),s)]+[(f,open(os.path.join(M,f),encoding='utf-8').read()) for f in ('robot10-in.js','intn.js','instory.js') if os.path.exists(os.path.join(M,f))]
rows=[]
for fn,t in srcs:
 for m in re.finditer(r'(?:opts|out)\.push\(\{',t):
    i=m.end();d=1;j=i
    while d and j<len(t):
        d+= t[j]=='{' or -(t[j]=='}');j+=1
    body=t[i:j-1];line=fn+':'+str(t.count('\n',0,m.start())+1)
    if 'f:' not in body:continue
    lab=bool(re.match(r'\s*L:',body))
    k=re.search(r'note\("([^"]+)"',body)
    rows.append((line,lab,k.group(1) if k else '(no note)'))
fix='o.L="n:"+' in s
print(f"{os.path.basename(p)}: {len(rows)} option sites · labelled {sum(r[1] for r in rows)} · unlabelled {sum(not r[1] for r in rows)} · auto-label rule {'ON' if fix else 'OFF'}")
print("| line | note key | L in source | bannable before | bannable now |")
print("|---|---|---|---|---|")
for line,lab,k in rows:
    print(f"| {line} | {k} | {'yes' if lab else 'no'} | {'yes' if lab else 'NO'} | {'yes' if (lab or fix) else 'NO'} |")
open_=sum(1 for r in rows if not r[1] and not fix)
print(f"open (unbannable) sites: {open_}")
sys.exit(1 if open_ else 0)
