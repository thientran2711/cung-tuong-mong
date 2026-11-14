# mm_genharvest.py : pairs images_generate (first reference id, prompt head) -> output id from this session's transcripts
import glob,json,re
pend={}; out=[]
for f in glob.glob("/root/.claude/projects/-home-user-cung-tuong-mong/*/subagents/*.jsonl"):
    for line in open(f,errors="ignore"):
        if "images_generate" not in line and "tool_result" not in line: continue
        try: o=json.loads(line)
        except Exception: continue
        c=o.get("message",{}).get("content")
        if not isinstance(c,list): continue
        for b in c:
            if b.get("type")=="tool_use" and b.get("name","").endswith("images_generate"):
                r=b["input"].get("references") or []
                pend[b["id"]]=(r[0]["identifier"] if r else "", b["input"].get("prompt","")[:60])
            elif b.get("type")=="tool_result" and b.get("tool_use_id") in pend:
                m=re.search(r'identifier\\*"?:\\*"(\w+)',json.dumps(b.get("content")))
                if m: out.append((pend[b["tool_use_id"]][0],m.group(1),pend[b["tool_use_id"]][1]))
for a,b,p in out: print(a,b,p)
