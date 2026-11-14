# rawdl.py idsfile -> download raw pngs (name#tag id) to raw/<name#tag>.png if url known
import sys,json,os,subprocess
W=os.path.dirname(os.path.abspath(__file__)); db=json.load(open(W+"/urls.json"))
miss=[]
for line in open(sys.argv[1]):
    p=line.split()
    if len(p)<2: continue
    n,i=p[0],p[1]; out=f"{W}/raw/{n}.png"
    if os.path.exists(out): continue
    if i not in db: miss.append(i); continue
    subprocess.run(["curl","-sS","-o",out,db[i]],check=True)
print("missing",miss)
