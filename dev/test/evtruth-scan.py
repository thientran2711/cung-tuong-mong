#!/usr/bin/env python3
"""LUẬT SỬA CẢ NHÓM scan (review/evidence-truth): every place that GIVES evidence.
Lists (1) evA(h,t,+n) calls, (2) direct writes to .ev / .evm (bypass the truth cap), and flags lines that announce
'chứng cứ +N' / 'nắm ... chứng cứ' without checking what evA returned (a clean target must never read as caught).
usage: python3 dev/test/evtruth-scan.py [--all]"""
import re,glob,sys,os
d=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
files=sorted(glob.glob(d+'/j*.js'))
EVA=re.compile(r'evA\(([^,()]+(?:\([^()]*\))?),([^,()]+(?:\([^()]*\))?),\s*([^)]*)\)')
DIRECT=re.compile(r'(\b[\w.\[\]()]+)\.ev\s*(\+\+|\+=|=(?!=))(?!\s*0\b)|evm\[[^\]]+\]\s*(\+\+|\+=)')
ANN=re.compile(r'[Cc]hứng cứ\s*\+|nắm (?:thêm )?\d+ chứng cứ|nắm thêm (?:một|1) chứng cứ|chứng cứ \S+ \+\d')
# sites where the target has JUST done the wrong (deed written before the evA by jtruth wrappers or in place), or a separate store / sync:
# reviewed one by one and marked IN THE CODE with a comment /*evok: <why>*/ on that line (reviewer r1: a marker survives edits above it,
# the old (file, line) allowlist broke whenever a line moved). A new evidence site needs either a checked evA return or its own marker.
OK=re.compile(r'/\*evok:[^*]*\*/')
rows=[];marks=0

for f in files:
  for i,l in enumerate(open(f,encoding='utf-8'),1):
    marks+=len(OK.findall(l))
    for m in EVA.finditer(l):
      n=m.group(3).strip()
      if n.startswith('-') or n in ('0',): continue
      ann=bool(ANN.search(l)); checked=bool(re.search(r'(?:const|let)\s+\w+\s*=\s*evA\(|if\(\s*evA\(|evA\([^)]*\)\s*[>?&|]|=evA\(|&&evA\(|\?evA\(|return evA\(',l)) or bool(OK.search(l))
      rows.append(('evA',os.path.basename(f),i,m.group(0)[:60],ann,checked))
    for m in DIRECT.finditer(l):
      rows.append(('direct',os.path.basename(f),i,m.group(0)[:60],bool(ANN.search(l)),bool(OK.search(l))))
bad=[r for r in rows if (r[0]=='direct' and not r[5]) or (r[4] and not r[5])]
print(f"evok markers: {marks}  ",end="");print(f"evA gains: {sum(r[0]=='evA' for r in rows)}  direct writes: {sum(r[0]=='direct' for r in rows)}  unchecked announcements/direct: {len(bad)}")
for r in (rows if '--all' in sys.argv else bad): print(f"{r[0]:6} {r[1]}:{r[2]}  {r[3]}  ann={int(r[4])} checked={int(r[5])}")
