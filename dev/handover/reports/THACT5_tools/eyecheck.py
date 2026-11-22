# eyecheck.py <dir> <out.jpg> keys… : 6 LOOP frames per seal, upper disc crop x2, red line = spec circle (R0*1.12 at C0)
import sys,os,numpy as np
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../../art/emo-anim'))
import disc_scale_spec as SP
from disc import frames
from PIL import Image,ImageDraw
d,o=sys.argv[1],sys.argv[2]; K=sys.argv[3:]; TW,THh=200,130
sheet=Image.new('RGB',(6*TW,len(K)*THh),(30,30,30))
for n,k in enumerate(K):
    L=frames(f'{d}/{k}-loop.webp'); idx=np.linspace(0,len(L)-1,6).astype(int)
    for j,i in enumerate(idx):
        im=Image.new('RGBA',(288,288),(30,30,30,255)); im.alpha_composite(Image.fromarray(L[i])); g=ImageDraw.Draw(im); R=SP.R0*SP.PEAK
        g.ellipse((SP.C0[0]-R,SP.C0[1]-R,SP.C0[0]+R,SP.C0[1]+R),outline=(255,0,0,255),width=1)
        im=im.crop((44,50,244,180)); ImageDraw.Draw(im).text((2,2),f'{k} L{i}',fill=(255,255,0)); sheet.paste(im.convert('RGB'),(j*TW,n*THh))
sheet.save(o,quality=92)
