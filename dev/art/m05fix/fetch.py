# fetch.py FACE... : download edits listed in edits.txt (last id per face+tier wins), paste, ecrop + cmp sheets
import sys,os,subprocess
H=os.path.dirname(os.path.abspath(__file__))
os.environ["TX"]="/root/.claude/projects/-home-user-cung-tuong-mong/d64e4822-8005-553d-be5a-3c77c37ea939/subagents/agent-a8fc7f5e0876349f1.jsonl:/root/.claude/projects/-home-user/d64e4822-8005-553d-be5a-3c77c37ea939/subagents/agent-a8fc7f5e0876349f1.jsonl"
E={}
for l in open(os.environ.get("EDITS",f"{H}/edits.txt")):
    p=l.split()
    if len(p)>=3: E[(p[0],p[1])]=p[2]
for f in sys.argv[1:]:
    D=os.path.abspath(os.environ.get("HDROOT",f"{H}/../hd"))+f"/{f}"; ts=sorted(t for (ff,t) in E if ff==f)
    # always refetch when the id changed: keep a stamp per tier
    args=[]
    for t in ts:
        st=f"{D}/e/{t}.id"; i=E[(f,t)]
        if not (os.path.exists(st) and open(st).read()==i and os.path.exists(f"{D}/e/{t}.png")):
            if os.path.exists(f"{D}/e/{t}.png"): os.remove(f"{D}/e/{t}.png")
            args.append(f"{D}/e/{t}.png={i}"); open(st,"w").write(i)
    if args: subprocess.run([sys.executable,f"{H}/tx.py","dl"]+args,cwd=H)
    ts=[t for t in ts if os.path.exists(f"{D}/e/{t}.png")]
    subprocess.run([sys.executable,f"{H}/hd.py","paste",f]+ts,cwd=H)
    subprocess.run([sys.executable,f"{H}/hd.py","ecrop",f,f"{D}/c/ecrop.jpg"]+ts,cwd=H)
    subprocess.run([sys.executable,f"{H}/hd.py","cmp",f,f"{D}/c/cmp.jpg"]+ts,cwd=H)
    print(f,"done",ts)
