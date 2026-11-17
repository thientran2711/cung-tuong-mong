import sys,numpy as np,colorsys
from PIL import Image
def smooth(x,a,b):
    t=np.clip((x-a)/(b-a),0,1);return t*t*(3-2*t)
def hsv_arr(rgb):
    return np.array(Image.fromarray(rgb).convert('HSV')).astype(float)
def weight(rgb,A,prot):
    h=hsv_arr(rgb);H=h[...,0]*360/255;S=h[...,1]/255;V=h[...,2]/255
    hb=1-smooth(H,26,36)               # exclude gold/yellow
    hb=np.where(H>300,1.0,hb)
    w=smooth(S,.20,.36)*smooth(V,.40,.58)*hb*(A/255.)
    pm=np.zeros(w.shape);sk=np.zeros(w.shape)
    skc=((H>8)&(H<34)&(S<.44)&(V>.70)).astype('uint8')*255
    skc=np.array(Image.fromarray(skc).filter(ImageFilter.MaxFilter(3)))>0
    for n,(x0,y0,x1,y1) in enumerate(prot):
        if n==0: pm[y0:y1,x0:x1]=1
        else: sk[y0:y1,x0:x1]=1
    pm=np.maximum(pm,sk*skc)
    pm=np.array(Image.fromarray((pm*255).astype('uint8')).filter(ImageFilter.GaussianBlur(1.2*max(1,w.shape[0]/900)))).astype(float)/255
    w=w*(1-pm)
    return w,H,S,V
from PIL import ImageFilter
def skin(rgb,H,S,V,A):
    m=((H>10)&(H<32)&(S>.14)&(S<.40)&(V>.74)&(A>200))
    im=Image.fromarray((m*255).astype('uint8'))
    k=max(5,int(rgb.shape[0]/900*9))|1
    o=im.filter(ImageFilter.MinFilter(k)).filter(ImageFilter.MaxFilter(k))
    # keep only large blobs: close then dilate
    d=o.filter(ImageFilter.MaxFilter(k+4)).filter(ImageFilter.GaussianBlur(2))
    return np.array(d).astype(float)/255
def tohex(c): return tuple(int(c[i:i+2],16) for i in (1,3,5))
def recolour(im,target,prot,src_h=8.,src_s=.52,lumexp=.8):
    a=np.array(im.convert('RGBA'));rgb=a[...,:3];A=a[...,3]
    w,H,S,V=weight(rgb,A,prot)
    tr,tg,tb=[c/255 for c in tohex(target)];th,ts,tv=colorsys.rgb_to_hsv(tr,tg,tb)
    th*=360
    dh=((H-src_h+180)%360)-180
    Hn=(th+dh*.5)%360
    Sn=np.clip(S*(ts/src_s),0,1)
    # value: keep shading relative, scale to target brightness
    Vn=np.clip(V*(tv/.80),0,1)
    # blend sat for already highlight pixels
    hn=np.stack([Hn*255/360,Sn*255,Vn*255],-1).clip(0,255).astype('uint8')
    new=np.array(Image.fromarray(hn,'HSV').convert('RGB')).astype(float)
    L=lambda x:x@np.array([.2126,.7152,.0722])
    lo=L(rgb.astype(float));ln=L(new)
    Ls=(lo*w).sum()/max(w.sum(),1)
    Lt=L(np.array([tr,tg,tb])*255)
    r=(Lt/Ls)**lumexp
    k=np.clip(lo*r/(ln+1e-3),.4,2.0)
    new=np.clip(new*(1+(k[...,None]-1)*.85),0,255)
    out=rgb*(1-w[...,None])+new*w[...,None]
    r=a.copy();r[...,:3]=out.round().astype('uint8');return Image.fromarray(r,'RGBA')
