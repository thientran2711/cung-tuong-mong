# dl.py PATH=ID ... : find completed creation URLs in this session's transcript and download each to PATH (skip existing)
import sys,re,json,os,glob,subprocess
fs=glob.glob("/root/.claude/projects/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/subagents/agent-a36359ad81f20b98e.jsonl")
R1=re.compile(r'"identifier":"(\w+)","status":"completed","results":\{"url":"([^"]+)"')
R2=re.compile(r'identifier: (\w+)\n(?:.*\n){0,6}?\s*url: "([^"]+)"')
db={}
def strings(o):
    if isinstance(o,str): yield o
    elif isinstance(o,dict):
        for v in o.values(): yield from strings(v)
    elif isinstance(o,list):
        for v in o: yield from strings(v)
for f in fs:
    for line in open(f,errors="ignore"):
        if "pikaso" not in line: continue
        try: o=json.loads(line)
        except Exception: continue
        for s in strings(o):
            if "pikaso" not in s: continue
            for m in R1.finditer(s): db[m.group(1)]=m.group(2)
            for m in R2.finditer(s): db.setdefault(m.group(1),m.group(2))
bad=0
for a in sys.argv[1:]:
    p,i=a.split("=")
    if os.path.exists(p) and os.path.getsize(p)>10000: continue
    if i not in db: print("NOURL",i,p); bad=1; continue
    subprocess.run(["curl","-sS","--retry","5","--retry-all-errors","-o",p,db[i]],check=True)
    print("ok",p)
sys.exit(bad)
