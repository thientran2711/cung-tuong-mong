# molescan.py OUT.jpg[:N] por... : rank small dark/red dots on cheek+forehead skin of portraits (384x506); sheet of top N crops
import sys,os
import numpy as np,cv2
from PIL import Image,ImageDraw
fc=cv2.CascadeClassifier(cv2.data.haarcascades+"haarcascade_frontalface_alt2.xml")
res=[]
for f in sys.argv[2:]:
    im=Image.open(f).convert("RGBA"); b=Image.new("RGB",im.size,(255,255,255)); b.paste(im,mask=im.split()[3])
    A=np.asarray(b); g=cv2.cvtColor(A,cv2.COLOR_RGB2GRAY)
    fs=fc.detectMultiScale(cv2.equalizeHist(g),1.1,4,minSize=(80,80))
    if len(fs): x,y,w,h=max(fs,key=lambda r:r[2]*r[3])
    else: x,y,w,h=110,120,164,190
    lab=cv2.cvtColor(A,cv2.COLOR_RGB2LAB).astype(np.float32); L=lab[...,0]; a=lab[...,1]
    dark=cv2.GaussianBlur(L,(0,0),3.0)-L
    red=a-cv2.GaussianBlur(a,(0,0),3.0)
    m=np.zeros(L.shape,bool)
    def box(x0,y0,x1,y1,v=True): m[int(y+y0*h):int(y+y1*h),int(x+x0*w):int(x+x1*w)]=v
    box(0.08,0.02,0.92,0.30)          # forehead
    box(0.05,0.48,0.32,0.80)          # left cheek
    box(0.68,0.48,0.95,0.80)          # right cheek
    box(0.30,0.80,0.70,0.98)          # chin
    box(0.20,0.58,0.80,0.90,False)    # nose/mouth exclusion
    skin=(L>120)&(A[...,0].astype(int)>150)
    sk=cv2.blur(skin.astype(np.float32),(11,11))>0.9
    m&=sk
    sc=np.where(m,np.maximum(dark,1.6*red),0)
    n,lb,st,cen=cv2.connectedComponentsWithStats((sc>9).astype(np.uint8),8)
    pts=[]
    for i in range(1,n):
        ar=st[i,4]; bw,bh=st[i,2],st[i,3]
        if not(2<=ar<=40) or max(bw,bh)>2.3*max(1,min(bw,bh)) or max(bw,bh)>9: continue
        v=float(sc[lb==i].max()); pts.append((int(cen[i][0]),int(cen[i][1]),v))
    pts.sort(key=lambda q:-q[2]); pts=pts[:2]
    res.append((pts[0][2] if pts else 0,f,pts))
res.sort(key=lambda r:-r[0])
n=int(sys.argv[1].split(':')[1]) if ':' in sys.argv[1] else 48
for s,f,p in res[:n]: print(round(s,1),os.path.basename(f),p)
top=[r for r in res if r[2]][:n]; cols=8; T=180
S=Image.new("RGB",(cols*T,((len(top)+cols-1)//cols)*(T+14)),"white"); d=ImageDraw.Draw(S)
for i,(s,f,p) in enumerate(top):
    im=Image.open(f).convert("RGBA"); b=Image.new("RGB",im.size,(255,255,255)); b.paste(im,mask=im.split()[3])
    x,y=p[0][0],p[0][1]; c=b.crop((x-36,y-36,x+36,y+36)).resize((T,T),Image.LANCZOS); dd=ImageDraw.Draw(c); dd.ellipse((T/2-16,T/2-16,T/2+16,T/2+16),outline="blue")
    S.paste(c,((i%cols)*T,(i//cols)*(T+14))); d.text(((i%cols)*T+2,(i//cols)*(T+14)+T),f"{i} {os.path.basename(f)[4:-5]} {s:.0f}",fill="red")
S.save(sys.argv[1].split(':')[0],quality=85)
