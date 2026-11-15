# Run retouch.py on several cuts and stack their before|after crops into one sheet for a look.
# python3 rtall.py WORKDIR OUT.jpg TIER face...   (writes cut/<tier>-<face>-ret.png; nothing replaced)
import sys,os,subprocess
from PIL import Image,ImageDraw,ImageFont
W,O,T=sys.argv[1:4];H=os.path.dirname(os.path.abspath(__file__))
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22)
rows=[]
for c in sys.argv[4:]:
    p=os.path.join(W,'cut',f'{T}-{c}.png')
    r=subprocess.run(['python3',os.path.join(H,'retouch.py'),p],capture_output=True,text=True).stdout.strip()
    im=Image.open(p[:-4]+'-ret-cmp.jpg');im=im.resize((480,round(480*im.height/im.width)));ImageDraw.Draw(im).text((4,4),c+' '+r.split('mask px')[-1],font=F,fill=(255,0,0));rows.append(im)
n=4;h=max(i.height for i in rows);S=Image.new('RGB',(480*n,h*((len(rows)+n-1)//n)),'white')
for i,im in enumerate(rows):S.paste(im,((i%n)*480,(i//n)*h))
S.save(O,quality=88)
