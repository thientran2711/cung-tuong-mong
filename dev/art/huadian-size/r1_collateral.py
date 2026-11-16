# r1_collateral.py (reviewer R1): live por vs pre-CDN git copy: how much changes OUTSIDE the logged mark window (brow/hair/skin collateral).
# usage: r1_collateral.py LIVEDIR GITDIR > out.jsonl
import sys,os,json
import numpy as np,cv2
from PIL import Image
live,git=sys.argv[1:3]; D=os.path.dirname(os.path.abspath(__file__))
for l in open(D+'/log_por.jsonl'):
    x=json.loads(l); n=x['name']
    if not n.startswith('por-') or 'win' not in x: continue
    pl,pg=f'{live}/{n}.webp',f'{git}/img/{n}.webp'
    if not (os.path.exists(pl) and os.path.exists(pg)): continue
    a=np.asarray(Image.open(pg).convert('RGB')).astype(np.float32); b=np.asarray(Image.open(pl).convert('RGB')).astype(np.float32)
    if a.shape!=b.shape: print(json.dumps(dict(name=n,status=x['status'],shape='diff'))); continue
    d=np.abs(a-b).max(-1); ds=cv2.blur(d,(5,5))
    w=x.get('winx') or x['win']; m=np.ones(d.shape,bool); pad=12
    m[max(int(w[1])-pad,0):int(w[3])+pad,max(int(w[0])-pad,0):int(w[2])+pad]=False
    inn=~m
    print(json.dumps(dict(name=n,status=x['status'],tot=round(float(d.mean()),2),out_p99=round(float(np.percentile(ds[m],99.9)),1),out_max=round(float(ds[m].max()),1),out_n=int((ds[m]>10).sum()),in_mean=round(float(d[inn].mean()),1))),flush=True)
