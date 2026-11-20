import json,re,sys,collections
sys.path.insert(0,'.'); import audit as A
def hue(s): return {w for w in A.toks(s) if w in A.HUES or w in A.FLOWERISH}-{"soft","like"}
def pal(p,season):
    for d in (A.PAL.get(p),A.DEEP.get(p)):
        if isinstance(d,dict):
            s=season or d.get("root_season")
            if isinstance(d.get(s),dict): return s,d[s]
    return None,None
out=collections.defaultdict(lambda: collections.defaultdict(set))
for fn in sys.argv[1:]:
    for l in open(fn,encoding="utf-8"):
        e=json.loads(l)
        if "err" in e or e["rank"]=="nude": continue
        p=e["person"]; m,s=A.slot_words(e["prompt"])
        se,v=pal(p,e["season"])
        if not v: out["no B20/P6 palette"][(p,m,s)].add(e["rank"]); continue
        hm,hs=hue(m),hue(s); bm,bs=hue(v["main"]),hue(v.get("sec") or v.get("secondary"))
        km="main same" if hm<=bm|{"red"} and hm else "MAIN DIFFERENT"
        ks="sec same" if hs<=bs and hs else "SEC DIFFERENT"
        key=f"{'winter --season dong' if e['season'] else 'default (root season)'}: {km} / {ks}"
        out[key][(p,f"builder: {m} / {s}",f"B20 {se}: {v['main']} / {v.get('sec')}")].add(f"{e['age']}t{e['rank']}")
res={}
for k,d in out.items():
    res[k]={" | ".join(kk):len(v) for kk,v in d.items()}
    print(f"\n### {k}: {len(d)} people, {sum(len(v) for v in d.values())} cells")
    for kk,v in sorted(d.items()): print("  "," | ".join(kk),f"[{len(v)} cells]")
json.dump(res,open("structural.json","w"),ensure_ascii=False,indent=1)
