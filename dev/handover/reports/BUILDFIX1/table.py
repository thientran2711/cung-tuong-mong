import json,sys,collections
def load(f):
    c=collections.Counter(); tot=fail=0; byrank=collections.Counter()
    for p,o in json.load(open(f)):
        if not o: continue
        for s,t,a,fl in o:
            tot+=1; fail+=bool(fl)
            if fl: byrank[t]+=1
            for k in {(x[0],x[1]) for x in fl}: c[k]+=1
    return c,tot,fail,byrank
b=load(sys.argv[1]); a=load(sys.argv[2])
print(f"| check | before | after |\n|---|---|---|")
for k in sorted(set(b[0])|set(a[0]),key=lambda k:-b[0].get(k,0)): print(f"| {k[0]} {k[1]} | {b[0].get(k,0)} | {a[0].get(k,0)} |")
print(f"| **prompts FAIL (any check)** | **{b[2]}/{b[1]}** | **{a[2]}/{a[1]}** |")
print("by rank after:",dict(sorted(a[3].items())))
