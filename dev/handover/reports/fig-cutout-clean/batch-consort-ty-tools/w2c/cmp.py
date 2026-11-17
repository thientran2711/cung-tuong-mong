import sys; from PIL import Image,ImageDraw
S="/tmp/claude-0/-home-user-cung-tuong-mong/b0fea55b-58f1-53e0-a07a-3e5ec42514dd/scratchpad"
out=sys.argv[1]; keys=sys.argv[2:]; cols=4; W=130; H=300; L=14
rows=(len(keys)+cols-1)//cols
sh=Image.new("RGB",(cols*2*W,rows*(H+L)),(30,30,36)); d=ImageDraw.Draw(sh)
for n,k in enumerate(keys):
    r,c=divmod(n,cols)
    for j,p in enumerate([f"{S}/old/fig-{k}.webp",f"{S}/out/img/fig-{k}.webp"]):
        im=Image.open(p).convert("RGBA"); im=im.resize((int(im.width*H/im.height),H),Image.LANCZOS)
        t=Image.new("RGBA",(W,H),(30,30,36,255)); t.alpha_composite(im,((W-im.width)//2,0))
        sh.paste(t.convert("RGB"),((c*2+j)*W,r*(H+L)+L))
    d.text((c*2*W+3,r*(H+L)+1),k.replace("consort-","")+" OLD|NEW",fill=(230,230,230))
sh.save(out,quality=88)
