import json,re,sys,glob,collections
P={
 "F1 kingfisher-blue silk thread (robe embroidery)":r"kingfisher-blue silk thread",
 "F2 kingfisher-blue inlay (crown)":r"kingfisher-blue inlay",
 "F3 Nữ đế wine-crimson #7E2A33":r"wine-crimson",
 "F4a c06 ORIGINAL coral red #D5745E":r"coral red silk like #D5745E",
 "F4b c06 'signature colour family coral red and ivory'":r"signature colour family coral red and ivory",
 "F4c 'robe itself is clearly coral red'":r"robe itself is clearly coral red",
 "F10 'golden yellow silk mixed with black'":r"golden yellow silk mixed with black",
}
C={k:collections.defaultdict(set) for k in P}; tot=0
for fn in sorted(glob.glob("cells_a*.jsonl")):
    for l in open(fn,encoding="utf-8"):
        e=json.loads(l)
        if "err" in e: continue
        tot+=1
        for k,rx in P.items():
            if re.search(rx,e["prompt"]): C[k][e["person"]].add(f"{e['age']}|t{e['rank']}|{e['season'] or '-'}")
print("cells",tot)
for k,d in C.items():
    ranks=collections.Counter(x.split('|')[1] for v in d.values() for x in v)
    print(k,"| cells",sum(len(v) for v in d.values()),"| people",len(d),"| ranks",dict(ranks),"|",sorted(d)[:8])
