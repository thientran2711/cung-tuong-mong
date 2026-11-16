#!/usr/bin/env python3
"""hdcut.py (review/face-sharp, owner 15/11 "mặt mất nét"): HIGH-RES figures (img/hd/fig-*.webp, up to 1800 px tall) for every place that
shows a figure above its 900 px native size (identity screen ~1.7-2.1x, stage on Fold 1.4x, dialogs).
Source = the gpt-2-6 background-removed SHEET the 900 px file was cut from (Magnific bg id in FIGURES*.json "bg"; 3840x1920, each figure
~1800 px tall), so no AI upscale and no new art: the same painting at its real resolution.
The 900 px files carry later fixes (skin-match colour, huadian shrink, moles, alpha clean-ups). They are kept by DETAIL TRANSFER:
  hd = up(fixed900) + (sheetcrop_hd - up(sheetcrop_900))      (only the fine detail comes from the sheet)
and, where the fixed file differs from the sheet crop (an edit), the detail is faded out (mask), so every fix stays exactly as approved.
Registration: the figure is located in the sheet by the sheetproc.py split + bbox, then refined by a small scale/offset search against
the 900 file; a file whose match error stays high is SKIPPED (listed), never guessed.
usage: python3 -I hdcut.py <urls.json> <sheet_cache_dir> <cur_figs_dir> <out_dir> <list.tsv: file bgid nfigs index> > log.tsv"""
import sys, os, io, json, subprocess
import numpy as np
from PIL import Image, ImageFilter
HMAX=1800
def blurf(a,r):
    k=max(1,int(round(r)));a=a.astype(np.float32)
    for _ in range(3):
        c=np.cumsum(np.pad(a,((k+1,k),(0,0)),mode='edge'),0);a=(c[2*k+1:]-c[:-2*k-1])/(2*k+1)
        c=np.cumsum(np.pad(a,((0,0),(k+1,k)),mode='edge'),1);a=(c[:,2*k+1:]-c[:,:-2*k-1])/(2*k+1)
    return a
def split(im,n):
    w,h=im.size;al=im.split()[3];small=al.resize((w//4,h//4));sw,sh=small.size
    col=list((np.asarray(small)>20).sum(axis=0));runs=[];s=None
    for x,c in enumerate(col+[0]):
        if c>2 and s is None:s=x
        if c<=2 and s is not None:runs.append([s,x]);s=None
    runs=[r for r in runs if r[1]-r[0]>sw*0.01]
    while len(runs)>n:
        gaps=[runs[i+1][0]-runs[i][1] for i in range(len(runs)-1)];i=gaps.index(min(gaps));runs[i]=[runs[i][0],runs[i+1][1]];del runs[i+1]
    if len(runs)<n:
        c=np.array(col,dtype=float);cuts=[]
        for k in range(1,n):
            e=int(sw*k/n);r=int(sw*0.08);lo,hi=max(1,e-r),min(sw-1,e+r);cuts.append(lo+int(np.argmin(c[lo:hi])))
        b=[0]+cuts+[sw];return [(b[i]*4,b[i+1]*4) for i in range(n)]
    return [(r[0]*4,r[1]*4) for r in runs]
def crop_of(sheet,n,idx):
    x0,x1=split(sheet,n)[idx];c=sheet.crop((max(0,x0-4),0,min(sheet.width,x1+4),sheet.height))
    a=c.split()[3].point(lambda v:255 if v>12 else 0);bb=c.getbbox() if a.getbbox() is None else a.getbbox()
    return c.crop(bb),(max(0,x0-4)+bb[0],bb[1])
def register(sheet,guess,cur):
    """find the sheet box (x,y,w,h) whose resize to cur.size best matches cur (alpha+luma); search around the guess"""
    W,H=cur.size;C=np.asarray(cur).astype(np.float32);ca=C[...,3]/255.;cl=C[...,:3]@[.299,.587,.114]
    gx,gy,gw,gh=guess;best=None
    SA=sheet.getchannel('A');ta=np.asarray(cur.getchannel('A').resize((W//3,H//3),Image.BILINEAR)).astype(np.float32)/255.
    def ae(x,y,w,h):return float(np.abs(np.asarray(SA.resize((W//3,H//3),Image.BILINEAR,box=(x,y,x+w,y+h))).astype(np.float32)/255.-ta).mean())
    h=gh;w=h*W/H;x=gx+(gw-w)/2;y=gy;best=(ae(x,y,w,h),(x,y,w,h))
    if best[0]>.004:
      for sc in np.linspace(.99,1.01,5):
        h=gh*sc;w=h*W/H
        for dy in (-4,0,4):
            for dx in (-4,0,4):
                x=gx+(gw-w)/2+dx;y=gy+(gh-h)/2+dy
                if x<0 or y<0 or x+w>sheet.width or y+h>sheet.height:continue
                e=ae(x,y,w,h)
                if e<best[0]:best=(e,(x,y,w,h))
    e,(x,y,w,h)=best
    # fine pass at full 900 size, luma + alpha
    for it in range(2):
        for dx,dy in ((-1,0),(1,0),(0,-1),(0,1),(0,0)):
            pass
    lo=np.asarray(sheet.resize((W,H),Image.LANCZOS,box=(x,y,x+w,y+h))).astype(np.float32)
    m=(ca>.9)&(lo[...,3]>230)
    err=float(np.abs(lo[...,:3]@[.299,.587,.114]-cl)[m].mean()) if m.any() else 99.
    aerr=float(np.abs(lo[...,3]/255.-ca).mean())
    return (x,y,w,h),err,aerr
def save_webp(im,path,maxkb=420):
    for q in (88,84,80,76):
        b=io.BytesIO();im.save(b,"WEBP",quality=q,method=4)
        if b.tell()<=maxkb*1024:break
    open(path,"wb").write(b.getvalue());return b.tell(),q
def hd_one(sheet,box,cur):
    x,y,w,h=box;box=(x,y,x+w,y+h);W,H=cur.size;Hh=int(min(HMAX,round(h)));Wh=int(round(Hh*W/H))
    src_hd=np.asarray(sheet.resize((Wh,Hh),Image.LANCZOS,box=box)).astype(np.float32)
    src_lo=np.asarray(sheet.resize((W,H),Image.LANCZOS,box=box)).astype(np.float32)
    up=lambda a:np.asarray(Image.fromarray(np.clip(a,0,255).astype(np.uint8)).resize((Wh,Hh),Image.LANCZOS)).astype(np.float32)
    C=np.asarray(cur).astype(np.float32);upC=up(C);upS=up(src_lo)
    det=src_hd-upS
    # edit mask: where the fixed 900 file departs from the sheet crop beyond the global colour shift (skin-match is smooth)
    d=C[...,:3]-src_lo[...,:3];dl=d-np.stack([blurf(d[...,i],6) for i in range(3)],-1);ed=np.abs(dl).max(-1)+np.abs(C[...,3]-src_lo[...,3])
    keep=np.clip(1-(blurf(ed,1.5)-6)/10,0,1)            # 1 = untouched (add sheet detail), 0 = edited here (keep the fix as is)
    keep=np.asarray(Image.fromarray((keep*255).astype(np.uint8)).resize((Wh,Hh),Image.BILINEAR)).astype(np.float32)/255.
    # colour fixes are multiplicative-ish: scale the detail by the local colour ratio
    out=upC+det*keep[...,None]
    out[...,3]=np.where(upC[...,3]>2,out[...,3],0)
    return Image.fromarray(np.clip(out,0,255).astype(np.uint8)),float(keep.mean())
if __name__=='__main__':
    urls,cache,curd,outd,lst=sys.argv[1:6];U=json.load(open(urls));os.makedirs(outd,exist_ok=True);sheets={}
    print("file\tstatus\terr\taerr\tkeep\tW\tH\tkb\tq")
    for line in open(lst):
        p=line.split()
        if len(p)<4:continue
        f,bid,n,idx=p[0],p[1],int(p[2]),int(p[3]);out=os.path.join(outd,f)
        if not os.path.exists(os.path.join(curd,f)):print(f"{f}\tnocur");continue
        if os.path.exists(out):print(f"{f}\tdone");continue
        sp=os.path.join(cache,bid+".png")
        if not os.path.exists(sp):
            if bid not in U:print(f"{f}\tnourl");continue
            r=subprocess.run(["curl","-sS","-f","--retry","3","-o",sp,U[bid]])
            if r.returncode:print(f"{f}\tdlfail");continue
        if bid not in sheets:
            for ob in list(sheets):
                if os.environ.get('HD_DEL')=='1':
                    try:os.remove(os.path.join(cache,ob+'.png'))
                    except OSError:pass
            sheets.clear();sheets[bid]=Image.open(sp).convert("RGBA")
        sheet=sheets[bid];cur=Image.open(os.path.join(curd,f)).convert("RGBA")
        try:
            cands=[]
            for nn in sorted({n,4,3}):
                for ii in range(nn):
                    try:c,(ox,oy)=crop_of(sheet,nn,ii)
                    except Exception:continue
                    if c.height<sheet.height*.5:continue
                    q=np.asarray(c.split()[3].resize((cur.width//4,cur.height//4),Image.BILINEAR)).astype(np.float32)/255.
                    t=np.asarray(cur.split()[3].resize((cur.width//4,cur.height//4),Image.BILINEAR)).astype(np.float32)/255.
                    cands.append((float(np.abs(q-t).mean()),(ox,oy,c.width,c.height)))
            cands.sort(key=lambda x:x[0]);best=None
            for sc,g in cands[:2]:
                r=register(sheet,g,cur)
                if best is None or r[2]+r[1]/400<best[2]+best[1]/400:best=r
            box,err,aerr=best
        except Exception as e:print(f"{f}\tregfail\t{e}");continue
        if err>9 or aerr>.03:print(f"{f}\tskip\t{err:.2f}\t{aerr:.3f}");continue
        im,k=hd_one(sheet,box,cur);kb,q=save_webp(im,out);print(f"{f}\tok\t{err:.2f}\t{aerr:.3f}\t{k:.2f}\t{im.width}\t{im.height}\t{kb//1024}\t{q}",flush=True)
