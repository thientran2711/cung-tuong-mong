#!/usr/bin/env python3
"""Same-rank audit (E12, owner Lượt 650/656): inside one look group at one rank + age, count repeats of
HELD ITEM / ANGLE sentence / ANGLE visual class / GRACE line among the group's people.
Method = dev/handover/reports/same-rank-audit.md: build_all.build(person, rank, age) run in-process
(B8 'not drawn' refusal bypassed so every member is counted), fields read from the final prompt.
Usage: same_rank_audit.py ["Sắc sảo" "Tinh nghịch" ...]   (default: those two)    -> markdown table on stdout."""
import sys,os,re,collections
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import build_all as B
B._kc_drawn=lambda p: True
AGES=["a18","a26","a36","a51","a65"]
def groups():
    """the owner's face groups (Lượt 686): dev/art/face-common/OWNER_GROUPS_L686.json (person -> group), m and c ids."""
    import json
    G={}
    for k,v in json.load(open(os.path.join(B.ART,"face-common","OWNER_GROUPS_L686.json"),encoding="utf-8")).items():
        if k in B.PEOPLE: G.setdefault(v,[]).append(k)
    return {k:sorted(v) for k,v in G.items()}
def _angle_class_old(s):
    side=re.search(r"\b(RIGHT|LEFT)\b",s); side=side.group(1).lower() if side else ""
    if "THREE-QUARTER" in s: return "3/4 "+side
    if "FRONTAL" in s and "SLIGHT" not in s: return "frontal"
    return "slight "+side
def fields(p,t,a):
    S=B.build(p,t,a)[1]; g=B.LAST_G
    it=g["age_item"](p,"t%d"%t,None,None); it=it[0] if isinstance(it,tuple) else it
    assert it in S,(p,t,a,it)
    ang=re.search(r"ANGLE: (.+?); her head turns",S).group(1); gr=re.search(r"GRACE \(pose variety, every rank its own\): (.+?)\.",S).group(1)
    return {"item":it,"angle":ang,"class":B.ang_class(ang),"grace":gr}
def audit(name,people):
    D={(t,a):{p:fields(p,t,a) for p in people} for t in range(1,9) for a in AGES}
    rows=[]
    for f,lab in (("item","held item (exact)"),("angle","angle sentence (exact)"),("class","angle, visual class (5)"),("grace","grace line")):
        dist=[];big=[];rep=0;worst=None
        for k,v in D.items():
            c=collections.Counter(x[f] for x in v.values()); dist.append(len(c)); m=max(c.values()); big.append(m)
            if m>1: rep+=1
            if worst is None or m>worst[0]: worst=(m,k,[q for q in v if c[v[q][f]]==m])
        B.store("c06",1,"a18"); ci,ca,cc=B.e12_caps(len(people),[B.ang_class(x) for x in B.LAST_G["ANG14"]]); cap={"item":ci,"grace":ci,"angle":ca,"class":cc}[f]
        over=sum(1 for k,v in D.items() if max(collections.Counter(x[f] for x in v.values()).values())>cap)
        rows.append(f"| {lab} | {sum(dist)/len(dist):.1f} / {min(dist)} | {max(big)} | {rep} | {over} | "+(f"t{worst[1][0]} {worst[1][1]}: "+"+".join(worst[2]) if worst[0]>1 else "-")+" |")
    return (f"### {name} ({len(people)})\n\n| field | distinct per cell (avg / min) | largest same-value group | cells (of 40) with any repeat | cells over the pigeonhole cap (item/grace ceil(n/8), angle ceil(n/14), class e12_caps) | worst cell |\n|---|---|---|---|---|---|\n"+"\n".join(rows)+"\n")
if __name__=="__main__":
    G=groups(); names=sys.argv[1:] or list(G)
    for n in names: print(audit(n,G[n]))
