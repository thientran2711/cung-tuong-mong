from PIL import Image, ImageDraw
import os, sys
H=open('hits.txt').read().split(); tiles=[]
for k in H:
    p='hd/fig-' if os.path.exists(f'out/img/hd/fig-{k}.webp') else 'fig-'
    b=Image.open(f'bk/img/_backup/1119-shadow/{p}{k}.webp').convert('RGBA'); a=Image.open(f'out/img/{p}{k}.webp').convert('RGBA')
    def crop(im):
        h=im.height; c=im.crop((0,int(h*.70),im.width,h)); out=[]
        for col in ((32,30,48,255),(205,195,180,255)):
            bg=Image.new('RGBA',c.size,col); bg.alpha_composite(c); out.append(bg.convert('RGB'))
        w=c.width; t=Image.new('RGB',(w*2+6,c.height),(0,0,0)); t.paste(out[0],(0,0)); t.paste(out[1],(w+6,0)); return t
    cb,ca=crop(b),crop(a); h=260; cb=cb.resize((cb.width*h//cb.height,h)); ca=ca.resize((ca.width*h//ca.height,h))
    t=Image.new('RGB',(cb.width+ca.width+30,h+26),(70,70,70)); t.paste(cb,(0,26)); t.paste(ca,(cb.width+30,26))
    d=ImageDraw.Draw(t); d.text((4,6),f'{k.replace("consort-","")}  BEFORE (dark | light bg)',fill=(255,220,120)); d.text((cb.width+34,6),'AFTER',fill=(140,255,140)); tiles.append(t)
W=max(t.width for t in tiles); S=Image.new('RGB',(W,sum(t.height+8 for t in tiles)),(40,40,40)); y=0
for t in tiles: S.paste(t,(0,y)); y+=t.height+8
os.makedirs('rv/img/_review/live-fix',exist_ok=True); S.save('rv/img/_review/live-fix/shadow_before_after.jpg',quality=85); print(S.size)
