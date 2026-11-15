# hsize.py FILES... : measure the huadian (forehead mark) width/height relative to face width fw (porcrop.find_face)
#   window on the lower forehead, upscaled x4; background = big median blur; mark = clear colour/brightness deviation
#   from that background (not hair/brows: L>100). Largest blob near the window centre + touching blobs.
import sys,os,numpy as np,cv2
from PIL import Image
from lib import find_face,comp
TH=float(os.environ.get("TH","9"))
def measure(path,dbg=None,face=None):
    im=Image.open(path).convert("RGBA"); cx,ey,fw=(face or find_face(im)[:3])
    x0,x1=int(cx-0.36*fw),int(cx+0.36*fw); y0,y1=int(ey-0.55*fw),int(ey-0.02*fw)
    rgb=np.asarray(comp(im))[max(0,y0):y1,max(0,x0):x1]
    S=4; rgb=cv2.resize(rgb,None,fx=S,fy=S,interpolation=cv2.INTER_CUBIC)
    lab=cv2.cvtColor(rgb,cv2.COLOR_RGB2LAB).astype(np.float32)
    k=int(0.30*fw*S)|1
    bg=np.dstack([cv2.medianBlur(np.clip(lab[...,i],0,255).astype(np.uint8),min(k,255)).astype(np.float32) for i in range(3)])
    d=np.sqrt((lab[...,1]-bg[...,1])**2+(lab[...,2]-bg[...,2])**2)
    ch=np.hypot(lab[...,1]-128,lab[...,2]-128); chb=np.hypot(bg[...,1]-128,bg[...,2]-128)
    dl=np.abs(lab[...,0]-bg[...,0])
    m=((((d>TH)&(ch>chb+5))|((dl>float(os.environ.get('TL','16')))&(d>4)))&(lab[...,0]>90)&(bg[...,0]>160)).astype(np.uint8)
    m=cv2.morphologyEx(m,cv2.MORPH_OPEN,np.ones((3,3),np.uint8)); m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((5,5),np.uint8))
    n,lbl,st,cen=cv2.connectedComponentsWithStats(m)
    H,W=m.shape; c=(W/2,H*0.57); best=None; F=fw*S
    for i in range(1,n):
        x,y,w,h,a=st[i]
        if a<20 or y<=1 or x<=1 or x+w>=W-1: continue
        if np.hypot(cen[i][0]-c[0],cen[i][1]-c[1])>0.25*F: continue
        if best is None or a>best[4]: best=(x,y,w,h,a)
    if best is None: return 0.0,0.0,fw
    bx0,by0,bx1,by1=best[0],best[1],best[0]+best[2],best[1]+best[3]
    for _ in range(2):
        for i in range(1,n):
            X,Y,Wd,Hd,A=st[i]
            if A<15 or Y<=1 or X<=1 or X+Wd>=W-1: continue
            g=0.04*F
            if X<bx1+g and X+Wd>bx0-g and Y<by1+g and Y+Hd>by0-g:
                bx0,by0,bx1,by1=min(bx0,X),min(by0,Y),max(bx1,X+Wd),max(by1,Y+Hd)
    if dbg:
        o=rgb.copy(); cv2.rectangle(o,(int(bx0),int(by0)),(int(bx1),int(by1)),(0,255,0),2); Image.fromarray(o).save(dbg)
    return (bx1-bx0)/F,(by1-by0)/F,fw
if __name__=="__main__":
    for p in sys.argv[1:]:
        w,h,fw=measure(p); print(f"{os.path.basename(p)} {w:.3f} {h:.3f} fw={fw:.0f}")
