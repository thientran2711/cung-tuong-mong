import sys
from PIL import Image, ImageDraw
keys=[l.split()[1] for l in open(sys.argv[1])]; pref=sys.argv[2]; per=24
for s in range(0,len(keys),per):
    ks=keys[s:s+per]; C=8; R=(len(ks)+C-1)//C; cw=230; ch=420
    sh=Image.new('RGB',(C*cw,R*ch),(140,140,140)); d=ImageDraw.Draw(sh)
    for i,k in enumerate(ks):
        x=(i%C)*cw; y=(i//C)*ch
        f=Image.open(f'out/img/fig-{k}.webp').convert('RGBA'); f=f.resize((round(f.width*300/f.height),300)); sh.paste(f,(x+(cw-f.width)//2,y),f)
        try:
            p=Image.open(f'out/img/por-{k}.webp').convert('RGBA'); p=p.resize((76,100)); sh.paste(p,(x+cw//2-80,y+302),p)
            o=Image.open(f'out/_old/por-{k}.webp').convert('RGBA'); o=o.resize((76,100)); sh.paste(o,(x+cw//2+4,y+302),o)
        except Exception: pass
        d.text((x+4,y+406),k.replace('consort-',''),fill=(0,0,0))
    sh.save(f'{pref}{s//per:02d}.jpg',quality=78)
