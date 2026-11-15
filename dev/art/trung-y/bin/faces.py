# faces.py OUT.jpg OUTDIR ROLE-ID... : forehead/face close-ups (por top-centre crop) ty1..8 x a18,a51 for huadian / mole / text checks
import sys,os; from PIL import Image
out,d,ids=sys.argv[1],sys.argv[2],sys.argv[3:]; s=110
S=Image.new('RGB',(16*s,len(ids)*s),(40,38,44))
for r,x in enumerate(ids):
    for g in range(8):
        for k,ag in enumerate(('a18','a51')):
            p=f'{d}/por-{x}-ty{g+1}-{ag}.webp'
            if not os.path.exists(p): continue
            im=Image.open(p).convert('RGBA'); w,h=im.size; c=im.crop((int(w*.30),int(h*.08),int(w*.70),int(h*.40))).resize((s,int(s*.32*h/(.40*w))))
            t=Image.new('RGBA',(s,s),(200,196,188,255)); t.alpha_composite(c.crop((0,0,s,s))); S.paste(t.convert('RGB'),((g*2+k)*s,r*s))
S.save(out,quality=88)
