# sksheet.py smudge|pale OUT.jpg : before | after face crops for the top-40 list (CDN versions in .ahcache/sk/src/img)
import sys,os,json,cv2,numpy as np,importlib.util
W="/home/user/cung-tuong-mong/.claude/worktrees/agent-a4e8c6432e582a50a/"
spec=importlib.util.spec_from_file_location("sk",W+"dev/art/skin-smudge.py");sk=importlib.util.module_from_spec(spec);spec.loader.exec_module(sk)
mode,out=sys.argv[1],sys.argv[2];names=json.load(open(W+".ahcache/sk/top.json"))[mode]
BG=np.array([52,38,30],np.float32);FX=W+f".ahcache/sk/fix-{mode}/";os.makedirs(FX,exist_ok=True)
def comp(im):
    a=im[...,3:].astype(np.float32)/255;return (im[...,:3]*a+BG*(1-a)).astype(np.uint8)
MEN=("por-man","por-eunuch","por-official","por-emperor","por-physician")
tiles=[]
for n in names:
    p=W+".ahcache/sk/src/img/"+n;r=sk.analyse(p)
    if not r: continue
    info,st=r;im,sm,skin,box,Lb,Cb,gl,gc=st
    if mode=="smudge": fx=sk.fix(*st)
    else:
        men=n.startswith(MEN);fx=sk.rosy(im,skin,box,info["Lc"],info["ac"],info["bc"],A_T=11.0 if men else 13.0,B_T=15.0,blush=1.5 if men else 4.0)
    cv2.imwrite(FX+n,fx,[cv2.IMWRITE_WEBP_QUALITY,95])
    x0,y0,x1,y1=box
    t=[cv2.resize(comp(x)[y0:y1,x0:x1],(330,int(330*(y1-y0)/(x1-x0))),interpolation=cv2.INTER_CUBIC) for x in (im,fx)]
    t=np.hstack([t[0],np.full((t[0].shape[0],6,3),235,np.uint8),t[1]])
    lab=np.full((30,t.shape[1],3),235,np.uint8)
    m=f"vet {info['smudge']}% sau {info['depth']}" if mode=="smudge" else f"a*={info['ac']} b*={info['bc']}"
    cv2.putText(lab,f"{len(tiles)+1}. {n[:-5]}  {m}  TRUOC | SAU",(4,21),cv2.FONT_HERSHEY_SIMPLEX,.55,(20,20,20),1)
    tiles.append(np.vstack([lab,t,np.full((10,t.shape[1],3),235,np.uint8)]))
w=max(t.shape[1] for t in tiles);h=max(t.shape[0] for t in tiles)
tiles=[np.vstack([np.hstack([t,np.full((t.shape[0],w-t.shape[1],3),235,np.uint8)]),np.full((h-t.shape[0],w,3),235,np.uint8)]) for t in tiles]
while len(tiles)%3: tiles.append(np.full_like(tiles[0],235))
rows=[np.hstack([tiles[i],np.full((h,16,3),235,np.uint8),tiles[i+1],np.full((h,16,3),235,np.uint8),tiles[i+2]]) for i in range(0,len(tiles),3)]
cv2.imwrite(out,np.vstack(rows),[cv2.IMWRITE_JPEG_QUALITY,86]);print(len(names),"->",out)
