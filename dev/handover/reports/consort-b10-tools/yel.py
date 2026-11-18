import sys,colorsys
from PIL import Image
import numpy as np
# yel.py files... : median HSV of the most yellow-ish opaque pixels (hue 35-60deg, sat>0.3)
for f in sys.argv[1:]:
    a=np.array(Image.open(f).convert('RGBA')).reshape(-1,4)
    a=a[a[:,3]>200][:,:3]/255.
    mx=a.max(1);mn=a.min(1);d=mx-mn+1e-9
    r,g,b=a[:,0],a[:,1],a[:,2]
    h=np.where(mx==r,((g-b)/d)%6,np.where(mx==g,(b-r)/d+2,(r-g)/d+4))*60
    s=d/(mx+1e-9)
    m=(h>35)&(h<62)&(s>0.3)&(mx>0.5)
    sel=a[m]
    print(f.split('/')[-1],'yellow frac %.2f'%m.mean(), 'median rgb',(np.median(sel,0)*255).astype(int) if len(sel) else None,'hue %.0f sat %.2f'%(np.median(h[m]),np.median(s[m])) if m.any() else '')
