# mole.py detect OUT.jpg gen... : find small dark dots / red forehead marks on the 4 faces of a raw gen, write a review sheet + spots json
# mole.py fix SPOTS.json bgpng gen : inpaint those spots in a full-res cutout (same pixel grid as the gen)
import sys, os, json, subprocess
import numpy as np, cv2
from PIL import Image, ImageDraw
S="/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad"
db=json.load(open(S+"/urls_all.json"))
def full(cid):
    p=f"{S}/cache/full-{cid}.png"
    for t in range(5):
        if os.path.exists(p):
            try: Image.open(p).load(); return p
            except Exception: os.remove(p)
        subprocess.run(["curl","-sS","--retry","5","--retry-all-errors","-o",p,db[cid]])
    return p
def heads(A):
    H,W=A.shape[:2]; bgc=np.median(A[:6].reshape(-1,3),axis=0); m=np.linalg.norm(A.astype(np.float32)-bgc,axis=-1)>30
    out=[]
    for q in range(4):
        x0,x1=int(W*q/4),int(W*(q+1)/4); sub=m[:,x0:x1]
        rws=np.nonzero(sub.sum(1)>6)[0]; top=rws[0] if len(rws) else 0
        xs=[np.nonzero(sub[y])[0].mean() for y in range(top,min(H,top+int(H*.06))) if sub[y].any()]
        cx=int(x0+(np.median(xs) if xs else (x1-x0)/2)); side=int(H*.16)
        out.append((max(0,cx-side//2),max(0,top),side))
    return out
def detect(A, TD=None, TR=None):
    TD=TD or float(os.environ.get("TD","22")); TR=TR or float(os.environ.get("TR","14"))
    spots=[]
    for (x0,y0,side) in heads(A):
        C=A[y0:y0+side,x0:x0+side].astype(np.uint8)
        lab=cv2.cvtColor(C,cv2.COLOR_RGB2LAB).astype(np.float32)
        L=lab[...,0]; a=lab[...,1]
        R,G,B=[C[...,i].astype(int) for i in range(3)]
        skin=(R>150)&(R>=G)&(G>=B-8)&((R-B)>10)&((R-B)<110)&(L>150)
        skin=cv2.morphologyEx(skin.astype(np.uint8),cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
        k=max(15,side//14)|1
        g=cv2.equalizeHist(cv2.cvtColor(C,cv2.COLOR_RGB2GRAY))
        casc=cv2.CascadeClassifier(cv2.data.haarcascades+"haarcascade_frontalface_alt2.xml")
        fs=casc.detectMultiScale(g,1.05,4,minSize=(side//5,side//5))
        if len(fs)==0:
            casc=cv2.CascadeClassifier(cv2.data.haarcascades+"haarcascade_frontalface_default.xml"); fs=casc.detectMultiScale(g,1.05,3,minSize=(side//5,side//5))
        if len(fs)==0: continue
        fx,fy,fw,fh=max(fs,key=lambda f:f[2])
        dark=cv2.medianBlur(L.astype(np.uint8),k).astype(np.float32)-L
        red=a-cv2.medianBlur(a.astype(np.uint8),k).astype(np.float32)
        for kind,M,lo,hi in (("dark",dark>TD,5,40),("red",red>TR,6,side*side/250)):
            n,lb,st,cen=cv2.connectedComponentsWithStats(M.astype(np.uint8),8)
            for i in range(1,n):
                area=st[i,4]; w,h=st[i,2],st[i,3]
                if not(lo<=area<=hi) or max(w,h)>2.2*min(w,h)+2: continue
                blob=(lb==i).astype(np.uint8)
                ring=cv2.dilate(blob,np.ones((9,9),np.uint8))-cv2.dilate(blob,np.ones((3,3),np.uint8))
                fr=skin[ring>0].mean() if ring.sum() else 0
                if fr<0.92: continue
                cy,cx=cen[i]; cx,cy=cen[i]
                u=(cx-fx)/fw; v=(cy-fy)/fh
                if not(0.08<u<0.92 and 0.08<v<0.92): continue
                pk=float((dark if kind=="dark" else red)[lb==i].max())
                if kind=="dark" and pk<float(os.environ.get("PK","48")): continue      # outside the face
                if abs(u-0.5)<0.17 and 0.5<v<0.76 and kind=="dark": continue   # nostrils
                if abs(u-0.5)<0.26 and 0.74<v<0.95: continue      # mouth
                if kind=="red" and not(abs(u-0.5)<0.15 and v<0.42): continue   # red marks only between the brows
                spots.append(dict(kind=kind,x=int(x0+cx),y=int(y0+cy),r=int(max(w,h)/2+3),area=int(area),pk=round(pk)))
    return spots
def cmd_detect(out, gens):
    rows=[]; allsp={}
    for g in gens:
        jid,gid=g.split(":")
        A=np.asarray(Image.open(full(gid)).convert("RGB"))
        sp=detect(A); allsp[jid]=dict(gen=gid,spots=sp)
        T=230; r=Image.new("RGB",(T*4,T+14),"white"); d=ImageDraw.Draw(r); d.text((2,1),f"{jid} {len(sp)}",fill="black")
        for i,(x0,y0,side) in enumerate(heads(A)):
            c=Image.fromarray(A[y0:y0+side,x0:x0+side].copy()); dd=ImageDraw.Draw(c)
            for s in sp:
                if x0<=s["x"]<x0+side and y0<=s["y"]<y0+side:
                    X,Y=s["x"]-x0,s["y"]-y0; rr=s["r"]+8
                    dd.ellipse((X-rr,Y-rr,X+rr,Y+rr),outline=(0,200,255) if s["kind"]=="dark" else (0,255,0),width=3)
            r.paste(c.resize((T,T)),(T*i,14))
        rows.append(r)
    cols=2; M=Image.new("RGB",(rows[0].width*cols,rows[0].height*((len(rows)+1)//2)),"white")
    for i,r in enumerate(rows): M.paste(r,((i%cols)*r.width,(i//cols)*r.height))
    M.save(out,quality=88)
    jf=os.environ.get("SPOTS",S+"/spots.json"); old=json.load(open(jf)) if os.path.exists(jf) else {}
    old.update(allsp); json.dump(old,open(jf,"w"),indent=0); print(M.size, sum(len(v["spots"]) for v in allsp.values()))
def inpaint(im_rgba, spots):
    A=np.array(im_rgba); rgb=np.ascontiguousarray(A[...,:3]); mask=np.zeros(rgb.shape[:2],np.uint8)
    for s in spots: cv2.circle(mask,(s["x"],s["y"]),s["r"]+2,255,-1)
    rgb=cv2.inpaint(rgb,mask,7,cv2.INPAINT_TELEA); A[...,:3]=rgb; return Image.fromarray(A)
if __name__=="__main__":
    if sys.argv[1]=="detect": cmd_detect(sys.argv[2],sys.argv[3:])

def cmd_fix(jid, gid, paths):
    # detect on the raw gen, inpaint the same spots in every given full-res image (cutout and gen copy)
    A=np.asarray(Image.open(full(gid)).convert("RGB")); sp=detect(A)
    mask=np.zeros(A.shape[:2],np.uint8)
    for s in sp: cv2.circle(mask,(s["x"],s["y"]),s["r"]+2,255,-1)
    fixed=cv2.inpaint(np.ascontiguousarray(A),mask,7,cv2.INPAINT_TELEA)   # inpaint on the full painting (no black transparent pixels)
    for p in paths:
        im=Image.open(p); mode=im.mode; B=np.array(im.convert("RGBA"))
        B[mask>0,:3]=fixed[mask>0]
        out=Image.fromarray(B); (out if mode=="RGBA" else out.convert("RGB")).save(p)
    jf=S+"/spots_fixed.json"; old=json.load(open(jf)) if os.path.exists(jf) else {}
    old[jid]=dict(gen=gid,spots=sp); json.dump(old,open(jf,"w"),indent=0)
    print(jid,len(sp),"spots")
if __name__=="__main__" and sys.argv[1]=="fix": cmd_fix(sys.argv[2],sys.argv[3],sys.argv[4:])
