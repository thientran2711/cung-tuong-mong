# fixalpha.py name... : solidify semi-transparent sheer fabric / bg-removal smudges in img/<name>.webp (fig-...):
# inside the hole-filled silhouette (alpha>40), pixels further than 3 px from the outer edge with partial alpha are
# composited over warm parchment and made opaque; true gaps (alpha<=40 holes) and the soft outer edge stay as they are.
# Then the matching por-*.webp is re-cut exactly like sheetproc.finish().
import sys,io,numpy as np
from PIL import Image
from scipy import ndimage as nd
OUT="/tmp/claude-0/-home-user-cung-tuong-mong/84f333ce-ebd1-5e4a-9b0c-43035da11b67/scratchpad/wt-art4/img"
PARCH=np.array([240,232,218],float)
def save_webp(im,path,maxkb=250):
    for q in (86,80,74,68,60,52):
        b=io.BytesIO(); im.save(b,"WEBP",quality=q,method=4)
        if b.tell()<=maxkb*1024: break
    open(path,"wb").write(b.getvalue())
for name in sys.argv[1:]:
    p=f"{OUT}/{name}.webp"; a=np.asarray(Image.open(p).convert("RGBA")).astype(float)
    al=a[...,3]; m=al>40
    m=nd.binary_closing(m,iterations=4); fill=nd.binary_fill_holes(m)
    inner=nd.binary_erosion(fill,iterations=3)
    part=inner&(al>40)&(al<250)
    k=(al[...,None]/255.0)
    rgb=a[...,:3]*k+PARCH*(1-k)
    a[...,:3]=np.where(part[...,None],rgb,a[...,:3]); a[...,3]=np.where(part,255,al)
    im=Image.fromarray(a.clip(0,255).astype(np.uint8),"RGBA"); save_webp(im,p)
    w,h=im.size; A=np.asarray(im.split()[3]); xs=n=0
    for y in range(int(h*0.03),int(h*0.13),2):
        row=np.nonzero(A[y]>128)[0]
        if len(row): xs+=(row[0]+row[-1])/2; n+=1
    cx=xs/n if n else w/2; side=int(h*0.21); top=int(h*0.01)
    por=Image.new("RGBA",(side,side),(0,0,0,0)); por.paste(im.crop((int(cx-side/2),top,int(cx-side/2)+side,top+side)),(0,0))
    save_webp(por.resize((256,256),Image.LANCZOS),f"{OUT}/por-{name[4:]}.webp",80)
    print(name,"fixed px",int(part.sum()))
