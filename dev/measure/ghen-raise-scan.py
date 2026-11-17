#!/usr/bin/env python3
"""MOODKNOW step 0 (A) scan: every write of the jealousy SCORE `.ghen` in dev/build/j*.js (assembled modules only), classified
RAISE (adds) / LOWER / SET / VIA ghenUp. Usage: python3 dev/measure/ghen-raise-scan.py [--list]  → table + counts; exit 1 if any direct RAISE is left."""
import re,sys,os
D=os.path.join(os.path.dirname(__file__),'..','build')
asm=open(os.path.join(D,'assemble.py'),encoding='utf-8').read()
mods=re.findall(r"'(j[^']+\.js)'",asm[asm.index('for f in ['):])
W=re.compile(r'([A-Za-z_$][\w$.\[\]]*?)\.ghen\s*(\+=|-=|=(?!=))\s*([^;]{0,90})')
rows=[];cnt={}
for f in mods:
    p=os.path.join(D,f)
    if not os.path.exists(p):continue
    for i,l in enumerate(open(p,encoding='utf-8'),1):
        if l.lstrip().startswith(('/*','*','//')):continue
        for m in W.finditer(l):
            lhs,op,rhs=m.groups()
            if lhs.startswith(('BAL','MOOD_N')) or lhs.endswith(('BAL.ea.ext','BAL.mood','BAL.ea.card.dan','BAL.ea.fx.khoe','B','C','X','F','G','PK','c','N')) and op=='=' and not re.search(r'ghen',rhs):kind='CONST'
            elif op=='+=':kind='RAISE'
            elif op=='-=':kind='LOWER'
            else:
                r=rhs.replace(' ','')
                if re.search(r'ghen(\|\|0\))?[-]',r):kind='LOWER'
                elif re.search(r'ghen(\|\|0\))?\+',r) or re.search(r'Math\.max\(',r) and 'ghen' in r and '+' in r:kind='RAISE'
                elif 'ghen' not in r and re.match(r'^0\b',r):kind='SET0'
                else:kind='SET'
            rows.append((f,i,kind,(lhs+'.ghen'+op+rhs)[:110]));cnt[kind]=cnt.get(kind,0)+1
    for i,l in enumerate(open(p,encoding='utf-8'),1):
        n=len(re.findall(r'\bghenUp\(',l))
        if n and 'function ghenUp' not in l:cnt['VIA ghenUp']=cnt.get('VIA ghenUp',0)+n
raise_rows=[r for r in rows if r[2]=='RAISE']
if '--list' in sys.argv:
    for r in rows:print(f'{r[0]}:{r[1]}\t{r[2]}\t{r[3]}')
mods_r=sorted({r[0] for r in raise_rows})
print('counts',cnt,'| direct RAISE sites',len(raise_rows),'in',len(mods_r),'modules',' '.join(mods_r))
sys.exit(1 if raise_rows else 0)
