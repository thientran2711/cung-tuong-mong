import numpy as np
from PIL import Image, ImageFilter
def hsv(rgb):
    r,g,b=[rgb[...,i] for i in range(3)];mx=rgb.max(-1);mn=rgb.min(-1);d=mx-mn+1e-6
    h=np.where(mx==r,((g-b)/d)%6,np.where(mx==g,(b-r)/d+2,(r-g)/d+4))/6
    s=np.where(mx>0,(mx-mn)/(mx+1e-6),0);return h,s,mx
def rgbf(h,s,v):
    i=np.floor(h*6)%6;f=h*6-np.floor(h*6);p=v*(1-s);q=v*(1-f*s);t=v*(1-(1-f)*s)
    c=[(v,t,p),(q,v,p),(p,v,t),(p,q,v),(t,p,v),(v,p,q)];out=np.zeros(h.shape+(3,))
    for k,(a,b,cc) in enumerate(c):
        m=i==k;out[m,0]=a[m];out[m,1]=b[m];out[m,2]=cc[m]
    return out
FAM={"hong":(0.95,0.38),"lam":(0.60,0.36),"luc":(0.36,0.30),"cam":(0.07,0.45)}
def robe_mask(c):
    im=Image.open(c+'.png').convert('RGBA');A=np.array(im)[...,3]>40
    ex=np.zeros_like(A)
    for k in ['h','k']:
        m=Image.open(f'{k}-{c}.png').convert('L').filter(ImageFilter.MaxFilter(9));ex|=np.array(m)>100
    im3=np.array(im)[...,:3].astype(float)/255
    h,sa,v=hsv(im3)
    hd=np.array(Image.open(f'h-{c}.png').convert('L'))>100
    ys=np.where(hd.any(1))[0];chin=ys.max() if len(ys) else 0
    ex[:chin+2,:]=True                       # nothing above the chin: hair, ornaments, face
    near=np.zeros_like(A)
    for k,r in [('h',41),('k',11)]:
        m=Image.open(f'{k}-{c}.png').convert('L').filter(ImageFilter.MaxFilter(r));near|=np.array(m)>100
    skin=(h>0.0)&(h<0.12)&(sa>0.10)&(sa<0.55)&(v>0.50)
    ex|=skin&near                            # neck / wrists / fingers by colour near head and hands
    M=A&~ex
    M=np.array(Image.fromarray((M*255).astype('uint8')).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3)))>127
    return Image.fromarray((M*255).astype('uint8')).filter(ImageFilter.GaussianBlur(1.2))
def recolor(c,fam):
    im=Image.open(c+'.png').convert('RGBA');a=np.array(im).astype(float)/255;rgb=a[...,:3]
    h,s,v=hsv(rgb);th,ts=FAM[fam]
    gold=(h>0.08)&(h<0.17)&(s>0.30)&(v>0.45)   # keep gold embroidery
    m=np.array(robe_mask(c)).astype(float)/255*(~gold)
    ns=np.clip(ts*(0.45+0.8*s),0,0.6)
    new=rgbf(np.full_like(h,th),ns,v)
    m=m*0.9
    out=rgb*(1-m[...,None])+new*m[...,None]
    o=np.dstack([out,a[...,3]]);return Image.fromarray((o*255).astype('uint8'),'RGBA')
if __name__=="__main__":
    for c in ['c07-t1','c31-t3']:
        robe_mask(c).save('rm-'+c+'.png')
        for f in FAM: recolor(c,f).save(f'out-{c}-{f}.png')
