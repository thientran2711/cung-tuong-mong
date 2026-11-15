# hmeas.py: measure huadian width on a18 portraits. writes meas.json; debug crops with box
import sys,os,json,glob,re,numpy as np,cv2
sys.path.insert(0,os.path.dirname(__file__))
from face import face
TH=float(os.environ.get("TH","10"))
def detect(rgb,cx,ey,fw,TH=TH,TL=20):
    x0,x1=int(cx-0.26*fw),int(cx+0.26*fw); y0,y1=int(ey-0.52*fw),int(ey-0.06*fw)
    S=4; win=cv2.resize(rgb[y0:y1,x0:x1],None,fx=S,fy=S,interpolation=cv2.INTER_CUBIC)
    lab=cv2.cvtColor(win,cv2.COLOR_RGB2LAB).astype(np.float32)
    L,A,B=lab[...,0],lab[...,1],lab[...,2]
    k=int(0.22*fw*S)|1
    bg=np.dstack([cv2.medianBlur(np.clip(lab[...,i],0,255).astype(np.uint8),min(k,255)).astype(np.float32) for i in range(3)])
    dab=np.hypot(A-bg[...,1],B-bg[...,2]); dl=bg[...,0]-L
    ch=np.hypot(A-128,B-128); chb=np.hypot(bg[...,1]-128,bg[...,2]-128)
    m=(((dab>TH)&(ch>chb+4))|((np.abs(dl)>TL)&(dab>4)))&(L>75)&(bg[...,0]>150)
    m&=~((L<140)&(ch<24))
    m=m.astype(np.uint8)
    m=cv2.morphologyEx(m,cv2.MORPH_OPEN,np.ones((3,3),np.uint8)); m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((7,7),np.uint8))
    n,lbl,st,cen=cv2.connectedComponentsWithStats(m)
    H,W=m.shape; c=(W/2,H*0.62); F=fw*S; best=None
    for i in range(1,n):
        x,y,w,h,a=st[i]
        if a<25 or x<=1 or x+w>=W-1 or y<=1: continue
        if w>0.32*F or h>0.32*F: continue
        if abs(cen[i][0]-c[0])>0.10*F or abs(cen[i][1]-c[1])>0.22*F: continue
        sc=a-2*abs(cen[i][0]-c[0])
        if best is None or sc>best[0]: best=(sc,x,y,x+w,y+h)
    if not best: return None,(x0,y0,x1,y1),win
    _,bx0,by0,bx1,by1=best
    for _ in range(2):
        for i in range(1,n):
            X,Y,Wd,Hd,A_=st[i]
            if A_<12 or X<=1 or X+Wd>=W-1: continue
            g=0.035*F
            sc_=((bx0+bx1)/2,(by0+by1)/2)
            if X<bx1+g and X+Wd>bx0-g and Y<by1+g and Y+Hd>by0-g and Wd<0.16*F and Hd<0.2*F and abs(X+Wd/2-sc_[0])<0.14*F:
                bx0,by0,bx1,by1=min(bx0,X),min(by0,Y),max(bx1,X+Wd),max(by1,Y+Hd)
    return ((bx1-bx0)/S,(by1-by0)/S,bx0/S+x0,by0/S+y0),(x0,y0,x1,y1),win
if __name__=="__main__":
    out={}; REF=json.load(open("ref.json")) if os.path.exists("ref.json") else {}
    for p in sys.argv[1:]:
        k=os.path.basename(p)[4:-5]
        cx,ey,fw,ed,rgb=face(p)
        pid=k.rsplit('-',2)[0]
        if pid in REF and abs(fw-REF[pid][2])>0.1*REF[pid][2]: cx,ey=REF[pid][0],REF[pid][1]
        fw=REF.get(pid,(0,0,fw))[2]
        r,wb,_=detect(rgb,cx,ey,fw)
        if r is None or r[0]/fw<0.05:
            r2,wb,_=detect(rgb,cx,ey,fw,TH=6,TL=12)
            if r2 and (r is None or r2[0]>r[0]) and r2[0]/fw<0.3: r=r2
        out[k]=dict(cx=cx,ey=ey,fw=fw,ed=ed,hw=r and r[0],hh=r and r[1],bx=r and r[2],by=r and r[3])
    json.dump(out,open(os.environ.get("OUT","meas.json"),"w"),indent=0)
