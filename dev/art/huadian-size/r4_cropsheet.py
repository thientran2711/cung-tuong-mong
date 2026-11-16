import sys,json,re,os
from PIL import Image,ImageDraw
BOX=json.load(open('/home/user/wt/hd/dev/art/huadian-size/a18_boxes.json'))
REF=json.load(open('/home/user/wt/hd/dev/art/huadian-size/ref.json'))
def cell(path,name,S=3,hw=95):
    pid=re.match(r'por-((?:consort|maid)-[cm]\d\d|player-look\d)-t(\d)',name).group(1)
    b=BOX[re.sub(r'-a\d+$','-a18',name)]; cx0,ey0,fw0=REF[pid]
    im=Image.open(path).convert('RGBA'); bg=Image.new('RGBA',im.size,(236,231,224,255)); bg.alpha_composite(im)
    cx=(b[0]+b[2])/2; cy=(b[1]+b[3])/2
    c=bg.convert('RGB').crop((int(cx-hw/2),int(cy-hw/2*0.8),int(cx+hw/2),int(cy+hw/2*0.8))).resize((hw*S//1,int(hw*0.8*S)),Image.LANCZOS)
    d=ImageDraw.Draw(c); d.text((3,3),name.replace('por-','').replace('consort-','').replace('maid-',''),fill=(0,0,0))
    return c
if __name__=='__main__':
    out=sys.argv[1]; files=sys.argv[2:]
    cs=[cell(f,os.path.basename(f)[:-5]) for f in files]; w,h=cs[0].size; n=6
    sh=Image.new('RGB',(w*n,h*((len(cs)+n-1)//n)))
    for i,c in enumerate(cs): sh.paste(c,((i%n)*w,(i//n)*h))
    sh.save(out,quality=88); print(sh.size)
