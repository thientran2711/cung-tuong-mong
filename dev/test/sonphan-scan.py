#!/usr/bin/env python3
"""LUẬT SỬA CẢ NHÓM scan (review/monthly-ration FIX 1, review point 4): every place in dev/build that names the old single cosmetic
"sonphan" (Son phấn Dương Châu). Givers (shop, bestow, gifts, contest prizes, theme tags, taint targets, ration goods) must be 0:
cosmetics are the lx boxes of jration. Allowed: the item definition kept for old saves + its art/price rows, and the alias/old-piece fix.
usage: python3 dev/test/sonphan-scan.py [--base <git ref>]   (prints a table; exit 1 if a giver still names sonphan)"""
import re,subprocess,sys,os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
ALLOW=[('j8.js',r'^\s*sonphan:\{n:"Son phấn Dương Châu"'),('j8.js',r'on:\[\],c:20'),('j8.js',r'^const ITIMG='),('j98.js',r'sonphan:0'),('jecon.js',r'priceTier:\{sonphan'),('jration.js',r'sonphan')]
def scan(read):
  rows=[]
  for f in sorted(x for x in read('ls') if x.endswith('.js') and x!='all.js'):
    for i,l in enumerate(read(f).split('\n'),1):
      if 'sonphan' in l:rows.append((f,i,any(f==a and re.search(p,l) for a,p in ALLOW),l.strip()[:110]))
  return rows
def cur(x):return sorted(os.listdir(D)) if x=='ls' else open(os.path.join(D,x),encoding='utf-8').read()
base=sys.argv[sys.argv.index('--base')+1] if '--base' in sys.argv else None
def old(x):
  if x=='ls':return subprocess.run(['git','ls-tree','--name-only',base+':dev/build'],capture_output=True,text=True).stdout.split()
  return subprocess.run(['git','show',f'{base}:dev/build/{x}'],capture_output=True,text=True).stdout
A=scan(cur);bad=[r for r in A if not r[2]]
if base:
  B=scan(old);print(f"before ({base}): {len(B)} lines name sonphan, givers {sum(1 for r in B if not r[2])} · after: {len(A)} lines, givers {len(bad)}")
print("| file | line | kind | text |\n|---|---|---|---|")
for f,i,ok,l in A:print(f"| {f} | {i} | {'kept (definition/alias)' if ok else 'GIVER'} | `{l.replace('|','/')}` |")
print("SONPHAN-SCAN "+("PASS" if not bad else f"FAIL {len(bad)} giver(s)"));sys.exit(1 if bad else 0)
