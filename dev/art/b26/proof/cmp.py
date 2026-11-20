import json,difflib,collections
D=collections.Counter(); bad=[]; over=[]; samples={}; tot=0; err=0; heldsame=0; leftover=collections.Counter()
for a in "a18 a26 a36 a51 a65".split():
  H=json.load(open(f"head_{a}.json")); N=json.load(open(f"new_{a}.json"))
  assert H.keys()==N.keys()
  for k in H:
    tot+=1; h,n=H[k],N[k]; p,r,ag,se=k.split("|")
    if h.startswith("ERR") or n.startswith("ERR"):
      err+=1
      if h.startswith("ERR")!=n.startswith("ERR") or (h!=n and r not in "45"): bad.append((k,"ERR change",h[:120],n[:120]))
      continue
    if h==n: continue
    D[(r,se)]+=1
    if r not in ("4","5"): bad.append((k,"non t4/t5 diff"))
    if len(n)>10000 and len(h)<=10000: over.append((k,len(h),len(n)))
    for w in ("thin, light, flowing silk","silk brocade court robe","layered silk robe","clearly"):
      pass
    if "MATTE" not in n: bad.append((k,"no DOAN"))
    if "(thướt tha); the small" in n and "thin, light" in n: bad.append((k,"both"))
    if (p,r) in (("c06","4"),("c06","5"),("m19","4"),("p01","5")) and ag=="a18": samples[k]=(h,n)
  for k in H:
    p,r,ag,se=k.split("|")
    if r in ("4","5") and not N[k].startswith("ERR") and "MATTE" not in N[k]: bad.append((k,"t4/5 unchanged"))
    if r in ("4","5") and not N[k].startswith("ERR"):
      import re
      o=N[k][N[k].find("Outfit ("):]; o=o[:o.find(". ")]
      for m in re.findall(r"[^,;]*\b(?:silk|brocade)\b[^,;]*",o): leftover[m.strip()[:90]]+=1
print("total",tot,"err/held-err",err,"changed",sum(D.values()),dict(D))
print("bad",len(bad),bad[:10]); print("new>10000",len(over),over[:20])
print("leftover silk/brocade phrases in t4/t5 Outfit (top):")
for m,c in leftover.most_common(40): print(c,m)
json.dump({k:v for k,v in samples.items()},open("samples.json","w"),ensure_ascii=False)
