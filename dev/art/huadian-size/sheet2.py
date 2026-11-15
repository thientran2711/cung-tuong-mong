# sheet2.py OUT: 6 faces x [BEFORE | 0.10 | 0.09 | 0.08] forehead close-ups; marks already <= size are left untouched
import sys,json; sys.path.insert(0,'tools')
from face import comp
from PIL import Image,ImageDraw,ImageFont
R=json.load(open('ref.json')); Q=json.load(open('ratios.json'))
B=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",20)
N=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",15)
RK={"t1":"Đáp ứng","t2":"Thường tại","t3":"Quý nhân","t4":"Tần","t5":"Phi","t6":"Quý phi","t7":"Hoàng quý phi","t8":"Hoàng hậu"}
ks=["consort-c05-t5","consort-c05-t8","consort-c30-t4","maid-m19-t2","consort-c13-t7","consort-c03-t1"]
SZ=["0.10","0.09","0.08"]; Z=290; G=6; RH=Z+34
W=20*2+4*Z+3*G; H=100+RH*len(ks)+30
sh=Image.new('RGB',(W,H),(250,247,240)); d=ImageDraw.Draw(sh)
d.text((20,10),"Huadian size sample 2 - pick ONE size for all tiers (cap = that size)",fill=(60,30,20),font=B)
d.text((20,40),"columns: BEFORE (live CDN) | 0.10 | 0.09 | 0.08  (mark width / face width). Same picture, mark shrunk on the skin, face not redrawn.",fill=(80,60,50),font=N)
d.text((20,60),"Marks already at or below the size are left unchanged (never enlarged). Previous sample 0.07 was too small. c03 t1 today = 0.095.",fill=(80,60,50),font=N)
for i,lab in enumerate(["BEFORE"]+SZ):
    d.text((20+i*(Z+G)+4,80),lab if i==0 else f"{lab}  ≈ {round(float(lab)*100)} % of face width",fill=(0,0,0),font=N)
y=100
for k in ks:
    p,t=k.rsplit('-',1); short=p.split('-')[1]; cx,ey,fw=R[p]; r=Q[f"{short}-{t}"]
    b=(int(cx-34),int(ey-60),int(cx+34),int(ey+8))
    orig=Image.fromarray(comp(Image.open(f'dl/por-{k}-a18.webp')))
    cells=[(orig,f"before {r:.3f} ≈ {r*100:.0f} %",(0,0,0))]
    for s in SZ:
        T=float(s)
        if r<=T: cells.append((orig,f"unchanged {r:.3f} ≈ {r*100:.0f} %",(90,90,90)))
        else: cells.append((Image.fromarray(comp(Image.open(f'out_{k}_{s}.png'))),f"{T:.2f} ≈ {T*100:.0f} % of face",(0,110,0)))
    for i,(im,lab,col) in enumerate(cells):
        x=20+i*(Z+G); sh.paste(im.crop(b).resize((Z,Z),Image.LANCZOS),(x,y))
        d.text((x+2,y+Z+3),lab,fill=col,font=N)
    tl=f"{short} {t} {RK[t]}"
    d.rectangle((20,y,20+len(tl)*12+8,y+26),fill=(255,255,255)); d.text((24,y+3),tl,fill=(150,20,20),font=B)
    y+=RH
d.text((20,y+4),"samples only (a18 portraits); nothing batch-processed - waiting for the owner to pick a size",fill=(80,60,50),font=N)
sh.save(sys.argv[1],quality=88); print(sh.size)
