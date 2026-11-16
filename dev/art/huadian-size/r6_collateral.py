# r6_collateral.py ORIGDIR NEWDIR LOG names...: pixels changed (>28) outside the mark window (+/-8px, +BOT below) = collateral damage
import sys,json,numpy as np
from PIL import Image
od,nd,log=sys.argv[1:4]; L={}
for l in open(log):
    x=json.loads(l)
    if x.get('winx'): L[x['name']]=x
for n in sys.argv[4:]:
    a=np.asarray(Image.open(f'{od}/{n}.webp').convert('RGBA')).astype(int); b=np.asarray(Image.open(f'{nd}/{n}.webp').convert('RGBA')).astype(int)
    d=(np.abs(a-b).max(-1)>28); w=L[n]['winx']; fw=L[n]['fw']; m=8; bot=int(0.15*fw)
    d[max(w[1]-m,0):w[3]+bot,max(w[0]-m-int(0.14*fw),0):w[2]+m+int(0.14*fw)]=False
    R=np.zeros_like(d); R[max(w[1]-int(0.4*fw),0):w[3]+int(0.5*fw),max(w[0]-int(0.5*fw),0):w[2]+int(0.5*fw)]=True; d&=R; ys,xs=np.nonzero(d)
    if d.sum()>6: print(n,int(d.sum()),'bbox',xs.min(),ys.min(),xs.max(),ys.max())
