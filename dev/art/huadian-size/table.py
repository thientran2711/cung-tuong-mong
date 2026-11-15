import json,numpy as np,collections
M=json.load(open("meas.json")); FW=json.load(open("fwmed.json"))
OV={}
for l in open("overrides.txt"):
    if l.strip() and not l.startswith("#"):
        a,t,v=l.split(); OV[(a,t)]=float(v)
R={}
for k,v in M.items():
    pid,t,_=k.rsplit("-",2); short=pid.split("-")[1]
    r=OV.get((short,t), (v["hw"] or 0)/FW[pid])
    R[(short,t)]=r
json.dump({f"{a}-{t}":round(v,4) for (a,t),v in sorted(R.items())},open("ratios.json","w"),indent=0)
ref=R[("c03","t1")]; print("c03 t1 ref",round(ref,3))
CAP={"t1":1.0,"t2":1.05,"t3":1.1,"t4":1.15,"t5":1.2,"t6":1.25,"t7":0.5,"t8":1.2}
print("tier | group | n | min | median | max | cap(rule) | over cap")
for t in ["t1","t2","t3","t4","t5","t6","t7","t8"]:
    for g in ("c","m","all"):
        xs=sorted([(v,a) for (a,tt),v in R.items() if tt==t and (g=="all" or a[0]==g)])
        vals=[x[0] for x in xs]; cap=CAP[t]*ref
        over=[a for v,a in xs if v>cap*1.1]
        if g=="all": print(f"{t} | all | {len(vals)} | {min(vals):.3f} | {np.median(vals):.3f} | {max(vals):.3f} | {cap:.3f} | {len(over)}")
        else: print(f"{t} | {g} | {len(vals)} | {min(vals):.3f} | {np.median(vals):.3f} | {max(vals):.3f} | {cap:.3f} | {len(over)}: "+" ".join(f"{a}({v:.2f})" for v,a in sorted(xs,reverse=True) if v>cap*1.1))
