#!/usr/bin/env python3
"""split-phrase-scan.py (KIT-STAGE-R12, MAIN 174 LOOK B nit, law 11 whole family).
The kit result list (effList, j19) splits a «thành: / hỏng: / kèm: / được:» text on top-level ", " into separate result lines.
So ONE phrase must never carry its own top-level comma («xem lối đã học, lối chưa học và cách học» became two lines that read as a run-on).
Use «·» between two real results, «và / hay» inside one phrase, or put a list inside ( ) (kSplitTop keeps commas inside brackets).
Report: candidates whose last fragment is a «và / hay / hoặc» tail (the typical split phrase). FAIL: any of the fixed R12 phrases comes back.
usage: python3 dev/test/split-phrase-scan.py   exit 1 on FAIL"""
import re,glob,sys
BAD=['xem lối đã học, lối chưa học','người ấy thích, chê hay kiêng','một người thích, chê hay kiêng','rõ Sức, bệnh và','nếu đồ bị tẩm sẽ biết, ai gửi','tha, trả về Nội vụ phủ, hoặc làm ngơ','thành: Văn, Đức, Võ','biết tên, mặt, Sắc, Tài','kèm: vương gia, đại thần','ra một món ${W}`']
pat=re.compile(r'(?:thành|được|hỏng|bại|kèm): ([^`"\'·]*?, [^`"\'·]*)')
fail=0;cand=0
for f in sorted(glob.glob('dev/build/j*.js')):
  if f.endswith('all.js'):continue
  for i,l in enumerate(open(f,encoding='utf-8'),1):
    for b in BAD:
      if b in l:print(f'FAIL {f}:{i}: split phrase back: {b}');fail+=1
    for m in pat.finditer(l):
      seg=re.split(r':\s*\$\{chanceW',m.group(1))[0];top=re.sub(r'\([^()]*\)','',seg);fr=[x.strip() for x in top.split(', ')]
      if len(fr)>=2 and re.search(r'\b(và|hay|hoặc)\b',fr[-1]) and not re.search(r'\$\{|\d',fr[-1]):cand+=1;print(f'look {f}:{i}: {m.group(0)[:120]}')
print(f'{"FAIL" if fail else "PASS"} split-phrase-scan: {fail} fixed phrase(s) back; {cand} «và/hay» tails listed for a look (each fragment must stand alone)')
sys.exit(1 if fail else 0)
