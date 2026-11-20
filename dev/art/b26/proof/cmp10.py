# B26FAB5 proof: base dump (9d214c3) vs new dump. Every changed cell must be explained by the 5 jobs:
#  J1 A42 cleavage clause out · J2 G36 phi bạch out (sentence + store 'a sheer silk shawl' words) · J4 vase -> lotus lamp (item + hand clause)
#  J3 palfix: a2 B20 secondary, a3 c06 B20 colours, c2 Nữ đế own main colour clause, c3 winter B20 đông palette (colour words / hexes only)
#  + the B26 length step re-balancing (ANGLE / DOAN_LEN_CUTS / LEN_CUTS2 / HQP SHORT) as in cmp9.
import sys,json,re,collections
sys.path.insert(0,"dev/art"); sys.path.insert(0,"dev/art/store-all"); import master_common as MC
B=json.load(open(sys.argv[1])); N=json.load(open(sys.argv[2]))
PAL=json.load(open("dev/art/face-common/palettes_season.json",encoding="utf-8"))
C="the low square neckline shows a soft, natural hint of cleavage, tasteful and elegant; "
VASE=[("a small plain clay vase with a flower sprig","a small plain clay lotus lamp"),("a small porcelain vase with a flower sprig","a small porcelain lotus lamp"),
("a small celadon vase with a flower sprig","a small celadon lotus lamp"),("a small cloisonné vase with flowers","a small cloisonné lotus lamp"),
("a small white-jade vase with blossoms","a small white-jade lotus lamp"),("a cloisonné enamel vase with flowers","a cloisonné enamel lotus lamp with gilt petals"),
("a white-jade vase with gold mounts and flowers","a white-jade lotus lamp with gold mounts"),("a white-jade vase with gold phoenix mounts and peonies","a white-jade lotus lamp with gold phoenix mounts"),
("a gold-mounted jade vase with peonies","a gold lotus lamp set with gems"),("a small vase of old celadon with a single orchid","a small lotus lamp of old celadon"),("the vase cradled","the lamp cradled")]
PHI=re.compile(r" PHI BẠCH(?: \(winter\))?: [^—]*?(?:—[^.]*)?(?:drape|bulky)[^.]*\.")
def norm(t):
    t=t.replace(C,"")
    t=PHI.sub("",t); t=re.sub(r"(?:,|;) a (?:sheer|soft opaque) silk shawl(?=[;.,])","",t)
    for o,n in VASE: t=t.replace(o,n)
    t=re.sub(r"small vase of (.+?) with a flower sprig",r"small lotus lamp of \1",t)
    t=re.sub(r" Pose: .+?\. (The item|The head)"," Pose: X. \\1",t)
    for o,n,_ in MC.DOAN_LEN_CUTS+[(a,b,c) for a,b,c,_r in MC.LEN_CUTS2]: t=t.replace(o,n)
    t=re.sub(r"GRACE \(pose variety[^.]*\. ","",t); t=re.sub(r"ANGLE[^.]*\. ","",t)
    t=re.sub(r"a LAYERED NECKLINE.*?NO crossed wrap collar","LAYERED",t)
    return t
TOK=lambda s: re.findall(r"#[0-9A-Fa-f]{6}|[A-Za-zÀ-ỹ'-]+",s)
CW=set("""her own OWN main colour like stays clearly visible in large areas inner skirt sleeve linings and a few panels silk soft""".split())
import build_all as _ba
_ba._kc_drawn=lambda p: True; _ba.store("c01",1); _G=_ba.LAST_G
def colour_words(p):
    w=set(CW); d=PAL.get(p)
    for tb in ("DATA","ORIG1","M_COLS","LOWNAME"):
        v=_G[tb].get(p)
        if v: w|=set(TOK(" ".join(str(x) for x in v[:4] if tb!="DATA" or x is v[0])))
    w|=set(TOK("vermilion ivory coral red #D5745E a deeper #BA5F49"))
    if isinstance(d,dict):
        for s in ("xuan","ha","thu","dong"):
            v=d.get(s)
            if isinstance(v,dict):
                for k in ("main","sec","main_hex","sec_hex"): w|=set(TOK(v.get(k,"")))
                rd=v.get("root_drawn") or {}
                for k in ("main","sec","main_hex","sec_hex"): w|=set(TOK(rd.get(k,"")))
    for x in "deep rose crimson jade green teal blue-violet sapphire blue warm coral rose coral red ivory deeper vermilion".split(): w.add(x)
    return {x.lower() for x in w}
def phrases(p):
    L=[]; d=PAL.get(p)
    if isinstance(d,dict):
        for s in ("xuan","ha","thu","dong"):
            v=d.get(s)
            if isinstance(v,dict): L+=[v.get("main",""),v.get("sec","")]+[(v.get("root_drawn") or {}).get(k,"") for k in ("main","sec")]
    for tb in ("ORIG1","M_COLS"):
        v=_G[tb].get(p)
        if v: L+=[str(x) for x in v]
    L+=_G["DATA"][p][0].split(" and ") if p in _G["DATA"] else []
    return [x for x in L if x and x not in ("gold","silver","white","pearl")]
ch=collections.Counter(); why=collections.Counter(); bad=[]; badw=collections.Counter(); newover=[]; nowfit=[]
for k,n in N.items():
    b=B[k]; p,r,a,s=k.split("|")
    if n.startswith("ERR") or b.startswith("ERR"):
        if n!=b: bad.append(k+" ERR"); 
        continue
    if len(b)<=10000<len(n): newover.append((k,len(n)-10000))
    if len(n)<=10000<len(b): nowfit.append(k)
    if n==b: continue
    ch[(r,s)]+=1; w=[]
    if C in b: w.append("J1")
    if "PHI BẠCH" in b or "silk shawl" in b: w.append("J2")
    if re.search(r"\bvase\b",b): w.append("J4")
    nb,nn=norm(b),norm(n)
    if nb!=nn:
        cb,cn=collections.Counter(x.lower() for x in TOK(nb)),collections.Counter(x.lower() for x in TOK(nn))
        d=set((cb-cn)+(cn-cb)); extra=d-colour_words(p)
        def _strip(x):
            for ph in sorted(phrases(p),key=len,reverse=True): x=x.replace(ph,"")
            return collections.Counter(y.lower() for y in TOK(x))
        sb,sn=_strip(nb),_strip(nn)
        extra|={x for x in ('gold','golden','silver','pearl','pearls','white') if sb[x]!=sn[x] and r!='nude'}   # metal/pearl trims must never move (c2 Nữ đế clause adds none)
        if extra: bad.append(k); badw.update(extra)
        else: w.append("J3")
    why["+".join(w) or "len-only"]+=1
print("cells",len(N),"changed",sum(ch.values()))
for x,c in sorted(ch.items(),key=str): print("  t%s %s: %d"%(x[0],x[1],c))
print("why:",dict(why))
print("bad:",len(bad),bad[:20]); print("  bad words:",badw.most_common(40))
V=list(N.values())
print("PROOF cleavage left:",sum("cleav" in v.lower() for v in V),"| décolletage/bust:",sum(bool(re.search(r"d[ée]collet|\bbust\b",v,re.I)) for v in V))
print("PROOF phi bạch / PHI BẠCH sentence left:",sum("PHI BẠCH" in v or "phi bạch" in v for v in V),"| 'silk shawl' left:",sum("silk shawl" in v for v in V),
      "| any 'shawl' left (negatives):",collections.Counter(m for v in V for m in re.findall(r"[^,;.]{0,40}\bshawl\b[^,;.]{0,30}",v)).most_common(6))
print("PROOF vase left:",sum(bool(re.search(r"\bvase\b",v)) for v in V),collections.Counter(m for v in V for m in re.findall(r".{30}\bvases?\b.{20}",v)).most_common(5))
print("lamp cells:",sum("lotus lamp" in v for v in V))
print("went over 10000:",len(newover),sorted(newover)); print("now fit:",len(nowfit))
print("over 10000 total new:",sum(len(v)>10000 for v in V),"base:",sum(len(v)>10000 for v in B.values()))
