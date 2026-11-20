# B26FAB4 items 6 (A41 no necklace) + 7 (A42 cleavage clause): base dump (3426b62) vs new dump. A changed cell is OK when, after taking out
# (a) the A42 clause, (b) the A41 necklace words (HQP_LUX / t6 'necklace and bracelets'), (c) a pose re-pick (Pose: sentence) where the old pose touched a necklace,
# (d) the B26 length step re-balancing (ANGLE / DOAN_LEN_CUTS / LEN_CUTS2 / HQP SHORT form), the two texts are equal.
import sys,json,re,collections
sys.path.insert(0,"dev/art"); import master_common as MC, check_store as CS
B=json.load(open(sys.argv[1])); N=json.load(open(sys.argv[2])); H=set(json.load(open("dev/art/b26/HEAD_OVER10K.json"))["cells"])
C="the low square neckline shows a soft, natural hint of cleavage, tasteful and elegant; "
def norm(t,short_ok=True):
    t=t.replace(C,"").replace("a layered pearl-and-gold necklace, ","").replace("gold-and-jade necklace and bracelets","gold-and-jade bracelets")
    t=re.sub(r" Pose: .+?\. (The item|The head)"," Pose: X. \\1",t)
    for o,n,_ in MC.DOAN_LEN_CUTS+[(a,b,c) for a,b,c,_r in MC.LEN_CUTS2]: t=t.replace(o,n)
    t=re.sub(r"GRACE \(pose variety[^.]*\. ","",t); t=re.sub(r"ANGLE[^.]*\. ","",t)
    t=re.sub(r"a LAYERED NECKLINE.*?NO crossed wrap collar","LAYERED",t)
    return t
ch=collections.Counter(); bad=[]; why=collections.Counter(); pose=[]; over=collections.defaultdict(list); newover=[]
for k,n in N.items():
    b=B[k]; p,r,a,s=k.split("|")
    if len(n)>10000 and k not in H and not n.startswith("ERR"): over[(r,a,s)].append((p,len(n)-10000))
    if n==b: continue
    ch[(r,a,s)]+=1
    w=[]
    if C in n: w.append("A42")
    if "necklace" in b: w.append("A41:"+("pose" if "touching her necklace" in b else "word"))
    if "touching her necklace" in b: pose.append(k)
    why["+".join(w) or "other"]+=1
    if norm(b)!=norm(n): bad.append(k)
    if len(b)<=10000<len(n): newover.append(k)
print("changed",sum(ch.values())); [print("  t%s %s %s: %d"%(x+(c,))) for x,c in sorted(ch.items())]
print("why:",dict(why)); print("bad:",len(bad),bad[:15])
print("necklace word left in new cells:",sum(1 for v in N.values() if "necklace" in v))
print("cleavage clause in cells:",sum(1 for v in N.values() if C.strip("; ") in v),"| square neckline WITHOUT clause:",sum(1 for v in N.values() if re.search("square neckline",v,re.I) and C.strip("; ") not in v))
print("pose re-picked (old pose touched a necklace):",len(pose)," ".join(sorted(pose)))
print("went over 10000 (fitted in base):",len(newover)," ".join(sorted(newover)))
print("cells > 10000 that fitted at HEAD 7007acc:")
for x,L in sorted(over.items()): print("  t%s %s %s (%d): %s"%(x+(len(L),", ".join("%s +%d"%y for y in sorted(L)))))
