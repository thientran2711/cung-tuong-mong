#!/usr/bin/env python3
"""review/reign-end — summary of dev/measure/reignend.js lives (one JSON line per life, pacespeed.js format + «re»).
usage: python3 dev/measure/reignend-sum.py LABEL=file.jsonl [LABEL=file.jsonl ...] [--cal MIN_PER_YEAR]
Reign end per life: abd / phe / coup (S.re.end) · natural / accident / plot (S.mort.empWhy: the Emperor died) · her (her own life ended first;
the reign is still running = censored) · cap (robot time cap, reign still running). Reign years = game years from his accession to the end
(censored lives count their years so far). Real hours: one bot action = one player tap; the FIRST arm is calibrated to MIN_PER_YEAR real
minutes per game year (default 30, as pacespeed-sum.py) and every arm uses the same seconds per tap; the bot-artefact taps «mặc trung y» removed."""
import json,sys,statistics as st
args=[a for a in sys.argv[1:] if '=' in a and not a.startswith('--')]
cal=float(sys.argv[sys.argv.index('--cal')+1]) if '--cal' in sys.argv else 30.0
A={}
for a in args:
  k,f=a.split('=',1);A[k]=[json.loads(l) for l in open(f) if l.strip().startswith('{')]
def ty(l):
  src=l['ps'].get('src') or {}
  return sum(v for k,v in src.items() if 'mặc trung y' in k)
def eff(l):return l['ps']['acts']-ty(l)
def apm(L):return sum(eff(l) for l in L)/max(1,sum(max(1,l['ps']['tNow']) for l in L))
ref=list(A)[0];spa=cal/12*60/apm(A[ref])
def cause(l):
  R=l['ps'].get('re') or {};e=R.get('end')
  if e and e.get('k'):return e['k']
  w=R.get('why')
  if w:return 'plot' if any(x in w for x in ['Thích khách','độc']) else 'accident' if any(x in w for x in ['ngã','trúng phong','chè']) else 'natural'
  return 'her' if l['end']=='ended' else 'cap'
def ry(l):
  R=l['ps'].get('re') or {};e=R.get('end')
  return e['y'] if e and e.get('y') is not None else R.get('ry',0)
def pct(v,q):
  v=sorted(v);return v[min(len(v)-1,int(q*len(v)))] if v else None
print(f"calibration: {ref} = {cal:.0f} real min per game year → {spa:.2f} s per tap\n")
print("| arm | lives | reign years mean / p10 / p90 (reign ended) | all lives incl. censored mean | end causes | real h per life (mean / max) | months played (mean) |")
print("|---|---|---|---|---|---|---|")
for k,L in A.items():
  done=[l for l in L if cause(l) not in ('her','cap')];Y=[ry(l) for l in done];Ya=[ry(l) for l in L]
  C={}
  for l in L:C[cause(l)]=C.get(cause(l),0)+1
  H=[eff(l)*spa/3600 for l in L]
  print(f"| {k} | {len(L)} | {(sum(Y)/len(Y)) if Y else 0:.1f} / {pct(Y,.1)} / {pct(Y,.9)} (n={len(Y)}) | {sum(Ya)/len(Ya):.1f} | {', '.join(f'{c} {n}' for c,n in sorted(C.items(),key=lambda x:-x[1]))} | {sum(H)/len(H):.1f} / {max(H):.1f} | {sum(l['ps']['tNow'] for l in L)/len(L):.0f} |")
print("\nPer life:\n\n| arm | seed | origin | end | cause | reign years | Emperor age | her ending | reign-end cards seen | real h |\n|---|---|---|---|---|---|---|---|---|---|")
for k,L in A.items():
  for l in L:
    P=l['ps'];R=P.get('re') or {};res=P.get('res') or {}
    print(f"| {k} | s{l['seed']} | {P.get('origin')} | {l['end']} | {cause(l)} | {ry(l)} | {(P.get('emp') or {}).get('age')} | {res.get('title','–')} · {str(res.get('fate',''))[:40]} | {json.dumps(R.get('cards') or {},ensure_ascii=False)} | {eff(l)*spa/3600:.1f} |")
