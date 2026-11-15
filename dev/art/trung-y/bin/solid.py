# solid.py FILES : share of interior pixels (>=8px/900 inside the silhouette) that are semi-transparent (alpha<235). Flag >0.5%.
import sys; import numpy as np; from PIL import Image; from scipy import ndimage as ndi
bad=0
for f in sys.argv[1:]:
    a=np.asarray(Image.open(f).convert('RGBA'))[...,3]; d=ndi.distance_transform_edt(a>10)
    inn=d>max(4,8*a.shape[0]/900); fr=((a<235)&inn).sum()/max(1,inn.sum())
    if fr>0.005: bad+=1; print('SEMI %.4f %s'%(fr,f))
print('solid.py: %d files, %d semi-transparent'%(len(sys.argv)-1,bad))
