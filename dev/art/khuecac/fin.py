# Finish cut-outs: WORKDIR/cut/<tier>-<face>.png (kc cuts may also be cut/<face>.png) -> WORKDIR/img/fig-<role>-<face>-<tier>-a18.webp
# (alpha bbox, 900 px high), then por via porcrop.py and cutcheck.py on the new files.  Usage: python3 fin.py WORKDIR TIER face...
import sys,os,subprocess
import numpy as np
from PIL import Image
W,T=sys.argv[1],sys.argv[2];H=os.path.dirname(os.path.abspath(__file__));FW=os.path.join(H,'../../figwork')
new=[]
for c in sys.argv[3:]:
    role='maid' if c.startswith('m') else 'consort'
    src=os.path.join(W,'cut',f'{T}-{c}.png')
    if not os.path.exists(src):src=os.path.join(W,'cut',f'{c}.png')
    i=Image.open(src).convert('RGBA');a=np.array(i)[:,:,3];ys,xs=np.nonzero(a>8)
    f=i.crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1));f=f.resize((round(f.width*900/f.height),900),Image.LANCZOS)
    out=os.path.join(W,'img',f'fig-{role}-{c}-{T}-a18.webp');f.save(out,quality=90,method=6);new.append(out)
subprocess.run(['python3',os.path.join(FW,'porcrop.py')]+new,check=True,stdout=subprocess.DEVNULL)
pors=[p.replace('/fig-','/por-') for p in new]
subprocess.run(['python3',os.path.join(FW,'cutcheck.py')]+new+pors)
