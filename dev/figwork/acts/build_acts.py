# python3 build_acts.py IN_ACTS.json OUT_ACTS.json : img/ACTS.json for review/act-pics2 from meanings.py
#   log  = every rule [regex, key] in order (key "-" = no meaning of its own: joins the line before, j87 kbkMeaning)
#   acts = every known card name (old acts + act_names.json from the code inventory) -> key of its meaning rule (keys with ":" stay as before)
#   prefix = recomputed from the rules ("Phô tài:" + a name -> pho-tai …)
import json,re,sys,os
H=os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0,H)
from meanings import R
A=json.load(open(sys.argv[1]))
C=[(k,re.compile(rx,re.I)) for k,rx,sc in R]
def key(t):
    for k,rx in C:
        if rx.search(t): return k
    return None
names=set(A['acts'])|set(json.load(open(os.path.join(H,'act_names.json'))))
acts={};miss=[]
for n in sorted(names):
    if '*' in n: k=key(n.replace('*','Lan Tần'))
    else: k=key(n) or key(n+'.')
    if k and k!='-' and ':' not in k: acts[n]=k
    elif n in A['acts']: acts[n]=A['acts'][n]
    else: miss.append(n)
pre={}
for p,old in A.get('prefix',{}).items():
    k=key(p+' Lan Tần'); pre[p]=k if k and k!='-' and ':' not in k else old
A['acts']=acts; A['prefix']=pre; A['log']=[[rx,k] for k,rx,sc in R]
A['_doc']=A['_doc']+' review/act-pics2: log = every meaning rule of dev/figwork/acts/meanings.py (one rule = one meaning = one picture; "-" = no meaning of its own, joins the line before).'
json.dump(A,open(sys.argv[2],'w'),ensure_ascii=False,indent=0)
print('acts',len(acts),'log',len(A['log']),'unmapped names',miss)
