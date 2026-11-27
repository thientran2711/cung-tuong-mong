#!/usr/bin/env python3
"""cnv-exit-promo group scan (law 11). Lists, in dev/build/j*.js (not all.js):
 A) every stay / keep request («ở lại», «giữ lại») offered beside a life-exit road (kết thúc kiếp này / xuất cung / ban gả, ±4 lines);
 B) every option x text that puts a stat THRESHOLD («<stat> dưới N», «từ N», «trên N») inside the effect line —
    the kit hint (jk2b kitHintPhrase) reads «Chủ tin dưới 60» as a Chủ tin GAIN («chủ thêm tin dùng»);
 C) every typed age 30/45 in a cnv option text (law 4: must print BAL.srvAge).
usage: python3 dev/measure/stay-opt-scan.py [build dir]   exit 1 when B or C has a hit."""
import re,sys,glob,os
D=sys.argv[1] if len(sys.argv)>1 else os.path.join(os.path.dirname(__file__),'..','build')
OPT=re.compile(r'\{n:\s*(`[^`]*`|"[^"]*")(?:[^{}]|\{[^{}]*\})*?x:\s*(`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*")')
STAY=re.compile(r'ở lại|giữ lại',re.I)
STAT=r'(?:Chủ tin|Sủng|Danh|Đức|Sắc|Tài|Tâm cơ|Bạc|Sức|Phúc|Hoàng thượng để ý|Công lao)'
THR=re.compile(STAT+r'\s*(?:dưới|từ|trên|đủ|chưa đủ)\s*(?:\$\{[^}]*\}|\d+)')
AGE=re.compile(r'(?:đến|tới)\s*(?:30|45|ba mươi)\s*tuổi')
A=[];B=[];C=[]
for f in sorted(glob.glob(os.path.join(D,'j*.js'))):
  if f.endswith('all.js'):continue
  LL=open(f,encoding='utf-8').read().split('\n')
  for i,l in enumerate(LL,1):
    near=' '.join(LL[max(0,i-5):i+4])
    for m in OPT.finditer(l):
      n,x=m.group(1)[1:-1],m.group(2)[1:-1];loc=f"{os.path.basename(f)}:{i}"
      if STAY.search(n) and re.search(r'kết thúc kiếp này|xuất cung|xuất giá|ban gả|ban hôn|cnvAge|srvAge',near):A.append((loc,n,x))
      if THR.search(x):B.append((loc,n,x))
      if AGE.search(x):C.append((loc,n,x))
def T(h,L):
  print(f"\n## {h} ({len(L)})\n| file:line | option | x |\n|---|---|---|")
  for r in L:print('| '+' | '.join(s.replace('|','/')[:150] for s in r)+' |')
T('A stay / keep options',A);T('B threshold inside the effect line (kit hint reads it as a gain)',B);T('C typed release age',C)
sys.exit(1 if B or C else 0)
