# B26FAB5 palfix counts: a2 secondary changes (root season), c3 winter palette, c2 Nữ đế own main colour, a3 c06. argv base.json new.json
import sys,json,re,collections
B=json.load(open(sys.argv[1])); N=json.load(open(sys.argv[2])); PAL=json.load(open("dev/art/face-common/palettes_season.json",encoding="utf-8"))
SEC=re.compile(r"(?:TWO|THREE)-COLOUR RULE[^.]*?the MAIN colour (.+?) and the SECONDARY colour (.+?), the secondary")
a2={}; c3=collections.Counter(); c3bad=[]; ch=collections.Counter()
for k,n in N.items():
    p,r,a,s=k.split("|")
    if n.startswith("ERR") or r=="nude": continue
    mb,mn=SEC.search(B[k]),SEC.search(n)
    if not (mb and mn): continue
    if s=="None" and mb.group(2)!=mn.group(2): a2.setdefault(p,(mb.group(2),mn.group(2))); ch["a2 cells"]+=1
    if s=="dong":
        d=PAL.get(p)
        if isinstance(d,dict) and d.get("root_season") and d["root_season"]!="dong":
            w=d["dong"]; ok=mn.group(1).startswith(w["main"]) and mn.group(2).startswith(w["sec"]); c3["ok" if ok else "NOT đông"]+=1
            if not ok: c3bad.append(k)
            o=re.search(r"Outfit \(.*?\. ",n).group(0); root=d[d["root_season"]]
            for x in (root["main"],root["sec"]):
                if x and x not in (w["main"],w["sec"]) and x not in w["main"]+" "+w["sec"] and re.search(r"(?<!NOT )\b"+re.escape(x)+r"\b",o): c3["root word left in Outfit: "+x]+=1
print("a2: people whose root-season SECONDARY changed:",len(a2),"cells",ch["a2 cells"])
for p,(b,n) in sorted(a2.items()): print("  %s: %s -> %s"%(p,b,n))
print("c3 winter cells of B20 people with root != đông:",dict(c3)," not-đông:",c3bad[:10])
nud=[k for k in N if "|nude|" in k and not N[k].startswith("ERR")]
own=sum(1 for k in nud if "her own " in N[k] or "her ORIGINAL robe colour is kept exactly" in N[k])
print("c2 Nữ đế cells:",len(nud),"carry her own main colour:",own,"| wine-crimson/black 2nd colour kept:",sum(1 for k in nud if "wine-crimson" in N[k] or "mixed with black" in N[k]))
c06=[k for k in N if k.startswith("c06|") and not N[k].startswith("ERR")]
print("a3 c06 cells:",len(c06),"with coral red/#D5745E/#BA5F49 left:",sum(1 for k in c06 if re.search("coral red|D5745E|BA5F49",N[k])),"| 'and ivory' left:",sum(1 for k in c06 if "and ivory" in N[k]))
