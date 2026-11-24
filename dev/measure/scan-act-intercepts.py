# LAW 11 family scan (review/fix-hadoc-loop): every wrapper of an act entry (doAct / act / runAct / harmAct) that can STOP the act and put a
# card up instead (Q.push / Q.unshift / pushDil / showModal + return). Each such card's own «do it» option calls the entry again; if that second
# call is caught by ANOTHER interceptor whose bypass is a transient flag (window.__x=1 … finally 0), the two cards ping-pong for ever (no khắc spent).
import re,glob,sys
root=sys.argv[1] if len(sys.argv)>1 else 'dev/build'
order=re.findall(r"'([\w./]+\.js)'",open(root+'/assemble.py',encoding='utf8').read())
pos={f.split('/')[-1]:i for i,f in enumerate(order)}
pat=re.compile(r'(?:const|let)\s+(\w+)\s*=\s*(doAct|act|runAct|harmAct)\s*;\s*\2\s*=\s*function\s*\(([^)]*)\)\s*\{')
rows=[]
for f in sorted(g for g in glob.glob(root+'/*.js') if not g.endswith('/all.js')):
  s=open(f,encoding='utf8').read();b=f.split('/')[-1]
  for m in pat.finditer(s):
    v,fn=m.group(1),m.group(2);i=m.end();c=s.find(v+'.apply',i);c=c if c>=0 else i+3000
    pre=s[i:c]
    if re.search(r'(Q\.(push|unshift)|pushDil|showModal)\(',pre) and re.search(r'\breturn\b',pre):
      flags=sorted(set(re.findall(r'window\.(__\w+)|\b(ECON_ROADGO|ECON_HER)\b',pre)))
      flags=[a or b2 for a,b2 in flags]
      rows.append((pos.get(b,999),b+':'+str(s.count('\n',0,m.start())+1),fn,','.join(flags) or '-'))
rows.sort()
print('assemble-order | where | entry | bypass flags read before the card')
for r in rows:print(' | '.join(str(x) for x in r))
print('TOTAL',len(rows))
