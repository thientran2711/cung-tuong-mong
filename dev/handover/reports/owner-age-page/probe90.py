#!/usr/bin/env python3
"""probe90.py <out states.json>: HEAD every state picture on the live CDN -> {person:{age:{state:url}}}.
states: kc(thieu nu), ngheo(nha ngheo), tm1..tm8 (trung y), cold(lanh cung), tN(rank, maids only)"""
import json,sys,concurrent.futures as cf,urllib.request
B="https://ctm-img.victoria-tntt.workers.dev/"
AGES=["a18","a26","a36","a51"]
def head(u):
    for _ in range(3):
        try:
            r=urllib.request.Request(u,method="HEAD",headers={"User-Agent":"ctm-page90"})
            return urllib.request.urlopen(r,timeout=30).status==200
        except urllib.error.HTTPError as e:
            if e.code==404: return False
        except Exception: pass
    return False
jobs=[]
for i in range(1,33):
    c=f"c{i:02d}"
    for a in AGES:
        for s in ["kc","ngheo","tcold"]+[f"tm{k}" for k in range(1,9)]:
            jobs.append((c,a,s,f"img/fig-consort-{c}-{s}-{a}.webp"))
for i in range(1,61):
    m=f"m{i:02d}"
    for a in AGES:
        for s in ["kc","ngheo","cold"]+[f"tm{k}" for k in range(1,9)]+[f"t{k}" for k in range(1,9)]:
            jobs.append((m,a,s,f"img/fig-maid-{m}-{s}-{a}.webp"))
        jobs.append((m,a,"plain",f"img/fig-maid-{m}-{a}.webp"))
with cf.ThreadPoolExecutor(32) as ex: res=list(ex.map(lambda j:head(B+j[3]),jobs))
m={}
for (p,a,s,f),ok in zip(jobs,res):
    if ok: m.setdefault(p,{}).setdefault(a,{})[s]=f
json.dump(m,open(sys.argv[1],"w"),indent=0)
import collections
print(len(m),"people",collections.Counter(s for p in m.values() for a in p.values() for s in a))
# Quoc tang (v3) outfits: consort-tiers sources, all consorts x ages x t1..t8
D={"a18":"b10","a26":"b10-a26","a36":"b10-a36","a51":"b10-a51"}
T="https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/"
j3=[(f"c{i:02d}",a,t) for i in range(1,33) for a in AGES for t in range(1,9)]
with cf.ThreadPoolExecutor(32) as ex: r3=list(ex.map(lambda j:head(f"{T}{j[0]}/{D[j[1]]}/{j[0]}_{j[1]}_t{j[2]}_v3.png"),j3))
v3={}
for (c,a,t),ok in zip(j3,r3):
    if ok: v3.setdefault(a,{}).setdefault(c,[]).append(t)
json.dump({"states":m,"v3":v3},open(sys.argv[1],"w"),indent=0)
print("v3",{a:{c:len(t) for c,t in p.items()} for a,p in v3.items()})
