import sys
from PIL import Image
c=sys.argv[1]; S=sys.argv[2]
fs=[f"{S}/out/live_{c}_t8_a51.webp"]+[f"{S}/out/{c}_a65_t7_v{k}.png" for k in range(3)]+[f"{S}/out/{c}_a65_t8_v{k}.png" for k in range(3)]
W=190;H=428
sh=Image.new("RGB",(W*7,H),(236,226,206))
for i,f in enumerate(fs):
    im=Image.open(f).convert("RGBA"); im.thumbnail((W,H))
    sh.paste(im,(i*W+(W-im.width)//2,0),im)
sh.save(f"{S}/out/{c}_a65_sheet.jpg",quality=85)
