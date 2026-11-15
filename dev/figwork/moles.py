# moles.py detect out.jpg figs... | fix fig.webp px,py[,r] ... : find small dark spots on face skin (por-space), map to fig, inpaint
import sys,os,json,io,numpy as np,cv2
sys.path.insert(0,'/home/user/cung-tuong-mong/.claude/worktrees/agent-a4a32ff575576735e/dev/figwork')
import porcrop
from PIL import Image,ImageDraw
def geom(im):
    cx,ey,fw,how=porcrop.find_face(im); H=im.height
    fw=float(np.clip(fw,H*0.045,H*0.20)); Wc=fw/0.36; Hc=Wc*506/384
    return cx-Wc/2, ey-0.4*Hc, Wc/384.0
def detect(f,th=22):
    im=Image.open(f).convert('RGBA'); g=geom(im)
    por=porcrop.crop(im,porcrop.find_face(im)); A=np.asarray(por).astype(int)
    bg=np.full(A.shape[:2]+(3,),235); al=A[...,3:]/255; rgb=(A[...,:3]*al+bg*(1-al)).astype(np.uint8)
    L=cv2.cvtColor(rgb,cv2.COLOR_RGB2GRAY).astype(int); med=cv2.medianBlur(L.astype(np.uint8),15).astype(int)
    cand=((med-L)>th)&(A[...,3]>200)
    R,G,B=rgb[...,0].astype(int),rgb[...,1].astype(int),rgb[...,2].astype(int)
    out=[]
    n,lab,st,cen=cv2.connectedComponentsWithStats(cand.astype(np.uint8),8)
    for i in range(1,n):
        x,y,w,h,ar=st[i]
        if ar<3 or ar>60 or max(w,h)>10: continue
        cx,cy=cen[i]
        if not (95<cx<290 and 150<cy<350): continue
        r=7; ya,yb,xa,xb=int(max(0,cy-r-4)),int(cy+r+4),int(max(0,cx-r-4)),int(cx+r+4)
        ring=np.ones((yb-ya,xb-xa),bool); ring[4:-4,4:-4]=False
        rr,gg,bb=R[ya:yb,xa:xb][ring],G[ya:yb,xa:xb][ring],B[ya:yb,xa:xb][ring]
        if ((rr>180)&(gg>140)&(bb>120)&(rr>bb+15)).mean()<0.9: continue
        out.append((float(cx),float(cy),int(ar)))
    return out,g
def tile(f,sp):
    im=Image.open(f).convert('RGBA'); por=porcrop.crop(im,porcrop.find_face(im))
    bgi=Image.new('RGBA',por.size,(235,225,205,255)); bgi.alpha_composite(por); bgi=bgi.convert('RGB')
    d=ImageDraw.Draw(bgi)
    for j,(x,y,a) in enumerate(sp): d.ellipse((x-9,y-9,x+9,y+9),outline=(0,160,255),width=2); d.text((x+10,y-6),str(j),fill=(0,0,255))
    d.text((64,64),os.path.basename(f)[12:-5],fill=(0,0,0))
    return bgi.crop((60,60,324,380))
if __name__=='__main__':
    mode=sys.argv[1]
    if mode=='detect':
        outp=sys.argv[2]; res={}; tiles=[]
        for f in sys.argv[3:]:
            sp,g=detect(f); res[f]={'spots':sp,'g':g}; tiles.append(tile(f,sp))
        cols=min(len(tiles),6); rows=(len(tiles)+cols-1)//cols
        sh=Image.new('RGB',(cols*264,rows*320),'white')
        for i,t in enumerate(tiles): sh.paste(t,((i%cols)*264,(i//cols)*320))
        sh.save(outp,quality=90); json.dump(res,open(outp+'.json','w'))
        for f in res: print(os.path.basename(f), [(round(x),round(y)) for x,y,a in res[f]['spots']])
    elif mode=='fix':
        f=sys.argv[2]; im=Image.open(f).convert('RGBA'); x0,y0,k=geom(im)
        A=np.asarray(im).copy(); rgb=np.ascontiguousarray(A[...,:3][...,::-1]); m=np.zeros(rgb.shape[:2],np.uint8)
        for s in sys.argv[3:]:
            p=[float(v) for v in s.split(',')]; r=p[2] if len(p)>2 else 7
            fx,fy=x0+p[0]*k,y0+p[1]*k; cv2.circle(m,(int(round(fx)),int(round(fy))),max(1,int(round(r*k))),255,-1)
        o=cv2.inpaint(rgb,m,3,cv2.INPAINT_TELEA); A[...,:3]=o[...,::-1]
        im2=Image.fromarray(A,'RGBA')
        for q in (90,86,80,74):
            b=io.BytesIO(); im2.save(b,'WEBP',quality=q,method=4)
            if b.tell()<=250*1024: break
        open(f,'wb').write(b.getvalue()); print('fixed',f,q)
