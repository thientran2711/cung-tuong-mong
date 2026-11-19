import sys,glob
from PIL import Image, ImageDraw
keys=[f"m{i:02d}" for i in range(1,53)]
def tile(k):
    K=f"maid-{k}-kc-a18"; H=360
    ims=[Image.open(f"out/_old/fig-{K}.webp"),Image.open(f"out/img/fig-{K}.webp"),Image.open(f"out/_old/por-{K}.webp"),Image.open(f"out/img/por-{K}.webp")]
    ims=[im.convert("RGBA").resize((round(im.width*H/im.height),H)) for im in ims]
    W=sum(i.width for i in ims)+30; t=Image.new("RGB",(W,H+22),(235,230,220)); x=0
    for j,im in enumerate(ims): t.paste(im,(x,22),im); x+=im.width+10
    ImageDraw.Draw(t).text((4,4),f"{k}  old fig | NEW fig | old bust | NEW bust",fill=(0,0,0)); return t
for p in range(0,52,13):
    T=[tile(k) for k in keys[p:p+13]]; cols=4; rows=(len(T)+cols-1)//cols
    w=max(t.width for t in T); h=T[0].height
    S=Image.new("RGB",(w*cols,h*rows),(255,255,255))
    for i,t in enumerate(T): S.paste(t,((i%cols)*w,(i//cols)*h))
    S.save(f"sheet_{p//13+1}.jpg",quality=80); print(S.size)
