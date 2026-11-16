import sys,json,importlib.util,os,statistics as s
W='/home/user/wt/norosy/'
sp=importlib.util.spec_from_file_location('sk',W+'dev/art/skin-smudge.py');sk=importlib.util.module_from_spec(sp);sp.loader.exec_module(sk)
rows=[l.split() for l in open('rosy.txt') if l.startswith('por-')]
A={json.loads(l)['f']:'delta' for l in open('A.jsonl') if json.loads(l)['st']=='ok'}
d={'delta':[],'model':[]};db={'delta':[],'model':[]}
M={json.loads(l)['por']:json.loads(l) for l in open('M.jsonl')}
for r in rows:
    p=r[0];f='final/img/'+p
    if not os.path.exists(f): continue
    a=sk.analyse(f)
    if not a: continue
    g=A.get(p,'model');d[g].append(a[0]['ac']-float(r[2]))
    m=M.get(p,{})
    if 'pre' in m: db[g].append(a[0]['bc']-m['pre'][2])
for g in d: print(g,len(d[g]),'da med %.2f'%s.median(d[g]),[round(x,1) for x in s.quantiles(d[g],n=10)],'db med %.2f'%s.median(db[g]) if db[g] else '')
