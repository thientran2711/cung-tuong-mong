# run.py N "crop1 .. crop8" "edit1 .." "bg1 .." : takes the next N jids of rem.txt not yet in ages.txt, logs, applies, sheets
import sys,os,subprocess
H=os.path.dirname(os.path.abspath(__file__)); os.chdir(H)
REM=os.environ.get("REM","rem.txt"); LED=os.environ.get("LED","ages.txt")
done={l.split()[0] for l in open(LED)} if os.path.exists(LED) else set()
rem=[l.split()[0] for l in open(REM) if l.split() and l.split()[0] not in done]
c,e,b=sys.argv[1].split(),sys.argv[2].split(),sys.argv[3].split()
js=rem[:len(c)]; assert len(c)==len(e)==len(b)
with open(LED,"a") as f:
    for row in zip(js,c,e,b): f.write(" ".join(row)+"\n")
open("cur.txt","w").write("".join(f"{j} {x} {y}\n" for j,x,y in zip(js,e,b)))
print(" ".join(js))
subprocess.run(["python3","apply.py","cur.txt"])
n=sum(1 for _ in open(LED))
def pn(j):
    p,c,t=j.split("-"); return f"{'maid' if p=='A' else 'consort'}-{c}-t{t}-a51"
for k in range(0,len(js),8):
    subprocess.run(["python3","zoom.py",f"z_{n}_{k//8}.jpg"]+[pn(j) for j in js[k:k+8]]); print("zoom",f"z_{n}_{k//8}.jpg")
