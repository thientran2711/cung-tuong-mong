import sys,numpy as np
from PIL import Image, ImageDraw
exec(open('/home/user/cung-tuong-mong/dev/handover/reports/THACT1_tools/leanout_measure.py').read().split('SETS=')[0])
d=sys.argv[1]; ks=sys.argv[2:]; N=10; T=160
out=Image.new('RGB',(N*T,len(ks)*(T+14)),'white'); dr=ImageDraw.Draw(out)
for r,k in enumerate(ks):
    fo=frames(f'{d}/{k}-out.webp'); fl=frames(f'{d}/{k}-loop.webp'); c=circle(fo[0]); al=fo+fl
    idx=np.linspace(0,len(al)-1,N).astype(int)
    for j,i in enumerate(idx):
        f=al[i]; a=stats(f,c)[0]; im=Image.fromarray(f); bg=Image.new('RGBA',im.size,(200,200,200,255)); bg.alpha_composite(im)
        cx,cy,rr=c; ImageDraw.Draw(bg).ellipse((cx-rr,cy-rr,cx+rr,cy+rr),outline=(0,0,255,255))
        out.paste(bg.convert('RGB').resize((T,T)),(j*T,r*(T+14))); dr.text((j*T+3,r*(T+14)+T),f'{k} {"O" if i<len(fo) else "L"}{i} {a:.0f}%',fill=(0,0,0))
out.save(f'{d}/../strip_{"_".join(ks)}.jpg',quality=82)
