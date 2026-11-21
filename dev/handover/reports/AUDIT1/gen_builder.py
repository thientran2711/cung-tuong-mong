import sys,os,io,contextlib,json,traceback
p,season=sys.argv[1],sys.argv[2]
sys.path.insert(0,"/home/user/cung-tuong-mong/dev/art/store-all"); sys.argv=["build_all.py",p]
import build_all as B
out="/tmp/claude-0/-home-user-cung-tuong-mong/64c33808-8e0c-555a-ac89-5ede2b5c3e8f/scratchpad/b"
for r in range(1,9):
    fn=f"{out}/{p}_t{r}_{season}.txt"
    try:
        e=io.StringIO()
        with contextlib.redirect_stderr(e), contextlib.redirect_stdout(io.StringIO()):
            t=(B.build_season(p,r,"a18","dong") if season=="dong" else B.build(p,r,"a18"))[1]
        open(fn,"w").write(t)
        ok,msg=B.gate(p,r,"a18",t); open(fn+".gate","w").write(("PASS\n" if ok else "FAIL\n")+msg)
        open(fn+".drawn","w").write(str(B._kc_drawn(p)))
    except Exception as ex:
        open(fn+".exc","w").write(traceback.format_exc()[-600:])
