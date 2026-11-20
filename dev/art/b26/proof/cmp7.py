# B26FAB3 HQP COLLAR proof (owner Lượt 1384): prev = B26FAB3 t7/t8 length step (P_n_*), new = + build_all.hqp_collar (Q_*). Every diff must be t7 and vanish once the
# LAYERED NECKLINE block (long or SHORT form), the cape OPEN clause and the length step (ANGLE + DOAN_LEN_CUTS) are taken out of both sides.
import sys,json,glob,re,collections
sys.path.insert(0,"dev/art"); sys.path.insert(0,"dev/art/store-all")
import master_common as MC, winter_g28 as W, build_all as ba
S=sys.argv[1]
def load(p):
    R={}
    for f in sorted(glob.glob(p)): R.update(json.load(open(f)))
    return R
P=load(S+"/P_n_*.json"); N=load(S+"/Q_*.json"); H=set(json.load(open("dev/art/b26/HEAD_OVER10K.json"))["cells"])
assert P.keys()==N.keys()
RX=re.compile(r" with a LAYERED NECKLINE.*?; the robe ")
def canon(t):
    t=RX.sub(", ",t,count=1).replace(ba.HQP_OPEN+", ","",1)
    m=W.ANGLE_RX.search(t)
    if m: t=t.replace(m.group(0)+" ","",1)
    for o,n,_ in MC.DOAN_LEN_CUTS: t=t.replace(o,n,1)
    return t
cnt=collections.Counter(); bad=[]; over=[]
for k in N:
    p,r,a,s=k.split("|")
    if N[k]==P[k]: continue
    cnt["t"+r+(" short" if "a LAYERED NECKLINE: a " in N[k] else " long")]+=1
    if r!="7" or canon(N[k])!=canon(P[k]): bad.append(k)
for k,v in N.items():
    if len(v)>10000 and len(P[k])<=10000: over.append((k,len(v)))
print("cells",len(N),"changed",dict(cnt)); print("bad",len(bad),bad[:20])
print("t7 cells without the collar:",sum(1 for k,v in N.items() if k.split("|")[1]=="7" and "LAYERED NECKLINE" not in v))
print("newly > 10 000 (fitted before):",len(over),sorted(over))
