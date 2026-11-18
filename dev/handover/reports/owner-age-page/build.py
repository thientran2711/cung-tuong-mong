#!/usr/bin/env python3
"""build.py <manifest.json> <rootdir>: download sources, compose one 1920x9200 strip per person/age
(8 rows t1..t8 x 3 cells v0|v1|v2, each 640x1150, alpha-bbox crop, fit, bottom-aligned, centred),
write <rootdir>/img/_review/owner-age-page/<age>/<cNN>.webp (<=2.5MB)."""
import io,json,os,sys,concurrent.futures as cf,urllib.request
from PIL import Image
B="https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/"
DIRS={"a18":"b10","a26":"b10-a26","a36":"b10-a36","a51":"b10-a51"}
CW,CH=640,1150
def get(u):
    for _ in range(4):
        try: return urllib.request.urlopen(urllib.request.Request(u,headers={"User-Agent":"ctm-age-page"}),timeout=60).read()
        except Exception: pass
    raise SystemExit("download failed "+u)
def cell(data):
    im=Image.open(io.BytesIO(data)).convert("RGBA"); bb=im.getchannel("A").point(lambda a:255 if a>8 else 0).getbbox()
    if not bb: return None
    im=im.crop(bb); s=min(CW/im.width,CH/im.height,1e9); im=im.resize((max(1,round(im.width*s)),max(1,round(im.height*s))),Image.LANCZOS)
    out=Image.new("RGBA",(CW,CH),(0,0,0,0)); out.paste(im,((CW-im.width)//2,CH-im.height)); return out
def one(args):
    age,c,tm,root=args
    S=Image.new("RGBA",(CW*3,CH*8),(0,0,0,0))
    for ti in range(1,9):
        for v in range(3):
            if not tm[f"t{ti}"][v]: continue
            d=get(f"{B}{c}/{DIRS[age]}/{c}_{age}_t{ti}_v{v}.png"); x=cell(d)
            if x: S.paste(x,(v*CW,(ti-1)*CH))
    p=f"{root}/img/_review/owner-age-page/{age}/{c}.webp"; os.makedirs(os.path.dirname(p),exist_ok=True)
    for q in (82,74,66,58):
        S.save(p,"WEBP",quality=q,method=4)
        if os.path.getsize(p)<=2.5e6: break
    return p,os.path.getsize(p)
if __name__=="__main__":
    m=json.load(open(sys.argv[1])); root=sys.argv[2]
    jobs=[(a,c,tm,root) for a,p in m.items() for c,tm in p.items()]
    with cf.ThreadPoolExecutor(4) as ex:
        for p,s in ex.map(one,jobs): print(p,s)
    print("strips",len(jobs))
