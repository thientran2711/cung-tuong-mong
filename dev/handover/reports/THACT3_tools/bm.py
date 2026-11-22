# bm.py dir key... : still-measure A vs B (chroma-key), disc of each image by its own circle()
import sys,numpy as np
sys.path.insert(0,'/home/user/cung-tuong-mong/dev/handover/reports/THACT1_tools')
from PIL import Image
import importlib.util
src=open('/home/user/cung-tuong-mong/dev/handover/reports/THACT1_tools/leanout_measure.py').read().split('SETS=')[0]
exec(src)
def load(p):
    a=np.array(Image.open(p).convert('RGB').resize((512,512),Image.LANCZOS)).astype(int)
    g=(a[...,1]>150)&(a[...,0]<130)&(a[...,2]<130)&(a[...,1]-np.maximum(a[...,0],a[...,2])>60)
    al=np.where(g,0,255).astype(np.uint8); return np.dstack([a.astype(np.uint8),al])
def rim(a):
    # disc = gold rim: estimate from top arc (crown may poke) -> use left/right extremes of rows in upper 45%
    return circle(a)
d=sys.argv[1]
for k in sys.argv[2:]:
    A=load(f'{d}/{k}-A.png'); cA=circle(A)
    for t in ('B1','Bm','B2','B3'):
        try: B=load(f'{d}/{k}-{t}.png')
        except FileNotFoundError: continue
        cB=circle(B); ar,ov=stats(B,cB); arA,_=stats(B,cA)
        print(f'{k} {t}: rB/rA={cB[2]/cA[2]:.2f}  out(own disc)={ar:.1f}%  out(A disc)={arA:.1f}%  reach={ov:.1f}%  zoom-if-locked={cA[2]/cB[2]:.2f}')
