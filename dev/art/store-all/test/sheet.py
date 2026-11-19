import sys,re,os,textwrap
sys.path.insert(0,"dev/art/store-all"); import build_all as B
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1]; OUT=sys.argv[2]
RN=["Đáp ứng","Thường tại","Quý nhân","Tần","Phi","Quý phi","Hoàng quý phi","Hoàng hậu"]
ANGS={0:"chính diện",1:"hơi xoay trái",2:"3/4 phải",3:"chính diện, dồn chân phải",4:"3/4 trái",5:"hơi xoay phải",6:"hơi xoay trái",7:"chính diện (đối xứng)",8:"hơi xoay phải",9:"3/4 trái",10:"chính diện, dồn chân trái",11:"3/4 phải",12:"hơi xoay trái",13:"hơi xoay phải"}
F=lambda s:ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",s)
FB=lambda s:ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",s)
info={}
for p in ("m13","m20"):
    n=int(p[1:])
    for t in range(1,9):
        pk,prop,sp,body=B.dedupe_pick(p,t,"a18")
        info[(p,t)]=dict(ang=(t-1+n-1)%14,item=prop,img=f"{S}/cut/{p}_t{t}.png")
W,H=420,945
def cell(p,t,lab):
    im=Image.open(info[(p,t)]["img"]).convert("RGBA"); im=im.resize((W,int(im.height*W/im.width)))
    c=Image.new("RGB",(W,H+150),(246,241,231)); c.paste(im,(0,0),im)
    d=ImageDraw.Draw(c); y=H+8
    for i,l in enumerate(lab):
        for w in textwrap.wrap(l,34 if i else 30):
            d.text((10,y),w,fill=(40,30,30),font=FB(22) if i==0 else F(19)); y+=26
    return c
def sheet(cells,cols,title,fn):
    rows=(len(cells)+cols-1)//cols; cw,ch=cells[0].size
    sh=Image.new("RGB",(cols*cw+(cols+1)*10,rows*ch+(rows+1)*10+60),(255,255,255)); d=ImageDraw.Draw(sh); d.text((14,14),title,fill=(0,0,0),font=FB(30))
    for i,c in enumerate(cells): sh.paste(c,(10+(i%cols)*(cw+10),70+(i//cols)*(ch+10)))
    sh.save(fn,quality=88); print(fn,sh.size)
for p in ("m13","m20"):
    cs=[cell(p,t,[f"t{t} {RN[t-1]} · góc {info[(p,t)]['ang']}",f"cầm {info[(p,t)]['item']}"]) for t in range(1,9)]
    sheet(cs,8,f"{p} — 8 bậc (Lượt 469): góc đứng / đồ cầm / dáng khác nhau · phi bạch t1–t6",f"{OUT}/{p}_8rank_angles.jpg")
order=sorted(info,key=lambda k:(info[k]["ang"],k))
cs=[cell(p,t,[f"góc {info[(p,t)]['ang']}: {ANGS[info[(p,t)]['ang']]}",f"{p} t{t} {RN[t-1]}"]) for p,t in order]
sheet(cs,8,"m13 + m20 — 16 hình xếp theo 14 góc đứng (góc 5 và 12 có 2 hình)",f"{OUT}/m13_m20_14angles.jpg")
