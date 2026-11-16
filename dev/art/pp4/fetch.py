# python3 fetch.py < lines "KIND KEY ID URL" ; KIND act|opt -> img/act-KEY.webp 384x506 (opt keys already carry opt- prefix); ev -> img/ev-KEY.webp 640x480. Logs gens.txt, raw in dev/art/pp3/raw (git-ignored by deletion)
import os,sys,subprocess
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..')); os.makedirs(ROOT+'/img',exist_ok=True)
for line in sys.stdin:
    p=line.split()
    if len(p)<4: continue
    kd,k,gid,url=p[:4]; raw=os.path.join(H,'raw',k+'.png')
    subprocess.run(['curl','-sSf','--retry','4','--retry-all-errors','-o',raw,url],check=True)
    im=Image.open(raw).convert('RGB'); w,h=im.size
    sz,A,pre=((640,480),4/3,'ev-') if kd=='ev' else ((384,506),384/506,'act-')
    cw,ch=(round(h*A),h) if w/h>A else (w,round(w/A)); x0=(w-cw)//2; y0=(h-ch)//2
    im.crop((x0,y0,x0+cw,y0+ch)).resize(sz,Image.LANCZOS).save(f'{ROOT}/img/{pre}{k}.webp','WEBP',quality=82,method=6)
    print('ok',k,w,h)
