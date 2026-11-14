# python3 fetch.py [keys...]  : harvest result URLs for gens.txt ids from the session transcripts,
# download PNG to RAW dir, write img/act-<key>.webp / img/act-cat-<cat>.webp: centre crop to 384:506, 384x506 q82.
# DX_<key with _>=N env shifts the crop window N px right (for off-centre subjects).
import re,glob,os,sys,subprocess,io
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..'))
RAW=os.environ.get('RAW','/tmp/claude-0/-home-user-cung-tuong-mong/84f333ce-ebd1-5e4a-9b0c-43035da11b67/scratchpad/actraw')
os.makedirs(RAW,exist_ok=True)
G={}
for l in open(os.environ.get('GENS',os.path.join(H,'gens.txt'))):
    p=l.split()
    if len(p)>=2 and not p[0].startswith('#'): G[p[0]]=p[1]   # last line wins (redos)
U={}
for f in glob.glob(os.path.expanduser(os.environ.get('TRX','~/.claude/projects/-home-user-cung-tuong-mong/84f333ce-ebd1-5e4a-9b0c-43035da11b67/subagents/agent-a58f230e6603d7a6d.jsonl'))):
    s=open(f,errors='ignore').read().replace('\\"','"')
    for m in re.finditer(r'"identifier":"(\w+)","status":"completed","results":\{"url":"([^"]+)"',s): U[m.group(1)]=m.group(2)
keys=sys.argv[1:] or list(G)
for k in keys:
    gid=G[k]; out=os.path.join(ROOT,'img',os.environ.get('PFX','act-')+k+'.webp')
    raw=os.path.join(RAW,k+'_'+gid+'.png')
    if not os.path.exists(raw):
        if gid not in U: print('NOURL',k,gid); continue
        r=subprocess.run(['curl','-sSf','--retry','4','--retry-all-errors','-o',raw+'.part',U[gid]])
        if r.returncode: print('FAIL',k); continue
        os.rename(raw+'.part',raw)
    im=Image.open(raw).convert('RGB'); w,h=im.size; A=384/506   # owner 11/14: one portrait frame, photo window 384x506
    if w/h>A: cw,ch=round(h*A),h
    else: cw,ch=w,round(w/A)
    x0=(w-cw)//2+int(os.environ.get('DX_'+k.replace('-','_'),'0')); y0=(h-ch)//2
    im=im.crop((x0,y0,x0+cw,y0+ch)).resize((384,506),Image.LANCZOS)
    im.save(out,'WEBP',quality=82,method=6); print('ok',k,os.path.getsize(out)//1024,'KB')
