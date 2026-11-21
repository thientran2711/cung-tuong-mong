#!/bin/bash
# usage: sland.sh <branch> <sha> <topic> "<CTM_CHANGE line>" [test cmds...]   → merges LIVE, rebuilds, tests, golive; prints READY <sha>
set -o pipefail
cd /home/user/wt/live || exit 1
BR=$1; SHA=$2; T=$3; CH=$4; shift 4
flock /home/user/wt/fetch.lock git fetch -q --depth=30 origin main "$BR" || exit 1
git merge --abort 2>/dev/null; git checkout -q -- . ; git checkout -q --detach "$SHA" || exit 1
if git merge-base --is-ancestor origin/main HEAD; then echo "ALREADY-CONTAINS LIVE (FF candidate)"; MERGED=0; else
  git merge --no-edit -q origin/main >/dev/null 2>&1; MERGED=1
  U=$(git diff --name-only --diff-filter=U)
  for f in $U; do case $f in index.html|sw.js) git checkout --theirs $f;; dev/build/assemble.py) python3 dev/tools/asmunion.py $f || { echo "REAL CONFLICT $f"; exit 2; };; dev/kit/KIT.md|*.md) sed -i '/^<<<<<<< /d;/^=======$/d;/^>>>>>>> /d' $f;; *) echo "REAL CONFLICT $f"; exit 2;; esac; git add $f; done
fi
python3 dev/build/assemble.py >/dev/null && CTM_CHANGE="$CH" bash dev/site/build_site.sh >/dev/null 2>&1
git add -A index.html sw.js
if [ $MERGED = 1 ]; then git commit -qm "SELF-MERGE LAND $T: merge LIVE $(git rev-parse --short origin/main) (index.html/sw.js rebuilt)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/<YOUR SESSION ID>"; elif ! git diff --cached --quiet; then echo "NOTE: rebuild changed index/sw on FF candidate"; git diff --cached --stat|tail -1; git checkout -q -- . ; git reset -q; fi
for t in "$@"; do echo "== $t"; timeout 400 sh -c "node $t" 2>&1 | tail -2; done
timeout 590 bash dev/tools/golive.sh $(git rev-parse HEAD) 2>&1 | grep -E "QUICKCHECK PASS.*total|checks OK|FAIL" | tail -3
echo HEAD $(git rev-parse HEAD)
