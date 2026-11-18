#!/bin/bash
# usage: push.sh "msg" files...
cd /home/user/cung-tuong-mong
m="$1"; shift
git add "$@" && git commit -qm "$m" || exit 1
C=$(git rev-parse HEAD)
for i in 1 2 3 4 5; do
  flock /home/user/wt/fetch.lock git fetch --depth=1 -q origin claude/cung-tuong-mong-handover-hj0h8w
  git checkout -q -B x FETCH_HEAD
  git cherry-pick $C >/dev/null 2>&1 || { echo CPFAIL; git cherry-pick --abort; exit 1; }
  git push -q origin HEAD:claude/cung-tuong-mong-handover-hj0h8w 2>/dev/null
  flock /home/user/wt/fetch.lock git fetch --depth=1 -q origin claude/cung-tuong-mong-handover-hj0h8w
  git merge-base --is-ancestor HEAD FETCH_HEAD && { echo VERIFIED; exit 0; }
  sleep 2
done; echo PUSHFAIL
