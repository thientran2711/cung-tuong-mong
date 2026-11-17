#!/usr/bin/env python3
"""balance-2 r2 (D11) family scan: every roll that reads the balance-core art curve (artO / artOE / artSide / virO / deckOdds / rdOdds "a"),
with its card / event name, the Danh it wins / loses, and the live (origin/main) art term on the same line.
usage: python3 dev/measure/artscan.py [live-ref]   (run inside the worktree)"""
import re,subprocess,sys,glob,os
LIVE=sys.argv[1] if len(sys.argv)>1 else 'origin/main'
PAT=re.compile(r'\b(artOE?|artSide|virO|deckOdds)\(([^()]*)\)')
def live(f):
  try:return subprocess.run(['git','show',f'{LIVE}:{f}'],capture_output=True,text=True).stdout.splitlines()
  except Exception:return []
rows=[]
for f in sorted(glob.glob('dev/build/j*.js')):
  if f.endswith('jbalcore.js'):continue
  L=open(f,encoding='utf-8').read().splitlines();LV=live(f);LVt='\n'.join(LV)
  for i,l in enumerate(L):
    for m in PAT.finditer(l):
      s=l[max(0,m.start()-500):m.end()+260]
      nm=re.findall(r'(?:\{n:|c6\(|ev\()"([^"]{3,40})"',l[:m.start()+1])
      nm=nm[-1] if nm else re.findall(r'(?:function |const |PEND\.)(\w+)',l[:m.start()]+' ')[-1:] or ['?']
      nm=nm if isinstance(nm,str) else nm[0]
      tail=l[m.end():m.end()+260]
      w=re.search(r'w:\{([^}]*)\}',tail);lo=re.search(r'\bl:\{([^}]*)\}',tail)
      dw=re.search(r'danh:([^,}]+)',w.group(1)) if w else None;dl=re.search(r'danh:([^,}]+)',lo.group(1)) if lo else None
      # live term: the same card name on main, the art term it used
      lt='-'
      if nm!='?':
        for x in LV:
          if nm in x:
            t=re.findall(r'(S\.arts\.\w+\*[\d.]+(?:\*tt)?|\(S\.arts\.\w+\|\|0\)\*\d+|artW\("\w+",S\.arts\.\w+\)\*\d+|artW2?\([^)]*\)\*?[\w.\[\]]*|p\.arts\.\w+\*[\d.]+\*?m?|l\*\d+|lv\*\d+)',x)
            if t:lt=' '.join(dict.fromkeys(t));break
      rows.append((f[10:],i+1,nm,m.group(1)+'('+m.group(2)+')',dw.group(1) if dw else '',dl.group(1) if dl else '',lt))
print('| file:line | card / event | art term (branch) | Danh win | Danh loss | live term |\n|---|---|---|---|---|---|')
for r in rows:print(f'| {r[0]}:{r[1]} | {r[2]} | `{r[3]}` | {r[4]} | {r[5]} | `{r[6]}` |')
print(f'\n{len(rows)} reads')
