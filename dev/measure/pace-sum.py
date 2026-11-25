#!/usr/bin/env python3
# review/balance-pace: summary of dev/measure/pace.js output. usage: python3 dev/measure/pace-sum.py <label>=<file.jsonl> ...
# Calendar: 1 month = 3 tuần (days) × 16 khắc = 48 khắc (OD:L31, OD 24/11 «1 game day = 1 tuần»).
import json,sys,statistics as st
RK=["Đáp ứng","Thường tại","Quý nhân","Tần","Phi","Quý phi","Hoàng quý phi","Hoàng hậu"]
def med(a):return round(st.median(a),1) if a else None
def load(f):return [json.loads(l) for l in open(f) if l.startswith('{')]
def summ(L):
  o={'n':len(L)}
  c1,c3,c5=[],[],[];bsum12=[];bsum36=[];bend=[];rk={r:[] for r in range(1,8)};reach={4:0,5:0,7:0};npcEnd=[];npcArt=[];horizon=[]
  for x in L:
    M=x['months'];horizon.append(M[-1]['t'] if M else 0)
    keys=list(M[0]['al'].keys())+list(M[0]['vl'].keys()) if M else []
    for k in keys:
      g=lambda m:(m['al'].get(k) if k in m['al'] else m['vl'].get(k)) or 0
      s0=g(M[0])
      for lv,arr in((1,c1),(3,c3),(5,c5)):
        if s0>=lv:continue
        t=next((m['t'] for m in M if g(m)>=lv),None)
        arr.append(t if t is not None else 999)
    def bs(m):return sum(m['al'].values())+sum(m['vl'].values())
    for T,arr in((12,bsum12),(36,bsum36)):
      m=next((m for m in M if m['t']>=T),None)
      if m:arr.append(bs(m))
    if M:bend.append(bs(M[-1]))
    for r in range(1,8):
      t=next((m['t'] for m in M if m['rank']>=r),None)
      if t is not None:rk[r].append(t)
    mx=max([m['rank'] for m in M] or [0])
    for r in reach:
      if mx>=r:reach[r]+=1
    if M:
      npcEnd+=M[-1]['npc'];npcArt+=M[-1].get('nart',[])
  n=max(1,len(L))
  o['courses']=len(c1)
  def q(arr):
    if not arr:return '–'
    ok=[a for a in arr if a<999];return f"{med(ok) if ok else '–'} ({round(100*len(ok)/len(arr))}% reach)"
  o['first_b1']=q(c1);o['first_b3']=q(c3);o['first_b5']=q(c5)
  o['bsum12']=med(bsum12);o['bsum36']=med(bsum36);o['bsumEnd']=med(bend)
  o['rank']={RK[r]:(f"{med(rk[r])} mo ({len(rk[r])}/{n})" if rk[r] else f"– (0/{n})") for r in range(1,8)}
  o['reach']={RK[r]:f"{round(100*reach[r]/n)}%" for r in reach}
  o['npcRankEnd']={RK[r]:sum(1 for v in npcEnd if v==r) for r in range(8)}
  o['npcArtMeanEnd']=med(npcArt);o['horizon']=med(horizon)
  acts={}
  for x in L:
    for k,v in (x.get('acts') or {}).items():acts[k]=acts.get(k,0)+v
  mo=sum(horizon) or 1
  o['studyKhacPerMonth']=round(2*(acts.get('selfStudy',0)+acts.get('virStudy',0)+acts.get('lesson',0))/mo,1)
  o['ends']={e:sum(1 for x in L if x['end']==e) for e in set(x['end'] for x in L)}
  return o
for a in sys.argv[1:]:
  lab,f=a.split('=',1);L=load(f);print(f"## {lab}  ({f})");print(json.dumps(summ(L),ensure_ascii=False,indent=1))
