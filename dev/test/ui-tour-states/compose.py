# recompress shots for the PDF: <dir>/{fold,ipad}/*.jpg -> <dir>/c/{fold,ipad}/*.jpg (q, scale)
import sys,os,glob
from PIL import Image
d=sys.argv[1];q=int(sys.argv[2]) if len(sys.argv)>2 else 55;sc=float(sys.argv[3]) if len(sys.argv)>3 else 0.85
for dev in ('fold','ipad'):
  os.makedirs(f'{d}/c/{dev}',exist_ok=True)
  for f in glob.glob(f'{d}/{dev}/*.jpg'):
    im=Image.open(f).convert('RGB');w,h=im.size;im=im.resize((int(w*sc),int(h*sc)),Image.LANCZOS)
    im.save(f'{d}/c/{dev}/'+os.path.basename(f),quality=q,optimize=True,progressive=True)
