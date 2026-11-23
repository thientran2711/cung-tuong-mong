#!/usr/bin/env python3
"""Validate doidap.jsonl / hanhxu.jsonl (schema 2: ambiguous, value-tagged, no guidance).
usage: python3 validate_tests.py doidap.jsonl hanhxu.jsonl
Checks (every prompt): >=4 entries file-wide per README (>=44 each); 4 options; distinct primary value per option (>=3 distinct,
here 4); values from the 13 virtues of jtrong.js VIRT; every option has gain+loss (equal step total across options, laws 2/3);
no option with only '−' reacts (every option pleases at least one nết); no universal best (the best option set of every nết
of the group must not share one option) and >=3 different options are best for some nết; no option dominates another for
all nết of the group (no hidden ranking); no % / odds / hint words in option text."""
import json,re,sys
VIRT={"Hiếu","Đễ","Trung","Tín","Lễ","Nghĩa","Liêm","Sỉ","Nhân","Trí","Cần","Kiệm","Khiêm"}
DD={"khiem","manh","dido","that"};HX={"giuyen","tuxu","caunguoi","nhan"}
KEYS={"fav","fav.E","fav.T","fav.H","fav.ma","duc","sac","tai","tamco","grudge.rival","friend.mate","mark.hau","time","face","raw","bac"}
HINT=re.compile(r"%|được lợi|bị thiệt|nên chọn|tốt nhất|đúng nhất|chắc chắn được|Liều|Khó lường|Nắm chắc|Rất chắc",re.I)
GROUPS={"E":"E","T":"T","H":"H","ma":"H","any":"ETH"}
bad=0
def err(m):
    global bad;bad+=1;print("ERR",m)
for fn in sys.argv[1:]:
    rows=[json.loads(l) for l in open(fn,encoding="utf8") if l.strip()]
    ids=set();texts=set();want=DD if "doidap" in fn else HX;typ="doidap" if "doidap" in fn else "hanhxu"
    if len(rows)<44:err(fn+" fewer than 44 entries")
    for r in rows:
        i=r["id"]
        if i in ids:err(i+" dup id")
        ids.add(i)
        if r.get("schema")!=2:err(i+" schema")
        if r["tag"] not in("K","D") or not r.get("src") or not r.get("cue"):err(i+" tag/src/cue")
        if not isinstance(r["lo"],int) or not 0<=r["lo"]<=3:err(i+" lo")
        if r.get("lean") not in VIRT:err(i+" lean")
        if r["type"]!=typ or r["asker"] not in GROUPS:err(i+" type/asker")
        o=r["options"]
        if len(o)!=4:err(i+" needs 4 options")
        if {x["stance"] for x in o}!=want:err(i+" stances")
        prim=[x["values"][0] for x in o if x.get("values")]
        if len(set(prim))<3 or len(prim)!=len(o):err(i+" values: need >=3 distinct primary values")
        tot=set();gs=GROUPS.get(r["asker"],"E")
        for x in o:
            if not x["values"] or any(v not in VIRT for v in x["values"]):err(i+" bad values "+str(x["values"]))
            g,l=x["gain"],x["loss"]
            if not g or not l:err(i+" gain/loss empty")
            if set(g)&set(l):err(i+" same key gain+loss")
            for k in list(g)+list(l):
                if k not in KEYS:err(i+" key "+k)
            sg,sl=sum(g.values()),sum(l.values())
            if sg!=sl:err(i+" gain!=loss")
            tot.add(sg)
            if x["text"] in texts:err(i+" dup text")
            texts.add(x["text"])
            if HINT.search(x["text"]):err(i+" hint/odds word in option")
            rc=x["reacts"]
            if not rc or "+" not in rc.values():err(i+" "+x["stance"]+" no '+' react (all '−')")
            for k in rc:
                if k[0] not in gs:err(i+" react key outside asker group "+k)
        if len(tot)!=1:err(i+" options not equal value")
        # per-nết scores
        nets=sorted({k for x in o for k in x["reacts"]})
        sc=lambda x,k:{"+":1,"−":-1}.get(x["reacts"].get(k),0)
        best=[]
        for k in nets:
            m=max(sc(x,k) for x in o);best.append({n for n,x in enumerate(o) if sc(x,k)==m})
        if best and set.intersection(*best):err(i+" universal best option")
        if len(set().union(*best))<3:err(i+" fewer than 3 options are ever best")
        for a in range(4):
            for b in range(4):
                if a!=b and all(sc(o[a],k)>=sc(o[b],k) for k in nets) and any(sc(o[a],k)>sc(o[b],k) for k in nets):
                    err(f"{i} option {a} dominates {b} (hidden ranking)")
    print(fn,len(rows),"entries")
sys.exit(1 if bad else 0)
