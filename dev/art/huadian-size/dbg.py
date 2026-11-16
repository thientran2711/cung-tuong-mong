# dbg.py: debug sheet: per name: original crop with window (blue) and mask (red tint) | result. usage (cwd=work): dbg.py SRC OUT OUTPNG names...
import sys,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from PIL import Image,ImageDraw
import runpor
src,out,png=sys.argv[1:4]; names=sys.argv[4:]; Z=5
tiles=[]
for n in names:
    info,im,an=runpor.process(f'{src}/{n}.webp',n,src)
    w=info['win']; cx0,cy0=int(w[0])-14,int(w[1])-14; cx1,cy1=int(w[2])+14,int(w[3])+14
    o=Image.open(f'{src}/{n}.webp').convert('RGBA'); bg=Image.new('RGBA',o.size,(236,231,224,255)); bg.alpha_composite(o); o=bg.convert('RGB')
    a=o.crop((cx0,cy0,cx1,cy1)).resize(((cx1-cx0)*Z,(cy1-cy0)*Z),Image.LANCZOS)
    if an is not None:
        m=np.zeros(o.size[::-1],bool); X0,Y0,X1,Y1=an['org']; m[Y0:Y1,X0:X1]=an['mark']
        mm=Image.fromarray((m[cy0:cy1,cx0:cx1]*255).astype(np.uint8)).resize(a.size,Image.NEAREST)
        arr=np.asarray(a).copy(); mk=np.asarray(mm)>0
        edge=mk&~np.roll(mk,1,0)|mk&~np.roll(mk,1,1)|mk&~np.roll(mk,-1,0)|mk&~np.roll(mk,-1,1)
        arr[edge]=(255,0,0); a=Image.fromarray(arr)
    d=ImageDraw.Draw(a); d.rectangle([(w[0]-cx0)*Z,(w[1]-cy0)*Z,(w[2]-cx0)*Z,(w[3]-cy0)*Z],outline=(0,0,255))
    d.text((3,2),f"{n[4:-4]} {info.get('ratio')} {info['status']}",fill=(0,0,255))
    tiles.append(a)
    if im is not None:
        r=im.convert('RGBA'); bg=Image.new('RGBA',r.size,(236,231,224,255)); bg.alpha_composite(r); r=bg.convert('RGB').crop((cx0,cy0,cx1,cy1)).resize(a.size,Image.LANCZOS)
    else: r=o.crop((cx0,cy0,cx1,cy1)).resize(a.size,Image.LANCZOS)
    tiles.append(r)
W=max(t.width for t in tiles); H=max(t.height for t in tiles); C=4
rows=(len(tiles)+C-1)//C; sh=Image.new('RGB',(C*W,rows*H),(255,255,255))
for i,t in enumerate(tiles): sh.paste(t,((i%C)*W,(i//C)*H))
sh.save(png)
