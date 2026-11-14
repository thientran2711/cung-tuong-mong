# porsheet.py out.jpg tier age cid... : 256px portraits grid with labels
import sys
from PIL import Image,ImageDraw
O="/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad/wt-art8/img"
out,t,a=sys.argv[1:4]; cs=sys.argv[4:]; cols=8; W=256
s=Image.new('RGB',(cols*W,((len(cs)+cols-1)//cols)*(W+20)),'white'); d=ImageDraw.Draw(s)
for k,c in enumerate(cs):
    im=Image.open(f"{O}/por-consort-{c}-t{t}-a{a}.webp").convert('RGBA'); bg=Image.new('RGB',im.size,(235,225,205)); bg.paste(im,mask=im.split()[3])
    x,y=(k%cols)*W,(k//cols)*(W+20); s.paste(bg.resize((W,W)),(x,y+20)); d.text((x+4,y+4),c,fill='black')
s.save(out,quality=88)
