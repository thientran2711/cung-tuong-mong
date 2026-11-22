import sys
exec(open('/home/user/cung-tuong-mong/dev/handover/reports/THACT1_tools/leanout_measure.py').read().split('SETS=')[0])
from PIL import Image, ImageDraw
import numpy as np
out_name=sys.argv[1]; spec=sys.argv[2:]  # k:part:a:b
T=130; N=12
rows=[]
for s in spec:
    k,p,a,b=s.split(':'); fr=frames(f'webp2/{k}-{p}.webp'); a=int(a); b=min(int(b),len(fr)-1)
    rows.append((k,p,fr,np.linspace(a,b,N).astype(int)))
out=Image.new('RGB',(N*T,len(rows)*(T+12)),'white'); dr=ImageDraw.Draw(out)
for r,(k,p,fr,idx) in enumerate(rows):
    for j,i in enumerate(idx):
        im=Image.fromarray(fr[i]); bg=Image.new('RGBA',im.size,(200,200,200,255)); bg.alpha_composite(im)
        out.paste(bg.convert('RGB').resize((T,T)),(j*T,r*(T+12))); dr.text((j*T+3,r*(T+12)+T),f'{k} {p[0]}{i}',fill=(0,0,0))
out.save(out_name,quality=80)
