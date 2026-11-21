import json,textwrap
from PIL import Image,ImageDraw,ImageFont
J=json.load(open('/home/user/cung-tuong-mong/dev/art/face-common/season_birds_L2040.json'))
F=lambda s,b=False:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),s)
SN={"xuan":"XUÂN","ha":"HẠ","thu":"THU","dong":"ĐÔNG"}
rows=[(s,b) for s in SN for b in J[s]]
W=1400;rh=118;H=210+len(rows)*rh+150
im=Image.new('RGB',(W,H),'#f6f3f4');d=ImageDraw.Draw(im)
d.text((20,14),"Bảng chim theo mùa trên áo — BẢN NHÁP (chờ chủ nhân duyệt)",font=F(26,True),fill='#2a2226')
d.text((20,52),"Từ cấp 4 Tần: chim nhỏ theo mùa (Tần 1 đôi, Phi 3 con, Quý phi 4 con). Cấp 1–3: không chim. Cấp 7–8: chỉ có phượng (I3). Không phượng ở cấp 1–6.",font=F(14),fill='#7b6e74')
d.text((20,74),"Màu chim: thân = màu hoa thêu của bộ đồ (bảng F20), điểm nhấn nhỏ theo màu thật của loài nhưng nhạt đi theo độ rực của áo; viền chỉ vàng.",font=F(14),fill='#7b6e74')
for t,x in (("Mùa",20),("Chim",110),("Độ chắc / căn cứ",400),("Cách đặt trên áo",690),("Màu thật: thân / bụng / điểm nhấn",1060)): d.text((x,114),t,font=F(14,True),fill='#9b2f4c')
for i,(s,b) in enumerate(rows):
    y=138+i*rh; d.rounded_rectangle((12,y-4,W-12,y+rh-10),8,fill='#fff',outline='#e3dadd')
    d.text((22,y+8),SN[s],font=F(20,True),fill='#2a2226')
    d.text((110,y+6),b['vi'],font=F(17,True),fill='#2a2226'); pass
    d.text((400,y+8),textwrap.fill(b['status_vi'],30),font=F(13),fill='#2a2226')
    d.text((690,y+8),textwrap.fill(b['motif_vi'],36),font=F(13),fill='#2a2226')
    for j,k in enumerate(("body","belly","accent")):
        d.ellipse((1060+j*80,y+10,1060+j*80+56,y+66),fill=b['natural'][k],outline='#00000040')
        d.text((1060+j*80,y+72),b['natural'][k],font=F(11),fill='#7b6e74')
    pass
y=138+len(rows)*rh+6
d.text((20,y),"Nguồn kiểm tra: chỉ có «hỉ thước + mai» là mô-típ cố định được xác nhận; các cặp còn lại là quy ước thiết kế từ ý thơ mùa (én/oanh xuân, sen–uyên ương/bói cá hạ, nhạn/hạc thu).",font=F(13),fill='#2a2226')
d.text((20,y+22),"Không phải chim nào cũng có chuẩn cổ; chủ nhân chọn 1–2 loài mỗi mùa. Chim nhỏ, đuôi ngắn, viền vàng, không nhầm phượng.",font=F(13),fill='#2a2226')
im.crop((0,0,W,y+60)).save('season_birds_L2040.png')
