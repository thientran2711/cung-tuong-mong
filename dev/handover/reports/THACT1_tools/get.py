import sys,os,urllib.request,concurrent.futures as cf
from PIL import Image
d=sys.argv[1]; os.makedirs(d,exist_ok=True); pairs=list(zip(sys.argv[2::2],sys.argv[3::2]))
def g(p):
    k,u=p; urllib.request.urlretrieve(u,f'{d}/{k}.png'); return k
list(cf.ThreadPoolExecutor(8).map(g,pairs))
ims=[]
for k,_ in pairs:
    im=Image.open(f'{d}/{k}.png'); print(k,im.mode)
    a=im.convert('RGBA'); gimg=Image.new('RGB',im.size,(0,255,0)); gimg.paste(a,mask=a.split()[3]); gimg.save(f'{d}/{k}-g.png'); ims.append(gimg.resize((512,512)))
s=Image.new('RGB',(512*len(ims),512),'white')
for i,m in enumerate(ims): s.paste(m,(512*i,0))
s.save(f'{d}/sheet.jpg',quality=88)
