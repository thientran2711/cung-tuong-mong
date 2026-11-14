# grv.py OUT SUF JID... : one row of 4 heads per jid from hg/JID{SUF}.png (SUF '' or '_e')
import sys
from PIL import Image,ImageDraw,ImageFont
F=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",22)
out=sys.argv[1]; suf=sys.argv[2]; js=sys.argv[3:]; S=250
if suf=="-": suf=""
G=Image.new("RGB",(S*4,S*len(js)),(255,255,255)); d=ImageDraw.Draw(G)
for r,j in enumerate(js):
    im=Image.open(f"/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/hg/{j}{suf}.png").convert("RGB")
    T=im.width//2
    for k in range(4): G.paste(im.crop(((k%2)*T,(k//2)*T,(k%2)*T+T,(k//2)*T+T)).resize((S,S)),(k*S,r*S))
    d.text((4,r*S+4),j[2:5],fill=(200,0,0),font=F)
G.save(out,quality=88)
