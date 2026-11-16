# det2.py: forehead-mark detector v2 (brow/hair-safe). detect2(rgb,cx,ey,fw) ->
#   dict(box=(x0,y0,x1,y1) image px of the mark core, w, h, mask=uint8 full-image mask (core dilated ~1px)) or None
import numpy as np, cv2
S=3
def detect2(rgb,cx,ey,fw,seedhint=None):
    Hh,Ww=rgb.shape[:2]
    x0,x1=int(max(0,cx-0.30*fw)),int(min(Ww,cx+0.30*fw)); y0,y1=int(max(0,ey-0.60*fw)),int(ey-0.075*fw)
    roi=rgb[y0:y1,x0:x1]
    win=cv2.resize(roi,None,fx=S,fy=S,interpolation=cv2.INTER_CUBIC)
    lab=cv2.cvtColor(win,cv2.COLOR_RGB2LAB).astype(np.float32)
    L,A,B=lab[...,0],lab[...,1]-128,lab[...,2]-128
    k=int(0.20*fw*S)|1
    bg=np.dstack([cv2.medianBlur(np.clip(lab[...,i],0,255).astype(np.uint8),min(k,255)).astype(np.float32) for i in range(3)])
    dab=np.hypot(lab[...,1]-bg[...,1],lab[...,2]-bg[...,2]); dl=bg[...,0]-L
    ch=np.hypot(A,B); chb=np.hypot(bg[...,1]-128,bg[...,2]-128)
    skin=np.median(L[L>150]) if (L>150).any() else 200
    darkraw=(L<0.55*skin)&(ch<28)
    F=fw*S; cxw=(cx-x0)*S
    zx0,zx1=cxw-0.15*F,cxw+0.15*F; zy0,zy1=(ey-0.47*fw-y0)*S,(ey-0.15*fw-y0)*S
    zone=np.zeros(L.shape,bool); zone[int(max(zy0,0)):int(max(zy1,0)),int(max(zx0,0)):int(max(zx1,0))]=True
    dark=cv2.dilate(darkraw.astype(np.uint8),np.ones((11,11),np.uint8)).astype(bool)&~zone
    dark=dark|cv2.dilate(darkraw.astype(np.uint8),np.ones((5,5),np.uint8)).astype(bool)
    dk_strict=dark; r=None
    for dmode,TH in ((0,7),(0,5),(0,4),(1,7),(1,5)):
        dark=dk_strict if dmode==0 else (dk_strict&~(cv2.dilate(zone.astype(np.uint8),np.ones((3,3),np.uint8)).astype(bool)))
        m1=(dab>TH)&(ch>chb+3)&(L>0.30*skin)&~dark
        m=(m1|((dl>18)&(dab>3)&(L>0.30*skin)&~dark))
        m=cv2.morphologyEx(m.astype(np.uint8),cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
        r=_pick(m,m1,win,cxw,F,ey,fw,y0,S,zone)
        if r is not None: break
    if r is None: return None
    core,i=r
    return _finish(core,m,darkraw,zone,win,x0,y0,F,cxw,S,Hh,Ww)
def _pick(m,m1,win,cxw,F,ey,fw,y0,S,zone):
    mD=cv2.dilate(m,np.ones((5,5),np.uint8))
    n,lbl,st,cen=cv2.connectedComponentsWithStats(mD)
    cyexp=(ey-0.27*fw-y0)*S
    best=[]
    for i in range(1,n):
        x,y,w,h,a=st[i]
        if a<40 or w>0.40*F or h>0.40*F or x<=1 or x+w>=win.shape[1]-1 or y<=1: continue
        dx=abs(cen[i][0]-cxw)
        if dx>0.14*F: continue
        if not zone[min(int(cen[i][1]),zone.shape[0]-1),int(cen[i][0])]: continue
        if ((lbl==i)&(m1>0)).sum()<20: continue
        best.append((a-1.5*dx-1.0*abs(cen[i][1]-cyexp),i))
    if not best: return None
    _,i=max(best)
    return ((lbl==i)&(m>0)),i
def _finish(core,m,darkraw,zone,win,x0,y0,F,cxw,S,Hh,Ww):
    # glue nearby pieces of the same motif (dots under crescents, side wings) in the central zone
    ys,xs=np.nonzero(core); bx0,bx1,by0,by1=xs.min(),xs.max(),ys.min(),ys.max(); g=0.07*F
    n2,l2,s2,c2=cv2.connectedComponentsWithStats(m)
    for j in range(1,n2):
        x,y,w,h,a=s2[j]
        if a<5 or core[l2==j].any(): continue
        if x+w>bx0-g and x<bx1+g and y+h>by0-g and y<by1+g and zone[int(c2[j][1]),int(c2[j][0])] and w<0.3*F and h<0.3*F:
            core|=(l2==j)
    # dark parts of the motif (dark brown / black-ish enamel): central zone, close to the core, never the brow/hair
    near=cv2.dilate(core.astype(np.uint8),cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(int(0.07*F)|1,int(0.07*F)|1))).astype(bool)
    add=darkraw&near&zone
    add=cv2.morphologyEx(add.astype(np.uint8),cv2.MORPH_OPEN,np.ones((2,2),np.uint8)).astype(bool)
    core|=add
    ys,xs=np.nonzero(core); bx0,bx1,by0,by1=xs.min(),xs.max()+1,ys.min(),ys.max()+1
    mk=cv2.dilate(core.astype(np.uint8),np.ones((5,5),np.uint8))
    full=np.zeros((Hh,Ww),np.uint8)
    nat=cv2.resize(mk,(x1-x0 if False else win.shape[1]//S,win.shape[0]//S),interpolation=cv2.INTER_AREA)
    full[y0:y0+nat.shape[0],x0:x0+nat.shape[1]]=(nat>0).astype(np.uint8)
    return dict(box=(x0+bx0/S,y0+by0/S,x0+bx1/S,y0+by1/S),w=(bx1-bx0)/S,h=(by1-by0)/S,mask=full)
