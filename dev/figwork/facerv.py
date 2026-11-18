# facerv.py out.jpg sheetsfile jid... : per sheet a row: lineup thumb + 4 face zooms
import sys,json,os,subprocess
import numpy as np
from PIL import Image, ImageDraw
W=os.path.dirname(os.path.abspath(__file__)); db=json.load(open(W+"/urls.json"))
m=dict(l.split()[:2] for l in open(W+"/"+sys.argv[2]) if l.strip())
js=sys.argv[3:]; RH=360; FZ=RH
rows=[]
for j in js:
    p=f"{W}/raw/{j}.png"
    if not os.path.exists(p): subprocess.run(["curl","-sS","-o",p,db[m[j]]],check=True)
    im=Image.open(p).convert("RGB"); w,h=im.size
    a=np.asarray(im).astype(int); bg=a[5,5]; diff=np.abs(a-bg).sum(axis=2)>60
    row=Image.new("RGB",(RH*2+4*FZ,RH),"white")
    t=im.copy(); t.thumbnail((RH*2,RH)); row.paste(t,(0,0))
    for q in range(4):
        x0,x1=q*w//4,(q+1)*w//4; sub=diff[:,x0:x1]
        ys=np.nonzero(sub.any(axis=1))[0]; 
        if len(ys)==0: continue
        top=ys[0]; H=ys[-1]-top; fh=int(H*0.15)
        cols=np.nonzero(sub[top:top+fh].any(axis=0))[0]; cx=x0+(cols[0]+cols[-1])//2 if len(cols) else (x0+x1)//2
        z=im.crop((cx-fh//2,top,cx+fh//2,top+fh)).resize((FZ,FZ)); row.paste(z,(RH*2+q*FZ,0))
    ImageDraw.Draw(row).text((4,4),j,fill=(200,0,0)); rows.append(row); im.close()
sh=Image.new("RGB",(rows[0].width,len(rows)*RH),"white")
for i,r in enumerate(rows): sh.paste(r,(0,i*RH))
sh.save(sys.argv[1],quality=85); print(sh.size, Image.open(f"{W}/raw/{js[0]}.png").size)
