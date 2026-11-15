# python3 ffetch.py PREFIX W H < lines "KEY ID URL" : centre-crop to W:H, resize -> img/PREFIX<KEY>.webp (q82); log "PREFIX<KEY> ID" in fgens.txt
import os,sys,io,urllib.request
from PIL import Image
H0=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H0,'../../..'))
pre,W,H=sys.argv[1],int(sys.argv[2]),int(sys.argv[3])
for line in sys.stdin:
    p=line.split()
    if len(p)<3: continue
    k,gid,url=p[:3]
    im=Image.open(io.BytesIO(urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'ctm-fetch'}),timeout=120).read())).convert('RGB')
    w,h=im.size; A=W/H; cw,ch=(round(h*A),h) if w/h>A else (w,round(w/A)); x0=(w-cw)//2; y0=(h-ch)//2
    im.crop((x0,y0,x0+cw,y0+ch)).resize((W,H),Image.LANCZOS).save(os.path.join(ROOT,'img',pre+k+'.webp'),'WEBP',quality=82,method=6)
    with open(os.path.join(H0,'fgens.txt'),'a') as f: f.write(f'{pre}{k} {gid}\n')
    print('ok',pre+k)
