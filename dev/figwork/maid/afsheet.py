# afsheet.py OUT.jpg OLDDIR NEWDIR files... : old | new on green, pairs side by side, small
import sys,os
from PIL import Image
out,od,nd=sys.argv[1:4]; fs=sys.argv[4:]
TH=int(os.environ.get("TH","300")); cols=int(os.environ.get("COLS","10"))
tiles=[]
for f in fs:
    b=os.path.basename(f); pair=[]
    for d in (od,nd):
        im=Image.open(os.path.join(d,b)).convert("RGBA"); w=round(im.width*TH/im.height); im=im.resize((w,TH))
        bg=Image.new("RGBA",im.size,(20,110,60,255)); bg.alpha_composite(im); pair.append(bg.convert("RGB"))
    t=Image.new("RGB",(pair[0].width+pair[1].width+6,TH),(0,0,0)); t.paste(pair[0],(0,0)); t.paste(pair[1],(pair[0].width+6,0)); tiles.append(t)
tw=max(t.width for t in tiles)+8; rows=(len(tiles)+cols-1)//cols
M=Image.new("RGB",(tw*cols,(TH+6)*rows),(40,40,40))
for i,t in enumerate(tiles): M.paste(t,((i%cols)*tw,(i//cols)*(TH+6)))
M.save(out,quality=85); print(M.size)
