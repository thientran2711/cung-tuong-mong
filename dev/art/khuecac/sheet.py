# Contact sheet: for each face, the live t1 a18 figure (old, what she wears now outside) beside the new khue cac figure.
# Usage: python3 sheet.py WORKDIR OUT.jpg c05 c08 c29 m05   (2 faces per row, phone-readable)
import sys,os
from PIL import Image,ImageDraw,ImageFont
W=sys.argv[1];out=sys.argv[2];faces=sys.argv[3:]
FH=820;PAD=24;BG=(242,234,218)
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf',34)
f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',26)
def fit(p):
    im=Image.open(p).convert('RGBA');return im.resize((round(im.width*FH/im.height),FH),Image.LANCZOS)
cells=[]
for c in faces:
    role='maid' if c.startswith('m') else 'consort'
    a=fit(os.path.join(W,'ref',c+'.webp'));b=fit(os.path.join(W,'img',f'fig-{role}-{c}-kc-a18.webp'))
    cw=max(a.width,330)+max(b.width,330)+PAD*3;ch=FH+130
    cell=Image.new('RGBA',(cw,ch),BG);d=ImageDraw.Draw(cell)
    name=('Cung nữ ' if role=='maid' else 'Phi tần ')+c
    d.text((cw//2,14),name,font=F,fill=(90,50,40),anchor='mt')
    x1=PAD+(max(a.width,330)-a.width)//2;x2=PAD*2+max(a.width,330)+(max(b.width,330)-b.width)//2
    cell.alpha_composite(a,(x1,62));cell.alpha_composite(b,(x2,62))
    d.text((PAD+max(a.width,330)//2,FH+80),'Phẩm 1 (cũ)',font=f2,fill=(110,90,80),anchor='mt')
    d.text((PAD*2+max(a.width,330)+max(b.width,330)//2,FH+80),'Khuê các (mới)',font=f2,fill=(150,40,40),anchor='mt')
    cells.append(cell)
cw=max(c.width for c in cells);ch=cells[0].height;cols=2;rows=(len(cells)+1)//2
S=Image.new('RGB',(cw*cols+12,ch*rows+12*(rows-1)),(200,185,160))
for i,c in enumerate(cells):
    S.paste(c.convert('RGB'),((i%cols)*(cw+12),(i//cols)*(ch+12)))
S.save(out,quality=88);print(out,S.size)
