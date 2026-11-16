import sys,os,json,re
sys.path.insert(0,'/home/user/wt/huadian3/dev/art/huadian-size')
import numpy as np,cv2
import runpor
from runswap import prune_donor
def feat(name):
    info,_,an=runpor.process(f'orig/{name}.webp',name,'orig')
    if an is None: return None
    fw=info['fw']; pr=prune_donor(an,fw)
    g=an['strong']; tot=g.sum(); main=pr['strong'].sum()
    cols=np.nonzero(pr['strong'].any(0))[0]; w=(cols[-1]-cols[0]+1)/fw
    reg=an['reg'][pr['strong']]; lab=cv2.cvtColor(np.clip(reg,0,255).astype(np.uint8)[None],cv2.COLOR_RGB2LAB)[0].astype(float).mean(0)
    pk=float(np.percentile(an['dE'][pr['strong']],80))
    return dict(frac=main/tot,w=w,lab=lab,pk=pk,ratio=info['ratio'])
cands=open('cands.txt').read().split()
m=json.load(open('../dev/art/huadian-size/swap_map2.json'))
F={}
for t in range(1,8):
    for c in cands:
        n=f'por-{c}-t{t}-a18'
        try: F[(c,t)]=feat(n)
        except Exception as e: F[(c,t)]=None
out={}
for st,v in m.items():
    for t in v['tiers']:
        r=feat(f'por-{st}-t{t}-a18')
        best=[]
        for c in cands:
            if c==st: continue
            f=F[(c,t)]
            if not f or f['frac']<0.8 or f['w']<0.075: continue
            d=np.linalg.norm((f['lab']-r['lab'])[1:])+0.25*abs(f['lab'][0]-r['lab'][0])
            best.append((d-0.15*min(f['pk'],40),c,round(f['w'],3),round(f['pk'])))
        best.sort(); out[f'{st}|{t}']=best[:3]
        print(st,t,[b[1:] for b in best[:3]])
json.dump(out,open('pick.json','w'))
