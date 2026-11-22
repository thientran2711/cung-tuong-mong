#!/usr/bin/env python3
"""coop-thin-g-f1 #5 (LAW 11, render-diff family): every paint-entry wrapper (render / renderStage / k3Stage) that calls a function which
writes the player's numbers (apply({..}) / apply(fx) / S.<core> =). On the thin guest's phone (level >= 11) such a writer must be in
jcoopthinf RDIFF (run on the host as her context closes, read-only on her phone) or guard itself for the guest; else her phone changes
her person alone (TRIP swap 1: jty tyCharge("home") → Danh host +1 | phone). Exit 1 on a candidate not in the reviewed table.
usage: python3 dev/test/coop-rdiff-scan.py"""
import re,glob,sys
B='dev/build/'
src={f:open(f,encoding='utf8').read() for f in glob.glob(B+'j*.js') if not f.endswith('all.js')}
W=re.compile(r'\bapply\(\{|\bapply\(fx\)|\bS\.(danh|bac|sung|suc|duc|th|tai|sac|tamco|rank)\s*[-+]?=[^=]')
WR=set()
for t in src.values():
  for m in re.finditer(r'\nfunction (\w+)\(',t):
    j=t.find('\nfunction ',m.end());body=t[m.end():(j if j>0 else len(t))][:3000]
    if W.search(body):WR.add(m.group(1))
WR-={'apply','ap','spend'}
# one level more: a function that calls a writer (tyHome → tyCharge)
W1=set(WR)
for t in src.values():
  for m in re.finditer(r'\nfunction (\w+)\(',t):
    j=t.find('\nfunction ',m.end());body=t[m.end():(j if j>0 else len(t))][:1500]
    if set(re.findall(r'\b([a-zA-Z]\w{2,})\(',body))&W1:WR.add(m.group(1))
WR-={'apply','ap','spend','render','renderStage','log','showModal'}
rd=re.search(r'const RDIFF=\[([^\]]*)\]',src[B+'jcoopthinf.js']).group(1);RDIFF=set(re.findall(r'"(\w+)"',rd))
# reviewed: name → why it is not a guest-side write of her numbers
OK={'tyHome':'RDIFF','resApply':'jcoopworld resApply: guest at level >= 5 returns (oldRan)','rcvNote':'notice text only',
    'actPendRun':'her pending walk → goTo (part F2 intent on the host)','themeTick':'DOM only','amAlias':'property alias only',
    'festToday':'read only','restore':'co-op layer (jcoopworld)','goTo':'part F2 intent on the host','rcvHelpOpts':'options text only',
    'nextBuoi':'guest at level >= 5: jcoopthine nextBuoi = her ready (the host steps her)','facOf':'next line, not in the wrapper','roll':'next line, not in the wrapper',
    'kfFestFx':'DOM effect only','k61Gate':'next line, not in the wrapper','j76Std':'deck cards only (ctxOut runs it on the host too)',
    'eaSync':'deck cards only (ctxOut runs it on the host too)','abortGone':'co-op layer (jcoopthinf6b)','tick':'jcooptimer / jstagehere notices only',
    'kcHud':'DOM only','kccoCards':'deck cards only','kccoPalHTML':'HTML only','helpAsk':'next line, not in the wrapper'}
ENT=re.compile(r'(?:render|renderStage|k3Stage)\s*=\s*function')
rows=[];bad=0
for f in sorted(src):
  L=src[f].split('\n')
  for i,l in enumerate(L):
    for m in ENT.finditer(l):
      body=' '.join(L[i:i+4])[m.start():m.start()+1500]
      for c in sorted(set(re.findall(r'\b([a-zA-Z]\w{2,})\(',body))&WR):
        why=('RDIFF' if c in RDIFF else OK.get(c));rows.append((f"{f[len(B):]}:{i+1}",c,why or 'OPEN'));bad+=not why
print('| wrapper | calls writer | verdict |\n|---|---|---|');[print(f'| {a} | {b} | {c} |') for a,b,c in rows]
print(f'writers {len(WR)} · candidates {len(rows)} · OPEN {bad}');sys.exit(1 if bad else 0)
