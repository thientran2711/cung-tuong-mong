#!/usr/bin/env python3
"""Mark npc-purpose rows after converting them (dev/test/npc-purpose-rows.json, read by dev/test/npc-purpose-scan.js).
usage: python3 dev/tools/npc-purpose-mark.py            -> every row whose fingerprint is gone gets "done" = the goal-call snippet
                                                            (npcWhy/npcWhyAll/npcWit/npcTell/npwPick) on the nearest line (±12) of its file
       python3 dev/tools/npc-purpose-mark.py --out f.js 123 "reason"   -> mark one row as not an NPC choice
Rows it cannot place are printed; fix them by hand. Never marks a row whose fingerprint is still in the file."""
import json,re,sys,os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..');P=os.path.join(D,'test/npc-purpose-rows.json');B=os.path.join(D,'build')
J=json.load(open(P,encoding='utf-8'));G=re.compile(r'\b(npcWhy|npcWhyAll|npcWit|npcTell|npwPick)\s*\(')
if len(sys.argv)>1 and sys.argv[1]=='--out':
  f,n,why=sys.argv[2],int(sys.argv[3]),sys.argv[4]
  for r in J['rows']:
    if r['f']==f and r['line0']==n:r.pop('fp',None);r['out']=why
else:
  src={};miss=[]
  for r in J['rows']:
    if r.get('done') or r.get('out') or not r.get('fp'):continue
    t=src.setdefault(r['f'],open(os.path.join(B,r['f']),encoding='utf-8').read())
    if r['fp'] in t:continue
    L=t.split('\n');best=None
    for d in range(0,13):
      for n in (r['line0']-1-d,r['line0']-1+d):
        if 0<=n<len(L):
          m=G.search(L[n])
          if m and best is None:best=L[n][max(0,m.start()-25):m.end()+45]
      if best:break
    if best:r.pop('fp',None);r['done']=best
    else:miss.append(r['f']+':'+str(r['line0']))
  print('unplaced:',' '.join(miss) or 'none')
json.dump(J,open(P,'w',encoding='utf-8'),ensure_ascii=False,indent=0)
