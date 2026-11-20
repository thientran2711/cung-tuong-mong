import sys,json,glob,random,collections
sys.path.insert(0,"dev/art"); sys.path.insert(0,"dev/art/store-all")
import build_all as ba, master_common as MC, winter_g28 as W
S=sys.argv[1]
def load(p):
    R={}
    for f in glob.glob(p): R.update(json.load(open(f)))
    return R
P=load(S+"/b2/final_*.json"); F=load(S+"/f2_a*.json")
groups=collections.defaultdict(list)
for k,f in F.items():
    q=P[k]
    if f==q or f.startswith("ERR"): continue
    p,r,a,s=k.split("|")
    cuts=sum(1 for o,n,_ in MC.DOAN_LEN_CUTS if o in q and o not in f)
    ang=bool(W.ANGLE_RX.search(q)) and not W.ANGLE_RX.search(f)
    groups[(r,s,cuts,ang,len(f)>10000)].append(k)
random.seed(1); res=collections.Counter(); fails=[]
for g,ks in sorted(groups.items()):
    for k in random.sample(ks,min(1,len(ks))):
        p,r,a,s=k.split("|"); ok,out=ba.gate(p,int(r),a,F[k])
        res[ok]+=1
        if not ok: fails.append((k,out[-400:]))
        print("PASS" if ok else "FAIL",k,"cuts=%d angle=%s len=%d"%(g[2],g[3],len(F[k])),flush=True)
print("gate",dict(res))
for k,o in fails: print("FAIL",k,o)
