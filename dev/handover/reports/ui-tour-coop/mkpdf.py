import json,sys,os
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont('DV','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DVB','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
D=sys.argv[1];OUT=sys.argv[2];L=json.load(open(D+'/list.json'))
skip=set(json.load(open(D+'/skip.json'))) if os.path.exists(D+'/skip.json') else set()
L=[x for x in L if x['id']+'-'+x['seat'] not in skip and x['files']]
W,H=1935+60,1000+115  # fold 755 + gap + ipad 1180 (iPad scaled to its 820 height, top-aligned)
c=canvas.Canvas(OUT,pagesize=(W,H))
seat={'host':'Chủ phòng (ghế A, Con gái Tể tướng)','guest':'Khách (ghế B, Công chúa Cao Ly hòa thân)'}
# TOC
def toc(start):
  c.setFont('DVB',30);c.drawString(30,H-50,'Chơi cùng hảo hữu — các màn hình (hai ghế, Fold + iPad)');c.setFont('DV',15)
  c.drawString(30,H-78,'Mỗi trang: Samsung Fold dọc 755x1000 (trái) · iPad ngang 1180x820 (phải). Ghế A = chủ phòng, ghế B = khách. Bản main 8c8b8b6b, máy chủ chơi chung thật.')
  y=H-115;col=0;g0=None
  for i,x in enumerate(L):
    if x['group']!=g0:
      g0=x['group'];c.setFont('DVB',14);c.drawString(30+col*1000,y,g0);y-=20;c.setFont('DV',12)
    c.drawString(45+col*1000,y,f"tr.{i+start} · {'A' if x['seat']=='host' else 'B'} · {x['title'][:95]}");y-=16
    if y<30:y=H-115;col+=1
toc(2);c.showPage()
for i,x in enumerate(L):
  c.setFont('DVB',22);c.drawString(30,H-40,f"{x['title']}")
  c.setFont('DV',15);c.drawString(30,H-66,f"{seat[x['seat']]} · {x['group']} · trang {i+2}")
  f=x['files'].get('fold');p=x['files'].get('ipad')
  if f:c.drawImage(f,20,10,755,1000*1 if False else 1000,preserveAspectRatio=True)
  else:c.drawString(60,H/2,'không chụp được ở lượt này')
  if p:c.drawImage(p,20+755+20,10+1000-820,1180,820)
  else:c.drawString(900,H/2,'không chụp được ở lượt này')
  c.setFont('DV',12);c.drawString(20,H-95,'Fold 755x1000');c.drawString(795,H-95,'iPad 1180x820')
  c.showPage()
c.save();print(len(L)+1,'pages',os.path.getsize(OUT))
