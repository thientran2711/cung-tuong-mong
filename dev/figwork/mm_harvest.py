# pair images_remove_background input creationIdentifier -> output identifier from this session's transcripts
import glob,json,re,os
pend={}; out={}
for f in glob.glob("/root/.claude/projects/-home-user-cung-tuong-mong/*/subagents/*.jsonl"):
    for line in open(f,errors="ignore"):
        if "remove_background" not in line and "tool_result" not in line: continue
        try: o=json.loads(line)
        except Exception: continue
        c=o.get("message",{}).get("content")
        if not isinstance(c,list): continue
        for b in c:
            if b.get("type")=="tool_use" and b.get("name","").endswith("images_remove_background"):
                pend[b["id"]]=b["input"]["creationIdentifier"]
            elif b.get("type")=="tool_result" and b.get("tool_use_id") in pend:
                t=json.dumps(b.get("content")); m=re.search(r'identifier\\*"?:\\*"(\w+)',t)
                if m: out[pend[b["tool_use_id"]]]=m.group(1)
up={l.split()[1]:l.split()[0] for l in open(os.path.dirname(__file__)+"/mm/upmap.txt")}
with open(os.path.dirname(__file__)+"/mm/bgmap.txt","w") as w:
    for src,bg in out.items():
        if src in up: w.write(f"{up[src]} {bg}\n")
print(len(out))
