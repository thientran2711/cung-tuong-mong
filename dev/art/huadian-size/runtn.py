# runtn.py: regenerate img/tn thumbnails of fixed files as a DELTA patch: tn_new = tn_old + (resize(fixed) - resize(orig)),
# so everything outside the changed forehead stays bit-identical to the live thumbnail.
# usage (cwd=work): runtn.py TNDIR_OLD OUTDIR SRCDIR FIXEDDIR names...   (names like por-consort-c01-t1-a18 / fig-...)
import sys,os
import numpy as np
from PIL import Image
old,out,src,fx=sys.argv[1:5]; os.makedirs(out,exist_ok=True)
for n in sys.argv[5:]:
    f=f'{fx}/{n}.webp'
    if not os.path.exists(f): print(n,'unchanged'); continue
    t=Image.open(f'{old}/{n}.webp').convert('RGBA'); size=t.size
    a=Image.open(f'{src}/{n}.webp').convert('RGBA'); b=Image.open(f).convert('RGBA')
    ra=np.asarray(a.resize(size,Image.LANCZOS)).astype(np.float32); rb=np.asarray(b.resize(size,Image.LANCZOS)).astype(np.float32)
    d=rb-ra; d[...,3]=0
    o=np.clip(np.asarray(t).astype(np.float32)+d,0,255).astype(np.uint8)
    Image.fromarray(o,'RGBA').save(f'{out}/{n}.webp','WEBP',quality=90,method=4)
    print(n,'patched',int(np.abs(d).max()))
