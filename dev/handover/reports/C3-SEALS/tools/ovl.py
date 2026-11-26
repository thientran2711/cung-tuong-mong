import sys
from PIL import Image,ImageDraw
rows=[]
for spec in sys.argv[2:]:
    k,p=spec.split(':'); im=Image.open(f'final/pt-{k}-{p}.webp'); n=im.n_frames
    sh=Image.new('RGB',(8*288,288),(0,200,0)); d=ImageDraw.Draw(sh)
    for j in range(8):
        im.seek(int(j*(n-1)/7)); f=im.convert('RGBA'); sh.paste(f,(j*288,0),f)
        R=74*1.12; sc=1.0
        if p=='out': from math import pi
        d.ellipse([j*288+144-R,144-R,j*288+144+R,144+R],outline=(255,255,255))
    rows.append(sh)
o=Image.new('RGB',(8*288,288*len(rows))); [o.paste(r,(0,i*288)) for i,r in enumerate(rows)]; o.save(sys.argv[1])
