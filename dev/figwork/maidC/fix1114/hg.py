# hg.py make RAW OUT.png META.json   : 2x2 grid of the 4 heads (1024 each) for an ear-only edit
# hg.py paste RAW EDIT.png META.json OUT.png [zones]  : paste the edited ear zones back (aligned, feathered)
import sys,json,os,numpy as np,cv2
from PIL import Image,ImageFilter
Y=os.path.dirname(os.path.abspath(__file__))+"/cw/haar/yunet.onnx"; T=1024
def faces(im):
    W,H=im.size; sc=1600/W; sm=im.convert("RGB").resize((1600,int(H*sc)))
    d=cv2.FaceDetectorYN.create(Y,"",sm.size,0.5); n,f=d.detect(cv2.cvtColor(np.asarray(sm),cv2.COLOR_RGB2BGR))
    f=sorted(list(f),key=lambda x:-x[2]*x[3])[:4]; f=sorted(f,key=lambda x:x[0])
    return [[float(v)/sc for v in x[:4]] for x in f]
if sys.argv[1]=="make":
    raw,out,meta=sys.argv[2:5]; im=Image.open(raw).convert("RGB"); F=faces(im); assert len(F)==4,len(F)
    G=Image.new("RGB",(2*T,2*T)); boxes=[]
    for k,(x,y,w,h) in enumerate(F):
        s=w*2.6; cx=x+w/2; cy=y+h*0.75
        b=[int(cx-s/2),int(cy-s/2),int(cx+s/2),int(cy+s/2)]; boxes.append({"box":b,"face":[x,y,w,h]})
        G.paste(im.crop(b).resize((T,T),Image.LANCZOS),((k%2)*T,(k//2)*T))
    G.save(out); json.dump(boxes,open(meta,"w"))
else:
    raw,ed,meta,out=sys.argv[2:6]; which=sys.argv[6] if len(sys.argv)>6 else "0123"
    im=Image.open(raw).convert("RGB"); E=Image.open(ed).convert("RGB").resize((2*T,2*T),Image.LANCZOS)
    M=json.load(open(meta))
    for k,m in enumerate(M):
        if str(k) not in which: continue
        b=m["box"]; x,y,w,h=m["face"]; s=b[2]-b[0]; sc=T/s
        o=np.asarray(im.crop(b).resize((T,T),Image.LANCZOS)).astype(np.float32)
        e=np.asarray(E.crop(((k%2)*T,(k//2)*T,(k%2)*T+T,(k//2)*T+T))).astype(np.float32)
        (dx,dy),r=cv2.phaseCorrelate(cv2.cvtColor(o,cv2.COLOR_RGB2GRAY),cv2.cvtColor(e,cv2.COLOR_RGB2GRAY))
        e=cv2.warpAffine(e,np.float32([[1,0,-dx],[0,1,-dy]]),(T,T),borderMode=cv2.BORDER_REFLECT)
        # ear zones in tile coords
        fx=(x-b[0])*sc; fy=(y-b[1])*sc; fw=w*sc; fh=h*sc
        mk=np.zeros((T,T),np.float32)
        if os.environ.get("FULL"):   # whole head+ears (for mole removal): face box widened
            mk[int(max(0,fy+0.15*fh)):int(min(T,fy+1.35*fh)),int(max(0,fx-0.32*fw)):int(min(T,fx+fw+0.32*fw))]=1
        for x0,x1 in ((fx-0.32*fw,fx+0.14*fw),(fx+0.86*fw,fx+fw+0.32*fw)):
            mk[int(fy+0.30*fh):int(fy+1.35*fh),int(max(0,x0)):int(min(T,x1))]=1
        mk=cv2.GaussianBlur(mk,(0,0),fw*0.05)
        blend=o*(1-mk[...,None])+e*mk[...,None]
        tile=Image.fromarray(np.clip(blend,0,255).astype(np.uint8)).resize((s,s),Image.LANCZOS)
        a=Image.fromarray((np.clip(cv2.resize(mk,(s,s))*1.05,0,1)*255).astype(np.uint8))
        im.paste(tile,(b[0],b[1]),a)
        print(k,"shift",round(dx,1),round(dy,1),"resp",round(r,2))
    im.save(out)
