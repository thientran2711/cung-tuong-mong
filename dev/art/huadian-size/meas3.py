import sys,os,json
sys.path.insert(0,'/home/user/wt/huadian3/dev/art/huadian-size')
import numpy as np,cv2
from PIL import Image
from shrink2 import analyze
def load(f):
    d={}
    for l in open(f): x=json.loads(l); d[x['name']]=x
    return d
L3,L3d=load('log3.jsonl'),load('log3d.jsonl')
names=open('names.txt').read().split()
def m(dirn,L,n):
    p=f'{dirn}/{n}.webp'
    if not os.path.exists(p): return None
    x=L[n]; rgb=np.asarray(Image.open(p).convert('RGB')); an=analyze(rgb,x['winx'],x['fw'],inner=None)
    if an is None: return 0.0
    g=an['strong'].astype(np.uint8); fw=x['fw']; gap=max(3,int(0.06*fw))|1
    k,lbl,st,_=cv2.connectedComponentsWithStats(cv2.dilate(g,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(gap,gap))))
    if k<2: return 0.0
    main=max(range(1,k),key=lambda i:g[lbl==i].sum()); cols=np.nonzero((g*(lbl==main)).any(0))[0]
    return round((cols[-1]-cols[0]+1)/fw,3)
R={}
for n in names:
    R[n]=(m('pc3',L3,n),m('pc3d',L3d,n))
json.dump(R,open('meas3.json','w'))
import collections
c=collections.Counter()
for n,(a,b) in R.items():
    ok=lambda v: v is not None and 0.06<=v<=0.095
    c['ex_ok' if ok(a) else ('def_ok' if ok(b) else 'neither')]+=1
    if not ok(a) and not ok(b): print(n,a,b)
print(c)
