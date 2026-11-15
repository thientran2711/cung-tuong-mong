# python3 dsheet.py OUT COLS KEY... : contact sheet of landscape dialog pictures (img/ev-KEY.webp), 480x360 tiles with labels
import os,sys
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..'))
out,cols,keys=sys.argv[1],int(sys.argv[2]),sys.argv[3:]
W,TH,LH=480,360,26;rows=(len(keys)+cols-1)//cols
S=Image.new('RGB',(16+cols*(W+16),16+rows*(TH+LH+16)),(245,238,225));d=ImageDraw.Draw(S)
try:f=ImageFont.truetype('DejaVuSans-Bold.ttf',18)
except Exception:f=ImageFont.load_default()
for i,k in enumerate(keys):
    x=16+(i%cols)*(W+16);y=16+(i//cols)*(TH+LH+16)
    S.paste(Image.open(os.path.join(ROOT,'img','ev-'+k+'.webp')).convert('RGB').resize((W,TH)),(x,y));d.text((x+2,y+TH+3),k,fill=(90,30,20),font=f)
S.save(out,quality=85);print(out,S.size)
