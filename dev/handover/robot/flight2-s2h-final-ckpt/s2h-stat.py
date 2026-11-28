import json,sys
d=json.load(open('/home/user/wt/out6/flight2-s2h.ckpt.json'))
j=json.loads(d['ls']['hclh-save-v2-1']); S=j['S']
print('buoi',j.get('buoi'),'year',S.get('year'),'age',S.get('age'),'name',S.get('name'),'rank',S.get('rank'),'suc',S.get('suc'),'sung',S.get('sung'),'danh',S.get('danh'),'bac',S.get('bac'),'asthma',S.get('asthma'),'ill',S.get('ill'),'dis',S.get('dis'),'dead',S.get('dead'),'confined',S.get('confined'),'rk',json.dumps(S.get('rk'))[:80])
