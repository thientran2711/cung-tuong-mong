#!/usr/bin/env python3
"""review/pace-all: summary of dev/measure/pace-all.js lives.
usage: python3 dev/measure/pace-all-sum.py <lives.jsonl> [more.jsonl ...]
Per bar (and per bậc for courses): rises counted per ACT (all rises one act gave to that bar summed; tick:* = day/month ticks, not acts),
median share of the step one act moves, acts per step (= step / median act gain), flag (< 1/15 slow, > 1/3 fast).
Then the weekly oán toward her: max / mean / count in «Oán sâu»+ by season, and the share of seasons where a feud dropped a band."""
import json,sys,statistics as st
from collections import defaultdict
lives=[json.loads(l) for f in sys.argv[1:] for l in open(f) if l.strip().startswith('{')]
acts=defaultdict(lambda:defaultdict(float));steps={};ticks=defaultdict(float);tickn=defaultdict(int)
for L in lives:
  for bar,l,step,g,act,n in L['ev']:
    base=bar.split(':')[0]
    key=(base if base not in('art','vir') else base,l if base in('art','vir','oan','ro') else 0)
    if act.startswith('tick:'):ticks[key]+=g;tickn[key]+=1;continue
    acts[key][(L['seed'],n,bar)]+=g;steps[key]=step
print(f"lives {len(lives)} · ends {[L['end'] for L in lives]} · months {[L['turn'] for L in lives]} · errs {sum(len(L['errs']) for L in lives)}")
print("| bar | bậc/band | step | acts seen | median act gain | p25–p75 | share of step | acts per step | flag |")
print("|---|---|---|---|---|---|---|---|---|")
for key in sorted(acts):
  G=sorted(acts[key].values());s=steps[key];m=st.median(G);q1=G[len(G)//4];q3=G[(3*len(G))//4]
  sh=m/s if s else 0;fl='SLOW' if sh<1/15 else 'FAST' if sh>1/3 else 'ok'
  print(f"| {key[0]} | {key[1]} | {s:g} | {len(G)} | {m:g} | {q1:g}–{q3:g} | 1/{(1/sh) if sh else 0:.1f} | {(s/m) if m else 0:.1f} | {fl} |")
print("\nticks (not acts): "+", ".join(f"{k[0]}{k[1]}:{v:g}/{tickn[k]}" for k,v in sorted(ticks.items())))
# oán toward her, by season (9 tuần)
print("\n| season | rank (median) | oán max (median of lives) | oán mean | in Oán sâu+ (mean count) | in Oán hận | ghen max | ghen mean | her own oán max | Nguy hiểm chung |")
print("|---|---|---|---|---|---|---|---|---|---|")
S=defaultdict(list)
for L in lives:
  for r in L['ow']:S[r['w']//9].append(r)
for s in sorted(S):
  R=S[s];md=lambda k:st.median([r[k] for r in R])
  print(f"| {s+1} | {md('rank'):g} | {md('mx'):g} | {md('mean'):g} | {st.mean([r['deep'] for r in R]):.1f} | {st.mean([r['hate'] for r in R]):.1f} | {md('gmx'):g} | {md('gmean'):g} | {md('my'):g} | {(st.median([r['dg'] for r in R if r.get('dg') is not None]) if any(r.get('dg') is not None for r in R) else '–')} |")
