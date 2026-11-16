# python3 phash.py INDEX.json DIR OUT.json : download every img/act-*.webp and img/ev-*.webp of the CDN index into DIR (cached),
# compute a 64-bit difference hash (9x8 grey) per file and write {file: hexhash}. Near-duplicates = Hamming distance <= 8.
import json,sys,os,re,urllib.request,concurrent.futures as cf
from PIL import Image
I=json.load(open(sys.argv[1]))['files'];D=sys.argv[2];B="https://ctm-img.victoria-tntt.workers.dev/"
F=[f[0].split('img/')[-1] for f in I if re.search(r'img/(act|ev)-[^/]*\.webp$',f[0])]
def get(n):
    p=os.path.join(D,n)
    if not os.path.exists(p):
        r=urllib.request.Request(B+'img/'+n,headers={'User-Agent':'ctm'});open(p,'wb').write(urllib.request.urlopen(r,timeout=60).read())
    im=Image.open(p).convert('L').resize((9,8),Image.LANCZOS);px=list(im.getdata());h=0
    for y in range(8):
        for x in range(8): h=(h<<1)|(px[y*9+x]>px[y*9+x+1])
    return n,'%016x'%h
out={}
with cf.ThreadPoolExecutor(16) as ex:
    for n,h in ex.map(lambda n:(lambda:get(n))() if True else None,F): out[n]=h
json.dump(out,open(sys.argv[3],'w'));print(len(out))
