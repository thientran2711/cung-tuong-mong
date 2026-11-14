# heads.py out.jpg tier cid... : crop top 22% (head) of a51 figures for hair-greyness check
import sys
from PIL import Image
out,t=sys.argv[1],sys.argv[2]; cs=sys.argv[3:]; W=200
ims=[]
for c in cs:
    im=Image.open(f"/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad/wt-art8/img/fig-consort-{c}-t{t}-a51.webp").convert('RGBA')
    import numpy as np
    bb=im.getbbox(); im=im.crop(bb); h=int(im.height*0.17); a=np.asarray(im)[...,3][:h]>100; xs=np.nonzero(a.any(0))[0]; cx=int(xs.mean()); im=im.crop((cx-h//2,0,cx+h//2,h))
    bg=Image.new('RGB',im.size,(235,225,205)); bg.paste(im,mask=im.split()[3]); bg=bg.resize((W,int(h*W/im.width))); ims.append(bg)
H=max(i.height for i in ims); n=len(ims); cols=6; rows=(n+cols-1)//cols
s=Image.new('RGB',(cols*W,rows*H),'white')
for k,i in enumerate(ims): s.paste(i,((k%cols)*W,(k//cols)*H))
s.save(out,quality=85)
