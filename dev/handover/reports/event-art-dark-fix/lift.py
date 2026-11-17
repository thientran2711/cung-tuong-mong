import numpy as np, sys
from PIL import Image
from skimage import color
def lift(im,target=72.0,chroma=1.3):
    rgb=np.asarray(im.convert('RGB'),dtype=np.float32)/255
    lab0=color.rgb2lab(rgb)
    L=lab0[...,0]/100
    def render(g):
        lab=lab0.copy()
        L2=L**g
        L2=L2+0.15*(L2-0.5)*(1-np.abs(2*L2-1))
        lab[...,0]=np.clip(L2*100,0,100)
        lab[...,1:]*=chroma
        out=np.clip(color.lab2rgb(lab),0,1)
        y=(0.299*out[...,0]+0.587*out[...,1]+0.114*out[...,2]).mean()*255
        return out,y
    lo,hi=0.1,1.0
    for _ in range(14):
        g=(lo+hi)/2
        out,y=render(g)
        if y>target: lo=g
        else: hi=g
    out,y=render((lo+hi)/2)
    return Image.fromarray((out*255+0.5).astype(np.uint8))
