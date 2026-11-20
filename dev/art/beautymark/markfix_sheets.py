# before/after zoom sheets for MARKFIX (one per picture + overview)
import json,sys
from PIL import Image,ImageDraw,ImageFont
R='dev/handover/review-sheets/rank8-t78/'
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
log=json.load(open(R+'fixed/markfix_log.json'))
CX={}  # crop centre: face box from detection (eye/cheek band)
def crop(n,fixed,Z):
  im=Image.open(R+('fixed/' if fixed else '')+n+'_a18.webp').convert('RGB')
  x0,y0=430,int(sys.argv[1]) if False else None,None
  return im
rows=[]
for e in log:
  n=e['id'];pts=[tuple(p) for p in e['old']]+([tuple(e['new'])] if e['new'] else [])
  cx=sum(p[0] for p in pts)/len(pts);cy=sum(p[1] for p in pts)/len(pts)
  x0,y0=int(530-110),int(cy-55);x1,y1=x0+230,y0+110
  Z=4;pair=[]
  for fx in (False,True):
    im=Image.open(R+('fixed/' if fx else '')+n+'_a18.webp').convert('RGB').crop((x0,y0,x1,y1)).resize((230*Z,110*Z),Image.LANCZOS)
    pair.append(im)
  W=pair[0].width*2+20;H=pair[0].height+60
  sh=Image.new('RGB',(W,H),'white');d=ImageDraw.Draw(sh);f=ImageFont.truetype(F,34)
  d.text((10,8),f'{n} · TRƯỚC ({e["status"]})',fill='black',font=f);d.text((pair[0].width+30,8),'SAU · sửa bằng code',fill=(150,0,0),font=f)
  sh.paste(pair[0],(0,60));sh.paste(pair[1],(pair[0].width+20,60))
  sh.save(R+'fixed/'+n+'_markfix_before_after.jpg',quality=92);rows.append(sh)
W=max(r.width for r in rows);H=sum(r.height+16 for r in rows)
ov=Image.new('RGB',(W,H),'white');y=0
for r in rows: ov.paste(r,(0,y));y+=r.height+16
ov.save(R+'fixed/MARKFIX_sheet.jpg',quality=88);print(ov.size)
