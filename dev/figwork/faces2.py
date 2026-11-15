# faces2.py out.jpg png... : 4 head crops per (transparent) lineup png, composited on parchment
import sys
from PIL import Image
out=sys.argv[1]; rows=[]
for f in sys.argv[2:]:
    im=Image.open(f).convert('RGBA'); bg=Image.new('RGBA',im.size,(235,225,205,255)); bg.alpha_composite(im); im=bg.convert('RGB')
    W,H=im.size; row=Image.new('RGB',(1200,300))
    for i in range(4):
        cx=i*W//4+W//8; c=im.crop((cx-210,120,cx+210,540)).resize((300,300)); row.paste(c,(i*300,0))
    rows.append(row)
s=Image.new('RGB',(1200,300*len(rows)))
for k,r in enumerate(rows): s.paste(r,(0,300*k))
s.save(out,quality=88)
