#!/usr/bin/env python3
"""danh-p1: exam and Tài nghệ use per life, from run_rep.js outputs made with intn.js (x.ix.exl) + indanh.js (x.ix.ds).
usage: python3 dev/measure/antn.py <label>=<file.json>[,<file2.json>...] ...
Prints: her exams sat / passed (pooled Wilson CI) and per-life pass share; mean score parts (play / Tứ đức / art / shift / bar);
pass rate by tier; Tài nghệ study uses per life; charity uses per life (both doors) from the Danh source counters."""
import json,sys,math,collections
def load(fs):
    L=[]
    for f in fs.split(','):
        try:L+=[x for x in json.load(open(f)) if 'fate' in x and x['fate']!='TIMEOUT' and not x['fate'].startswith('CRASH')]
        except Exception as e:print('skip',f,e,file=sys.stderr)
    return L
def wil(k,n,z=1.96):
    if not n:return '-'
    p=k/n;d=1+z*z/n;c=(p+z*z/(2*n))/d;h=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return f"{100*p:.0f}% ({k}/{n}; {100*max(0,c-h):.0f}–{100*min(1,c+h):.0f})"
def mci(a):
    if not a:return '-'
    n=len(a);m=sum(a)/n;sd=math.sqrt(sum((x-m)**2 for x in a)/max(1,n-1));return f"{m:.2f} ± {1.96*sd/math.sqrt(n):.2f} (n={n})"
A=[(a.split('=',1)[0],load(a.split('=',1)[1])) for a in sys.argv[1:]]
ex=lambda x:(x.get('ix') or {}).get('exl') or {'sat':0,'pass':0,'L':[],'tn':{}}
print("| | "+" | ".join(l for l,_ in A)+" |\n|---|"+"---|"*len(A))
row=lambda t,f:print(f"| {t} | "+" | ".join(f(L) for _,L in A)+" |")
row('lives',lambda L:str(len(L)))
row('her exams passed / sat (pooled)',lambda L:wil(sum(ex(x)['pass'] for x in L),sum(ex(x)['sat'] for x in L)))
row('exams sat per life',lambda L:mci([ex(x)['sat'] for x in L]))
for t in (0,1,2):
    row(f'pass rate, tier {t} exams',lambda L,t=t:(lambda E:wil(sum(e['ok'] for e in E),len(E)))([e for x in L for e in ex(x)['L'] if e['tier']==t]))
for k,lab in (('tot','score total'),('bar','bar (after attitude shift)'),('vir','Tứ đức part'),('art','art / Đức part'),('sh','examiner shift')):
    row(f'mean {lab} per exam',lambda L,k=k:mci([e[k] for x in L for e in ex(x)['L'] if e.get(k) is not None]))
row('play part (total − Tứ đức − art)',lambda L:mci([e['tot']-e['vir']-e['art'] for x in L for e in ex(x)['L']]))
row('Tài nghệ study uses per life',lambda L:mci([sum(ex(x)['tn'].values()) for x in L]))
def ch(x):
    D=(x.get('ix') or {}).get('ds') or {};return sum(v[0] for k,v in D.items() if 'Phát bạc cứu giúp' in k)
row('charity uses per life (Hành sự card)',lambda L:mci([ch(x) for x in L]))
row('max rank',lambda L:mci([x.get('maxRank',0) for x in L]))
for lab,L in A:
    C=collections.Counter()
    for x in L:C.update(ex(x)['tn'])
    n=max(1,len(L));print(f"- {lab} Tài nghệ uses per life: "+", ".join(f"{k} {v/n:.1f}" for k,v in C.most_common(10)))
