# bget.py out.png url  (download + flatten RGBA on green)
import sys,urllib.request
from PIL import Image
o,u=sys.argv[1:3]; urllib.request.urlretrieve(u,o); im=Image.open(o)
if im.mode=='RGBA':
    g=Image.new('RGB',im.size,(0,255,0)); g.paste(im,mask=im.split()[3]); g.save(o)
