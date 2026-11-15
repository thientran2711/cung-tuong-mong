# demole_por.py [-n] files... : remove small dark spots (moles / beads / forehead marks) in the forehead + between-brows area
# of cut portraits / figures (webp, in place). Face box via haar (opencv 4.10 in .cache/pylib). -n = dry run. Prints hits per file.
import sys,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+"/.cache/pylib")
import cv2,numpy as np
from PIL import Image
cc=cv2.CascadeClassifier(cv2.data.haarcascades+"haarcascade_frontalface_default.xml")
DRY='-n' in sys.argv; TH=int(next((x[3:] for x in sys.argv if x.startswith("th=")),"16"))
for f in [x for x in sys.argv[1:] if not x.startswith('-') and '=' not in x]:
    im0=Image.open(f).convert("RGBA"); FIG=os.path.basename(f).startswith("fig-"); S=4 if FIG else 1
    im=im0.crop((0,0,im0.width,int(im0.height*.2))).resize((im0.width*S,int(im0.height*.2)*S),Image.LANCZOS) if FIG else im0   # figs: head area x4
    arr=np.asarray(im).copy(); a=arr[...,3]; rgb=arr[...,:3].copy()
    bg=rgb.copy(); bg[a<128]=200; g=cv2.cvtColor(bg,cv2.COLOR_RGB2GRAY)
    fs=cc.detectMultiScale(g,1.08,4,minSize=(max(18,im.width//12),)*2)
    if not len(fs): print(f,"NOFACE"); continue
    x,y,w,h=max(fs,key=lambda r:r[2]*r[3])
    L=g.astype(int); k=max(5,int(w*.12)|1); med=cv2.medianBlur(g,k).astype(int)
    allow=np.zeros(L.shape,bool)
    allow[max(0,y-int(.05*h)):y+int(.29*h), x+int(.38*w):x+int(.62*w)]=True       # central forehead strip down to the brow line
    # (tested on kc por 384x506: real marks sit at dy .24-.27h, dx .46-.52w; brow heads/eye corners start at dy .31h)
    cand=((med-L)>TH)&allow&(a>200)
    n,lab,st,_=cv2.connectedComponentsWithStats(cand.astype(np.uint8),8)
    mask=np.zeros(L.shape,np.uint8); hits=[]
    for i in range(1,n):
        bx,by,bw,bh,ar=st[i]
        if ar<2 or ar>max(6,.004*w*w) or max(bw,bh)>max(4,.07*w) or max(bw,bh)>2.2*min(bw,bh)+1: continue
        r=max(2,int(.03*w)); ya,yb,xa,xb=max(0,by-r),by+bh+r,max(0,bx-r),bx+bw+r
        blob=(lab[ya:yb,xa:xb]==i).astype(np.uint8); big=cv2.dilate(blob,np.ones((3,3),np.uint8)); ring=~(cv2.dilate(big,np.ones((3,3),np.uint8)).astype(bool))
        sk=rgb[ya:yb,xa:xb][ring]; ll=L[ya:yb,xa:xb][ring]
        if len(ll)==0 or ((sk[:,0]>170)&(sk[:,1]>135)&(sk[:,2]>115)).mean()<.95 or ll.std()>14: continue
        hits.append((int(bx),int(by),int(bw),int(bh))); mask[ya:yb,xa:xb]|=big
    if os.environ.get("DBG"): print(x,y,w,h)
    if hits and not DRY:
        A=np.asarray(im0).copy(); m=cv2.dilate(mask,np.ones((3,3),np.uint8))
        if FIG:
            m0=np.zeros(A.shape[:2],np.uint8); mm=cv2.resize(m,(A.shape[1],m.shape[0]//S),interpolation=cv2.INTER_AREA); m0[:mm.shape[0]]=(mm>0)
            m=cv2.dilate(m0,np.ones((2,2),np.uint8))
        A[...,:3]=cv2.inpaint(np.ascontiguousarray(A[...,:3]),m,3,cv2.INPAINT_TELEA); Image.fromarray(A,"RGBA").save(f,"WEBP",quality=86,method=4)
    print(os.path.basename(f),"spots",len(hits),hits if hits else "")
