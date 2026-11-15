# python3 meanings_check.py rows.json [cdn_index.json]  : apply meanings.py rules to every inventoried line / act name
# -> unmatched heads, keys without picture, heads per key (review), and JSON for the table (meanings_out.json)
import json,re,sys,os,collections
H=os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0,H)
from meanings import R
rows=json.load(open(sys.argv[1]))
have=set()
if len(sys.argv)>2:
    have={f[0][8:-5] for f in json.load(open(sys.argv[2]))['files'] if f[0].startswith('img/act-') and f[0].endswith('.webp')}
C=[(k,re.compile(rx,re.I),sc) for k,rx,sc in R]
def match(t):
    for k,rx,sc in C:
        if rx.search(t): return k
    return None
def nz(h):
    h=re.sub(r'Lan Tần','X',h);h=re.sub(r'\d+','N',h);return h
out=collections.defaultdict(lambda:{'heads':set(),'src':set(),'old':collections.Counter()})
un=collections.defaultdict(set)
for r in rows:
    t=r['t'].replace(' ',' ').strip()
    k=match(t)
    h=nz(r['h']) if r['kind'] in ('log','opt','ret') else nz(t)
    if k is None: un[h].add(r['f']+':'+str(r['l'])); continue
    o=out[k]; o['heads'].add(h); o['src'].add(r['f']+':'+str(r['l'])); o['old'][re.sub(r'^img/|\.webp$','',r['pic'])]+=1
    if r.get('card'): o['old'][r['card']+'(thẻ)']+=1
SC={}
for k,rx,sc in R:
    if sc and k not in SC: SC[k]=sc
new=[k for k in out if k!='-' and SC.get(k)]
keep=[k for k in out if k!='-' and not SC.get(k) and not k.startswith('scene:')]
miss=[k for k in keep if have and k not in have]
print('matched keys',len(out)-('-' in out),'new pictures',len(new),'kept',len(keep),'kept-but-missing-on-CDN',miss)
print('unmatched heads',len(un))
for h,s in sorted(un.items()): print('  ?',h[:90],sorted(s)[0])
json.dump({k:{'heads':sorted(v['heads']),'src':sorted(v['src'])[:4],'old':v['old'].most_common(3),'scene':SC.get(k,'')} for k,v in out.items()},open(os.path.join(os.path.dirname(sys.argv[1]),'meanings_out.json'),'w'),ensure_ascii=False,indent=0)
