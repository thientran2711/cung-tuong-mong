import sys
from PIL import Image
c=sys.argv[1]; names=sys.argv[2:]; W='/home/user/wt/w65c-work'
cw=400; ch=300; cols=min(len(names),6); rows=(len(names)+cols-1)//cols
s=Image.new('RGB',(cw*cols,ch*rows),(200,200,200))
for i,n in enumerate(names):
    im=Image.open(f'{W}/{c}/new/{n}.png').convert('RGBA'); w,h=im.size
    bb=im.split()[-1].point(lambda a:255 if a>128 else 0).getbbox()
    # head region: from bbox top; figure height ~ bbox
    top=bb[1]; fh=bb[3]-bb[1]
    cx=(bb[0]+bb[2])//2
    cr=im.crop((cx-int(fh*.13),top+int(fh*.07),cx+int(fh*.13),top+int(fh*.07)+int(fh*.195))).resize((cw,ch))
    s.paste(cr,((i%cols)*cw,(i//cols)*ch),cr)
s.save(f'{W}/{c}/mouth.jpg')
