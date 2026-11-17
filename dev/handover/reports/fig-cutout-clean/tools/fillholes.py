import sys,numpy as np,cv2
from PIL import Image
from scipy import ndimage as ndi
for p in sys.argv[1:]:
    im=np.array(Image.open(p).convert('RGBA'))
    a=im[...,3]; solid=a>128
    holes=ndi.binary_fill_holes(solid)&~solid
    lab,n=ndi.label(holes); 
    sizes=ndi.sum(holes,lab,range(1,n+1))
    m=np.zeros_like(holes)
    for i,s in enumerate(sizes,1):
        if s<400: m|=lab==i
    if m.any():
        m8=cv2.dilate(m.astype(np.uint8),np.ones((3,3),np.uint8))
        rgb=cv2.inpaint(im[...,:3],m8,3,cv2.INPAINT_TELEA)
        im[...,:3]=rgb; im[...,3][m8>0]=255
    Image.fromarray(im).save(p,quality=92,method=6); print(p.split('/')[-1],int(m.sum()))
