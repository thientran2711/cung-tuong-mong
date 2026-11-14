# python3 fetch.py [keys...]  : harvest result URLs for gens.txt ids from the session transcripts,
# download PNG to RAW dir, write img/act-<key>.webp (512px q82) or img/act-cat-<cat>.webp.
import re,glob,os,sys,subprocess,io
from PIL import Image
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..'))
RAW=os.environ.get('RAW','/tmp/claude-0/-home-user-cung-tuong-mong/84f333ce-ebd1-5e4a-9b0c-43035da11b67/scratchpad/actraw')
os.makedirs(RAW,exist_ok=True)
G={}
for l in open(os.path.join(H,'gens.txt')):
    p=l.split()
    if len(p)>=2: G[p[0]]=p[1]   # last line wins (redos)
U={}
for f in glob.glob(os.path.expanduser(os.environ.get('TRX','~/.claude/projects/-home-user-cung-tuong-mong/84f333ce-ebd1-5e4a-9b0c-43035da11b67/subagents/agent-a58f230e6603d7a6d.jsonl'))):
    s=open(f,errors='ignore').read().replace('\\"','"')
    for m in re.finditer(r'"identifier":"(\w+)","status":"completed","results":\{"url":"([^"]+)"',s): U[m.group(1)]=m.group(2)
keys=sys.argv[1:] or list(G)
for k in keys:
    gid=G[k]; out=os.path.join(ROOT,'img',('act-'+k if not k.startswith('cat-') else 'act-'+k)+'.webp')
    raw=os.path.join(RAW,k+'_'+gid+'.png')
    if not os.path.exists(raw):
        if gid not in U: print('NOURL',k,gid); continue
        r=subprocess.run(['curl','-sSf','--retry','4','--retry-all-errors','-o',raw+'.part',U[gid]])
        if r.returncode: print('FAIL',k); continue
        os.rename(raw+'.part',raw)
    im=Image.open(raw).convert('RGB'); w,h=im.size; s=min(w,h)
    im=im.crop(((w-s)//2,(h-s)//2,(w-s)//2+s,(h-s)//2+s)).resize((512,512),Image.LANCZOS)
    im.save(out,'WEBP',quality=82,method=6); print('ok',k,os.path.getsize(out)//1024,'KB')
