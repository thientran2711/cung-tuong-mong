# REDRAW3: labelled 8-rank sheet + transparent cut-outs with label band (method of dev/art/rank8-s65/cut)
import sys,os
from PIL import Image,ImageDraw,ImageFont
P,GROUP,SRC,OUT=sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4]
RANKS=["Đáp ứng","Thường tại","Quý nhân","Tần","Phi","Quý phi","Hoàng quý phi","Hoàng hậu"]
PLACE=["phòng phối chung","phòng phối chung","phòng phối chung","chính điện riêng","chính điện riêng","chính điện riêng","cung Hoàng quý phi","Khôn Ninh cung"]
B="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
f1=ImageFont.truetype(B,64); f2=ImageFont.truetype(B,46)
# sheet
W,H=1024,2304; band=230
sheet=Image.new("RGB",(W*4,(H+band)*2),"white"); d=ImageDraw.Draw(sheet)
for i in range(8):
    im=Image.open(f"{SRC}/{P}_t{i+1}.png").convert("RGB"); x=(i%4)*W; y=(i//4)*(H+band)
    sheet.paste(im,(x,y+band))
    d.text((x+30,y+18),f"t{i+1} · {RANKS[i]}",font=f1,fill="black")
    d.text((x+30,y+100),f"{P} · {GROUP}",font=f2,fill=(60,60,60))
    d.text((x+30,y+160),PLACE[i],font=f2,fill=(60,60,60))
sheet=sheet.resize((sheet.width//2,sheet.height//2),Image.LANCZOS)
sheet.save(f"{OUT}/{P}_8bac_sheet.jpg",quality=90)
# cut-outs: native 1024x2304 figure, 220 px label band on top (canvas 1024x2524)
for i in range(8):
    c=Image.open(f"{SRC}/cut_t{i+1}.png").convert("RGBA")
    if c.size!=(W,H): c=c.resize((W,H),Image.LANCZOS)
    can=Image.new("RGBA",(W,H+220),(0,0,0,0)); dd=ImageDraw.Draw(can)
    dd.rectangle((0,0,W,200),fill=(255,255,255,235))
    dd.text((24,14),f"t{i+1} · {RANKS[i]}",font=f1,fill="black")
    dd.text((24,100),f"{P} · {GROUP} · {PLACE[i]}",font=f2,fill=(50,50,50))
    can.alpha_composite(c,(0,220)); can.save(f"{OUT}/cut/{P}_t{i+1}_cut.png")
print("done")
