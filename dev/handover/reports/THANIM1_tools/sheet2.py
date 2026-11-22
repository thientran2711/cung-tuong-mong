import sys,glob,json,subprocess
from PIL import Image, ImageDraw, ImageFont
# usage: sheet2.py <outbase> <S> <json [[key,"VN","code"],...]> [webp_q]
base=sys.argv[1]; S=int(sys.argv[2]); ks=[tuple(x) for x in json.loads(sys.argv[3])]; q=int(sys.argv[4]) if len(sys.argv)>4 else 0
def frames(p):
    im=Image.open(p); r=[]
    for i in range(im.n_frames):
        im.seek(i); r.append(im.convert("RGBA").resize((S,S),Image.LANCZOS))
    return r
font=ImageFont.truetype(glob.glob("/usr/share/fonts/**/DejaVuSans-Bold.ttf",recursive=True)[0],max(13,S//16))
seq={k:frames(f"webp/{k}-out.webp")+frames(f"webp/{k}-loop.webp")*2+frames(f"webp/{k}-back.webp") for k,_,_ in ks}
N=max(len(v) for v in seq.values()); H=S+S//6
W=S*len(ks); W+=W%2; H+=H%2
def render(i):
    sh=Image.new("RGB",(W,H),(250,244,230)); d=ImageDraw.Draw(sh)
    for c,(k,vn,code) in enumerate(ks):
        s=seq[k]; f=s[min(i,len(s)-1)]; sh.paste(f,(c*S,0),f)
        d.text((c*S+S//2,S+3),vn,font=font,fill=(60,40,30),anchor="mt"); d.text((c*S+S//2,S+3+S//13),code,font=font,fill=(120,100,90),anchor="mt")
    return sh
p=subprocess.Popen(["ffmpeg","-loglevel","error","-y","-f","rawvideo","-pix_fmt","rgb24","-s",f"{W}x{H}","-r","15","-i","-","-c:v","libx264","-pix_fmt","yuv420p","-crf","20","-preset","slow","-movflags","+faststart",base+".mp4"],stdin=subprocess.PIPE)
for i in range(N): p.stdin.write(render(i).tobytes())
p.stdin.close(); p.wait(); print(N,"frames",W,H)
if q:
    # webp sheet at smaller scale
    sc=240/S; fr=[render(i).resize((int(W*sc)//2*2,int(H*sc)//2*2),Image.LANCZOS) for i in range(N)]
    fr[0].save(base+".webp",save_all=True,append_images=fr[1:],duration=67,loop=0,quality=q,method=4)
