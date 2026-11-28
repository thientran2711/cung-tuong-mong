# law 11 scan: every death of HER (die/kcDie/over) or of an NPC (alive=false / asOut dead / dieIf) gated by Sức <= 0 in dev/build/*.js
import re,glob,sys
root=sys.argv[1] if len(sys.argv)>1 else 'dev/build'
pat=re.compile(r'(\w+\.)?suc\s*<=\s*(0|BAL\.kc2\.kc2Month_min_suc)|\.suc\|\|0\)\s*<=\s*0')
kill=re.compile(r'(?<![\w.])(die|kcDie|over)\(|alive\s*=\s*false|asOut\([^)]*"dead"|dieIf\(')
for f in sorted(glob.glob(root+'/*.js')):
  if '/jbal' in f or f.endswith('/all.js'): continue
  for i,l in enumerate(open(f,encoding='utf-8'),1):
    for m in pat.finditer(l):
      seg=l[m.start():m.start()+260]
      k=kill.search(seg)
      if not k: continue
      g='kiet' if 'kiet' in l[max(0,m.start()-40):m.start()+120] else '-'
      print(f"{f.split('/')[-1]}:{i}\t{g}\t{seg[:150].strip()}")
