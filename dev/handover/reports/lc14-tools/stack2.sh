#!/bin/bash
# usage: stack2.sh <wt> <base> <merge-sha> <branch> <change-line|-> <msg>
set -e; cd $1; git reset -q --hard $2; git merge --no-commit --no-ff $3 >/dev/null 2>&1 || true
git checkout --theirs index.html sw.js 2>/dev/null || true; git checkout --theirs assets.json 2>/dev/null || true; [ -z "$(git diff --name-only --diff-filter=U | grep -vE "^(index.html|sw.js|assets.json|dev/site/CHANGE.txt)$")" ] || { echo "SOURCE CONFLICT"; git diff --name-only --diff-filter=U; exit 3; }
[ "$5" != "-" ] && echo "$5" > dev/site/CHANGE.txt
bash dev/site/build_site.sh 2>&1 | grep "build line"
git add -A; git commit -qm "$6

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01V1ZZH445aM6qMekWv3GK8Y"
git rev-parse --short HEAD; flock /home/user/wt/fetch.lock git push -qf origin HEAD:refs/heads/$4 2>&1 | grep -v remote || true
