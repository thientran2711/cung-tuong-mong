import numpy as np, cv2
from PIL import Image
def fix(src,dst,zone_rows=(0.50,1.30),zone_cols=(0.45,1.45),cut=215):
    im=np.array(Image.open(src).convert('RGBA')); A=im[...,3].copy(); H,W=A.shape
    ycc=cv2.cvtColor(im[...,:3],cv2.COLOR_RGB2YCrCb)
    skin=(A>200)&(ycc[...,1]>135)&(ycc[...,1]<175)&(ycc[...,2]>85)&(ycc[...,2]<130)&(ycc[...,0]>120)
    gray=cv2.cvtColor(np.where(A[...,None]>128,im[...,:3],255).astype(np.uint8),cv2.COLOR_RGB2GRAY)
    casc=cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml')
    lim=int(H*.2) if H>700 else int(H*.75)
    top=gray[:lim]
    fs_=casc.detectMultiScale(top,1.05,4,minSize=(int(W*.12),int(W*.12)))
    if len(fs_)==0: raise RuntimeError('no face')
    fx,fy,fw,fh=max(fs_,key=lambda r_:r_[2]*r_[3])
    skin[fy+int(fh*1.12):]=False
    skin[:, :fx-int(fw*.2)]=False; skin[:, fx+int(fw*1.3):]=False
    n,lab,st,_=cv2.connectedComponentsWithStats(skin.astype(np.uint8))
    i=1+np.argmax(st[1:,4]); face=(lab==i).astype(np.uint8)
    x,y,w,h=fx,fy,fw,fh
    r=max(3,int(w*.10)); k=cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(2*r+1,2*r+1))
    sil=cv2.morphologyEx(face,cv2.MORPH_CLOSE,k)
    cnts,_=cv2.findContours(sil,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
    sil=np.zeros_like(sil); cv2.drawContours(sil,cnts,-1,1,-1)   # filled
    zone=np.zeros((H,W),bool)
    zone[y+int(h*zone_rows[0]):y+int(h*zone_rows[1]), x+int(w*zone_cols[0]):x+int(w*zone_cols[1])]=True
    k3=cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(7,7))
    outside=~(sil>0)
    inside=cv2.erode(sil,k3)>0
    clear=zone&outside&(A<cut)&(ycc[...,0]>140)
    fill=zone&inside&(A<250)
    out=im.copy()
    # colour for filled pixels: inpaint from solid skin
    src_ok=(A>=240)
    if fill.any():
        rgb=cv2.inpaint(np.ascontiguousarray(im[...,:3]), (fill|(~src_ok&inside&zone)).astype(np.uint8)*255, 3, cv2.INPAINT_TELEA)
        out[...,:3][fill]=rgb[fill]
    wz=cv2.GaussianBlur(zone.astype(np.float32),(0,0),max(8,w*.09)); wz=np.clip(wz*1.5,0,1)
    cand=outside&(A<cut)&(ycc[...,0]>140)
    na=A.astype(np.float32); na[cand]=A[cand]*(1-wz[cand]); out[...,3]=na.astype(np.uint8)
    out[...,3][fill]=255
    # soften alpha at the new edge
    a=out[...,3].astype(np.float32)
    band=zone&(cv2.dilate(sil,k3)>0)&~inside
    bl=cv2.GaussianBlur(a,(0,0),0.8); a[band]=np.minimum(a[band],bl[band]+0)  # never grow
    out[...,3]=np.clip(a,0,255).astype(np.uint8)
    Image.fromarray(out).save(dst,lossless=True,quality=100,method=6)
    return int(clear.sum()),int(fill.sum())
if __name__=='__main__':
    import sys; print(fix(sys.argv[1],sys.argv[2]))
