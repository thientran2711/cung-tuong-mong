# face box for a cutout (fig: head zone upscaled; por: whole). returns (x0,y0,x1,y1) in image px or None
import os,cv2,numpy as np
CAS=[cv2.CascadeClassifier(cv2.data.haarcascades+n) for n in ("haarcascade_frontalface_alt2.xml","haarcascade_frontalface_default.xml","haarcascade_profileface.xml")]
def face_box(path,im=None):
    if im is None: im=cv2.imread(path,cv2.IMREAD_UNCHANGED)
    H,W=im.shape[:2];a=im[...,3:].astype(np.float32)/255
    c=(im[...,:3]*a+np.array([195,213,230])*(1-a)).astype(np.uint8)
    por=os.path.basename(path).startswith(("por-","face-"))
    ys=np.where((im[...,3]>16).any(axis=1))[0];top=ys.min() if len(ys) else 0
    y1=H if por else min(H,int(top+0.22*(ys.max()-top)))
    sub=c[:y1];k=max(1.0,500/max(1,sub.shape[0]))
    g=cv2.cvtColor(cv2.resize(sub,None,fx=k,fy=k),cv2.COLOR_BGR2GRAY);g=cv2.equalizeHist(g)
    best=None
    for cas in CAS:
        for flip in (False,True):
            gg=g[:, ::-1] if flip else g
            mn=int(max(g.shape[0]*.12,(0.3*W if por else 0.05*(ys.max()-top))*k));fs=cas.detectMultiScale(gg,1.08,4,minSize=(mn,mn))
            for (x,y,w,h) in fs:
                if flip: x=gg.shape[1]-x-w
                if best is None or w*h>best[2]*best[3]: best=(x,y,w,h)
        if best is not None: break
    if best is None: return None
    x,y,w,h=[v/k for v in best]
    return (x-0.15*w,y-0.05*h,x+1.15*w,y+1.25*h)
