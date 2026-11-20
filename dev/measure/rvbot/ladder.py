import os
import json,glob,statistics as st
for arm in ['main','br']:
  b3=[];b5=[];n=0;never3=0;danhL=[];danhG=[]
  for f in sorted(glob.glob(os.environ.get('OUT','/home/user/wt/rv-bot/out')+f'/life-{arm}-[0-9]*[0-9].json')):
    for x in json.load(open(f)):
      dt=x.get('dt')
      if not dt: continue
      me=dt.get('me') or []
      if not me: continue
      n+=1
      t3=next((r[0] for r in me if r[10]>=3),None); t5=next((r[0] for r in me if r[10]>=5),None)
      if t3 is None: never3+=1
      else: b3.append(t3)
      if t5 is not None: b5.append(t5)
      g=sum(v[0] for v in dt['src'].values()); l=sum(v[1] for v in dt['src'].values())
      danhG.append(g); danhL.append(l)
  print(arm,'lives',n,'| first bậc3 month median',st.median(b3) if b3 else '-','(never',never3,')','| reached bậc5',len(b5),'median',st.median(b5) if b5 else '-','| Danh gain/loss per life (whole life)',round(st.mean(danhG)),round(st.mean(danhL)))
