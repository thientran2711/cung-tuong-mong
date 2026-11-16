import json,re,collections,sys
d=json.load(open(sys.argv[1]))['res']
by=collections.defaultdict(dict)
for r in d:
  k=re.sub(r'#\d+$','',r['sf']); k=re.sub(r'^(rv|staff|kid):.*',r'\1',k)
  by[k].setdefault(r['name'],r)
f=lambda r,x:'; '.join(r.get(x) or [])[:90]
for k,v in by.items():
  print('==',k,len(v))
  for n,r in sorted(v.items()):
    print('  ',n[:42],'| T:',f(r,'ton'),'| D:',f(r,'duoc'),'| M:',f(r,'mat'),'| K:',f(r,'kem'))
