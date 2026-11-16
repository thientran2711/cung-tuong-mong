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
# sites where the target has JUST done the wrong (deed written before the evA by jtruth wrappers or in place) — reviewed one by one
TRUE={('j10.js',33):'her schemes counter rose this week',('j10.js',34):'same (d>0)',('j14.js',41):'the spy servant was bought (bribeServ deed)',
 ('j22.js',22):'flirt deed written just before',('j22.js',45):'affair (deedSync)',('j22.js',60):'pregMismatch (deedSync)',('j25.js',59):'kid-harm act (runAct deed, outer wrapper)',
 ('j40.js',30):'after a BIG act (runAct deed)',('j42.js',111):'servant-mode intel; capped, preview only',('j42.js',117):'mistress schemed (sec>0)',('j42.js',165):'capped; preview only',
 ('j42.js',242):'ordered scheme (schemes++)',('j42.js',262):'mistress schemed (sec>0)',('j42.js',266):'bribe deed written just before',('j42.js',400):'affair',
 ('j7.js',40):'capped; preview says "nếu có"',('j70.js',200):'plot deed (newPlot70)',('j70.js',201):'plot deed',('j70.js',227):'plot deed',('j70.js',236):'plot deed',('j70.js',239):'plot deed',
 ('j8.js',101):'schemes>0',('j8.js',212):'tainted gift (taint = scheme)',('j8.js',216):'plant act (runAct deed)',('j8.js',230):'tainted by (scheme)',('j8.js',465):'tainted by (scheme)',
 ('j83.js',218):'illBuy deed',('j92.js',297):'giahoa act (runAct deed)',('jecon.js',150):'schemes>0',('jpet.js',152):'schemes>0',('jpet.js',179):'mangift deed',('jpet.js',203):'pet harm act (runAct deed)',
 ('jpoison.js',82):'poisoned gift act',('jtsb.js',54):'thathu act',('jtsb.js',71):'phonghoa act',('jtsb.js',122):'plot deed at plan time',('jtsb.js',235):'servant bribe deed',
 ('j24.js',36):'not evidence (modal flag)',('j8.js',34):'evA itself',('jtruth.js',46):'sweep',('j96.js',49):'affair-case store (j96), not consort evidence',('jcoopworld.js',102):'co-op sync',('jstip.js',138):'checked (n)'}
rows=[];
for f in files:
  for i,l in enumerate(open(f,encoding='utf-8'),1):
    for m in EVA.finditer(l):
      n=m.group(3).strip()
      if n.startswith('-') or n in ('0',): continue
      ann=bool(ANN.search(l)); checked=bool(re.search(r'(?:const|let)\s+\w+\s*=\s*evA\(|if\(\s*evA\(|evA\([^)]*\)\s*[>?&|]|=evA\(|&&evA\(|\?evA\(|return evA\(',l)) or (os.path.basename(f),i) in TRUE
      rows.append(('evA',os.path.basename(f),i,m.group(0)[:60],ann,checked))
    for m in DIRECT.finditer(l):
      rows.append(('direct',os.path.basename(f),i,m.group(0)[:60],bool(ANN.search(l)),(os.path.basename(f),i) in TRUE))
bad=[r for r in rows if (r[0]=='direct' and not r[5]) or (r[4] and not r[5])]
print(f"evA gains: {sum(r[0]=='evA' for r in rows)}  direct writes: {sum(r[0]=='direct' for r in rows)}  unchecked announcements/direct: {len(bad)}")
for r in (rows if '--all' in sys.argv else bad): print(f"{r[0]:6} {r[1]}:{r[2]}  {r[3]}  ann={int(r[4])} checked={int(r[5])}")
