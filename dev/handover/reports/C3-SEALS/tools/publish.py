#!/usr/bin/env python3
# publish.py <P> <emo>... : stage final webps into /home/user/cung-tuong-mong/img (live names + review copies + sheet), no upload
import sys,os,shutil
from PIL import Image
P=sys.argv[1]; emos=sys.argv[2:]; src=f"/home/user/wt/{P}/final"; R="/home/user/cung-tuong-mong/img"
L=f"{R}/kit/emo-anim"; V=f"{R}/_review/c3-seals/{P}"; os.makedirs(L,exist_ok=True); os.makedirs(V,exist_ok=True); os.makedirs(f"{R}/kit",exist_ok=True)
rows=[]
for e in emos:
    k=f"{P}-{e}"; n=f"{P}-act-{e}"
    for part,suf in (("loop",""),("out","-out"),("back","-back")):
        s=f"{src}/{k}-{part}.webp"; shutil.copy(s,f"{L}/{n}{suf}.webp"); shutil.copy(s,f"{V}/{n}{suf}.webp")
    im=Image.open(f"{src}/{k}-out.webp"); im.seek(0); f=im.convert("RGBA").resize((160,160),Image.LANCZOS)
    f.save(f"{R}/kit/emo-{n}.webp",quality=88,method=6); f.save(f"{V}/emo-{n}.webp",quality=88,method=6)
    rows.append(e)
W=160; sh=Image.new("RGB",(W*5,W*len(rows)),(0,200,0))
for r,e in enumerate(rows):
    for part,c0 in (("out",0),("loop",2),("back",4)):
        im=Image.open(f"{src}/{P}-{e}-{part}.webp"); n=im.n_frames
        for j,i in enumerate(([0,n-1] if part!="loop" else [0,n//2]) if part!="back" else [n//2]):
            im.seek(i); f=im.convert("RGBA").resize((W,W),Image.LANCZOS); sh.paste(f,((c0+j)*W,r*W),f)
sh.save(f"{V}/{P}-act-sheet-{emos[0]}.png"); print("staged",len(rows),V)
