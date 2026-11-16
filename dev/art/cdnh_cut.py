#!/usr/bin/env python3
"""D16 CDNH works: cut the bg-removed 2x2 sheets (dev/art/cdnh_sheets.txt `cut=` ids, downloaded as <raw>/<kind>-<rid>.png)
   into img/item-tp-<kind>-<rid>-b1..4.webp (256) + img/item512/... (512); the book sheet into img/item-wkbook-<kind>.webp.
   Pieces = connected alpha>16 components of the whole sheet, each given to the quarter of its centroid (specks dropped), bbox scaled to 88% of the square, centred.
   usage: python3 dev/art/cdnh_cut.py <rawdir> [reviewdir]"""
import sys,os,glob
import numpy as np
from PIL import Image
from scipy import ndimage
R=os.path.abspath(os.path.join(os.path.dirname(__file__),"..",".."))
BOOK=["kimchi","phanson","thuchuc","phucthien"]
def cell(q):
    bb=q.getchannel("A").point(lambda v:255 if v>16 else 0).getbbox()
    return q.crop(bb)
def split(im):
    """components of the whole sheet (labelled at half size), each given to the quarter holding its centroid; one RGBA image per quarter"""
    W,H=im.size;sm=np.array(im.getchannel("A").resize((W//2,H//2)))>16
    lab,n=ndimage.label(sm);sz=ndimage.sum(sm,lab,range(1,n+1));cen=ndimage.center_of_mass(sm,lab,range(1,n+1))
    q=np.zeros(n+1,int)-1
    for i in range(n):
        if sz[i]<sm.size*0.0004:continue
        cy,cx=cen[i];q[i+1]=(1 if cy>=H//4 else 0)*2+(1 if cx>=W//4 else 0)
    full=np.array(Image.fromarray(q[lab].astype(np.int16)+1).resize((W,H),Image.NEAREST))-1
    arr=np.array(im);out=[]
    for k in range(4):
        a=arr.copy();a[:,:,3]=np.where(full==k,a[:,:,3],0);out.append(Image.fromarray(a))
    return out
def square(c,side):
    w,h=c.size;s=side*0.88/max(w,h);c=c.resize((max(1,round(w*s)),max(1,round(h*s))),Image.LANCZOS)
    out=Image.new("RGBA",(side,side),(0,0,0,0));out.paste(c,((side-c.width)//2,(side-c.height)//2),c);return out
def main():
    raw=sys.argv[1];rev=sys.argv[2] if len(sys.argv)>2 else None
    os.makedirs(f"{R}/img/item512",exist_ok=True);made=[]
    for f in sorted(glob.glob(f"{raw}/*.png")):
        kind,rid=os.path.basename(f)[:-4].split("-");im=Image.open(f).convert("RGBA");W,H=im.size
        quads=split(im)
        for i,q in enumerate(quads):
            c=cell(q);name=f"item-wkbook-{BOOK[i]}" if kind=="book" else f"item-tp-{kind}-{rid}-b{i+1}"
            square(c,512).save(f"{R}/img/item512/{name}.webp","WEBP",quality=82,method=4)
            square(c,256).save(f"{R}/img/{name}.webp","WEBP",quality=82,method=4);made.append((kind,rid,i,name))
    if rev:
        os.makedirs(rev,exist_ok=True)
        for kind in sorted(set(k for k,_,_,_ in made)):
            L=[x for x in made if x[0]==kind];rows=sorted(set(r for _,r,_,_ in L))
            sheet=Image.new("RGB",(4*160,len(rows)*160),(245,236,215))
            for k,r,i,n in L:
                t=Image.open(f"{R}/img/{n}.webp").resize((150,150));sheet.paste(t,(i*160+5,rows.index(r)*160+5),t)
            sheet.save(f"{rev}/{kind}.jpg",quality=80)
    print(len(made),"pictures")
main()
