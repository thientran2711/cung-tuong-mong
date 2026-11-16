# sheet_list.py: contact sheet of chosen tiles. usage (cwd=work): sheet_list.py SRC BOXES.json NAMES.txt OUTPREFIX [Z]
import sys,json,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from PIL import Image,ImageDraw
from face import comp
src,bj,nl,pre=sys.argv[1:5]; Z=int(sys.argv[5]) if len(sys.argv)>5 else 2
D=json.load(open(bj)); names=[l.strip() for l in open(nl) if l.strip()]
CX0,CY0,CX1,CY1=140,110,250,205; W=(CX1-CX0)*Z; H=(CY1-CY0)*Z; C=8; R=5
for s in range(0,len(names),C*R):
    sh=Image.new('RGB',(C*W,R*H),(255,255,255))
    for i,n in enumerate(names[s:s+C*R]):
        im=Image.fromarray(comp(Image.open(f'{src}/{n}.webp'))).convert('RGB'); v=D.get(n); bx=v['box'] if isinstance(v,dict) else v
        c=im.crop((CX0,CY0,CX1,CY1)).resize((W,H),Image.LANCZOS); d=ImageDraw.Draw(c)
        if bx:
            for b in (bx if isinstance(bx[0],(list,tuple)) else [bx]): d.rectangle([(b[0]-CX0)*Z,(b[1]-CY0)*Z,(b[2]-CX0)*Z,(b[3]-CY0)*Z],outline=(0,200,0))
        d.text((3,2),n.replace('por-','').replace('consort-','').replace('maid-','').replace('-a18',''),fill=(0,0,255))
        sh.paste(c,((i%C)*W,(i//C)*H))
    sh.save(f'{pre}_{s//(C*R):02d}.png')
