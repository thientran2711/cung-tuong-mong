# Nhận tranh nơi ở từ tệp zip Magnific (projects_download_zip; tên tệp kết thúc bằng _<mã>.png) hoặc từ thư mục ảnh,
# tra tên qua dev/shots/residence/gens.txt ("<tên> <mã>"), ghi bản game img/<tên>.webp (1620x1080, q72) và ảnh xem trước.
# usage: python3 dev/art/residence_proc.py <zip|dir> [preview_dir]
#        python3 dev/art/residence_proc.py --base   (bản game từ các ảnh gốc đầy đủ dev/shots/residence/*.webp)
import sys,os,re,zipfile,io,glob
from PIL import Image
D=os.path.dirname(os.path.abspath(__file__))+'/../../'
GW,GH=1620,1080
def game(im,name,pv=None):
    im=im.convert('RGB').resize((GW,GH),Image.LANCZOS);im.save(D+f'img/{name}.webp',quality=72,method=4)
    if pv:os.makedirs(pv,exist_ok=True);im.resize((810,540)).save(f'{pv}/{name}.jpg',quality=80)
if sys.argv[1]=='--base':
    for p in sorted(glob.glob(D+'dev/shots/residence/*.webp')):
        n=os.path.basename(p)[:-5];game(Image.open(p),n);print(n)
    sys.exit()
ID={};[ID.__setitem__(l.split()[1],l.split()[0]) for l in open(D+'dev/shots/residence/gens.txt',encoding='utf-8') if l.strip() and not l.startswith('#') and len(l.split())==2]
src=sys.argv[1];pv=sys.argv[2] if len(sys.argv)>2 else None
items=[]
if src.endswith('.zip'):
    z=zipfile.ZipFile(src);items=[(n,lambda n=n:Image.open(io.BytesIO(z.read(n)))) for n in z.namelist()]
else:
    items=[(n,lambda n=n:Image.open(os.path.join(src,n))) for n in os.listdir(src)]
for n,op in items:
    m=re.search(r'_([A-Za-z0-9]{10})\.(png|jpg)$',n)
    if not m or m.group(1) not in ID:print('?',n);continue
    game(op(),ID[m.group(1)],pv);print(ID[m.group(1)])
