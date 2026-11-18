import sys
from PIL import Image
# row.py out.jpg file1 file2 ... (any png/webp), height-normalised, <=1400 wide
out=sys.argv[1];fs=sys.argv[2:]
ims=[Image.open(f).convert('RGBA') for f in fs]
h=700;r=[i.resize((int(i.width*h/i.height),h)) for i in ims]
S=Image.new('RGB',(sum(x.width for x in r),h),(235,225,205));x=0
for i in r:S.paste(i,(x,0),i);x+=i.width
S=S.resize((1400,int(S.height*1400/S.width)));S.save(out,quality=80)
