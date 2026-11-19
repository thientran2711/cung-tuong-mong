# Lượt 735: season try-on sheet (m04 Đoan trang + m08 Dịu dàng). Usage: make_sheet.py <cut_dir> <out.jpg>
import json,os,sys
from PIL import Image,ImageDraw,ImageFont
D=os.path.dirname(os.path.abspath(__file__)); P=json.load(open(os.path.join(os.path.dirname(D),'palettes_season.json')))
cut,out=sys.argv[1],sys.argv[2]
VN={'xuan':'Xuân','ha':'Hạ','thu':'Thu','dong':'Đông'}
CVN={'melon orange':'cam dưa lưới','powder blue':'xanh phấn','cool lilac':'tím hoa cà lạnh','teal':'xanh mòng két',
 'warm apricot':'mơ ấm','indigo blue':'xanh chàm','hydrangea blue':'xanh cẩm tú cầu','deep plum':'mận chín đậm',
 'peach-salmon':'hồng đào cam','jade green':'xanh ngọc bích','bluebell violet':'tím hoa chuông','cool jade':'xanh ngọc lạnh',
 'terracotta':'đỏ đất nung','pine teal':'xanh lục tùng','pale orchid':'tím lan nhạt','deep sea blue':'xanh biển sâu'}
PEOPLE=[('m04','Đoan trang'),('m08','Dịu dàng')]
F='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';FB='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
ft,fs,fh,fn,fk=ImageFont.truetype(FB,28),ImageFont.truetype(F,17),ImageFont.truetype(FB,24),ImageFont.truetype(F,17),ImageFont.truetype(FB,20)
BG=(247,243,236);CELL=(252,250,246);INK=(40,34,30);SUB=(110,100,92);STAR=(176,120,20)
LW,CW,FH,TH,TOP=150,300,640,104,96
W=LW+4*CW+10;H=TOP+2*(FH+TH+12)+10
im=Image.new('RGB',(W,H),BG);dr=ImageDraw.Draw(im)
dr.text((14,14),'Thử 4 mùa trên người thật (Lượt 735) — chỉ đổi màu, mặt/dáng giữ nguyên',font=ft,fill=INK)
dr.text((14,54),'Mỗi ô: màu chính (áo) + màu phụ (váy) của mùa đó · ★ gốc = mùa chứa màu gốc đã duyệt của nàng',font=fs,fill=SUB)
for r,(m,grp) in enumerate(PEOPLE):
  y0=TOP+r*(FH+TH+12)
  dr.text((14,y0+FH//2-30),m.upper(),font=fh,fill=INK);dr.text((14,y0+FH//2+4),grp,font=fs,fill=SUB)
  for c,s in enumerate(['xuan','ha','thu','dong']):
    x0=LW+c*CW;p=P[m][s];root=P[m]['root_season']==s
    dr.rounded_rectangle((x0+4,y0,x0+CW-4,y0+FH+TH),radius=10,fill=CELL,outline=STAR if root else (225,218,208),width=3 if root else 1)
    fig=Image.open(os.path.join(cut,f'{m}_{s}.png')).convert('RGBA');fig=fig.crop(fig.split()[3].getbbox())
    sc=min((FH-16)/fig.height,(CW-20)/fig.width);fig=fig.resize((int(fig.width*sc),int(fig.height*sc)),Image.LANCZOS)
    im.paste(fig,(x0+(CW-fig.width)//2,y0+8+(FH-16-fig.height)//2),fig)
    ty=y0+FH+4
    dr.text((x0+14,ty),VN[s],font=fk,fill=INK)
    if root: dr.text((x0+14+dr.textlength(VN[s]+'  ',font=fk),ty),'★ gốc',font=fk,fill=STAR)
    for k,(n,h) in enumerate([(p['main'],p['main_hex']),(p['sec'],p['sec_hex'])]):
      yy=ty+32+k*30;dr.rectangle((x0+14,yy,x0+36,yy+22),fill=h,outline=(150,140,130))
      dr.text((x0+44,yy+1),('chính: ' if k==0 else 'phụ: ')+CVN[n],font=fn,fill=INK)
q=88
while True:
  im.save(out,quality=q,optimize=True)
  if os.path.getsize(out)<=900*1024 or q<50: break
  q-=4
print(out,im.size,os.path.getsize(out)//1024,'KB q',q)
