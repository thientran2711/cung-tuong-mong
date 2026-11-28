#!/usr/bin/env python3
"""D-ROW37 summary of dev/measure/oan-rate.js runs. usage: python3 dev/measure/oan-rate-sum.py <label=file.jsonl>...
Prints (markdown): per build the oán / ghét gained toward her PER MONTH (mean per life, through the door, and the whole score-read rise),
targetings per day, oán level at m3/m6/m12, and the TOP SOURCES of oán and of ghét over the year (share of all gained)."""
import json,sys,collections
B=[]
for a in sys.argv[1:]:
    lab,f=a.split('=',1) if '=' in a else (a,a)
    L=[json.loads(l) for l in open(f) if l.strip().startswith('{')]
    B.append((lab,L))
def mean(x):return sum(x)/len(x) if x else 0
MO=12
print('## oán / ghét gained toward her per month (mean per life; door = j9 oanAdd / affAdd, all = read from the scores after each step)\n')
hdr='| build | lives | kind | '+' | '.join(f'm{m+1}' for m in range(MO))+' | year |'
print(hdr);print('|'+'---|'*(MO+4))
for lab,L in B:
    for kind in('oan','ghet'):
        for src in('door','all'):
            row=[]
            for m in range(MO):
                v=[]
                for d in L:
                    if d.get('turn',0)<=m and d.get('end')!='months':continue
                    if src=='door':v.append(sum((d.get('msrc',{}).get(str(m),{}).get(kind,{}) or {}).values()))
                    else:v.append((d.get('all',{}).get(str(m),{}) or {}).get(kind,0))
                row.append(mean(v))
            print(f'| {lab} | {len(L)} | {kind} {src} | '+' | '.join(f'{x:.0f}' for x in row)+f' | {sum(row):.0f} |')
print('\n## targetings (hostile deeds landing on her) and levels\n')
print('| build | targetings/day y1 | days ≥2 | first day (lives) | oán mean m3/m6/m12 | oán max m3/m6/m12 | consorts ≥«Oán» m12 | Ghen mean m12 | ends |')
print('|---|---|---|---|---|---|---|---|---|')
for lab,L in B:
    tp=[];d2=[];first=[];lv={3:[],6:[],12:[]};mx={3:[],6:[],12:[]};oz=[];gz=[];ends=collections.Counter()
    for d in L:
        ends[d.get('end')]+=1
        days=d.get('days',{});W=d.get('wk',0) or 1
        per=[len(days.get(str(w),[])) for w in range(W)]
        tp.append(mean(per));d2.append(mean([1 if x>=2 else 0 for x in per]))
        fs=[w for w in range(W) if per[w]>0];first.append(str(fs[0]) if fs else 'none')
        mo={x['m']:x for x in d.get('mo',[])}
        for k in lv:
            if k in mo:lv[k].append(mo[k]['mean']);mx[k].append(mo[k]['mx'])
        if 12 in mo:oz.append(mo[12]['oan']);gz.append(mo[12]['ghen'])
    print(f'| {lab} | {mean(tp):.2f} | {100*mean(d2):.0f} % | {", ".join(first)} | '+' / '.join(f'{mean(lv[k]):.1f}' for k in lv)+' | '+' / '.join(f'{mean(mx[k]):.0f}' for k in mx)+f' | {mean(oz):.1f} | {mean(gz):.1f} | {dict(ends)} |')
for kind,name in(('oan','oán'),('ghet','ghét (liking lost)')):
    print(f'\n## top sources of {name} toward her over the year (door; total over all lives, share)\n')
    print('| build | source (caller) | rises | total | share | max one |');print('|---|---|---|---|---|---|')
    for lab,L in B:
        T=collections.defaultdict(lambda:[0,0,0])
        for d in L:
            for k,e in (d.get('src',{}).get(kind,{}) or {}).items():
                t=T[k];t[0]+=e[0];t[1]+=e[1];t[2]=max(t[2],e[2])
        tot=sum(t[1] for t in T.values()) or 1
        for k,t in sorted(T.items(),key=lambda x:-x[1][1])[:10]:
            print(f'| {lab} | `{k}` | {t[0]} | {t[1]:.0f} | {100*t[1]/tot:.0f} % | {t[2]:.0f} |')
