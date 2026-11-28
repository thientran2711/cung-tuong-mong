#!/usr/bin/env python3
"""rank-screen-scan (DLG-DEAD-BTN-2, law 11): lists every pop-up producer of the kit scene queue (j93 kmPush) and every rank-change /
life-end screen producer, and says for each how the RANK SCREEN FIRST rule (j93 kmRankWait / kmPushRank / rk cards) covers it.
usage: python3 dev/test/rank-screen-scan.py [root]   (exit 1 when a rank-change kit notice lacks rk:1 or a rank scene is not kmPushRank)"""
import re,sys,os,glob
root=sys.argv[1] if len(sys.argv)>1 else os.path.join(os.path.dirname(__file__),'..','..')
B=os.path.join(root,'dev','build');rows=[];bad=0
for f in sorted(glob.glob(os.path.join(B,'j*.js'))):
  n=os.path.basename(f);L=open(f,encoding='utf-8').read().split('\n')
  for i,l in enumerate(L,1):
    for m in re.finditer(r'kmPush(Rank)?\((done0|done|run|job|fn)\b',l):
      if (n=="j93.js" and re.search(r"function kmPush",l)) or l.strip().startswith("kmPush(fn(done))"):continue
      ctx=l[m.end():m.end()+160];kind=re.search(r'kmStage\("([^"]+)"',ctx) or re.search(r'kmStage\("([^"]+)"',l)
      k=kind.group(1) if kind else ('kitGain .kfgain' if n=='jfx.js' else ('ink (kend)' if 'job.kend' in l else 'scene'))
      rank=bool(m.group(1));kend='job.kend' in l
      rows.append((n,i,'kmPush'+('Rank' if rank else ''),k,'rank scene: plays first' if rank else ('life end entrance: plays first' if kend else 'pop-up: waits for rank screens (kmRankWait), dropped on a dead life (kmLifeOver)')))
    for m in re.finditer(r'kitPanel\(\{kind:"notice",(rk:[^,]+,)?[^}]{0,60}?title:(o\.kind==="giang"\?"Bị giáng phẩm"|"Lãnh cung"|"Rời lãnh cung")',l):
      ok=bool(m.group(1)) or 'rk:1' in l[m.start():m.start()+200]
      if not ok:bad+=1
      rows.append((n,i,'rank card',m.group(2).split('?')[-1].strip('"'),'rk:1 → rewards wait until it is closed' if ok else 'MISSING rk:1'))
print('| file | line | kind | what | RANK SCREEN FIRST |\n|---|---|---|---|---|')
for r in rows:print('| '+' | '.join(map(str,r))+' |')
gl=[r for r in rows if r[3] in('km-edict','km-gloom') and r[2]!='kmPushRank'];bad+=len(gl)
print(f'\nproducers {len(rows)} · rank scenes not marked {len(gl)} · rank cards missing rk {bad-len(gl)}');sys.exit(1 if bad else 0)
