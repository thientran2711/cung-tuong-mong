# sheet13.py MODE out.jpg cXX... : whole-portrait sheets from the published por-*.webp at native 384x506 (no downscaling)
#   MODE t78 : per consort row = t7 a18 a26 a36 a51 | t8 a18 a26 a36 a51
#   MODE age : per consort row = a51 of t1 t3 t4 t5 t6 t7 t8 (+ t8 a36 for reference)
import sys
from PIL import Image,ImageDraw,ImageFont
R='/home/user/cung-tuong-mong/.claude/worktrees/agent-a878b9d4ac20deacb/img/'
mode,out=sys.argv[1],sys.argv[2]; cs=sys.argv[3:]
if mode=='t78': cols=[(t,a) for t in ('t7','t8') for a in ('a18','a26','a36','a51')]
else: cols=[(t,'a51') for t in ('t1','t3','t4','t5','t6','t7','t8')]+[('t8','a36')]
W,H,L,TOP=384,506,90,40
try: F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26)
except Exception: F=ImageFont.load_default()
O=Image.new('RGB',(L+W*len(cols),TOP+H*len(cs)),(246,240,228)); d=ImageDraw.Draw(O)
for j,(t,a) in enumerate(cols): d.text((L+j*W+10,6),f'{t} {a.replace("a","")}',fill=(120,30,20),font=F)
for i,c in enumerate(cs):
    d.text((8,TOP+i*H+H//2-14),c,fill=(0,0,0),font=F)
    for j,(t,a) in enumerate(cols):
        try: p=Image.open(R+f'por-consort-{c}-{t}-{a}.webp').convert('RGBA')
        except Exception: continue
        bg=Image.new('RGBA',p.size,(232,222,204,255)); bg.alpha_composite(p); O.paste(bg.convert('RGB').resize((W,H)),(L+j*W,TOP+i*H))
O.save(out,quality=84); print(out,O.size)
