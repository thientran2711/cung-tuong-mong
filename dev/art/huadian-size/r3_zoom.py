import sys,os,json
from PIL import Image,ImageDraw
S=os.path.dirname(os.path.abspath(__file__)); L=json.load(open(S+'/L.json'))
out=sys.argv[1]; names=sys.argv[2:]
def geo(st,a):
    for t in ['t1','t3','t5','t2','t4','t6','t7','t8']:
        x=L.get(f'por-{st}-{t}-a{a}')
        if x and 'cx' in x: return x
    for a2 in (18,26,36,51):
        for t in ['t1','t3','t5']:
            x=L.get(f'por-{st}-{t}-a{a2}')
            if x and 'cx' in x: return x
    return {}
T=300; cols=4; rows=(len(names)+cols-1)//cols
sh=Image.new('RGB',(cols*T,rows*T),(255,255,255)); d=ImageDraw.Draw(sh)
for i,n in enumerate(names):
    st,t,a=n.rsplit('-',2); a=int(a[1:]); st=st.replace('por-','',1)
    x=geo(st,a); c,e,f=x.get('cx',193),x.get('ey',203),x.get('fw',133)
    im=Image.open(f'{S}/por/por-{st}-{t}-a{a}.webp').convert('RGBA'); b=Image.new('RGBA',im.size,(236,231,224,255)); b.alpha_composite(im); im=b.convert('RGB')
    cy=e-0.25*f; h=0.30*f
    tl=im.crop((int(c-h),int(cy-h),int(c+h),int(cy+h))).resize((T,T),Image.LANCZOS)
    sh.paste(tl,((i%cols)*T,(i//cols)*T)); d.text(((i%cols)*T+3,(i//cols)*T+3),n.replace('consort-','').replace('maid-','')+f' fw={f:.0f}',fill=(0,0,255))
sh.save(out)
