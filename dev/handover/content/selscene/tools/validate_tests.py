#!/usr/bin/env python3
"""Validate doidap.jsonl / hanhxu.jsonl against HIST-TUYENTU §8.4 + SELW-TESTS extras.
usage: python3 validate_tests.py doidap.jsonl hanhxu.jsonl"""
import json,re,sys
DD=["khiem","manh","dido","that"];HX=["giuyen","tuxu","caunguoi","nhan"]
KEYS={"fav","fav.E","fav.T","fav.H","fav.ma","duc","sac","tai","tamco","grudge.rival","friend.mate","mark.hau","time","face","raw","bac"}
bad=0
def err(m):
    global bad;bad+=1;print("ERR",m)
for fn in sys.argv[1:]:
    rows=[json.loads(l) for l in open(fn,encoding="utf8") if l.strip()]
    ids=set();texts=set();want=DD if "doidap" in fn else HX
    for r in rows:
        i=r["id"]
        if i in ids:err(i+" dup id")
        ids.add(i)
        if r["tag"] not in "KD" or not r.get("src") or not r.get("cue"):err(i+" tag/src/cue")
        if not isinstance(r["lo"],int) or not 0<=r["lo"]<=3:err(i+" lo")
        o=r["options"]
        if len(o)!=4 or [x["stance"] for x in o].count(want[0])+0<0:err(i+" opts")
        if sorted(x["stance"] for x in o)!=sorted(want):err(i+" stances "+str([x["stance"] for x in o]))
        tot=set()
        for x in o:
            g,l=x["gain"],x["loss"]
            if not g or not l:err(i+" gain/loss empty")
            if set(g)&set(l):err(i+" same key gain+loss")
            for k in list(g)+list(l):
                if k not in KEYS:err(i+" key "+k)
            sg,sl=sum(g.values()),sum(l.values())
            if sg!=sl:err(i+" gain!=loss")
            tot.add((sg,sl))
            if x["text"] in texts:err(i+" dup text")
            texts.add(x["text"])
            if "%" in x["text"]:err(i+" %")
        if len(tot)!=1:err(i+" options not equal value")
        for grp in "ETH":
            if r["type"]=="doidap" and r["asker"]!=grp and not (r["asker"]=="ma" and grp=="H"): 
                continue
            for x in o:
                v=[s for k,s in x["reacts"].items() if k.startswith(grp+".")]
                if not("+" in v and "−" in v):err(f"{i} {x['stance']} not both +/− for {grp}")
        # every royal group, hành xử: check all three
    print(fn,len(rows),"entries")
sys.exit(1 if bad else 0)
