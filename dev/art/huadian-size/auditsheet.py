# auditsheet.py tN : forehead crops (same scale: 0.6*facew) of all 84 faces at tier tN with detected box + ratio label
import sys,os,json,numpy as np
from PIL import Image,ImageDraw,ImageFont
sys.path.insert(0,os.path.dirname(__file__))
from face import comp
M=json.load(open("meas.json")); FW=json.load(open("fwmed.json"))
t=sys.argv[1]; S=150
ids=[f"consort-c{i:02d}" for i in range(1,33)]+[f"maid-m{i:02d}" for i in range(1,53)]
cols=12; rows=(len(ids)+cols-1)//cols
sh=Image.new("RGB",(cols*S,rows*(S+16)),"white"); dr=ImageDraw.Draw(sh)
fn=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",12)
for n,i in enumerate(ids):
    k=f"{i}-{t}-a18"; v=M[k]; fw=FW[i]
    rgb=Image.fromarray(comp(Image.open(f"dl/por-{k}.webp")))
    z=0.6*fw; cx,cy=v["cx"],v["ey"]-0.28*fw
    box=(cx-z/2,cy-z/2,cx+z/2,cy+z/2); c=rgb.crop(tuple(int(round(b)) for b in box)).resize((S,S),Image.LANCZOS)
    d=ImageDraw.Draw(c); sc=S/z
    if v["hw"]:
        x0=(v["bx"]-box[0])*sc; y0=(v["by"]-box[1])*sc
        d.rectangle((x0-1,y0-1,x0+v["hw"]*sc+1,y0+v["hh"]*sc+1),outline=(0,200,0))
    X=(n%cols)*S; Y=(n//cols)*(S+16); sh.paste(c,(X,Y))
    r=(v["hw"] or 0)/fw
    dr.text((X+2,Y+S+1),f"{i[-3:]} {r:.3f}",fill="black",font=fn)
sh.save(f"audit_{t}.jpg",quality=80)
