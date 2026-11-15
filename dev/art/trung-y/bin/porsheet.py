# porsheet.py OUT.jpg OUTDIR ROLE-ID... : rows of portraits (ty1..8 x a18,a51), 120px wide each, for face/huadian checks
import sys,os; from PIL import Image, ImageDraw
out,d,ids=sys.argv[1],sys.argv[2],sys.argv[3:]; w,h=120,158
S=Image.new('RGB',(16*w+70,len(ids)*h),(40,38,44)); D=ImageDraw.Draw(S)
for r,x in enumerate(ids):
    D.text((4,r*h+4),x.split('-')[1],fill=(255,255,255))
    for g in range(8):
        for k,ag in enumerate(('a18','a51')):
            p=f'{d}/por-{x}-ty{g+1}-{ag}.webp'
            if not os.path.exists(p): continue
            im=Image.open(p).convert('RGBA').resize((w,h)); t=Image.new('RGBA',(w,h),(200,196,188,255)); t.alpha_composite(im)
            S.paste(t.convert('RGB'),(60+(g*2+k)*w+ (g*0),r*h))
S.save(out,quality=85)
