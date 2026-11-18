import json,sys
J=json.load(open('jobs.json'))
ids={}
for l in open('sheets5.txt'):
    p=l.split()
    if len(p)>=2 and not l.startswith('#'): ids[p[0]]=p[1]   # last wins
for k in sys.argv[1:]:
    j=J[k]; r=j.get('ref'); rid=ids.get(r[6:]) if r and r.startswith('SHEET:') else r
    print('==',k,'style',j['style'],'ref',rid); print(j['prompt'].replace(', masculine colour',', masculine colour')); print()
