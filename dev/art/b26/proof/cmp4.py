# B26FAB2 proof: prev (f0fb914 = JOB1+2+3) vs final (hair species t4-t6 + widened length step); HEAD 7007acc for the >10 000 count
import sys,json,re,glob,collections
sys.path.insert(0,"dev/art"); sys.path.insert(0,"dev/art/store-all")
import master_common as MC, winter_g28 as W, build_all as ba
S=sys.argv[1]
def load(pat):
    R={}
    for f in sorted(glob.glob(pat)): R.update(json.load(open(f)))
    return R
H=load(S+"/head.json"); P=load(S+"/prev_*.json"); F=load(S+"/final_*.json")
store_g=None
ba.store("s62",4)
sp=ba.LAST_G["hairflower_species"]
cnt=collections.Counter(); bad=[]; new_over=[]; cut_hist=collections.Counter(); over_detail=[]
for k in F:
    p,r,age,se=k.split("|"); f=F[k]; q=P[k]
    if f.startswith("ERR") or q.startswith("ERR"):
        if f!=q: bad.append((k,"ERR differs"))
        continue
    h=H.get(k,"")
    if len(f)>10000 and not h.startswith("ERR") and len(h)<=10000: new_over.append((k,len(f),len(f)-10000))
    if f==q: continue
    cnt["changed "+r]+=1
    T=q; tags=[]
    if r in ("4","5","6"):
        s=sp(ba.ALIAS.get(p,p))
        if s:
            nm=s[0]
            T2=T.replace(ba._F13,ba._F13.replace("ONE fresh flower in her hair","ONE fresh "+nm+" in her hair"),1)
            if T2!=T: tags.append("hair"); T=T2
    if T!=f:
        m=W.ANGLE_RX.search(T)
        if m and m.group(0) not in f: T=T.replace(m.group(0)+" ","",1); tags.append("ANGLE")
    for old,new,mid in MC.DOAN_LEN_CUTS:
        if T==f: break
        if old in T and old not in f: T=T.replace(old,new,1); tags.append(mid)
    if T!=f: bad.append((k,"unexplained diff")); continue
    if r not in ("1","2","3","4","5","6"): bad.append((k,"rank outside t1-t6")); continue
    if "hair" in tags and r not in "456": bad.append((k,"hair outside t4-t6"))
    cnt["/".join(tags)+" t"+r]+=1
    for t in tags:
        if t!="hair": cut_hist[t]+=1
print("cells",len(F),"\nchanged",sum(v for kk,v in cnt.items() if kk.startswith("changed")))
for kk in sorted(cnt): print(" ",kk,cnt[kk])
print("cuts",dict(cut_hist))
print("bad",len(bad)); [print("  BAD",b) for b in bad[:30]]
print("new >10000 vs HEAD 7007acc:",len(new_over))
for k,n,o in sorted(new_over): print("  OVER",k,n,"+%d"%o)
