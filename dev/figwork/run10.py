# run10.py bgfile [jid...]: bg/<bid>.png -> bg/<jid>-<bid>.png, darkfix, demole, then sheetproc
import sys,os,subprocess,shutil
import numpy as np
from PIL import Image
os.chdir(os.path.dirname(os.path.abspath(__file__)))
lines=[l.split() for l in open(sys.argv[1]) if len(l.split())==3]
only=set(sys.argv[2:])
if only: lines=[l for l in lines if l[0] in only]
for jid,gen,bg in lines:
    raw=f"bg/{jid}-{bg}.png"
    if not os.path.exists(raw): shutil.copy(f"bg/{bg}.png",raw)
    a=np.asarray(Image.open(raw).convert('RGBA').resize((960,480))).astype(int)
    op=a[...,3]>200; dk=(op&(a[...,:3].max(axis=2)<25)).sum()/max(1,op.sum())
    if dk>0.03: print("darkfix",jid,round(dk,2)); subprocess.run(["python3","-I","fixrgb.py",jid,gen,bg])
    if not os.path.exists(raw[:-4]+".orig.png"):
        os.replace(raw,raw[:-4]+".orig.png"); subprocess.run(["python3","-I","demole.py",raw[:-4]+".orig.png",raw])
open('_b10.txt','w').write(''.join(' '.join(l)+'\n' for l in lines))
subprocess.run(["python3","-I","sheetproc.py","_b10.txt"]+[l[0] for l in lines])
