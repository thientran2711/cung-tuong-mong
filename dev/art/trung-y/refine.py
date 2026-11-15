# refine(rgb, cut) -> rgba : fix what isnet leaves semi-transparent on the trung y sheets (pale robes, sleeves, foreheads, hair).
# The sheets are painted on one plain parchment backdrop, so colour distance to it (Lab dE, backdrop = median of the sheet border)
# tells figure from backdrop where isnet hesitates:
#   * alpha raised to the colour key (dE 7..16 -> 0..255) inside the isnet region (holes filled + 3 px);
#   * flat backdrop-coloured pixels (dE<5, no texture) never raised, and cleared when isnet left them semi;
#   * the rest of the interior (> 3 px from the outside at 960 px) made opaque;
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
    bgish=(dE<5)&(sd<2.0)
    ca=np.clip((dE-t0)/(t1-t0),0,1)*255
    core=a>=lo; reg=ndi.binary_fill_holes(core)|ndi.binary_dilation(core,iterations=3)
    na=np.where(reg,np.maximum(a,ca),a)
    na=np.where(bgish&(na<235),0,na)
    m=na>=lo; d=ndi.distance_transform_edt(m); na=np.where((d>3*h/960)&~bgish,255,na)
    up=na>a+2; A[...,:3][up]=R[up].astype(np.uint8)
    A[...,3]=na.astype(np.uint8); return Image.fromarray(A)
