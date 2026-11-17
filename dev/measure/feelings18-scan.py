#!/usr/bin/env python3
"""FEELINGS-18 whole-family scan (LUẬT SỬA CẢ NHÓM): every place in dev/build/j*.js that names a FEELING key, an emotion table or the seal.
Old keys of the 9+2 set (dau, muu, khoc, ghen-as-feeling) must be either converted at the one entry point (jfeel emoSet / feelMig) or read
through a group map; the scan prints file:line:kind so the before/after table can be made. usage: python3 dev/measure/feelings18-scan.py [dir]"""
import re,sys,os,glob
d=sys.argv[1] if len(sys.argv)>1 else os.path.join(os.path.dirname(__file__),'..','build')
OLD=['dau','muu','khoc','ghen']
pat=[('key-compare',re.compile(r'\.k\s*===?\s*"(%s)"'%'|'.join(OLD))),
     ('key-list',re.compile(r'\[[^\]]*"(%s)"[^\]]*\]\.includes\([^)]*\.k\)'%'|'.join(OLD))),
     ('emoSet-old',re.compile(r'emoSet\([^,]+,\s*"(%s)"'%'|'.join(OLD))),
     ('table-old',re.compile(r'[{,]\s*(%s)\s*:'%'|'.join(OLD))),
     ('ev-old',re.compile(r'\[\s*"(%s)"\s*,\s*[\d.]+\s*\]'%'|'.join(OLD))),
     ('emo-table',re.compile(r'\b(EMO_W|EMO_OD|EMO_LOY|EMO_NIGHT|EMO_DECAY|EMO_EV|EMO_TR)\b')),
     ('seal-art',re.compile(r'img/kit/emo-'))]
rows=[]
for f in sorted(glob.glob(os.path.join(d,'j*.js'))):
  b=os.path.basename(f)
  for i,l in enumerate(open(f,encoding='utf-8'),1):
    for kind,r in pat:
      m=r.search(l)
      if m:
        if kind=='table-old' and not re.search(r'EMO|emo|mood|BAL\.(mood|emo)',l):continue
        rows.append((b,i,kind,m.group(0)[:60]))
by={}
for r in rows:by.setdefault(r[0],[]).append(r)
for b in sorted(by):
  print(f'{b}: {len(by[b])}  '+' | '.join(f'{x[1]}:{x[2]}:{x[3]}' for x in by[b][:12]))
print('TOTAL',len(rows),'sites in',len(by),'files')
