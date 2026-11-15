# python3 fetchd.py < lines "KEY ID URL" : dialog banner pictures (review/gift-ui pic-shared.md list), drawn LANDSCAPE 4:3 with the key action
# in the central band. -> img/ev-KEY.webp (640x480 q82) + preview $PREV/ev-KEY.jpg; log "KEY ID" in gens_dlg.txt; raw download deleted.
import os,sys,subprocess
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..'))
PREV=os.environ.get('PREV','/tmp/claude-0/-home-user/d64e4822-8005-553d-be5a-3c77c37ea939/scratchpad/prev'); os.makedirs(PREV,exist_ok=True)
G=os.path.join(H,'gens_dlg.txt')
for line in sys.stdin:
    p=line.split()
    if len(p)<3: continue
    k,gid,url=p[:3]; raw=os.path.join(PREV,k+'.raw.png')
    subprocess.run(['curl','-sSf','--retry','4','--retry-all-errors','-o',raw,url],check=True)
    im=Image.open(raw).convert('RGB'); w,h=im.size; A=4/3
    cw,ch=(round(h*A),h) if w/h>A else (w,round(w/A)); x0=(w-cw)//2; y0=(h-ch)//2; c=im.crop((x0,y0,x0+cw,y0+ch))
    c.resize((640,480),Image.LANCZOS).save(os.path.join(ROOT,'img','ev-'+k+'.webp'),'WEBP',quality=82,method=6)
    c.resize((640,480),Image.LANCZOS).save(os.path.join(PREV,'ev-'+k+'.jpg'),quality=86)
    os.remove(raw)
    L=open(G).read().splitlines() if os.path.exists(G) else []
    L=[l for l in L if l.split()[0]!=k]+[f'{k} {gid}']; open(G,'w').write('\n'.join(L)+'\n')
    print('ok',k)
