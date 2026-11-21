import sys,os,json,collections,io,contextlib,multiprocessing as mp
ART="/home/user/cung-tuong-mong/dev/art"; sys.path.insert(0,ART); sys.path.insert(0,ART+"/store-all")
os.chdir("/home/user/cung-tuong-mong")
AGES=["a18","a26","a36","a51","a65"]
SEASONS=[None if s=="root" else s for s in os.environ.get("SEASONS","root,xuan,ha,thu,dong").split(",")]
def init():
    global B,CS
    with contextlib.redirect_stdout(io.StringIO()):
        import build_all as B
        import check_store as CS
def job(p):
    out=[]
    if not B._kc_drawn(B.ALIAS.get(p,p)): return p,None
    for season in SEASONS:
        for t in range(1,9):
            for a in AGES:
                try:
                    with contextlib.redirect_stdout(io.StringIO()):
                        S=(B.build_season(p,t,a,season) if season else B.build(p,t,a))[1]
                except Exception as e:
                    out.append((season,t,a,[("EXC","build",repr(e)[:150])])); continue
                try:
                    with contextlib.redirect_stdout(io.StringIO()):
                        f,w,_=CS.check_text(S,f"tp{t}",age=a,skip_store=True)
                except Exception as e: f=[("EXC","check",repr(e)[:150])]
                out.append((season,t,a,[tuple(x[:3]) if isinstance(x,(list,tuple)) else ("?",str(x),"") for x in f]))
    return p,out
if __name__=="__main__":
    init()
    people=sys.argv[2:] or B.PEOPLE
    with mp.Pool(min(8,os.cpu_count()),initializer=init) as pool: res=pool.map(job,people)
    json.dump(res,open(sys.argv[1],"w"))
    cnt=collections.Counter(); tot=fail=0; held=0
    for p,o in res:
        if o is None: held+=1; continue
        for s,t,a,f in o:
            tot+=1; fail+=bool(f)
            for x in {(x[0],x[1]) for x in f}: cnt[x]+=1
    print(f"persons {len(res)-held} held {held} prompts {tot} FAIL {fail}")
    for k,v in cnt.most_common(): print(v,k)
