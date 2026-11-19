#!/usr/bin/env python3
"""NDX4: OLD row (NDX3 cuts) above NEW row (NDX4 HH-sleeve cuts), 3-line tags, <=600 KB. Usage: sheet_oldnew.py CUTDIR OUT.jpg"""
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,OUT=sys.argv[1],sys.argv[2]
AGES=["a18","a26","a36","a51","a65"]
ITEMS=["white-jade flute","dragon silk parasol","jade calligraphy brush","jade tiger tally","gold dragon hand warmer"]
OLD=["xSBcFrNjfW","Lw8T5OwswO","BhNSM53oQR","bxMAuPm5Y2","KLpnLBAkqp"]
NEW=["If3JHx0tvE","N2qvcZA6D9","YMl58coWeC","eIPlua7dqL","s7IM3ycl8e"]
FH=820; CW=470; TAG=96; HEAD=60; ROWH=FH+TAG+40; BG=(236,230,220)
F=lambda s,b=False: ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf"%("-Bold" if b else ""),s)
W=CW*5+40; H=HEAD+2*ROWH
sh=Image.new("RGB",(W,H),BG); d=ImageDraw.Draw(sh)
d.text((20,14),"Lượt 683 · Nữ đế m05 — TOP = OLD (NDX3) · BOTTOM = NEW (NDX4: Hoàng hậu sleeve sentences copied: sleeves to the floor, one single layer)",fill=(60,30,20),font=F(26))
for r,(ids,lab) in enumerate(((OLD,"OLD"),(NEW,"NEW"))):
    y0=HEAD+r*ROWH
    d.text((20,y0+4),lab,fill=(150,30,30) if lab=="NEW" else (90,90,90),font=F(30,True))
    for i,cid in enumerate(ids):
        im=Image.open(os.path.join(D,cid+".png")).convert("RGBA"); im=im.crop(im.getbbox())
        s=FH/im.height; im=im.resize((int(im.width*s),FH),Image.LANCZOS)
        if im.width>CW-10: s=(CW-10)/im.width; im=im.resize((CW-10,int(im.height*s)),Image.LANCZOS)
        x=20+i*CW+(CW-im.width)//2; sh.paste(im,(x,y0+40+FH-im.height),im)
        cx=20+i*CW+CW//2; ty=y0+40+FH+6
        for k,(t,f,c) in enumerate(((AGES[i]+" · "+lab,F(30,True),(80,20,20)),(ITEMS[i],F(22),(60,40,30)),("m05 Nữ đế · "+cid,F(20),(90,70,60)))):
            w=d.textlength(t,font=f); d.text((cx-w/2,ty+[0,36,64][k]),t,fill=c,font=f)
q=92
while True:
    sh.save(OUT,quality=q,optimize=True)
    if os.path.getsize(OUT)<=600*1024 or q<40: break
    q-=4
print(OUT,sh.size,os.path.getsize(OUT)//1024,"KB q",q)
