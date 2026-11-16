# sheets18.py: contact sheets of a18 por forehead crops with detected box. usage: sheets18.py det.json prefix [filter]
import sys,json,re
from PIL import Image,ImageDraw
sys.path.insert(0,'../dev/art/huadian-size')
from face import comp
D=json.load(open(sys.argv[1])); pre=sys.argv[2]; flt=sys.argv[3] if len(sys.argv)>3 else ''
names=[n for n in sorted(D) if flt in n]
CW,CH=150,120; PER=10; ROWS=6; Z=2
for s in range(0,len(names),PER*ROWS):
    sh=Image.new('RGB',(PER*CW*Z//1,ROWS*CH*Z)); 
    for i,n in enumerate(names[s:s+PER*ROWS]):
        im=Image.fromarray(comp(Image.open(f'src/{n}.webp'))); d=ImageDraw.Draw(im); v=D[n]
        if v: d.rectangle(v['box'],outline=(0,220,0))
        c=im.crop((119,125,119+CW,125+CH)).resize((CW*Z,CH*Z),Image.LANCZOS); dd=ImageDraw.Draw(c)
        dd.text((3,2),n.replace('por-','').replace('-a18','')+(f" {v['w']:.3f}" if v else ' NONE'),fill=(0,0,255))
        sh.paste(c,((i%PER)*CW*Z,(i//PER)*CH*Z))
    sh.save(f'{pre}_{s//(PER*ROWS):02d}.png')
print(len(names))
