# BUILDFIX5: every 'brocade' / 'gấm' phrase in built prompts (default thu t1-t8, all persons). brscan.py [season]
import sys,os,io,re,contextlib,multiprocessing as mp,collections
ART="/home/user/cung-tuong-mong/dev/art"; sys.path.insert(0,ART); sys.path.insert(0,ART+"/store-all"); os.chdir("/home/user/cung-tuong-mong")
SE=sys.argv[1] if len(sys.argv)>1 else "thu"
def init():
    global B
    with contextlib.redirect_stdout(io.StringIO()): import build_all as B
def job(p):
    if not B._kc_drawn(B.ALIAS.get(p,p)): return []
    B.GATE_SEASON=None if SE=="root" else SE; out=[]
    for t in range(1,9):
        with contextlib.redirect_stdout(io.StringIO()):
            S=(B.build_season(p,t,"a18",SE) if SE!="root" else B.build(p,t,"a18"))[1]
        for m in re.finditer(r"[^,;:.()]{0,40}\b(brocade|gấm|ceremonial)\b[^,;:.()]{0,25}",S,re.I): out.append((t,re.sub(r"\s+"," ",m.group(0).strip())))
    return out
if __name__=="__main__":
    init(); c=collections.Counter()
    with mp.Pool(4,initializer=init) as pool:
        for r in pool.map(job,B.PEOPLE): c.update(r)
    for (t,ph),n in sorted(c.items()): print(f"t{t} x{n}: {ph}")
