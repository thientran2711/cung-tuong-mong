#!/bin/bash
# push LC15 log to handover branch: fetch + reset --hard + re-apply file
cd /home/user/wt/ho; B=claude/cung-tuong-mong-handover-hj0h8w; F=dev/handover/reports/land-chain-15.md; SP=/tmp/claude-0/-home-user-cung-tuong-mong/0b853650-1047-51f5-84b9-0926f20c799d/scratchpad
for i in 1 2 3 4; do
 flock /home/user/wt/fetch.lock git fetch -q --depth=30 origin $B && git reset -q --hard FETCH_HEAD && cp $SP/land-chain-15.md $F && git add $F && { git diff --cached --quiet || git commit -qm "LC15: log"; } && flock /home/user/wt/fetch.lock git push -q origin HEAD:refs/heads/$B && { git log --oneline -1; exit 0; }
 sleep 5; done; echo PUSHFAIL
