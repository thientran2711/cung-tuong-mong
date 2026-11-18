# ksheet.py out.jpg id...  : contact sheet of child lineups (4 ages per row, real-ish relative heights, labels)
import sys,os
from PIL import Image,ImageDraw
W=os.path.dirname(os.path.abspath(__file__)); IMG=os.path.abspath(W+"/../../../img")
ids=sys.argv[2:]; RH=300; CW=150; sc={4:.55,9:.72,14:.86,20:1.0}
cols=2 if len(ids)>6 else 1; rows=(len(ids)+cols-1)//cols
S=Image.new("RGB",(cols*(CW*4+60),rows*(RH+24)),(236,226,206)); d=ImageDraw.Draw(S)
for n,i in enumerate(ids):
    ox=(n%cols)*(CW*4+60); oy=(n//cols)*(RH+24); d.text((ox+6,oy+4),i,fill=(80,30,20))
    for k,a in enumerate((4,9,14,20)):
        p=f"{IMG}/fig-kid-{i}-a{a}.webp"
        if not os.path.exists(p): continue
        im=Image.open(p).convert("RGBA"); h=int(RH*sc[a]); w=int(im.width*h/im.height)
        if w>CW: h=int(h*CW/w); w=CW
        im=im.resize((w,h),Image.LANCZOS); S.paste(im,(ox+40+k*CW+(CW-w)//2,oy+20+RH-h),im)
S.save(sys.argv[1],quality=88); print(sys.argv[1],S.size)
