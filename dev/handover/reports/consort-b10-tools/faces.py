import sys
from PIL import Image
d,out=sys.argv[1:3]; names=sys.argv[3:]
cs=[]
for n in names:
    im=Image.open(f'{d}/{n}').convert('RGBA'); w,h=im.size
    # find head: top of alpha bbox
    bb=im.getbbox(); top=bb[1]
    c=im.crop((int(w*.25),top,int(w*.75),top+int(h*.22)))
    bg=Image.new('RGB',c.size,(235,225,205)); bg.paste(c,(0,0),c); cs.append(bg.resize((int(__import__("os").environ.get("FW","340")),int(int(__import__("os").environ.get("FW","340"))*c.height/c.width))))
H=max(c.height for c in cs); S=Image.new('RGB',(int(__import__("os").environ.get("FW","340"))*len(cs),H),(235,225,205))
for i,c in enumerate(cs): S.paste(c,(i*int(__import__("os").environ.get("FW","340")),0))
S.save(out,quality=90)
