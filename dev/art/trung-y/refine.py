# refine(rgb, cut) -> rgba : fix what isnet leaves semi-transparent on the trung y sheets (pale robes, sleeves, foreheads, hair).
# The sheets are painted on one plain parchment backdrop, so colour distance to it (Lab dE, backdrop = median of the sheet border)
# tells figure from backdrop where isnet hesitates:
#   * backdrop = dE<3 and flat, blobs >= 40 px: cleared even where isnet kept it (gaps, smudges); pale skin (dE 4-6) is not touched;
#   * exterior = isnet background connected to the sheet border + backdrop;
#   * > 2.5 px from the exterior: alpha raised to the colour key (dE 7..16 -> 0..255) and, > 3 px inside, made opaque;
#     the outer rim keeps isnet's soft edge (no parchment halo);
#   * wherever alpha went up, RGB = the painting's own colour (rembg darkens RGB where its mask is semi).
import numpy as np; from PIL import Image; from scipy import ndimage as ndi
def lab(x):
    x=x/255.; x=np.where(x>0.04045,((x+0.055)/1.055)**2.4,x/12.92)
    M=np.array([[0.4124,0.3576,0.1805],[0.2126,0.7152,0.0722],[0.0193,0.1192,0.9505]]); X=x@M.T/np.array([0.9505,1,1.089])
    f=np.where(X>0.008856,np.cbrt(X),7.787*X+16/116); return np.stack([116*f[...,1]-16,500*(f[...,0]-f[...,1]),200*(f[...,1]-f[...,2])],-1)
def refine(rgb, cut, t0=7., t1=16., lo=48):
    R=np.asarray(rgb.convert('RGB')).astype(np.float32); A=np.array(cut); a=A[...,3].astype(np.float32)
    h,w=a.shape; b=np.concatenate([R[:8].reshape(-1,3),R[-8:].reshape(-1,3),R[:,:8].reshape(-1,3),R[:,-8:].reshape(-1,3)])
    bg=lab(np.median(b,0)[None,None])[0,0]
    dE=ndi.median_filter(np.sqrt(((lab(R)-bg)**2).sum(-1)),3)
    Y=R.mean(-1); mu=ndi.uniform_filter(Y,7); sd=np.sqrt(np.maximum(ndi.uniform_filter(Y*Y,7)-mu*mu,0))
    # backdrop: dE<3 and flat (paper dE 0-2.5; pale skin highlights 4-6, ivory robes 3-7 but textured), blobs >= 40 px (at 960)
    bgish=ndi.binary_opening((dE<3)&(sd<2.5),iterations=1)
    lb,n=ndi.label(bgish); sz=ndi.sum(bgish,lb,range(1,n+1)); bgish=np.isin(lb,1+np.nonzero(sz>=40*(h/960)**2)[0])
    lab_,_=ndi.label(a<lo); edge=np.unique(np.concatenate([lab_[0],lab_[-1],lab_[:,0],lab_[:,-1]])); edge=edge[edge>0]
    out0=np.isin(lab_,edge)
    lb2,_=ndi.label(out0|bgish); e2=np.unique(lb2[out0]); bgx=bgish&np.isin(lb2,e2[e2>0])   # backdrop reaching the outside
    bgish=bgish&(bgx|(a<120))   # enclosed: only where isnet also says background (real gaps a~0-30; flat ivory robe panels a~210 stay, m18 ty1)
    ext=out0|bgish
    dext=ndi.distance_transform_edt(~ext); deep=dext>2.5*h/960      # keep isnet's own soft rim (no parchment halo)
    ca=np.clip((dE-t0)/(t1-t0),0,1)*255
    na=np.where(deep,np.maximum(a,ca),a)
    na=np.where(bgish,np.minimum(na,a*0.0),na)                        # backdrop isnet kept (gaps between sleeve and skirt, smudges)
    m=na>=lo; d=ndi.distance_transform_edt(m); na=np.where((d>3*h/960)&deep,255,na)
    up=na>a+2; A[...,:3][up]=R[up].astype(np.uint8)
    A[...,3]=na.astype(np.uint8); return Image.fromarray(A)
