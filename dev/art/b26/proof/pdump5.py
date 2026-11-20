# B26FAB5: parallel version of dump.py (same cells: every person x t1-t8 + nude x ages x (root, dong)); argv: root out ages nproc
import sys,os,json,io,contextlib,multiprocessing as mp
root=sys.argv[1]; out=os.path.abspath(sys.argv[2]); ages=sys.argv[3].split(","); NP=int(sys.argv[4]) if len(sys.argv)>4 else 3
def work(i):
    sys.path.insert(0,os.path.join(root,"dev/art/store-all")); sys.path.insert(0,os.path.join(root,"dev/art")); os.chdir(root)
    import build_all as ba
    ba._kc_drawn=lambda p: True
    R={}
    for age in ages:
        for n,p in enumerate(ba.PEOPLE):
            if n%NP!=i: continue
            for r in list(range(1,9))+["nude"]:
                for se in (None,"dong"):
                    if se and r=="nude": continue
                    k=f"{p}|{r}|{age}|{se}"
                    try:
                        with contextlib.redirect_stderr(io.StringIO()): R[k]=ba.build_season(p,r,age,se)[1]
                    except BaseException as e: R[k]="ERR:"+type(e).__name__+":"+str(e)[:200]
    return R
if __name__=="__main__":
    R={}
    with mp.Pool(NP) as P:
        for d in P.map(work,range(NP)): R.update(d)
    json.dump(R,open(out,"w"),ensure_ascii=False); print(out,len(R))
