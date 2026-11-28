#!/usr/bin/env python3
"""E-TIER-B13 robot proof (like road-onecore-same.js): compare two classify.js outputs (dev/handover/reports/tier-audit/ on the handover branch:
regdump.js <root> reg.json → classify.js reg.json <root> arc.tsv) of the LIVE build and of this build; prints per-file status counts before | after,
the number of option sets whose options changed (by file) and sets missing / extra. usage: python3 dev/measure/tier-b13-same.py before.tsv after.tsv"""
import sys,collections
def load(f):
  R={}
  for l in open(f).read().split('\n')[1:]:
    if not l:continue
    c=l.split('\t');R[c[0]+'|'+c[1]+'|'+c[2]+'|'+c[3]]=c
  return R
B=load(sys.argv[1]);A=load(sys.argv[2])
fam=lambda c:c[3].split(':')[0]
T=collections.defaultdict(collections.Counter)
for tag,D in (('B',B),('A',A)):
  for c in D.values():T[fam(c)][tag+'_'+c[5]]+=1
print('file  before(OK FLAT MERGE CAP)  after(OK FLAT MERGE CAP)')
tot=collections.Counter()
for f in sorted(T):
  t=T[f];tot.update(t)
  print(f, *[t[x] for x in ('B_OK','B_FLAT','B_MERGE','B_CAP')],'|',*[t[x] for x in ('A_OK','A_FLAT','A_MERGE','A_CAP')])
print('ALL',*[tot[x] for x in ('B_OK','B_FLAT','B_MERGE','B_CAP')],'|',*[tot[x] for x in ('A_OK','A_FLAT','A_MERGE','A_CAP')])
ch=[k for k in set(B)|set(A) if (B.get(k) or [0]*9)[8:]!=(A.get(k) or [0]*9)[8:]]
print('sets whose options changed',len(ch),collections.Counter(fam(B.get(k) or A.get(k)) for k in ch))
print('missing/extra',len(set(B)-set(A)),len(set(A)-set(B)))
