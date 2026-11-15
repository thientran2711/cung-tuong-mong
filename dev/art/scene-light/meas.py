import sys,glob,numpy as np,cv2
def meas(im):
    im=cv2.resize(im,(480,int(480*im.shape[0]/im.shape[1])),interpolation=cv2.INTER_AREA)
    hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV)
    lab=cv2.cvtColor(im.astype(np.float32)/255,cv2.COLOR_BGR2LAB)
    L,a,b=cv2.split(lab);C=np.sqrt(a*a+b*b)
    return dict(S=float(hsv[...,1].mean()),C=float(C.mean()),L=float(L.mean()),Ls=float(L.std()),a=float(a.mean()),b=float(b.mean()))
def fmt(d):return "S%5.1f C%5.1f L%5.1f Ls%5.1f a%+5.1f b%+5.1f"%(d['S'],d['C'],d['L'],d['Ls'],d['a'],d['b'])
if __name__=="__main__":
    W="/home/user/cung-tuong-mong/.claude/worktrees/agent-a4e8c6432e582a50a/img/"
    for n in sys.argv[1:]:
        for s in "xuan ha thu dong".split():
            for b in "sang trua chieu toi".split():
                p=W+f"{n}-{s}-{b}.webp";im=cv2.imread(p)
                if im is None: print(p,"MISSING");continue
                print("%-28s"%f"{n}-{s}-{b}",fmt(meas(im)),im.shape[1],im.shape[0])
