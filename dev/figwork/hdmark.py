# hdmark.py: find the forehead mark of a consort figure (por space) -> mask, centre
#   python3 -I hdmark.py out.jpg fig.webp ...   (debug sheet: detected mask outlined in cyan)
import sys,numpy as np,cv2
sys.path.insert(0,'/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/fw11')
import porcrop
from PIL import Image
X0,X1,Y0,Y1=145,240,132,196
def por_rgb(im):
    face=porcrop.find_face(im); por=porcrop.crop(im,face)
    A=np.asarray(por).astype(np.float32); al=A[...,3:]/255
    return (A[...,:3]*al+np.array([235,225,205])*(1-al)), A[...,3], face
def find(im):
    rgb,a,face=por_rgb(im)
    lab=cv2.cvtColor(np.clip(rgb,0,255).astype(np.uint8),cv2.COLOR_RGB2LAB).astype(np.float32)
    ya,yb,xa,xb=146,194,174,210
    ref=lab[ya:yb,xa-6:xb+6]
    refm=np.median(ref,axis=1)[:,None,:]
    win=lab[ya:yb,xa:xb]; dE=np.sqrt(((win-refm)**2*np.array([0.5,1.6,1.6])).sum(-1))
    L=win[...,0]; dark=(L<110)&(np.abs(win[...,1]-128)+np.abs(win[...,2]-128)<22)   # hair, brows
    dC=np.sqrt(((win[...,1:]-refm[...,1:])**2).sum(-1)); dL=win[...,0]-refm[...,0]
    c=((dC>9)|(dL>16))&(~dark)&(a[ya:yb,xa:xb]>200)
    c=cv2.morphologyEx(c.astype(np.uint8),cv2.MORPH_CLOSE,np.ones((3,3),np.uint8))
    n,labs,st,cen=cv2.connectedComponentsWithStats(c,8)
    best=None
    for i in range(1,n):
        x,y,w,h,ar=st[i]
        if ar<5 or w>34 or h>40: continue
        cx,cy=cen[i]; d=abs(cx+xa-192)
        sc=dE[labs==i].sum()-20*d-6*abs(cy+ya-168)
        if best is None or sc>best[0]: best=(sc,i)
    if best is None: return {'mask':None,'face':face}
    i=best[1]; cx,cy=cen[i]; m=(labs==i)
    for j in range(1,n):
        if j!=i and st[j][4]>=2 and abs(cen[j][0]-cx)<9 and abs(cen[j][1]-cy)<11 and st[j][2]<14: m|=(labs==j)
    M=np.zeros(a.shape,bool); M[ya:yb,xa:xb]=m
    ys,xs=np.nonzero(M)
    return {'mask':M,'cx':float(xs.mean()),'cy':float(ys.mean()),'w':int(np.ptp(xs)+1),'h':int(np.ptp(ys)+1),'face':face,'rgb':rgb}
if __name__=='__main__':
    from PIL import ImageDraw
    out=sys.argv[1]; fs=sys.argv[2:]; tiles=[]
    for f in fs:
        im=Image.open(f).convert('RGBA'); res=find(im); rgb,a,_=por_rgb(im)
        t=Image.fromarray(rgb.astype(np.uint8)).crop((X0-10,Y0-10,X1+10,Y1+10)).resize((250,210))
        if res.get('mask') is not None:
            M=res['mask'][Y0-10:Y1+10,X0-10:X1+10]; ov=np.asarray(t).copy()
            Mr=cv2.resize(M.astype(np.uint8),(250,210),interpolation=cv2.INTER_NEAREST)>0
            edge=Mr^(cv2.erode(Mr.astype(np.uint8),np.ones((3,3),np.uint8))>0); ov[edge]=(0,200,255); t=Image.fromarray(ov)
        ImageDraw.Draw(t).text((3,3),f.split('consort-')[1][:10],fill=(0,0,255)); tiles.append(t)
    cols=8; rows=(len(tiles)+cols-1)//cols; S=Image.new('RGB',(cols*250,rows*210),'white')
    for k,t in enumerate(tiles): S.paste(t,((k%cols)*250,(k//cols)*210))
    S.save(out,quality=88); print(S.size)
