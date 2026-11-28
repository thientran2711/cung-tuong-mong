#!/usr/bin/env python3
"""D-ROW37 (OB 55 «điểm ghét, điểm oán tăng quá nhanh», law 11): every game line that writes a
liking score (x.rel = an NPC's liking of HER, x.rl[k] / S.rl[k] = liking of a person) or an oán score
(x.oan, x.ro[k], S.ro[k]) STRAIGHT to the field instead of through the one door (j9 affAdd / oanAdd,
where the pace joanpace opDn / opUp + stat-pace live).
Kinds: FALL (liking down = «ghét» up, outside the pace) · RAISE-OAN (oán up outside the pace) ·
other writes (clamps / resets / fades / liking rises / coop mirrors) = OK, counted.
Usage: python3 dev/measure/ghet-door-scan.py [build_dir] [--all]  -> table; exit 1 when FALL or RAISE-OAN > 0."""
import re,sys,os,glob
a=[x for x in sys.argv[1:] if not x.startswith('--')]
d=a[0] if a else os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
ALL='--all' in sys.argv
LHS=re.compile(r'(?<![\w$.])([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\[[^\]\[]{1,30}\])*?)\.(rel|rl\[[^\]]{1,30}\]|oan|ro\[[^\]]{1,30}\])\s*(\+\+|--|[+\-]=|=(?!=))')
SKIP={'jbal.js','jbal2.js'}
# known, not a pace leak (checked by hand 28/11, D-ROW37): a SET of a story stance or a fresh person, or an event record field
KNOWN={('j4.js','v.rel=-25'):'story seed: «oldmis» rival starts at a set dislike (quest init, not a cause per buổi)',
 ('j4.js','e.rel=-40'):'story seed: the «enemy» rival quest starts at a set dislike',
 ('j67.js','v.rel=Math.min(v.rel||0,-20)'):'story seed: j67 cast of an old-grudge rival (floor, not a rise)',
 ('j8.js','n.rel=0'):'a newly born consort starts at 0',('jagmaid.js','n.rel=0'):'a new maid starts at 0',
 ('jrcp.js','ev.rel=-n*2'):'ev = a reciprocity EVENT record (its .rel is applied later through the doors), not a person'}
def stmt(l,i):
    j=i;dep=0
    while j<len(l):
        ch=l[j]
        if ch in '([{':dep+=1
        elif ch in ')]}':
            if dep==0:break
            dep-=1
        elif ch in ';,' and dep==0:break
        j+=1
    return l[i:j].strip()
rows=[]
for f in sorted(glob.glob(os.path.join(d,'j*.js'))):
    b=os.path.basename(f)
    if b in SKIP:continue
    for n,l in enumerate(open(f,encoding='utf-8'),1):
        for m in LHS.finditer(l):
            obj,fld,op=m.group(1),m.group(2),m.group(3)
            rhs=stmt(l,m.end())
            base=fld.split('[')[0];oanish=base in('oan','ro')
            if b=='j9.js' and re.search(r'function (oanAdd|affAdd|msOanAdd|msAffAdd)',l):kind='door'
            elif b.startswith('jcoop'):kind='coop-mirror'
            elif op=='--' or op=='-=' and not rhs.startswith('-'):kind='RAISE-OAN' if False else ('fall' if oanish else 'FALL')
            elif op=='++' or op=='+=':
                neg=rhs.startswith('-')
                kind=('fall' if neg else 'RAISE-OAN') if oanish else ('FALL' if neg else 'rise')
            else:
                me=obj+'.'+fld
                if re.fullmatch(r'-?\s*\d+',rhs) or rhs.startswith('-'):kind='set-low' if not oanish else 'set'
                elif re.search(r'(?<![\w$])'+re.escape(base)+r'\b',rhs) or re.escape(me) and me in rhs:
                    if re.search(r'Math\.min\(',rhs) and not oanish:kind='FALL'
                    elif re.search(r'(?<![\w$])-\s*[\w(]',rhs) and not re.search(r'\+',rhs):kind='fall' if oanish else 'FALL'
                    elif re.search(r'\+\s*(?!-)',rhs):kind='RAISE-OAN' if oanish else 'rise'
                    else:kind='clamp/fade'
                else:kind='set'
            if not oanish and kind=='set-low':kind='FALL'
            w=(obj+'.'+fld+op+rhs)
            if kind=='FALL' and (b,w) in KNOWN:kind='known'
            rows.append((b,n,kind,w[:120]))
# D-ROW37 rv: a liking fall written through spAdd(x,"rel",n<0) gets stat-pace only and skips the ghét pace (opDn) = the same leak
SPR=re.compile(r'spAdd\(([^,()]{1,30}),\s*"rel",\s*([^)]{1,60})\)')
def balv(expr):
    if re.fullmatch(r'-\s*[\w.]+',expr):return -1
    m=re.fullmatch(r'BAL((?:\.\w+)+)',expr)
    if not m:return 0
    k=m.group(1).split('.')[-2:]
    for bf in ('jbal.js','jbal2.js','jbaleff.js'):
        t=open(os.path.join(d,bf),encoding='utf-8').read()
        mm=re.search(r'\b'+k[0]+r':\{[^{}]*?\b'+k[1]+r':(-?\d+)',t)
        if mm:return int(mm.group(1))
    return 0
for f in sorted(glob.glob(os.path.join(d,'j*.js'))):
    b=os.path.basename(f)
    if b in SKIP or b=='jstatpace.js' or b.startswith('jcoop'):continue
    for n,l in enumerate(open(f,encoding='utf-8'),1):
        for m in SPR.finditer(l):
            v=m.group(2).strip()
            if re.fullmatch(r'-?\d+',v):kind='FALL' if int(v)<0 else 'rise'
            else:kind='FALL' if balv(v)<0 else ('rise' if balv(v)>0 else 'sp-var')
            rows.append((b,n,kind,('spAdd '+m.group(0))[:120]))
from collections import Counter
C=Counter(r[2] for r in rows)
print('| file:line | kind | write |\n|---|---|---|')
for r in rows:
    if ALL or r[2] in('FALL','RAISE-OAN'):print(f'| {r[0]}:{r[1]} | {r[2]} | `{r[3]}` |')
for r in rows:
    if r[2]=='known':print(f'| {r[0]}:{r[1]} | known | `{r[3]}` — {KNOWN[(r[0],r[3])]} |')
print('\nTOTAL',dict(sorted(C.items())))
print('GHET-DOOR-SCAN:',C.get('FALL',0),'FALL (liking down outside affAdd) ·',C.get('RAISE-OAN',0),'RAISE-OAN (oán up outside oanAdd)')
sys.exit(1 if C.get('FALL') or C.get('RAISE-OAN') else 0)
