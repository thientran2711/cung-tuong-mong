#!/bin/bash
# Sync the scratchpad build into dev/, assemble, and build the PWA site at the repo root.
# usage: dev/site/publish.sh [scratchpad-dir]   (does not commit)
set -e
S=${1:-/tmp/claude-0/-home-user-phuong-lenh/1e222f2f-177f-54ad-8b97-a62a9b124c31/scratchpad}
R=$(cd "$(dirname "$0")/../.." && pwd); D=$R/dev
cp $S/build/j*.js $S/build/p1.html $S/build/icon.webp $D/build/
cp $S/cung-dau/avatars.js $D/build/avatars.js
python3 - "$S/build/assemble.py" "$D/build/assemble.py" <<'P'
import sys,re
src=open(sys.argv[1]).read();dst=open(sys.argv[2]).read()
import ast
L=ast.literal_eval(re.search(r"for f in (\[[^\]]*\])",src).group(1));old=ast.literal_eval(re.search(r"for f in (\[[^\]]*\])",dst).group(1))
L=L+[x for x in old if x not in L]  # keep modules that live only in dev/ (j50+), in their order, at the end
dst=re.sub(r"for f in \[[^\]]*\]","for f in "+repr(L),dst,count=1);open(sys.argv[2],'w').write(dst)
P
mkdir -p $R/audio $R/icons
# pictures are NOT copied into the repo any more (dev/art/CDN.md): push them with python3 dev/site/cdn_sync.py
cp $S/cung-dau/audio/*.mp3 $S/cung-dau/audio/*.json $R/audio/ 2>/dev/null || true
# index.html + sw.js (content hash, swreg.js) + assets.json: the one build script
bash $D/site/build_site.sh
