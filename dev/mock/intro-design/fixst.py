import glob,re,os
from PIL import Image
groups={}
for f in glob.glob('stills/*-[0-9][0-9][0-9][0-9][0-9].png'):
    m=re.match(r'stills/(\w+-\w+)-(\d+)\.png',f);groups.setdefault(m.group(1),[]).append((int(m.group(2)),f))
for g,l in groups.items():
    n=len(glob.glob(f'stills/{g}-s[0-9].jpg'))
    for t,f in sorted(l):
        n+=1;Image.open(f).convert('RGB').save(f'stills/{g}-s{n}.jpg',quality=84);os.remove(f)
