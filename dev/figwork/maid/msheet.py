# msheet.py out.jpg ROLE TIERS ID... : rows = identities, columns = tiers (each 4 ages). TIERS comma list of file tags e.g. tm0,m1,tm2 (m1 = original maid files)
import sys,os
from PIL import Image,ImageDraw,ImageFont
WT="/tmp/claude-0/-home-user-cung-tuong-mong/84f333ce-ebd1-5e4a-9b0c-43035da11b67/scratchpad/wt-maid2/img"
out,role,tiers=sys.argv[1:4]; ids=sys.argv[4:]; tiers=tiers.split(",")
TH=int(os.environ.get("TH",260)); FW=int(TH*0.42); AG=["a18","a26","a36","a51"]; LB=24
W=len(tiers)*(4*FW+16)+70; Hh=len(ids)*(TH+8)+LB
S=Image.new("RGB",(W,Hh),(246,240,228)); d=ImageDraw.Draw(S)
try: font=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",16)
except Exception: font=None
for c,t in enumerate(tiers): d.text((70+c*(4*FW+16)+4,3),t,fill=(90,40,20),font=font)
for r,i in enumerate(ids):
    y=LB+r*(TH+8); d.text((4,y+TH//2),i,fill=(90,40,20),font=font)
    for c,t in enumerate(tiers):
        for k,a in enumerate(AG):
            f=f"{WT}/fig-{role}-{i}-{a}.webp" if t=="m1" else f"{WT}/fig-{role}-{i}-{t}-{a}.webp"
            if not os.path.exists(f): continue
            im=Image.open(f).convert("RGBA"); w,h=im.size; s=TH/h; im=im.resize((max(1,int(w*s)),TH))
            if im.width>FW: im=im.crop(((im.width-FW)//2,0,(im.width-FW)//2+FW,TH))
            S.paste(im,(70+c*(4*FW+16)+k*FW+(FW-im.width)//2,y),im)
S.save(out,quality=86); print(out,S.size)
