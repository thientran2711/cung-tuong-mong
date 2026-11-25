#!/usr/bin/env python3
"""ORDER THIN P4: build dev/build/j68sd.js (const J68SEEDS) from the writer files (one JSON object per line; open + comp rows).
usage: python3 dev/build/j68sd_build.py [files…]  (default every dev/handover/content/thin/j68seeds*.md) — run dev/test/j68seeds_validate.py on them first."""
import json,sys,os,glob
d=os.path.dirname(os.path.abspath(__file__))
srcs=sys.argv[1:] or sorted(glob.glob(os.path.join(d,'../handover/content/thin/j68seeds*.md')))
rows=[]
for src in srcs:
    for l in open(src,encoding='utf8'):
        if l.lstrip().startswith('{'):rows.append(json.loads(l))
out='/* j68sd: ORDER THIN P4 composed j68 seeds (DATA ONLY). Built by dev/build/j68sd_build.py from dev/handover/content/thin/j68seeds*.md;\n   schema dev/handover/reports/thin.md «## API P4»; validator dev/test/j68seeds_validate.py; engine j68c.js. Do not hand-edit. */\nconst J68SEEDS=[\n'
out+=',\n'.join(json.dumps(r,ensure_ascii=False,separators=(',',':')) for r in rows)+'\n];\n'
open(os.path.join(d,'j68sd.js'),'w',encoding='utf8').write(out)
print(f"j68sd.js: {sum(r.get('type')=='comp' for r in rows)} comp + {sum(r.get('type')=='open' for r in rows)} open")
