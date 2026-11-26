import sys,subprocess,os
from PIL import Image
# getimg.py <outdir> <tag>  reads stdin "emo url"; downloads, flattens on green, saves <outdir>/<tag>_<emo>.png (1024), prints needs-upload (all are re-uploaded unless already green) 
d,tag=sys.argv[1:3]
rows=[]
for ln in sys.stdin:
    p=ln.split()
    if len(p)<2: continue
    e,u=p[0],p[1]; raw=f"{d}/{tag}_{e}_raw.png"
    subprocess.run(["curl","-s","-o",raw,u],check=True)
    im=Image.open(raw); mode=im.mode; im=im.convert("RGBA")
    c=im.getpixel((6,6)); green=(c[0]<40 and c[1]>215 and c[2]<40 and c[3]==255)
    bg=Image.new("RGBA",im.size,(0,255,0,255)); o=Image.alpha_composite(bg,im).convert("RGB").resize((1024,1024),Image.LANCZOS)
    o.save(f"{d}/{tag}_{e}.png"); rows.append((e,o,mode,green)); print(e,mode,"green" if green else "FLATTENED")
n=len(rows); cols=7; W=200
sh=Image.new("RGB",(cols*W,((n+cols-1)//cols)*W),(40,40,40))
for i,(e,o,_,_) in enumerate(rows): sh.paste(o.resize((W,W)),((i%cols)*W,(i//cols)*W))
sh.save(f"{d}/{tag}_contact.png")
