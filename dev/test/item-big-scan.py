#!/usr/bin/env python3
"""Scan: every kitItem(...) call with size lg/xl (big item display) in dev/build/j*.js. Prints a table."""
import re,glob,sys
rows=[]
for f in sorted(glob.glob('dev/build/j*.js')):
    for n,l in enumerate(open(f,encoding='utf8',errors='ignore'),1):
        for m in re.finditer(r'kitItem\(',l):
            seg=l[m.start():m.start()+400]
            sz=re.search(r'size:\s*"(\w+)"',seg)
            sz=sz.group(1) if sz else '(var/none)'
            if sz in('lg','xl','(var/none)') or 'big' in sz:
                src=re.search(r'src:\s*([\w\.\|\(\)\[\]"]+)',seg)
                rows.append((f.split('/')[-1],n,sz,'512' if 'src512' in seg else 'src',src.group(1)[:30] if src else ''))
print('file | line | size | pic | src-expr')
for r in rows: print(' | '.join(map(str,r)))
print('TOTAL',len(rows),'big-size calls; using src512:',sum(1 for r in rows if r[3]=='512'))
