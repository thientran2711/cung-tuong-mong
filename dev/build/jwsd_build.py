#!/usr/bin/env python3
"""ORDER THIN P6: build dev/build/jwsd.js (const JWSEEDS) from the writer files (one JSON object per line, type "wc").
usage: python3 dev/build/jwsd_build.py [files…]  (default every dev/handover/content/thin/wseeds*.md) — run the validator on them first."""
import json,sys,os,glob
d=os.path.dirname(os.path.abspath(__file__))
srcs=sys.argv[1:] or sorted(glob.glob(os.path.join(d,'../handover/content/thin/wseeds*.md')))
rows=[]
for src in srcs:
    for l in open(src,encoding='utf8'):
        if l.lstrip().startswith('{'):
            r=json.loads(l)
            if r.get('type')=='wc':rows.append(r)
out='/* jwsd: ORDER THIN P6 composed seeds (DATA ONLY). Built by dev/build/jwsd_build.py from dev/handover/content/thin/wseeds*.md;\n   schema dev/handover/reports/thin.md «## API P6»; engine jworldc.js. Do not hand-edit. */\nconst JWSEEDS=[\n'
out+=',\n'.join(json.dumps(r,ensure_ascii=False,separators=(',',':')) for r in rows)+'\n];\n'
open(os.path.join(d,'jwsd.js'),'w',encoding='utf8').write(out)
print(f"jwsd.js: {len(rows)} seeds")
