# zoom.py OUT.jpg name... : face zoom (x3) from por-<name>.webp (384x506), 4 per row, 10px grid labels in por coords
import sys,os
from PIL import Image,ImageDraw
W=os.environ.get("WT","/home/user/cung-tuong-mong/.claude/worktrees/agent-a86f02629e43ed2fc")
tiles=[]
for n in sys.argv[2:]:
    p=n if n.endswith(".webp") else f"{W}/img/por-{n}.webp"
    im=Image.open(p).convert("RGBA"); b=Image.new("RGB",im.size,"white"); b.paste(im,mask=im.split()[3])
    c=b.crop((100,90,284,290)).resize((368,400),Image.LANCZOS); d=ImageDraw.Draw(c)
    d.text((3,388),os.path.basename(p),fill="red"); tiles.append(c)
cols=4; S=Image.new("RGB",(cols*372,((len(tiles)+cols-1)//cols)*404),"white")
for i,t in enumerate(tiles): S.paste(t,((i%cols)*372,(i//cols)*404))
S.save(sys.argv[1],quality=90)
