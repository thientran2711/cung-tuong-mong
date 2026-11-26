#!/bin/bash
cd /home/user/wt/ho24 || exit 1
for i in 1 2 3 4 5; do
  flock /home/user/wt/fetch.lock git fetch -q --depth=30 origin claude/cung-tuong-mong-handover-hj0h8w:refs/remotes/origin/claude/cung-tuong-mong-handover-hj0h8w
  git rebase -q origin/claude/cung-tuong-mong-handover-hj0h8w || { echo REBASE-FAIL; git rebase --abort; exit 1; }
  git push -q origin lc24-ho:claude/cung-tuong-mong-handover-hj0h8w 2>/dev/null && { echo PUSHED $(git rev-parse --short HEAD); exit 0; }
  sleep $((i*2))
done; echo PUSH-FAIL
