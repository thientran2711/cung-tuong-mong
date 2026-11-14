# porsheet8.py out.jpg tier cid... : 4 por per consort, 2 consorts per row (art8 review)
import sys
from PIL import Image
out,t=sys.argv[1],sys.argv[2]; cs=sys.argv[3:]; W,H=192,253
o=Image.new('RGB',(8*W,((len(cs)+1)//2)*H),'white')
for i,c in enumerate(cs):
  for j,a in enumerate(['a18','a26','a36','a51']):
    im=Image.open(f'img/por-consort-{c}-t{t}-{a}.webp').convert('RGBA').resize((W,H)); bg=Image.new('RGB',(W,H),(60,40,40)); bg.paste(im,mask=im.split()[3])
    o.paste(bg,(((i%2)*4+j)*W,(i//2)*H))
o.save(out,quality=85)
