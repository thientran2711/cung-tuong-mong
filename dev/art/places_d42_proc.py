# D42 places: Magnific zip/dir -> img/<name>.webp (1280x720, q72) + contact sheets for looking.
# usage: python3 dev/art/places_d42_proc.py   (reads dev/art/places_work/gens.txt, zz/*.png by id, base pngs ttp2/acs2/dc1)
import os,re,sys
from PIL import Image
R=os.path.dirname(os.path.abspath(__file__))+'/../../';W=R+'dev/art/places_work/'
BASE={'nVj4ITSYQD':'ttp2','8aNc5ffIrU':'acs2','UPm5A9cwny':'dc1'}
byid={}
for f in os.listdir(W+'zz'):
    m=re.search(r'_([A-Za-z0-9]{10})\.png$',f)
    if m:byid[m.group(1)]=W+'zz/'+f
os.makedirs(R+'img',exist_ok=True)
names=[]
for l in open(W+'gens.txt'):
    if l.startswith('#') or not l.strip():continue
    n,i=l.split();p=byid.get(i) or (W+BASE[i]+'.png' if i in BASE else None)
    if not p:print('missing',n,i);continue
    im=Image.open(p).convert('RGB').resize((1280,720),Image.LANCZOS);im.save(R+f'img/{n}.webp',quality=72,method=4);names.append(n)
    if n.endswith('-xuan-sang'):im.save(R+f'img/{n[:-10]}.webp',quality=72,method=4)  # fallback = spring morning
print(len(names),'done')
for b in ['thuong-thu-phong','a-ca-so','dong-cung']:
    ims=[Image.open(R+f'img/{b}-{s}-{t}.webp').resize((320,180)) for s in ['xuan','ha','thu','dong'] for t in ['sang','trua','chieu','toi']]
    S=Image.new('RGB',(1280,720))
    for i,im in enumerate(ims):S.paste(im,((i%4)*320,(i//4)*180))
    S.save(W+f'sheet-{b}.jpg',quality=80)
