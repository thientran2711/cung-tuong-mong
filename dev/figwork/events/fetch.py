# python3 fetch.py [keys...] : read result URLs for gens.txt ids from session transcripts (TRX glob),
# download PNG to RAW, write img/ev-<key>.webp (768x1024, 3:4) and a preview jpg dev/shots/event-art/ev-<key>.jpg.
import re,glob,os,sys,subprocess
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..'))
sys.path.insert(0,H); import ev_data as D
RAW=os.environ.get('RAW','/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad/evraw'); os.makedirs(RAW,exist_ok=True)
SH=os.path.join(ROOT,'dev/shots/event-art'); os.makedirs(SH,exist_ok=True)
G={}
for l in open(os.path.join(H,'gens.txt')):
    p=l.split()
    if len(p)>=2 and not p[0].startswith('#'): G[p[0]]=p[1]
U={}
for f in glob.glob(os.path.expanduser(os.environ.get('TRX','~/.claude/projects/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/subagents/*.jsonl'))):
    s=open(f,errors='ignore').read().replace('\\"','"')
    for m in re.finditer(r'"identifier":"(\w+)","status":"completed","results":\{"url":"([^"]+)"',s): U[m.group(1)]=m.group(2)
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20)
for k in (sys.argv[1:] or list(G)):
    gid=G[k]; raw=os.path.join(RAW,k+'_'+gid+'.png'); out=os.path.join(ROOT,'img','ev-'+k+'.webp')
    if not os.path.exists(raw):
        if gid not in U: print('NOURL',k,gid); continue
        r=subprocess.run(['curl','-sSf','--retry','4','--retry-all-errors','-o',raw+'.part',U[gid]])
        if r.returncode: print('FAIL',k); continue
        os.rename(raw+'.part',raw)
    im=Image.open(raw).convert('RGB'); w,h=im.size
    if abs(w/h-.75)>.01:
        if w/h>.75: cw=round(h*.75); im=im.crop(((w-cw)//2,0,(w-cw)//2+cw,h))
        else: ch=round(w/.75); im=im.crop((0,(h-ch)//2,w,(h-ch)//2+ch))
    im=im.resize((768,1024),Image.LANCZOS)
    q=82
    while True:
        im.save(out,'WEBP',quality=q,method=6)
        if os.path.getsize(out)<=250*1024 or q<=60: break
        q-=6
    c,_=D.scene(k); W=Image.new('RGB',(560,790),'#f4ecdd'); W.paste(im.resize((512,683),Image.LANCZOS),(24,24))
    ImageDraw.Draw(W).text((24,724),'%s  (ev-%s)'%(c['title'],k),fill='#5a1e14',font=F)
    W.save(os.path.join(SH,'ev-'+k+'.jpg'),quality=86)
    print('ok',k,os.path.getsize(out)//1024,'KB q',q)
