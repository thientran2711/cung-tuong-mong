# sheet.py JID... : one readable preview per lineup -> sheets/C_mNN_tK.jpg (identity ref fig a18 at left, then the 4 new ages)
import sys,os
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.abspath(__file__)); os.makedirs(H+"/sheets",exist_ok=True)
F=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",22)
TH=760; CW=380
for jid in sys.argv[1:]:
    _,who,tt=jid.split("-")
    fs=[f"/home/user/cung-tuong-mong/img/fig-maid-{who}-a18.webp"]+[f"{H}/out/img/fig-maid-{who}-{tt}-{a}.webp" for a in ("a18","a26","a36","a51")]
    S=Image.new("RGB",(CW*5+40,TH+60),(246,240,228)); d=ImageDraw.Draw(S)
    labs=["ref (cung nữ)","19","24","32","48"]
    for k,f in enumerate(fs):
        im=Image.open(f).convert("RGBA"); s=TH/im.height; im=im.resize((int(im.width*s),TH),Image.LANCZOS)
        if im.width>CW: im=im.crop(((im.width-CW)//2,0,(im.width-CW)//2+CW,TH))
        x=20+k*CW+(40 if k else 0)//2; S.paste(im,(x+(CW-im.width)//2,50),im); d.text((x+10,12),labs[k],fill=(90,40,20),font=F)
    d.text((CW*5-200,TH+20),jid,fill=(120,30,20),font=F)
    S.save(f"{H}/sheets/C_{who}_{tt}.jpg",quality=82)
print("ok")
