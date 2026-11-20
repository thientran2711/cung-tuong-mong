# B26FAB3 proof: 98c8be2 (prev) vs B26FAB3 (t7/t8 M03 length step), all 146 people x t1-t8+nude x 5 ages x normal/dong
import sys,json,glob,collections
sys.path.insert(0,"dev/art"); import master_common as MC
S=sys.argv[1]
def load(p):
    R={}
    for f in sorted(glob.glob(p)): R.update(json.load(open(f)))
    return R
P=load(S+"/P_h_*.json"); N=load(S+"/P_n_*.json"); H=set(json.load(open("dev/art/b26/HEAD_OVER10K.json"))["cells"])
assert P.keys()==N.keys(); print("cells",len(N))
o,n,_=MC.DOAN_LEN_CUTS[0]; bad=[]; ch=[]
for k in N:
    if N[k]==P[k]: continue
    ch.append(k)
    p,r,a,s=k.split("|")
    if r not in "78" or P[k].replace(o,n,1)!=N[k] or len(P[k])<=10000 or len(N[k])>10000: bad.append(k)
print("changed",len(ch),ch); print("bad",len(bad),bad)
ov=collections.Counter()
for k,v in N.items():
    if not v.startswith("ERR") and len(v)>10000 and k not in H:
        p,r,a,s=k.split("|"); ov[f"t{r} {a} {s}"]+=1
print("still > 10 000 and not over at HEAD 7007acc:",sum(ov.values()),dict(ov))
