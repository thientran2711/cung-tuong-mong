import sys,json,math
sys.path.insert(0,'/home/user/cung-tuong-mong/dev/art/face-common')
from make_flower_colours_L2013 import h2o,o2h,gamut,make,name_vi
from PIL import Image,ImageDraw,ImageFont
P=json.load(open('/home/user/cung-tuong-mong/dev/art/face-common/palettes_season_L1726.json'))
F=lambda s,b=False:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),s)
rows=[('s62','thu'),('c05','thu'),('c14','thu')]
GROUP={"Dịu dàng":"#F7D4D8","Sắc sảo":"#EFE9E4"}
def tint(h,dl,cmul=0.7):
    L,C,H=h2o(h); return gamut(min(0.95,max(0.2,L+dl)),C*cmul,H)
def opts(pid,s):
    d=P[pid];m,sc=d[s]['main_hex'],d[s]['sec_hex'];Lm=h2o(m)[0]
    dark=Lm<0.5
    a=tint(m,0.40 if dark else 0.12,0.9) if dark else tint(m,0.14,0.8)
    Ls,Cs,Hs=h2o(sc); b=sc if Cs>0.03 else '#F6EEE2'
    c1=tint(m,-0.12 if not dark else -0.05,0.9); c2=tint(m,0.38 if dark else 0.2,0.55)
    dg=GROUP[d['group']]
    e,_=make(m,sc,d['group'],'emb'); eh,_=make(m,sc,d['group'],'hair')
    return m,sc,[("a",[a],"theo màu chính (cùng hue, nhạt hơn)"),("b",[b],"theo màu phụ"),("c",[c1,c2],"theo tông: đậm | nhạt"),("d",[dg],"theo tính cách (nhóm "+d['group']+")"),("đề xuất",[e,eh],"thêu | tóc (bản JSON)")]
W,H=1500,1080
im=Image.new('RGB',(W,H),'#f6f3f4');d=ImageDraw.Draw(im)
d.text((24,16),"Màu hoa nên theo đâu? So sánh 4 cách (a–d) và đề xuất — mùa Thu, 3 người",font=F(26,True),fill='#2a2226')
d.text((24,54),"Mỗi ô: nền = áo (màu chính, dải = màu phụ); tròn trên áo = hoa thêu; tròn trên nền tóc đen = hoa cài tóc.",font=F(16),fill='#7b6e74')
x0,y0=24,96; cw=272; rh=320
for r,(pid,s) in enumerate(rows):
    m,sc,os=opts(pid,s); y=y0+r*rh
    d.text((x0,y),f"{pid} — {P[pid]['group']}",font=F(20,True),fill='#9b2f4c')
    d.text((x0,y+26),f"áo: {P[pid][s]['main_vi']} {m} + {P[pid][s]['sec_vi']} {sc}",font=F(14),fill='#2a2226')
    for i,(k,cols,lab) in enumerate(os):
        x=x0+i*(cw+10); yy=y+52
        d.rounded_rectangle((x,yy,x+cw,yy+232),10,fill='#ffffff',outline='#e3dadd')
        d.rounded_rectangle((x+8,yy+8,x+cw-8,yy+118),8,fill=m); d.rectangle((x+8,yy+98,x+cw-8,yy+118),fill=sc)
        for j,c in enumerate(cols):
            cx=x+cw//2+(j-(len(cols)-1)/2)*70; d.ellipse((cx-24,yy+30,cx+24,yy+78),fill=c,outline='#00000033')
        d.rounded_rectangle((x+8,yy+124,x+cw-8,yy+172),8,fill='#15100f')
        hc=cols[-1] if k=="đề xuất" else cols[0]
        if k=="c": hc=cols[0]
        for j,c in enumerate(cols if k!="đề xuất" else [cols[1]]):
            cx=x+cw//2+(j-(len(cols if k!="đề xuất" else [1])-1)/2)*70; d.ellipse((cx-17,yy+132,cx+17,yy+166),fill=c,outline='#ffffff55')
        d.text((x+10,yy+180),("Cách "+k if k!="đề xuất" else "ĐỀ XUẤT"),font=F(16,True),fill='#2a2226')
        d.text((x+10,yy+202),lab,font=F(13),fill='#7b6e74')
im.save('/home/user/cung-tuong-mong/dev/handover/review-sheets/flower_options_L2022/flower_options_L2022.png')
