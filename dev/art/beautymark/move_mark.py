# Beauty-mark fix by code (0 cr): lift the painted mark from where it is, heal that spot, paste the same painted pixels at the right spot.
import sys,numpy as np
from PIL import Image,ImageFilter
src,out,ox,oy,nx,ny=sys.argv[1],sys.argv[2],*map(int,sys.argv[3:7])
im=Image.open(src).convert('RGB');a=np.array(im).astype(float)
L=a.mean(2)
# exact old mark centre = darkest pixel within 12 px
r=L[oy-4:oy+5,ox-4:ox+5];dy,dx=np.unravel_index(r.argmin(),r.shape);ox,oy=ox-4+dx,oy-4+dy
R=5
patch=a[oy-R:oy+R+1,ox-R:ox+R+1].copy()
yy,xx=np.mgrid[-R:R+1,-R:R+1];d=np.hypot(xx,yy)
# heal: fill with skin taken from a ring around it, blended smoothly
ring=a[oy-R-4:oy+R+5,ox-R-4:ox+R+5]
yr,xr=np.mgrid[-R-4:R+5,-R-4:R+5];m=(np.hypot(xr,yr)>R+1)
skin=ring[m].mean(0)
# local skin gradient: average of left/right and up/down neighbours
w=np.clip((R+1-d)/2,0,1)[...,None]
healed=patch*(1-w)+skin*w
a[oy-R:oy+R+1,ox-R:ox+R+1]=healed
# mark alpha = how much darker than skin
pl=patch.mean(2);sl=skin.mean()
dark=np.clip((sl-pl)/(sl-pl.min()+1e-6),0,1)**0.7*np.clip((R-d)/1.5,0,1)
tgt=a[ny-R:ny+R+1,nx-R:nx+R+1]
a[ny-R:ny+R+1,nx-R:nx+R+1]=tgt*(1-dark[...,None])+patch*dark[...,None]
Image.fromarray(a.clip(0,255).astype('uint8')).save(out)
print('old mark',ox,oy,'-> new',nx,ny)
