import json,sys
for line in open(sys.argv[1]):
  if not line.startswith('{'): print(line[:300]); continue
  d=json.loads(line)
  print('seed',d['seed'],d['end'],d['errs'],len(d['days']))
  for x in d['days'][::int(sys.argv[2]) if len(sys.argv)>2 else 3]: print(' ',x['t'],x['tu'],'rk',x['rank'],'sg',x['sung'],'dn',x['danh'],'dc',x['duc'],'th',x['th'],'hh',x['hh'],'rel',x['relM'],x['relX'],'oan',x['oanM'],x['oanX'],sum(x['day'].values()))
  for k,z in d.get('src',{}).items():
    print('==',k, d['g'][k])
    for w,e in sorted(z.items(),key=lambda a:-a[1][1])[:8]: print('    ',w,e)
