import json
from PIL import Image,ImageDraw,ImageFont
J=json.load(open('/home/user/cung-tuong-mong/dev/art/face-common/flower_colours_L2013.json'))
F=lambda s,b=False:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),s)
ids=['s62','c05','c14','c02','c04','c06','m02','m18','s20','s40','c26','s55']
W,H=1300,150+len(ids)*92
im=Image.new('RGB',(W,H),'#f6f3f4');d=ImageDraw.Draw(im)
d.text((20,12),"Bảng màu hoa mùa Thu — 12 người (quy tắc đã duyệt L2022/L2025)",font=F(24,True),fill='#2a2226')
d.text((20,48),"Áo đậm → hoa sáng hơn rõ; áo nhạt → hoa đậm hơn một nấc nhưng dịu; màu phụ có sắc → lấy sắc phụ; hoa tóc luôn sáng hơn hoa thêu.",font=F(14),fill='#7b6e74')
cols=[("Người",20),("Áo chính",190),("Áo phụ",470),("Hoa thêu",750),("Hoa cài tóc",1030)]
for t,x in cols: d.text((x,92),t,font=F(15,True),fill='#9b2f4c')
for r,i in enumerate(ids):
    y=118+r*92; e=J[i]['thu']
    d.rounded_rectangle((12,y-4,W-12,y+80),8,fill='#fff',outline='#e3dadd')
    d.text((20,y+10),i,font=F(20,True),fill='#2a2226'); d.text((20,y+40),J[i]['group'],font=F(13),fill='#7b6e74'); d.text((20,y+58),"độ rực: "+{'soft':'dịu','medium':'vừa','vivid':'tươi'}[e['tone']],font=F(12),fill='#7b6e74')
    for (key,vi,x,rnd) in (('main_hex','main_vi',190,0),('sec_hex','sec_vi',470,0),('embroidery_hex','embroidery_vi',750,1),('hair_hex','hair_vi',1030,1)):
        box=(x,y+4,x+56,y+60)
        (d.ellipse if rnd else d.rounded_rectangle)(box,**({} if rnd else {'radius':8}),fill=e[key],outline='#00000033')
        d.text((x+64,y+8),e[key],font=F(13,True),fill='#2a2226'); 
        words=e[vi]; d.text((x+64,y+28),words[:24],font=F(12),fill='#7b6e74'); d.text((x+64,y+44),words[24:],font=F(12),fill='#7b6e74')
im.save('/home/user/cung-tuong-mong/dev/handover/review-sheets/flower_sheet_L2025/flower_sheet_thu_L2025.png')
