# scan: every endTurn / nextBuoi wrapper that can RETURN without calling the wrapped function (a hold of the day turn)
import re,glob,sys
root=sys.argv[1] if len(sys.argv)>1 else 'dev/build'
pat=re.compile(r'(?:const|let)\s+(\w+)\s*=\s*(endTurn|nextBuoi)\s*;\s*\2\s*=\s*function\s*\([^)]*\)\s*\{')
rows=[]
for f in sorted(g for g in glob.glob(root+'/*.js') if not g.endswith('/all.js')):
  s=open(f,encoding='utf8').read()
  for m in pat.finditer(s):
    v,fn=m.group(1),m.group(2);i=m.end();
    call=s.find(v+'.apply',i);call2=s.find(v+'.call',i);c=min([x for x in (call,call2) if x>=0] or [len(s)])
    pre=s[i:c]
    if re.search(r'\breturn\b',pre):
      ln=s.count('\n',0,m.start())+1
      rows.append((f.split('/')[-1]+':'+str(ln),fn,re.sub(r'\s+',' ',pre)[:260]))
for r in rows:print(' | '.join(r))
print('TOTAL',len(rows))
