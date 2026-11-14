# molescan.py OUT.jpg por... : candidate dark spots on cheeks/forehead of por images
import sys,cv2,numpy as np
from PIL import Image,ImageDraw
det=cv2.FaceDetectorYN.create("/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad/cwA/haar/yunet.onnx","",(384,506),0.6)
res=[]
for f in sys.argv[2:]:
    im=Image.open(f).convert("RGBA"); bg=Image.new("RGB",im.size,(255,255,255)); bg.paste(im,mask=im.split()[3]); A=np.asarray(bg)
    det.setInputSize(A.shape[1::-1]); _,fs=det.detect(cv2.cvtColor(A,cv2.COLOR_RGB2BGR))
    if fs is None: res.append((0,f,None)); continue
    x,y,w,h=fs[0][:4].astype(int); lm=fs[0][4:14].reshape(5,2)
    g=cv2.cvtColor(A,cv2.COLOR_RGB2GRAY).astype(np.float32)
    loc=cv2.GaussianBlur(g,(0,0),4)-g
    lab=cv2.cvtColor(A,cv2.COLOR_RGB2LAB); L=lab[...,0].astype(int)
    m=np.zeros(g.shape,bool); m[max(0,y):y+h, max(0,x):x+w]=True
    # exclude eyes, brows, nose tip, mouth
    for (px,py),r in zip(lm,[0.17,0.17,0.12,0.14,0.14]):
        rr=int(w*r); cv2.circle_mask=None
        yy,xx=np.ogrid[:g.shape[0],:g.shape[1]]; m&=~(((xx-px)**2+((yy-py)*1.6)**2)<rr*rr)
    ey=lm[:2,1].mean(); my=lm[3:,1].mean(); exl=min(lm[0,0],lm[1,0]); exr=max(lm[0,0],lm[1,0])
    box=np.zeros(g.shape,bool); box[int(ey+0.07*h):int(my+0.06*h), int(exl-0.14*w):int(exr+0.14*w)]=True
    fb=np.zeros(g.shape,bool); fb[int(ey-0.30*h):int(ey-0.10*h), int(exl):int(exr)]=True
    m&=(box|fb)
    nx,ny=lm[2]; m[int(ny-0.12*h):int(ny+0.13*h), int(nx-0.15*w):int(nx+0.15*w)]=False
    m[int(my-0.08*h):int(my+0.08*h), int(lm[3,0]-0.06*w):int(lm[4,0]+0.06*w)]=False
    sk=cv2.blur(((L>150)&(A[...,0].astype(int)>A[...,2].astype(int))).astype(np.float32),(15,15)); m&=sk>0.85
    m&=L>140
    sc=np.where(m,loc,0)
    pts=[]
    for _ in range(3):
        yx=np.unravel_index(np.argmax(sc),sc.shape); v=sc[yx]
        if v<8: break
        pts.append((int(yx[1]),int(yx[0]),float(v))); cv2.circle(sc,(int(yx[1]),int(yx[0])),8,0,-1)
    res.append((pts[0][2] if pts else 0,f,pts))
res.sort(key=lambda r:-r[0])
for s,f,p in res[:80]: print(round(s,1),f.split('/')[-1],p)
top=[r for r in res if r[2]][:int(sys.argv[1].split(':')[1]) if ':' in sys.argv[1] else 48]
cols=8; T=200
S=Image.new("RGB",(cols*T,((len(top)+cols-1)//cols)*(T+14)),"white"); d=ImageDraw.Draw(S)
for i,(s,f,p) in enumerate(top):
    im=Image.open(f).convert("RGBA"); bg=Image.new("RGB",im.size,(255,255,255)); bg.paste(im,mask=im.split()[3])
    x,y=p[0][0],p[0][1]; c=bg.crop((x-60,y-60,x+60,y+60)).resize((T,T)); dd=ImageDraw.Draw(c); dd.ellipse((T/2-14,T/2-14,T/2+14,T/2+14),outline="blue")
    S.paste(c,((i%cols)*T,(i//cols)*(T+14))); d.text(((i%cols)*T+2,(i//cols)*(T+14)+T),f"{i} {f.split('por-maid-')[1][:12]} {s:.0f}",fill="red")
S.save(sys.argv[1].split(':')[0],quality=85)
