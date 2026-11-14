# mproc.py bg.txt [jid...] : lines "jid gen bg"; download bg-removed lineup, split into 4 ages, write wt-maid/img + manifests
import sys, json, os, subprocess
from PIL import Image
import numpy as np
H=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,"/home/user/cung-tuong-mong/dev/figwork")
import importlib.util
spec=importlib.util.spec_from_file_location("sp_funcs",H+"/spfuncs.py"); sp=importlib.util.module_from_spec(spec); spec.loader.exec_module(sp)
WT="/tmp/claude-0/-home-user-cung-tuong-mong/84f333ce-ebd1-5e4a-9b0c-43035da11b67/scratchpad/wt-maidB"
OUT=WT+"/img"; sp.OUT=OUT
subprocess.run(["python3",H+"/urls.py"],stdout=subprocess.DEVNULL)
db=json.load(open(H+"/urls.json"))
MF={"maid":OUT+"/FIGURES-servants.json","consort":OUT+"/FIGURES.json"}
man={k:json.load(open(v)) for k,v in MF.items()}
by={k:{r["file"]:r for r in v} for k,v in man.items()}
AG=["a18","a26","a36","a51"]
only=set(sys.argv[2:])
LAST={}
for line in open(sys.argv[1]):
    p=line.split()
    if len(p)>=3: LAST[p[0]]=p[:3]
for jid,gen,bid in LAST.values():
    if only and jid not in only: continue
    part,who,tt=jid.split("-")
    role="consort" if part=="B" else "maid"
    tier=tt[1:] if part=="C" else tt          # A/B: "m0".."m4"; C: "1".."8" / "cold"
    if part=="C" and tier.isdigit(): tier=int(tier)
    ftag="t"+tt if part in "AB" else tt       # tm0 / t3 / tcold
    raw=f"{H}/bg/{jid}-{bid}.png"
    if not os.path.exists(raw):
        if bid not in db: print("NOURL",jid,bid); continue
        subprocess.run(["curl","-sS","-o",raw,db[bid]],check=True)
    im=Image.open(raw).convert("RGBA")
    a=np.asarray(im.resize((960,480))).astype(int); op=a[...,3]>200
    dk=(op&(a[...,:3].max(axis=2)<25)).sum()/max(1,op.sum())
    if dk>0.03:
        g=f"{H}/bg/gen-{gen}.png"
        if not os.path.exists(g): subprocess.run(["curl","-sS","-o",g,db[gen]],check=True)
        o=Image.open(g).convert("RGB").resize(im.size); o.putalpha(im.split()[3]); im=o; print("darkfix",jid)
    cols=sp.split(im,4)
    base={r["identity"]:r for r in man[role] if r["role"]==role and r["identity"]==who}
    b0=base.get(who,{})
    for (x0,x1),ag in zip(cols,AG):
        name=f"fig-{role}-{who}-{ftag}-{ag}"
        rec={"role":role,"identity":who,"tier":tier,"ageBand":ag,"look":b0.get("look")}
        if role=="consort" and b0.get("palette"): rec["palette"]=b0["palette"]
        rec.update(magnificUrl="https://www.magnific.com/app/creation/"+gen,bg=bid,sheet=jid)
        sp.byfile={}
        sp.finish(im.crop((max(0,x0-4),0,min(im.width,x1+4),im.height)),name,rec)
        for f,r in sp.byfile.items(): by[role][f]=r
    print(jid,"ok",[x1-x0 for x0,x1 in cols])
# m1: existing maid lineups (tier null) are tier "m1"
for r in by["maid"].values():
    if r["role"]=="maid" and r.get("tier") is None: r["tier"]="m1"
for k in MF:
    json.dump(sorted(by[k].values(),key=lambda f:f["file"]),open(MF[k],"w"),indent=1,ensure_ascii=False)
print({k:len(v) for k,v in by.items()})
