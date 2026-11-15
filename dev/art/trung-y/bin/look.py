# look.py OUT.jpg FILES... : each file on dark, light, and alpha-map tiles (height 450)
import sys; from PIL import Image
fs=sys.argv[2:]; H=450; tiles=[]
for f in fs:
    im=Image.open(f).convert('RGBA'); im=im.resize((round(im.width*H/im.height),H))
    row=[]
    for bg in [(30,30,36),(235,228,215)]:
        t=Image.new('RGBA',im.size,bg+(255,)); t.alpha_composite(im); row.append(t.convert('RGB'))
    row.append(im.split()[3].convert('RGB')); tiles.append(row)
W=sum(t.width for r in tiles for t in r)+5*len(fs)*3; S=Image.new('RGB',(W,H),(255,0,0)); x=0
for r in tiles:
    for t in r: S.paste(t,(x,0)); x+=t.width+5
S.save(sys.argv[1],quality=85)
