# pre.py OUT.jpg jid=editgen ... : a36 por | old a51 por | edit head crop (from raw edit, before bg removal)
import sys,os,json,subprocess
from PIL import Image,ImageDraw
import numpy as np, cv2
W=os.environ.get("WT","/home/user/cung-tuong-mong/.claude/worktrees/agent-a86f02629e43ed2fc"); H=os.path.dirname(os.path.abspath(__file__))
subprocess.run(["python3",H+"/urls.py"],stdout=subprocess.DEVNULL)
db=json.load(open(H+"/urls.json")); os.makedirs(H+"/ed",exist_ok=True)
fc=cv2.CascadeClassifier(cv2.data.haarcascades+"haarcascade_frontalface_alt2.xml")
def L(p):
    im=Image.open(p).convert("RGBA"); b=Image.new("RGB",im.size,"white"); b.paste(im,mask=im.split()[3]); return b.resize((230,303))
args=sys.argv[2:]; cols=2; T=303
S=Image.new("RGB",(cols*3*230+(cols-1)*20,((len(args)+cols-1)//cols)*318),"white"); d=ImageDraw.Draw(S)
for i,a in enumerate(args):
    j,g=a.split("="); part,c,t=j.split("-"); role="maid" if part=="A" else "consort"
    f=f"{H}/ed/{g}.png"
    if not os.path.exists(f): subprocess.run(["curl","-sS","--retry","5","-o",f,db[g]],check=True)
    im=Image.open(f).convert("RGB"); w,h=im.size
    g8=cv2.cvtColor(np.asarray(im)[:int(h*.35)],cv2.COLOR_RGB2GRAY)
    fs=fc.detectMultiScale(g8,1.1,4,minSize=(int(w*.06),int(w*.06)))
    if len(fs): x,y,fw,fh=max(fs,key=lambda r:r[2]); cx=x+fw/2; cy=y+fh*0.45; s=fw*2.8
    else: cx=w/2; cy=h*0.12; s=w*0.35
    head=im.crop((int(cx-s/2),int(cy-s*0.40*1.318),int(cx+s/2),int(cy+s*0.60*1.318))).resize((230,T))
    x0=(i%cols)*(3*230+20); y0=(i//cols)*318
    for k,p in enumerate([f"{W}/img/por-{role}-{c}-t{t}-a36.webp",f"{W}/img/por-{role}-{c}-t{t}-a51.webp"]):
        if os.path.exists(p): S.paste(L(p),(x0+k*230,y0))
    S.paste(head,(x0+460,y0)); d.text((x0+3,y0+304),j+"  a36 | cur a51 | EDIT",fill="red")
S.save(sys.argv[1],quality=88)
