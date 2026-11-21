import sys,io,contextlib,re,json
sys.path.insert(0,"dev/art"); sys.path.insert(0,"dev/art/store-all")
with contextlib.redirect_stdout(io.StringIO()):
    import build_all as B, master_common as MC
R={"N1":(3,5,6,7,8),"ITEM":(3,5,6,7,8),"N2":(3,5,6,7,8),"E1":(5,),"E2":(3,5,6,8)}
MC.LEN_CUTS2[:]=[(o,n,m,R[m.split(" ")[0]]) for o,n,m,r in MC.LEN_CUTS2]
res=dict(json.load(open("dev/handover/reports/BUILDFIX4/before.json")))
for t in (3,6,7,8):
    over=[p for p,o in res.items() if o and isinstance(o[str(t)],int) and o[str(t)]>10000]
    left=[]
    for p in over:
        with contextlib.redirect_stdout(io.StringIO()): S=B.build_season(p,t,"a18","thu")[1]
        if len(S)>10000: left.append((p,len(S)))
    print(t,len(over),"->",len(left),left)
