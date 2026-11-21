# STEP0 L1706: change list sheets (0 cr, local pictures only). Run from anywhere.
import os
from PIL import Image, ImageDraw, ImageFont
RS=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')
OUT=os.path.dirname(os.path.abspath(__file__))
F='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; FB='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def P(p,i): return (os.path.join(RS,p),i)
A={t:P('thu_L1666_white/t%d_HOMQUA_%s.png'%(t,i),i) for t,i in [(4,'SyhIap2Ub8'),(5,'xSBe8KVjfW'),(6,'1ldDonjr4r'),(7,'nVsxSZNYQD'),(8,'KLpVBAXkqp')]}
M={t:P('thu_L1666_white/t%d_MOI_%s.png'%(t,i),i) for t,i in [(4,'yiulzUzPW9'),(5,'Cqn8j8HEEy'),(6,'Lw8b9krswO'),(7,'s7I5Nrtl8e'),(8,'N2qwcPB6D9')]}
F4=P('thu_final_t16_L1576/thu_t4_s62_final.webp','SyhKlGwUb8'); F5=P('thu_final_t16_L1576/thu_t5_s62_final.webp','6AbU9EpiJO'); F6=P('thu_final_t16_L1576/thu_t6_s62_final.webp','bxMvHW65Y2')
V4=P('thu_t4_t5_v6_DESIGN20/t4_gOmKedZSXO.png','gOmKedZSXO'); V5=P('thu_t4_t5_v6_DESIGN20/t5_VX7AjYoMMU.png','VX7AjYoMMU')
B4=P('thu_t4_t5_v6b/t4_p8ynPhWehw.png','p8ynPhWehw')
R6=P('thu_t6_t7_t8_release/t6_VX7AgiYMMU.png','VX7AgiYMMU'); E6=P('thu_t6_t7_earfree_job/t6_UPv1mtdwny.png','UPv1mtdwny')
PAL='PALETTE'
# crop boxes as fractions (x0,y0,x1,y1)
FULL=(0,0,1,1); UP=(0.12,0.08,0.88,0.45); MID=(0.1,0.28,0.9,0.68); LOW=(0.05,0.72,0.95,1.0)
ROWS=[ # (change VN, rule/Lượt, tiers, before, after, crop)
 ('Vải Tần + Phi: lụa và sa mỏng thướt tha  →  vải đoạn mỏng, mặt mờ, hoa dệt chìm','B26 (Lượt 1283/1284) + B29 (L1556/L1558)','t4 Tần, t5 Phi',A[4],M[4],MID),
 ('Vải Quý phi: gấm DÀY, NẶNG, màu ĐẬM  →  gấm Tống cẩm NHẸ nhất, mặt mờ','B28 (L1534) + B29 (L1556/L1558)','t6 Quý phi (t7, t8 vẫn gấm dày như cũ)',A[6],M[6],MID),
 ('Cổ áo: bỏ cổ chéo  →  cổ nhiều lớp: áo trong cổ vuông + áo ngoài mở vạt, lộ cổ và xương quai xanh','owner L1361 (DESIGN7); G22 Tần cổ vuông (20/11)','t4–t8 (tất cả)',A[4],F4,UP),
 ('Áo ngoài được thắt lưng buộc ôm vào eo, không còn là áo khoác thả ngoài (HH: áo quấn, đai đè lên)','G40 (L1592, L1627) + G51 (L1657)','t4–t8 (tất cả)',F4,M[4],MID),
 ('Thêu bậc thang: viền thêu ngang ngực, 2 dải thêu dọc vạt trước, viền gấu áo trong + ngoài, nhiều hoa nhỏ, vài hoa LỚN','G42 (L1605) + G47 (L1626, sửa L1645) + K27/G22 hoa to từ Tần (L1503)','t4, t5, t6',F4,V4,FULL),
 ('Hoa thêu thân áo KHÔNG được đè lên các dải viền (vạt, tay, gấu)','G52 (L1653)','t4, t5, t6',B4,M[4],MID),
 ('ĐỔI món đặc trưng Phi ↔ Quý phi: Phi bỏ cổ mây (vân kiên) → áo choàng vai; cổ mây lên Quý phi','G1 SWAP56 (L1266)  ⚠ L1699 lại muốn đổi Phi↔Quý phi','t5 Phi, t6 Quý phi',A[5],F5,UP),
 ('Quý phi: áo choàng/khăn choàng  →  vân kiên 1 tầng, mở phía trước, viền ngọc trai + hạt ngọc rủ','G1 (L1266) + G37 1 tầng (L1543) + L1361 mở trước + L1626','t6 Quý phi',A[6],F6,UP),
 ('Áo choàng Phi = chép y nguyên áo choàng Tần + 1 lớp nhỏ trên mỗi vai','G46 (L1626); trước đó L1596/L1598','t5 Phi',F5,V5,UP),
 ('Phi: thêm 1 dây ngọc trai ngắn vắt ngang ngực','G49 (L1645)','t5 Phi',V5,M[5],UP),
 ('Áo choàng vai Tần: mở phía trước, không cài ở cổ; dây + khoá ngọc thấp trên ngực','L1361 + G46 (L1626) + G38 (L1377/L1572)','t4 Tần',A[4],M[4],UP),
 ('Bỏ dây chuyền (Quý phi: dây vàng-ngọc; HQP: dây ngọc trai-vàng nhiều lớp)','A41 (L1411)','t6, t7',A[7],M[7],UP),
 ('Phượng: lông phượng theo màu riêng (thay xanh lông chim), phượng nhỏ trên ngực HQP','G33 (L1422/L1423/L1430)','t7, t8',A[7],M[7],UP),
 ('Cổ mây HQP nhỏ, gọn, phẳng, 1 tầng, mở trước, tua hơi dài hơn Quý phi','L1437 (DESIGN12) + G37 (L1543) + L1361','t7 HQP',A[7],M[7],UP),
 ('Hoàng hậu: BỎ áo choàng dài chạm đất (mantle)','L1383/L1385','t8 HH',A[8],M[8],FULL),
 ('Hoàng hậu: màu VÀNG chủ đạo (hơn nửa áo)  →  màu riêng chủ đạo, vàng chỉ ở viền/tay/vạt (chép khối HQP)','L1427','t8 HH',A[8],M[8],FULL),
 ('Hoàng hậu: 1 phượng LỚN trước ngực; vân kiên 1 tầng cứng vừa, tua dài nhất; áo thon, không loe chuông','G33 (L1430) + G37 (L1543) + L1411/L1412 + L1536','t8 HH',A[8],M[8],UP),
 ('Thắt lưng: không thắt nơ, ngọc bội không bị che; Phi bỏ đai gấm vàng → thắt lưng lụa thêu; lời Set A','G44 (L1619/L1645) + G45 (L1622) + L1668 + L1673','t4–t8',A[5],M[5],MID),
 ('Không đeo hoa tai; tua/trâm không treo ở tai','F15 (L1037) + sửa Foreman #16 sau bản nháp','t4–t8 (tất cả nữ)',R6,E6,UP),
 ('Hoa cài tóc + hoa thêu theo loài hoa mùa thu: sen (Tần), thục quỳ kép (Phi), cúc (Quý phi, HQP, HH)','F2 (L1342/L1352)','t4–t8',A[6],M[6],UP),
 ('Màu mùa thu: xanh băng → ô liu sáng #9FB577 + tím hồng phấn (chưa vẽ)','G50 PAL3 (L1674); L1699 giữ màu này','t4–t8',A[4],PAL,FULL),
 ('Chân: "thấy hài"  →  chỉ lộ mũi hài dưới gấu áo; đang bước thì không "áo rủ thẳng"','G23 (20/11)','t4–t8',A[4],M[4],LOW),
 ('Góc đứng / tư thế / vật cầm đổi (vd. bình hoa → đèn sen ngọc)','E1/E12 bốc ngẫu nhiên; L1642 bỏ bình; G45 (L1622) — không có lệnh chủ cho từng góc','t4–t8',A[5],M[5],FULL),
 ('Cắt câu lặp cho đủ ≤ 10 000 ký tự (câu tóc t4/t5, "Full-body…", "Everyone beautiful…")','A38 — KHÔNG có lệnh chủ (chỉ cắt cho vừa độ dài)','t4–t8',None,None,FULL),
]
W=1800; RH=600; TW=1000; IW=360; IH=540
def font(s,b=False): return ImageFont.truetype(FB if b else F,s)
def wrap(d,txt,f,w):
    out=[];line=''
    for wd in txt.split(' '):
        t=(line+' '+wd).strip()
        if d.textlength(t,font=f)<=w: line=t
        else: out.append(line); line=wd
    out.append(line); return out
def thumb(src,crop):
    if src is None: return None,'—'
    if src==PAL:
        im=Image.new('RGB',(IW,IH),'white'); d=ImageDraw.Draw(im)
        d.rectangle([20,40,IW-20,300],fill='#9FB577'); d.rectangle([20,320,IW-20,500],fill='#FBE8F8',outline='#999')
        d.text((30,60),'ô liu sáng',font=font(30,True),fill='black'); d.text((30,340),'tím hồng phấn',font=font(30,True),fill='black')
        return im,'chưa vẽ (0 cr)'
    p,i=src; im=Image.open(p).convert('RGB'); w,h=im.size
    im=im.crop((int(crop[0]*w),int(crop[1]*h),int(crop[2]*w),int(crop[3]*h)))
    im.thumbnail((IW,IH)); bg=Image.new('RGB',(IW,IH),'white'); bg.paste(im,((IW-im.size[0])//2,(IH-im.size[1])//2)); return bg,i
per=5; pages=(len(ROWS)+per-1)//per
for pg in range(pages):
    rows=ROWS[pg*per:(pg+1)*per]
    im=Image.new('RGB',(W,150+RH*len(rows)),'white'); d=ImageDraw.Draw(im)
    d.text((30,20),'STEP0 · L1706 · Những thay đổi SAU bộ 20/11 (Tần → Hoàng hậu, s62 thu)',font=font(38,True),fill='black')
    d.text((30,82),'Trang %d/%d · 0 cr (hình cũ có sẵn, không vẽ mới) · chị chọn GIỮ / TRẢ VỀ từng dòng · hình SAU còn màu hồng cũ (màu ô liu chưa vẽ)'%(pg+1,pages),font=font(27),fill='#a00')
    for k,(ch,rule,tiers,b,a,crop) in enumerate(rows):
        n=pg*per+k+1; y=150+k*RH
        d.line([(0,y),(W,y)],fill='#888',width=3)
        d.text((20,y+20),str(n),font=font(70,True),fill='#a00')
        yy=y+25
        for ln in wrap(d,ch,font(38,True),TW-175): d.text((175,yy),ln,font=font(38,True),fill='black'); yy+=50
        yy+=15
        for ln in wrap(d,'Luật / Lượt: '+rule,font(32),TW-175): d.text((175,yy),ln,font=font(32),fill='#004a99'); yy+=42
        yy+=10
        for ln in wrap(d,'Bậc: '+tiers,font(32),TW-175): d.text((175,yy),ln,font=font(32),fill='#333'); yy+=42
        for j,(src,lab) in enumerate([(b,'TRƯỚC'),(a,'SAU')]):
            x=TW+30+j*(IW+30)
            t,i=thumb(src,crop)
            d.text((x,y+10),lab,font=font(30,True),fill='#a00' if j==0 else '#060')
            if t is None: d.rectangle([x,y+50,x+IW,y+50+IH-20],outline='#bbb'); d.text((x+150,y+250),'—',font=font(60),fill='#999'); continue
            im.paste(t,(x,y+48)); d.rectangle([x,y+48,x+IW,y+48+IH],outline='#bbb')
            d.text((x+IW-d.textlength(i,font=font(22)),y+16),i,font=font(22),fill='#555')
    im.save(os.path.join(OUT,'step0_L1706_p%d.jpg'%(pg+1)),quality=82)
    print('saved p%d'%(pg+1))
