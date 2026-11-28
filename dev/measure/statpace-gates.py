#!/usr/bin/env python3
"""review/stat-pace — LAW 11 / LAW 16 gate scan (BIG review FAIL 1): every stat GATE in dev/build/j*.js
(x.danh / duc / sung / th / hh / rel / oan  >= | >  number or BAL key) compared with the pace ceiling of every rank
(BAL.stp.ceil[rank], raised by BAL.stp.floor[stat] when the branch has it). A gate above the ceiling of a rank = that gate can
never open by rises at that rank (a working rule silently closed). usage:
  node /path/baldump.js index.html bal.json   (BAL + RANKS of the built page; see report)
  python3 dev/measure/statpace-gates.py bal.json [--preset A|B] [--nofloor] [--nobar] [--list]"""
import re,glob,sys,json,os
BJ=json.load(open(sys.argv[1]));BAL=BJ['BAL'];ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
pre=sys.argv[sys.argv.index('--preset')+1] if '--preset' in sys.argv else BAL.get('stpPick','A')
ceil=BAL['stpPre'][pre]['ceil'] if 'stpPre' in BAL else BAL['stp']['ceil']
floor={} if '--nofloor' in sys.argv else (BAL['stp'].get('floor') or {})
BAR={} if '--nobar' in sys.argv else (BAL['stp'].get('bar') or {});RK=BJ.get('RANKS') or []
# PACE-SPEED (owner OD 26/11 ~19:10Z (A)): a bar-tied stat (BAL.stp.bar) stops AT the next rank's bar + margin (jstatpace spCeil/spTop), no floor
def ce(k,r):
  b=BAR.get(k)
  if b and RK:return b['top'] if r>=len(RK)-1 else min(b['top'],RK[min(len(RK)-1,r+1)][b['f']]+b['m']+b.get('x',0))
  return max(ceil[r],floor.get(k,0))
G=re.compile(r'(?<![\w$])(?:\(\s*)?(?:S|p|x|v|c|o|w|me|F|q|r|t|y|it|who|her)\.(danh|duc|sung|th|hh|rel|oan)(?:\s*\|\|\s*0\s*\))?\s*(>=|>)\s*\(?\s*(BAL(?:\.[A-Za-z_$][\w$]*|\[\d+\])+|\d+)')
def res(e):
  if e.isdigit():return int(e)
  o=BAL
  for part in re.findall(r'\.([A-Za-z_$][\w$]*)|\[(\d+)\]',e[3:]):
    k=part[0] or int(part[1])
    try:o=o[k]
    except Exception:return None
  return o if isinstance(o,(int,float)) else None
rows=[]
for f in sorted(glob.glob(os.path.join(ROOT,'j*.js'))):
  b=os.path.basename(f)
  if b.startswith('jbal'):continue
  for i,l in enumerate(open(f,encoding='utf8',errors='ignore'),1):
    for m in G.finditer(l):
      k,op,e=m.groups();v=res(e)
      if v is None or v<=0:continue
      need=v+(1 if op=='>' else 0)
      shut=[r for r in range(len(ceil)) if ce(k,r)<need]
      rows.append((k,need,f'{b}:{i}',e,shut))
# thiện cảm / oán of a consort toward her open their net thresholds (jnet netTh, top of BAL.net.thClamp): liking keys -> rel, grudge keys -> oan
TC=BAL.get('net',{}).get('thClamp',{})
for key,(lo,hi) in TC.items():
  if hi<=0 or key=='repay':continue
  k='oan' if key in('oan','act','thu','host') else 'rel'
  rows.append((k,hi,f'jnet netTh "{key}" (BAL.net.thClamp top)','BAL.net.thClamp.'+key,[r for r in range(len(ceil)) if ce(k,r)<hi]))
# stat LADDERS read through helpers (ducWord(d), ducOf(p) >= …): every numeric step of these BAL keys is a gate of its stat
LAD={'ducLv':'duc','hhDuc':'duc','hhDucHeir':'duc','ducF':'duc','sungLv':'sung','sinhThanSung':'sung','ngocboiSung':'sung','danhG':'danh','oanLv':'oan'}
def leaves(o,pth):
  if isinstance(o,bool):return
  if isinstance(o,(int,float)):yield pth,o;return
  if isinstance(o,list):
    for i,x in enumerate(o):yield from leaves(x,f'{pth}[{i}]')
  elif isinstance(o,dict):
    for k2,x in o.items():yield from leaves(x,f'{pth}.{k2}')
SKIP={'danhG.srvRise','danhG.forget','danhG.forgetGrace','ducF.odds','ducF.shield','ducF.danger','ducF.betray'}
for key,k in LAD.items():
  for pth,v in leaves(BAL.get(key),key):
    if pth in SKIP or v<=0:continue
    rows.append((k,v,f'BAL ladder {pth}','BAL.'+pth,[r for r in range(len(ceil)) if ce(k,r)<v]))
by={}
for k,need,site,e,shut in rows:by.setdefault(k,[]).append((need,site,e,shut))
tot=sum(1 for r in rows if r[4]);print(f'preset {pre} · floor {floor or "none"} · gates {len(rows)} · gates shut at some rank {tot}')
print('stat\tgates\tmax gate\tshut gates\tranks shut (rank:count)')
for k in sorted(by):
  L=by[k];sh=[x for x in L if x[3]];rc={}
  for x in sh:
    for r in x[3]:rc[r]=rc.get(r,0)+1
  print(f'{k}\t{len(L)}\t{max(x[0] for x in L)}\t{len(sh)}\t{" ".join(f"{r}:{c}" for r,c in sorted(rc.items())) or "-"}')
if '--list' in sys.argv:
  for k in sorted(by):
    for need,site,e,shut in sorted(by[k],key=lambda x:-x[0]):
      if shut:print(f'{k}>={need}\t{site}\t{e}\tshut at ranks {shut}')
sys.exit(1 if tot else 0)
