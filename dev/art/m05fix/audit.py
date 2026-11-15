# audit.py OUT tN [age] : forehead crops of all 84 faces at one tier (same scale: crop = 0.9 fw), first cell = c03 t1 reference
import sys
from lib import *
out,t=sys.argv[1],sys.argv[2]; a=sys.argv[3] if len(sys.argv)>3 else "a18"
W=WT+"/img/"; S=130; C=10
faces=["consort-c03-t1"]+[f"consort-c{i:02d}-{t}" for i in range(1,33)]+[f"maid-m{i:02d}-{t}" for i in range(1,53)]
R=(len(faces)+C-1)//C; G=Image.new("RGB",(C*S,R*(S+16)),(255,255,255)); d=ImageDraw.Draw(G)
for k,f in enumerate(faces):
    p=W+f"fig-{f}-{a}.webp"
    try: c=fh_crop(p,S,z=0.9,up=0.30)
    except Exception as e: continue
    x,y=(k%C)*S,(k//C)*(S+16)
    G.paste(c,(x,y+16)); d.text((x+2,y+1),("REF " if k==0 else "")+f.split("-")[1]+" "+f.split("-")[2],fill=(200,0,0) if k==0 else (0,0,0),font=F(12))
G.save(out,quality=85); print(out)
