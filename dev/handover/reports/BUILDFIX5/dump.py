# dump one built prompt: dump.py <person> <rank> <season|root> [out]
import sys,io,contextlib
sys.path.insert(0,"dev/art"); sys.path.insert(0,"dev/art/store-all")
with contextlib.redirect_stdout(io.StringIO()):
    import build_all as B
p,t,se=sys.argv[1],int(sys.argv[2]),sys.argv[3]
B.GATE_SEASON=None if se=="root" else se
with contextlib.redirect_stdout(io.StringIO()):
    S=(B.build_season(p,t,"a18",se) if se!="root" else B.build(p,t,"a18"))[1]
if len(sys.argv)>4: open(sys.argv[4],"w").write(S)
else: print(S)
