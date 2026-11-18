import sys
from PIL import Image
# crop.py out.jpg file1 file2 ... (each shown at h=700)
out=sys.argv[1];ims=[]
for f in sys.argv[2:]:
    im=Image.open(f).convert('RGBA');h=700;im=im.resize((int(im.width*h/im.height),h));b=Image.new('RGB',im.size,(235,225,205));b.paste(im,(0,0),im);ims.append(b)
S=Image.new('RGB',(sum(i.width for i in ims),700));x=0
for i in ims:S.paste(i,(x,0));x+=i.width
S.resize((1400,int(700*1400/S.width))).save(out,quality=85)
