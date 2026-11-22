import json,glob,sys
D=sys.argv[1]
agg={}
for f in sorted(glob.glob(D+'/*.json')):
  if f.endswith('ext.json'):continue
  for x in json.load(open(f)):
    me=x.get('bc',{}).get('me',[])
    if len(me)<2:continue
    o=x['origin'];agg.setdefault(o,[]).append(me)
cols=['sac','tai','tamco','duc','danh','sung','bac','suc','artSum','artMax']
print('origin n | at month 0 / 12 / 24 / 36 : '+' '.join(cols))
for o,L in sorted(agg.items()):
  for m in (0,12,24,36):
    rows=[]
    for me in L:
      r=[y for y in me if y[0]>=m]
      if r:rows.append(r[0])
    if not rows:continue
    av=[round(sum(r[i] for r in rows)/len(rows)) for i in range(1,11)]
    print(f'{o:5} n{len(rows)} m{m:<3}',' '.join(f'{c}:{v}' for c,v in zip(cols,av)))
