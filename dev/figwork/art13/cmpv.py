# cmpv.py out.jpg spec... : before(figbak)|after(fig) head crops (face-centred, 5x), one row per spec
import sys,os,numpy as np,cv2
from PIL import Image
os.chdir(os.path.dirname(os.path.abspath(__file__)))
R='/home/user/cung-tuong-mong/.claude/worktrees/agent-a878b9d4ac20deacb/img/'
def flat(im):
    b=Image.new('RGBA',im.size,(235,225,205,255)); b.alpha_composite(im); return b.convert('RGB')
def face(rgb,sc=3.0):
    sm=rgb.resize((int(rgb.width*sc),int(rgb.height*sc)),Image.LANCZOS)
    d=cv2.FaceDetectorYN.create('yunet.onnx','',sm.size,0.5); n,f=d.detect(cv2.cvtColor(np.asarray(sm),cv2.COLOR_RGB2BGR))
    f=max(list(f),key=lambda x:x[2]*x[3]); return [float(v)/sc for v in f[:14]]
Z=int(os.environ.get('Z','600')); rows=[]
for sp in sys.argv[2:]:
    c,t,a=sp.split('-'); fn=f'fig-consort-{c}-{t}-{a}.webp'
    ims=[flat(Image.open(p).convert('RGBA')) for p in ('figbak/'+fn,R+fn)]
    F=face(ims[0]); ex=(F[4]+F[6])/2; ey=(F[5]+F[7])/2; s=F[2]*1.5
    row=Image.new('RGB',(2*Z,Z))
    for i,im in enumerate(ims): row.paste(im.crop((int(ex-s/2),int(ey-0.45*s),int(ex+s/2),int(ey+0.55*s))).resize((Z,Z),Image.LANCZOS),(i*Z,0))
    rows.append(row)
O=Image.new('RGB',(2*Z,Z*len(rows)))
for i,r in enumerate(rows): O.paste(r,(0,i*Z))
O.save(sys.argv[1],quality=90)
