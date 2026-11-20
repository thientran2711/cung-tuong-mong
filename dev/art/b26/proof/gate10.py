# B26FAB5 gate: check_store (build_all.gate) on N random CHANGED cells per (rank, season) group, len <= 10 000; a FAIL is also checked on the base text
# (same cell, base dump) so pre-existing fails are labelled. argv: base.json new.json [N]
import sys,json,random,collections,re
sys.path.insert(0,"dev/art"); sys.path.insert(0,"dev/art/store-all")
import build_all as ba
ba._kc_drawn=lambda p: True
B=json.load(open(sys.argv[1])); N=json.load(open(sys.argv[2])); K=int(sys.argv[3]) if len(sys.argv)>3 else 3; G=collections.defaultdict(list)
for k,n in N.items():
    if n==B[k] or n.startswith("ERR") or len(n)>10000: continue
    p,r,a,s=k.split("|"); G[(r,s)].append(k)
random.seed(5); res=collections.defaultdict(collections.Counter)
for g,ks in sorted(G.items(),key=str):
    for k in random.sample(ks,min(K,len(ks))):
        p,r,a,s=k.split("|"); rr=r if r=="nude" else int(r)
        ok,out=ba.gate(p,rr,a,N[k]); tag="PASS"
        if not ok:
            fl=[l.strip() for l in out.splitlines() if "FAIL" in l or l.strip().startswith(("[","-","S","X","M","W","G","B","F"))][-6:]
            okb,outb=ba.gate(p,rr,a,B[k]) if len(B[k])<=10000 else (None,"")
            ids=lambda o:set(re.findall(r"\b([A-Z]+\d+[a-z]?)\b",o))
            newids=ids(out)-ids(outb) if okb is not None else ids(out)
            tag="FAIL(pre-existing: same ids fail on base)" if (okb is False and not newids) else "FAIL NEW %s"%sorted(newids)[:8]
            print(tag,k,len(N[k]),fl[-3:],flush=True)
        res["t%s %s"%g][tag.split("(")[0].split(" [")[0]]+=1
for g,c in res.items(): print(g,dict(c))
