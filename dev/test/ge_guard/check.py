import sys; import os; sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))); from cat import *
from collections import Counter
# r3 (owner 17/11 ~15:25Z): per branch 4 grand endings (each: thiện + ác variant titles, + its fail outcome) + 2 kỳ ngộ; NO normal endings.
err=[];names=Counter();shapes=Counter();summ=Counter();grp=Counter();var=Counter();dirs=Counter();tit=Counter()
for rid,rn,L in R:
    if len(L)!=4: err.append(f"{rid}: {len(L)} grand endings, need 4")
    gs={x[1] for x in L}
    if len(gs)<3: err.append(f"{rid}: <3 groups")
    if not any(x[2]=="A" for x in L): err.append(f"{rid}: no dark")
    if not any(x[3] in "RT" for x in L): err.append(f"{rid}: no leave/follow")
    if not any(x[3] in "OQ" for x in L): err.append(f"{rid}: no stay")
    dm=[(x[3],x[4]) for x in L]
    if len(set(dm))<4: err.append(f"{rid}: crossroad combo repeats {dm}")
    if len({x[5] for x in L})<4: err.append(f"{rid}: summit repeats")
    for x in L:
        if x[0] not in OTHER: err.append(f"{rid}: {x[0]} has no variant title"); continue
        t,a=titles(x)
        for n in (t,a):
            if len(n.replace(",","").split())>4: err.append(f"{rid}: title >4 chữ {n}")
            tit[n]+=1
        if t==a: err.append(f"{rid}: variants share a title {t}")
        names[x[0]]+=1; shapes[(x[5],x[2],x[6])]+=1; summ[x[5]]+=1; grp[x[1]]+=1; var[x[2]]+=1; dirs[x[3]+x[4]]+=1
err+= [f"dup ending name {n}" for n,c in names.items() if c>1]
err+= [f"dup title {n}" for n,c in tit.items() if c>1]
err+= [f"dup shape {s}" for s,c in shapes.items() if c>1]
err+= [f"orphan variant {k}" for k in OTHER if k not in names]
nb=len(R); ng=sum(len(L) for _,_,L in R)
print("branches",nb,"grand",ng,"variant titles",len(tit),"fail outcomes",ng,"ky ngo",nb*2,"normal",0)
print("ERRORS",err or 0)
print("groups",sorted(grp.items())); print("natural shading",dict(var)); print("crossroads",sorted(dirs.items()))
print("seat summits", {k:summ[k] for k in ["NDE","THH","HH","TM","NV","QP"]})
