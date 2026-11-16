import numpy as np
from PIL import Image,ImageFilter
def grade(im,k=1.0):
    a=np.asarray(im.convert('RGB'),float)/255
    r,g,b=a[...,0],a[...,1],a[...,2]
    mx=a.max(-1);mn=a.min(-1);sat=(mx-mn)/(mx+1e-6);lum=0.3*r+0.59*g+0.11*b
    # pale, blue-leaning, low-sat, bright = snow-like stone
    m=np.clip((lum-0.30)/0.15,0,1)*np.clip((0.50-sat)/0.18,0,1)*np.clip((b-r-0.01)/0.04,0,1)
    m=np.asarray(Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.GaussianBlur(3)),float)/255*k
    # target: warm-neutral grey stone, darker
    grey=np.stack([lum*1.02,lum*0.99,lum*0.99],-1)*0.84
    a2=a*(1-m[...,None])+grey*m[...,None]
    return Image.fromarray((np.clip(a2,0,1)*255).astype('uint8'))
