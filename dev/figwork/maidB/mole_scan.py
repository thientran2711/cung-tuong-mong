# mole.py [--fix] [--dbg out.jpg] FIG... : find small dark round spots (moles) on the cheeks (below eyes, beside nose) and, with --fix, retouch them with ring-median skin.
import sys,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+"/cf")
import numpy as np, cv2
from PIL import Image
from porcrop import find_face
args=sys.argv[1:]; fix="--fix" in args; dbg=None
if "--dbg" in args: i=args.index("--dbg"); dbg=args[i+1]; del args[i:i+2]
args=[a for a in args if a!="--fix"]; tiles=[]
for f in args:
    im=Image.open(f).convert("RGBA"); A=np.array(im).astype(float)
    cx,ey,fw,how=find_face(im)
    x0,x1=int(cx-0.6*fw),int(cx+0.6*fw); y0,y1=int(ey-0.75*fw),int(ey+0.95*fw)
    sub=A[y0:y1,x0:x1,:3].astype(np.uint8); g=cv2.cvtColor(sub,cv2.COLOR_RGB2GRAY)
    k=int(fw*0.12)|1; bg=cv2.medianBlur(g,k); d=bg.astype(int)-g.astype(int)
    m=((d>16)&(A[y0:y1,x0:x1,3]>250)).astype(np.uint8)
    n,lab,st,cen=cv2.connectedComponentsWithStats(m)
    found=[]
    for j in range(1,n):
        x,y,w,h,ar=st[j]; px,py=cen[j]
        rad=max(w,h)/2; rx=(px+x0-cx)/fw; ry=(py+y0-ey)/fw
        if not (fw*0.006<=rad<=fw*0.05): continue
        if ar<0.45*w*h or max(w,h)>2.2*min(w,h): continue
        if abs(rx)<0.13 and ry<0.62: continue      # nose
        if abs(rx)<0.30 and ry>0.55: continue      # mouth/lips
        if abs(rx)>0.48: continue                  # face edge / hair / earrings
        # skin around must be light
        R=int(max(4,3.5*rad)); yy0,xx0=int(py)-R,int(px)-R
        nb=g[max(0,yy0):int(py)+R+1,max(0,xx0):int(px)+R+1].astype(float)
        al=A[y0+max(0,yy0):y0+int(py)+R+1,x0+max(0,xx0):x0+int(px)+R+1,3]
        Y,X=np.mgrid[0:nb.shape[0],0:nb.shape[1]]; dd=np.hypot(Y+max(0,yy0)-py,X+max(0,xx0)-px)
        outer=nb[(dd>1.8*rad+1)]
        if al.min()<250 or np.median(outer)<150 or outer.min()<np.median(outer)-50 or outer.std()>22: continue
        found.append((int(px+x0),int(py+y0),max(3,int(rad*1.4)),round(rx,2),round(ry,2),int(d[int(py),int(px)])))
    found=[c for c in found if ((-0.52<=abs(c[3])*-1<=-0.12 and 0.0<=c[4]<=0.6) or (abs(c[3])<=0.45 and -0.65<=c[4]<=-0.25)) and c[5]>=22]
    found=sorted(found,key=lambda c:-c[5])[:1]
    print(os.path.basename(f),how,int(fw),found)
    if fix and found:
        for (x,y,r,*_) in found:
            yy,xx=np.mgrid[-3*r:3*r+1,-3*r:3*r+1]; dd=np.hypot(xx,yy); ring=(dd>1.6*r)&(dd<2.6*r)
            P=A[y-3*r:y+3*r+1,x-3*r:x+3*r+1,:3]; med=np.median(P[ring],axis=0)
            w=np.clip((1.7*r-dd)/(0.7*r),0,1)[...,None]; A[y-3*r:y+3*r+1,x-3*r:x+3*r+1,:3]=P*(1-w)+med*w
        Image.fromarray(A.astype(np.uint8)).save(f,lossless=False,quality=92) if f.endswith(".webp") else Image.fromarray(A.astype(np.uint8)).save(f)
    if dbg:
        T=Image.fromarray(np.array(im)[max(0,int(ey-0.5*fw)):int(ey+1.0*fw),int(cx-0.7*fw):int(cx+0.7*fw)]).convert("RGB")
        from PIL import ImageDraw; D=ImageDraw.Draw(T); ox,oy=int(cx-0.7*fw),max(0,int(ey-0.5*fw))
        for (x,y,r,*_) in found: D.ellipse((x-ox-2*r,y-oy-2*r,x-ox+2*r,y-oy+2*r),outline=(255,0,0),width=2)
        T=T.resize((220,int(220*T.height/T.width))); tiles.append(T)
if dbg and tiles:
    S=Image.new("RGB",(220*min(8,len(tiles)),max(t.height for t in tiles)*((len(tiles)+7)//8)),"white")
    for i,t in enumerate(tiles): S.paste(t,((i%8)*220,(i//8)*t.height))
    S.save(dbg)
