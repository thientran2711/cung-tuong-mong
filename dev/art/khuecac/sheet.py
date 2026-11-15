# Contact sheet, 2 faces per row, phone-readable: for each face LEFT beside RIGHT.
# Usage: python3 sheet.py WORKDIR OUT.jpg LEFT RIGHT face...   LEFT/RIGHT: old (live t1 a18) | kc | ngheo
import sys,os
from PIL import Image,ImageDraw,ImageFont
W,out,L,Rt=sys.argv[1:5];faces=sys.argv[5:]
FH=820;PAD=24;BG=(242,234,218)
LAB={'old':'Phẩm 1 (cũ)','kc':'Khuê các','ngheo':'Nhà nghèo'}
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf',34)
f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',26)
def get(c,t):
    role='maid' if c.startswith('m') else 'consort'
    p=os.path.join(W,'ref',c+'.webp') if t=='old' else os.path.join(W,'img',f'fig-{role}-{c}-{t}-a18.webp')
    im=Image.open(p).convert('RGBA');return im.resize((round(im.width*FH/im.height),FH),Image.LANCZOS)
cells=[]
for c in faces:
    role='maid' if c.startswith('m') else 'consort'
    a=get(c,L);b=get(c,Rt);ca,cb=max(a.width,330),max(b.width,330)
    cw=ca+cb+PAD*3;ch=FH+130
    cell=Image.new('RGBA',(cw,ch),BG);d=ImageDraw.Draw(cell)
    d.text((cw//2,14),('Cung nữ ' if role=='maid' else 'Phi tần ')+c,font=F,fill=(90,50,40),anchor='mt')
    cell.alpha_composite(a,(PAD+(ca-a.width)//2,62));cell.alpha_composite(b,(PAD*2+ca+(cb-b.width)//2,62))
    d.text((PAD+ca//2,FH+80),LAB[L],font=f2,fill=(110,90,80),anchor='mt')
    d.text((PAD*2+ca+cb//2,FH+80),LAB[Rt]+(' (mới)' if Rt!='old' else ''),font=f2,fill=(150,40,40),anchor='mt')
    cells.append(cell)
cw=max(c.width for c in cells);ch=cells[0].height;cols=2;rows=(len(cells)+1)//2
S=Image.new('RGB',(cw*cols+12,ch*rows+12*(rows-1)),(200,185,160))
for i,c in enumerate(cells):S.paste(c.convert('RGB'),((i%cols)*(cw+12),(i//cols)*(ch+12)))
S.save(out,quality=88);print(out,S.size)
