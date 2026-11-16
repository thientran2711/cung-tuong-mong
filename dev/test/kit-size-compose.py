"""kit-size-compose.py — stacks BEFORE | AFTER block pairs (kit-size-ba.js) into phone-readable sheets (<= MAXH px tall, OUTW px wide).
usage: python3 dev/test/kit-size-compose.py <blkdir> <tag> <outdir> [extra before images key=path ...]
Order and captions = ORDER below. A key with no before block shows "NEW" on the left."""
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,TAG,OUT=sys.argv[1:4];EXTRA=dict(a.split('=',1) for a in sys.argv[4:])
OUTW=1600;MAXH=2000;GAP=14;HEAD=40
ORDER=[('frames','f0','TIN — (2) no "Đã rõ": tap outside / ✕'),('frames','f1','KẾT QUẢ — (1) tag rank/name · (2) no "Đã hiểu" · (3) centred'),
 ('frames','f2','ĐIỀU Thái hậu — (1) tag added · (2) no "Đã hiểu" · (6) body scale'),('frames','f3','LUẬT — (2) no "Đã hiểu" (✕ top-right)'),
 ('frames','f4','VIỆC Hoàng hậu — (3) centred · (4) same width · (7) one layout · (9) narrow banner'),('frames','f5','VIỆC Thái hậu — (5) GỢI Ý box · (7) same column/scale as above'),
 ('frames','figrow','(6) ONE figure scale: same measured body for everyone'),
 ('buttons','S','(4)(8) button S in one frame: same width, class tag'),('buttons','LS','(8) button LS'),('buttons','LR','(5)(8) button LR + GỢI Ý box'),
 ('buttons','3.4','(8) 3.4 event option = the kit button'),('buttons','3.1','(8) 3.1/3.2 Hành sự compact card = the kit button'),('buttons','3.7','3.7 skill cards (OK)'),
 ('buttons','pics','pictures (OK)'),('buttons','narrow','(9) NEW narrow landscape strips'),('long','f0','VIỆC DÀI (OK)')]
try:F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22)
except Exception:F=ImageFont.load_default()
def load(p):return Image.open(p).convert('RGB') if p and os.path.exists(p) else None
rows=[]
for area,k,cap in ORDER:
  b=load(EXTRA.get(f'{area}-{k}') or f'{D}/blk-{TAG}-{area}-{k}-b.png');a=load(f'{D}/blk-{TAG}-{area}-{k}-a.png')
  if a is None:continue
  cw=(OUTW-3*GAP)//2
  def fit(im):
    if im is None:return None
    s=min(1,cw/im.width);return im.resize((int(im.width*s),int(im.height*s)),Image.LANCZOS)
  b,a=fit(b),fit(a);import textwrap;HD=HEAD+26*(len(textwrap.wrap('AFTER — '+cap,width=58))-1);h=max(a.height,b.height if b else 60)+HD+GAP
  r=Image.new('RGB',(OUTW,h),(243,232,212));d=ImageDraw.Draw(r)
  import textwrap;L=textwrap.wrap('AFTER — '+cap,width=58)
  d.text((GAP,8),'BEFORE',fill=(140,40,30),font=F)
  for i,t in enumerate(L):d.text((2*GAP+cw,8+i*26),t,fill=(20,90,50),font=F)
  if b:r.paste(b,(GAP,HD))
  else:d.text((GAP,HD+10),'NEW (no before)',fill=(120,90,60),font=F)
  r.paste(a,(2*GAP+cw,HD));d.line([(OUTW//2,HD),(OUTW//2,h-GAP)],fill=(180,150,100),width=3);rows.append(r)
sheets=[];cur=[];ch=0
for r in rows:
  if r.height>MAXH:r=r.resize((int(r.width*MAXH/r.height),MAXH))
  if ch+r.height>MAXH and cur:sheets.append(cur);cur=[];ch=0
  cur.append(r);ch+=r.height
if cur:sheets.append(cur)
for i,s in enumerate(sheets):
  im=Image.new('RGB',(OUTW,sum(r.height for r in s)),(243,232,212));y=0
  for r in s:im.paste(r,(0,y));y+=r.height
  p=f'{OUT}/ba-{TAG}-{i+1}.jpg';im.save(p,quality=82);print(p,im.size)
