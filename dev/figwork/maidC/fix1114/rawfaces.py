# rawfaces.py OUT png... : for each raw lineup png, 4 face crops (yunet over whole image) + small full thumb
import sys,os,numpy as np,cv2
from PIL import Image,ImageDraw,ImageFont
Y=os.path.dirname(os.path.abspath(__file__))+"/cw/haar/yunet.onnx"; S=int(os.environ.get("SZ","300")); FS=float(os.environ.get("FS","1.5"))
F=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",20)
out=sys.argv[1]; ps=sys.argv[2:]
TH=S*2
G=Image.new("RGB",(S*4+TH*2,S*len(ps)),(240,235,225)); d=ImageDraw.Draw(G)
for r,p in enumerate(ps):
    im=Image.open(p).convert("RGB"); W,H=im.size; sc=1600/W; sm=im.resize((1600,int(H*sc)))
    det=cv2.FaceDetectorYN.create(Y,"",sm.size,0.5); n,f=det.detect(cv2.cvtColor(np.asarray(sm),cv2.COLOR_RGB2BGR))
    f=sorted([x for x in (f if f is not None else [])],key=lambda x:-x[2]*x[3])[:4]; f=sorted(f,key=lambda x:x[0])
    for c,x in enumerate(f):
        X,Yy,w,h=[v/sc for v in x[:4]]; cx=X+w/2; cy=Yy+h*0.4; s=w*FS
        G.paste(im.crop((int(cx-s/2),int(cy-s/2),int(cx+s/2),int(cy+s/2))).resize((S,S),Image.LANCZOS),(c*S,r*S))
    t=im.resize((TH*2,int(H*TH*2/W))); G.paste(t,(S*4,r*S))
    d.text((S*4+4,r*S+4),os.path.basename(p),fill=(0,0,0),font=F)
G.save(out,quality=88)
