# facegrid.py BGPNG OUT.jpg : face crops (full res) with absolute pixel coordinates every 20px, to locate spots to retouch
import sys
from PIL import Image,ImageDraw
import numpy as np
im=Image.open(sys.argv[1]).convert("RGBA"); W,H=im.size
A=np.asarray(im.resize((W//8,H//8))).astype(int); dk=(A[...,3]>200)&(A[...,:3].max(axis=2)<90); top=int(A.shape[0]*.3)
col=dk[:top].sum(axis=0); tiles=[]
for k in range(4):
    a,b=int(len(col)*k/4),int(len(col)*(k+1)/4); seg=col[a:b]; x=a+int(np.average(np.arange(len(seg)),weights=seg+1e-6))
    ys=np.nonzero(dk[:top,max(0,x-15):x+15].any(axis=1))[0]; y0=ys[0] if len(ys) else 5
    cx=x*8; cy=y0*8+int(H*.075); s=90
    c=im.crop((cx-s,cy-s,cx+s,cy+s)).convert("RGB").resize((540,540),Image.LANCZOS); d=ImageDraw.Draw(c)
    for g in range(0,2*s,20):
        d.line([(g*3,0),(g*3,8)],fill="blue"); d.text((g*3+1,9),str(cx-s+g),fill="blue")
        d.line([(0,g*3),(8,g*3)],fill="blue"); d.text((10,g*3),str(cy-s+g),fill="blue")
    tiles.append(c)
M=Image.new("RGB",(1080,1080),"white")
for i,t in enumerate(tiles): M.paste(t,((i%2)*540,(i//2)*540))
M.save(sys.argv[2],quality=88)
