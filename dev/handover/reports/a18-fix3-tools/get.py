import sys,subprocess,os
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
c=sys.argv[1]; W='/home/user/wt/w65c-work'; d=f'{W}/{c}/new'; os.makedirs(d,exist_ok=True)
pairs=[a.split('=',1) for a in sys.argv[2:]]
def f(p): subprocess.run(['curl','-sS','-o',f'{d}/{p[0]}.png',p[1]],check=True)
list(ThreadPoolExecutor(6).map(f,pairs))
ims=[Image.open(f'{d}/{n}.png').convert('RGBA') for n,_ in pairs]
w=min(500,2400//len(ims)); s=Image.new('RGB',(w*len(ims),round(w*2.25)),(200,200,200))
for i,im in enumerate(ims):
    im.thumbnail((w,10000)); s.paste(im,(i*w,0),im)
s.save(f'{W}/{c}/new.jpg'); print(s.size)
