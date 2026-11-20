import json,sys,collections
sys.path.insert(0,'.'); import audit as A
def cells(fn):
    for l in open(fn,encoding="utf-8"):
        e=json.loads(l)
        if "err" in e: continue
        e["src"]="build_all.py"; e["id"]=f"{e['person']}|t{e['rank']}|{e['age']}|{e['season'] or '-'}"
        ex=[]; exh=[]
        if e["rank"] in (6,7,8,"nude"): ex+=["royal","yellow"]
        e["extra_words"]=ex; yield e
G,st=A.audit(cells(sys.argv[1]))
print(st)
rows=sorted(G.items(),key=lambda kv:-len(kv[1]["cells"]))
json.dump([{"src":k[0],"term":k[1],"cls":k[2],"tmpl":k[3],"cells":len(v["cells"]),"people":len(v["people"]),"ex":v["ex"]} for k,v in rows],open(sys.argv[2],"w"),ensure_ascii=False,indent=0)
