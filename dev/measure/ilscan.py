# Item-conservation static scan (reviewer item-ledger-r1): every place a piece can leave a chest/slot, with its enclosing function,
# and whether it is routed (guarded function, ilGone/ilFilter/ilRob/lostReturn/ilTake nearby, or a move into another chest).
import re,glob,sys,os
D=sys.argv[1] if len(sys.argv)>1 else 'dev/build'
GUARD=set(re.findall(r'ilGuard\("(\w+)"',open(D+'/jil.js').read()))
PAT=re.compile(r'(\w+(?:\.\w+)*)\.inv\.splice\(|(\w+)\.inv\s*=\s*\(?[\w.]*inv[^;]{0,12}\)?\.filter\(|\b(?:w|\w+\.wd)\.(tram|y)\s*=\s*null|\.vl\s*=\s*null')
rows=[]
for f in sorted(glob.glob(D+'/j*.js')):
  b=os.path.basename(f)
  if b in('all.js','jil.js'):continue
  src=open(f,encoding='utf-8').read()
  for m in PAT.finditer(src):
    pre=src[:m.start()];fn=re.findall(r'function\s+(\w+)\s*\(|(\w+)\s*=\s*function|PEND\.(\w+)\s*=',pre[-6000:])
    name=next((a or c or d for a,c,d in reversed(fn)),'?')
    ctx=src[m.start():m.start()+260]
    routed=('GUARD' if name in GUARD else '')
    for k in ['ilGone','ilFilter','ilRob','lostReturn','ilTake','.inv.push','inv.push(','wdWear','tsbLedger','useItem']:
      if k in ctx:routed+=(' '+k);break
    rows.append((b,src[:m.start()].count('\n')+1,name,routed.strip() or 'UNROUTED?',ctx[:110].replace('\n',' ')))
for r in rows:print('%s:%d\t%s\t%s\t%s'%r)
print('total',len(rows),'unrouted?',sum(1 for r in rows if r[3]=='UNROUTED?'))
