#!/usr/bin/env python3
"""build90.py <states.json> <outdir>: per person+age ONE sheet s/<age>/<id>.webp = states in a row (cells 320x570,
bottom-aligned, transparent); consorts with a v3 (Quoc tang) file get q/<age>/<cNN>.webp (640x1150 x 8 rows).
states.json = probe90.py output. Writes outdir/manifest90.json {id:{age:[[key,label],...]}} (order = sheet cells)."""
import io,json,os,sys,concurrent.futures as cf,urllib.request
from PIL import Image
B="https://ctm-img.victoria-tntt.workers.dev/"
D={"a18":"b10","a26":"b10-a26","a36":"b10-a36","a51":"b10-a51"}
CW,CH=320,570
LBL={"kc":"Thiếu nữ","ngheo":"Nhà nghèo","tcold":"Lãnh cung","cold":"Lãnh cung","plain":"Cung nữ"}
def lab(k):
    if k in LBL: return LBL[k]
    if k.startswith("tm"): return "Trung y "+k[2:]
    return "Bậc %s"%k[1:]
ORD=["kc","ngheo","tm1","tm2","tm3","tm4","tcold","cold","plain","t1","t2","t3","t4","t5","t6","t7","t8"]
def get(u):
    for _ in range(4):
        try: return urllib.request.urlopen(urllib.request.Request(u,headers={"User-Agent":"ctm-page90"}),timeout=60).read()
        except Exception: pass
    raise SystemExit("download failed "+u)
def cell(data,cw,ch):
    im=Image.open(io.BytesIO(data)).convert("RGBA"); bb=im.getchannel("A").point(lambda a:255 if a>8 else 0).getbbox()
    if not bb: return None
    im=im.crop(bb); s=min(cw/im.width,ch/im.height); im=im.resize((max(1,round(im.width*s)),max(1,round(im.height*s))),Image.LANCZOS)
    o=Image.new("RGBA",(cw,ch),(0,0,0,0)); o.paste(im,((cw-im.width)//2,ch-im.height)); return o
def save(S,p,qs=(66,60,54)):
    os.makedirs(os.path.dirname(p),exist_ok=True)
    for q in qs:
        S.save(p,"WEBP",quality=q,method=4)
        if os.path.getsize(p)<=2.5e6: break
    return os.path.getsize(p)
def sheet(a):
    pid,age,st,out=a; keys=[k for k in ORD if k in st]
    # the 'cold' (maid) and 'tcold' (consort) are the same slot; plain only for maids
    S=Image.new("RGBA",(CW*len(keys),CH),(0,0,0,0)); ok=[]
    for i,k in enumerate(keys):
        x=cell(get(B+st[k]),CW,CH)
        if x: S.paste(x,(i*CW,0)); ok.append([k,lab(k)])
        else: ok.append([k,lab(k)])
    return pid,age,ok,save(S,f"{out}/s/{age}/{pid}.webp")
def qstrip(a):
    c,age,ts,out=a; S=Image.new("RGBA",(640,1150*8),(0,0,0,0))
    for t in ts:
        x=cell(get(f"{B}img/_review/consort-tiers/{c}/{D[age]}/{c}_{age}_t{t}_v3.png"),640,1150)
        if x: S.paste(x,(0,(t-1)*1150))
    return c,age,ts,save(S,f"{out}/q/{age}/{c}.webp")
if __name__=="__main__":
    j=json.load(open(sys.argv[1])); out=sys.argv[2]; only=set(sys.argv[3].split(",")) if len(sys.argv)>3 else None
    jobs=[(p,a,st,out) for p,ag in j["states"].items() for a,st in ag.items() if not only or a in only]
    man={}; tot=0
    with cf.ThreadPoolExecutor(6) as ex:
        for pid,age,ok,sz in ex.map(sheet,jobs): man.setdefault(pid,{})[age]=ok; tot+=sz
    q={}
    qj=[(c,a,ts,out) for a,p in j["v3"].items() for c,ts in p.items() if not only or a in only]
    for c,age,ts,sz in map(qstrip,qj): q.setdefault(age,{})[c]=ts; tot+=sz
    json.dump({"s":man,"q":q},open(out+"/manifest90.json","w"),ensure_ascii=False,separators=(",",":"))
    print("sheets",len(jobs),"q",len(qj),"bytes",tot)
