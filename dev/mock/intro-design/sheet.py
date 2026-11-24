import sys,glob
from PIL import Image
out=sys.argv[1];fs=sys.argv[2:]
ims=[Image.open(f).convert('RGB') for f in fs]
h=640;ims=[i.resize((int(i.width*h/i.height),h)) for i in ims]
cols=min(len(ims),4 if ims[0].width<ims[0].height else 3)
rows=(len(ims)+cols-1)//cols
w=max(i.width for i in ims)
S=Image.new('RGB',(cols*w,rows*h),'white')
for k,i in enumerate(ims):S.paste(i,((k%cols)*w,(k//cols)*h))
S.thumbnail((2200,2400));S.save(out)
