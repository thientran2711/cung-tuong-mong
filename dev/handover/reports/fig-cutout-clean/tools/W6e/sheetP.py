import sys,os,subprocess
from PIL import Image,ImageDraw
# usage: sheetP.py dir tsv out [oldage]  ; old = live CDN a26 file (or given), new = out/img/fig-key.webp
d,tsv,out=sys.argv[1:4]
age=sys.argv[4] if len(sys.argv)>4 else 'a26'
keys=[l.split('\t')[0] for l in open(tsv) if l.strip()]
H=370;W=185;per=4
def ld(p):
    im=Image.open(p).convert('RGBA');w=min(W,int(im.width*H/im.height));im=im.resize((w,H));c=Image.new('RGBA',(W,H),(36,36,42,255));c.alpha_composite(im,((W-w)//2,0));return c
rows=(len(keys)+per-1)//per
S=Image.new('RGB',(per*2*W,rows*H),(0,0,0));dr=ImageDraw.Draw(S)
for i,k in enumerate(keys):
    r,c=divmod(i,per)
    op=f'{d}/old/{k}.webp'
    if not os.path.exists(op):
        os.makedirs(f'{d}/old',exist_ok=True);subprocess.run(['curl','-s','-o',op,f'https://ctm-img.victoria-tntt.workers.dev/img/fig-{k}.webp'])
    S.paste(ld(op).convert('RGB'),(c*2*W,r*H));S.paste(ld(f'{d}/out/img/fig-{k}.webp').convert('RGB'),(c*2*W+W,r*H))
    dr.text((c*2*W+4,r*H+4),'OLD '+k[5:],fill=(255,255,255));dr.text((c*2*W+W+4,r*H+4),'NEW',fill=(255,230,120))
S.save(out,quality=80);print(S.size)
