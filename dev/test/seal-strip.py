# montage the per-key lean-in frames written by `MOTION=1 node dev/test/fig-seal.js` into one strip per key: idle | f1 | f2 | f3 | f4
# usage: python3 dev/test/seal-strip.py <outdir> <W>x<H>   -> <outdir>/strip-<key>-<W>x<H>.png (keep it OUTSIDE git: shots never go in git)
import sys,os
from PIL import Image
out,sz=sys.argv[1],sys.argv[2]
for k in ('gian','buon','vui'):
    fs=[f'{out}/strip-{k}-{n}-{sz}.png' for n in ('0idle','f1','f2','f3','f4')]
    if not all(os.path.exists(f) for f in fs): print(k,'missing frames');continue
    ims=[Image.open(f) for f in fs];h=max(i.height for i in ims);w=sum(i.width for i in ims)+8*4
    m=Image.new('RGB',(w,h),(30,24,20));x=0
    for i in ims: m.paste(i,(x,0));x+=i.width+8
    m.save(f'{out}/strip-{k}-{sz}.png');print(k,m.size)
