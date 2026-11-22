import sys
from PIL import Image, ImageDraw, ImageFont
import glob
import json; ks=[tuple(x) for x in json.loads(sys.argv[4])]
out=sys.argv[1]; S=int(sys.argv[2]); q=int(sys.argv[3])
def frames(p):
    im=Image.open(p); n=im.n_frames; r=[]
    for i in range(n):
        im.seek(i); r.append(im.convert("RGBA").resize((S,S),Image.LANCZOS))
    return r
fs=glob.glob("/usr/share/fonts/**/DejaVuSans-Bold.ttf",recursive=True)
font=ImageFont.truetype(fs[0],15)
seq={}
for k,_,_ in ks:
    seq[k]=frames(f"/tmp/th/webp/{k}-out.webp")+frames(f"/tmp/th/webp/{k}-loop.webp")*2+frames(f"/tmp/th/webp/{k}-back.webp")
N=max(len(v) for v in seq.values()); H=S+36
out_f=[]
for i in range(N):
    sh=Image.new("RGB",(S*5,H),(250,244,230)); d=ImageDraw.Draw(sh)
    for c,(k,vn,code) in enumerate(ks):
        s=seq[k]; f=s[min(i,len(s)-1)]
        sh.paste(f,(c*S,0),f)
        d.text((c*S+S//2,S+4),vn,font=font,fill=(60,40,30),anchor="mt"); d.text((c*S+S//2,S+20),code,font=font,fill=(120,100,90),anchor="mt")
    out_f.append(sh)
out_f[0].save(out,save_all=True,append_images=out_f[1:],duration=67,loop=0,quality=q,method=4)
print(N,"frames")
