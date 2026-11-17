#!/usr/bin/env python3
"""feet.py <names.txt> <out.tsv> — figures whose painting is cut at the bottom (alpha reaches the last rows across a wide span = hem/feet cut off in the file)."""
import sys,os,subprocess,tempfile
import numpy as np
from PIL import Image
B="https://ctm-img.victoria-tntt.workers.dev/img/"
names=[l.strip() for l in open(sys.argv[1]) if l.strip()];out=sys.argv[2];td=tempfile.mkdtemp(dir=os.path.dirname(os.path.abspath(out)))
for i in range(0,len(names),40):
    b=names[i:i+40];cfg=td+'/u.txt';open(cfg,'w').write('\n'.join(f'url = "{B}{n}"\noutput = "{td}/{n}"' for n in b))
    subprocess.run(['curl','-s','--retry','3','-K',cfg,'--parallel','--parallel-max','8'])
    with open(out,'a') as T:
        for n in b:
            p=f'{td}/{n}'
            try:
                a=np.asarray(Image.open(p).convert('RGBA'))[...,3];h,w=a.shape
                fig=(a>100).any(0).sum()
                last=(a[-2:]>100).any(0).sum()
                T.write(f"{n}\t{last}\t{fig}\t{round(last/max(1,fig),3)}\n")
            except Exception as e: T.write(f"{n}\tERR\t{e}\n")
            try: os.remove(p)
            except: pass
