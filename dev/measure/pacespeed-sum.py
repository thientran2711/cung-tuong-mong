#!/usr/bin/env python3
"""review/pace-speed — summary of dev/measure/pacespeed.js lives (one JSON line per life).
usage: python3 dev/measure/pacespeed-sum.py LABEL=file.jsonl [LABEL=file.jsonl ...] [--cal MIN_PER_YEAR] [--ref LABEL]
Real minutes: one bot action = one player tap/choice. The REF arm (default: the first) is calibrated to MIN_PER_YEAR real robot minutes per
game year (default 30: M5b robot ~25 min/yr on LIVE, M2 robot «40–45 min per game year» incl. stalls); every arm then uses the same seconds
per action, so an arm with fewer taps per month plays faster in real time."""
import json,sys,statistics as st
RN=["Đáp ứng","Thường tại","Quý nhân","Tần","Phi","Quý phi","Hoàng quý phi","Hoàng hậu"]
args=[a for a in sys.argv[1:] if '=' in a and not a.startswith('--')]
cal=float(sys.argv[sys.argv.index('--cal')+1]) if '--cal' in sys.argv else 30.0
ref=sys.argv[sys.argv.index('--ref')+1] if '--ref' in sys.argv else args[0].split('=')[0]
TYR=float(sys.argv[sys.argv.index('--tyrate')+1]) if '--tyrate' in sys.argv else 19.0
def ty(l,upto=None):  # bot-artefact taps «Ra ngoài khi mặc trung y?» (a human dresses once): exact from the tap tally, else months × --tyrate
  P=l['ps'];src=P.get('src')
  if src:n=sum(v for k,v in src.items() if 'mặc trung y' in k)
  else:n=TYR*max(1,P['tNow'])
  return n if upto is None else n*upto/max(1,P['tNow'])
def eff(l):return l['ps']['acts']-ty(l)
A={}
for a in args:
  k,f=a.split('=',1);A[k]=[json.loads(l) for l in open(f) if l.strip().startswith('{')]
def med(x):return round(st.median(x),1) if x else None
def apm(L):  # actions per game month over all lives (trung y artefact removed)
  a=sum(eff(l) for l in L);m=sum(max(1,l['ps']['tNow']) for l in L);return a/m
spa=cal/12*60/apm(A[ref])  # seconds per action
print(f"calibration: {ref} = {cal:.0f} real min per game year → {spa:.2f} s per bot action (bot-artefact taps «Ra ngoài khi mặc trung y?» removed: exact where tallied, else {TYR:.0f}/month)\n")
print("| arm | lives | ended | months played (med) | taps / month | real min / game year | first ending: month · real h (med) | ending in ≤ 4 h | max rank (med) |")
print("|---|---|---|---|---|---|---|---|---|")
for k,L in A.items():
  ended=[l for l in L if l['end']=='ended'];ap=apm(L)
  eh=[eff(l)*spa/3600 for l in ended];em=[l['ps']['tNow'] for l in ended]
  in4=sum(1 for l in L if l['end']=='ended' and eff(l)*spa/3600<=4)
  mr=[max([l['ps']['rk0']]+[p['to'] for p in l['ps']['promos']]) for l in L]
  print(f"| {k} | {len(L)} | {len(ended)} | {med([l['ps']['tNow'] for l in L])} | {ap:.0f} | {ap*12*spa/60:.0f} | {med(em)} · {med(eh)} | {in4}/{len(L)} | {med(mr)} |")
print("\nSplit per life: real hours to FIRST reach Hoàng hậu (or the life's top rank) vs hours SITTING at Hoàng hậu until the ending (Emperor's death = lifespan rule OD:L1141).\n")
print("| arm | life | to Hoàng hậu: month · h | at Hoàng hậu until end/stop: months · h | end |\n|---|---|---|---|---|")
for k,L in A.items():
  for l in L:
    P=l['ps'];hh=[p for p in P['promos'] if p['to']==7]
    if hh:
      p=hh[0];a1=p['acts']-ty(l,p['t']);a2=eff(l)-a1
      print(f"| {k} | s{l['seed']} {P['origin']} | m{p['t']} · {a1*spa/3600:.1f} | {P['tNow']-p['t']} · {a2*spa/3600:.1f} | {l['end']}{(' «'+P['res']['title']+'»') if P.get('res') else ''} |")
    else:print(f"| {k} | s{l['seed']} {P['origin']} | never (top rank {max([P['rk0']]+[q['to'] for q in P['promos']])}) · {eff(l)*spa/3600:.1f} | – | {l['end']}{(' «'+P['res']['title']+'»') if P.get('res') else ''} |")
print("\nPer rank (all lives): months spent AT the rank before the next promotion (median; n = promotions seen), real minutes at the ref rate,")
print("and stats at the moment of promotion vs the new rank's bar (median Sủng − bar s / Danh − bar d; + = above the bar).\n")
for k,L in A.items():
  print(f"**{k}**\n\n| rank → next | n | months at rank (med) | real min at rank (med) | Sủng − bar | Danh − bar | roads |\n|---|---|---|---|---|---|---|")
  for r in range(7):
    mo=[];mi=[];ds=[];dd=[];via={}
    for l in L:
      P=l['ps']['promos'];t0=0;a0=0;cur=l['ps']['rk0']
      for p in P:
        if p['from']==r and p['to']==r+1 and cur==r:
          mo.append(p['t']-t0);mi.append(max(0,(p['acts']-a0)-(ty(l,p['t'])-ty(l,t0)))*spa/60);ds.append(p['sung']-p['barS']);dd.append(p['danh']-p['barD']);via[p['via']]=via.get(p['via'],0)+1
        t0=p['t'];a0=p['acts'];cur=p['to']
    if mo:print(f"| {RN[r]} → {RN[r+1]} | {len(mo)} | {med(mo)} | {med(mi)} | {med(ds):+} | {med(dd):+} | {', '.join(f'{a} {b}' for a,b in via.items())} |")
  print()
for k,L in A.items():
  print(f"**{k} lives**: "+" · ".join(f"s{l['seed']} {l['ps']['origin']} {l['end']} m{l['ps']['tNow']} rank {l['ps']['rankNow']}"+(f" «{l['ps']['res']['title']}»" if l['ps'].get('res') else '') for l in L))
print("\nStall months per life by cause (monthly look, rank < Hoàng hậu, not in lãnh cung; first blocking cause in this order: qBlock «Hoàng hậu không chặn/phản đối» · seat «Chờ ghế trống» · stat bar · gap «Cách lần sắc phong» · exam only = eligible, exam not yet sat/passed · ready = nothing missing):\n")
print("| arm | life | months below top | qBlock | seat | stat | gap | exam | other | ready |\n|---|---|---|---|---|---|---|---|---|---|")
for k,L in A.items():
  for l in L:
    c=l['ps'].get('stall')
    if not c:continue
    print(f"| {k} | s{l['seed']} {l['ps']['origin']} | {sum(c.values())} | "+" | ".join(str(c.get(x,0)) for x in ['qBlock','seat','stat','gap','exam','other','ready'])+" |")
