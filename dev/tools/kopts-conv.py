#!/usr/bin/env python3
# K-OPTS-READER converter (KK68): python3 dev/tools/kopts-conv.py <test files…> — rewrites the common choice reads to dev/test/lib/kopts.js
# (m.querySelector('.opts button:not([disabled])…') → __koptsOn, [...X.querySelectorAll('<opts sel>')] → __kopts, x.click() on those lines → __koptGo, install after newPage).
# Prints «file: conv N · install N · left N»; every 'left' line and every odd read is then edited BY HAND (see dev/handover/reports/kk68.md).
import re,sys
INST="await require('./lib/kopts').install(%s);"
# scopes for document-level selectors
DOCSEL={
 "#mb .opts button":"__kopts()", "#mb .opts > button":"__kopts()", "#modal #mb .opts > button":"__kopts()", "#modal #mb .opts button":"__kopts()",
 "#modal .opts button":"__kopts()", "#modal .opts > button":"__kopts()", "#modal .opts button.opt":"__kopts()",
 "#modal:not([hidden]) .opts button":"__kopts(document.querySelector('#modal:not([hidden])'))",
 "#modal:not([hidden]) #mb .opts > *":"__kopts(document.querySelector('#modal:not([hidden])'))",
 "#modal:not([hidden]) #mb .opts button":"__kopts(document.querySelector('#modal:not([hidden])'))",
 ".opts button":"__kopts('any')", ".opts > button":"__kopts('any')",
}
ELSEL={".opts button":"__kopts(%s)", ".opts > button":"__kopts(%s)", ".opts button.opt":"__kopts(%s)", "#mb .opts button":"__kopts(%s)", "#mb .opts > button":"__kopts(%s)", ".opts > *":"__kopts(%s)"}
def conv(src):
  n=0;left=[]
  # element querySelector with :not filters -> first enabled choice
  def qs1(m):
    nonlocal n
    el,q,rest=m.group(1),m.group(2),m.group(4) or ''
    n+=1
    if ':not([disabled])' in rest:
      r=rest.replace(':not([disabled])','')
      return "(__koptsOn(%s%s)[0]||null)"%(el, (",'%s'"%r) if r else '')
    if rest: return "(__kopts(%s).filter(x=>x.matches('%s'))[0]||null)"%(el,rest)
    return "(__kopts(%s)[0]||null)"%el
  src=re.sub(r"\b(\w+)\.querySelector\((['\"])(\.opts button|#mb \.opts button|#mb \.opts > button)((?::not\(\[[^\]]+\]\))*)\2\)",qs1,src)
  def qsa(m):
    nonlocal n
    spread,el,q,sel,rest=m.group(1),m.group(2),m.group(3),m.group(4),m.group(5) or ''
    if el=='document':
      if sel not in DOCSEL: return m.group(0)
      e=DOCSEL[sel]
    else:
      if sel not in ELSEL: return m.group(0)
      e=ELSEL[sel]%el
    n+=1
    if ':not([disabled])' in rest:
      r=rest.replace(':not([disabled])','')
      e=e.replace('__kopts(','__koptsOn(',1)
      if r: e=e[:-1]+(",'%s')"%r) if not e.endswith('()') else e[:-1]+"undefined,'%s')"%r
    elif rest: e+=".filter(x=>x.matches('%s'))"%rest
    return e
  src=re.sub(r"(\[\.\.\.)?\b(\w+)\.querySelectorAll\((['\"])([^'\"]*?)((?::not\(\[[^\]]+\]\))*)\3\)(?(1)\])",qsa,src)
  return src,n
for f in sys.argv[1:]:
  s=open(f).read();o=s
  s,n=conv(s)
  if n:
    lines=s.split('\n')
    for i,l in enumerate(lines):
      if '__kopt' in l and '__koptGo' not in l:
        lines[i]=re.sub(r"(?<![\w.$\]\)])(\w+)\.click\(\)",lambda m:"__koptGo(%s)"%m.group(1),l)
    s='\n'.join(lines)
    k=0
    def ins(m):
      global k
      return m.group(0)+INST%m.group(2)
    s2,ni=re.subn(r"((?:const|let|var)?\s*\b([A-Za-z_$][\w$.]*)\s*=\s*await\s+[\w$.\[\]()]+\.newPage\([^)]*\)\s*;)",ins,s)
    s=s2
    if 'kopts' in f: pass
  left=[l for l in s.split('\n') if re.search(r"#mb \.opts|\.opts button",l)]
  open(f,'w').write(s)
  print(f"{f}: conv {n} · install {ni if n else 0} · left {len(left)}")
