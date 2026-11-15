# tx.py : helpers: scan THIS agent's transcript for upload targets / completed creation URLs
#   python3 tx.py put FILE...      -> PUT files to latest request_upload targets, print finalize JSON
#   python3 tx.py dl PATH=ID ...   -> download completed creations (URL seen in transcript)
import json,re,sys,os,subprocess
T="/root/.claude/projects/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/subagents/agent-a7a7268489937d5f2.jsonl"
T=os.environ.get("TX",T)
def strings(o):
    if isinstance(o,str): yield o
    elif isinstance(o,dict):
        for v in o.values(): yield from strings(v)
    elif isinstance(o,list):
        for v in o: yield from strings(v)
def lines(key):
    for line in open(T,errors="ignore"):
        if key not in line: continue
        try: o=json.loads(line)
        except Exception: continue
        for s in strings(o):
            if key in s: yield s
def last_uploads():
    last=None
    for s in lines("proxyUploadUrl"):
        if s.lstrip().startswith('{'):
            try: last=json.loads(s)
            except Exception: pass
    return last["uploads"]
R1=re.compile(r'"identifier":"(\w+)","status":"completed","results":\{"url":"([^"]+)"')
R2=re.compile(r'"identifier":"(\w+)"[^{}]*?"url":"(https://[^"]+)"')
def urls():
    db={}
    for s in lines("identifier"):
        for m in R1.finditer(s): db[m.group(1)]=m.group(2)
        for m in R2.finditer(s): db.setdefault(m.group(1),m.group(2))
    return db
if __name__=="__main__":
    c=sys.argv[1]; a=sys.argv[2:]
    if c=="put":
        ups=last_uploads(); assert len(ups)>=len(a),(len(ups),len(a)); out=[]
        for u,f in zip(ups,a):
            r=subprocess.run(["curl","-sS","--retry","5","-X","PUT","-H","Content-Type: "+u["mimeType"],"--data-binary","@"+f,u["proxyUploadUrl"]],capture_output=True,text=True)
            assert '"success":true' in r.stdout,(f,r.stdout[:200],r.stderr[:200])
            out.append({"path":u["path"],"fileName":os.path.basename(f)})
        print(json.dumps(out))
    elif c=="dl":
        db=urls(); bad=0
        for x in a:
            p,i=x.split("=")
            if os.path.exists(p) and os.path.getsize(p)>10000: continue
            if i not in db: print("NOURL",i); bad=1; continue
            subprocess.run(["curl","-sS","--retry","5","--retry-all-errors","-o",p,db[i]],check=True); print("ok",p)
        sys.exit(bad)
