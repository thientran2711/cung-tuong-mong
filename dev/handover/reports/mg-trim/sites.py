import re,glob,json,collections
kinds=[k for k in json.load(open('dev/handover/reports/mg-trim/kinds-live.json')) if not k.startswith('__')]
L=r'(startContest|playArt|kg82Play|kg82Lesson|exRun|tsGame|openMG|kg82Word|mgSet|mgTier|kgQuick|kitQuick)\s*\('
out=collections.defaultdict(list)
for f in sorted(glob.glob('j*.js')):
  for i,l in enumerate(open(f,encoding='utf-8'),1):
    for m in re.finditer(L,l):
      seg=l[m.start():m.start()+220]
      ks=[k for k in kinds if re.search(r'["\']%s["\']'%re.escape(k),seg)]
      out[m.group(1)].append((f,i,ks,seg[:150].replace('\n',' ')))
for fn,v in out.items():
  print('##',fn,len(v))
  for f,i,ks,s in v[:40]:print('  %s:%d %s | %s'%(f,i,ks,s))
