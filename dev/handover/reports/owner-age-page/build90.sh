#!/bin/bash
# build90.sh [root]: probe90 (states+v3) -> build90 (state sheets s/, Quoc tang q/) -> upload -> inject manifest90 into page.html
# (rank strips a18..a51/<cNN>.webp still come from build.sh). Run from a sparse worktree with dev/site/cdn_sync.py.
set -e; H=$(cd "$(dirname "$0")" && pwd); R=${1:-.}; O=$R/img/_review/owner-age-page
python3 $H/probe90.py $H/states90.json
python3 $H/build90.py $H/states90.json $O
(cd $R && python3 dev/site/cdn_sync.py img/_review/owner-age-page)
python3 - "$H" "$O" <<'PY'
import re,sys;h,o=sys.argv[1:3];p=open(h+'/page.html').read();m=open(o+'/manifest90.json').read()
open(h+'/page.html','w').write(re.sub(r'/\*M90\*/.*?/\*END90\*/',lambda _:'/*M90*/'+m+'/*END90*/',p,flags=re.S))
PY
