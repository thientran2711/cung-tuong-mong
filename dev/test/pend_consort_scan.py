#!/usr/bin/env python3
"""LUẬT SỬA CẢ NHÓM scan (schedules3-r4): every saveable card PEND.<id> in the assembled modules whose
params carry a consort id (RV(pp.x) / byKey(pp.x) / rivals.find(..pp.x..)), and whether the ledger knows
its actors: declared in P95B (j95b), an e68 card covered by E95B, or her own pick.
Usage: python3 dev/test/pend_consort_scan.py [old_ids.txt]   (old_ids = PEND ids that existed on schedules2)"""
import re,sys,os
d=os.path.join(os.path.dirname(__file__),'..','build')
asm=open(os.path.join(d,'assemble.py'),encoding='utf-8').read()
mods=re.findall(r"'(j[a-z0-9_]*\.js)'",asm.split('js=',1)[1].split('])',1)[0])
j95b=open(os.path.join(d,'j95b.js'),encoding='utf-8').read()
p95=j95b[j95b.index('const P95B='):j95b.index('const ROLEK95')]
dec=set(re.findall(r'(?:^|[{,\s/])([A-Za-z_][A-Za-z0-9_]*):\{(?:p|q72):',p95))
e95=j95b[j95b.index('const E95B='):j95b.index('const P95B=')] if 'const E95B=' in j95b else ''
edec=set(re.findall(r'(?:^|[{,\s/])([A-Za-z_][A-Za-z0-9_]*):\{r:',e95))
old=set(open(sys.argv[1]).read().split()) if len(sys.argv)>1 else None
RD=re.compile(r'(?:RV|byKey|rvById)\(\s*(?:pp|p|P)\.([a-zA-Z0-9_]+)|rivals\.find\([^)]*(?:pp|p)\.([a-zA-Z0-9_]+)')
rows=[]
for f in mods:
  if f.startswith('j95') or f=='jqsave.js':continue
  t=open(os.path.join(d,f),encoding='utf-8').read()
  for m in re.finditer(r'PEND\.([A-Za-z0-9_]+)\s*=',t):
    i=m.end();nx=re.search(r'\nPEND\.|\n(?:function |const |let |var |/\*)|\n\(function',t[i:])
    body=t[i:i+(nx.start() if nx else 4000)]
    ks=sorted({a or b for a,b in RD.findall(body)})
    ind=not ks and re.search(r'\b(?:RV|rivals|liveRivals)\b',body)
    if not ks and not ind:continue
    pid=m.group(1)
    if ind:ks=['(indirect: reads rivals)']
    st='P95B' if pid in dec else ('E95B' if pid.startswith('e68') and pid[3:] in edec else 'MISSING')
    rows.append((f,pid,','.join(ks),st,'' if old is None else ('old' if pid in old else 'NEW')))
w=lambda *a:print(' | '.join(a))
w('module','card','consort params','ledger','since schedules2')
for r in rows:w(*r)
print('\ncards:',len(rows),' declared:',sum(r[3]=='P95B' for r in rows),' missing:',sum(r[3]=='MISSING' for r in rows),
      ' new since schedules2:',sum(r[4]=='NEW' for r in rows) if old is not None else '-')
