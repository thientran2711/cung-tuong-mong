# faces.py out.jpg gen... : crop the 4 heads of each raw lineup (top ~16%), 4 per row
import sys
from PIL import Image
out=sys.argv[1]; rows=[]
for g in sys.argv[2:]:
    im=Image.open(f"raw/{g}.png").convert('RGB'); W,H=im.size; hh=int(H*0.2); cw=W//4
    row=Image.new('RGB',(4*300,300))
    for i in range(4):
        x0=i*cw+cw//2-hh//2; c=im.crop((x0,0,x0+hh,hh)).resize((300,300)); row.paste(c,(i*300,0))
    rows.append(row)
s=Image.new('RGB',(1200,300*len(rows)))
for k,r in enumerate(rows): s.paste(r,(0,300*k))
s.save(out,quality=88)
