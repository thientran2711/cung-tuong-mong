import json, numpy as np
from PIL import Image
from scipy.ndimage import binary_dilation, label
D='/tmp/claude-0/s/'; O=D+'out/'
im=Image.open(D+'pins_cut.png').convert('RGBA'); A0=np.array(im)
cuts=[int(p*3072/900) for p in [0,104,212,328,452,566,668,783,900]]
names=['dangle','peony','phoenix','butterfly','buyao','floralfork','ruyi','plum']
TH=700; meta={}
for i in range(8):
    x0,x1=cuts[i],cuts[i+1]; seg=A0[:,x0:x1].copy()
    m=seg[...,3]>40
    lab,n=label(binary_dilation(m,iterations=7))
    sizes=[(lab==k).sum() for k in range(1,n+1)]; keep=lab==(1+int(np.argmax(sizes)))
    seg[...,3]=np.where(keep&m,seg[...,3],0)
    sub=seg[...,3]>140
    ys=np.where(sub.any(1))[0]; xs=np.where(sub.any(0))[0]
    y0,y1,cx0,cx1=ys.min(),ys.max()+1,xs.min(),xs.max()+1
    sub=sub[y0:y1,cx0:cx1]; h=y1-y0
    ext=np.array([ (np.where(r)[0].max()-np.where(r)[0].min()+1) if r.any() else 0 for r in sub])
    sw=float(np.median(ext[int(h*.85):]))
    big=np.where(ext>2.2*max(sw,6))[0]; ob=int(big.max()) if len(big) else int(h*.3)
    c=np.where(sub[-6])[0]; tipx=(c.min()+c.max())/2
    c=np.where(sub[4])[0]; headx=(c.min()+c.max())/2
    k=TH/h; pad=6
    spr=Image.fromarray(seg).crop((cx0-pad,y0,cx1+pad,y1)).resize((int((cx1-cx0+2*pad)*k),TH),Image.LANCZOS)
    f=f'pin_{i+1}_{names[i]}.webp'; spr.save(O+f,quality=90,method=6)
    meta[i+1]=dict(name=names[i],file=f,w=spr.width,h=TH,tip=[round((tipx+pad)*k,1),TH-1],head=[round((headx+pad)*k,1),0],ob=round(ob*k,1),shaft_w=round(sw*k,1))
    print(meta[i+1])
json.dump(meta,open(D+'pins_meta.json','w'))
