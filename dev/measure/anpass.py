#!/usr/bin/env python3
"""balance-pass: one table with 95% Wilson intervals for the owner targets.
usage: python3 dev/measure/anpass.py ev  <label> <evbot EVOUT files: prefix_mode_seed.json ...>   (hint / rand / same bots)
       python3 dev/measure/anpass.py sens <label> <runb.js outputs ...>                          (sensible bot, inpage6 + inx/inpz, HHSTOP)
Targets (OWNER_DECISIONS 11/14 + 15/11 15:10Z): early death ~40-45 %, Hoàng hậu ~32 %, childbirth death 8-12 % per birth,
hint clearly beats rand, same loses; pace: Hoàng hậu after ~188 tuần."""
import json,sys,re,math,collections,os
def wilson(k,n,z=1.96):
    if not n:return (0,0)
    p=k/n;d=1+z*z/n;c=(p+z*z/(2*n))/d;h=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return (100*max(0,c-h),100*min(1,c+h))
def pc(k,n):lo,hi=wilson(k,n);return f"{100*k/max(1,n):.0f}% ({k}/{n}; {lo:.0f}–{hi:.0f})"
OLD=('HH-STOP','Tuổi xuân qua đi','CAP-STOP','Thái phi','Thái hậu','tiên đế','Tuẫn','Vương gia','Xuất gia','Lên ngôi','băng hà','ma ma','Xuất cung tuổi')
def cause(f):
    if any(o in f for o in OLD):return 'old/survived'
    if 'Tuổi trời' in f:return 'lifespan (mortality dice)'
    if 'Khó sinh' in f or 'phá thai' in f:return 'childbirth'
    if 'độc' in f:return 'poison'
    if 'Bệnh' in f or 'nguy kịch' in f or 'nhiễm lạnh' in f:return 'illness'
    if 'lãnh cung' in f.lower() or 'Chết rét' in f or 'Phát điên' in f:return 'cold palace'
    if 'tru di' in f or 'ban' in f.lower() and ('rượu' in f or 'chết' in f or 'lụa' in f):return 'execution'
    if 'đòn' in f or 'trượng' in f or 'đánh chết' in f or 'tra khảo' in f or 'Quỳ' in f:return 'beaten'
    if 'dìm' in f or 'đẩy' in f or 'diệt khẩu' in f:return 'murder'
    if 'tự vẫn' in f or 'tự tận' in f:return 'suicide'
    if 'đuổi' in f or 'Xuất cung' in f or 'Tư thông' in f:return 'expelled'
    return 'other: '+f[:30]
def q(a,p):
    a=sorted(a);return a[min(len(a)-1,int(p*len(a)))] if a else 0
kind,lab=sys.argv[1],sys.argv[2];F=[f for f in sys.argv[3:] if not f.endswith('.ext.json')]
if kind=='ev':
    by=collections.defaultdict(list)
    for fn in F:
        m=re.search(r'_(hint|rand|same)_(\d+)\.json$',fn)
        try:L=json.load(open(fn))
        except Exception:continue
        by[m.group(1)]+= [x for x in L if not x.get('err') and x.get('title') not in ('TIMEOUT','CRASH')]
    print(f"### {lab}\n| bot | lives | avg max rank | Phi+ (5+) | Hoàng hậu (7+) | died before HH | births/life | childbirth death /birth | causes |\n|---|---|---|---|---|---|---|---|---|")
    for md in ('hint','rand','same'):
        L=by.get(md,[]);n=len(L)
        if not n:print(f"| {md} | 0 | | | | | | | |");continue
        hh=sum(1 for x in L if x['max']>=7);phi=sum(1 for x in L if x['max']>=5)
        died=[x for x in L if x['max']<7 and cause(x['fate']+' '+x['title'])!='old/survived']
        b=sum((x.get('births') or 0) for x in L);cb=sum(1 for x in L if cause(x['fate'])=='childbirth')
        am=sum(x['max'] for x in L)/n;sd=math.sqrt(sum((x['max']-am)**2 for x in L)/max(1,n-1));
        print(f"| {md} | {n} | {am:.2f} ± {1.96*sd/math.sqrt(n):.2f} | {pc(phi,n)} | {pc(hh,n)} | {pc(len(died),n)} | {b/n:.2f} | {pc(cb,b)} | {dict(collections.Counter(cause(x['fate']) for x in died))} |")
    for md in ('hint','rand','same'):
        for x in by.get(md,[]):
            if x['max']<7 and cause(x['fate'])!='old/survived' and x.get('trail'):
                print(f"- {md} died ({x['fate'][:40]}), last event picks: "+" / ".join(f"{t[0]}: {t[1]} [{t[3]}] «{t[2][:50]}»" for t in x['trail'][-3:]))
else:
    L=[]
    for fn in F:
        try:L+=[x for x in json.load(open(fn)) if 'fate' in x]
        except Exception:pass
    bad=[x for x in L if x['fate']=='TIMEOUT' or x['fate'].startswith('CRASH')];L=[x for x in L if x not in bad];n=len(L)
    if not n:print(lab,'no data');sys.exit()
    hh=[x for x in L if x.get('maxRank',0)>=7];died=[x for x in L if x.get('maxRank',0)<7 and cause(x['fate'])!='old/survived']
    births=sum((x.get('ix') or {}).get('births',x.get('kids',0)) for x in L);cb=sum(1 for x in L if cause(x['fate'])=='childbirth')
    risk=[r for x in L for r in (x.get('ix') or {}).get('bRisk',[])]
    pz=[(x.get('ix') or {}).get('pz',{}).get('ev',[]) for x in L]
    wk=[x['hhWk'] for x in hh if x.get('hhWk') is not None]
    print(f"### {lab} (sensible bot, n={n}, timeout/crash {len(bad)})")
    print("| target | measured (95% CI) |\n|---|---|")
    print(f"| Hoàng hậu ~32% | {pc(len(hh),n)} |")
    print(f"| early death ~40–45% | {pc(len(died),n)} |")
    print(f"| childbirth death 8–12% per birth | {pc(cb,births)}; mean risk shown {sum(risk)/max(1,len(risk)):.1f} |")
    print(f"| pace: HH after ~188 tuần | median {q(wk,.5) if wk else '-'} tuần (p25 {q(wk,.25) if wk else '-'}, p75 {q(wk,.75) if wk else '-'}, n={len(wk)}) |")
    print(f"- early-death causes: {dict(collections.Counter(cause(x['fate']) for x in died).most_common())}")
    print(f"- poison aimed at her per life {sum(len(p) for p in pz)/n:.1f}, landed {sum(sum(1 for e in p if e.get('hit')) for p in pz)/n:.2f}")
    print(f"- per origin (n/HH/died): "+", ".join(f"{o} {sum(1 for x in L if x['origin']==o)}/{sum(1 for x in hh if x['origin']==o)}/{sum(1 for x in died if x['origin']==o)}" for o in sorted(set(x['origin'] for x in L))))
    def endk(x):
        if x.get('maxRank',0)>=7:return 'Hoàng hậu'
        c=cause(x['fate']);return 'survived (no HH)' if c=='old/survived' else 'died: '+c
    print(f"- ending mix: {dict(collections.Counter(endk(x) for x in L).most_common())}")
    print(f"- difficulty tags: {dict(collections.Counter(x.get('diff','?') for x in L))}")
