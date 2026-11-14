# porsheet.py OUT.jpg por... : portraits on grey, labelled
import sys,os
from PIL import Image,ImageDraw
fs=sys.argv[2:]; W=int(os.environ.get("PW","192")); H=round(W*506/384); cols=int(os.environ.get("COLS","8"))
M=Image.new("RGB",(W*cols,(H+14)*((len(fs)+cols-1)//cols)),(90,90,90)); d=ImageDraw.Draw(M)
for i,f in enumerate(fs):
    im=Image.open(f).convert("RGBA").resize((W,H)); bg=Image.new("RGBA",im.size,(150,150,150,255)); bg.alpha_composite(im)
    x,y=(i%cols)*W,(i//cols)*(H+14); M.paste(bg.convert("RGB"),(x,y+14)); d.text((x+2,y+1),os.path.basename(f)[4:-5],fill="white")
M.save(sys.argv[1],quality=86); print(M.size)
