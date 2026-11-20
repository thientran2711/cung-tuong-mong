# B26FAB2 F2 redo proof: b2 (8ea863f) vs f2 (F2 NEW TABLE Lượt 1352/1342); HEAD 7007acc for the >10 000 count
import sys,json,re,glob,collections,difflib
sys.path.insert(0,"dev/art"); sys.path.insert(0,"dev/art/store-all")
import master_common as MC, winter_g28 as W, build_all as ba
S=sys.argv[1]
def load(p):
    R={}
    for f in sorted(glob.glob(p)): R.update(json.load(open(f)))
    return R
H=load(S+"/head.json"); B=load(S+"/b2/final_*.json"); F=load(S+"/f2_a*.json")
ba.store("s62",4); G=ba.LAST_G
VOC=set()
for w in G["FLOWER_PL"]+G["FLOWER_SG"]+[x for t in G["F2_FL"].values() for e in t for x in e[:2]]+["a","an","and","flowers","blossom","blossoms","jasmine","pink","silk","flower","white","sprig","red","rose","purple","wisteria","pale"]:
    VOC|=set(re.findall(r"[\w'-]+",w))
def outfit_split(t):
    i=t.find("Outfit ("); 
    if i<0: return t,""
    j=t.find(". ",i); j=len(t) if j<0 else j
    return t[:i]+"<O>"+t[j:],t[i:j]
SZRX=re.compile(r"ONE fresh .*? in her hair")
cnt=collections.Counter(); bad=[]; swaps=collections.Counter(); new_over=[]; cuts=collections.Counter()
for k,f in F.items():
    p,r,age,se=k.split("|"); b=B[k]; h=H.get(k,"")
    if not f.startswith("ERR") and len(f)>10000 and not h.startswith("ERR") and len(h)<=10000: new_over.append((k,len(f)))
    if f==b: continue
    if f.startswith("ERR") or b.startswith("ERR"): bad.append((k,"ERR differs")); continue
    if r=="nude": bad.append((k,"nude changed")); continue
    cnt["changed t"+r]+=1
    def canon(t):   # length step works both ways (a shorter/longer flower name adds/removes ANGLE + cuts): compare both sides with ANGLE + every cut clause removed
        m=W.ANGLE_RX.search(t)
        if m: t=t.replace(m.group(0)+" ","",1)
        for old,new,mid in MC.DOAN_LEN_CUTS: t=t.replace(old,new,1)
        return t
    for old,new,mid in MC.DOAN_LEN_CUTS:
        if (old in b)!=(old in f): cuts[mid+(" cut" if old in b else " restored")]+=1
    if bool(W.ANGLE_RX.search(b))!=bool(W.ANGLE_RX.search(f)): cuts["ANGLE"+(" cut" if W.ANGLE_RX.search(b) else " restored")]+=1
    T=canon(b); f=canon(f)
    ro,oo=outfit_split(T); fo,of=outfit_split(f)
    if SZRX.sub("<SZ>",ro)!=SZRX.sub("<SZ>",fo): bad.append((k,"diff outside Outfit sentence / hair-size sentence")); continue
    if SZRX.findall(ro)!=SZRX.findall(fo) and r not in "456": bad.append((k,"SZ sentence changed outside t4-t6")); continue
    a=re.findall(r"[\w'-]+|[^\w\s]",oo); c=re.findall(r"[\w'-]+|[^\w\s]",of)
    for op in difflib.SequenceMatcher(None,a,c,autojunk=False).get_opcodes():
        if op[0]=="equal": continue
        ch=a[op[1]:op[2]]+c[op[3]:op[4]]
        if any(x not in VOC and x not in ",;()" for x in ch): bad.append((k,"non-flower word: "+" ".join(a[op[1]:op[2]])+" -> "+" ".join(c[op[3]:op[4]]))); break
        swaps[" ".join(a[op[1]:op[2]])+" -> "+" ".join(c[op[3]:op[4]])]+=1
print("cells",len(F)); [print(" ",x,cnt[x]) for x in sorted(cnt)]
print("cuts",dict(cuts)); print("bad",len(bad)); [print("  BAD",x) for x in bad[:40]]
print("top swaps:"); [print("  ",n,s) for s,n in swaps.most_common(40)]
import collections as C
g=C.defaultdict(list)
for k,n in new_over:
    p,r,a,s=k.split("|"); g[f"t{r} {a} {'dong' if s=='dong' else 'normal'}"].append(n-10000)
print("new >10000 vs HEAD 7007acc:",len(new_over))
for x in sorted(g): print("  ",x,len(g[x]),"+%d..+%d"%(min(g[x]),max(g[x])))
json.dump(sorted(new_over),open(S+"/f2_over.json","w"))
