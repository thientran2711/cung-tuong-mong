"""L1545 Q2 example (code-drawn, 0 cr): s62 THU robe, same phoenix silhouette, A = outer plumage = robe main, B = outer plumage = secondary."""
import json,os,math
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.abspath(__file__)); c=json.load(open(os.path.join(H,"phoenix_L1536.json"),encoding="utf-8"))["people"]["s62"]["thu"]
m,s,d=c["plumage"]; G=c["outline"]
F=lambda n,b=False:ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf"%("-Bold" if b else ""),n)
def phoenix(dr,ox,oy,outer,inner,eye):
    # tail: 5 long sweeping feathers, each outer teardrop + inner + eye, gold outlines
    for i,ang in enumerate((-40,-20,0,20,40)):
        a=math.radians(ang); L=330-abs(ang)*2
        cx=ox+math.sin(a)*L*0.75; cy=oy+180+math.cos(a)*L*0.6
        for col,r in ((outer,1.0),(inner,0.62),(eye,0.32)):
            w,h=42*r,110*r; dr.ellipse((cx-w,cy-h,cx+w,cy+h),fill=col,outline=G,width=3)
        dr.line((ox,oy+60,cx,cy-110),fill=G,width=3)
    # wings
    for sgn in (-1,1):
        pts=[(ox,oy),(ox+sgn*230,oy-120),(ox+sgn*260,oy-40),(ox+sgn*180,oy+40),(ox,oy+70)]
        dr.polygon(pts,fill=outer,outline=G); dr.line(pts+[pts[0]],fill=G,width=4)
        pts2=[(ox,oy+10),(ox+sgn*170,oy-70),(ox+sgn*185,oy-15),(ox+sgn*120,oy+40),(ox,oy+55)]
        dr.polygon(pts2,fill=inner); dr.line(pts2+[pts2[0]],fill=G,width=3)
        for j in range(4): dr.line((ox+sgn*(60+j*40),oy+30-j*20,ox+sgn*(90+j*40),oy-60-j*15),fill=eye,width=6)
    # body, neck, head, crest
    dr.ellipse((ox-55,oy-40,ox+55,oy+90),fill=outer,outline=G,width=4); dr.ellipse((ox-30,oy-10,ox+30,oy+70),fill=inner)
    dr.line((ox,oy-30,ox+30,oy-150),fill=outer,width=34); dr.line((ox,oy-30,ox+30,oy-150),fill=G,width=2)
    dr.ellipse((ox+5,oy-190,ox+65,oy-135),fill=outer,outline=G,width=4); dr.ellipse((ox+38,oy-172,ox+48,oy-162),fill=eye)
    dr.polygon([(ox+60,oy-165),(ox+95,oy-158),(ox+60,oy-150)],fill=G)
    for j in range(3): dr.line((ox+25+j*10,oy-188,ox+10+j*18,oy-240),fill=G,width=3); dr.ellipse((ox+4+j*18,oy-250,ox+18+j*18,oy-236),fill=eye,outline=G)
W,Hh=1800,1200; im=Image.new("RGB",(W,Hh),(250,246,238)); dr=ImageDraw.Draw(im)
dr.text((30,20),"Câu hỏi Q2 · ví dụ s62 · MÙA THU · vẽ bằng code · 0 cr · TỔNG 0 cr",font=F(40,True),fill=(110,20,30))
dr.text((30,75),f"Nền = màu áo chính {m} · phượng thêu trên áo · viền chỉ vàng {G}",font=F(26),fill=(60,60,60))
for i,(lab,outer,inner) in enumerate((("A · lông NGOÀI = màu áo chính",m,s),("B · lông NGOÀI = màu phụ",s,m))):
    x=30+i*885; dr.rounded_rectangle((x,130,x+855,1170),20,fill=m)
    dr.rounded_rectangle((x+15,145,x+840,215),12,fill="white"); dr.text((x+30,155),lab,font=F(38,True),fill=(30,30,30))
    phoenix(dr,x+427,560,outer,inner,d)
    dr.rounded_rectangle((x+15,1080,x+840,1155),12,fill="white")
    dr.text((x+30,1090),("phượng hoà vào áo, nổi nhờ viền vàng" if i==0 else "phượng nổi rõ trên áo"),font=F(30,True),fill=(30,30,30))
im.save(os.path.join(H,"Q2_mock_s62_thu_A_vs_B.jpg"),quality=88)
