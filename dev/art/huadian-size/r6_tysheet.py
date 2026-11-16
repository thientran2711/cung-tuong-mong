# r6_tysheet.py OUTPREFIX DIR MEAS.json minratio : forehead crops of ty a18 files with measured ratio > minratio (x=None for unmeasured), 8 cols
import sys,json,re
from PIL import Image,ImageDraw
pre,d,mj,mn=sys.argv[1:5]; mn=float(mn); M=json.load(open(mj)); R=json.load(open(__file__.rsplit('/',1)[0]+'/ref.json'))
sel=[n for n,x in M.items() if (x and x[0]>mn)] if mn>=0 else [n for n,x in M.items() if x is None]
W,H=140,120; per=48
for k in range(0,len(sel),per):
    ch=sel[k:k+per]; sh=Image.new('RGB',(8*W,((len(ch)+7)//8)*H))
    for i,n in enumerate(ch):
        pid=re.match(r'por-((?:consort|maid)-[cm]\d\d)',n).group(1); cx,ey,fw=R[pid]
        im=Image.open(f'{d}/{n}.webp').convert('RGBA'); b=Image.new('RGBA',im.size,(236,231,224,255)); b.alpha_composite(im)
        t=b.convert('RGB').crop((int(cx-0.34*fw),int(ey-0.66*fw),int(cx+0.34*fw),int(ey-0.02*fw))).resize((W,H),Image.LANCZOS)
        dr=ImageDraw.Draw(t); x=M[n]; dr.text((2,2),n[4:].replace('consort-','').replace('-a18','')+(' %.3f'%x[0] if x else ' -'),fill=(200,0,0)); sh.paste(t,((i%8)*W,(i//8)*H))
    sh.save(f'{pre}_{k//per}.jpg',quality=85); print(f'{pre}_{k//per}.jpg',len(ch))
