import sys,json,io,urllib.request,os
sys.path.insert(0,'/home/user/wt/fxfit/tmpfit')
from det import *
B='https://ctm-img.victoria-tntt.workers.dev/img/'
CAL={'por':(-0.031,.465,.892,1.113),'fig':(0.043,.456,.832,1.102)}
def rows(f,fb):
    cxo,bn,wr,bt=CAL[f[:3]];fx,fy,fw,fh=[x*100 for x in fb]
    cx=fx+fw/2+cxo*fw;w=wr*fw;by=fy+bn*fh;h=(fy+bt*fh-by)/.835;t=by-.165*h;l=cx-w/2
    v=[round(l,1),round(t,1),round(w,1),round(h,1),0.0]
    s=[round(l-.003*w,1),round(t-.014*h,1),round(.714*w,1),round(.817*h,1),0.0]
    return v,s
def get(n):
    for i in range(3):
        try:return urllib.request.urlopen(urllib.request.Request(B+n,headers={'User-Agent':'curl/8'}),timeout=40).read()
        except Exception as e:err=e
    raise err
if __name__=="__main__":
    k,n,out=int(sys.argv[1]),int(sys.argv[2]),sys.argv[3]
    T=open('targets.txt').read().split()[k::n]
    done=set()
    if os.path.exists(out):done={json.loads(l)['f'] for l in open(out)}
    with open(out,'a') as o:
        for f in T:
            if f in done:continue
            try:
                im=load(io.BytesIO(get(f)));fb=detect(im,f.startswith('fig-'))
                r={'f':f,'det':fb}
                if fb:r['v'],r['s']=rows(f,fb)
            except Exception as e:r={'f':f,'err':str(e)[:80]}
            o.write(json.dumps(r)+'\n');o.flush()
