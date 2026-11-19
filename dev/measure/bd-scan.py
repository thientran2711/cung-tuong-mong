#!/usr/bin/env python3
"""bd-scan (review/bd-roads r2, E14c): law 6b + 6c family scan over Bắc Địch's own roads (jrd_bd.js + jrd_bd2.js).
6b: every bdMove/bdKill of a BDP person; then every LATER line of the same road naming that person (or {mh} for kd) — flagged
    'UNGUARDED' unless the line (or its beat) reads the book (bdP / bdAlive / BDKD / bdWhere / a place-aware helper) or a told return exists.
6c: every option whose name gives / buys / receives / sends / burns / hides a thing — flagged 'NO BOOK' unless its line sets bdO(...)
    or moves a BDP person/animal (a person is in BDP, not in bdO). Goods used up at once (bạc, lương, áo bông, quà) are listed as 'used up'.
usage: python3 dev/measure/bd-scan.py [files…]"""
import re,sys
FILES=sys.argv[1:] or ['dev/build/jrd_bd.js','dev/build/jrd_bd2.js']
NAME={'lie':['Hô Diên Liệt'],'olac':['Ô Lặc'],'thatmoc':['Thát Mộc'],'bado':['Ba Đồ'],'tuyetcau':['Tuyết Câu'],'asnc':['A Sử Na Cát'],'phong':['Thác Bạt Phong','Phong'],'kd':[r'\{mh\}|(?<!là )Khả đôn(?! của kim trướng)']}
GUARD=re.compile(r'bdP\(|bdAlive\(|BDKD\(|bdWhere\(|badove|BDGATE\(|bdO\("nguatay"|RDQ\.bd|bd6b:|bdPh\(|RD_FL\("bd_\w+\.(?:badove|chua)')
GIVE=re.compile(r'\{n:"((?:[^"]*?)(?:Gửi|Tặng|Trao|Nhường|Mua|Bỏ bạc mua|Bán|Đốt|Cho lấy|Nhận ngựa|Nhận cung|Nhận|Giữ|Đưa|Chôn|Chuộc|Cầm|Dâng|Trả|Để kho bán|Giấu|Khâu)[^"]*)"')
USED=re.compile(r'bạc|lương|áo bông|quà|thuốc|thư|lời|người|tin|binh|quân|sứ|dũng sĩ|tay đua|tay cung')
def SL(b):
  m=re.match(r'\s*(?:B:\{)?([A-Za-z])',b or '');return m.group(1) if m else None
def chapters(src):
  cur=None;out=[]
  for i,l in enumerate(src.split('\n'),1):
    m=re.match(r'(?:ARC67\.(bd_\w+)=|rdDef\("(bd_\w+)",(\d+))',l)
    if m:cur=(m.group(1),4) if m.group(1) else (m.group(2),int(m.group(3)))
    if l.startswith('BD97.push({a:"'):cur=(re.search(r'a:"(bd_\w+)"',l).group(1),4)
    if l.startswith('RD97L.push(rdRare({a:"'):r=re.search(r'a:"(bd_\w+)_(\d+)"',l);cur=(r.group(1),int(r.group(2)))
    out.append((i,cur,l))
  return out
moves=[];gives=[]
for f in FILES:
  rows=chapters(open(f,encoding='utf-8').read())
  for i,c,l in rows:
    if not c or c[0] in ('bd_hoa','bd_ngua','bd_tuc','bd_hoang'):continue
    for m in re.finditer(r'bd(Move|Kill)\("(\w+)"(?:,"(\w+)")?\)',l):
      if 'const bd' in l:continue
      moves.append((f,i,c,m.group(1),m.group(2),m.group(3) or 'dead'))
    for m in GIVE.finditer(l):
      seg=l[m.start():];seg=seg[:seg.find('}',seg.find('rt:'))+1] if 'rt:' in seg else seg
      own=re.search(r'bdO\("\w+"|bdMove\(|bdKill\(|bd6c:',l[m.start():m.start()+900].split('\n  {n:')[0])
      gives.append((f,i,c,m.group(1),'bdO' if own else ('used up' if USED.search(m.group(1)) else 'NO BOOK')))
  # 6b later mentions
  beat={};chap={};bh=ch=''
  for i,c,l in rows:
    if re.match(r'\s*(?:B:\{)?\w+:\{h:|\s*E:\{',l):bh=l
    if re.match(r'(?:ARC67\.bd_\w+=|rdDef\("bd_)',l):ch=l;bh=''
    beat[i]=bh;chap[i]=ch
  for (mf,mi,mc,kind,pid,to) in [x for x in moves if x[0]==f]:
    hits=[]
    if to=='kinh':print(f'6b {mf.split("/")[-1]}:{mi} {mc[0]}.{mc[1]} {kind} {pid}→kinh (arrives where the text has him; not an away move)');continue
    for i,c,l in rows:
      if not c or c[0]!=mc[0] or c[1]<mc[1] or (c[1]==mc[1] and i<=mi):continue
      if c==mc and SL(beat[i])==SL(beat[mi]):continue  # same slot = the other options of the choice
      for nm in NAME[pid]:
        if (re.search(nm,l) if pid=='kd' else nm in l) and not l.lstrip().startswith(('/*','path:','bad:')):
          g=GUARD.search(l) or GUARD.search(beat[i]) or GUARD.search(chap[i])
          hits.append((i,c[1],'guarded' if g else 'UNGUARDED',re.sub(r'\s+',' ',l.strip())[:90]));break
    print(f'6b {mf.split("/")[-1]}:{mi} {mc[0]}.{mc[1]} {kind} {pid}→{to}: later lines {len(hits)}, unguarded {sum(h[2]=="UNGUARDED" for h in hits)}')
    for h in hits:
      if h[2]=='UNGUARDED':print(f'    {h[2]} :{h[0]} (.{h[1]}) {h[3]}')
print()
nb=[g for g in gives if g[4]=='NO BOOK']
print(f'6c give/buy/receive options: {len(gives)} · in bdO/BDP {sum(g[4]=="bdO" for g in gives)} · used up {sum(g[4]=="used up" for g in gives)} · NO BOOK {len(nb)}')
for g in gives:
  if g[4]!='used up' or '-v' in sys.argv:print(f'  {g[4]:8} {g[0].split("/")[-1]}:{g[1]} {g[2][0]}.{g[2][1]} «{g[3]}»')
