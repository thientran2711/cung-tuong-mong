# python3 st_fetch.py [gridIds...] : download grid PNGs (URLs from session transcripts), find gutters, split into 4 panels,
# write img/st-<arc>-<key>.webp (768x1024) + a review sheet scratch/sheets/<grid>.jpg (4 panels, 300px each, labelled)
import re,glob,os,sys,subprocess
import numpy as np
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..')); sys.path.insert(0,H)
import st_prompt as P
SCR='/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad'
RAW=SCR+'/straw'; SHE=SCR+'/stsheets'; os.makedirs(RAW,exist_ok=True); os.makedirs(SHE,exist_ok=True)
G={}
for l in open(os.path.join(H,'gens.txt')):
    p=l.split()
    if len(p)>=2 and not p[0].startswith('#'): G[p[0]]=p[1]
U={}
for f in glob.glob(os.path.expanduser(os.environ.get('TRX','~/.claude/projects/-home-user-cung-tuong-mong/**/*.jsonl')),recursive=True):
    s=open(f,errors='ignore').read().replace('\\"','"')
    for m in re.finditer(r'"identifier":"(\w+)","status":"completed","results":\{"url":"([^"]+)"',s): U[m.group(1)]=m.group(2)
GR=dict(P.grids()); F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',14)
def cut(a,axis):
    # brightest low-variance band near the middle = gutter; returns (start,end)
    L=a.shape[axis]; g=a.mean(axis=2)
    prof=g.mean(axis=1-axis); var=g.std(axis=1-axis)
    lo,hi=int(L*.40),int(L*.60); score=prof[lo:hi]-2*var[lo:hi]; c=lo+int(np.argmax(score))
    thr=score.max()-12; s=e=c
    while s>lo and (prof[s-1]-2*var[s-1])>thr: s-=1
    while e<hi-1 and (prof[e+1]-2*var[e+1])>thr: e+=1
    return s,e+1
def trim(im):
    # strip outer cream margin
    a=np.asarray(im).astype(float); g=a.mean(axis=2); h,w=g.shape
    def edge(prof,var,rev):
        idx=range(len(prof)-1,-1,-1) if rev else range(len(prof))
        for i in idx:
            if not (prof[i]>225 and var[i]<10): return i
        return 0
    r=g.mean(1);rv=g.std(1);c=g.mean(0);cv=g.std(0)
    t=edge(r,rv,False);b=edge(r,rv,True);l=edge(c,cv,False);rr=edge(c,cv,True)
    return im.crop((l,t,rr+1,b+1))
def fit(im):
    w,h=im.size;A=.75
    if w/h>A: cw=round(h*A); im=im.crop(((w-cw)//2,0,(w-cw)//2+cw,h))
    else: ch=round(w/A); im=im.crop((0,(h-ch)//2,w,(h-ch)//2+ch))
    return im.resize((768,1024),Image.LANCZOS)
for gid in (sys.argv[1:] or list(G)):
    if gid not in G: continue
    cid=G[gid]; raw=os.path.join(RAW,gid.replace(':','_')+'_'+cid+'.png')
    if not os.path.exists(raw):
        if cid not in U: print('NOURL',gid); continue
        if subprocess.run(['curl','-sSf','--retry','4','--retry-all-errors','-o',raw+'.part',U[cid]]).returncode: print('FAIL',gid); continue
        os.rename(raw+'.part',raw)
    im=Image.open(raw).convert('RGB'); a=np.asarray(im).astype(float)
    x0,x1=cut(a,1); y0,y1=cut(a,0); W,Hh=im.size
    boxes=[(0,0,x0,y0),(x1,0,W,y0),(0,y1,x0,Hh),(x1,y1,W,Hh)]
    aid=gid.split(':')[0]; sheet=Image.new('RGB',(4*306,440),'#f4ecdd'); d=ImageDraw.Draw(sheet)
    for i,(k,_) in enumerate(GR[gid]):
        p=fit(trim(im.crop(boxes[i])))
        out=os.path.join(ROOT,'img','st-%s-%s.webp'%(aid.replace('_','-'),k))
        q=82
        while True:
            p.save(out,'WEBP',quality=q,method=6)
            if os.path.getsize(out)<=250*1024 or q<=60: break
            q-=6
        sheet.paste(p.resize((300,400)),(i*306+3,3)); d.text((i*306+5,410),k,fill='#5a1e14',font=F)
    sheet.save(os.path.join(SHE,gid.replace(':','_')+'.jpg'),quality=80)
    print('ok',gid,'cuts',(x0,x1),(y0,y1),'size',im.size)
