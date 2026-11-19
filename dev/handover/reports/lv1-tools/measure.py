import sys,json,os,glob,hashlib
sys.path.insert(0,"/home/user/wt/live1/dev/art/mkfit"); sys.path.insert(0,"/home/user/wt/live1/dev/art/headtop"); sys.path.insert(0,"/home/user/wt/live1/dev/tools")
import mkfit, headtop as HT, por_face
M="/home/user/wt/face_landmarker.task"; D="/home/user/wt/lt/out/img/"
res={"mk":{},"ht":{},"pf":{},"md5":{},"fail":[]}
for i in range(1,53):
    for kind in ("fig","por"):
        n=f"{kind}-maid-m{i:02d}-kc-a18.webp"; b=open(D+n,"rb").read(); res["md5"][n]=hashlib.md5(b).hexdigest()[:16]
        p,(W,H)=mkfit.detect_free(M,b)
        if p: res["mk"][n]=mkfit.enc(p,W,H)
        else: res["fail"].append("mk "+n)
        if kind=="fig":
            r=HT.face_rows(M,b)
            if r: res["ht"][n]=int(round((r[0]-HT.HAIR_K*(r[1]-r[0]))/r[2]*HT.U))
            else: res["fail"].append("ht "+n)
        else:
            res["pf"][n[4:-5]]=por_face.one(D+n)
json.dump(res,open("measure.json","w")); print({k:len(v) for k,v in res.items()}, res["fail"])
