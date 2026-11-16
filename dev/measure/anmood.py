# usage: python3 dev/measure/anmood.py <label>=<glob> [...]   (review/mood-bar, D12): mood-bar distribution + outcome per config
import json,glob,sys,collections
OLD=("Thái phi","Thái hậu","Hoàng thái hậu","Năm ","Xuất cung tuổi")
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
    early=sum(1 for x in L if x["fate"]!="HH-STOP" and not any(o in x["fate"] for o in OLD))
    M=[x["md"] for x in L if x.get("md") and x["md"].get("wk")]
    wk=sum(m["wk"] for m in M) or 1
    print(f"{lab}: lives {n}  HH {100*hh/n:.0f}%  early death {100*early/n:.0f}%  tuần sampled {wk}")
    if not M:continue
    hist=collections.Counter()
    for m in M:
        for k,c in m["hist"].items():hist[int(k)]+=c
    print(f"   mean v {sum(m['sum'] for m in M)/wk:+.1f}  mean |v| {sum(m['abs'] for m in M)/wk:.1f}  tuần at v>=60 {100*sum(m['hi'] for m in M)/wk:.1f}%  at v<=-60 {100*sum(m['lo'] for m in M)/wk:.1f}%")
    print(f"   longest extreme streak (tuần): max {max(m['maxRun'] for m in M)}  mean per life {sum(m['maxRun'] for m in M)/len(M):.1f}   min v {min(m['mn'] for m in M)}  max v {max(m['mx'] for m in M)}")
    odn=sum(m.get('odN',0) for m in M);ods=sum(m.get('odSum',0) for m in M)
    print(f"   odds shift on her acts: applied {odn}x, mean {ods/odn if odn else 0:+.2f} pts, max |{max(m.get('odMax',0) for m in M)}| pts   (one ladder step ≈ 10–15 pts)")
    print(f"   comfort visits {sum(m.get('comfort',0) for m in M)}  locked cards shown {sum(m.get('lock',0) for m in M)}  thiện cảm by mood {sum(m.get('aff',0) for m in M):+d}  extra ghen {sum(m.get('ghen',0) for m in M):+d}  rolled acts {sum(m.get('acts',0) for m in M)}")
    cs=collections.Counter()
    for m in M:cs.update(m.get("cskip") or {})
    print("   comfort skipped at the lowest band:",dict(cs))
    print("   histogram (v rounded to 20):"," ".join(f"{k:+d}:{100*hist[k]/wk:.0f}%" for k in sorted(hist)))
    P=collections.Counter()
    for m in M:
        for k,c in (m.get("push") or {}).items():P[("e:" if k.startswith("e:") else k)]+=c
    print("   pushes by source (sum of points):",dict(P.most_common(14)))
