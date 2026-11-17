# ba.py SRC OUT SHEET.png NAME... : before|after forehead zoom (3x) per row
import sys
from PIL import Image,ImageDraw
src,out,sheet=sys.argv[1:4]; ns=sys.argv[4:]; Z=3; CW,CH=160,110
rows=[]
for n in ns:
    a=Image.open(f'{src}/{n}.webp').convert('RGB')
    try: b=Image.open(f'{out}/{n}.webp').convert('RGB')
    except Exception: b=a
    w,h=a.size; cx=w//2; cy=int(h*0.33) if h<600 else int(h*0.10)
    import json
    box=(cx-CW//2,cy-CH//2,cx+CW//2,cy+CH//2)
    rows.append((n,a.crop(box).resize((CW*Z,CH*Z),Image.LANCZOS),b.crop(box).resize((CW*Z,CH*Z),Image.LANCZOS)))
S=Image.new('RGB',(CW*Z*2+10,len(rows)*(CH*Z+16)),'white'); d=ImageDraw.Draw(S)
for i,(n,a,b) in enumerate(rows):
    y=i*(CH*Z+16); d.text((4,y+2),n,fill='black'); S.paste(a,(0,y+16)); S.paste(b,(CW*Z+10,y+16))
S.save(sheet)
