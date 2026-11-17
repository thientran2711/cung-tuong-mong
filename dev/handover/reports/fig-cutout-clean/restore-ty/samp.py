import sys,io,subprocess,numpy as np
from PIL import Image
sys.path.insert(0,'/home/user/cung-tuong-mong/dev/handover/reports/fig-cutout-clean/tools')
import fit_fig
from rembg import new_session,remove
S=new_session('isnet-general-use')
CDN='https://ctm-img.victoria-tntt.workers.dev/img/'
def cols(im,n=4):
    a=np.asarray(im.split()[3])>40; c=a.sum(0); w=len(c)
    cuts=[]
    for k in range(1,n):
        e=w*k//n;r=w//12;lo=e-r;cuts.append(lo+int(np.argmin(c[lo:e+r])))
    b=[0]+cuts+[w];return list(zip(b[:-1],b[1:]))
jobs={'maid-m09-ty1':('LwB8LgUswO',sys.argv[1]),'maid-m35-ty2':('nVjlXUXYQD',sys.argv[2]),'maid-m35-ty3':('LwBI4hZswO',sys.argv[3])}
rows=[]
for k,(sid,url) in jobs.items():
    raw=subprocess.run(['curl','-s',url],capture_output=True).stdout
    im=Image.open(io.BytesIO(raw)).convert('RGB')
    cut=remove(im,session=S,post_process_mask=True)
    for (x0,x1),age in zip(cols(cut),['a18','a26','a36','a51']):
        m=cut.crop((x0,0,x1,cut.height))
        key=f'{k}-{age}'
        old=fit_fig.load(CDN+f'fig-{key}.webp')
        new=fit_fig.fit(m,old,H=900) if hasattr(fit_fig,'fit') else None
        new=new[0] if isinstance(new,tuple) else new
        new.save(f's/fig-{key}.webp',quality=88,method=6); old.save(f's/cur-{key}.png')
        rows.append(key)
print(rows)
