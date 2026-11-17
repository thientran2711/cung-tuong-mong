import sys,subprocess,io,os
import numpy as np
from PIL import Image
T="/home/user/cung-tuong-mong/dev/handover/reports/fig-cutout-clean/tools/"
tsv,sheet=sys.argv[1],sys.argv[2]
rows=[l.rstrip("\n").split("\t") for l in open(tsv) if l.strip()]
res=[];tiles=[]
for k,cid,url in rows:
    p=f"m/{k}.png"
    if not os.path.exists(p): subprocess.run(["curl","-s","-o",p,url])
    a=np.asarray(Image.open(p).convert("RGBA"))[...,3]
    alpha=(a.min(),a.max(),float((a==255).mean()))
    if a.min()>200:
        print(k,"NO ALPHA",alpha);res.append((k,"NOALPHA"));continue
    r=subprocess.run(["python3","-I",T+"finish_fig.py",p,k,"out"],capture_output=True,text=True)
    q=subprocess.run(["python3","-I",T+"qa_fig.py","--kind","fig","--old",f"out/_old/fig-{k}.webp",f"out/img/fig-{k}.webp"],capture_output=True,text=True)
    print(k,alpha[:2],"|",(q.stdout.strip().splitlines() or [r.stderr[-200:]])[-1][:230])
    res.append((k,"ok"))
# sheet
ok=[k for k,s in res if s=="ok"]
H=700;cols=[]
for bg in [(30,30,30),(235,235,235)]:
    row=[]
    for k in ok:
        im=Image.open(f"out/img/fig-{k}.webp").convert("RGBA");w=int(im.width*H/im.height);im=im.resize((w,H))
        c=Image.new("RGBA",(w,H),bg+(255,));c.alpha_composite(im);row.append(c)
    cols.append(row)
# forehead crops from master
fc=[]
for k in ok:
    m=Image.open(f"m/{k}.png").convert("RGBA");b=m.getbbox();x0,y0,x1,y1=b;h=y1-y0;cx=(x0+x1)//2
    cr=m.crop((cx-h//8,y0,cx+h//8,y0+h//5)).resize((200,int(200*(h//5)/(h//4))))
    c=Image.new("RGBA",cr.size,(128,128,128,255));c.alpha_composite(cr);fc.append(c)
W=sum(i.width for i in cols[0]);S=Image.new("RGB",(W,H*2+fc[0].height),(0,0,0))
for r,row in enumerate(cols):
    x=0
    for c in row:S.paste(c.convert("RGB"),(x,r*H));x+=c.width
x=0
for i,c in enumerate(fc):S.paste(c.convert("RGB"),(x,2*H));x+=cols[0][i].width
S.save(sheet,quality=82)
print("sheet",S.size)
