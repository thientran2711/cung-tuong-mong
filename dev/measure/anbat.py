#!/usr/bin/env python3
"""balance-after-truth: extra columns for sensible-bot files (run_par / runb): how lives END, frames on her, Emperor deaths.
usage: python3 dev/measure/anbat.py <label> <files...>"""
import json,sys,collections,math
sys.path.insert(0,__import__('os').path.dirname(__file__))
L=[]
for fn in sys.argv[2:]:
    try:L+=[x for x in json.load(open(fn)) if 'fate' in x and x['fate']!='TIMEOUT' and not x['fate'].startswith('CRASH')]
    except Exception:pass
n=len(L);lab=sys.argv[1]
if not n:print(lab,'no data');sys.exit()
def end(x):
    f=x['fate']+' '+x.get('title','')
    if x.get('maxRank',0)>=7:return 'Hoàng hậu'
    if 'Thái phi' in f or 'băng hà' in x.get('text','') or 'Xuất gia' in f or 'Tuẫn' in f:return 'Emperor died first'
    if 'HH-STOP' in f or 'CAP-STOP' in f:return 'cut (cap)'
    return 'died'
E=collections.Counter(end(x) for x in L)
fr=[sum((x.get('ix') or {}).get('on',{}).get(k,[0,0])[0] for k in ('frame','plant','giahoa')) for x in L]
frok=[sum((x.get('ix') or {}).get('on',{}).get(k,[0,0])[1] for k in ('frame','plant','giahoa')) for x in L]
yrs=[x.get('years',0) for x in L]
dem=sum(sum((x.get('ix') or {}).get('dem',{}).values()) for x in L)
print(f"#### {lab}: n={n}, ends {dict(E)}; mean life {sum(yrs)/n:.1f} game years; frames aimed at her {sum(fr)/n:.2f}/life (landed {sum(frok)/n:.2f}); demotions/confinements {dem/n:.2f}/life")
emp=[x for x in L if end(x)=='Emperor died first']
if emp:print(f"- Emperor died before she reached HH: {len(emp)} lives, at game year median {sorted(x.get('years',0) for x in emp)[len(emp)//2]:.1f}, her max rank {dict(collections.Counter(x.get('maxRank') for x in emp))}")
