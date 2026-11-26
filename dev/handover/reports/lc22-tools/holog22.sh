#!/bin/bash
cd /home/user/wt/ho; B=claude/cung-tuong-mong-handover-hj0h8w; F=dev/handover/reports/land-chain-22.md; SP=/tmp/claude-0/-home-user-cung-tuong-mong/3e807b63-1bf7-5ec4-af1b-dc63a015d060/scratchpad
for i in 1 2 3 4; do
 flock /home/user/wt/fetch.lock git fetch -q --depth=30 origin $B && git reset -q --hard FETCH_HEAD && mkdir -p dev/handover/reports && cp $SP/land-chain-22.md $F && mkdir -p dev/handover/reports/lc22-logs && cp $SP/lc22-logs/* dev/handover/reports/lc22-logs/ 2>/dev/null; git add $F dev/handover/reports/lc22-logs && { git diff --cached --quiet || git commit -qm "LC22: log

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01V1ZZH1yukhK2kxzgNYASPT"; } && flock /home/user/wt/fetch.lock git push -q origin HEAD:refs/heads/$B && { git log --oneline -1; exit 0; }
 sleep 5; done; echo PUSHFAIL
