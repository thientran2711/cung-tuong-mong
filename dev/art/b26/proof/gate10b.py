# B26FAB5: base vs new gate fail LINES for the given cells (argv base new k1 k2 ...)
import sys,json,re
sys.path.insert(0,"dev/art"); sys.path.insert(0,"dev/art/store-all")
import build_all as ba
ba._kc_drawn=lambda p: True
B=json.load(open(sys.argv[1])); N=json.load(open(sys.argv[2]))
def fl(o): return {re.sub(r"/tmp/\S+","",l.strip())[:110] for l in o.splitlines() if l.strip().startswith(("FAIL","[0","[1"))}
for k in sys.argv[3:]:
    p,r,a,s=k.split("|"); rr=r if r=="nude" else int(r)
    _,ob=ba.gate(p,rr,a,B[k]); _,on=ba.gate(p,rr,a,N[k]); fb,fn=fl(ob),fl(on)
    print(k,"lenB",len(B[k]),"lenN",len(N[k])); [print("   NEW ",x) for x in sorted(fn-fb)]; [print("   GONE",x) for x in sorted(fb-fn)]; print("   same:",len(fb&fn))
