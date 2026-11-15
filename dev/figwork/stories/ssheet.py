# python3 ssheet.py OUT COLS arc:key ... : contact sheet of story pictures img/st-<arc>-<key>.webp, 360x480 tiles
import os,sys
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..'))
out,cols,keys=sys.argv[1],int(sys.argv[2]),sys.argv[3:]; W,TH,LH=360,480,26; rows=(len(keys)+cols-1)//cols
S=Image.new('RGB',(16+cols*(W+16),16+rows*(TH+LH+16)),(245,238,225)); d=ImageDraw.Draw(S)
f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',18)
for i,ak in enumerate(keys):
    a,k=(ak.split(':')+['bia'])[:2]; x=16+(i%cols)*(W+16); y=16+(i//cols)*(TH+LH+16)
    S.paste(Image.open(os.path.join(ROOT,'img','st-%s-%s.webp'%(a.replace('_','-'),k))).convert('RGB').resize((W,TH)),(x,y)); d.text((x+2,y+TH+3),ak,fill=(90,30,20),font=f)
S.save(out,quality=85); print(out,S.size)
