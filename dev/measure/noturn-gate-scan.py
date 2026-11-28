#!/usr/bin/env python3
"""DAYQ-NOTURN law-11 scan: every showModal wrapper in dev/build/*.js that can RETURN WITHOUT PAINTING (a «swallow gate») while a card waits in Q,
plus every reader of a card's m.rk (the rank-marker / recipe-key clash). A swallow gate leaves the card hidden; jdayq's tap paint (nextBuoi
dqPaintQ) then makes «Sang buổi / Sang ngày mới» dead unless the gate's hold is BOUNDED (released by its own timer / net / on-screen rule).
usage: python3 dev/measure/noturn-gate-scan.py  (from the repo root) → prints a markdown table"""
import re,glob,os
D='dev/build/'
rows=[]
for f in sorted(glob.glob(D+'*.js')):
    if f.endswith('all.js'):continue
    s=open(f,encoding='utf-8').read()
    for m in re.finditer(r'(?<![\w.])(?:window\.)?showModal\s*=\s*function\s*\([^)]*\)\s*\{',s):
        body=s[m.end():m.end()+2500]
        k=re.search(r'\b(s0|s1|sm0|sm|m0|sm1|o0)\.(apply|call)\(',body)
        pre=body[:k.start()] if k else body[:400]
        if re.search(r'\breturn\b(?!\s+(?:s0|s1|sm0|sm|m0)\.)',pre):
            ln=s.count('\n',0,m.start())+1
            cond=re.sub(r'\s+',' ',pre)[:220].replace('|','¦')
            rows.append((os.path.basename(f),ln,cond))
print('| # | file:line | gate code before the inner call (early return = card kept hidden) |');print('|---|---|---|')
for i,(f,l,c) in enumerate(rows,1):print(f'| {i} | {f}:{l} | `{c}` |')
print()
print('m.rk readers on cards (rank marker rk:1 vs save recipe key "gen"):')
for f in sorted(glob.glob(D+'*.js')):
    if f.endswith('all.js'):continue
    for i,l in enumerate(open(f,encoding='utf-8'),1):
        for mm in re.finditer(r'\b(?:m|x\.e|e|c|card)\.(?:kit\.)?rk\b.{0,30}',l):
            if re.search(r'kmRank|rcp|rk:m\.rk|m\.rk=|e\.rk|jqData|RCP_VISIT|c\.rk=|\bc\.rk(?:===|!==)',l) or True:
                print(f'  {os.path.basename(f)}:{i}: {mm.group(0)[:60]}')
