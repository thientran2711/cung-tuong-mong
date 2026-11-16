"""compose before|after section PNGs (kit-marks-sheet.js output) into phone-readable sheets: python3 dev/test/kit-marks-compose.py <shdir> <outdir>"""
import sys,glob,os
from PIL import Image,ImageDraw
D=sys.argv[1].rstrip('/')+'/';O=sys.argv[2].rstrip('/')+'/'
os.makedirs(O,exist_ok=True)
for f in glob.glob(O+'sample-*.jpg'):os.remove(f)
groups={'1a-gold-names':[0],'1b-rank-rows':[1],'2-text-lines':[2],'3-marks':[3,4],'4a-relations-pair':[5],'4b-relations-tables':[6,7],'5-seal-delta':[8,9],'6a-grade-chip':[10],'6b-place-icon':[11]}
def lab(t,w):
    im=Image.new('RGB',(w,44),'#222');ImageDraw.Draw(im).text((12,12),t,fill='white');return im
for k,ix in groups.items():
    parts=[]
    for i in ix:
        for tag,t in (('before','BEFORE (main)'),('after','AFTER (review/kit-marks)')):
            im=Image.open(D+'%s-%02d.png'%(tag,i)).convert('RGB');parts.append((lab(t,im.width),im))
    W=max(im.width for _,im in parts);H=sum(l.height+im.height+6 for l,im in parts)
    sheet=Image.new('RGB',(W,H),'white');y=0
    for l,im in parts:
        sheet.paste(l,(0,y));y+=l.height;sheet.paste(im,(0,y));y+=im.height+6
    w=1100 if H*1100/W<=2050 else int(2050*W/H)
    sheet=sheet.resize((w,int(H*w/W)));sheet.save(O+'sample-%s.jpg'%k,quality=80);print(k,sheet.size)
