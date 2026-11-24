#!/usr/bin/env python3
"""ORDER THIN P3: build dev/build/j72sd.js (const J72SEEDS) from the writer file (one JSON object per line).
usage: python3 dev/build/j72sd_build.py [dev/handover/content/thin/j72seeds.md]  — run dev/test/j72seeds_validate.py on it first."""
import json,sys,os
d=os.path.dirname(os.path.abspath(__file__))
src=sys.argv[1] if len(sys.argv)>1 else None
rows=[]
if src:
    for l in open(src,encoding='utf8'):
        if l.lstrip().startswith('{'):rows.append(json.loads(l))
out='/* j72sd: ORDER THIN P3 composed việc nhờ seeds (DATA ONLY). Built by dev/build/j72sd_build.py from dev/handover/content/thin/j72seeds.md;\n   schema dev/handover/reports/thin.md «## API P3»; validator dev/test/j72seeds_validate.py; engine j72c.js. Do not hand-edit. */\nconst J72SEEDS=[\n'
out+=',\n'.join(json.dumps(r,ensure_ascii=False,separators=(',',':')) for r in rows)+'\n];\n'
open(os.path.join(d,'j72sd.js'),'w',encoding='utf8').write(out)
print(f"j72sd.js: {len(rows)} seeds")
