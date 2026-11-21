# usage: marklive.py <sha> <mark#>... : appends an updated row (last row wins) with Status LIVE + sha
import re,sys
p='dev/handover/OWNER_MARKS_2111.md';sha=sys.argv[1];ns=set(int(x) for x in sys.argv[2:])
rows={}
for l in open(p,encoding='utf-8'):
    m=re.match(r'\|\s*(\d+)\s*\|',l)
    if m: rows[int(m.group(1))]=l.rstrip('\n')
out=[]
for n in sorted(ns):
    if n not in rows: continue
    c=rows[n].split('|'); c[6]=' LIVE '; c[7]=f' {sha} '; out.append('|'.join(c))
open(p,'a',encoding='utf-8').write('\n'.join(out)+'\n');print(len(out),'rows')
