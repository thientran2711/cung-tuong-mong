"""kit-size3-compose.py — one sheet per frame kind: BEFORE (#2) | AFTER S | M | L | XL side by side (<= 2000 px tall), + item sheets.
usage: python3 dev/test/kit-size3-compose.py <blkdir> <itemdir> <tag> <outdir> <metrics.json>"""
import sys,os,json,textwrap
from PIL import Image,ImageDraw,ImageFont
D,ID,TAG,OUT,MJ=sys.argv[1:6];M=json.load(open(MJ))['after']
NAME={'news':'TIN','rule':'LUẬT','notice':'BÁO','choice':'VIỆC','result':'KẾT QUẢ','info':'ĐIỀU','night':'ĐÊM','intel':'MẬT BÁO','evidence':'CHỨNG CỨ','reward':'BAN THƯỞNG','week':'TUẦN','threat':'CẢNH GIÁC','person':'NGƯỜI','end':'KIẾP'}
try:F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',22)
except Exception:F=f2=ImageFont.load_default()
BG=(243,232,212);MAXH=2000;HEAD=110;GAP=24
def L(p):return Image.open(p).convert('RGB') if os.path.exists(p) else None
for k in M:
  ims=[('BEFORE (#2, M content)',L(f'{D}/k3-{TAG}-{k}-b.png'))]+[(f'AFTER {K}',L(f'{D}/k3-{TAG}-{k}-{K}.png')) for K in ['S','M','L','XL']]
  ims=[(t,i) for t,i in ims if i]
  s=min(1,(MAXH-HEAD-60)/max(i.height for _,i in ims))
  ims=[(t,i.resize((int(i.width*s),int(i.height*s)),Image.LANCZOS)) for t,i in ims]
  W=sum(i.width for _,i in ims)+GAP*(len(ims)+1)+20;Hh=HEAD+60+max(i.height for _,i in ims)
  o=Image.new('RGB',(W,Hh),BG);d=ImageDraw.Draw(o)
  pk=M[k]['pick'];fr={f['K']:f for f in M[k]['frames']}
  d.text((GAP,14),f'{NAME[k]} — every size has its own presentation; size picked by content; person + event picture in every frame',fill=(122,31,26),font=F)
  d.text((GAP,58),'S = one main picture left · M/L/XL = full figure left + event picture top-right (grows into what the text leaves) · ✕ top-right, no "Đã hiểu"',fill=(70,50,30),font=f2)
  x=GAP
  for j,(t,i) in enumerate(ims):
    if j==1:d.line([(x-GAP//2,HEAD),(x-GAP//2,Hh-10)],fill=(180,150,100),width=4)
    K=t.split()[-1];sub=''
    if t.startswith('AFTER'):f=fr.get(K,{});sub=f"  content picks {pk.get(K)}{' ✓' if pk.get(K)==K else ' ✗'} · {f.get('w')}x{f.get('h')}"
    d.text((x,HEAD),t+sub,fill=(140,40,30) if j==0 else (20,90,50),font=f2);o.paste(i,(x,HEAD+40));x+=i.width+GAP
  p=f'{OUT}/k3-{TAG}-{k}.jpg';o.save(p,quality=82);print(p,o.size)
# items: BEFORE | AFTER per block, stacked
CAP=['Item sizes (S dropped) · Xa xỉ badge on the top-right CORNER','6.2 detail card (same items as sheet 8)','6.3 pick grid','6.5 event tag','Wear row on the person card']
rows=[]
for i,c in enumerate(CAP):
  b,a=L(f'{ID}/it-{TAG}-{i}-b.png'),L(f'{ID}/it-{TAG}-{i}-a.png')
  if not a:continue
  cw=900
  def fit(im):
    if im is None:return None
    s=min(1,cw/im.width);return im.resize((int(im.width*s),int(im.height*s)),Image.LANCZOS)
  b,a=fit(b),fit(a);h=max(a.height,b.height if b else 0)+70;r=Image.new('RGB',(2*cw+3*GAP,h),BG);d=ImageDraw.Draw(r)
  d.text((GAP,10),'BEFORE (#2)',fill=(140,40,30),font=f2);d.text((2*GAP+cw,10),'AFTER — '+c,fill=(20,90,50),font=f2)
  if b:r.paste(b,(GAP,50))
  r.paste(a,(2*GAP+cw,50));d.line([(GAP+cw+GAP//2,50),(GAP+cw+GAP//2,h-6)],fill=(180,150,100),width=4);rows.append(r)
sheets=[];cur=[];ch=0
for r in rows:
  if r.height>MAXH:r=r.resize((int(r.width*MAXH/r.height),MAXH))
  if ch+r.height>MAXH and cur:sheets.append(cur);cur=[];ch=0
  cur.append(r);ch+=r.height
if cur:sheets.append(cur)
for n,sh in enumerate(sheets):
  im=Image.new('RGB',(max(r.width for r in sh),sum(r.height for r in sh)),BG);y=0
  for r in sh:im.paste(r,(0,y));y+=r.height
  p=f'{OUT}/items-{TAG}-{n+1}.jpg';im.save(p,quality=82);print(p,im.size)
