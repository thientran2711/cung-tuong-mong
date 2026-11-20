import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
W,H,XS,VH,GAP,TAGY=1162,599,[168,421,654,888],438.7,69.7,533.3
SC=2;F='/usr/share/fonts/truetype/dejavu/'
f1=ImageFont.truetype(F+'DejaVuSerif.ttf',10*SC);f3=ImageFont.truetype(F+'DejaVuSerif-Bold.ttf',12*SC)
def run(room,out,figs,labels):
    im=Image.open(room).convert('RGB');s=max(W/im.width,H/im.height);w,h=round(im.width*s*SC),round(im.height*s*SC)
    st=im.resize((w,h),Image.LANCZOS);x0=(w-W*SC)//2;st=st.crop((x0,h-H*SC,x0+W*SC,h)).convert('RGBA')
    feet=H-GAP
    for cx,k in zip(XS,figs):
        fg=Image.open(f'figs/{k}.webp').convert('RGBA');fg=fg.crop(fg.getbbox())
        fg=fg.resize((round(fg.width*VH*SC/fg.height),round(VH*SC)),Image.LANCZOS)
        st.alpha_composite(fg,(round(cx*SC-fg.width/2),round(feet*SC-fg.height)))
    txt=Image.new('RGBA',st.size,(0,0,0,0));d=ImageDraw.Draw(txt)
    for cx,(a,b) in zip(XS,labels):
        y=TAGY*SC
        for t,f,col,lh in ((a,f1,(178,34,34),12.5),(b,f3,(40,28,20),14)):
            tw=d.textlength(t,font=f);d.text((cx*SC-tw/2,y),t,font=f,fill=col+(255,));y+=lh*SC
    halo=txt.split()[3].filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(2))
    glow=Image.new('RGBA',st.size,(255,248,235,0));glow.putalpha(halo.point(lambda v:min(255,v*2)*0.8))
    st.alpha_composite(glow);st.alpha_composite(txt)
    # header
    st=st.convert('RGB');d=ImageDraw.Draw(st);hf=ImageFont.truetype(F+'DejaVuSans-Bold.ttf',64)
    t='NỮ ĐẾ  ·  '+out.split('trong ')[-1][:-4];tw=d.textlength(t,font=hf);d.rounded_rectangle((st.width/2-tw/2-30,14,st.width/2+tw/2+30,104),18,fill=(250,243,230),outline=(150,40,30),width=4);d.text((st.width/2-tw/2,24),t,font=hf,fill=(150,30,20))
    st.save(out,quality=90);print(out,st.size)
L=lambda ks:[('Nữ đế',k.split('-')[1]+(' '+k.split('-')[2] if k.split('-')[2].startswith('a') else '')) for k in ks]
R=[('chung-tu-cung-dong-phoi-ngu-r3','Chung Tú đông · phòng ngủ',['nd-m05-0','nd-m29-1','nd-m05-a51','nd-m29-a65']),
   ('ham-an-cung-dong-phoi','Hàm An đông · tiếp khách',['nd-m29-0','nd-m05-2','nd-m29-a51','nd-m05-a65']),
   ('dien-huy-cung-tay-phoi-ngu','Diên Huy tây · phòng ngủ',['nd-m05-1','nd-m29-2','nd-m05-a51','nd-m29-a65']),
   ('dien-huy-cung-dong-phoi','Diên Huy đông · tiếp khách',['nd-m29-0','nd-m05-0','nd-m29-a51','nd-m05-a65'])]
for i,(k,name,figs) in enumerate(R,1):
    run(f'rooms/{k}.webp',f'out/{i} Nữ đế trong {name}.jpg',figs,L(figs))
