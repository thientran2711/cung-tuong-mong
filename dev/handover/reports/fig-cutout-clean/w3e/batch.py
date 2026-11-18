#!/usr/bin/env python3 -I
"""batch.py TSV TAG  : TSV lines key<TAB>genid<TAB>renderurl  (key like c13-t1-a18). download, alpha check, finish_fig FORCE_HD=1, qa, sheet.
Outputs /home/user/wt/w3e/out/<TAG>/ (master png, img/...), sheet /home/user/wt/w3e/out/<TAG>-sheet.jpg ; prints 1 line per file."""
import sys,os,subprocess,json
import numpy as np
from PIL import Image
R="/home/user/wt/w3e"; T=R+"/dev/handover/reports/fig-cutout-clean/tools"
tsv,tag=sys.argv[1:3]; out=f"{R}/out/{tag}"; os.makedirs(out+"/m",exist_ok=True)
rows=[l.rstrip("\n").split("\t") for l in open(tsv) if l.strip()]
ok=[]
for r in rows:
    key,gid,url=r[:3]; full="consort-"+key; mp=f"{out}/m/{key}.png"
    subprocess.run(["curl","-s","--max-time","120","-o",mp,url]); 
    try: im=Image.open(mp).convert("RGBA")
    except Exception as e: print(key,"BAD DOWNLOAD");continue
    a=np.asarray(im)[...,3]
    if not(a.min()==0 and a.max()>=250): print(key,"NO ALPHA",a.min(),a.max());continue
    e=dict(os.environ,FORCE_HD="1")
    p=subprocess.run(["python3","-I",T+"/finish_fig.py",mp,full,out],capture_output=True,text=True,env=e)
    q=subprocess.run(["python3","-I",T+"/qa_fig.py","--old",f"img/fig-{full}.webp",f"{out}/img/fig-{full}.webp"],capture_output=True,text=True)
    print(key,"|",q.stdout.strip()[:200], "| POR:",("MATCH WEAK" in p.stdout) and "WEAK" or "ok", p.stderr[-100:] if p.returncode else "")
    ok.append(key)
# sheet: dark row + light row + forehead strip
fs=[]
for k in ok:
    try: fs.append((k,Image.open(f"{out}/img/fig-consort-{k}.webp").convert("RGBA")))
    except: pass
H=520;n=len(fs)
if n:
    ims=[]
    for k,f in fs: ims.append(f.resize((int(f.width*H/f.height),H)))
    W=sum(i.width for i in ims); S=Image.new("RGB",(W,H*2+170),(30,30,34)); x=0
    for (k,f),i in zip(fs,ims):
        S.paste(i,(x,0),i); L=Image.new("RGBA",i.size,(238,232,220,255)); L.alpha_composite(i); S.paste(L.convert("RGB"),(x,H))
        a=np.asarray(f)[...,3]>40; ys=np.nonzero(a.any(1))[0]; hh=ys.max()-ys.min(); y0=ys.min(); xs=np.nonzero(a[y0:y0+int(hh*.12)].any(0))[0]; cx=int(xs.mean())
        c=f.crop((cx-int(hh*.09),y0,cx+int(hh*.09),y0+int(hh*.17))); c=c.resize((i.width,int(i.width*c.height/c.width)))
        bg=Image.new("RGBA",c.size,(60,60,66,255)); bg.alpha_composite(c); S.paste(bg.convert("RGB").crop((0,0,i.width,170)),(x,H*2)); x+=i.width
    sc=1100/S.width; S=S.resize((1100,int(S.height*sc))); S.save(f"{R}/out/{tag}-sheet.jpg",quality=82); print("SHEET",f"{R}/out/{tag}-sheet.jpg")
