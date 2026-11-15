# python3 bigsheet.py OUT.jpg COLS key[=label] ...  -> big labelled review sheet: each tile 540 px wide (the game crop 384:506 taken
# from the raw 1k render in $RAW when present, else img/act-<key>.webp), label = key + the meaning (meanings.py first regex head) below.
import sys,os,glob,re
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..')); RAW=os.environ.get('RAW','')
out,cols=sys.argv[1],int(sys.argv[2]); items=[a.split('=',1)+[''] for a in sys.argv[3:]]
W=540; TH=round(W*506/384); LH=64
try: F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22); F2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',19)
except: F=F2=ImageFont.load_default()
def tile(k):
    r=sorted(glob.glob(os.path.join(RAW,k+'_*.png')),key=os.path.getmtime) if RAW else []
    if r:
        im=Image.open(r[-1]).convert('RGB'); w,h=im.size; A=384/506
        cw,ch=(round(h*A),h) if w/h>A else (w,round(w/A)); x0=(w-cw)//2; y0=(h-ch)//2; im=im.crop((x0,y0,x0+cw,y0+ch))
    else:
        p=k if os.sep in k else os.path.join(ROOT,'img','act-'+k+'.webp'); im=Image.open(p).convert('RGB')
    return im.resize((W,TH),Image.LANCZOS)
rows=(len(items)+cols-1)//cols; S=Image.new('RGB',(cols*(W+16)+16,rows*(TH+LH+16)+16),'#f4ecdd'); d=ImageDraw.Draw(S)
for i,(k,lab,*_) in enumerate(items):
    x=16+(i%cols)*(W+16); y=16+(i//cols)*(TH+LH+16); S.paste(tile(k),(x,y))
    d.text((x+4,y+TH+6),os.path.basename(k).replace('.webp',''),fill='#5a1e14',font=F); d.text((x+4,y+TH+34),lab[:48],fill='#222',font=F2)
S.save(out,quality=88); print(out,S.size)
