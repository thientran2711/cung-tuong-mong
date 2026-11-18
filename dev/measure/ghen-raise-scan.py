#!/usr/bin/env python3
"""MOODKNOW step 0 (A) scan: every write of the jealousy SCORE `.ghen` in dev/build/j*.js (assembled modules only), classified
RAISE (adds) / LOWER / SET / VIA ghenUp. Usage: python3 dev/measure/ghen-raise-scan.py [--list] [--pg]  → table + counts; exit 1 if any direct RAISE is left.
--pg (MOOD-MEM, whole ghen family): the same scan for HER jealousy score toward a consort `.pg` (one way to raise it: j1 pgUp); other `.pg`
fields (scar / plot progress, dataset page) are skipped by name."""
import re,sys,os
D=os.path.join(os.path.dirname(__file__),'..','build')
asm=open(os.path.join(D,'assemble.py'),encoding='utf-8').read()
mods=re.findall(r"'(j[^']+\.js)'",asm[asm.index('for f in ['):])
FLD,UP=('pg','pgUp') if '--pg' in sys.argv else ('ghen','ghenUp')
W=re.compile(r'([A-Za-z_$][\w$.\[\]]*?)\.'+FLD+r'\s*(\+=|-=|=(?!=))\s*([^;]{0,90})')
SKIP_PG=('dataset','s','p','z','scar','pl')
rows=[];cnt={}
for f in mods:
    p=os.path.join(D,f)
    if not os.path.exists(p):continue
    for i,l in enumerate(open(p,encoding='utf-8'),1):
        if l.lstrip().startswith(('/*','*','//')):continue
        for m in W.finditer(l):
            lhs,op,rhs=m.groups()
            if FLD=='pg' and (lhs.split('.')[-1] in SKIP_PG or re.match(r'^pg\b',rhs.strip())):continue
            if lhs.startswith(('BAL','MOOD_N')) or lhs.endswith(('BAL.ea.ext','BAL.mood','BAL.ea.card.dan','BAL.ea.fx.khoe','B','C','X','F','G','PK','c','N')) and op=='=' and not re.search(FLD,rhs):kind='CONST'
            elif op=='+=':kind='RAISE'
            elif op=='-=':kind='LOWER'
            else:
                r=rhs.replace(' ','')
                if re.search(FLD+r'(\|\|0\))?[-]',r):kind='LOWER'
                elif re.search(FLD+r'(\|\|0\))?\+',r) or re.search(r'Math\.max\(',r) and FLD in r and '+' in r:kind='RAISE'
                elif FLD not in r and re.match(r'^0\b',r):kind='SET0'
                else:kind='SET'
            rows.append((f,i,kind,(lhs+'.'+FLD+op+rhs)[:110]));cnt[kind]=cnt.get(kind,0)+1
    for i,l in enumerate(open(p,encoding='utf-8'),1):
        n=len(re.findall(r'\b'+UP+r'\(',l))
        if n and 'function '+UP not in l:cnt['VIA '+UP]=cnt.get('VIA '+UP,0)+n
raise_rows=[r for r in rows if r[2]=='RAISE']
if '--list' in sys.argv:
    for r in rows:print(f'{r[0]}:{r[1]}\t{r[2]}\t{r[3]}')
mods_r=sorted({r[0] for r in raise_rows})
print('counts',cnt,'| direct RAISE sites',len(raise_rows),'in',len(mods_r),'modules',' '.join(mods_r))
sys.exit(1 if raise_rows else 0)
