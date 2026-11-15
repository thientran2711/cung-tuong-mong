# heads.py OUT.jpg JID... : face crops of all 4 figures per gen (one row per gen) from full-res raw (cached in raw/)
import sys,json,subprocess,os
from PIL import Image,ImageDraw
import numpy as np
H=os.path.dirname(os.path.abspath(__file__)); os.makedirs(H+"/raw",exist_ok=True)
db=json.load(open(H+"/urls.json")); g={l.split()[0]:l.split()[1] for l in open(H+"/gens.txt")}
rows=[]
for j in sys.argv[2:]:
    f=f"{H}/raw/{g[j]}.png"
    if not os.path.exists(f): subprocess.run(["curl","-s","--retry","4","-o",f,db[g[j]]])
    im=Image.open(f).convert("RGB"); W,Hh=im.size; A=np.asarray(im.resize((W//8,Hh//8))).astype(int)
    dk=(A.max(axis=2)<90); top=int(A.shape[0]*.3)
    col=dk[:top].sum(axis=0); xs=[]
    for k in range(4):
        a,b=int(len(col)*k/4),int(len(col)*(k+1)/4); seg=col[a:b]
        if seg.sum()==0: xs.append((a+b)//2); continue
        xs.append(a+int(np.average(np.arange(len(seg)),weights=seg)))
    row=[]
    for k,x in enumerate(xs):
        ys=np.nonzero(dk[:top,max(0,x-15):x+15].any(axis=1))[0]; y0=ys[0] if len(ys) else 5
        cx=x*8; cy=y0*8+int(Hh*.07); s=int(Hh*.09)
        row.append(im.crop((cx-s,cy-s,cx+s,cy+s)).resize((300,300)))
    R=Image.new("RGB",(1200,318),"white"); ImageDraw.Draw(R).text((4,2),j,fill="black")
    for k,c in enumerate(row): R.paste(c,(k*300,18))
    rows.append(R)
M=Image.new("RGB",(1200,318*len(rows)),"white")
for i,r in enumerate(rows): M.paste(r,(0,318*i))
M.save(sys.argv[1],quality=85)
