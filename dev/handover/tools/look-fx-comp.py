import sys, math, random
from PIL import Image, ImageDraw, ImageChops, ImageFilter, ImageFont
W=lambda n:Image.open(n+'.webp').convert('RGBA')
FIG={'c01':dict(f='fig-consort-c01-t2-a26',cx=167,cy=86,fw=80,fh=105,ht=2,lab='Ao do/cam'),
     'c30':dict(f='fig-consort-c30-t2-a26',cx=163,cy=106,fw=80,fh=105,ht=8,lab='Ao sang')}
BG=(232,228,216)
def place(base,dec,cx,cy,w,rot=0,op=1.0,mode='normal',clip=None,flip=False):
    d=dec.copy()
    if flip:d=d.transpose(Image.FLIP_LEFT_RIGHT)
    h=int(d.size[1]*w/d.size[0]);d=d.resize((max(1,int(w)),max(1,h)),Image.LANCZOS)
    if rot:d=d.rotate(rot,expand=True,resample=Image.BICUBIC)
    a=d.split()[3].point(lambda v:int(v*op));d.putalpha(a)
    layer=Image.new('RGBA',base.size,(0,0,0,0));layer.paste(d,(int(cx-d.size[0]/2),int(cy-d.size[1]/2)),d)
    if clip is not None:
        la=layer.split()[3];la=ImageChops.multiply(la,clip);layer.putalpha(la)
    if mode=='multiply':
        r=ImageChops.multiply(base.convert('RGB'),layer.convert('RGB'));
        m=layer.split()[3];out=Image.composite(r,base.convert('RGB'),m).convert('RGBA');out.putalpha(base.split()[3]);return out
    return Image.alpha_composite(base,layer)
def faceclip(base,g,s=1.0):
    m=Image.new('L',base.size,0);d=ImageDraw.Draw(m)
    d.ellipse([g['cx']-g['fw']*.52*s,g['cy']-g['fh']*.46*s,g['cx']+g['fw']*.52*s,g['cy']+g['fh']*.52*s],fill=255)
    return m.filter(ImageFilter.GaussianBlur(2))
def alpha_clip(base):return base.split()[3]
import numpy as np
def recolor(im,rgb):
    a=np.array(im);a[...,0]=rgb[0];a[...,1]=rgb[1];a[...,2]=rgb[2];return Image.fromarray(a)
def thicken(im,k):
    al=im.split()[3].filter(ImageFilter.MaxFilter(k)).filter(ImageFilter.GaussianBlur(.8));o=im.copy();o.putalpha(al);return o
def drybrush(im,seed=3):
    rnd=np.random.RandomState(seed);w,h=im.size
    n=rnd.rand(h,w);n=np.array(Image.fromarray((n*255).astype('uint8')).resize((w//2+1,h//2+1)).resize((w,h),Image.BICUBIC))/255.
    st=np.array(Image.fromarray((rnd.rand(1,w)*255).astype('uint8')).resize((w,h),Image.NEAREST))/255.  # streaks along x
    m=np.clip((n*.5+st*.5)*1.6,0,1)**.6;a=np.array(im.split()[3]).astype(float)*m
    o=im.copy();o.putalpha(Image.fromarray(a.astype('uint8')).filter(ImageFilter.GaussianBlur(1.2)));return o
def soften_pox(im):
    a=np.array(im).astype(float);g=a[...,:3].mean(-1,keepdims=True);a[...,:3]=a[...,:3]*.35+g*.2+np.array([205,140,135])*.45
    o=Image.fromarray(a.clip(0,255).astype('uint8'));o.putalpha(im.split()[3]);return o
D={}
def dec(n):
    if n not in D:
        im=W(n)
        if n.startswith('fx-ink'):im=drybrush(recolor(im,(48,48,54)),5 if n.endswith('1') else 9)
        elif n.startswith('fx-hair-xo'):im=thicken(recolor(im,(40,30,26)),7)
        elif n.startswith('fx-stain-moc'):im=thicken(recolor(im,(105,65,35)),9)
        elif n.startswith('fx-pox-daumua'):im=soften_pox(im)
        D[n]=im
    return D[n]
# effect functions: (img, g, level) -> img
def e_ink(im,g,l):
    c=faceclip(im,g,1.15);fw=g['fw'];fh=g['fh']
    if l>=1:im=place(im,dec('fx-ink-1'),g['cx']+.36*fw,g['cy']+.08*fh,[0,.42,.55,.68][l]*fw,-58,[0,.6,.75,.85][l],clip=c)
    if l>=3:im=place(im,dec('fx-ink-2'),g['cx']+.4*fw,g['cy']+.3*fh,.3*fw,-70,.6,clip=c)
    return im
def patch(dec_im,rx,ry,r):
    w,h=dec_im.size;px=int(rx*w);py=int(ry*h);R=int(r*w)
    c=dec_im.crop((px-R,py-R,px+R,py+R));m=Image.new('L',c.size,0);ImageDraw.Draw(m).ellipse([2,2,c.size[0]-3,c.size[1]-3],fill=255)
    m=m.filter(ImageFilter.GaussianBlur(R*.18));a=ImageChops.multiply(c.split()[3],m);c.putalpha(a);return c
def e_pox(name):
    def f(im,g,l):
        c=faceclip(im,g,1.0);fw=g['fw'];fh=g['fh'];rnd=random.Random(11)
        n=[0,8,16,28][l];v=dec(name+'-1')
        op=1.0 if 'daumua' in name else 1.0
        for i in range(n):
            while True:
                dx=rnd.uniform(-.48,.48);dy=rnd.uniform(-.38,.36)
                if (dx/.5)**2+(dy/.5)**2<1 and not (abs(dx)<.28 and .2<dy<.36):break  # keep the mouth clear
            p=patch(v,.3+.4*rnd.random(),.3+.4*rnd.random(),.045)
            im=place(im,p,g['cx']+dx*fw,g['cy']+dy*fh,.085*fw,rnd.randint(0,359),op,clip=c)
        return im
    return f
def e_muoi(im,g,l):
    c=faceclip(im,g,1.1)
    P=[(.2,.12,.42,'fx-muoi-1',10)]
    if l>=2:P.append((-.22,-.25,.4,'fx-muoi-2',-15))
    if l>=3:P+= [(0,.3,.5,'fx-muoi-1',-30),(-.2,.1,.4,'fx-muoi-2',25)]
    for dx,dy,w,n,r in P:
        im=place(im,dec(n),g['cx']+dx*g['fw'],g['cy']+dy*g['fh'],w*g['fw']*(1 if l<3 else 1.15),r,[0,.85,.95,1][l],clip=c)
    return im
def e_bui(im,g,l):
    c=faceclip(im,g,1.0)
    for i in range(l):
        im=place(im,dec('fx-bui-1'),g['cx']+(i-1)*.05*g['fw'],g['cy']+.04*g['fh'],g['fw']*(.95+.1*i),i*60,[0,.9,1,1][l],clip=c)
    return im
def e_hair(im,g,l):
    P=[(.62,'fx-hair-xo-1',-5),(-.6,'fx-hair-xo-2',5),(.0,'fx-hair-xo-3',0)][:l]
    for dx,n,r in P:
        d=dec(n);ww=1.05*g['fw'];hh=d.size[1]*ww/d.size[0]
        im=place(im,d,g['cx']+dx*g['fw'],g['cy']-.5*g['fh']+hh*.5,ww,r,1.0)
    return im
def e_vuong(name):
    def f(im,g,l):
        P=[(.1,.0,0),(-.38,.12,1),(.36,.1,1)][:l]
        for i,(dx,dy,_) in enumerate(P):
            im=place(im,dec(name),g['cx']+dx*g['fw'],g['ht']+(.25+dy)*g['fh'],.3*g['fw'],[-20,30,-60][i],1)
        if l>=3:im=place(im,dec(name),g['cx']-.9*g['fw'],g['cy']+1.15*g['fh'],.3*g['fw'],10,1)  # on shoulder cloth
        return im
    return f
def e_moc(im,g,l):
    H=im.size[1];cl=alpha_clip(im)
    P=[(190,.60,.2,'fx-stain-moc-1',-80)]
    if l>=2:P.append((120,.50,.17,'fx-stain-moc-2',70))
    if l>=3:P.append((100,.78,.2,'fx-stain-moc-1',-100))
    for x,yf,wf,n,r in P:
        im=place(im,dec(n),x,H*yf,wf*im.size[0]*[0,1.2,1.5,1.7][l],r,[0,.95,1,1][l],mode='normal',clip=cl)
    return im
EFFECTS={'ink':e_ink,'pox-daumua':e_pox('fx-pox-daumua'),'pox-scar':e_pox('fx-pox-scar'),'muoi':e_muoi,'bui':e_bui,'hair-xo':e_hair,
 'vuong-hoadao':e_vuong('fx-vuong-hoadao-1'),'vuong-la':e_vuong('fx-vuong-la-1'),'vuong-tuyet':e_vuong('fx-vuong-tuyet-1'),'moc':e_moc}
def panel(name,out,levels=(0,1,2,3),crop=True,ccrop=None):
    fn=EFFECTS[name];cols=[];
    for k in ('c01','c30'):
        g=FIG[k];base=W(g['f'])
        for l in levels:
            im=fn(base.copy(),g,l) if l else base.copy();cols.append((k,l,im,g))
    S=0.78;fw,fh=int(299*S),int(900*S);n=len(cols);Wd=n*fw+ (n+1)*8
    cw=fw;ch=int(cw*.95)
    H=fh+ (ch+24 if crop else 0)+40
    can=Image.new('RGB',(Wd,H),BG);dr=ImageDraw.Draw(can)
    lab=['plain','nhe','vua','nang']
    for i,(k,l,im,g) in enumerate(cols):
        x=8+i*(fw+8);bg=Image.new('RGBA',im.size,BG+(255,));bg.alpha_composite(im)
        can.paste(bg.convert('RGB').resize((fw,fh),Image.LANCZOS),(x,34))
        dr.text((x+4,8),f"{k} {lab[l]}",fill=(40,40,40))
        if crop:
            sz=int(g['fw']*1.9);x0=int(g['cx']-sz/2);y0=int(max(0,g['cy']-sz*.55))
            if ccrop:x0,y0,sz=ccrop
            cr=bg.convert('RGB').crop((x0,y0,x0+sz,int(y0+sz*.95))).resize((cw,ch),Image.LANCZOS)
            can.paste(cr,(x,34+fh+8))
    can.save(out);return out
if __name__=='__main__':
    for n in sys.argv[1:]:print(panel(n,f'panel-{n}.png',ccrop=(80,420,200) if n=='moc' else None))
