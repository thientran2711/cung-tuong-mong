# mk_full21.py <dir> <out.mp4> <stills.jpg> : 3x7 grid (THACT4 layout), each seal OUT + LOOP x2 + BACK, rest-frame hold to equal length
import sys,os,subprocess,numpy as np
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from disc import frames
from PIL import Image,ImageDraw,ImageFont
d,mp4,still=sys.argv[1:4]
K=[('vui','vui','A01'),('lo','lo','A02'),('an','ẩn','A03'),('muu','mưu','A04'),('ghen','ghen','A05'),('buon','buồn','A06'),('so','sợ','A07'),
   ('chan','chán','A08'),('khochiu','khó chịu','A09'),('tinhtu','tình tứ','A10'),('binh','bình','A11'),('dau','đau lòng','A12'),('hothen','hổ thẹn','A13'),('choang','choáng','A14'),
   ('hon','hờn','A15'),('hanghai','hăng hái','A16'),('chuyentam','chuyên tâm','A17'),('hungkhoi','hưng khởi','A18'),('gian','giận','M2349-03'),('tutin','tự tin','M2349-11'),('tinhnghich','tinh nghịch','M2349-12')]
CW,CH,S=240,280,240; BG=(250,244,230)
F1=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',15); F2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',12)
seqs=[]; mids=[]
for k,_,_ in K:
    o,l,b=[frames(f'{d}/{k}-{p}.webp') for p in ('out','loop','back')]
    seqs.append(o+l+l+b); mids.append(l[len(l)//2])
N=max(len(s) for s in seqs)
base=Image.new('RGB',(7*CW,3*CH),BG); dr=ImageDraw.Draw(base)
for n,(k,vn,code) in enumerate(K):
    X=(n%7)*CW; Y=(n//7)*CH; dr.text((X+CW/2,Y+S+4),vn,font=F1,fill=(60,40,30),anchor='mt'); dr.text((X+CW/2,Y+S+22),code,font=F2,fill=(120,90,80),anchor='mt')
def compose(get):
    im=base.copy()
    for n in range(len(K)):
        f=Image.fromarray(get(n)).resize((S,S),Image.LANCZOS); im.paste(f,((n%7)*CW,(n//7)*CH),f)
    return im
p=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{7*CW}x{3*CH}','-r','15','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','slow','-movflags','+faststart',mp4],stdin=subprocess.PIPE)
for t in range(N):
    p.stdin.write(np.asarray(compose(lambda n: seqs[n][min(t,len(seqs[n])-1)])).tobytes())
p.stdin.close(); p.wait()
compose(lambda n: mids[n]).save(still,quality=90); print('frames',N)
