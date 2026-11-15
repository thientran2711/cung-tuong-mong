import sys,json; sys.path.insert(0,'tools')
from face import comp
from PIL import Image,ImageDraw,ImageFont
R=json.load(open('ref.json')); Q=json.load(open('ratios.json'))
B=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",20)
N=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",16)
RK={"t1":"Đáp ứng","t2":"Thường tại","t3":"Quý nhân","t4":"Tần","t5":"Phi","t6":"Quý phi","t7":"Hoàng quý phi","t8":"Hoàng hậu"}
ks=["consort-c05-t5","consort-c05-t8","consort-c30-t4","maid-m19-t2","consort-c13-t7","consort-c03-t1"]
T=0.07; PW,PH=230,303; Z=300; RH=PH+12
W=24+PW*2+Z*2+60; H=90+RH*len(ks)+40
sh=Image.new('RGB',(W,H),(250,247,240)); d=ImageDraw.Draw(sh)
d.text((20,12),"Huadian size sample - proposed ONE size for all tiers: width = 0.07 x face width (cap 0.08)",fill=(60,30,20),font=B)
d.text((20,42),"left: BEFORE (live CDN)   right: AFTER (same picture, mark shrunk on the skin, face not redrawn)   numbers = mark width / face width",fill=(80,60,50),font=N)
d.text((20,62),"reference: c03 t1 today = 0.095 (old rule cap t6 = 0.119)",fill=(80,60,50),font=N)
y=90
for k in ks:
    p,t=k.rsplit('-',1); short=p.split('-')[1]; cx,ey,fw=R[p]; r=Q[f"{short}-{t}"]
    a=Image.fromarray(comp(Image.open(f'dl/por-{k}-a18.webp'))); o=Image.fromarray(comp(Image.open(f'out_{k}.png')))
    b=(int(cx-34),int(ey-60),int(cx+34),int(ey+8))
    x=20
    for im in (a,o):
        sh.paste(im.resize((PW,PH),Image.LANCZOS),(x,y)); x+=PW+4
    x+=10
    for im in (a,o):
        sh.paste(im.crop(b).resize((Z,Z),Image.LANCZOS),(x,y)); x+=Z+4
    lab=f"{short} {t} {RK[t]}"
    d.rectangle((20,y,20+len(lab)*12+8,y+26),fill=(255,255,255)); d.text((24,y+3),lab,fill=(150,20,20),font=B)
    xa=20+PW*2+18
    d.rectangle((xa,y+Z-24,xa+130,y+Z),fill=(255,255,255)); d.text((xa+4,y+Z-22),f"before {r:.3f}",fill=(0,0,0),font=N)
    d.rectangle((xa+Z+4,y+Z-24,xa+Z+134,y+Z),fill=(255,255,255)); d.text((xa+Z+8,y+Z-22),f"after {T:.3f}",fill=(0,110,0),font=N)
    y+=RH
d.text((20,y+8),"samples only (a18 portraits); nothing batch-processed - waiting for owner approval",fill=(80,60,50),font=N)
sh.save(sys.argv[1],quality=88)
print(sh.size)
