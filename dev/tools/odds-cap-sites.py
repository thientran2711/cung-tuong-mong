# ODDS CAP (owner 17/11 17:00Z / 17:35Z): one-shot transformer of every hint that led with the old ladder word "Chắc chắn".
# Action per occurrence "file:line:occ": S = strip (bookkeeping / a decision / walking / a result text: no odds word, never rolled);
# P = a pbtn chance act (cap word + capAt(khắc, Sức) gate attrs); O = a dialog option chance act (cap word + cap:<khắc>); W = cap word only.
# Kept for the record (the before/after table in dev/handover/reports/odds-cap.md is printed from it); run once, from dev/build.
import re,sys
A={
'j15.js:30:0':'S',
'j15.js:33:0':'S','j15.js:33:1':'S','j15.js:33:2':'S','j15.js:33:3':'S','j15.js:33:4':'S',
'j15.js:49:0':'S','j15.js:66:0':'S','j15.js:66:1':'P',
'j19.js:89:0':'S','j20.js:25:0':'S','j21.js:52:0':'S','j21.js:52:1':'S','j21.js:67:0':'S','j22.js:53:0':'S',
'j23.js:27:0':'P','j23.js:28:0':'P','j23.js:29:0':'P',
'j24.js:23:0':'S','j24.js:29:0':'S','j24.js:65:0':'S','j24.js:65:1':'S','j24.js:66:0':'S','j24.js:66:1':'S','j24.js:66:2':'S','j24.js:67:0':'S','j24.js:68:0':'S',
'j25.js:48:0':'P','j25.js:49:0':'P','j25.js:51:0':'P',
'j42.js:358:0':'P','j42.js:359:0':'P',
'j53.js:186:0':'P','j53.js:187:0':'P','j53.js:189:0':'S','j53.js:192:0':'S','j53.js:192:1':'S','j53.js:198:0':'S','j53.js:199:0':'S',
'j54.js:203:0':'P','j54.js:207:0':'P','j54.js:209:0':'S','j54.js:212:0':'S',
'j70.js:457:0':'S',
'j77.js:71:0':'S','j77.js:80:0':'S','j77.js:155:0':'S','j77.js:156:0':'S','j77.js:158:0':'S','j77.js:186:0':'S',
'j83.js:139:0':'S','j83.js:185:0':'S','j83.js:187:0':'P','j83.js:196:0':'P','j83.js:246:0':'P',
'j85.js:174:0':'P','j85.js:175:0':'P','j85.js:176:0':'P','j85.js:180:0':'P','j85.js:181:0':'P','j85.js:182:0':'P',
'j99succ.js:78:0':'S','j99succ.js:148:0':'S',
'jact.js:80:0':'P','jclose.js:21:0':'S',
'jemoact.js:199:0':'S','jemoact.js:372:0':'S','jemoact.js:373:0':'S','jemoact.js:399:0':'S','jemoact.js:400:0':'S',
'jht.js:121:0':'S','jht.js:122:0':'P','jkitpage.js:23:0':'W','jkitpage.js:23:1':'W',
'jlost.js:187:0':'B',
'jmen.js:111:0':'O','jmen.js:169:0':'O','jmen.js:171:0':'O','jmen.js:172:0':'O','jmen.js:176:0':'S',
'jpet.js:190:0':'S','jpet.js:191:0':'S','jpet.js:194:0':'S','jstaff.js:96:0':'P',
'jtabs.js:36:0':'P','jtabs.js:37:0':'P','jtabs.js:38:0':'P','jtabs.js:41:0':'P','jtabs.js:42:0':'P','jtabs.js:43:0':'P','jtabs.js:61:0':'P',
'jtds.js:135:0':'P','jtds.js:136:0':'P','jtds.js:146:0':'P',
'jts.js:143:0':'O',
'jtsb.js:124:0':'O','jtsb.js:127:0':'O','jtsb.js:128:0':'S','jtsb.js:139:0':'S','jtsb.js:144:0':'O','jtsb.js:167:0':'S','jtsb.js:170:0':'S',
'jtsb.js:189:0':'O','jtsb.js:190:0':'S','jtsb.js:191:0':'O','jtsb.js:192:0':'S','jtsb.js:225:0':'S','jtsb.js:231:0':'S','jtsb.js:232:0':'S',
'jtsb.js:233:0':'S','jtsb.js:234:0':'S','jtsb.js:236:0':'S','jtsb.js:236:1':'S','jtsb.js:238:0':'S',
'jty.js:65:0':'S','jty.js:66:0':'S','jty.js:98:0':'S','jty.js:107:0':'S',
}
W='Chắc chắn'
def strend(l,i,q):
  # end index of the string literal whose body starts at i (quote char q), skipping ${...} nesting for templates
  d=0;j=i
  while j<len(l):
    c=l[j]
    if q=='`' and l.startswith('${',j):d+=1;j+=2;continue
    if q=='`' and c=='}' and d>0:d-=1;j+=1;continue
    if c=='\\':j+=2;continue
    if c==q and d==0:return j
    j+=1
  return j
def costs(body):
  k=re.search(r'(\$\{[^}]+\}|\d+)(?:\s*-\s*\d+)? khắc',body);s=re.search(r'Sức -(\$\{[^}]+\}|\d+)',body)
  ex=lambda m:(m.group(1)[2:-1] if m.group(1).startswith('${') else m.group(1)) if m else '0'
  return ex(k),ex(s)
rows=[]
files={}
for key in A:
  f,ln,oc=key.split(':');files.setdefault(f,[]).append((int(ln),int(oc),A[key]))
for f,L in files.items():
  lines=open(f,encoding='utf-8').read().split('\n')
  for ln,oc,act in sorted(L,key=lambda x:(-x[0],-x[1])):
    l=lines[ln-1];pos=[m.start() for m in re.finditer(W,l)];p=pos[oc];q=l[p-1]
    assert q in '`"',(f,ln,oc,l[p-5:p+15])
    e=strend(l,p,q);body=l[p:e]
    if act=='S':
      if body==W:new=('""' if q=='"' else '');l=(l[:p-1]+'""'+l[e+1:]) if q=='"' else l[:p]+l[p+len(W):]
      else:
        rest=body[len(W):];rest=re.sub(r'^\s*·\s*','',rest);l=l[:p]+rest+l[e:]
      rows.append((f,ln,act,'odds word dropped (no roll)'))
    else:
      k,s=costs(body)
      if q=='`':l=l[:p]+'${capW()}'+l[p+len(W):]
      else:l=l[:p-1]+'capW()+"'+l[p+len(W):]
      if act=='P':
        b=l.rfind('pbtn(`',0,p);assert b>=0,(f,ln);c=strend(l,b+6,'`')
        ins='${capAt('+k+(',{suc:-('+s+')}' if s!='0' else '')+')}'
        l=l[:c]+ins+l[c:]
      elif act=='O':
        ms=list(re.finditer(r'\{(?:k:"\w+",)?n:',l[:p]));assert ms,(f,ln);b=ms[-1].start();l=l[:b+1]+'cap:'+k+','+l[b+1:]
      rows.append((f,ln,act,f'rolls at the cap; soft fail spends {k} khắc'+(f', Sức {s}' if s!='0' else '')))
    lines[ln-1]=l
  open(f,'w',encoding='utf-8').write('\n'.join(lines))
for r in sorted(rows):print('|'.join(map(str,r)))
