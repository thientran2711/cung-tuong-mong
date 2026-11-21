from PIL import Image, ImageDraw, ImageFont
B='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
R='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
f=lambda p,s:ImageFont.truetype(p,s)
S=1.17
big=Image.open('winter1/s62_dong_coLong_t1-t8.webp').convert('RGB')
def crop(c,r):
    x0=[15,511,1007,1503][c];y0=[80,871][r]
    return big.crop((int(x0*S),int(y0*S),int((x0+325)*S),int((y0+730 if r==0 else y0+730)*S)))
tiers=[('t1 Đáp ứng',crop(0,0),'chưa duyệt','lông v2 · 20/11 · 1ldmoUCr4r'),
('t2 Thường tại',crop(1,0),'chưa duyệt','lông v2 · jUoattyLD0'),
('t3 Quý nhân',crop(2,0),'chưa duyệt','lông v2 · jUoam4eLD0'),
('t4 Tần',Image.open('winter1/s62_t4_dong_long3.webp').convert('RGB'),'chưa duyệt','lông v3 · hu20QqTvqL'),
('t5 Phi',crop(0,1),'chưa duyệt','lông v2 · Lw8fhqlswO'),
('t6 Quý phi',crop(1,1),'chưa duyệt','lông v2 · 1ldmIAjr4r'),
('t7 Hoàng quý phi',crop(2,1),'chưa duyệt','lông v2 · 8aizA8UIrU'),
('t8 Hoàng hậu',Image.open('winter1/s62_t8_dong_long3.webp').convert('RGB'),'chưa duyệt','lông mới · eIPZ5GkdqL')]
# t4/t8 files are sheets w/ multiple panels: take left panel
def left(im,frac): return im.crop((0,0,int(im.width*frac),im.height))
def sub(im,x0,x1,y0,y1):
    w,h=im.size;return im.crop((int(w*x0),int(h*y0),int(w*x1),int(h*y1)))
tiers[3]=(tiers[3][0],sub(tiers[3][1],0.0,0.63,0.07,0.955))+tiers[3][2:]
tiers[7]=(tiers[7][0],sub(tiers[7][1],0.0,0.485,0.07,0.955))+tiers[7][2:]
W=420;H=int(W*2.2)
cols=4;pad=20;top=150
cv=Image.new('RGB',(cols*(W+pad)+pad,top+2*(H+190)+120),'white')
d=ImageDraw.Draw(cv)
d.text((pad,15),'ĐÔNG (mùa đông) — hình mới nhất mỗi bậc t1–t8',font=f(B,44),fill='black')
d.text((pad,80),'Model: GPT 2.6 · 135 cr/tấm (bản cuối) · mặt s62 · hình CÓ LÔNG, đã vẽ 20/11',font=f(R,30),fill=(60,60,60))
for i,(n,im,mark,idl) in enumerate(tiers):
    c=i%4;r=i//4
    x=pad+c*(W+pad);y=top+r*(H+190)
    im=im.copy();im.thumbnail((W,H))
    cv.paste(im,(x+(W-im.width)//2,y+50))
    d.text((x,y),n,font=f(B,36),fill='black')
    d.text((x,y+50+H+8),mark.upper(),font=f(B,34),fill=(200,30,30))
    d.text((x,y+50+H+52),idl,font=f(R,24),fill=(60,60,60))
d.text((pad,cv.height-100),'TỔNG: 0 cr (không vẽ mới) · cờ đỏ = chưa có tấm nào được DUYỆT cho đông',font=f(B,32),fill=(200,30,30))
cv.save('gen2_job1/dong_status.jpg',quality=88)
print(cv.size)
