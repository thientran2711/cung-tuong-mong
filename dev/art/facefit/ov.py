import sys,json,math
from PIL import Image,ImageDraw
def box(d,im,r,col):
    W,H=im.size;l,t,w,h,rot=r
    x0,y0,bw,bh=l/100*W,t/100*H,w/100*W,h/100*H
    cx,cy=x0+bw/2,y0+bh/2;a=math.radians(rot)
    def P(u,v):
        px,py=x0+u*bw-cx,y0+v*bh-cy
        return (cx+px*math.cos(a)-py*math.sin(a),cy+px*math.sin(a)+py*math.cos(a))
    pts=[P(0,0),P(1,0),P(1,1),P(0,1),P(0,0)];d.line(pts,fill=col,width=2)
    d.line([P(0,.165),P(1,.165)],fill=(0,0,255),width=2)
if __name__=="__main__":
    v=json.load(open('veil.json'));s=json.load(open('scar.json'))
    out=Image.new('RGB',(384*2,506))
    for i,f in enumerate(sys.argv[2:]):
        im=Image.open('im/'+f).convert('RGB');d=ImageDraw.Draw(im);box(d,im,v[f],(255,0,0));box(d,im,s[f],(0,200,0))
        out.paste(im.resize((384,506)),(384*i,0))
    out.save(sys.argv[1])
