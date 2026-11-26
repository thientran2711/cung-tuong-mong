import re,sys,collections,subprocess
root=sys.argv[1]
src=open(root+'/dev/build/assemble.py').read()
L=re.findall(r"'([^']+\.js)'",src.split("js=''.join")[1].split('\n')[0])
c=collections.defaultdict(list)
for f in L:
  try:t=open(root+'/dev/build/'+f,encoding='utf-8').read()
  except: continue
  for m in re.finditer(r'(?m)^function\s+([A-Za-z_$][\w$]*)\s*\(',t): c[m.group(1)].append(f)
for k,v in sorted(c.items()):
  if len(v)>1: print(k,v)
