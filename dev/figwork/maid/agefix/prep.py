# prep.py : for each A-mNN-mK (K=0,2,3,4) find last gen/bg, fetch bg preview (w=1024), split, compute a51 column in full-res px
import json,os,subprocess,sys,io
import numpy as np
from PIL import Image
S="/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad"
db={}
for f in [S+"/urls_all.json",S+"/maidA/urls.json",S+"/cwA/urls.json"]:
    try: db.update(json.load(open(f)))
    except Exception as e: print("skip",f,e)
W=S+"/wmA/dev/figwork/maid"
LAST={}
for l in open(W+"/bg.txt"):
    p=l.split()
    if len(p)>=3 and p[0].startswith("A-"): LAST[p[0]]=p[1:3]
import importlib.util
spec=importlib.util.spec_from_file_location("sp",W+"/spfuncs.py"); sp=importlib.util.module_from_spec(spec); spec.loader.exec_module(sp)
os.makedirs("pv",exist_ok=True)
out=open("a51.tsv","a")
done={l.split()[0] for l in open("a51.tsv")} if os.path.exists("a51.tsv") else set()
jids=sys.argv[1:] or sorted(LAST)
for j in jids:
    if j in done or j not in LAST: continue
    gen,bid=LAST[j]
    if bid not in db: print("NOURL",j,bid); continue
    f=f"pv/{bid}.png"
    if not os.path.exists(f):
        u=db[bid]; subprocess.run(["curl","-sS","--retry","5","-o",f,u+"&w=1024&preview=1"],check=True)
    im=Image.open(f).convert("RGBA"); w,h=im.size
    cols=sp.split(im,4); x0,x1=cols[3]
    # full res: gen 4k 2:1 -> assume 4096x2048 scaled
    FW=3840; s=FW/w
    print(j,gen,bid,w,h,int(x0*s),int(x1*s),file=out,flush=True); print(j,int(x0*s),int(x1*s))
