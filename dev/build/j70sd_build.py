#!/usr/bin/env python3
"""ORDER THIN P6: build dev/build/j70sd.js (const J70SEEDS) from the writer files (one JSON object per line, type "route").
usage: python3 dev/build/j70sd_build.py [files…]  (default every dev/handover/content/thin/j70seeds*.md) — run the validator on them first."""
import json,sys,os,glob
d=os.path.dirname(os.path.abspath(__file__))
srcs=sys.argv[1:] or sorted(glob.glob(os.path.join(d,'../handover/content/thin/j70seeds*.md')))
rows=[]
for src in srcs:
    for l in open(src,encoding='utf8'):
        if l.lstrip().startswith('{'):
            r=json.loads(l)
            if r.get('type')=='route':rows.append(r)
out='/* j70sd: ORDER THIN P6 composed seeds (DATA ONLY). Built by dev/build/j70sd_build.py from dev/handover/content/thin/j70seeds*.md;\n   schema dev/handover/reports/thin.md «## API P6»; engine j70c.js. Do not hand-edit. */\nconst J70SEEDS=[\n'
out+=',\n'.join(json.dumps(r,ensure_ascii=False,separators=(',',':')) for r in rows)+'\n];\n'
open(os.path.join(d,'j70sd.js'),'w',encoding='utf8').write(out)
print(f"j70sd.js: {len(rows)} seeds")
