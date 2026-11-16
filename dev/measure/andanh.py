#!/usr/bin/env python3
"""danh-balance: Danh over a life from runb/run_par outputs made with indanh.js (+ inx/inpromo).
usage: python3 dev/measure/andanh.py <label>=<file.json>[,<file2.json>...] ...   (one column per label)
Prints: lives / Hoàng hậu / early death / max rank; Danh at tuần checkpoints (lives still running then: mean ± 95% CI, median, range);
tuần spent blocked by the Danh row vs the Sủng row of promoReqP (inpromo.js); Danh gained / lost per life by source kind; top sources."""
import json,sys,math,collections,re
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
    n=len(a);m=sum(a)/n;sd=math.sqrt(sum((x-m)**2 for x in a)/max(1,n-1));s=sorted(a);med=s[n//2]
    return f"{m:.1f} ± {1.96*sd/math.sqrt(n):.1f} (med {med}, {s[0]}–{s[-1]}, n={n})"
OLD=('HH-STOP','CAP-STOP','Thái phi','Thái hậu','tiên đế','Tuẫn','Vương gia','Xuất gia','Lên ngôi','băng hà','ma ma','Xuất cung tuổi')
A=[(a.split('=',1)[0],load(a.split('=',1)[1])) for a in sys.argv[1:]]
H=' | '.join(l for l,_ in A);print(f"| | {H} |\n|---|"+"---|"*len(A))
row=lambda t,f:print(f"| {t} | "+' | '.join(f(L) for _,L in A)+" |")
row('lives',lambda L:str(len(L)))
row('reached Hoàng hậu',lambda L:wil(sum(1 for x in L if x.get('maxRank',0)>=7),len(L)))
row('died / ended early',lambda L:wil(sum(1 for x in L if not any(o in x['fate'] for o in OLD)),len(L)))
row('max rank (0 Đáp ứng … 7 HH)',lambda L:mci([x.get('maxRank',0) for x in L]))
for t in ['12','24','48','72','96','120','144']:
    row(f'Danh at tuần {t}',lambda L,t=t:mci([x['ix']['dt'][t] for x in L if (x.get('ix') or {}).get('dt',{}).get(t) is not None]))
row('Danh at the end of the life',lambda L:mci([x['danh'] for x in L if x.get('danh') is not None]))
row('rank at tuần 144',lambda L:mci([x['ix']['rk']['144'] for x in L if (x.get('ix') or {}).get('rk',{}).get('144') is not None]))
def blk(L,pat):
    n=0;tot=0
    for x in L:
        P=(x.get('ix') or {}).get('pr',{});W=(x.get('ix') or {}).get('rkW',{});tot+=sum(v for k,v in W.items() if int(k)<7)
        n+=sum(v for k,v in P.items() if re.search(pat,k))
    return f"{100*n/max(1,tot):.0f}% of tuần ({n}/{tot})"
row('tuần held back by the Danh row',lambda L:blk(L,r': Danh'))
row('tuần held back by the Sủng row',lambda L:blk(L,r': Sủng'))
def kinds(L):
    K=collections.defaultdict(lambda:[0,0])
    for x in L:
        for k,v in ((x.get('ix') or {}).get('ds') or {}).items():
            kk=k.split(':')[0];K[kk][0]+=v[1];K[kk][1]+=v[2]
    n=max(1,len(L));return K,n
allk=sorted({k for _,L in A for k in kinds(L)[0]})
for k in allk:
    row(f'Danh +gained / −lost per life: {k}',lambda L,k=k:(lambda K,n:f"+{K[k][0]/n:.1f} / −{K[k][1]/n:.1f}")(*kinds(L)))
def wks(L):
    return sum(max(1,(x.get('wk') or (x.get('turns',0)*3))) for x in L)
row('Danh net per 10 tuần (all sources)',lambda L:(lambda K,n:f"{10*sum(v[0]-v[1] for v in K.values())/max(1,wks(L)):+.2f}")(*kinds(L)))
print()
for lab,L in A:
    S=collections.defaultdict(lambda:[0,0,0])
    for x in L:
        for k,v in ((x.get('ix') or {}).get('ds') or {}).items():
            k2=re.sub(r' → .*$','',k) if k.startswith('pick') else k;a=S[k2];a[0]+=v[0];a[1]+=v[1];a[2]+=v[2]
    n=max(1,len(L));print(f"#### {lab}: top Danh sources per life (times · +gained · −lost)")
    for k,v in sorted(S.items(),key=lambda kv:-(kv[1][1]))[:14]:print(f"- {k}: {v[0]/n:.1f}× · +{v[1]/n:.1f} · −{v[2]/n:.1f}")
    print("  top losses: "+"; ".join(f"{k} −{v[2]/n:.1f}" for k,v in sorted(S.items(),key=lambda kv:-kv[1][2])[:6]))
