# hd.py make JID BG OUT.png : 2x2 grid (1024/tile) of the 4 heads of bg/<JID>-<BG>.png (composited on parchment) + hgrid/<JID>.json
# hd.py paste JID BG EDIT.png [tiles] : paste forehead zone of the edited grid back into bg/<JID>-<BG>.png (RGB only, alpha kept; backup .prehd.png)
# env UP/RX/RY: forehead ellipse centre above eye midline and radii, in eye-distance units
import sys,json,os,shutil,numpy as np,cv2
from PIL import Image
os.chdir(os.path.dirname(os.path.abspath(__file__)))
Y="yunet.onnx"; T=1024; os.makedirs("hgrid",exist_ok=True)
def flat(p):
    im=Image.open(p).convert("RGBA"); b=Image.new("RGBA",im.size,(235,225,205,255)); b.alpha_composite(im); return im,b.convert("RGB")
def faces(im):
    W,H=im.size; sc=2000/W; sm=im.resize((2000,int(H*sc)))
    d=cv2.FaceDetectorYN.create(Y,"",sm.size,0.5); n,f=d.detect(cv2.cvtColor(np.asarray(sm),cv2.COLOR_RGB2BGR))
    f=sorted(list(f),key=lambda x:-x[2]*x[3])[:4]; f=sorted(f,key=lambda x:x[0])
    return [[float(v)/sc for v in x[:14]] for x in f]
cmd,jid,bg=sys.argv[1:4]; P=f"bg/{jid}-{bg}.png"; M=f"hgrid/{jid}.json"
if cmd=="make":
    src=P+".prehd.png" if os.path.exists(P+".prehd.png") else P
    rgba,im=flat(src); F=faces(im); assert len(F)==4,(jid,len(F))
    G=Image.new("RGB",(2*T,2*T)); meta=[]
    for k,f in enumerate(F):
        x,y,w,h=f[:4]; ex=(f[4]+f[6])/2; ey=(f[5]+f[7])/2; d=abs(f[6]-f[4])
        s=int(w*1.9); cx=ex; cy=ey-0.1*d
        b=[int(cx-s/2),int(cy-s/2),int(cx-s/2)+s,int(cy-s/2)+s]; meta.append({"box":b,"eye":[ex,ey,d]})
        G.paste(im.crop(b).resize((T,T),Image.LANCZOS),((k%2)*T,(k//2)*T))
    G.save(sys.argv[4]); json.dump(meta,open(M,"w")); print(jid,"grid",[m["box"][2]-m["box"][0] for m in meta])
else:
    ed=sys.argv[4]; which=sys.argv[5] if len(sys.argv)>5 else "0123"
    if not os.path.exists(P+".prehd.png"): shutil.copy(P,P+".prehd.png")
    rgba,im=flat(P+".prehd.png"); A=np.array(rgba)
    E=Image.open(ed).convert("RGB").resize((2*T,2*T),Image.LANCZOS); meta=json.load(open(M))
    UP=float(os.environ.get("UP","0.62")); RX=float(os.environ.get("RX","0.34")); RY=float(os.environ.get("RY","0.36")); DX=float(os.environ.get("DX","0")); DY=float(os.environ.get("DY","0")); TH=float(os.environ.get("TH","22"))
    UP=float(os.environ.get("UP","0.62")); RX=float(os.environ.get("RX","0.34")); RY=float(os.environ.get("RY","0.36"))
    OV={int(a.split(":")[0]):[float(v) for v in a.split(":")[1].split(",")] for a in os.environ.get("DOT","").split() if a}  # DOT="1:0.0,0.1" per-tile override (x,y in d units)
    TL=[]
    for k,m in enumerate(meta):
        b=m["box"]; s=b[2]-b[0]; sc=T/s; ex,ey,d=m["eye"]
        o=np.asarray(im.crop(b).resize((T,T),Image.LANCZOS)).astype(np.float32)
        e=np.asarray(E.crop(((k%2)*T,(k//2)*T,(k%2)*T+T,(k//2)*T+T))).astype(np.float32)
        (dx,dy),r=cv2.phaseCorrelate(cv2.cvtColor(o,cv2.COLOR_RGB2GRAY),cv2.cvtColor(e,cv2.COLOR_RGB2GRAY))
        e=cv2.warpAffine(e,np.float32([[1,0,-dx],[0,1,-dy]]),(T,T),borderMode=cv2.BORDER_REFLECT)
        cx=(ex-b[0])*sc; cy=(ey-b[1])*sc-UP*d*sc; D=d*sc
        # find the new mark in the edit: most salient compact roundish blob vs median-blurred skin, narrow forehead window
        win=np.zeros((T,T),np.uint8); cv2.ellipse(win,(int(cx),int(cy+0.05*D)),(int(float(os.environ.get("WX","0.32"))*D),int(0.35*D)),0,0,360,1,-1)
        eu=np.clip(e,0,255).astype(np.uint8); kz=int(0.35*D)|1
        dev=np.abs(e-cv2.medianBlur(eu,kz).astype(np.float32)).max(axis=2)*win
        dev=cv2.GaussianBlur(dev,(0,0),2); th=dev.max()*0.35
        n,lab,st,cen=cv2.connectedComponentsWithStats((dev>th).astype(np.uint8))
        best=None
        for i in range(1,n):
            w_,h_=st[i,2]/D,st[i,3]/D
            if not(0.04<w_<0.3 and 0.04<h_<0.3 and 0.6<w_/h_<1.6): continue
            sc_=dev[lab==i].max()*min(1,st[i,4]/(0.6*st[i,2]*st[i,3]))
            if best is None or sc_>best[0]: best=(sc_,i)
        if best is None: p=[None,None,0,0]
        else: bi=best[1]; p=[(cen[bi][0]-cx)/D,(cen[bi][1]-cy)/D,st[bi,2]/D,st[bi,3]/D]
        TL.append(dict(b=b,s=s,o=o,e=e,cx=cx,cy=cy,D=D,p=p,sh=(dx,dy,r)))
    good=[t["p"] for t in TL if t["p"][0] is not None]
    mxm=float(np.median([p[0] for p in good])) if good else 0.0; mym=float(np.median([p[1] for p in good])) if good else 0.1; szm=float(np.median([p[2]+p[3] for p in good])) if good else 0.3
    for k,t in enumerate(TL):
        p=t["p"]; tag=""
        if k in OV: p=OV[k]+p[2:]; tag="OVERRIDE"
        elif p[0] is None or ((abs(p[0]-mxm)>0.12 or abs(p[1]-mym)>0.12) and abs(p[2]+p[3]-szm)>0.12*szm): p=[mxm,mym]+p[2:]; tag="OUTLIER->median"
        print(jid,k,"dot",round(p[0],2),round(p[1],2),"size/d",round(p[2],2),round(p[3],2),tag,"shift",round(t["sh"][0],1),round(t["sh"][1],1),"resp",round(t["sh"][2],2))
        meta[k]["dot"]=[float(v) for v in p]
        if str(k) not in which: continue
        D=t["D"]; o,e,b,s=t["o"],t["e"],t["b"],t["s"]
        mk=np.zeros((T,T),np.float32); cv2.ellipse(mk,(int(t["cx"]+p[0]*D),int(t["cy"]+p[1]*D)),(int(RX*D),int(RY*D)),0,0,360,1,-1); mk=cv2.GaussianBlur(mk,(0,0),D*0.04)
        blend=o*(1-mk[...,None])+e*mk[...,None]
        tile=np.asarray(Image.fromarray(np.clip(blend,0,255).astype(np.uint8)).resize((s,s),Image.LANCZOS)).astype(np.float32)
        ms=cv2.resize(mk,(s,s))[...,None]
        y0,x0=b[1],b[0]; reg=A[y0:y0+s,x0:x0+s,:3].astype(np.float32)
        A[y0:y0+s,x0:x0+s,:3]=np.clip(reg*(1-ms)+tile*ms,0,255).astype(np.uint8)
    Image.fromarray(A).save(P); json.dump(meta,open(M,"w"))
