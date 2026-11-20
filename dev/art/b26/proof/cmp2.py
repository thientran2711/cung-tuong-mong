import json,difflib,collections,re
D=collections.Counter(); bad=[]; over=[]; tot=0; words=collections.Counter(); persons=set()
for a in "a18 a26 a36 a51 a65".split():
  H=json.load(open(f"new_{a}.json")); N=json.load(open(f"fl_{a}.json"))
  for k in H:
    tot+=1; h,n=H[k],N[k]; p,r,ag,se=k.split("|")
    if h==n: continue
    if h.startswith("ERR") or n.startswith("ERR"): bad.append((k,"ERR change",h[:100],n[:100])); continue
    D[(r,se)]+=1; persons.add(p)
    if r not in "123456": bad.append((k,"rank diff"))
    if len(n)>10000 and len(h)<=10000: over.append((k,len(h),len(n)))
    a_,b_=h.split(),n.split()
    for op,i1,i2,j1,j2 in difflib.SequenceMatcher(None,a_,b_,autojunk=False).get_opcodes():
      if op!='equal': words[(' '.join(a_[i1:i2]),' '.join(b_[j1:j2]))]+=1
print("total",tot,"changed",sum(D.values()),sorted(D.items())); print("persons changed",len(persons))
print("bad",len(bad),bad[:8]); print("new>10000",len(over),over[:20])
for (x,y),c in words.most_common(200): print(c,"|",x,"=>",y)
