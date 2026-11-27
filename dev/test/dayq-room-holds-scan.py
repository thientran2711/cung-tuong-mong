#!/usr/bin/env python3
"""coop-dayq-noclock LAW 11 scan: every DAYQ-3 gate (c) HOLD in jdayq.js (a card / scene / person view kept off her screen while an
activity is open) must let go once the co-op ROOM waits on her seat (dqRoomOwes), i.e. it must be guarded by dqHoldC(), never by
dqUiC() alone (dqUiC = solo AND room). Painters (code that SHOWS a held card) may use dqUiC.
usage: python3 dev/test/dayq-room-holds-scan.py [dev/build/jdayq.js]  → table + exit 1 on any hold not released in a room"""
import re,sys
src=open(sys.argv[1] if len(sys.argv)>1 else 'dev/build/jdayq.js',encoding='utf-8').read()
# the hold points of gate (c): where the activity test (dqActBlocks / dqActEl / #ov open / DF.play) leads to holding
HOLDS=[('showModal: queued card behind an activity',r'showModal=function\(\)\{if\((\w+)\(\)&&Q\.length&&!DQ\.user[^;]*dqActBlocks\(\)'),
 ('dqPull: card painted in the same tap taken back',r'function dqPull\(\)\{try\{if\(!(\w+)\(\)'),
 ('dqArmModal tick: re-arm while the activity blocks',r'\|\|\((\w+)\(\)&&dqActBlocks\(\)\)\)\{DQ\.mt=setTimeout'),
 ('MutationObserver: activity gone → paint',r'\(!(\w+)\(\)\|\|!dqActEl\(\)\)'),
 ('kmFree: kit motion scene (flip, seal, reward…) behind #ov / DF.play',r'try\{if\((\w+)\(\)\)\{const ov=document\.getElementById\("ov"\);if\(\(ov&&!dqHidden\(ov\)\)\|\|\(window\.DF&&DF\.play\)\)\{DQ\.stat\.actKm')]
bad=0;print('| hold (gate c) | guard | released when the room waits on her |\n|---|---|---|')
for name,rx in HOLDS:
  m=re.search(rx,src)
  if not m: print(f'| {name} | NOT FOUND | ? |');bad+=1;continue
  g=m.group(1);okk=g=='dqHoldC';bad+=0 if okk else 1
  print(f'| {name} | {g}() | {"yes" if okk else "NO (held for ever / until the AFK bound)"} |')
print('dayq-room-holds-scan:',('FAIL %d'%bad) if bad else 'PASS');sys.exit(1 if bad else 0)
