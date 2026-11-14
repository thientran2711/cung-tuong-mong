# put.py FILE... : PUT files (in order) to the upload targets of the LATEST creations_request_upload result in this transcript; prints paths JSON for finalize
import sys,re,json,glob,subprocess
fs=glob.glob("/root/.claude/projects/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/subagents/agent-ade4e7b6002d975ea.jsonl")
last=None
def strings(o):
    if isinstance(o,str): yield o
    elif isinstance(o,dict):
        for v in o.values(): yield from strings(v)
    elif isinstance(o,list):
        for v in o: yield from strings(v)
for f in fs:
    for line in open(f,errors="ignore"):
        if "proxyUploadUrl" not in line: continue
        try: o=json.loads(line)
        except Exception: continue
        for s in strings(o):
            if s.lstrip().startswith('{"uploads"'):
                try: last=json.loads(s)
                except Exception: pass
ups=last["uploads"]; files=sys.argv[1:]
assert len(ups)>=len(files),(len(ups),len(files))
out=[]
for u,f in zip(ups,files):
    r=subprocess.run(["curl","-sS","-X","PUT","-H","Content-Type: "+u["mimeType"],"--data-binary","@"+f,u["proxyUploadUrl"]],capture_output=True,text=True)
    assert '"success":true' in r.stdout, (f,r.stdout,r.stderr)
    out.append({"path":u["path"],"fileName":f.split("/")[-1]})
print(json.dumps(out))
