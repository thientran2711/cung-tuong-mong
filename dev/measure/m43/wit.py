import json,glob
W={}
for f in glob.glob('out__t43_*.json'):
  d=json.load(open(f))
  for b,D in d['wit'].items():
    Q=W.setdefault(b,{})
    for k,v in D.items():Q[k]=Q.get(k,0)+v
for b in ['lo','mid','hi']:
  Q=W.get(b,{});dc=Q.get('_decide',0);ac=max(1,Q.get('_act',0))
  print(b,'decide',dc,'mistake%%',round(100*Q.get('_mistake',0)/max(1,dc)),'slip%%',round(100*Q.get('_slip',0)/ac),'wait',Q.get('_wait',0),'acts',Q.get('_act',0),'fail%%',round(100*Q.get('_fail',0)/ac),'tells',Q.get('_tell',0),'seen',Q.get('_tellSeen',0))
