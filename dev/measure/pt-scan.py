#!/usr/bin/env python3
"""pt-scan (review/phutang-road, E21; copy of bd-scan r2): law 6b + 6c family scan over Phù Tang's own roads (jrd_pt.js + jrd_pt2.js).
6b: every pfMove/pfKill of a PFP person (scan stops at a told return = a later cast moving him back to kinh); then every LATER line of the same road naming that person (or {mh} for kd) — flagged
    'UNGUARDED' unless the line (or its beat) reads the book (pfP / pfAlive / pfWhere / a place-aware PF helper) or a told return exists.
6c: every option whose name gives / buys / receives / sends / burns / hides a thing — flagged 'NO BOOK' unless its line sets pfO(...)
    or moves a PFP person (a person is in PFP, not in pfO). Goods used up at once (bạc, lương, áo bông, quà) are listed as 'used up'.
usage: python3 dev/measure/pt-scan.py [files…]   (r2: the static law-6 READ passes 6a / 6b-state / 6c-read are in dev/measure/pt-law6.js)"""
import re,sys
FILES=[a for a in sys.argv[1:] if not a.startswith('-')] or ['dev/build/jrd_pt.js','dev/build/jrd_pt2.js']
NAME={'kimthanh':['Kim Thành','đại sứ','Đại sứ'],'trongla':['Trọng Lữ'],'tieungoc':['Tiểu Ngọc'],'thanlao':['Thân Lão'],'namlao':['Nham Lão'],'huuthanh':['Kim Hựu Thành','thương chủ','thương nhân Tân La'],'ocuu':['Ô Cửu'],'tinhvien':['Tịnh Viên'],'trivien':['Trí Viễn'],'mh':[r'\{mh\}']}
GUARD=re.compile(r'pfP\(|pfAlive\(|pfWhere\(|PFNGOC\(|PFLOG\(|PFTVK\(|PFTNK\(|PFHT\(|PFOC\(|PFSAIL\(|RDQ\.pt|pt6b:|pfSail\(')
GIVE=re.compile(r'\{n:"((?:[^"]*?)(?:Gửi|Tặng|Trao|Nhường|Mua|Bỏ bạc mua|Bán|Đốt|Cho lấy|Nhận ngựa|Nhận cung|Nhận|Giữ|Đưa|Chôn|Chuộc|Cầm|Dâng|Trả|Để kho bán|Giấu|Khâu)[^"]*)"')
USED=re.compile(r'bạc|lương|áo bông|quà|gạo|nước|lễ vật|thuốc|thư|lời|người|tin|binh|quân|sứ|dũng sĩ|tay đua|tay cung')
def SL(b):
  m=re.match(r'\s*(?:B:\{)?([A-Za-z])',b or '');return m.group(1) if m else None
def chapters(src):
  cur=None;out=[]
  for i,l in enumerate(src.split('\n'),1):
    m=re.match(r'(?:ARC67\.(pt_\w+)=|rdDef\("(pt_\w+)",(\d+))',l)
    if m:cur=(m.group(1),4) if m.group(1) else (m.group(2),int(m.group(3)))
    if l.startswith('PF97.push({a:"'):cur=(re.search(r'a:"(pt_\w+)"',l).group(1),4)
    if l.startswith('RD97L.push(rdRare({a:"'):r=re.search(r'a:"(pt_\w+)_(\d+)"',l);cur=(r.group(1),int(r.group(2)))
    out.append((i,cur,l))
  return out
moves=[];gives=[]
for f in FILES:
  rows=chapters(open(f,encoding='utf-8').read())
  for i,c,l in rows:
    if not c:continue
    for m in re.finditer(r'pf(Move|Kill)\("(\w+)"(?:,"(\w+)")?\)',l):
      if l.startswith(('const pf','const PF')):continue
      moves.append((f,i,c,m.group(1),m.group(2),m.group(3) or 'dead'))
    for m in GIVE.finditer(l):
      seg=l[m.start():];seg=seg[:seg.find('}',seg.find('rt:'))+1] if 'rt:' in seg else seg
      own=re.search(r'pfO\("\w+"|pfMove\(|pfKill\(|pt6c:',l[m.start():m.start()+900].split('\n  {n:')[0])
      gives.append((f,i,c,m.group(1),'pfO' if own else ('used up' if USED.search(m.group(1)) else 'NO BOOK')))
  # 6b later mentions
  beat={};chap={};bh=ch=''
  for i,c,l in rows:
    if re.match(r'\s*(?:B:\{)?\w+:\{h:|\s*E:\{',l):bh=l
    if re.match(r'(?:ARC67\.pt_\w+=|rdDef\("pt_)',l):ch=l;bh=''
    beat[i]=bh;chap[i]=ch
  for (mf,mi,mc,kind,pid,to) in [x for x in moves if x[0]==f]:
    hits=[]
    if to=='kinh':print(f'6b {mf.split("/")[-1]}:{mi} {mc[0]}.{mc[1]} {kind} {pid}→kinh (arrives where the text has him; not an away move)');continue
    for i,c,l in rows:
      if not c or c[0]!=mc[0] or c[1]<mc[1] or (c[1]==mc[1] and i<=mi):continue
      if c==mc and SL(beat[i])==SL(beat[mi]):continue  # same slot = the other options of the choice
      if c!=mc and re.search(r'pfMove\("'+pid+r'","kinh"\)',l) and ('cast(' in l or l.lstrip().startswith('if(')):break  # a TOLD return in a later chapter's cast: from here on he is back where the text has him
      for nm in NAME[pid]:
        if (re.search(nm,l) if pid=='mh' else nm in l) and not l.lstrip().startswith(('/*','path:','bad:')):
          g=GUARD.search(l) or GUARD.search(beat[i]) or GUARD.search(chap[i])
          hits.append((i,c[1],'guarded' if g else 'UNGUARDED',re.sub(r'\s+',' ',l.strip())[:90]));break
    print(f'6b {mf.split("/")[-1]}:{mi} {mc[0]}.{mc[1]} {kind} {pid}→{to}: later lines {len(hits)}, unguarded {sum(h[2]=="UNGUARDED" for h in hits)}')
    for h in hits:
      if h[2]=='UNGUARDED':print(f'    {h[2]} :{h[0]} (.{h[1]}) {h[3]}')
print()
nb=[g for g in gives if g[4]=='NO BOOK']
print(f'6c give/buy/receive options: {len(gives)} · in pfO/PFP {sum(g[4]=="pfO" for g in gives)} · used up {sum(g[4]=="used up" for g in gives)} · NO BOOK {len(nb)}')
for g in gives:
  if g[4]!='used up' or '-v' in sys.argv:print(f'  {g[4]:8} {g[0].split("/")[-1]}:{g[1]} {g[2][0]}.{g[2][1]} «{g[3]}»')
