"""Before/after table of unlogged stat changes from dev/test/log-sync.js JSON outputs.
usage: python3 dev/test/log-sync-table.py before1.json[,before2.json] after1.json[,after2.json]"""
import json,sys,re,collections
SKIP=re.compile(r'^(apply|ap|q72Ap|ap6|window\.<computed>|Object\.f|f|top) |^j11\.js|^j42\.js:56|^jint\.js|^jlogsync\.js|eval at|^UtilityScript|^Array\.forEach')
def load(fs):
  G=collections.Counter();EX={};T=collections.Counter()
  for f in fs.split(','):
    d=json.load(open(f));T['checks']+=d['checks'];T['misses']+=d['misses'];T['stale']+=d['stale'];T['drift']+=d.get('drift',0)
    for p in d['paths']:
      k,rest=p['path'].split(' | ',1)
      st=rest.split(' || ')[-1]
      fr=[x for x in st.split(' < ') if not SKIP.match(x)]
      fn=fr[0] if fr else st.split(' < ')[0]
      key=(k,re.sub(r'\s+',' ',fn)[:70]);G[key]+=p['n'];EX.setdefault(key,p['ex'][0]['lines'][-1][:90] if p['ex'] and p['ex'][0]['lines'] else '')
  return G,EX,T
B,EB,TB=load(sys.argv[1]);A,EA,TA=load(sys.argv[2])
print(f"| | before | after |\n|---|---|---|\n| checks (one after every bot action) | {TB['checks']} | {TA['checks']} |\n| replay ≠ header (unlogged change) | {TB['misses']} | {TA['misses']} |\n| broken 'a → b' chains | {TB['stale']} | {TA['stale']} |\n| someone else's / promise token only (no real change) | {TB['drift']} | {TA['drift']} |\n")
print("| stat | code path (first game frame) | before | after | last log line before |\n|---|---|---|---|---|")
for key in sorted(set(B)|set(A),key=lambda k:-(B[k]+A[k])):
  print(f"| {key[0]} | `{key[1]}` | {B[key]} | {A[key]} | {(EB.get(key) or EA.get(key) or '').replace('|','/').strip()} |")
