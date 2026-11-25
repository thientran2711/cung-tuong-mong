import sys,os,io,urllib.request,json
from PIL import Image,ImageDraw
B="https://ctm-img.victoria-tntt.workers.dev/"
D="/tmp/claude-0/s/dl/"
def get(k):
    p=D+k.replace('/','__')
    if not os.path.exists(p):
        r=urllib.request.urlopen(urllib.request.Request(B+k+"?v=1",headers={"User-Agent":"c3-style"}),timeout=60).read()
        open(p,'wb').write(r)
    return Image.open(p).convert('RGB')
def sheet(keys,out,cols=4,w=360,h=270,labels=None):
    rows=(len(keys)+cols-1)//cols
    S=Image.new('RGB',(cols*w,rows*(h+18)),(30,30,30));d=ImageDraw.Draw(S)
    for i,k in enumerate(keys):
        try:
            im=get(k);im.thumbnail((w-4,h-4));
        except Exception as e:
            im=Image.new('RGB',(w-4,h-4),(90,0,0))
        x=(i%cols)*w;y=(i//cols)*(h+18)
        S.paste(im,(x+2,y+2));d.text((x+3,y+h+3),(labels[i] if labels else k)[:58],fill=(255,255,255))
    S.save(out,quality=82)
if __name__=="__main__":
    keys=json.loads(sys.argv[2]);sheet(keys,sys.argv[1],int(sys.argv[3]) if len(sys.argv)>3 else 4)
