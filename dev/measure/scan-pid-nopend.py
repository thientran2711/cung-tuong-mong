# family scan: Q cards pushed with a literal pid; which have no PEND builder (so deserQ drops them on reload)
import re,glob,sys
root=sys.argv[1] if len(sys.argv)>1 else 'dev/build'
src={f:open(f,encoding='utf8').read() for f in glob.glob(root+'/*.js')}
pend=set()
for s in src.values():
  for m in re.finditer(r'PEND(?:\.(\w+)|\[\s*"(\w+)"\s*\])\s*=',s):pend.add(m.group(1) or m.group(2))
  for m in re.finditer(r'Object\.assign\(\s*PEND\s*,\s*\{',s):
    i=m.end();depth=1;j=i
    while depth and j<len(s):
      c=s[j];depth+=c=='{';depth-=c=='}';j+=1
    body=s[i:j]
    d=0;k=0;key=re.compile(r'(?:^|[,{])\s*"?(\w+)"?\s*:')
    # top-level keys only
    tok=0;buf=''
    lvl=0
    for idx,c in enumerate(body):
      if c in '{([':lvl+=1
      elif c in '})]':lvl-=1
      if lvl==0 and (idx==0 or body[idx-1]==',' ):
        mm=re.match(r'\s*"?(\w+)"?\s*[:(]',body[idx:])
        if mm:pend.add(mm.group(1))
    mm=re.match(r'\s*"?(\w+)"?\s*[:(]',body)
    if mm:pend.add(mm.group(1))
push={}
for f,s in src.items():
  for m in re.finditer(r'Q\.(?:push|unshift)\(\{[^;]{0,400}?\bpid:\s*"(\w+)"',s):
    push.setdefault(m.group(1),set()).add(f.split('/')[-1]+':'+str(s.count('\n',0,m.start())+1))
miss={k:v for k,v in push.items() if k not in pend}
print('PEND keys',len(pend),'literal pushed pids',len(push))
for k,v in sorted(miss.items()):print('NO-PEND',k,sorted(v))
