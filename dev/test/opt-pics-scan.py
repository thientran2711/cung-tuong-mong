# review/opt-pics: static list of every dialog option title in dev/build (an {n:…} object with x:/go:/fx:/ok:/why:) -> <out.json>. usage: python3 dev/test/opt-pics-scan.py [out.json]
import re,json,collections
d='dev/build/'
order=re.findall(r"'(j[^']+\.js)'",open(d+'assemble.py').read())
C=collections.Counter();W=collections.defaultdict(set)
for f in order:
  if f in('jkitpage.js','jopic.js'):continue
  t=open(d+f,encoding='utf-8').read()
  for m in re.finditer(r'\{\s*n:\s*(["`\'])((?:(?!\1).){1,120}?)\1\s*,(.{0,400})',t):
    rest=m.group(3)
    # option objects: carry x:/go:/fx: keys before the next "{n:"
    seg=rest.split('{n:')[0]
    if not re.search(r'\b(x|go|fx|ok|why)\s*:',seg):continue
    n=re.sub(r'\$\{[^}]*\}','…',m.group(2))
    C[n]+=1;W[n].add(f)
json.dump([[n,c,sorted(W[n])] for n,c in C.most_common()],open(__import__('sys').argv[1] if len(__import__('sys').argv)>1 else 'opt-static.json','w'),ensure_ascii=False,indent=0)
print(len(C))
