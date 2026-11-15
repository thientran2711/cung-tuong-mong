#!/bin/bash
# review/hoang-tu: every viewport x scenario (needs _ht.html / _ht0.html from ht-mk.py). usage: bash dev/test/ht-all.sh <scratch dir for saves/json>
cd "$(dirname "$0")/../.." || exit 1
H="${1:?scratch dir}"; SD=dev/shots/hoang-tu; mkdir -p "$H" "$SD"; export NODE_PATH=$(npm root -g)
for V in 755x1000@2 1180x820@2 412x1058@2; do t=${V%%x*}
 [ -f "$H/old-$t.json" ] || timeout 400 node dev/test/hoang-tu.js _ht0.html $V "$H" x kids "$H/old-$t.json" >/dev/null 2>&1
 for SC in kids nokid old; do timeout 500 node dev/test/hoang-tu.js _ht.html $V $SD sau-$t-$SC $SC "$H/old-$t.json" > "$H/r-$t-$SC.json" 2>&1
  python3 -c "
import json,sys;t=open(sys.argv[1]).read().strip().splitlines()[-1]
try: d=json.loads(t)
except Exception: print(sys.argv[1],t[:300]);sys.exit()
bad=[(k,v) for k,v in d['R'].items() if isinstance(v,dict) and 'ovf' in v and (v['ovf'] or v['cut'] or v['subCut'] or v['empty'] or v['bad'])]
print(d['TAG'],'errs',d['errs'],'issues',bad,d['R'].get('state'),str(d['R'].get('pick'))[:40],d['R'].get('kid',{}).get('subs'))" "$H/r-$t-$SC.json"; done; done
