# maskchk.py OUT FACE... : every grid tile (t1-t7 x 4 ages) with the paste ellipse drawn, to catch bad face detection
import sys,json
from PIL import Image,ImageDraw
from lib import F
out=sys.argv[1]; fs=sys.argv[2:]; S=96; R="../hd"
G=Image.new("RGB",(28*S,len(fs)*S),(255,255,255)); d=ImageDraw.Draw(G)
for r,f in enumerate(fs):
    for t in range(1,8):
        g=Image.open(f"{R}/{f}/g/t{t}.jpg"); meta=json.load(open(f"{R}/{f}/g/t{t}.json"))
        for k,m in enumerate(meta):
            b=m["box"]; s=b[2]-b[0]; cx,ey,fw=m["face"]; q=1024/s
            tile=g.crop((m["col"]*1024,m["row"]*1024,m["col"]*1024+1024,m["row"]*1024+1024)).copy(); dd=ImageDraw.Draw(tile)
            x=(cx-b[0])*q; y=(ey-fw*0.36-b[1])*q; rx=fw*0.24*q; ry=fw*0.30*q
            dd.ellipse((x-rx,y-ry,x+rx,y+ry),outline=(0,200,0),width=10)
            G.paste(tile.resize((S,S)),(((t-1)*4+k)*S,r*S))
    d.text((2,r*S+2),f[-3:],fill=(0,0,255),font=F(14))
G.save(out,quality=85)
