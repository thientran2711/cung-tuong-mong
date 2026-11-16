import json,subprocess,sys
R='/home/user/wt/fxfit/'
subprocess.run(['python3','dev/site/cdn_sync.py','--pull','img/veil-fit.json','img/scar-fit.json'],cwd=R,check=True)
v=json.load(open(R+'img/veil-fit.json'));s=json.load(open(R+'img/scar-fit.json'))
n=0
for fn in('res0.jsonl','res1.jsonl','res_kidfix.jsonl'):
    for l in open(R+'tmpfit/'+fn):
        x=json.loads(l)
        if x.get('v') and x['f'] not in v:v[x['f']]=x['v'];s[x['f']]=x['s'];n+=1
for p,d in(('veil-fit.json',v),('scar-fit.json',s)):
    json.dump(d,open(R+'img/'+p,'w'),separators=(',',':'))
print('added',n,'total',len(v),len(s))
