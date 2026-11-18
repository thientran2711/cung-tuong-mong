import sys,os
from PIL import Image,ImageDraw,ImageFont
font=ImageFont.load_default(size=16)
src,out=sys.argv[1],sys.argv[2]
people=sys.argv[3:]
TW,TH=175,394
os.makedirs(out,exist_ok=True)
for c in people:
    S=Image.new('RGB',(8*TW,3*TH+22),(235,228,215))
    d=ImageDraw.Draw(S)
    for v in range(3):
        for t in range(1,9):
            f=f'{src}/{c}_t{t}_v{v}.png'
            im=Image.open(f).convert('RGBA'); h=TH; w=round(im.width*h/im.height)
            im=im.resize((w,h),Image.LANCZOS)
            S.paste(im.convert('RGB'),((t-1)*TW+(TW-w)//2,22+v*TH),im.split()[-1])
    for t in range(1,9): d.text(((t-1)*TW+6,3),f'{c} t{t}',fill=(60,40,20),font=font)
    S.save(f'{out}/{c}_a18_b10_sheet.jpg',quality=88)
print('done',people)
