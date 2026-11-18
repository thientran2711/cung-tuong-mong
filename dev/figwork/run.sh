# run.sh JID... : fetch latest bg for each jid, auto-fix black RGB, process into img/
cd "$(dirname "$0")"
python3 urls.py >/dev/null
python3 - "$@" <<'P' > _b.txt
import sys
want=set(sys.argv[1:]); d={}
for l in open('sheets4_bg.txt'):
    p=l.split()
    if len(p)==3 and p[0] in want: d[p[0]]=l
sys.stdout.write(''.join(d[k] for k in sys.argv[1:] if k in d))
P
python3 - <<'P'
import json,subprocess,os
import numpy as np
from PIL import Image
db=json.load(open('urls.json'))
for l in open('_b.txt'):
    jid,gen,bg=l.split(); raw=f"bg/{jid}-{bg}.png"
    if bg not in db: print("NOURL",jid,bg); continue
    if not os.path.exists(raw): subprocess.run(["curl","-sS","-o",raw,db[bg]],check=True)
    a=np.asarray(Image.open(raw).convert('RGBA').resize((960,480))).astype(int)
    op=a[...,3]>200; dk=(op&(a[...,:3].max(axis=2)<25)).sum()/max(1,op.sum())
    if dk>0.03: print("darkfix",jid,round(dk,2)); subprocess.run(["python3","fixrgb.py",jid,gen,bg])
P
python3 sheetproc.py _b.txt $(cut -d' ' -f1 _b.txt) | tail -n 40
