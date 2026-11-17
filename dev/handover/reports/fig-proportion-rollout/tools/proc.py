import sys,glob,os
import numpy as np
from PIL import Image
sys.path.insert(0,os.path.dirname(__file__))
def proc(src,dst):
    im=Image.open(src).convert('RGBA'); a=np.array(im)[:,:,3]>40
    ys=np.where(a.any(1))[0]; xs=np.where(a.any(0))[0]
    im=im.crop((xs[0],ys[0],xs[-1]+1,ys[-1]+1))
    r=900/im.height; im=im.resize((max(1,round(im.width*r)),900),Image.LANCZOS)
    im.save(dst,'WEBP',quality=88,method=6)
if __name__=='__main__':
    for p in sorted(glob.glob('rm/*.png')):
        n=os.path.basename(p)[:-4]; proc(p,f'new/fig-kid-{n}.webp')
