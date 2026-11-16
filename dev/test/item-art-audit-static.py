#!/usr/bin/env python3
"""ITEM ART AUDIT step 1b: keys referenced in game code as items that no item table (IT / WD_ITEMS) knows.
usage: python3 dev/test/item-art-audit-static.py <enum.json> <out.json>
Scans dev/build/j*.js (not all.js) for item contexts: inv.push({k:"x"..}), k:"x" next to from:/giver:, gi:"x", item:"x", rw/reward keys,
IEV_NOUN values, invHas/invCount("x"). A hit whose key is not in the enum keys is reported with file:line."""
import re,sys,json,glob,os
enum=json.load(open(sys.argv[1]));known=set(enum['keys']['IT'])|set(enum['keys']['WD'])
pats=[r'inv\.push\(\{k:"([a-z0-9_]+)"',r'\bgi:"([a-z0-9_]+)"',r'\bitem:"([a-z0-9_]+)"',r'\bgiveK:"([a-z0-9_]+)"',r'\b(?:invHas|invCount|invTake|invDel|hasItem|giveItem|addItem|invAdd)\("([a-z0-9_]+)"',r'\bk:"([a-z0-9_]+)",from:',r'\bkeys?:\["([a-z0-9_]+)"']
hits={}
for f in sorted(glob.glob('dev/build/j*.js')):
    if f.endswith('all.js'):continue
    for i,l in enumerate(open(f,encoding='utf8'),1):
        for p in pats:
            for m in re.finditer(p,l):
                k=m.group(1)
                if k not in known:hits.setdefault(k,[]).append(f"{os.path.basename(f)}:{i}")
out={k:v[:4] for k,v in sorted(hits.items())}
json.dump(out,open(sys.argv[2],'w'),ensure_ascii=False,indent=1);print(len(out),'referenced keys unknown to IT/WD_ITEMS');[print(k,v[0]) for k,v in list(out.items())[:80]]
