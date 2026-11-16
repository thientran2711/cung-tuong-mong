# sheets_a18.py: contact sheets of a18 por forehead crops, 8 tiers per row, 4 styles per sheet, box drawn.
# usage (cwd=work): python3 -I sheets_a18.py SRC_DIR BOXES.json OUTPREFIX [style-filter]   (BOXES: name -> {"box":[x0,y0,x1,y1]} | [..] | null)
import sys,json,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from PIL import Image,ImageDraw
from face import comp
src,bj,pre=sys.argv[1:4]; flt=sys.argv[4] if len(sys.argv)>4 else ''
D=json.load(open(bj))
CX0,CY0,CX1,CY1=150,122,240,198; Z=3; W=(CX1-CX0)*Z; H=(CY1-CY0)*Z
styles=sorted({n[4:].rsplit('-',2)[0] for n in D if flt in n})
for s in range(0,len(styles),4):
    sh=Image.new('RGB',(8*W,4*H),(255,255,255))
    for r,st in enumerate(styles[s:s+4]):
        for t in range(1,9):
            n=f'por-{st}-t{t}-a18'; im=Image.fromarray(comp(Image.open(f'{src}/{n}.webp'))).convert('RGB')
            v=D.get(n); bx=v['box'] if isinstance(v,dict) else v
            c=im.crop((CX0,CY0,CX1,CY1)).resize((W,H),Image.LANCZOS); d=ImageDraw.Draw(c)
            if bx:
                bs=bx if isinstance(bx[0],(list,tuple)) else [bx]
                for b in bs: d.rectangle([(b[0]-CX0)*Z,(b[1]-CY0)*Z,(b[2]-CX0)*Z,(b[3]-CY0)*Z],outline=(0,200,0))
            d.text((3,2),f"{st.replace('consort-','').replace('maid-','')} t{t}"+('' if bx else ' NONE'),fill=(0,0,255))
            sh.paste(c,((t-1)*W,r*H))
    sh.save(f'{pre}_{s//4:02d}.png')
print(len(styles))
