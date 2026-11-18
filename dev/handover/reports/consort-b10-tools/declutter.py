import sys, numpy as np
from PIL import Image
from scipy import ndimage as ndi
for p in sys.argv[1:]:
    im=Image.open(p).convert('RGBA'); a=np.array(im); m=a[...,3]>20
    lab,n=ndi.label(m); sizes=ndi.sum(m,lab,range(1,n+1)); big=sizes.max()
    keep=[i+1 for i,s in enumerate(sizes) if s>0.03*big]
    k=np.isin(lab,keep); a[~k,3]=0; Image.fromarray(a).save(p); print(p,n,'->',len(keep))
