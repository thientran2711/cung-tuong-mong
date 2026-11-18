import cv2, numpy as np, sys
from PIL import Image
casc=cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml')
prof=cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_profileface.xml')
def face(p):
    im=Image.open(p).convert('RGBA'); a=np.array(im)
    H=a.shape[0]; top=a[:int(H*0.3)]
    bg=np.full(top.shape[:3],225,np.uint8); al=top[:,:,3:4]/255.
    rgb=(top[:,:,:3]*al+bg[:,:,:3]*(1-al)).astype(np.uint8)
    g=cv2.cvtColor(rgb,cv2.COLOR_RGB2GRAY)
    best=None
    for mn in (30,40,50):
        f=casc.detectMultiScale(g,1.05,3,minSize=(mn,mn))
        if len(f): best=max(f,key=lambda r:r[2]*r[3]); break
    return best,H,a
def metrics(p):
    f,H,a=face(p)
    al=a[:,:,3]>40; ys=np.where(al.any(1))[0]; y0,y1=ys[0],ys[-1]; FH=y1-y0+1
    if f is None: return None
    x,y,w,h=f
    # shoulder width: max width in rows between chin+0.02H and chin+0.12H
    chin=y+h
    ws=[]
    for yy in range(int(chin+0.02*FH),int(chin+0.12*FH)):
        xs=np.where(al[yy])[0]; ws.append(xs[-1]-xs[0]+1 if len(xs) else 0)
    sh=max(ws)
    return dict(FH=FH,face_h=h/FH,face_w=w/FH,chin=(chin-y0)/FH,shoulder=sh/FH,fw_sh=w/sh,w_h=al.any(0).sum()/FH)
if __name__=='__main__':
    for p in sys.argv[1:]:
        m=metrics(p); print(p.split('/')[-1], {k:round(v,3) for k,v in m.items()} if m else None)
