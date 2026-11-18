import sys,io,json,subprocess
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
B="https://ctm-img.victoria-tntt.workers.dev/"
def scan(f):
    r=subprocess.run(["curl","-s","--max-time","40",B+f],capture_output=True)
    try: im=Image.open(io.BytesIO(r.stdout)).convert("RGBA")
    except Exception as e: return {"f":f,"err":1}
    a=np.array(im);al=a[...,3].astype(int);rgb=a[...,:3].astype(int)
    h,w=al.shape;sil=al>128
    tot=int(sil.sum())
    if tot==0: return {"f":f,"w":w,"h":h,"empty":1}
    er=ndi.binary_erosion(sil,iterations=2)
    edge=sil&~ndi.binary_erosion(sil,iterations=2)
    lum=rgb.mean(axis=2)
    dark=int((edge&(lum<45)).sum())
    # edge ring: partial alpha ring dark
    semi=(al>20)&(al<235)
    ringdark=int((semi&(lum<60)).sum())
    interior=ndi.binary_erosion(sil,iterations=6)
    transl=int((interior&(al<235)).sum())
    # holes: transparent regions enclosed in silhouette (fill holes)
    filled=ndi.binary_fill_holes(sil);holes=filled&~sil
    lab,n=ndi.label(holes);hs=ndi.sum(holes,lab,range(1,n+1)) if n else []
    bigholes=int(sum(1 for x in hs if x>=60));holepx=int(sum(x for x in hs if x>=60))
    return {"f":f,"w":w,"h":h,"sil":tot,"edgedark":dark,"ringdark":ringdark,"transl":transl,"nholes":bigholes,"holepx":holepx,"edge":int(edge.sum())}
if __name__=="__main__":
    for f in sys.stdin.read().split():
        print(json.dumps(scan(f)),flush=True)
