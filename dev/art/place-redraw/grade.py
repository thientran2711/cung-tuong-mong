"""place-redraw light-match grade (dev/handover/reports/place-redraw.md).
usage: python3 dev/art/place-redraw/grade.py raw.png out.webp   (raw = gpt-2-6 2688x1386 render; figures c06/c30/m19/m39 t1 a18 fetched from the CDN into FIGDIR)
"""
import sys,numpy as np
from PIL import Image,ImageDraw,ImageFont
import os,subprocess
D=os.environ.get('FIGDIR','/tmp/place-redraw-figs/')
os.makedirs(D,exist_ok=True)
MW,MH=2688,1386
M=np.array([[0.4124,0.3576,0.1805],[0.2126,0.7152,0.0722],[0.0193,0.1192,0.9505]]);WP=np.array([0.95047,1,1.08883])
def lin(c):return np.where(c>0.04045,((c+0.055)/1.055)**2.4,c/12.92)
def gam(c):return np.where(c>0.0031308,1.055*np.clip(c,0,None)**(1/2.4)-0.055,12.92*c)
def rgb2lab(rgb):
    xyz=lin(rgb)@M.T/WP;f=np.where(xyz>0.008856,np.cbrt(xyz),7.787*xyz+16/116)
    return np.stack([116*f[...,1]-16,500*(f[...,0]-f[...,1]),200*(f[...,1]-f[...,2])],-1)
def lab2rgb(lab):
    fy=(lab[...,0]+16)/116;fx=fy+lab[...,1]/500;fz=fy-lab[...,2]/200;f=np.stack([fx,fy,fz],-1)
    xyz=np.where(f>0.2069,f**3,(f-16/116)/7.787)*WP;return np.clip(gam(xyz@np.linalg.inv(M).T),0,1)
FIGS=['fig-consort-c06-t1-a18','fig-consort-c30-t1-a18','fig-maid-m19-t1-a18','fig-maid-m39-t1-a18']
def _get(f):
    p=D+f+'.webp'
    if not os.path.exists(p):subprocess.run(['curl','-sSf','--retry','3','-o',p,'https://ctm-img.victoria-tntt.workers.dev/img/'+f+'.webp'],check=True)
def figstats():
    [_get(f) for f in FIGS]
    Ls=[];As=[];Bs=[]
    for f in FIGS:
        a=np.asarray(Image.open(D+f+'.webp').convert('RGBA')).astype(float)/255;m=a[...,3]>0.8;lab=rgb2lab(a[...,:3])[m]
        Ls.append(lab[:,0].mean());As.append(lab[:,1].mean());Bs.append(lab[:,2].mean())
    return np.mean(Ls),np.mean(As),np.mean(Bs)
FL,FA,FB=figstats()
def grade(im):
    """light-match grade: bg mean L lifted toward (figures L - 7), contrast eased toward Lsd 13, a/b moved 50% toward the figures' mean"""
    a=np.asarray(im.convert('RGB')).astype(float)/255;lab=rgb2lab(a)
    L=lab[...,0];mu=L.mean();sd=L.std();tL=min(max(mu,FL-7),mu+5);k=min(1,13.5/sd)
    lab[...,0]=(L-mu)*k+tL
    for i,t in((1,FA),(2,FB)):lab[...,i]+=0.5*(t-lab[...,i].mean())
    return Image.fromarray((lab2rgb(lab)*255+.5).astype('uint8'))

if __name__=='__main__':
    print('figures mean L a b',round(FL,1),round(FA,1),round(FB,1))
    im=Image.open(sys.argv[1])
    if im.size!=(MW,MH):
        s=max(MW/im.width,MH/im.height);im=im.resize((round(im.width*s),round(im.height*s)),Image.LANCZOS);x=(im.width-MW)//2;y=im.height-MH;im=im.crop((x,y,x+MW,y+MH))
    grade(im).save(sys.argv[2],quality=88,method=6)
