import json,collections,difflib
C=collections.Counter(); bad=[]; over=[]; still=[]; words=collections.Counter()
for a in "a18 a26 a36 a51 a65".split():
  H=json.load(open(f"fl_{a}.json")); N=json.load(open(f"c5_{a}.json"))
  for k,n in N.items():
    h=H[k]
    if h==n: continue
    if h.startswith("ERR") or n.startswith("ERR"): bad.append((k,h[:80],n[:80])); continue
    C[k.split("|")[3]]+=1
    if len(n)>10000 and len(h)<=10000: over.append((k,len(h),len(n)))
    if k.split("|")[1]=="5" and "tiny pearl drops dangling beneath each cape edge" not in n: bad.append((k,"no t5 v2"))
    if k.split("|")[1]=="6" and "pearl drops dangling beneath it" not in n: bad.append((k,"no t6 drops"))
    C[k.split("|")[1]]+=1
print("t5 cells changed",dict(C),"bad",len(bad),bad[:5]); print("new>10000",len(over),over[:30])
