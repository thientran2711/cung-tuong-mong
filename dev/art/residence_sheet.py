# Bảng ghép tranh nơi ở (mọi phòng, một mùa-buổi) có nhãn: python3 dev/art/residence_sheet.py [xuan-sang]
import sys,os
from PIL import Image,ImageDraw,ImageFont
R=os.path.dirname(os.path.abspath(__file__))+'/../shots/residence/'
V=sys.argv[1] if len(sys.argv)>1 else 'xuan-sang'
VN=' · '.join({'xuan':'Xuân','ha':'Hạ','thu':'Thu','dong':'Đông','sang':'Sáng','trua':'Trưa','chieu':'Chiều','toi':'Tối'}.get(x,x) for x in V.split('-'))
P=[('canh-phuc','Cảnh Phúc cung'),('khai-tuong','Khải Tường cung'),('chung-tu','Chung Tú cung'),('ham-an','Hàm An cung'),
   ('thua-minh','Thừa Minh cung'),('dien-huy','Diên Huy cung'),('vinh-hoa','Vĩnh Hòa cung'),('truong-xuan','Trường Xuân cung')]
C=[('','Chính điện (chủ vị)'),('-dong-phoi','Đông phối điện'),('-tay-phoi','Tây phối điện')]
W,H,G,LB,TOP=1100,733,24,64,150
F=lambda s,b=False:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif%s.ttf'%('-Bold' if b else ''),s)
rows=len(P)+1;SW=G+3*(W+G);SH=TOP+rows*(H+LB+G)+G
S=Image.new('RGB',(SW,SH),(246,236,214));d=ImageDraw.Draw(S)
d.text((G,30),f'Nơi ở trong cung · {VN} · Magnific gpt-2-6 · 3:2',font=F(52,True),fill=(90,30,20))
def cell(f,x,y,lab):
    p=R+f+'.webp'
    if not os.path.exists(p):p=R+'../../../img/'+f+'.webp'
    if os.path.exists(p):S.paste(Image.open(p).convert('RGB').resize((W,H),Image.LANCZOS),(x,y+LB))
    else:d.rectangle([x,y+LB,x+W,y+LB+H],outline=(150,120,90),width=3);d.text((x+30,y+LB+30),'chưa có',font=F(40),fill=(150,120,90))
    d.text((x+6,y+10),lab,font=F(40,True),fill=(90,30,20))
y=TOP
for k,n in P:
    for j,(s,cn) in enumerate(C):cell(f'{k}-cung{s}-{V}',G+j*(W+G),y,f'{n} · {cn}')
    y+=H+LB+G
cell(f'cung-nhan-{V}',G,y,'Dãy nhà cung nhân (cung nữ, ma ma; dùng chung)')
out=R+f'sheet-{V}.jpg';S.save(out,quality=88);print(out,S.size)
