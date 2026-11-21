import sys,os,io,contextlib,json,multiprocessing as mp
sys.path.insert(0,"dev/art"); sys.path.insert(0,"dev/art/store-all"); os.chdir("/home/user/cung-tuong-mong")
PHI="FABRIC: the FABRIC is thin, light, flowing silk and gauze with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha)."
def init():
    global B,MC
    with contextlib.redirect_stdout(io.StringIO()):
        import build_all as B, master_common as MC
def job(p):
    if not B._kc_drawn(B.ALIAS.get(p,p)): return p,None
    o={}
    for se in ("xuan","ha","thu","dong"):
        for t in (6,7,8):
            with contextlib.redirect_stdout(io.StringIO()): S=B.build_season(p,t,"a18",se)[1]
            d=len(S)
            o[f"{se}{t}"]=(d, d-len(MC.BROCADE)+len(MC.B29_C_GAM)+(40 if t==7 and se=="thu" else 0)-(31 if t==6 else 0), d-len(MC.BROCADE)+len(PHI)+(40 if t==7 and se=="thu" else 0)-(31 if t==6 else 0))
    return p,o
if __name__=="__main__":
    init()
    with mp.Pool(8,initializer=init) as pool: res=pool.map(job,B.PEOPLE)
    for k in [f"{se}{t}" for se in ("xuan","ha","thu","dong") for t in (6,7,8)]:
        v=[o[k] for p,o in res if o]
        print(k,"over now/C_GAM/PHI:",sum(a>10000 for a,b,c in v),sum(b>10000 for a,b,c in v),sum(c>10000 for a,b,c in v),"of",len(v))
