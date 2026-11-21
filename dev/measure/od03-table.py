#!/usr/bin/env python3
"""OD03 before/after table from run5b shards with EXTRA=od03-count.js. usage: od03-table.py <dir> <labelA[+labelA2]> <labelB> ..."""
import json,sys,glob,os
D=sys.argv[1]
def load(lab):
    tr={};mo={};lives=[]
    for f in sorted(sum((glob.glob(os.path.join(D,f'{l}_*.json')) for l in lab.split('+')),[])):
        if f.endswith('.ext.json'):continue
        ext=f[:-5]+'.ext.json'
        try:L=json.load(open(f))
        except Exception:L=[]
        lives+=L
        C=None
        if os.path.exists(ext):C=json.load(open(ext)).get('od3')
        elif L and L[-1].get('od3'):C=L[-1]['od3']
        if not C:continue
        for k,v in C['tr'].items():
            t=tr.setdefault(k,{'n':0,'w':0,'o':0,'sh':0,'kn':0})
            for z in t:t[z]+=v.get(z,0)
        for k,v in C['mo'].items():
            t=mo.setdefault(k,{'n':0,'sung':0,'danh':0,'nights':0,'hh':0})
            for z in t:t[z]+=v.get(z,0)
    return tr,mo,lives
for lab in sys.argv[2:]:
    tr,mo,lives=load(lab)
    hh=sum(1 for x in lives if x.get('title')=='HH');yrs=[x.get('years',0) for x in lives if x.get('title')=='HH']
    print(f'\n### {lab}: lives {len(lives)} · HH {hh} ({100*hh/max(1,len(lives)):.0f} %) · years to HH {sorted(yrs)}')
    print('| who · choice · her best art vs his month art | tries | won | win % | mean true odds | mean shown odds | knew it |')
    print('|---|---|---|---|---|---|---|')
    agg={}
    for k in sorted(tr):
        v=tr[k];n=v['n']
        print(f"| {k} | {n} | {v['w']} | {100*v['w']/n:.0f} | {v['o']/n:.0f} | {v['sh']/n:.0f} | {v['kn']} |")
        kd=k.split(':')[2];a=agg.setdefault(kd,[0,0,0]);a[0]+=n;a[1]+=v['w'];a[2]+=v['o']
    print('| **all, by kind** | | | | | | |')
    for kd in ('fav','neu','dis','none'):
        if kd in agg:a=agg[kd];print(f'| {kd} | {a[0]} | {a[1]} | {100*a[1]/a[0]:.0f} | {a[2]/a[0]:.0f} | | |')
    print('\n| her month (best art vs month art) | months | Sủng / month | Danh / month | became HH that month |')
    print('|---|---|---|---|---|')
    for kd in ('fav','neu','dis','none'):
        if kd in mo:v=mo[kd];n=max(1,v['n']);print(f"| {kd} | {v['n']} | {v['sung']/n:+.2f} | {v['danh']/n:+.2f} | {v['hh']} |")
