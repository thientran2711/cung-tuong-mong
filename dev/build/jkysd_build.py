#!/usr/bin/env python3
"""ORDER THIN P5: build dev/build/jkysd.js (const KYSEEDS: who / where / when / what / text / option names) and dev/build/jbalkyc.js (the numbers:
Object.assign(BAL.kyngo.E,{id:{w,b,o|plain}}), a BAL file — law 4) from the writer files (one JSON object per line).
usage: python3 dev/build/jkysd_build.py [files…]  (default every dev/handover/content/thin/kyseeds*.md) — run dev/test/kyseeds_validate.py first."""
import json,sys,os,glob
d=os.path.dirname(os.path.abspath(__file__))
srcs=sys.argv[1:] or sorted(glob.glob(os.path.join(d,'../handover/content/thin/kyseeds*.md')))
rows=[]
for src in srcs:
    for l in open(src,encoding='utf8'):
        if l.lstrip().startswith('{'):rows.append(json.loads(l))
TXT=("id","grp","tag","src","tone","who","pl","when","what","t","n")
j=lambda o:json.dumps(o,ensure_ascii=False,separators=(',',':'))
out='/* jkysd: ORDER THIN P5 composed Kỳ ngộ seeds (DATA ONLY; numbers live in jbalkyc.js). Built by dev/build/jkysd_build.py from\n   dev/handover/content/thin/kyseeds*.md; schema dev/handover/reports/thin.md «## API P5»; validator dev/test/kyseeds_validate.py; engine jkyc.js. Do not hand-edit. */\nconst KYSEEDS=[\n'
out+=',\n'.join(j({k:r[k] for k in TXT if k in r}) for r in rows)+'\n];\n'
open(os.path.join(d,'jkysd.js'),'w',encoding='utf8').write(out)
bal='/* jbalkyc: BAL.kyngo.E rows of the ORDER THIN P5 composed Kỳ ngộ (law 4: every number of an encounter lives in BAL; law 2/3 checked by\n   dev/test/kyngo-eq.js and dev/test/kyseeds_validate.py). Built by dev/build/jkysd_build.py — do not hand-edit. */\nObject.assign(BAL.kyngo.E,{\n'
E=[]
for r in rows:
    e={"w":r.get("w",1),"b":r.get("b","0123")}
    if r.get("plain") is not None:e["plain"]=r["plain"]
    else:e["o"]=r.get("o")
    E.append(f' {j(r["id"])}:{j(e)}')
bal+=',\n'.join(E)+'\n});\n'
open(os.path.join(d,'jbalkyc.js'),'w',encoding='utf8').write(bal)
print(f"jkysd.js + jbalkyc.js: {len(rows)} seeds")
