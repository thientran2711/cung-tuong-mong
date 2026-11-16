# usage: python3 dev/measure/anemoact.py <label>=<glob> [...]   (review/emotion-acts): outcome + emotion acts / outbursts / extremes per config
import json,glob,sys,collections
OLD=("Thái phi","Thái hậu","Hoàng thái hậu","Năm ","Xuất cung tuổi","Tuổi xuân qua đi","Xuất gia")  # not a death: old age, leaving the palace, nunnery
for arg in sys.argv[1:]:
    lab,g=arg.split("=",1);L=[]
    for f in sorted(glob.glob(g)):
        if f.endswith(".ext.json"):continue
        try:L+=[x for x in json.load(open(f)) if "fate" in x]
        except Exception:pass
    L=[x for x in L if x["fate"]!="TIMEOUT" and not x["fate"].startswith("CRASH")]
    n=len(L)
    if not n:print(lab,"n=0");continue
    hh=sum(1 for x in L if x["fate"]=="HH-STOP" or (x.get("maxRank") or 0)>=7)
    early=[x for x in L if x["fate"]!="HH-STOP" and not any(o in x["fate"] for o in OLD)]
    print(f"{lab}: lives {n}  HH {100*hh/n:.0f}%  early death {100*len(early)/n:.0f}%")
    print("   fates:",dict(collections.Counter(x["fate"][:28] for x in L).most_common(12)))
    E=[x["ea"] for x in L if x.get("ea")]
    if not E:continue
    wk=sum(e["wk"] for e in E) or 1
    def tot(k):
        c=collections.Counter()
        for e in E:c.update(e.get(k) or {})
        return c
    print(f"   tuần sampled {wk}; per 100 tuần: her outbursts {100*sum(sum((e.get('out') or {}).values()) for e in E)/wk:.2f}, extremes {100*sum(sum((e.get('ext') or {}).values()) for e in E)/wk:.2f}, cards played {100*sum(sum((e.get('play') or {}).values()) for e in E)/wk:.2f}, hỏi tội {100*sum(e.get('hoi',0) for e in E)/wk:.2f}, events from others {100*sum(e.get('hoiMe',0) for e in E)/wk:.2f}")
    print("   her cards shown:",dict(tot("cards")),"played:",dict(tot("play")))
    print("   her outbursts:",dict(tot("out")))
    print("   her extremes:",dict(tot("ext")))
    # per personality (her nết): outbursts per 100 tuần
    by=collections.defaultdict(lambda:[0,0,0])
    for e in E:
        k=f"{e.get('tr') or '?'} ({e.get('temper') or '?'})";by[k][0]+=e["wk"];by[k][1]+=sum((e.get('out') or {}).values());by[k][2]+=1
    print("   her outbursts per 100 tuần by nết:"," · ".join(f"{k}: {100*o/max(1,w):.2f} (lives {nl})" for k,(w,o,nl) in sorted(by.items())))
    oT=tot("outT");print("   her outbursts temper:group:",dict(oT))
    na=tot("npcAct");no=tot("npcOut");ne=tot("npcExt");nt=tot("npcOutT")
    print(f"   NPC per 100 tuần: acts {100*sum(na.values())/wk:.1f}, outbursts {100*sum(no.values())/wk:.1f}, extremes {100*sum(ne.values())/wk:.1f}")
    print("   NPC outbursts by temper:",dict(nt))
    print("   NPC outbursts kind:reaction:",dict(no.most_common(30)))
    print("   NPC extremes:",dict(ne))
    print("   NPC acts:",dict(na.most_common(20)))
    # emotion-acts-2: per NPC kind (c consort, e Emperor, t Thái hậu, s servant, m man, o court, q minister, k child): outbursts / acts / extremes and lines seen
    K=collections.defaultdict(lambda:[0,0,0,0,0])
    for c,i in ((na,1),(no,0),(ne,2)):
        for k,v in c.items():K[k.split(":")[0]][i]+=v
    for k,v in tot("say").items():
        kd,s=k.split(":");K[kd][3 if s=="seen" else 4]+=v
    print("   per kind (outbursts / acts / extremes / lines seen / lines hidden):"," · ".join(f"{k} {v[0]}/{v[1]}/{v[2]}/{v[3]}/{v[4]}" for k,v in sorted(K.items())))
    print("   misc:",dict(tot("misc")))
