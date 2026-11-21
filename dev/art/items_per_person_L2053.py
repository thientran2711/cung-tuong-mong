#!/usr/bin/env python3
"""ITEMS1 (owner L2053 via Foreman C ROOT): held-item ladder t1-t8 for the 90 consorts at the thu production age (a18),
FROM THE EXISTING MAP ONLY = the E11 lists the builder already reads (t8-prompt-B/build.py _E11_LISTS(): per rank, the 8 a18
indices L[t][1]['a18']). No new item, no new words: every entry is an index into that list + its text copied verbatim.
Rules applied:
  E6  one person: 8 different item KINDS t1-t8 (e6_kind) - except the owner-approved s62 exceptions (person_gate APPROVED_ITEM).
  E7  rank lists are per rank (t6-t8 items stay in their rank), a18 cell only.
  E12 same look group (OWNER_GROUPS_L686.json) + rank + age: items as different as possible = each item at most
      ceil(members / items-of-that-rank) times (groups have 13-18 members, a rank has 8 a18 items: pigeonhole minimum).
  NEW (AUDIT1 W1, L2039/L2053): no two of the 90 persons share the whole t1-t8 ladder; two persons of one group share
      at most MAXOV ranks; across groups each rank's 8 items are spread evenly.
  G59 the t2 a18 sachet (index 1) is skipped (sachet banned everywhere); t2 uses its other 7 a18 items.
  Pinned: s62 = her approved thu ladder (L1776/L1804/L1723/L1726 files + L1979/L1976 t7/t8 exceptions).
Output: items_per_person_L2053_DRAFT.json. Run: python3 dev/art/items_per_person_L2053.py [--check]"""
import os,sys,json,math,collections,io,contextlib
ART=os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0,ART)
import person_gate as P
B=P._builder(); g=B.LAST_G; L=g["_E11_LISTS"](); KIND=g["e6_kind"]
AGE="a18"; T=["t%d"%i for i in range(1,9)]
BANNED={("t2",1):"G59 sachet"}
ITEMS={t:[i for i in L[t][1][AGE] if (t,i) not in BANNED] for t in T}
GROUPS=collections.defaultdict(list)
for p,gr in json.load(open(os.path.join(ART,"face-common","OWNER_GROUPS_L686.json"),encoding="utf-8")).items():
    if gr!="Kho" and not gr.startswith("Công chúa"): GROUPS[gr].append(p)
GROUPS={k:sorted(v) for k,v in sorted(GROUPS.items())}
PIN={"s62":{"t1":5,"t2":10,"t3":13,"t4":9,"t5":25,"t6":25,"t7":12,"t8":10}}
# personality fit (tie-break only): kinds that suit the group's look
AFF={"Dịu dàng":{"flute","book","flowers","hoop","letter","basket","lamp"},
     "Đoan trang":{"book","scroll","lamp","box","letter","mirror","hoop"},
     "Sắc sảo":{"fan","mirror","hairpin","box","flask","lute","parasol"},
     "Kiêu kỳ":{"fan","parasol","hairpin","box","flask","mirror","lantern"},
     "Lạnh lùng":{"flute","scroll","book","lamp","lute","letter"},
     "Quyến rũ":{"fan","hairpin","mirror","flask","lute","ball","flowers"}}
MAXALL=4   # any two of the 90 persons share at most 4 ranks
def solve(maxov):
    glob=collections.Counter(); ladders={}; seen=set()
    for gr,mem in GROUPS.items():
        cap={t:math.ceil(len(mem)/len(ITEMS[t])) for t in T}; gc=collections.Counter(); done=[]
        for p in sorted(mem,key=lambda x:(x not in PIN,x)):   # pinned first
            if p in PIN: lad=tuple(PIN[p][t] for t in T)
            else:
                def score(t,i): return (gc[(t,i)]*100+glob[(t,i)]*3-(5 if KIND(L[t][0][i][0]) in AFF.get(gr,()) else 0), i)
                order={t:sorted(ITEMS[t],key=lambda i,t=t:score(t,i)) for t in T}
                best=[None]; nodes=[0]
                def dfs(k,used,cur):
                    nodes[0]+=1
                    if best[0] or nodes[0]>200000: return
                    if k==8:
                        lad=tuple(cur)
                        if lad in seen: return
                        if any(sum(a==b for a,b in zip(lad,o))>maxov for o in done): return
                        if any(sum(a==b for a,b in zip(lad,o))>MAXALL for o in seen): return
                        best[0]=lad; return
                    t=T[k]
                    for i in order[t]:
                        kd=KIND(L[t][0][i][0])
                        if kd in used or gc[(t,i)]>=cap[t]: continue
                        # prune: partial overlap already too big
                        if any(sum(a==b for a,b in zip(cur+[i],o[:k+1]))>maxov for o in done): continue
                        dfs(k+1,used|{kd},cur+[i])
                        if best[0]: return
                dfs(0,frozenset(),[]); lad=best[0]
                if lad is None: return None,f"{gr} {p} no ladder at maxov={maxov}"
            for t,i in zip(T,lad): gc[(t,i)]+=1; glob[(t,i)]+=1
            done.append(lad); seen.add(lad); ladders[p]=(gr,lad)
    return ladders,None
def main():
    for mx in (2,3,4):
        lad,err=solve(mx)
        if lad: break
        print("relax:",err)
    out={"_meta":{"source":"t8-prompt-B/build.py _E11_LISTS() a18 indices (existing map, E11/E12), no new items","age":AGE,
                  "maxov_same_group":mx,"banned_skipped":{f"{t}:{i}":r for (t,i),r in BANNED.items()},"pinned":sorted(PIN),
                  "builder_read":"in _e6_picks(c,age): if age=='a18' and c in this json -> out[t]=L[t][0][json[c][t]['idx']] for t1-t8"}}
    for p,(gr,l) in sorted(lad.items()):
        out[p]={"group":gr,**{t:{"idx":i,"kind":KIND(L[t][0][i][0]),"item":L[t][0][i][0]} for t,i in zip(T,l)}}
    json.dump(out,open(os.path.join(ART,"items_per_person_L2053_DRAFT.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=1)
    check(out)
def check(out):
    pp={p:v for p,v in out.items() if not p.startswith("_")}; bad=[]
    lads=collections.Counter(tuple(v[t]["idx"] for t in T) for v in pp.values())
    bad+=[f"same ladder x{n}" for l,n in lads.items() if n>1]
    for p,v in pp.items():
        ks=[v[t]["kind"] for t in T]
        if len(set(ks))<8 and p not in PIN: bad.append(f"E6 {p} {ks}")
        for t in T:
            if (t,v[t]["idx"]) in BANNED: bad.append(f"BANNED {p} {t}")
            if v[t]["idx"] not in L[t][1][AGE]: bad.append(f"NOT-A18 {p} {t}")
    mo=0; per=collections.defaultdict(list)
    for gr,mem in GROUPS.items():
        for a in mem:
            for b in mem:
                if a<b: mo=max(mo,sum(pp[a][t]["idx"]==pp[b][t]["idx"] for t in T))
        for t in T:
            c=collections.Counter(pp[m][t]["idx"] for m in mem); per[gr].append(max(c.values()))
    allov=max(sum(pp[a][t]["idx"]==pp[b][t]["idx"] for t in T) for a in pp for b in pp if a<b)
    print(f"persons {len(pp)}  distinct ladders {len(lads)}  max shared ranks same group {mo}  any two persons {allov}")
    for gr in GROUPS: print(f"  {gr} ({len(GROUPS[gr])}): max uses of one item per rank t1-t8 = {per[gr]}")
    print("CHECK", "FAIL "+"; ".join(bad[:10]) if bad else "PASS"); return not bad
if __name__=="__main__":
    if "--check" in sys.argv: sys.exit(0 if check(json.load(open(os.path.join(ART,"items_per_person_L2053_DRAFT.json")))) else 1)
    main()
