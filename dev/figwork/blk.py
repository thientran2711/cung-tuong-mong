# blk.py files... : flag figures with large opaque near-black areas
import sys,glob
from PIL import Image
import numpy as np
for f in sys.argv[1:]:
    a=np.asarray(Image.open(f).convert('RGBA')).astype(int)
    op=a[...,3]>200; dark=op&(a[...,:3].max(axis=2)<25)
    r=dark.sum()/max(1,op.sum())
    if r>0.03: print("DARK",f,round(r,3))
