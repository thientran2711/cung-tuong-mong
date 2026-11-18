import sys
from PIL import Image
labs=sys.argv[1:]
S=Image.new("RGB",(1200,600),(255,255,255))
for i,l in enumerate(labs):
    im=Image.open(f"raw/{l}.png").convert("RGB");w,h=im.size
    f=im.crop((int(w*.2),int(h*.02),int(w*.8),int(h*.19))).resize((400,int(400*(h*.17)/(w*.6))))
    S.paste(f,((i%3)*400,(i//3)*300))
S.save("faces.jpg",quality=85)
