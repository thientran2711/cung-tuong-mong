# lib.py — m05 huadian fix helpers (face via porcrop.find_face)
import sys,os,io,numpy as np
from PIL import Image,ImageDraw,ImageFont
WT="/home/user/cung-tuong-mong/.claude/worktrees/agent-a8fc7f5e0876349f1"
sys.path.insert(0,WT+"/dev/figwork/maidC")
from porcrop import find_face
H=os.path.dirname(os.path.abspath(__file__))
BG=(236,231,224)
AGES=["a18","a26","a36","a51"]
def src(fn,orig=False):
    p=f"{H}/out/{fn}"
    return p if (not orig and os.path.exists(p)) else f"{H}/orig/{fn}"
def comp(im,bg=BG):
    b=Image.new("RGBA",im.size,bg+(255,)); b.alpha_composite(im.convert("RGBA")); return b.convert("RGB")
def ccrop(im,cx,cy,s):
    """square crop centred (cx,cy) of side s, padded with BG"""
    x0=int(round(cx-s/2)); y0=int(round(cy-s/2)); s=int(round(s))
    c=Image.new("RGBA",(s,s),BG+(255,)); c.alpha_composite(comp(im).convert("RGBA").crop((x0,y0,x0+s,y0+s)))
    return c.convert("RGB"),(x0,y0,x0+s,y0+s)
def save_webp(im,path,maxkb=250):
    for q in (86,80,74,68,60,52):
        b=io.BytesIO(); im.save(b,"WEBP",quality=q,method=4)
        if b.tell()<=maxkb*1024: break
    open(path,"wb").write(b.getvalue())
F=lambda n: ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",n)
def fh_crop(path,S=256,z=0.9,up=0.35):
    im=Image.open(path).convert("RGBA"); cx,ey,fw,_=find_face(im)
    c,_=ccrop(im,cx,ey-fw*up,fw*z); return c.resize((S,S),Image.LANCZOS)
