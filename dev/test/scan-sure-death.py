# scan-sure-death.py (s3e-display-fix, law 6/7 + law 11): options shown SURE (no odds on them) whose go() reaches a function with a hidden roll into death / a life ending.
# usage: python3 dev/test/scan-sure-death.py [dev/build]   (rare ✦ roads that END for sure, e.g. kcElope(true), are certain, not hidden rolls)
import re,glob,os,sys
D=sys.argv[1] if len(sys.argv)>1 else 'dev/build'
DEATH=r'(die\(|kcEndDo\(|kidDie\(|endLife\()'
src={f:open(f,encoding='utf-8').read() for f in glob.glob(os.path.join(D,'j*.js')) if not os.path.basename(f).startswith('jbal')}
HF=set()
for f,t in src.items():
  for m in re.finditer(r'function ([A-Za-z0-9_$]+)\(([^)]*)\)\{',t):
    body=t[m.end():m.end()+1500]
    nx=re.search(r'\nfunction ',body);body=body[:nx.start()] if nx else body
    if re.search(r'roll\([^;{]{0,80}\)\)?\{?[^;]{0,60}'+DEATH,body):HF.add(m.group(1))
print("hidden-death functions:",len(HF))
out=[]
for f,t in src.items():
  for m in re.finditer(r'(\{n:|kcO\(|pbtn\()(`[^`]*`|"[^"]*")',t):
    seg=t[m.start():m.start()+700];seg=seg.split('\n')[0]
    gi=max(seg.find('go:'),seg.find('()=>'))
    if gi<0:continue
    head,g=seg[:gi],seg[gi:gi+260]
    called={x for x in set(re.findall(r'([A-Za-z0-9_$]+)\(',g))&HF if not re.search(re.escape(x)+r'\(true',g)}
    if called and not re.search(r'(word\(|odP\(|chanceW\(|chanceLvl\(|oddsChip|\bo:|odds:|\bod\b)',head+g[:400]):
      out.append((f,t[:m.start()].count('\n')+1,m.group(2)[:45],",".join(sorted(called))))
for r in sorted(out):print("%s:%d | %s | %s"%r)
print("TOTAL",len(out))
