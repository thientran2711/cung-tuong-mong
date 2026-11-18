#!/bin/bash
# build.sh [root]: probe CDN -> manifest.json -> strips -> upload to img/_review/owner-age-page/ -> page.html manifest injected
set -e; H=$(cd "$(dirname "$0")" && pwd); R=${1:-/home/user/wt/w66root}
mkdir -p $R/dev/site; for f in cdn_sync.py manifest_guard.py; do [ -f $R/dev/site/$f ] || git show origin/main:dev/site/$f > $R/dev/site/$f; done
python3 $H/probe.py $H/manifest.json
(cd $R && python3 $H/build.py $H/manifest.json .)
cp $H/manifest.json $R/img/_review/owner-age-page/manifest.json
(cd $R && python3 dev/site/cdn_sync.py img/_review/owner-age-page && python3 dev/site/cdn_sync.py --check img/_review/owner-age-page)
python3 - "$H" <<'PY'
import json,re,sys;h=sys.argv[1];p=open(h+'/page.html').read();m=json.dumps(json.load(open(h+'/manifest.json')),separators=(',',':'))
open(h+'/page.html','w').write(re.sub(r'/\*MANIFEST\*/.*?/\*END\*/','/*MANIFEST*/'+m+'/*END*/',p,flags=re.S))
PY
