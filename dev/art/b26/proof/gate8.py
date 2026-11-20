# B26FAB4 gate: check_store (build_all.gate) on 2 random changed cells per (rank, age, season, cuts) group + over/under; sys.argv = base.json new.json
import sys,json,random,collections
sys.path.insert(0,"dev/art"); sys.path.insert(0,"dev/art/store-all")
import build_all as ba, master_common as MC
B=json.load(open(sys.argv[1])); N=json.load(open(sys.argv[2])); G=collections.defaultdict(list)
for k,n in N.items():
    if n==B[k]: continue
    p,r,a,s=k.split("|"); cuts="+".join(m.split(" ")[0] for o,nn,m,rr in MC.LEN_CUTS2 if o in B[k] and o not in n)
    G[(r,a,s,cuts,len(n)>10000)].append(k)
random.seed(4); res=collections.Counter()
for g,ks in sorted(G.items()):
    for k in random.sample(ks,min(2,len(ks))):
        p,r,a,s=k.split("|"); ok,out=ba.gate(p,int(r),a,N[k]); res[(ok,g[4])]+=1
        print("PASS" if ok else "FAIL",k,"cuts=%s len=%d"%(g[3],len(N[k])),"" if ok else out.strip().splitlines()[-3:],flush=True)
print("gate (ok, over10k):",dict(res))
