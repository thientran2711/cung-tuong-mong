#!/usr/bin/env python3
"""D-ROW37 summary of dev/measure/noise-repeat.js. usage: python3 dev/measure/noise-repeat-sum.py <label=file.jsonl>...
Per build and surface (log = Sổ ghi, tin = Tin báo, news = world news): lines/day, repeats/day (= lines − distinct, numbers masked),
share of repeats, worst single line in one day; then the top repeated lines (families) per build."""
import json,sys,collections
B=[]
for a in sys.argv[1:]:
    lab,f=a.split('=',1);B.append((lab,[json.loads(l) for l in open(f) if l.startswith('{')]))
print('| build | lives | days | surface | lines / day | repeats / day | repeat share | worst one line in a day |\n|---|---|---|---|---|---|---|---|')
for lab,L in B:
    days=sum(len(d['days']) for d in L);T=collections.Counter();R=collections.Counter();W=collections.Counter()
    for d in L:
        for w,x in d['days'].items():
            for sf,(n,dn,mx) in x.items():T[sf]+=n;R[sf]+=n-dn;W[sf]=max(W[sf],mx)
    for sf in('log','tin','news'):
        if T[sf]:print(f'| {lab} | {len(L)} | {days} | {sf} | {T[sf]/days:.1f} | {R[sf]/days:.1f} | {100*R[sf]/T[sf]:.0f} % | {W[sf]} |')
for lab,L in B:
    A=collections.Counter()
    for d in L:
        for sf,T in d['top'].items():
            for k,c,w in T:A[(sf,k[:90])]+=c-1
    print(f'\n### {lab}: top repeated lines (extra copies over all lives)\n\n| surface | extra | line |\n|---|---|---|')
    for (sf,k),c in A.most_common(12):print(f'| {sf} | {c} | {k} |')
