# usage: python3 -I proc.py dl.txt   (lines: name genId bgUrl)
import sys, json, os, subprocess, io
from PIL import Image, ImageDraw, ImageFont
W="/tmp/claude-0/-home-user-phuong-lenh/1e222f2f-177f-54ad-8b97-a62a9b124c31/scratchpad/figwork"
OUT="/tmp/claude-0/-home-user-phuong-lenh/1e222f2f-177f-54ad-8b97-a62a9b124c31/scratchpad/cung-dau/img"
spec=json.load(open(W+"/spec.json"))
figs_path=OUT+"/FIGURES.json"
figs=json.load(open(figs_path)) if os.path.exists(figs_path) else []
byfile={f["file"]:f for f in figs}
def save_webp(im, path, maxkb=250):
    for q in (86,80,74,68,60,52):
        b=io.BytesIO(); im.save(b,"WEBP",quality=q,method=6); 
        if b.tell()<=maxkb*1024: break
    open(path,"wb").write(b.getvalue()); return b.tell()
def process(name, gen, png):
    im=Image.open(png).convert("RGBA")
    a=im.split()[3].point(lambda v:255 if v>12 else 0)
    bb=a.getbbox(); im=im.crop(bb)
    w,h=im.size
    # portrait: head x from top rows
    al=im.split()[3]
    y0,y1=int(h*0.03),int(h*0.13)
    xs=0;n=0
    px=al.load()
    for y in range(y0,y1,2):
        row=[x for x in range(0,w,2) if px[x,y]>128]
        if row:
            xs+=(row[0]+row[-1])/2;n+=1
    cx=xs/n if n else w/2
    side=int(h*0.21)
    top=int(h*0.01)
    box=(int(cx-side/2),top,int(cx-side/2)+side,top+side)
    por=Image.new("RGBA",(side,side),(0,0,0,0))
    por.paste(im.crop(box),(0,0))
    por=por.resize((256,256),Image.LANCZOS)
    fig=im.resize((max(1,round(w*900/h)),900),Image.LANCZOS)
    fn=name+".webp"; pn="por-"+name[4:]+".webp"
    kb=save_webp(fig,OUT+"/"+fn); save_webp(por,OUT+"/"+pn,80)
    s=spec[name]
    rec=dict(file="img/"+fn,por="img/"+pn,role=s.get("role"),tier=s.get("tier"),trait=s.get("trait"),ageBand=s.get("ageBand"),look=s.get("look"),variant=s.get("variant"),magnificUrl="https://www.magnific.com/app/creation/"+gen)
    byfile[rec["file"]]=rec
    return kb
db=json.load(open(W+"/urls.json"))
only=set(sys.argv[2:])
for line in open(sys.argv[1]):
    p=line.split()
    if len(p)<3: continue
    name,gen,bid=p
    if only and name not in only: continue
    raw=f"{W}/bg/{name}.png"
    done=os.path.exists(raw) and os.path.exists(OUT+"/"+name+".webp") and byfile.get("img/"+name+".webp",{}).get("magnificUrl","").endswith(gen)
    if done: continue
    if bid not in db: print("nourl",name); continue
    subprocess.run(["curl","-sS","-o",raw,db[bid]],check=True)
    kb=process(name,gen,raw)
    print(name, kb//1024,"KB")
order=list(spec.keys())
figs=sorted(byfile.values(), key=lambda f: order.index(f["file"][4:-5]) if f["file"][4:-5] in order else 9999)
json.dump(figs,open(figs_path,"w"),indent=1,ensure_ascii=False)
print("FIGURES.json", len(figs))
