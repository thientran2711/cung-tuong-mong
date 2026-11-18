import sys
from PIL import Image
# half.py out.jpg files... ; renders files in one row, width 1400
out=sys.argv[1];fs=sys.argv[2:]
ims=[Image.open(f).convert('RGBA') for f in fs]
h=1000;r=[i.resize((int(i.width*h/i.height),h)) for i in ims]
S=Image.new('RGB',(sum(x.width for x in r),h),(235,225,205));x=0
for i in r:S.paste(i,(x,0),i);x+=i.width
S=S.resize((1400,int(S.height*1400/S.width)));S.save(out,quality=82);print(S.size)
