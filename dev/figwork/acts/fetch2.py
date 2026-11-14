# python3 fetch2.py KEY ID URL [DX]  : download one finished creation (URL from creations_wait/creations_get) to RAW,
# centre-crop to 384:506 and write img/act-<KEY>.webp (384x506 q82). Logs "KEY ID" to gens.txt. DX shifts the crop window right.
# (fetch.py needs the session transcript; this one takes the URL directly.)
import os,sys,subprocess
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..'))
RAW=os.environ.get('RAW','/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/actraw2'); os.makedirs(RAW,exist_ok=True)
k,gid,url=sys.argv[1:4]; dx=int(sys.argv[4]) if len(sys.argv)>4 else 0
raw=os.path.join(RAW,k+'_'+gid+'.png')
if not os.path.exists(raw):
    subprocess.run(['curl','-sSf','--retry','4','--retry-all-errors','-o',raw+'.part',url],check=True); os.rename(raw+'.part',raw)
im=Image.open(raw).convert('RGB'); w,h=im.size; A=384/506
cw,ch=(round(h*A),h) if w/h>A else (w,round(w/A))
x0=(w-cw)//2+dx; y0=(h-ch)//2
out=os.path.join(ROOT,'img',os.environ.get('PFX','act-')+k+'.webp')
im.crop((x0,y0,x0+cw,y0+ch)).resize((384,506),Image.LANCZOS).save(out,'WEBP',quality=82,method=6)
G=os.path.join(H,'gens.txt'); L=open(G).read()
if f'{k} {gid}' not in L: open(G,'a').write(f'{k} {gid}\n')
print('ok',k,os.path.getsize(out)//1024,'KB')
