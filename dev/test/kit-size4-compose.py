"""kit-size4-compose.py — one sheet per frame kind: BEFORE (#3 narrator, S) | AFTER S | M | L | XL side by side (<= 2000 px tall), + item sheets.
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
  ims=[('BEFORE (#3 narrator, S)',L(f'{D}/k3-{TAG}-{k}-b.png'))]+[(f'AFTER {K}',L(f'{D}/k3-{TAG}-{k}-{K}.png')) for K in ['S','M','L','XL']]
  ims=[(t,i) for t,i in ims if i]
  s=min(1,(MAXH-HEAD-60)/max(i.height for _,i in ims))
  ims=[(t,i.resize((int(i.width*s),int(i.height*s)),Image.LANCZOS)) for t,i in ims]
  W=sum(i.width for _,i in ims)+GAP*(len(ims)+1)+20;Hh=HEAD+60+max(i.height for _,i in ims)
  o=Image.new('RGB',(W,Hh),BG);d=ImageDraw.Draw(o)
  pk=M[k]['pick'];fr={f['K']:f for f in M[k]['frames']}
  d.text((GAP,14),f'{NAME[k]} — every size has its own presentation; size picked by content; person + event picture in every frame',fill=(122,31,26),font=F)
  d.text((GAP,58),'kit-size #4: NARRATOR = the palace official whose office covers the topic (BAL.staff.narrator) · sizes as approved in #3 (S portrait pendant)',fill=(70,50,30),font=f2)
  x=GAP
  for j,(t,i) in enumerate(ims):
    if j==1:d.line([(x-GAP//2,HEAD),(x-GAP//2,Hh-10)],fill=(180,150,100),width=4)
    K=t.split()[-1];sub=''
    if t.startswith('AFTER'):f=fr.get(K,{});sub=f"  content picks {pk.get(K)}{' ✓' if pk.get(K)==K else ' ✗'} · {f.get('w')}x{f.get('h')}"
    d.text((x,HEAD),t+sub,fill=(140,40,30) if j==0 else (20,90,50),font=f2);o.paste(i,(x,HEAD+40));x+=i.width+GAP
  p=f'{OUT}/k4-{TAG}-{k}.jpg';o.save(p,quality=82);print(p,o.size)
