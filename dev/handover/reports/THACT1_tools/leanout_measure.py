import numpy as np, json, sys
from PIL import Image, ImageDraw, ImageFont
def frames(p):
    im=Image.open(p); r=[]
    for i in range(im.n_frames): im.seek(i); r.append(np.array(im.convert('RGBA')))
    return r
def circle(a):
    m=a[...,3]>128; ys=np.where(m.any(1))[0]; y0,y1=ys.min(),ys.max(); H=y1-y0+1
    ws=[];cs=[]
    for y in range(int(y0+.38*H),int(y0+.62*H)):
        xs=np.where(m[y])[0]
        if len(xs): ws.append(xs.max()-xs.min()+1); cs.append((xs.max()+xs.min())/2)
    r=np.median(ws)/2; cx=np.median(cs)
    w=np.array([(lambda xs: xs.max()-xs.min()+1 if len(xs) else 0)(np.where(m[y])[0]) for y in range(m.shape[0])],float)
    w=np.convolve(w,np.ones(9)/9,'same'); lo,hi=int(y0+.3*H),int(y0+.65*H); cy=float(lo+np.argmax(w[lo:hi]))
    return cx,cy,r
def stats(f,c):
    cx,cy,r=c; m=f[...,3]>128; yy,xx=np.nonzero(m); d=np.hypot(xx-cx,yy-cy)
    o=d>r*1.03; area=o.sum()/(np.pi*r*r)*100; over=(np.percentile(d,98)-r)/(2*r)*100 if len(d) else 0
    return area,max(over,0)
SETS={'new':('/tmp/claude-0/thact/wx/webp2','{k}-out.webp','{k}-loop.webp'),
      'td':('/tmp/claude-0/thact/w/webp2','{k}-out.webp','{k}-loop.webp'),
      'old':('/tmp/claude-0/meas/old','{k}-out.webp','{k}-loop.webp')}
NEW=['vui','lo','gian','an','muu','ghen','buon','so','chan','khochiu','tutin','tinhnghich','tinhtu']
KEEP=['binh','dau','hothen','choang','hon','hanghai','chuyentam','hungkhoi']
OLD=['buon','chan','choang','chuyentam','ghen','gian','hanghai','hon','hothen','hungkhoi','khochiu','lo','so','tinhnghich','tinhtu','tutin','vui']
jobs=[('new',k) for k in NEW]+[('td',k) for k in KEEP]+[('old',k) for k in OLD]
res=[];peaks=[]
for s,k in jobs:
    d,o,l=SETS[s]; fo=frames(f'{d}/{o.format(k=k)}'); fl=frames(f'{d}/{l.format(k=k)}')
    c=circle(fo[0]); st=[stats(f,c) for f in fo+fl]
    i=int(np.argmax([a for a,_ in st])); A=[a for a,_ in st]; V=[v for _,v in st]
    loopA=np.mean(A[len(fo):])
    res.append(dict(set=s,k=k,peak_area=round(max(A),1),peak_over=round(max(V),1),loop_area=round(loopA,1),A0=round(A[0],1)))
    peaks.append((s,k,(fo+fl)[i],c))
json.dump(res,open('/tmp/claude-0/meas/res.json','w'),indent=0)
for r in res: print(r)
# contact sheet: crop each peak frame around disc at same scale (disc diameter -> 160px)
S=160; cell=int(S*2.0); font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',15)
cols=7; rows=(len(peaks)+cols-1)//cols
sheet=Image.new('RGB',(cols*cell,rows*(cell+40)),(250,244,230)); dr=ImageDraw.Draw(sheet)
VN=dict(vui='vui',lo='lo',gian='giận',an='ẩn',muu='mưu',ghen='ghen',buon='buồn',so='sợ',chan='chán',khochiu='khó chịu',tutin='tự tin',tinhnghich='tinh nghịch',tinhtu='tình tứ',binh='bình',dau='đau lòng',hothen='hổ thẹn',choang='choáng',hon='hờn',hanghai='hăng hái',chuyentam='chuyên tâm',hungkhoi='hưng khởi')
TAG=dict(new='M2349 mới',td='M2342 giữ',old='bộ cũ mạnh')
for n,((s,k,f,c),r) in enumerate(zip(peaks,res)):
    cx,cy,rad=c; sc=S/(2*rad); im=Image.fromarray(f).resize((int(288*sc),int(288*sc)),Image.LANCZOS)
    x0=int(cell/2-cx*sc); y0=int(cell/2-cy*sc); X=(n%cols)*cell; Y=(n//cols)*(cell+40)
    tile=Image.new('RGBA',(cell,cell),(0,0,0,0)); tile.paste(im,(x0,y0),im)
    dr2=ImageDraw.Draw(tile); dr2.ellipse((cell/2-S/2,cell/2-S/2,cell/2+S/2,cell/2+S/2),outline=(0,150,255,255),width=1)
    sheet.paste(tile,(X,Y),tile)
    dr.text((X+cell/2,Y+cell+2),f"{VN[k]} · {TAG[s]}",font=font,fill=(60,40,30),anchor='mt')
    dr.text((X+cell/2,Y+cell+20),f"ngoài đĩa {r['peak_area']}% · vươn {r['peak_over']}%",font=font,fill=(120,90,80),anchor='mt')
sheet.save('/tmp/claude-0/meas/sheet.jpg',quality=85); print(sheet.size)
