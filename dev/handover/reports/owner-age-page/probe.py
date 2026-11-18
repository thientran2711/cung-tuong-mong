#!/usr/bin/env python3
"""probe.py <out manifest.json>: HEAD every source key on the CDN."""
import json,sys,concurrent.futures as cf,urllib.request
B="https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/"
DIRS={"a18":"b10","a26":"b10-a26","a36":"b10-a36","a51":"b10-a51"}
SAMPLE=["c03","c04","c12"]
def url(age,c,t,v): return f"{B}{c}/{DIRS[age]}/{c}_{age}_t{t}_v{v}.png"
def head(u):
    for _ in range(3):
        try:
            r=urllib.request.Request(u,method="HEAD",headers={"User-Agent":"ctm-age-page"})
            return urllib.request.urlopen(r,timeout=30).status==200
        except urllib.error.HTTPError as e:
            if e.code==404: return False
        except Exception: pass
    return False
jobs=[]
for age in DIRS:
    for i in range(1,33):
        c=f"c{i:02d}"
        pass
        for t in range(1,9):
            for v in range(3): jobs.append((age,c,t,v))
with cf.ThreadPoolExecutor(24) as ex: res=list(ex.map(lambda j:head(url(*j)),jobs))
m={}
for (age,c,t,v),ok in zip(jobs,res):
    m.setdefault(age,{}).setdefault(c,{}).setdefault(f"t{t}",[False]*3)[v]=ok
for age in list(m):
    for c in list(m[age]):
        if not any(any(x) for x in m[age][c].values()): del m[age][c]
json.dump(m,open(sys.argv[1],"w"),indent=0)
print({a:len(p) for a,p in m.items()})
