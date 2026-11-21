#!/usr/bin/env python3
"""crop 32 Kho/m13 raw cut PNGs (/tmp/.../raw/<id>.png, from Magnific cut ids in FACE_MAP_L703/FACE_CUTS_L703) to 300x340 face jpgs in faces/."""
import sys,os
from PIL import Image
import numpy as np
raw=sys.argv[1]; D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'faces')
for f in sorted(os.listdir(raw)):
    k=f[:-4]; im=Image.open(f'{raw}/{f}').convert('RGBA'); a=np.array(im)[:,:,3]>40
    rows=np.where(a.any(1))[0]; y0=rows[0]; band=a[y0+200:y0+380]; cols=np.where(band.any(0))[0]
    cx=int((cols[0]+cols[-1])/2) if len(cols) else 512
    W=460;H=int(W*340/300); x0=max(0,min(1024-W,cx-W//2)); top=max(0,y0-10)
    bg=Image.new('RGBA',im.size,(244,240,238,255)); bg.alpha_composite(im)
    bg.crop((x0,top,x0+W,top+H)).convert('RGB').resize((300,340),Image.LANCZOS).save(f'{D}/{k}.jpg',quality=80)
