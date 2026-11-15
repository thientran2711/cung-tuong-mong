# ecrop.py OUT tN... : forehead crops from the 2k edit output (4 ages), rows = tiers
import sys,json
from lib import *
out=sys.argv[1]; ts=sys.argv[2:]; S=260
G=Image.new("RGB",(4*S,len(ts)*S),(255,255,255)); d=ImageDraw.Draw(G)
for r,t in enumerate(ts):
    E=Image.open(f"{H}/e/{t}.png").convert("RGB").resize((2048,2048)); meta=json.load(open(f"{H}/g/{t}.json"))
    for m in meta:
        b=m["box"]; s=b[2]-b[0]; cx,ey,fw=m["face"]; k=1024/s
        x=(cx-b[0])*k+m["col"]*1024; y=(ey-fw*0.33-b[1])*k+m["row"]*1024; z=fw*0.55*k
        G.paste(E.crop((int(x-z/2),int(y-z/2),int(x+z/2),int(y+z/2))).resize((S,S),Image.LANCZOS),(AGES.index(m["file"][-8:-5])*S,r*S))
    d.text((3,r*S+3),t,fill=(0,0,0),font=F(16))
G.save(out,quality=90)
