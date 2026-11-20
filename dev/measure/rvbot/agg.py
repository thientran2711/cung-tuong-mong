import json,sys,glob,collections,os
# usage: agg.py <arm> files...  -> danh source table (lines mapped to dev/build files)
arm=sys.argv[1]; files=sys.argv[2:]
root=os.environ.get('MAIN','/home/user/wt/rmain') if arm=='main' else os.environ.get('BR','/home/user/wt/rbc')
H=open(root+'/index.html',encoding='utf8').read().split('\n')
src={f:open(f,encoding='utf8').read() for f in glob.glob(root+'/dev/build/*.js')}
cache={}
def where(n):
  n=int(n)
  if n in cache: return cache[n]
  t=H[n-1].strip()[:60] if n-1<len(H) else ''
  hit='?'
  if len(t)>15:
    for f,s in src.items():
      i=s.find(t)
      if i>=0: hit=os.path.basename(f)+':'+str(s.count('\n',0,i)+1); break
  cache[n]=hit; return hit
def lab(k):
  if ' | ' in k:
    c,f=k.split(' | ',1)
    return c+' | '+lab(f)
  return '<'.join(p.split('@')[0]+'@'+where(p.split('@')[1]) if '@' in p else p for p in k.split('<'))
tot=collections.Counter(); tot36=collections.Counter(); lives=0
for f in files:
  for x in json.load(open(f)):
    dt=x.get('dt'); 
    if not dt: continue
    lives+=1
    for k,v in dt['src'].items(): tot[lab(k)]+=v[0]
    for k,v in dt['src36'].items(): tot36[lab(k)]+=v
print(arm,'lives',lives)
ctx=collections.Counter()
for k,v in tot36.items(): ctx[k.split(' | ')[0] if ' | ' in k else k]+=v
print('-- by context (Danh gained before month 36, per life)')
for k,v in ctx.most_common(20): print(f'{v/lives:7.1f}  {k}')
print('-- by context+frame')
for k,v in tot36.most_common(20): print(f'{v/lives:7.1f}  {k[:160]}')
