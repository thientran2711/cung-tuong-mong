#!/usr/bin/env python3
"""SIDE-LINE DIALOGUE SCENES: build dev/build/jdlgsd.js (const DLGS_DATA) from the writer files (one JSON object per line: {"id":"<fam>:<unit id>","dlg":{…}}).
usage: python3 dev/build/jdlgsd_build.py [files…]  (default every dev/handover/content/dlg/*.md) — run dev/test/dlgs_validate.py first.
Schema: dev/handover/reports/sideline-dialogue.md «## SCHEMA». A later file wins for the same id."""
import json,sys,os,glob
d=os.path.dirname(os.path.abspath(__file__))
srcs=sys.argv[1:] or sorted(glob.glob(os.path.join(d,'../handover/content/dlg/*.md')))
rows={}
for src in srcs:
    for l in open(src,encoding='utf8'):
        if l.lstrip().startswith('{'):
            r=json.loads(l);rows[r['id']]={'id':r['id'],'dlg':r['dlg']}
out='/* jdlgsd: SIDE-LINE DIALOGUE SCENES (DATA ONLY). Built by dev/build/jdlgsd_build.py from every dev/handover/content/dlg/*.md;\n   schema dev/handover/reports/sideline-dialogue.md «## SCHEMA»; validator dev/test/dlgs_validate.py; engine jdlgs.js. Do not hand-edit. */\nconst DLGS_DATA=[\n'
out+=',\n'.join(json.dumps(r,ensure_ascii=False,separators=(',',':')) for r in rows.values())+'\n];\n'
open(os.path.join(d,'jdlgsd.js'),'w',encoding='utf8').write(out)
print(f"jdlgsd.js: {len(rows)} scenes")
