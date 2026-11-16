import numpy as np
W=np.array([0.95047,1.0,1.08883])
def rgb2lab(rgb01):
    c=np.asarray(rgb01,float);c=np.where(c<=0.04045,c/12.92,((c+0.055)/1.055)**2.4)
    M=np.array([[0.4124,0.3576,0.1805],[0.2126,0.7152,0.0722],[0.0193,0.1192,0.9505]])
    xyz=c@M.T/W;f=np.where(xyz>0.008856,np.cbrt(xyz),7.787*xyz+16/116)
    return np.stack([116*f[...,1]-16,500*(f[...,0]-f[...,1]),200*(f[...,1]-f[...,2])],-1)
def lab2rgb01(lab):
    lab=np.asarray(lab,float);L,a,b=lab[...,0],lab[...,1],lab[...,2];fy=(L+16)/116;fx=fy+a/500;fz=fy-b/200
    f=np.stack([fx,fy,fz],-1);xyz=np.where(f**3>0.008856,f**3,(f-16/116)/7.787)*W
    Mi=np.array([[3.2406,-1.5372,-0.4986],[-0.9689,1.8758,0.0415],[0.0557,-0.2040,1.0570]])
    c=xyz@Mi.T;c=np.where(c<=0.0031308,12.92*c,1.055*np.clip(c,0,None)**(1/2.4)-0.055)
    return np.clip(c,0,1)
