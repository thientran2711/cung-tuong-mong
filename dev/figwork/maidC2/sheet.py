# sheet.py JID... : one readable sheet per lineup -> sheets/C_mNN_tK.jpg (4 figures + 4 portraits)
import sys,os
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.abspath(__file__)); O=H+"/out"
try: F=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",26)
except Exception: F=None
AG=[("a18","19"),("a26","24"),("a36","32"),("a51","48")]
for j in sys.argv[1:]:
    _,who,tt=j.split("-"); tier=tt[1:] if tt=="tcold" else tt
    TH=900; CW=430; S=Image.new("RGB",(CW*4,50+TH+20+CW-60),(246,240,228)); d=ImageDraw.Draw(S)
    d.text((16,10),f"Part C · {who} · {tier}",fill=(90,40,20),font=F)
    for k,(a,lab) in enumerate(AG):
        f=Image.open(f"{O}/fig-maid-{who}-{tier}-{a}.webp").convert("RGBA")
        if f.width>CW-10: f=f.resize((CW-10,int(f.height*(CW-10)/f.width)))
        S.paste(f,(k*CW+(CW-f.width)//2,50+TH-f.height),f)
        p=Image.open(f"{O}/por-maid-{who}-{tier}-{a}.webp").convert("RGBA").resize((CW-80,CW-80))
        bg=Image.new("RGBA",p.size,(255,252,245,255)); bg.alpha_composite(p)
        S.paste(bg,(k*CW+40,50+TH+10)); d.text((k*CW+44,50+TH+14),lab,fill=(90,40,20),font=F)
    S.save(f"{H}/sheets/C_{who}_{tier}.jpg",quality=84)
print("ok")
