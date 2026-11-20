#!/usr/bin/env python3
"""OLD4: per person -> cut/<p>_tN_cut.png (RGBA, native 1024x2304 figure + 220px label band on top) and <p>_8bac_sheet.jpg (labels on image, A27)."""
import sys
from PIL import Image, ImageDraw, ImageFont
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
RANK={1:'Đáp ứng',2:'Thường tại',3:'Quý nhân',4:'Tần',5:'Phi',6:'Quý phi',7:'Hoàng quý phi',8:'Hoàng hậu'}
p,group=sys.argv[1],sys.argv[2]; place='chưa xếp cung'
import os; os.makedirs('cut',exist_ok=True)
for t in range(1,9):
    fig=Image.open(f'cutraw/{p}_t{t}.png').convert('RGBA'); W,H=fig.size
    c=Image.new('RGBA',(W,H+220),(0,0,0,0)); d=ImageDraw.Draw(c)
    d.rectangle((0,0,W,210),fill=(255,250,240,235))
    d.text((W//2,70),f't{t} · {RANK[t]}',font=ImageFont.truetype(F,72),fill=(130,20,30,255),anchor='mm')
    d.text((W//2,160),f'{p} · {group} · {place}',font=ImageFont.truetype(F,46),fill=(40,40,40,255),anchor='mm')
    c.paste(fig,(0,220),fig); c.save(f'cut/{p}_t{t}_cut.png')
# sheet: 4x2, each panel 600 wide
pw,ph=600,1350; lab=140; top=170
S=Image.new('RGB',(4*pw,top+2*(ph+lab)),(250,246,238)); d=ImageDraw.Draw(S)
d.text((2*pw,top//2),f'{p} · {group} · 8 bậc (tông mới, root pair) · {place}',font=ImageFont.truetype(F,64),fill=(30,30,30),anchor='mm')
for t in range(1,9):
    im=Image.open(f'raw/{p}_t{t}.png').convert('RGB').resize((pw,ph))
    x=((t-1)%4)*pw; y=top+((t-1)//4)*(ph+lab)
    S.paste(im,(x,y))
    d.text((x+pw//2,y+ph+45),f't{t} · {RANK[t]}',font=ImageFont.truetype(F,50),fill=(130,20,30),anchor='mm')
    d.text((x+pw//2,y+ph+105),f'{p} · {group} · {place}',font=ImageFont.truetype(F,30),fill=(60,60,60),anchor='mm')
S.save(f'{p}_8bac_sheet.jpg',quality=88); print(S.size)
