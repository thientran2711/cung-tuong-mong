import sys; import os; sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))); from cat import *
from collections import Counter
err=[];names=Counter();shapes=Counter();summ=Counter();grp=Counter();var=Counter();dirs=Counter()
for rid,rn,L in R:
    assert len(L)==4,rid
    gs={x[1] for x in L}; 
    if len(gs)<3: err.append(f"{rid}: <3 groups")
    if not any(x[2]=="A" for x in L): err.append(f"{rid}: no dark")
    if not any(x[3] in "RT" for x in L): err.append(f"{rid}: no leave/follow")
    if not any(x[3] in "OQ" for x in L): err.append(f"{rid}: no stay")
    dm=[(x[3],x[4]) for x in L]
    if len(set(dm))<4: err.append(f"{rid}: crossroad combo repeats {dm}")
    if len({x[5] for x in L})<4: err.append(f"{rid}: summit repeats")
    for x in L:
        if len(x[0].split())>4: err.append(f"{rid}: name >4 words {x[0]}")
        names[x[0]]+=1; shapes[(x[5],x[2],x[6])]+=1; summ[x[5]]+=1; grp[x[1]]+=1; var[x[2]]+=1; dirs[x[3]+x[4]]+=1
err+= [f"dup name {n}" for n,c in names.items() if c>1]
err+= [f"dup shape {s}" for s,c in shapes.items() if c>1]
print("branches",len(R),"endings",sum(len(L) for _,_,L in R))
print("ERRORS",err or 0)
print("groups",sorted(grp.items())); print("variants",dict(var)); print("crossroads",sorted(dirs.items()))
print("seat summits", {k:summ[k] for k in ["NDE","THH","HH","TM","NV","QP"]})
