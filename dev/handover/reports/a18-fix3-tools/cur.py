import sys,json,subprocess,os
from PIL import Image
c=sys.argv[1]; W='/home/user/wt/w65c-work'; p=json.load(open(f'{W}/tools/plan.json'))[c]
d=f'{W}/{c}/cur'; os.makedirs(d,exist_ok=True)
B=f'https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/{c}/b10'
fs=[k for k in sorted(p) if not k.startswith('t7') and not k.startswith('t8')]
ims=[]
for k in fs:
    t,v=k.split('_'); f=f'{d}/{k}.png'
    subprocess.run(['curl','-sS','--retry','5','--retry-all-errors','-o',f,f'{B}/{c}_a18_{t}_{v}.png'],check=True)
    print(k,p[k],f'{B}/{c}_a18_{t}_{v}.png'); ims.append(Image.open(f).convert('RGBA'))
w=300; s=Image.new('RGB',(w*len(ims),675),(200,200,200))
for i,im in enumerate(ims):
    im.thumbnail((w,675)); s.paste(im,(i*w,0),im)
s.save(f'{d}/../cur.jpg'); print(s.size)
