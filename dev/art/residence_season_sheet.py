# Bảng ghép một mùa: 25 phòng (hàng) × 4 buổi (cột), từ ảnh game img/<phòng>-<mùa>-<buổi>.webp
# python3 dev/art/residence_season_sheet.py xuan|ha|thu|dong  → dev/shots/residence/sheet-<mùa>.jpg
import sys,os
from PIL import Image,ImageDraw,ImageFont
D=os.path.dirname(os.path.abspath(__file__))+'/../../'
SE=sys.argv[1];SN={'xuan':'Xuân','ha':'Hạ','thu':'Thu','dong':'Đông'}[SE]
P=[('canh-phuc','Cảnh Phúc'),('khai-tuong','Khải Tường'),('chung-tu','Chung Tú'),('ham-an','Hàm An'),('thua-minh','Thừa Minh'),('dien-huy','Diên Huy'),('vinh-hoa','Vĩnh Hòa'),('truong-xuan','Trường Xuân')]
R=[(f'{k}-cung{s}',f'{n} · {c}') for k,n in P for s,c in [('','chính điện'),('-dong-phoi','Đông phối'),('-tay-phoi','Tây phối')]]+[('cung-nhan','Dãy nhà cung nhân')]
T=[('sang','Sáng'),('trua','Trưa'),('chieu','Chiều'),('toi','Tối')]
W,H,G,LW,TOP=600,400,10,300,110
F=lambda s,b=False:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif%s.ttf'%('-Bold' if b else ''),s)
S=Image.new('RGB',(LW+4*(W+G)+G,TOP+len(R)*(H+G)+G),(246,236,214));d=ImageDraw.Draw(S)
d.text((G,14),f'Nơi ở · mùa {SN} · 25 phòng × 4 buổi',font=F(40,True),fill=(90,30,20))
for j,(t,tn) in enumerate(T):d.text((LW+j*(W+G)+G+8,64),tn,font=F(30,True),fill=(90,30,20))
for i,(f,lab) in enumerate(R):
    y=TOP+i*(H+G);yy=y+H//2-40
    for w,line in enumerate(lab.split(' · ')):d.text((G,yy+w*40),line,font=F(28,True),fill=(90,30,20))
    for j,(t,_) in enumerate(T):
        p=f'{D}img/{f}-{SE}-{t}.webp';x=LW+j*(W+G)+G
        if os.path.exists(p):S.paste(Image.open(p).convert('RGB').resize((W,H),Image.LANCZOS),(x,y))
        else:d.rectangle([x,y,x+W,y+H],outline=(150,120,90),width=3);d.text((x+20,y+20),'chưa có',font=F(26),fill=(150,120,90))
o=f'{D}dev/shots/residence/sheet-{SE}.jpg';S.save(o,quality=84);print(o,S.size)
