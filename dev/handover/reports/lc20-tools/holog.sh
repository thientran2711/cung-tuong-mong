#!/bin/bash
cd /home/user/wt/ho; B=claude/cung-tuong-mong-handover-hj0h8w; F=dev/handover/reports/land-chain-20.md; SP=/tmp/claude-0/-home-user-cung-tuong-mong/cfb3100a-a477-5857-81fa-8c3538de8f2b/scratchpad
for i in 1 2 3 4; do
 flock /home/user/wt/fetch.lock git fetch -q --depth=30 origin $B && git reset -q --hard FETCH_HEAD && mkdir -p dev/handover/reports && cp $SP/land-chain-20.md $F && git add $F && { git diff --cached --quiet || git commit -qm "LC20: log

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01V1ZZH13F8jspwmPUsgb4Gg"; } && flock /home/user/wt/fetch.lock git push -q origin HEAD:refs/heads/$B && { git log --oneline -1; exit 0; }
 sleep 5; done; echo PUSHFAIL
