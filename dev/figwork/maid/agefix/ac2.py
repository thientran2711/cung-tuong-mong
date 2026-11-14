# ac2.py OUT.jpg : last 8 (or given jids) from ages.txt with edit gen -> old|new head pairs + full small
import sys,json,subprocess,os
import numpy as np
from PIL import Image,ImageDraw
S="/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad"
subprocess.run(["python3",S+"/cwA/urls.py"],stdout=subprocess.DEVNULL)
db=json.load(open(S+"/cwA/urls.json"))
L=[l.split() for l in open("ages.txt") if l.strip()]
sel=sys.argv[2:]
rows=[p for p in L if (p[0] in sel)] if sel else L[-8:]
os.makedirs("ed",exist_ok=True); T=230
SH=Image.new("RGB",(4*(2*T+100),2*(T+14)),"white"); d=ImageDraw.Draw(SH)
for i,p in enumerate(rows[:8]):
    j,g=p[0],p[2]; _,m,t=j.split("-")
    f=f"ed/{g}.png"
    if not os.path.exists(f): subprocess.run(["curl","-sS","--retry","5","-o",f,db[g]],check=True)
    new=Image.open(f).convert("RGB"); w,h=new.size
    A=np.asarray(new.convert("L")).astype(int); bgv=np.median(A[:5]); mm=np.abs(A-bgv)>25
    ys=np.nonzero(mm[:,int(w*.3):int(w*.7)].sum(1)>3)[0]; top=ys[0] if len(ys) else 0
    s=int(h*0.15); 
    cols=np.nonzero(mm[top:top+s, :].sum(0)>2)[0]; cx=int(np.median(cols)) if len(cols) else w//2
    head=new.crop((cx-s//2,top+int(s*.12),cx+s//2,top+int(s*1.12))).resize((T,T))
    o=Image.open(f"{S}/wmA/img/por-maid-{m}-t{t}-a51.webp").convert("RGBA"); ob=Image.new("RGB",o.size,(255,255,255)); ob.paste(o,mask=o.split()[3])
    ow,oh=ob.size; old=ob.crop((int(ow*.15),int(oh*.08),int(ow*.85),int(oh*.08)+int(ow*.7))).resize((T,T))
    x=(i%4)*(2*T+100); y=(i//4)*(T+14)
    SH.paste(old,(x,y)); SH.paste(head,(x+T,y)); SH.paste(new.resize((100,int(100*h/w))).crop((0,0,100,T)),(x+2*T,y))
    d.text((x+2,y+T),j,fill="red")
SH.save(sys.argv[1],quality=86)
