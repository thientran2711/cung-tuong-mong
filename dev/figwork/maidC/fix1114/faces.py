# faces.py OUT tier ids... : face crops (yunet) at 3x, rows=ids cols=ages. env DIR = image dir
import sys,os,numpy as np,cv2
from PIL import Image,ImageDraw,ImageFont
R=os.environ.get("DIR","/home/user/cung-tuong-mong/.claude/worktrees/agent-ade4e7b6002d975ea/img/")
Y=os.path.dirname(os.path.abspath(__file__))+"/cw/haar/yunet.onnx"
out,tier=sys.argv[1],sys.argv[2]; ids=sys.argv[3:]; S=int(os.environ.get("SZ","240"))
F=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",20)
G=Image.new("RGB",(S*4+60,S*len(ids)),(240,235,225)); d=ImageDraw.Draw(G)
def face(im):
    w,h=im.size; top=int(h*0.3); b=Image.new("RGB",(w,top),(255,255,255)); c=im.crop((0,0,w,top)); b.paste(c,(0,0),c)
    det=cv2.FaceDetectorYN.create(Y,"",(w,top),0.5); n,r=det.detect(cv2.cvtColor(np.asarray(b),cv2.COLOR_RGB2BGR))
    if r is None: return None
    return max(r,key=lambda x:x[2]*x[3])[:4]
for r,i in enumerate(ids):
    d.text((4,r*S+10),i,fill=(0,0,0),font=F)
    for c,a in enumerate(["a18","a26","a36","a51"]):
        p=f"{R}fig-maid-{i}-{tier}-{a}.webp"
        im=Image.open(p).convert("RGBA"); f=face(im)
        if f is None: continue
        x,y,w,h=f; cx=x+w/2; cy=y+h*0.42; s=w*1.25
        cr=im.crop((int(cx-s/2),int(cy-s/2),int(cx+s/2),int(cy+s/2))).resize((S,S),Image.LANCZOS)
        bg=Image.new("RGBA",(S,S),(255,255,255,255)); bg.alpha_composite(cr); G.paste(bg.convert("RGB"),(60+c*S,r*S))
G.save(out,quality=90)
