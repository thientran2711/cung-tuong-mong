# usage: python3 dev/measure/emocmp.py <label>=<glob> ... : anemo.py metrics + spread per arm (binomial SE, per-file min-max), for off/on proofs
import json,glob,sys,math
sys.argv[0:1]=[sys.argv[0]]
exec(open(__file__.replace("emocmp.py","anemo.py")).read().split("for arg in")[0])
def load(g):
    R={}
    for f in sorted(glob.glob(g)):
        if f.endswith(".ext.json"):continue
        try:L=[x for x in json.load(open(f)) if "fate" in x]
        except Exception:continue
        R[f]=[x for x in L if x["fate"]!="TIMEOUT" and not x["fate"].startswith("CRASH")]
    return R
def m(L):
    n=len(L) or 1
    hh=sum(1 for x in L if x["fate"]=="HH-STOP" or (x.get("maxRank") or 0)>=7)
    early=[x for x in L if x["fate"]!="HH-STOP" and not any(o in x["fate"] for o in OLD)]
    cb=sum(1 for x in early if "sinh" in x["fate"])
    yrs=sum(max(.5,x.get("years") or 0) for x in L if x.get("pl")) or 1
    harm=sum(c for x in L for d in (x.get("pl") or {}).values() for k,c in d.items() if k in HARM)
    kind=sum(c for x in L for d in (x.get("pl") or {}).values() for k,c in d.items() if k in KIND)
    return dict(n=len(L),hh=100*hh/n,early=100*len(early)/n,cb=100*cb/n,harm=harm/yrs,kind=kind/yrs)
for a in sys.argv[1:]:
    lab,g=a.split("=",1);R=load(g);A=[x for v in R.values() for x in v];t=m(A);n=t["n"] or 1
    se=lambda p:100*math.sqrt(max(p/100*(1-p/100),1e-9)/n)
    per=[m(v) for v in R.values() if len(v)>=5]
    rng=lambda k:f"{min(p[k] for p in per):.0f}-{max(p[k] for p in per):.0f}" if per else "-"
    print(f"{lab}: n={t['n']}  HH {t['hh']:.0f}% ±{se(t['hh']):.0f} (files {rng('hh')})  early death {t['early']:.0f}% ±{se(t['early']):.0f} (files {rng('early')})  childbirth deaths {t['cb']:.0f}% ±{se(t['cb']):.0f}  harm/yr {t['harm']:.0f}  kind/yr {t['kind']:.0f}")
