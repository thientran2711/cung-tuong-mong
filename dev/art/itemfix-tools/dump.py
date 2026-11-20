import sys,os,time
sys.path.insert(0,"/home/user/cung-tuong-mong/dev/art/store-all")
out=sys.argv[1]; ages=sys.argv[2].split(",")
sys.argv=["build_all.py"]
import build_all as B
t0=time.time(); n=0
for age in ages:
    os.makedirs(f"{out}/{age}",exist_ok=True)
    for p in B.PEOPLE:
        if not B._kc_drawn(B.ALIAS.get(p,p)): continue
        ranks=list(range(1,9))+(["nude","thaihau"] if p.startswith("c") else [])
        for t in ranks:
            try:
                s=B.thaihau(p,age)[1] if t=="thaihau" else B.build(p,t,age)[1]
            except Exception as e: s="ERR "+repr(e)[:300]
            open(f"{out}/{age}/{p}_{t}.txt","w").write(s); n+=1
    print(age,n,round(time.time()-t0),flush=True)
