import sys
from PIL import Image, ImageDraw
import subprocess,os
keys=[l.split('\t')[0] for l in open('a.tsv')]
H=420;W=190
NR=(len(keys)+3)//4
S=Image.new("RGB",(4*2*W,NR*H),(40,40,46))
def fit(im):
    im=im.convert('RGBA');bb=im.getbbox();im=im.crop(bb);s=min((W-6)/im.width,(H-18)/im.height);return im.resize((max(1,int(im.width*s)),max(1,int(im.height*s))),Image.LANCZOS)
for i,k in enumerate(keys):
    old=f'old/fig-{k}.webp'
    if not os.path.exists(old): subprocess.run(['curl','-s','-o',old,f'https://ctm-img.victoria-tntt.workers.dev/img/fig-{k}.webp'])
    cx,cy=(i%4)*2*W,(i//4)*H
    for j,p in enumerate([old,f'out/img/fig-{k}.webp']):
        im=fit(Image.open(p));t=Image.new('RGBA',(W,H),(40,40,46,255));t.alpha_composite(im,((W-im.width)//2,H-3-im.height))
        S.paste(t.convert('RGB'),(cx+j*W,cy))
    ImageDraw.Draw(S).text((cx+3,cy+2),k[5:8]+k[9:12]+' before|after',fill=(255,255,255))
S.save('ba16.jpg',quality=85);print(S.size)
