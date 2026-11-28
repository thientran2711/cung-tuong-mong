#!/usr/bin/env python3
# review/oan-pace: summary of dev/measure/oan-pace.js runs (LIVE vs branch). usage: python3 dev/measure/oan-pace-sum.py <label>=<file.jsonl> ...
# A «targeting» = a HOSTILE deed of an NPC that lands on her (HOST below: quarrels, cold shoulder, gossip, every harm act; not help / visits / gifts).
# Per run: oán toward her by month (mean of living consorts / max / how many at ≥ «Chút oán»…), NPC targetings per day in year 1 (36 days),
# share of days with ≥ 2 targetings, first targeting day, and the deed keys seen.
import json,sys,collections
HOST_SOC={'provoke','humil','drop','gossip','cx:strip','cx:slap'}
NOT_HARM={'harm:tieuhuy','harm:taint','harm:cook'}
TAG={}
def hostile(k):
    if k in NOT_HARM:return False
    if TAG.get(k) in ('harm','scheme'):return True
    if k in ('rumor:j95b','cx3:pmDuel'):return True
    if k.startswith('harm:'):return True
    if k in HOST_SOC or k=='npc:act':return True
    return any(x in k for x in ('strip','slap','lotdo','tat','humil','provoke','mock','insult'))
def load(f):
    R=[]
    for l in open(f):
        l=l.strip()
        if l.startswith('{'):R.append(json.loads(l))
    return R
def one(label,R,days=36):
    for r in R:TAG.update(r.get('tag') or {})
    keys=collections.Counter();per=[];first=[];two=0;nd=0;doers=[]
    for r in R:
        D={int(k):v for k,v in r['days'].items()}
        last=min(days,r.get('wk',days))
        f=None
        for w in range(last):
            L=[x for x in D.get(w,[]) if hostile(x[0])]
            for x in D.get(w,[]):keys[(x[0],hostile(x[0]))]+=1
            n=len(L);per.append(n);nd+=1
            if n>=2:two+=1
            doers.append(len(set(x[1] for x in L)))
            if n and f is None:f=w
        first.append(f if f is not None else '-')
    mo=collections.defaultdict(list)
    for r in R:
        for m in r['mo']:mo[m['m']].append(m)
    rows=[]
    for m in sorted(mo):
        L=mo[m];k=len(L)
        rows.append((m,round(sum(x['mean'] for x in L)/k,1),round(sum(x['mx'] for x in L)/k,1),round(sum(x['oan'] for x in L)/k,1),round(sum(x['deep'] for x in L)/k,1),round(sum(x['my'] for x in L)/k,1),round(sum(x['ghen'] for x in L)/k,1),round(sum(x['dg30'] for x in L)/k,1),k))
    bym=collections.defaultdict(list)
    for r in R:
        D={int(k):v for k,v in r['days'].items()}
        for w in range(min(days,r.get('wk',days))):bym[w//3].append(sum(1 for x in D.get(w,[]) if hostile(x[0])))
    print(' targetings/day by month (year 1):',' '.join(f'm{m+1}:{sum(L)/len(L):.2f}' for m,L in sorted(bym.items())))
    avg=sum(per)/max(1,len(per))
    print(f'== {label}: {len(R)} lives, {nd} days of year 1; ends {collections.Counter(r["end"] for r in R)}')
    print(f'targetings/day {avg:.2f} · distinct NPCs/day {sum(doers)/max(1,len(doers)):.2f} · days ≥2 {100*two/max(1,nd):.0f}% · days with any {100*sum(1 for x in per if x)/max(1,nd):.0f}% · first day {first}')
    print(' month | oán mean | oán max | n≥Chút | n≥Oán | her max | ghen mean | danger≥30 | lives')
    for x in rows:print(' %5s | %8s | %7s | %6s | %5s | %7s | %9s | %9s | %s'%x)
    print(' hostile keys:',', '.join(f'{k}:{n}' for (k,h),n in keys.most_common() if h))
    print(' tags:',', '.join(f'{k}={TAG.get(k)}' for (k,h),n in keys.most_common(20)))
    print(' other keys  :',', '.join(f'{k}:{n}' for (k,h),n in keys.most_common(14) if not h))
    S=collections.defaultdict(lambda:[0,0,0])
    for r in R:
        for c,(n,s,mx) in (r.get('src') or {}).get('oan',{}).items():S[c][0]+=n;S[c][1]+=s;S[c][2]=max(S[c][2],mx)
    print(' oán-toward-her sources (calls, sum, max):',', '.join(f'{c} {v[0]}/{v[1]}/{v[2]}' for c,v in sorted(S.items(),key=lambda z:-z[1][1])[:12]))
    G=collections.defaultdict(lambda:[0,0,0])
    for r in R:
        for c,(n,s_,mx) in (r.get('src') or {}).get('ghen',{}).items():G[c][0]+=n;G[c][1]+=s_;G[c][2]=max(G[c][2],mx)
    if G:print(' ghen-toward-her sources (calls, sum, max):',', '.join(f'{c} {v[0]}/{v[1]}/{v[2]}' for c,v in sorted(G.items(),key=lambda z:-z[1][1])[:12]))
    # review/oan-pace-ghen: per quarter (months 1–3, 4–6, 7–9, 10–12): targetings/day, oán mean / max, ghen mean / max (mean over lives of the month-end values)
    qt=collections.defaultdict(list)
    for m,L in bym.items():qt[m//3].extend(L)
    qm=collections.defaultdict(list)
    for r in R:
        for x in r['mo']:
            if x['m']>=1:qm[(x['m']-1)//3].append(x)
    Q=[]
    for q in range(4):
        L=qt.get(q,[]);M=qm.get(q,[])
        f=lambda k:round(sum(x.get(k,0) for x in M)/len(M),1) if M else '-'
        Q.append((f'Q{q+1}',round(sum(L)/len(L),2) if L else '-',f('mean'),f('mx'),f('ghen'),f('gmx'),f('g60')))
    print(' quarter | targ/day | oán mean | oán max | ghen mean | ghen max | n ghen≥60')
    for x in Q:print(' %7s | %8s | %8s | %7s | %9s | %8s | %s'%x)
    h1=[n for m,L in bym.items() if m<6 for n in L];h2=[n for m,L in bym.items() if m>=6 for n in L]
    if h1 and h2:a1,a2=sum(h1)/len(h1),sum(h2)/len(h2);print(f' half 1 {a1:.2f}/day · half 2 {a2:.2f}/day · ratio {a2/max(a1,1e-9):.2f} (aim ≤ 1.5, never 0)')
    return dict(label=label,avg=avg,two=two/max(1,nd),first=first,rows=rows,q=Q)
if __name__=='__main__':
    for a in sys.argv[1:]:
        l,f=a.split('=',1);one(l,load(f))
