#!/usr/bin/env python3
"""coop-rebirth-stuck (LAW 11 family scan): every way #next («Sang buổi» / «Sang ngày mới» / «Sẵn sàng») can be left dead with nothing on screen.
Family A — SILENT Q REMOVERS: a card leaves Q (splice / filter / length=0) in a statement that neither renders nor calls lockNext/showModal:
  j6 render() disabled #next while that card waited, nothing re-checks it → dead. Covered by jdayq dqNextHeal (every BAL.dayq.wake ms).
Family B — GHOST ACTIVITIES: a selector jdayq counts as «she is inside an activity» without checking the element is on screen:
  a hidden / zero-size host holds a queued card for ever. Covered by jdayq dqOn() (only shown elements count).
usage: python3 dev/test/scan-next-dead.py   (prints both tables; exit 0)"""
import re,glob,os
B=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
heal=open(os.path.join(B,'jdayq.js'),encoding='utf-8').read()
hasHeal='function dqNextHeal' in heal; hasOn='function dqOn' in heal
RM=re.compile(r'(\bQ\.splice\(|\bQ=Q\.filter\(|\bQ\.length=0|\bQ\.shift\(\))')
FIX=re.compile(r'render\(|lockNext\(|showModal\(|closeModal\(')
rows=[]
for f in sorted(glob.glob(os.path.join(B,'j*.js'))):
    for n,l in enumerate(open(f,encoding='utf-8'),1):
        for m in RM.finditer(l):
            seg=l[m.start():m.start()+260]
            st=seg.split(';')[0:3]
            if not FIX.search(';'.join(st)):rows.append((os.path.basename(f),n,m.group(1),l[m.start():m.start()+70].strip()))
print('Family A — silent Q removers (no render/lockNext/showModal in the next statements):',len(rows))
print('| file:line | remover | before (LIVE) | after (fix) |')
print('|---|---|---|---|')
for f,n,k,t in rows:print(f'| {f}:{n} | `{k}` | #next may stay disabled | {"dqNextHeal re-checks within BAL.dayq.wake" if hasHeal else "NOT COVERED"} |')
sel=[];L=heal.splitlines();cur=None
for n,l in enumerate(L,1):
    if l.startswith('function '):cur=re.match(r'function (\w+)',l).group(1)
    if cur in('dqActEl','dqOldPending'):
        for m in re.finditer(r'(document\.querySelector\(|document\.getElementById\("kpodov"\)|dqOn\(|ov&&!dqHidden\(ov\)(&&dqShown\(ov\))?)',l):sel.append((n,cur,m.group(1)+('…dqShown' if 'dqShown' in l[m.end():m.end()+50] else '')))
print()
print('Family B — activity hosts in dqActEl / dqOldPending:',len(sel))
print('| jdayq fn:line | lookup | counts a hidden host? |')
print('|---|---|---|')
for n,c,k in sel:print(f'| {c} :{n} | `{k}` | {"no (shown only)" if (k=="dqOn(" or "dqShown" in k) else "YES"} |')
