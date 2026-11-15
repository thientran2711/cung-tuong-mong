# python3 sfetch.py < lines "ARC ID URL [KEY]" : single story picture (portrait 3:4) -> img/st-<arc>-<key>.webp (768x1024 q82, key default bia)
# + preview $PREV/st-<arc>-<key>.jpg; logs "arc:key ID" in gens_single.txt; raw download deleted. Sheet: python3 ssheet.py OUT COLS arc:key ...
import os,sys,subprocess
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..'))
PREV=os.environ['PREV']; os.makedirs(PREV,exist_ok=True); G=os.path.join(H,'gens_single.txt')
for line in sys.stdin:
    p=line.split()
    if len(p)<3: continue
    a,gid,url=p[:3]; k=p[3] if len(p)>3 else 'bia'
    if ':' in a: a,k=a.split(':',1)
    n='st-%s-%s'%(a.replace('_','-'),k); raw=os.path.join(PREV,n+'.raw.png')
    subprocess.run(['curl','-sSf','--retry','4','--retry-all-errors','-o',raw,url],check=True)
    im=Image.open(raw).convert('RGB'); w,h=im.size; A=3/4
    cw,ch=(round(h*A),h) if w/h>A else (w,round(w/A)); x0=(w-cw)//2; y0=(h-ch)//2; c=im.crop((x0,y0,x0+cw,y0+ch)).resize((768,1024),Image.LANCZOS)
    c.save(os.path.join(ROOT,'img',n+'.webp'),'WEBP',quality=82,method=6); c.save(os.path.join(PREV,n+'.jpg'),quality=86); os.remove(raw)
    L=open(G).read().splitlines() if os.path.exists(G) else []
    L=[l for l in L if l.split()[0]!=a+':'+k]+[f'{a}:{k} {gid}']; open(G,'w').write('\n'.join(L)+'\n'); print('ok',n)
