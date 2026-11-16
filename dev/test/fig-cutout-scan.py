#!/usr/bin/env python3
"""scan.py — whole-group cut-out scan for fig-*.webp (Luan hoi root cause, review/fig-cutout-code).
Per file: cutcheck score (pale resid / ghost / flat), dark fringe px, translucent interior px (alpha 15..235 deeper than 4 px
inside the silhouette, per 10k figure px), enclosed holes (fully transparent islands inside the filled silhouette), native px, HD twin.
usage: scan.py <list of names> <out.tsv>   (downloads from the CDN in batches, deletes after)"""
import sys,os,json,subprocess,tempfile
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
sys.path.insert(0,os.path.join(os.path.dirname(__file__),'../figwork'));import cutcheck  # dev/figwork/cutcheck.py (sparse: check it out)
B="https://ctm-img.victoria-tntt.workers.dev/img/"
def extra(path):
    im=Image.open(path).convert("RGBA");W,H=im.size
    if im.height>900: im=im.resize((round(im.width*900/im.height),900),Image.BILINEAR)
    A=np.asarray(im).astype(np.float32);rgb,a=A[...,:3],A[...,3]
    out=a<=10;area=max(1,int((a>40).sum()));d_in=ndi.distance_transform_edt(~out)
    L=rgb@np.array([.299,.587,.114],np.float32)
    op=(a>=245);Lop=ndi.uniform_filter(np.where(op,L,0),9);cnt=ndi.uniform_filter(op.astype(np.float32),9)
    Lin=np.where(cnt>0.05,Lop/np.maximum(cnt,1e-3),L)
    edge=(a>30)&(a<235)&(d_in<=3)
    dark=edge&(L<Lin*0.6)&(L<110)&(Lin>90)
    dark=ndi.binary_opening(dark) if dark.any() else dark
    semi=(a>15)&(a<235)&(d_in>4)
    semi=ndi.binary_opening(semi)
    fill=ndi.binary_fill_holes(a>40);holes=fill&(a<=40);holes=ndi.binary_opening(holes,iterations=2)
    lab,n=ndi.label(holes);hb=0
    if n: hb=int(sum(1 for s in ndi.sum(holes,lab,range(1,n+1)) if s>150))
    return dict(dark=round(float(dark.sum())/area*1e4,1),transl=round(float(semi.sum())/area*1e4,1),holes=hb,W=W,H=H)
def main():
    names=[l.strip() for l in open(sys.argv[1]) if l.strip()];out=sys.argv[2]
    hd=json.load(open(os.environ.get('HDJSON','hd.json')));hd=hd.get('files',hd)
    done=set()
    if os.path.exists(out): done={l.split('\t')[0] for l in open(out)}
    td=tempfile.mkdtemp(dir=os.path.dirname(out));step=40
    for i in range(0,len(names),step):
        batch=[n for n in names[i:i+step] if n not in done]
        if not batch: continue
        cfg=os.path.join(td,'u.txt');open(cfg,'w').write('\n'.join(f'url = "{B}{n}"\noutput = "{td}/{n}"' for n in batch))
        subprocess.run(['curl','-s','--retry','3','-K',cfg,'--parallel','--parallel-max','8'])
        with open(out,'a') as T:
            for n in batch:
                p=f'{td}/{n}'
                try:
                    r=cutcheck.analyse(p);e=extra(p)
                    T.write(f"{n}\t{r['score']}\t{r['pale']}\t{r['ghost']}\t{e['dark']}\t{e['transl']}\t{e['holes']}\t{e['W']}x{e['H']}\t{int(n in hd)}\n")
                except Exception as x: T.write(f"{n}\tERR\t{x}\n")
                try: os.remove(p)
                except: pass
main()
