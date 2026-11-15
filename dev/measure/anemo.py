# usage: python3 dev/measure/anemo.py <label>=<glob> [<label>=<glob> ...]
# emotion on/off comparison (run5b/run1b outputs): HH %, early death %, death causes, NPC harm acts per game year (persLog), by trait
import json,glob,sys,collections
HARM={"poison","kpoison","frame","kframe","plant","musk","catswap","pushp","provoke","humiliate","rumor","trip","accuse","block","steal","vp","pond","ksab","takeaway","bribe","huydung","banphe"}
KIND={"help","visit","warn","mediate","apologise","ally","serveTH","follow"}
OLD=("Thái phi","Thái hậu","Hoàng thái hậu","Năm ","Xuất cung tuổi","Thái phi")
for arg in sys.argv[1:]:
    lab,g=arg.split("=",1);L=[]
    for f in sorted(glob.glob(g)):
        try:L+=[x for x in json.load(open(f)) if "fate" in x]
        except Exception:pass
    L=[x for x in L if x["fate"]!="TIMEOUT" and not x["fate"].startswith("CRASH")]
    n=len(L)
    if not n:print(lab,"n=0");continue
    hh=sum(1 for x in L if x["fate"]=="HH-STOP" or (x.get("maxRank") or 0)>=7)
    early=[x for x in L if x["fate"]!="HH-STOP" and not any(o in x["fate"] for o in OLD)]
    causes=collections.Counter(("poison" if "độc" in x["fate"] else "childbirth" if "sinh" in x["fate"] else x["fate"][:22]) for x in early)
    yrs=sum(max(.5,x.get("years") or 0) for x in L if x.get("pl")) or 1
    harm=kind=0;bytr=collections.Counter()
    for x in L:
        for tr,d in (x.get("pl") or {}).items():
            for k,c in d.items():
                if k in HARM:harm+=c;bytr[tr]+=c
                elif k in KIND:kind+=c
    print(f"{lab}: n={n}  HH {100*hh/n:.0f}%  early death {100*len(early)/n:.0f}%  causes {dict(causes)}")
    print(f"   NPC harm acts / game year {harm/yrs:.1f}   kind acts / year {kind/yrs:.1f}   (years {yrs:.0f})")
    print("   harm by trait / year:",{k:round(v/yrs,1) for k,v in bytr.most_common(8)})
