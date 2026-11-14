# demole.py in.png out.png [-v] : remove small isolated dark spots (moles/beauty marks) on the FACE of each of the 4 lineup figures.
# Face band per figure from the alpha (or non-parchment) silhouette: head unit hu = height/7.5, band = top+0.33hu .. top+1.0hu,
# skips the nose column (|x-cx|<0.09hu) so nostrils stay; spot must be compact, much darker than its 21px median, on smooth light skin.
import sys,cv2,numpy as np
src,dst=sys.argv[1],sys.argv[2]; V='-v' in sys.argv; TH=int(next((x[3:] for x in sys.argv if x.startswith("th=")),"25"))
im=cv2.imread(src,cv2.IMREAD_UNCHANGED); a=None
if im.ndim==3 and im.shape[2]==4: a=im[...,3]; bgr=np.ascontiguousarray(im[...,:3])
else: bgr=im[...,:3]
Hh,Ww=bgr.shape[:2]; s=Ww/3840.0
if a is not None: fg=a>128
else:
    ref=np.median(np.concatenate([bgr[:20,:20].reshape(-1,3),bgr[:20,-20:].reshape(-1,3)]),0)
    fg=np.abs(bgr.astype(int)-ref).sum(2)>40
L=cv2.cvtColor(bgr,cv2.COLOR_BGR2GRAY).astype(int)
k=int(21*s)|1; med=cv2.medianBlur(L.astype(np.uint8),max(5,k)).astype(int)
cand=((med-L)>TH)&fg
allow=np.zeros_like(cand); nose=[]
for q in range(4):
    x0,x1=q*Ww//4,(q+1)*Ww//4; col=fg[:,x0:x1]; rows=np.nonzero(col.sum(1)>3)[0]
    if len(rows)==0: continue
    top,bot=rows[0],rows[-1]; hu=(bot-top)/7.5
    y0,y1=int(top+0.33*hu),int(top+1.0*hu)
    seg=fg[int(top+0.5*hu):int(top+hu),x0:x1]; xs=np.nonzero(seg.any(0))[0]
    cx=x0+(xs[0]+xs[-1])/2 if len(xs) else (x0+x1)/2
    allow[y0:y1,x0:x1]=True; nose.append((cx,hu,x0,x1))
cand&=allow
n,lab,st,cen=cv2.connectedComponentsWithStats(cand.astype(np.uint8),8)
pre=[]
mask=np.zeros(L.shape,np.uint8); B,G,R=[bgr[...,i].astype(int) for i in range(3)]; hits=[]
for i in range(1,n):
    x,y,w,h,ar=st[i]
    if not (3*s*s<=ar<=160*s*s) or max(w,h)>18*s or max(w,h)>2.6*min(w,h)+2: continue
    cxb=x+w/2
    r=int(6*s)+3; xa,ya,xb,yb=max(0,x-r),max(0,y-r),min(Ww,x+w+r),min(Hh,y+h+r)
    blob=(lab[ya:yb,xa:xb]==i); big=cv2.dilate(blob.astype(np.uint8),np.ones((5,5),np.uint8)); ring=~big.astype(bool)
    rr,gg,bb,ll=R[ya:yb,xa:xb][ring],G[ya:yb,xa:xb][ring],B[ya:yb,xa:xb][ring],L[ya:yb,xa:xb][ring]
    if ((rr>185)&(gg>150)&(bb>130)).mean()<0.97 or ll.std()>14: continue
    pre.append((i,x,y,w,h,(ya,yb,xa,xb),big))
for i,x,y,w,h,(ya,yb,xa,xb),big in pre:
    if min(w,h)<2*s or (w>=1.2*h and w>=6*s) or max(w,h)>6*s or max(w,h)>2*min(w,h)+1: continue          # hair strand / nostril shape
    if any(j!=i and abs(x2-x)<32*s and abs(y2-y)<9*s for j,x2,y2,*_ in pre): continue   # nostril pair
    hits.append((int(x),int(y),int(w),int(h))); mask[ya:yb,xa:xb]|=big
for arg in sys.argv:   # manual spots: spot=x,y (full-res coords): darkest small blob within 8px is inpainted
    if arg.startswith('spot='):
        x,y=map(int,arg[5:].split(',')); r=int(8*s)+2; win=L[y-r:y+r,x-r:x+r]; yy,xx=np.unravel_index(win.argmin(),win.shape)
        cv2.circle(mask,(x-r+xx,y-r+yy),max(3,int(4*s)),1,-1); hits.append(('manual',x-r+int(xx),y-r+int(yy)))
out=cv2.inpaint(bgr,mask,max(3,int(5*s)),cv2.INPAINT_TELEA)
if a is not None: out=np.dstack([out,a])
cv2.imwrite(dst,out); print(src.split('/')[-1],"spots",len(hits),hits if V else "")
