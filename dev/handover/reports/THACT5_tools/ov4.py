# ov4.py <dir> <out.jpg> k:i k:i … — full-size frames (out+loop+back index) with tracked circle
import sys,os,numpy as np
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from disc import frames
from PIL import Image,ImageDraw
d,o=sys.argv[1],sys.argv[2]; sp=[s.split(':') for s in sys.argv[3:]]; C={}
out=Image.new('RGB',(288*min(len(sp),5),288*((len(sp)+4)//5)))
for j,(k,i) in enumerate(sp):
    if k not in C: C[k]=(sum([frames(f'{d}/{k}-{p}.webp') for p in ('out','loop','back')],[]),np.load(f'{d}/{k}.disc.npy'))
    al,D=C[k]; i=int(i); f=al[i]; H=f.shape[0]
    im=Image.new('RGBA',(H,H),(110,110,110,255)); im.alpha_composite(Image.fromarray(f)); g=ImageDraw.Draw(im)
    cx,cy,r,_=D[i]; g.ellipse((cx-r,cy-r,cx+r,cy+r),outline=(0,255,255,255),width=1); g.text((3,3),f'{k} {i} r={r:.1f}',fill=(255,255,0))
    out.paste(im.convert('RGB').resize((288,288)),((j%5)*288,(j//5)*288))
out.save(o,quality=85)
