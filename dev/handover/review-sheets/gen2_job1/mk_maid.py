from PIL import Image, ImageDraw, ImageFont
B='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';R='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
f=lambda p,s:ImageFont.truetype(p,s)
items=[('Cung nữ tam đẳng','maid_drafts_CHECK2_2c75a81/NEW_tam_KLpEwy4kqp.png','ĐÃ DUYỆT',(20,140,40),'KLpEwy4kqp · nháp 55 cr'),
('Cung nữ nhất đẳng','maid_drafts_CHECK2_2c75a81/NEW_nhat_4RFSnTa9Aa.png','ĐÃ DUYỆT',(20,140,40),'4RFSnTa9Aa · nháp 55 cr'),
('Cung nữ nhị đẳng','maid_drafts_CHECK2_2c75a81/NEW_nhi_6Ab7cMSiJO.png','BẢN NHÁP · chờ',(200,120,0),'6Ab7cMSiJO · prompt đã sửa, chờ'),
('Thân cận tam đẳng','maid_L1548/tam_thancan_v2.webp','CHƯA DUYỆT',(200,30,30),'v2 cũ (v3 chưa vẽ)'),
('Thân cận nhị đẳng','maid_L1548/nhi_thancan_v2.webp','CHƯA DUYỆT',(200,30,30),'v2 cũ (v3 chưa vẽ)'),
('Thân cận nhất đẳng','maid_L1548/nhat_thancan_v2.webp','CHƯA DUYỆT',(200,30,30),'v2 cũ (v3 chưa vẽ)'),
('Ma ma','maid_L1542/new_mama.webp','CHƯA DUYỆT',(200,30,30),'hình L1542 (chờ mẫu ChatGPT)')]
W=420;H=int(W*2.1);pad=20;top=150;cols=4
rows=2
cv=Image.new('RGB',(cols*(W+pad)+pad,top+rows*(H+170)+110),'white');d=ImageDraw.Draw(cv)
d.text((pad,15),'CUNG NỮ — hình mới nhất mỗi bậc',font=f(B,44),fill='black')
d.text((pad,80),'Model: GPT 2.6 · 1k · low · 9:16 · seed 7172 · 55 cr / tấm (nháp)',font=f(R,30),fill=(60,60,60))
for i,(n,p,m,c,idl) in enumerate(items):
    x=pad+(i%4)*(W+pad);y=top+(i//4)*(H+170)
    im=Image.open(p).convert('RGB');im.thumbnail((W,H))
    cv.paste(im,(x+(W-im.width)//2,y+50))
    d.text((x,y),n,font=f(B,34),fill='black')
    d.text((x,y+50+H+8),m,font=f(B,32),fill=c)
    d.text((x,y+50+H+50),idl,font=f(R,22),fill=(60,60,60))
d.text((pad,cv.height-90),'TỔNG: 0 cr (không vẽ mới)',font=f(B,34),fill=(200,30,30))
cv.save('gen2_job1/cung_nu_status.jpg',quality=88);print(cv.size)
