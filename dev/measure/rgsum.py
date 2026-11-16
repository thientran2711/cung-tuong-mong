#!/usr/bin/env python3
"""Summarise dev/measure/reign.js output (JSON lines) per bot side. usage: python3 dev/measure/rgsum.py <file.jsonl>"""
import json,sys,collections
R=collections.defaultdict(list)
for l in open(sys.argv[1]):
    l=l.strip()
    if l.startswith('{'):d=json.loads(l);R[d['sideBot']].append(d)
keys=['rank','sung','th','hh','danh','bac','evOnMe','tr','beats','p']
print('| side | n | outcome | her result | dead | '+' | '.join(keys)+' | errs |')
print('|'+'---|'*(6+len(keys)))
for s,L in R.items():
    c=lambda k:dict(collections.Counter(x[k] for x in L))
    m=lambda k:round(sum((x[k] or 0) for x in L)/len(L),1)
    print(f"| {s} | {len(L)} | {c('out')} | {c('res')} | {sum(x['dead'] for x in L)} | "+' | '.join(str(m(k)) for k in keys)+f" | {sum(len(x['errs']) for x in L)} |")
