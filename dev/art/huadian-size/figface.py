# figface.py: fast face finder for full-body figures: crop the top part, upscale 1.92x (por scale) and run face.face on it.
# returns (cx,ey,fw) in ORIGINAL fig pixels (fw = por-equivalent width / 1.92 -> fig-px) or None
import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from PIL import Image
from face import face
FIGUP=1.92; TOP=330
def figface(path):
    im=Image.open(path).convert('RGBA'); c=im.crop((0,0,im.width,TOP))
    c=c.resize((int(c.width*FIGUP),int(c.height*FIGUP)),Image.LANCZOS)
    tmp='/dev/shm/_ff%d.png'%os.getpid(); c.save(tmp)
    cx,ey,fw,ed,rgb=face(tmp)
    return cx/FIGUP,ey/FIGUP,fw/FIGUP,ed
