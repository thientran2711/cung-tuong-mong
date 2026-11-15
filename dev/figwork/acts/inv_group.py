import json,re,sys,collections
R=json.load(open(sys.argv[1]))
def norm(t):
    t=re.sub(r'Lan Tần','X',t); t=re.sub(r'\d+','N',t); t=re.sub(r'\bX( X)+','X',t)
    return t
def head(t):
    h=re.split(r'[.:·(\[]',t)[0].strip()
    return norm(h)
rows=[]
for a in R['acts']:
    n=a['n']
    if not re.search(r'[A-Za-zÀ-ỹ]{2}',n) or n in('X','N') or '<img' in n: continue
    rows.append(dict(kind='act:'+a['kind'],f=a['f'],l=a['l'],t=n,h=norm(n),pic=(a['book'] or [''])[0],card=('act-'+a['key']) if a['key'] else 'act-cat-'+a['cat'],world=False))
for x in R['lines']:
    rows.append(dict(kind=x['src'],f=x['f'],l=x['l'],t=x['t'],h=head(x['t']),pic=(x['pics'] or [''])[0],world=x['world']))
for r in rows: r['pic']=re.sub(r'^https://[^/]+/','',r['pic'])
json.dump(rows,open(sys.argv[2],'w'),ensure_ascii=False)
G=collections.defaultdict(set)
for r in rows: G[r['pic']].add(r['h'])
sh={p:hs for p,hs in G.items() if len(hs)>1}
print('rows',len(rows),'heads',len(set(r['h'] for r in rows)),'pics',len(G),'shared pics',len(sh),'heads in shared',sum(len(v) for v in sh.values()))
for p,hs in sorted(sh.items(),key=lambda x:-len(x[1]))[:60]: print(len(hs),p,' | '.join(sorted(hs))[:300])
