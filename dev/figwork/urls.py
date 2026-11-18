import glob, re, json, os
W=os.path.dirname(os.path.abspath(__file__))
db={}
if os.path.exists(W+"/urls.json"): db=json.load(open(W+"/urls.json"))
def lines_of(f):
    if f.endswith(".json"):
        try: d=json.load(open(f))
        except Exception: return []
        t="".join(x.get("text","") for x in d if isinstance(x,dict)) if isinstance(d,list) else ""
        return t.splitlines()
    return open(f).read().splitlines()
fs=glob.glob("/root/.claude/projects/*/*/tool-results/mcp-Magnific-creations_*.txt")+glob.glob("/root/.claude/projects/*/*/tool-results/toolu_*.json")
for f in sorted(fs, key=os.path.getmtime):
    cur=None; st=None
    for line in lines_of(f):
        m=re.match(r'\s*-?\s*identifier: (\S+)',line)
        if m: cur=m.group(1); st=None; continue
        m=re.match(r'\s*status: (\S+)',line)
        if m: st=m.group(1); continue
        m=re.match(r'\s*url: "(\S+)"',line)
        if m and cur and st=="completed" and cur not in db: db[cur]=m.group(1)
        m=re.match(r'\s*sourceIdentifier: (\S+)',line)
json.dump(db,open(W+"/urls.json","w"),indent=0)
print(len(db))
# transcripts
R1=re.compile(r'"identifier":"(\w+)","status":"completed","results":\{"url":"([^"]+)"')
def strings(o):
    if isinstance(o,str): yield o
    elif isinstance(o,dict):
        for v in o.values(): yield from strings(v)
    elif isinstance(o,list):
        for v in o: yield from strings(v)
for f in glob.glob("/root/.claude/projects/*/*/subagents/*.jsonl")+glob.glob("/root/.claude/projects/*/*.jsonl"):
    if os.path.getsize(f)>200_000_000: continue
    for line in open(f,errors="ignore"):
        if "pikaso" not in line: continue
        try: o=json.loads(line)
        except Exception: continue
        for s in strings(o):
            if "pikaso" not in s: continue
            for m in R1.finditer(s):
                db.setdefault(m.group(1),m.group(2))
            cur=None; st=None
            for l in s.splitlines():
                m=re.match(r'\s*-?\s*identifier: (\S+)',l)
                if m: cur=m.group(1); st=None; continue
                m=re.match(r'\s*status: (\S+)',l)
                if m: st=m.group(1); continue
                m=re.match(r'\s*url: "(\S+)"',l)
                if m and cur and st=="completed": db.setdefault(cur,m.group(1))
json.dump(db,open(W+"/urls.json","w"),indent=0)
print("with transcripts",len(db))
