#!/bin/bash
# usage: mstep.sh <sha> <msg> : in lc36-ui, merge --no-ff --no-commit; built files --ours; stop if other conflicts; rebuild vs LIVE; commit
set -e; W=/home/user/wt/lc36-ui; L=${LIVE:-7d7c6886}; cd $W
[ -z "$(git status --porcelain -uno)" ] || { echo DIRTY; exit 4; }
git merge --no-ff --no-commit $1 >/dev/null 2>&1 || true
git rev-parse -q --verify MERGE_HEAD >/dev/null || { echo "NO MERGE STARTED"; exit 5; }
U=$(git diff --name-only --diff-filter=U | grep -vxE 'index.html|sw.js' || true)
if [ -n "$U" ]; then echo "REAL CONFLICT: $U"; exit 2; fi
git checkout --ours index.html sw.js 2>/dev/null || true; git add index.html sw.js
ASSETS_REF=$L bash /home/user/wt/tools/lc34-tools_build2.sh $W $L >/tmp/mstep.log 2>&1 || { tail /tmp/mstep.log; exit 3; }
git diff --quiet $L -- assets.json || echo "WARN assets differ from LIVE"
git add index.html sw.js
git -c user.name=LC36 -c user.email=noreply@anthropic.com commit -q -m "LC36: $2

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Rc5AsLXrjzGSWFgZ6E2Hxg"
git rev-list --parents -n1 HEAD | cut -c1-8,41-49,82-90
