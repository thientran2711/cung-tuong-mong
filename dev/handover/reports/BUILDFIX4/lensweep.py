import sys,os,json,io,contextlib,multiprocessing as mp
ART="/home/user/cung-tuong-mong/dev/art"; sys.path.insert(0,ART); sys.path.insert(0,ART+"/store-all")
os.chdir("/home/user/cung-tuong-mong")
SEASON=os.environ.get("SEASON","thu"); RANKS=[int(x) for x in os.environ.get("RANKS","3,6,7,8").split(",")]
def init():
    global B
    with contextlib.redirect_stdout(io.StringIO()):
        import build_all as B
def job(p):
    if not B._kc_drawn(B.ALIAS.get(p,p)): return p,None
    o={}
    for t in RANKS:
        try:
            with contextlib.redirect_stdout(io.StringIO()): S=B.build_season(p,t,"a18",SEASON)[1]
            o[t]=len(S)
        except Exception as e: o[t]=repr(e)[:120]
    return p,o
if __name__=="__main__":
    init(); people=sys.argv[2:] or B.PEOPLE
    with mp.Pool(min(8,os.cpu_count()),initializer=init) as pool: res=pool.map(job,people)
    json.dump(res,open(sys.argv[1],"w"))
    for t in RANKS:
        over=[(p,o[t]) for p,o in res if o and (not isinstance(o[t],int) or o[t]>10000)]
        print("t%d over %d:"%(t,len(over))," ".join("%s:%s"%x for x in over))
