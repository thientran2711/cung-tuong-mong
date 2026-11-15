# grade.py IN OUT [k chroma] : soften an over-saturated orange night scene (composition untouched)
import sys,numpy as np,cv2
def grade(im,k=0.78,blue=18,hl=0.72,paint=0.35):
    f=im.astype(np.float32)/255
    lab=cv2.cvtColor(f,cv2.COLOR_BGR2LAB)  # L 0..100, a,b ~ -127..127
    L,a,b=cv2.split(lab)
    # highlight / glow compression
    t=62; L=np.where(L>t,t+(L-t)*hl,L)
    # less chroma, more in very saturated warm areas
    C=np.sqrt(a*a+b*b); kk=k*(1-0.25*np.clip((C-45)/40,0,1))
    a*=kk; b*=kk
    # deeper blue night in shadows / mid tones, lamplight keeps a little warmth
    w=np.clip(1-L/70,0,1)
    b-=blue*w; a-=4*w
    L=L*1.0
    out=cv2.cvtColor(cv2.merge([L,a,b]),cv2.COLOR_LAB2BGR)
    out=np.clip(out*255,0,255).astype(np.uint8)
    if paint>0:
        p=cv2.edgePreservingFilter(out,flags=cv2.RECURS_FILTER,sigma_s=30,sigma_r=0.25)
        out=cv2.addWeighted(out,1-paint,p,paint,0)
    return out
if __name__=="__main__":
    im=cv2.imread(sys.argv[1]); k=float(sys.argv[3]) if len(sys.argv)>3 else 0.78
    cv2.imwrite(sys.argv[2],grade(im,k))
