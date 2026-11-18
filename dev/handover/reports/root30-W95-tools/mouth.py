import sys
from PIL import Image
# wider face crop (y 4%-17%) so any headdress height works; 3 per row
fs=sys.argv[2:];n=len(fs);sh=Image.new("RGB",(300*min(n,3),200*((n+2)//3)),"white")
for i,f in enumerate(fs):
    im=Image.open(f).convert("RGBA");bg=Image.new("RGBA",im.size,(255,255,255,255));bg.alpha_composite(im);im=bg.convert("RGB");w,h=im.size
    f2=im.crop((int(w*.33),int(h*.05),int(w*.67),int(h*.175)));f2=f2.resize((300,200));sh.paste(f2,((i%3)*300,(i//3)*200))
sh.save(sys.argv[1])
