#!/usr/bin/env python3
"""body_fit.py - measure img/body-fit.json rows (KIT_BODY, KIT 28.8e, jbody.js) from the EXISTING figure pictures. No picture is drawn.
  python3 dev/measure/body_fit.py [--kinds consort,maid,mama,thaihau] [--out img/body-fit.json] [--workers 16] [--only substr]
Pictures are streamed from the CDN (never kept). For every figure: (1) re-runs jbody.js KIT_BODY.calc in Python from the alpha bbox / torso core column
(kitFigBody, jkit.js) + img/fig-ht.json + img/veil-fit.json -> the zone rows the game measures itself; (2) finds the SASH line (landmark) from the colour
profile of the two side strips of the torso (the centre is skipped: hands / fans / scrolls) = strongest row-to-row colour edge between .25 and .45 of the body
(pair of edges = band centre); an estimate outside SASH_MIN..SASH_MAX of the body (.27-.37), or a weak edge (< PEAK_MIN), falls back to SASH_PRIOR (no landmark, flagged 'def');
(3) writes a full WAIST row only (partial row overrides only that zone) centred on the sash, same x / height as the measure.
Row format: {"<file>": {"waist": [left%, top%, width%, height%, rotateDeg]}}  (BODYFIT_NOTES, review/art-prompts-j).
"""
import sys,os,io,json,argparse,urllib.request
from concurrent.futures import ThreadPoolExecutor
import re
import numpy as np
from PIL import Image
B='https://ctm-img.victoria-tntt.workers.dev/'
BAL=dict(chin=.135,headW=.4,hairUp=.035,hairW=1.45,chestW=2.6,waistW=2,chestH=.17,waistY=.34,waistH=.08,sleeveY=.04,sleeveB=.6,sleeveMin=.06,skirtY=.42,skirtB=.06,hemH=.1)
FACE=dict(chinK=.86,eyeUp=.12,headK=1.5);B0=.165
def body(path,ht4000):
    im=Image.open(path).convert('RGBA');nw,nh=im.size;h=min(500,nh);w=max(1,round(nw*h/nh))
    im=im.resize((w,h),Image.BILINEAR);d=np.array(im);a=d[:,:,3]>40
    ys=np.where(a.any(1))[0];xs=np.where(a.any(0))[0]
    if len(ys)==0:return None
    t,b,l,r=ys[0],ys[-1],xs[0],xs[-1]
    ht=t
    if ht4000 is not None: ht=max(t,min(b-round((b-t)*.2),round(ht4000/4000*h)))
    bh=b-ht;c0=round((l+r)/2)
    def run(y):
        row=a[y];c=c0
        if not row[c]:
            f=-1;k=1
            while k<w/5 and f<0:
                if c-k>=0 and row[c-k]:f=c-k
                elif c+k<w and row[c+k]:f=c+k
                k+=1
            if f<0:return None
            c=f
        A=c
        while A>0 and row[A-1]:A-=1
        Z=c
        while Z<w-1 and row[Z+1]:Z+=1
        return A,Z+1
    ws=None;mn=(r-l)*.4;f=.35
    while f<=.8:
        R=run(round(ht+bh*f))
        if R and R[1]-R[0]>=mn and (ws is None or R[1]-R[0]<ws[1]-ws[0]):ws=R
        f+=.02
    cl,cr=l,r+1
    if ws:
        cc=(ws[0]+ws[1])/2;hw=(ws[1]-ws[0])*.6;cl=max(l,cc-hw);cr=min(r+1,cc+hw)
    # width profile
    wl=[];wr=[];ml=w;mr=-1;y=t
    for k in range(21):
        ye=t+round((b-t)*k/20)
        while y<=ye:
            nz=np.where(a[y])[0]
            if len(nz):ml=min(ml,nz[0]);mr=max(mr,nz[-1])
            y+=1
        wl.append((l if mr<0 else ml)/w);wr.append(((r+1) if mr<0 else mr+1)/w)
    y0=round(ht);y1=min(h-1,round(ht+bh*.12));hl=w;hr=-1
    for y in range(y0,y1+1):
        nz=np.where(a[y])[0]
        if len(nz):hl=min(hl,nz[0]);hr=max(hr,nz[-1])
    hx=(hl+hr+1)/2/w if hr>hl else None
    return dict(t=t/h,b=(b+1)/h,l=l/w,r=(r+1)/w,ht=ht/h,hx=hx,ar=nw/nh,cl=cl/w,cr=cr/w,wl=wl,wr=wr,a=a,h=h,w=w,d=d)
def calc(file,v,f):
    q=lambda x:round(x*100,2);box=lambda l,t,r,b:[q(l),q(t),q(max(0,r-l)),q(max(0,b-t)),0];cl=lambda x,a,z:max(a,min(z,x))
    G=BAL;fx=None
    if f:
        t=f[1]/100;h=f[3]/100;band=t+B0*h
        fx=dict(cx=(f[0]+f[2]/2)/100,eye=band-FACE['eyeUp']*h,chin=t+FACE['chinK']*h,hw=f[2]/200,rot=f[4] if len(f)>4 else 0,h=h)
        fx['top']=fx['eye']-FACE['headK']*(fx['chin']-fx['eye'])
    R={}
    top=v['ht'] if v['ht']>v['t'] else v['t'];H=v['b']-top
    ccl,ccr=v['cl'],v['cr'];hx=fx['cx'] if fx else (v['hx'] if v['hx'] is not None else (ccl+ccr)/2)
    chin=max(fx['chin'],top+.06*H) if fx else top+G['chin']*H
    hhw=fx['hw']*1.15 if fx else G['headW']*(chin-top)/(v['ar'] or .4)
    headT=max(v['t'],min(top,fx['top'])) if fx else top
    fhw=fx['hw'] if fx else hhw/1.15
    R['hair']=box(hx-fhw*G['hairW'],max(v['t'],headT-G['hairUp']*H),hx+fhw*G['hairW'],fx['eye'] if fx else headT+(chin-headT)*.45)
    R['head']=box(hx-hhw,headT,hx+hhw,chin)
    xs=lambda k:(max(ccl,hx-hhw*k),min(ccr,hx+hhw*k));cx=xs(G['chestW']);wx=xs(G['waistW'])
    R['chest']=box(cx[0],chin,cx[1],chin+G['chestH']*H)
    R['waist']=box(wx[0],top+(G['waistY']-G['waistH']/2)*H,wx[1],top+(G['waistY']+G['waistH']/2)*H)
    sy=chin+G['sleeveY']*H;sb=top+G['sleeveB']*H;mw=G['sleeveMin']
    R['sleeveL']=box(v['l'],sy,min(v['r'],max(cx[0],v['l']+mw)),sb);R['sleeveR']=box(max(v['l'],min(cx[1],v['r']-mw)),sy,v['r'],sb)
    R['skirt']=box(ccl,top+G['skirtY']*H,ccr,v['b']-G['skirtB']*H)
    wl=v['wl'][-1];wr=v['wr'][-1];R['hem']=box(min(wl,ccl),v['b']-G['hemH']*H,max(wr,ccr),v['b'])
    if fx:
        for z in('head','hair'):R[z][4]=fx['rot']
    for z in R:
        r=R[z];r[0]=cl(r[0],0,100);r[1]=cl(r[1],0,100);r[2]=min(r[2],100-r[0]);r[3]=min(r[3],100-r[1])
    return R

LO,HI=.25,.45
def side_prof(v):
    d=v['d'][:,:,:3].astype(float);a=v['a'];h=v['h'];w=v['w'];top=v['ht']*h;bh=v['b']*h-top
    cl=v['cl']*w;cr=v['cr']*w;hx=(v['hx'] if v['hx'] else (v['cl']+v['cr'])/2)*w
    hw=(cr-cl)/2*.55  # half-width of inspected region
    ys=np.arange(int(top+bh*LO),int(top+bh*HI))
    out=[]
    for (xa,xb) in[(hx-hw,hx-hw*.35),(hx+hw*.35,hx+hw)]:
        xa=int(max(0,xa));xb=int(min(w,xb));M=[]
        for y in ys:
            m=a[y,xa:xb]
            M.append(d[y,xa:xb][m].mean(0) if m.sum()>3 else np.full(3,np.nan))
        M=np.array(M)
        for i in range(3):
            s=M[:,i];n=np.isnan(s)
            if n.all():return None
            s[n]=np.interp(np.where(n)[0],np.where(~n)[0],s[~n]);M[:,i]=s
        out.append(M)
    return ys,out,top,bh
def waist_est(v):
    r=side_prof(v)
    if r is None:return None
    ys,(L,R),top,bh=r
    sm=lambda M:np.stack([np.convolve(M[:,i],np.ones(3)/3,'same') for i in range(3)],1)
    g=[np.abs(np.diff(sm(M),axis=0)).sum(1) for M in(L,R)];g=g[0]+g[1];g[:3]=0;g[-3:]=0
    # sash = band between two strong edges: score = edge strength; centre of the top-2 peaks if close, else the peak
    p=np.argsort(-g)
    i=p[0];c=ys[i]
    # find second peak at least 4px and at most 30px away
    for j in p[1:]:
        if 4<=abs(ys[j]-ys[i])<=int(.05*bh) and g[j]>.5*g[i]:c=(ys[i]+ys[j])/2;break
    return c,g[i],(c/v['h']-v['ht'])/(v['b']-v['ht'])

SASH_PRIOR=.315;SASH_MIN=.27;SASH_MAX=.37;PEAK_MIN=20
def fetch(u):
    for i in range(4):
        try:return urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'ctm-bodyfit'}),timeout=60).read()
        except Exception as e:err=e
    raise err
def one(f,HT,VF,G=BAL):
    v=body(io.BytesIO(fetch(B+'img/'+f)),HT.get(f))
    if v is None:return None
    R=calc(f,v,VF.get(f));e=waist_est(v);why='ok'
    if e is None:frac=SASH_PRIOR;why='def'
    else:
        frac=e[2]
        if not(SASH_MIN<=frac<=SASH_MAX) or e[1]<PEAK_MIN:frac=SASH_PRIOR;why='def'
    top=v['ht'] if v['ht']>v['t'] else v['t'];H=v['b']-top
    w=R['waist'];hh=G['waistH']*H*100;t=round(max(0,(top+frac*H)*100-hh/2),2)
    w[1]=t;w[3]=round(min(hh,100-t),2)
    return {'waist':w},why,round(frac,3)
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--kinds',default='consort,maid,mama,thaihau');ap.add_argument('--out',default='img/body-fit.json')
    ap.add_argument('--workers',type=int,default=16);ap.add_argument('--only',default='');ap.add_argument('--report',default='')
    a=ap.parse_args();kinds=a.kinds.split(',')
    idx=json.loads(fetch(B+'img/_index.json'));L=idx['files'] if isinstance(idx,dict) else idx
    files=sorted(x[0].split('img/')[-1] for x in L if re.match(r'img/fig-(%s)-[^/]*\.webp$'%'|'.join(kinds),x[0]) and a.only in x[0])
    HT=json.loads(fetch(B+'img/fig-ht.json'));VF=json.loads(fetch(B+'img/veil-fit.json'))
    out={};rep={};bad=[]
    def job(f):
        try:return f,one(f,HT,VF)
        except Exception as e:return f,('ERR '+str(e)[:80])
    with ThreadPoolExecutor(a.workers) as ex:
        for n,(f,r) in enumerate(ex.map(job,files)):
            if isinstance(r,tuple):out[f]=r[0];rep[f]=[r[1],r[2]]
            else:bad.append([f,str(r)])
            if n%500==0:print(n,len(files),flush=True)
    json.dump(out,open(a.out,'w'),separators=(',',':'),sort_keys=True)
    if a.report:json.dump({'rows':rep,'skipped':bad},open(a.report,'w'),separators=(',',':'))
    d=sum(1 for v in rep.values() if v[0]=='def');print('rows',len(out),'default-fallback',d,'skipped',len(bad))
if __name__=='__main__':main()
