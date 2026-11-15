# python3 hfetch.py < lines "KEY ID URL" : crop 384:506 -> img/act-KEY-h.webp (384x506 q82), log "KEY ID" in hgens.txt, drop it from hpending.txt
import os,sys,io,urllib.request
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..'))
def upd(f,k,line):
    p=os.path.join(H,f); L=open(p).read().splitlines() if os.path.exists(p) else []
    L=[l for l in L if l.split() and l.split()[0]!=k]+([line] if line else []); open(p,'w').write('\n'.join(L)+('\n' if L else ''))
for line in sys.stdin:
    p=line.split()
    if len(p)<3: continue
    k,gid,url=p[:3]
    im=Image.open(io.BytesIO(urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'ctm-fetch'}),timeout=120).read())).convert('RGB')
    w,h=im.size; A=384/506
    cw,ch=(round(h*A),h) if w/h>A else (w,round(w/A)); x0=(w-cw)//2; y0=(h-ch)//2
    im.crop((x0,y0,x0+cw,y0+ch)).resize((384,506),Image.LANCZOS).save(os.path.join(ROOT,'img','act-'+k+'-h.webp'),'WEBP',quality=82,method=6)
    upd('hgens.txt',k,f'{k} {gid}'); upd('hpending.txt',k,None)
    print('ok',k)
