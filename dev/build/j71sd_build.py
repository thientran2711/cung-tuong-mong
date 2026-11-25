#!/usr/bin/env python3
"""ORDER THIN P7: build dev/build/j71sd.js (const J71SEEDS) from the writer files (one JSON object per line, types stage, comp, prize).
usage: python3 dev/build/j71sd_build.py [files…]  (default every dev/handover/content/thin/fseeds*.md) — run the validator on them first."""
import json,sys,os,glob
d=os.path.dirname(os.path.abspath(__file__))
srcs=sys.argv[1:] or sorted(glob.glob(os.path.join(d,'../handover/content/thin/fseeds*.md')))
rows=[]
for src in srcs:
    for l in open(src,encoding='utf8'):
        if l.lstrip().startswith('{'):
            r=json.loads(l)
            if r.get('type') in ('stage','comp','prize'):rows.append(r)
out='/* j71sd: ORDER THIN P7 composed seeds (DATA ONLY). Built by dev/build/j71sd_build.py from dev/handover/content/thin/fseeds*.md;\n   schema dev/handover/reports/thin.md «## API P7»; engine j71c.js. Do not hand-edit. */\nconst J71SEEDS=[\n'
out+=',\n'.join(json.dumps(r,ensure_ascii=False,separators=(',',':')) for r in rows)+'\n];\n'
open(os.path.join(d,'j71sd.js'),'w',encoding='utf8').write(out)
print(f"j71sd.js: {len(rows)} seeds")
