# p.py : pipeline helper over st.txt (lines "JID KEY ID")
#  p.py set KEY JID=ID ...      append
#  p.py get KEY JID...          print ids
#  p.py G JID...                download A -> raw/JID_A.png, make hg/JID.png grid
#  p.py X JID...                download B -> hg/JID_e.png, paste -> raw/JID_X.png
#  p.py BG JID...               download BG cutout -> cw/bg/JID-BG.png, copy X to cw/bg/gen-U.png, append cw/gens.txt + cw/bg.txt
#  p.py T6 JID...               (t6/t7/t8 fresh or edit gens N) download N, record cutout BG -> cw files (gen=N)
import sys,os,subprocess,shutil
S="/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad"; os.chdir(S)
def st():
    d={}
    for l in open("pc_st.txt"):
        p=l.split()
        if len(p)==3: d[(p[0],p[1])]=p[2]
    return d
def dl(pairs):
    r=subprocess.run(["python3","pc_dl.py"]+[f"{a}={b}" for a,b in pairs],capture_output=True,text=True)
    if r.returncode: print(r.stdout); sys.exit(1)
c=sys.argv[1]; a=sys.argv[2:]
if c=="set":
    k=a[0]
    with open("pc_st.txt","a") as f:
        for x in a[1:]: j,i=x.split("="); f.write(f"{j} {k} {i}\n")
elif c=="get":
    d=st(); print(" ".join(d.get((j,a[0]),"?") for j in a[1:]))
elif c=="G":
    d=st(); dl([(f"raw/{j}_A.png",d[(j,"A")]) for j in a])
    for j in a:
        r=subprocess.run(["python3","hg.py","make",f"raw/{j}_A.png",f"hg/{j}.png",f"hg/{j}.json"],capture_output=True,text=True)
        print(j,"grid" if r.returncode==0 else "FAIL "+r.stderr[-200:])
elif c=="X":
    d=st(); dl([(f"hg/{j}_e.png",d[(j,"B")]) for j in a])
    for j in a:
        r=subprocess.run(["python3","hg.py","paste",f"raw/{j}_A.png",f"hg/{j}_e.png",f"hg/{j}.json",f"raw/{j}_X.png"],capture_output=True,text=True)
        print(j,r.stdout.replace("\n"," | "),r.stderr[-200:])
elif c=="BG":
    d=st(); dl([(f"cw/bg/{j}-{d[(j,'BG')]}.png",d[(j,"BG")]) for j in a])
    for j in a:
        u=d[(j,"U")]; shutil.copy(f"raw/{j}_X.png",f"cw/bg/gen-{u}.png")
        open("cw/gens.txt","a").write(f"{j} {u} fix11/14 A={d[(j,'A')]} B={d.get((j,'B'),'-')}\n")
        open("cw/bg.txt","a").write(f"{j} {u} {d[(j,'BG')]}\n"); print(j,"ok")
elif c=="T6":
    d=st(); dl([(f"cw/bg/gen-{d[(j,'N')]}.png",d[(j,"N")]) for j in a]+[(f"cw/bg/{j}-{d[(j,'BG')]}.png",d[(j,"BG")]) for j in a])
    for j in a:
        open("cw/gens.txt","a").write(f"{j} {d[(j,'N')]} fix11/14\n")
        open("cw/bg.txt","a").write(f"{j} {d[(j,'N')]} {d[(j,'BG')]}\n"); print(j,"ok")
