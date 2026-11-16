#!/usr/bin/env python3
"""danh-balance: static scan of every Danh change literal in the game code (dev/build/j*.js, not the assembled all*.js).
Counts `danh:<n>` / `danh:-<n>` object literals (gains/losses in w/l/fx/c objects) and `danh:<expr>` non-literal ones per file,
plus Danh gates (`.danh >= n`, `.danh < n` …) with a typed number. usage: python3 dev/measure/danhscan.py [--gates]"""
import re,glob,os,sys,collections
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
F=sorted(f for f in glob.glob(D+'/j*.js'))
lit=re.compile(r'\bdanh\s*:\s*(-?\d+)\b');expr=re.compile(r'\bdanh\s*:\s*(?!-?\d+\b)([^,}\]]{1,40})');gate=re.compile(r'\.danh\|*\|*\d*\)?\s*(>=|<=|>|<)\s*(\d+)')
rows=[]
for f in F:
    t=open(f,encoding='utf-8').read();n=os.path.basename(f)
    L=[int(x) for x in lit.findall(t)];E=expr.findall(t);G=gate.findall(t)+re.findall(r'\(S\.danh\|\|0\)\s*(>=|<=|>|<)\s*(\d+)',t)
    if L or E or G:rows.append((n,sum(1 for x in L if x>0),sum(x for x in L if x>0),max([x for x in L if x>0] or [0]),sum(1 for x in L if x<0),sum(-x for x in L if x<0),len(E),len(G)))
print('| file | gain literals | sum | max | loss literals | sum | computed (danh:expr) | typed gates |\n|---|---|---|---|---|---|---|---|')
for r in sorted(rows,key=lambda r:-(r[1]+r[4]+r[6])):print('| '+' | '.join(map(str,r))+' |')
T=[sum(r[i] for r in rows) for i in (1,2,4,5,6,7)];print(f'| TOTAL | {T[0]} | {T[1]} | | {T[2]} | {T[3]} | {T[4]} | {T[5]} |')
