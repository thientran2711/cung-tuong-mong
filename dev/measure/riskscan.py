#!/usr/bin/env python3
"""balance-2 (D8) family scan: act cards / options whose effect code can PUNISH her (punish, demote, die, cold, confined, deathSentence, seatDown)
but whose card text (x / t / l / fx) does not name that risk. usage: python3 dev/measure/riskscan.py [--typed]  (run from the repo root)
--typed also lists chance numbers typed into card text (chanceW(<number>) / roll(<number>) next to a card), the ONE CORE family.
Static scan: an object literal that has n:"…" and go:… on one source line (the game's act-card style)."""
import re,glob,sys,os
D='dev/build/';files=[f for f in sorted(glob.glob(D+'j*.js')) if not os.path.basename(f).startswith('all')]
PUN=re.compile(r'\b(punish|demote|deathSentence|die|cold|fall)\(|confined\s*=|seatDown\(')
SAY=re.compile(r'phạt|cấm túc|giáng|chết|lãnh cung|xử tội|tội|mất mạng|đánh|Tân Giả|trục xuất|đuổi|bị lộ|nghi',re.I)
TYP=re.compile(r'chanceW\((\d+)\)')
rows=[];typed=[]
for f in files:
  for ln,line in enumerate(open(f,encoding='utf-8'),1):
    for m in re.finditer(r'\{n:(?:"([^"]{1,60})"|`([^`]{1,60})`)',line):
      seg=line[m.start():m.start()+1600];nm=m.group(1) or m.group(2)
      g=seg.find('go:');
      if g<0:continue
      nxt=re.search(r'\{n:["`]',seg[1:]);end=nxt.start()+1 if nxt else len(seg)
      body=seg[g:end];head=seg[:g]
      if PUN.search(body) and not SAY.search(head):rows.append((f[len(D):],ln,nm,PUN.search(body).group(0)))
      for t in TYP.finditer(seg[:end]):typed.append((f[len(D):],ln,nm,t.group(1)))
print('HIDDEN-RISK cards: %d'%len(rows))
for r in rows:print(' %s:%d  %s  (%s)'%r)
if '--typed' in sys.argv:
  print('TYPED chance numbers on cards: %d'%len(typed))
  for r in typed:print(' %s:%d  %s  chanceW(%s)'%r)
