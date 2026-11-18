# usage: iou2.py workdir  -> IoU of v{0,1,2}_tN vs live/tN.webp ; writes iou_v.txt
import sys
from PIL import Image
import numpy as np
W0=sys.argv[1].rstrip('/')+'/'
def crop(im):
    a=np.array(im.convert('RGBA'));m=a[:,:,3]>40
    ys=np.where(m.any(1))[0];xs=np.where(m.any(0))[0]
    return Image.fromarray(a[ys[0]:ys[-1]+1,xs[0]:xs[-1]+1])
out=[]
for v in (0,1,2):
    for k in range(1,9):
        try:
            L=crop(Image.open(W0+f'live/t{k}.webp'));N=crop(Image.open(W0+f'v/v{v}_t{k}.png'))
        except Exception as e: continue
        s=L.height/N.height;N2=N.resize((max(1,round(N.width*s)),L.height))
        Wd=max(L.width,N2.width)+40;Hd=L.height
        cl=Image.new('RGBA',(Wd,Hd));cn=Image.new('RGBA',(Wd,Hd))
        cl.paste(L,((Wd-L.width)//2,0));cn.paste(N2,((Wd-N2.width)//2,0))
        ml=np.array(cl)[:,:,3]>40;mn=np.array(cn)[:,:,3]>40
        iou=(ml&mn).sum()/(ml|mn).sum()
        a=np.array(Image.open(W0+f'v/v{v}_t{k}.png').convert('RGBA'))[:,:,3]
        edge=[int(a[0].max()),int(a[-1].max()),int(a[:,0].max()),int(a[:,-1].max())]
        out.append(f'v{v} t{k} IoU {100*iou:.1f}% w/h live {L.width/L.height:.3f} new {N.width/N.height:.3f} edges {edge}')
open(W0+'iou_v.txt','w').write('\n'.join(out));print('\n'.join(out))
