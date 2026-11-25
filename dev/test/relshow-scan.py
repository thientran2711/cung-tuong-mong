#!/usr/bin/env python3
"""relshow-scan (review/net-ghen, law 11 family «shown == applied»): every player-visible text that prints a RELATION DELTA
(oán / thiện cảm / quý … / ghen / tin) in dev/build/j*.js, classified:
  WIRED   the number is drawn by the shared preview (pvOan / pvQuy / pvOanAny / aaNum / aaSay: jaudit §5 — the SAME nết factor
          the oanAdd / affAdd wrappers apply in j28, as an honest range while her knowledge of the holder's nết is partial)
  HER     the holder is the player (ta / ngươi oán …, quý nàng, Ta → nàng): no hidden factor, shown == applied
  NEG     a fall (−n): the wrappers scale only a rise → shown == applied
  NOFAC   ghen / tin: no nết factor on apply (ghenN / tinAdd) → shown == applied
  FALL    pvOan's own fallback text inside a try/typeof guard
  RAW     oán / thiện cảm toward an NPC holder printed from a bare number → shown ≠ applied when the holder's nết factor ≠ 1
usage: python3 dev/test/relshow-scan.py [--list] [--fail-raw]   (run from the repo root)"""
import re,glob,sys,os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
NUM=r'(?:[+−-]\$\{[^}]{1,80}\}|\$\{balSg\([^}]{1,80}\}|\$\{balAb\([^}]{1,80}\}|[+−][0-9]+)'
OAN=re.compile(r'(oán|Oán)([^`"$\n]{0,30})'+NUM)
AFF=re.compile(r'(thiện cảm|Thiện cảm|quý ngươi|quý nàng|quý ta|quý hắn)([^`"$\n]{0,30})'+NUM)
GT=re.compile(r'(ghen|Ghen|Chủ tin|tin )([^`"$\n]{0,12})'+NUM)
WIRE=('pvOan','pvQuy','pvOanAny','pvQuyAny','aaNum','aaSay')
def her(pre,word,kind):
  p=pre[-24:]
  if kind=='oan':return bool(re.search(r'(ta|ngươi|Ta|Ngươi)\s*$',p)) or bool(re.search(r'oán (nàng|hắn)',word+p))
  return word in('quý nàng','quý hắn') or 'Ta → nàng' in p or bool(re.search(r'(ta|Ta|ngươi|Ngươi)\s*$',p))
rows=[];args=sys.argv[1:]
import json
try:BALJ=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'relshow-bal.json')))
except Exception:BALJ={}
def SIGN(path):
  # sign of a bare BAL path (relshow-bal.json = JSON.stringify(BAL) of the built game); 0 when unknown
  if not path.startswith('BAL.'):return 0
  o=BALJ
  for k in re.findall(r'[A-Za-z_0-9]+',path[4:]):
    if isinstance(o,dict) and k in o:o=o[k]
    elif isinstance(o,list) and k.isdigit() and int(k)<len(o):o=o[int(k)]
    else:return 0
  return (o>0)-(o<0) if isinstance(o,(int,float)) else 0
for f in sorted(glob.glob(os.path.join(R,'j*.js'))):
  b=os.path.basename(f)
  if b.startswith('jbal'):continue
  T=open(f,encoding='utf-8').read()
  T=re.sub(r'/\*.*?\*/',lambda m:re.sub(r'[^\n]',' ',m.group(0)),T,flags=re.S)  # comments out, lines kept
  for i,code in enumerate(T.split('\n'),1):
    if re.match(r'\s*//',code) or re.search(r'function (pvOan|pvOanAny|pvQuy|aaSay|aaNum)\(',code):continue
    for m in re.finditer(r'\b(pvOan|pvOanAny|pvQuy|pvQuyAny)\(',code):rows.append((b,i,'oan' if 'Oan' in m.group(1) else 'aff','WIRED',code[m.start():m.start()+60]))
    for kind,rx in (('oan',OAN),('aff',AFF),('gt',GT)):
      for m in rx.finditer(code):
        pre=code[:m.start()];tail=m.group(0)[len(m.group(1))+len(m.group(2)):]
        neg=tail.startswith(('-','−')) or tail.startswith('${balSg(-') or bool(re.match(r'\$\{balSg\(([A-Za-z_.0-9\[\]]+)\)\}',tail) and SIGN(re.match(r'\$\{balSg\(([A-Za-z_.0-9\[\]]+)\)\}',tail).group(1))<0) or pre.rstrip().endswith('bớt')
        if kind=='gt':c='NOFAC'
        elif neg:c='NEG'
        elif any(w in code[max(0,m.start()-120):m.end()] for w in WIRE):c='WIRED' if any(w+'(' in m.group(0) or w in code[max(0,m.start()-60):m.start()] for w in WIRE) else ('FALL' if 'typeof pv' in code[max(0,m.start()-120):m.start()] else 'RAW')
        elif her(pre,m.group(1),kind):c='HER'
        else:c='RAW'
        rows.append((b,i,kind,c,m.group(0)[:70]))
from collections import Counter
C=Counter((k,c) for _,_,k,c,_ in rows)
print('| kind | WIRED | HER | NEG | NOFAC | FALL | RAW | total |\n|---|---|---|---|---|---|---|---|')
for k in('oan','aff','gt'):
  n=[C[(k,c)] for c in('WIRED','HER','NEG','NOFAC','FALL','RAW')];print(f'| {k} | '+' | '.join(map(str,n))+f' | {sum(n)} |')
if '--list' in args:
  for r in rows:
    if r[3]=='RAW':print(f'{r[0]}:{r[1]} {r[2]} RAW {r[4]}')
if '--fail-raw' in args and any(r[3]=='RAW' for r in rows):sys.exit(1)
