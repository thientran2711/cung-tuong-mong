# BUILDFIX5 scan: count stiff / hugging / tier / cape / cloak words in built t6-t8 prompts (all persons, root + 4 seasons). scan.py out.json
import sys,os,json,io,re,contextlib,multiprocessing as mp,collections
ART="/home/user/cung-tuong-mong/dev/art"; sys.path.insert(0,ART); sys.path.insert(0,ART+"/store-all"); os.chdir("/home/user/cung-tuong-mong")
PAT={"STIFF on vân kiên":r"LONGER and STIFF","never hugging":r"never hugging them|not hugging",
     "TWO-TIER t7":r"TWO-TIER cloud collar","SINGLE-TIER":r"SINGLE-TIER cloud collar","cape (word)":r"\bcapes?\b","cloak":r"\bcloaks?\b",
     "gem line cape":r"NEVER on the robe, cape","'any cape'":r"any cape","capelet":r"\bcapelet"}
def init():
    global B
    with contextlib.redirect_stdout(io.StringIO()): import build_all as B
def job(p):
    if not B._kc_drawn(B.ALIAS.get(p,p)): return p,None
    out=[]
    for se in "root,xuan,ha,thu,dong".split(","):
        B.GATE_SEASON=None if se=="root" else se
        for t in (6,7,8):
            with contextlib.redirect_stdout(io.StringIO()):
                S=(B.build_season(p,t,"a18",se) if se!="root" else B.build(p,t,"a18"))[1]
            out.append((se,t,{k:len(re.findall(v,S)) for k,v in PAT.items()}))
    return p,out
if __name__=="__main__":
    init()
    with mp.Pool(min(8,os.cpu_count()),initializer=init) as pool: res=pool.map(job,B.PEOPLE)
    tab=collections.defaultdict(lambda:collections.Counter())
    for p,o in res:
        for se,t,c in (o or []):
            for k,v in c.items():
                if v: tab[(se,t)][k]+=1
    json.dump({f"{se} t{t}":dict(c) for (se,t),c in sorted(tab.items())},open(sys.argv[1],"w"),ensure_ascii=False,indent=0)
    for (se,t),c in sorted(tab.items()): print(se,"t%d"%t,dict(c))
