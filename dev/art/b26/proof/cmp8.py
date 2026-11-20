# B26FAB4 proof: base dump (HEAD 9f833ae) vs new dump; every changed cell must equal base + a prefix-in-order of master_common.LEN_CUTS2 (the cuts of its rank).
import sys,json,collections,re
sys.path.insert(0,"dev/art"); import master_common as MC
H=set(json.load(open("dev/art/b26/HEAD_OVER10K.json"))["cells"]); B=json.load(open(sys.argv[1])); N=json.load(open(sys.argv[2]))
ch=collections.Counter(); bad=[]; over=collections.defaultdict(list); used=collections.Counter(); newover=[]
for k,n in N.items():
    b=B[k]; p,r,a,s=k.split("|")
    if len(n)>10000 and not n.startswith("ERR") and k not in H: over[(r,a,s)].append((p,len(n)-10000))
    if n==b: continue
    ch[(r,a,s)]+=1; x=b; cuts=[]
    for o,nn,m,rr in MC.LEN_CUTS2:
        if x==n: break
        if r.isdigit() and int(r) in rr and o in x: x=x.replace(o,nn,1); cuts.append(m.split(" ")[0])
    if x!=n: bad.append(k)
    used[(r,"+".join(cuts))]+=1
    if len(b)<=10000: newover.append(k)
print("changed cells:",sum(ch.values())); [print("  t%s %s %s: %d"%(r,a,s,c)) for (r,a,s),c in sorted(ch.items())]
print("cuts used:"); [print("  t%s %s: %d"%(r,c,v)) for (r,c),v in sorted(used.items())]
print("bad:",len(bad),bad[:10]); print("changed cells that were <= 10000 in base (must be 0):",len(newover))
print("cells > 10000 now that fitted at HEAD 7007acc (not in HEAD_OVER10K):")
for (r,a,s),L in sorted(over.items()): print("  t%s %s %s (%d): %s"%(r,a,s,len(L),", ".join("%s +%d"%x for x in sorted(L))))
