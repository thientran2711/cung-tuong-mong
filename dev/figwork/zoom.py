# zoom.py out.jpg jid... : forehead zoom of the 4 heads of bg/<jid>-*.png (before | after) using hgrid meta
import sys,json,glob
from PIL import Image
out=sys.argv[1]; rows=[]
for j in sys.argv[2:]:
    p=[x for x in glob.glob(f"bg/{j}-*.png") if x.count('.')==1][0]; M=json.load(open(f"hgrid/{j}.json"))
    for src in (p+".prehd.png",p):
        im=Image.open(src).convert("RGBA"); b=Image.new("RGBA",im.size,(235,225,205,255)); b.alpha_composite(im); im=b.convert("RGB")
        row=Image.new("RGB",(4*240,180))
        for k,m in enumerate(M):
            ex,ey,d=m["eye"]; row.paste(im.crop((int(ex-0.9*d),int(ey-1.1*d),int(ex+0.9*d),int(ey+0.25*d))).resize((240,180)),(k*240,0))
        rows.append(row)
o=Image.new("RGB",(960,180*len(rows)))
for i,r in enumerate(rows): o.paste(r,(0,i*180))
o.save(out,quality=88)
