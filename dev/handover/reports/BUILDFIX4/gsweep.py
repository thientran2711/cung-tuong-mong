# real builder gate sweep (BUILDFIX3 pattern): build_season + build_all.gate (store check, --season) ; a18
import sys,os,json,io,contextlib,multiprocessing as mp,collections
ART="/home/user/cung-tuong-mong/dev/art"; sys.path.insert(0,ART); sys.path.insert(0,ART+"/store-all")
os.chdir("/home/user/cung-tuong-mong")
SEASONS=os.environ.get("SEASONS","root,xuan,ha,thu,dong").split(","); RANKS=[int(x) for x in os.environ.get("RANKS","1,2,3,4,5,6,7,8").split(",")]
def init():
    global B
    with contextlib.redirect_stdout(io.StringIO()):
        import build_all as B
def job(p):
    if not B._kc_drawn(B.ALIAS.get(p,p)): return p,None
    out=[]
    for se in SEASONS:
        B.GATE_SEASON=None if se=="root" else se
        for t in RANKS:
            try:
                with contextlib.redirect_stdout(io.StringIO()):
                    S=(B.build_season(p,t,"a18",se) if se!="root" else B.build(p,t,"a18"))[1]
                    ok,txt=B.gate(p,t,"a18",S)
                fl=[l.strip()[:160] for l in txt.splitlines() if "FAIL" in l][:4]
                itm=("The item is in a contrasting colour" not in S) and ("HELD ITEM COLOUR:" not in S)
                out.append((se,t,len(S),ok,fl,itm))
            except Exception as e: out.append((se,t,0,False,["EXC "+repr(e)[:150]],False))
    return p,out
if __name__=="__main__":
    init(); people=sys.argv[2:] or B.PEOPLE
    with mp.Pool(min(8,os.cpu_count()),initializer=init) as pool: res=pool.map(job,people)
    json.dump(res,open(sys.argv[1],"w"))
    tab=collections.defaultdict(lambda:[0]*9); lenf=collections.defaultdict(lambda:[0]*9); bad=[]
    for p,o in res:
        if o is None: continue
        for se,t,L,ok,fl,itm in o:
            if not ok: tab[se][t]+=1
            if L>10000: lenf[se][t]+=1
            if itm: bad.append((p,se,t))
            if not ok and L<=10000: print("NONLEN FAIL",p,se,t,fl[:2])
    for se in SEASONS: print(se,"FAIL t1..t8:",tab[se][1:],"LEN>10k:",lenf[se][1:])
    print("item-colour words lost:",bad[:10])
