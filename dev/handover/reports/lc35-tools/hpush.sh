#!/bin/bash
# usage: hpush.sh <msg> : copy scratch lc35.md to dev/handover/reports/land-chain-35.md on the fresh handover tip; push; retry
S=/tmp/claude-0/-home-user-cung-tuong-mong/16431846-4a1e-5251-849f-501ccdc71bb2/scratchpad; HB=claude/cung-tuong-mong-handover-hj0h8w; W=/home/user/wt/lc35-h
for i in 1 2 3 4 5; do
 flock /home/user/wt/fetch.lock git -C /home/user/cung-tuong-mong fetch -q --depth=30 origin +refs/heads/$HB:refs/remotes/origin/handover || { sleep 5; continue; }
 if [ ! -d $W ]; then git -C /home/user/cung-tuong-mong worktree add -q --no-checkout --detach $W origin/handover; git -C $W sparse-checkout set --no-cone '/dev/handover/'; fi
 cd $W; git checkout -q --detach origin/handover -f
 cp $S/lc35.md dev/handover/reports/land-chain-35.md; mkdir -p dev/handover/reports/lc35-tools; cp $S/hpush.sh dev/handover/reports/lc35-tools/
 git add dev/handover/reports/land-chain-35.md dev/handover/reports/lc35-tools
 git -c user.name=LC35 -c user.email=noreply@anthropic.com commit -q --no-verify -m "LC35: $1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Rc5AsM6Kc54sUepaVsvfyU"
 if git push -q origin HEAD:refs/heads/$HB 2>/dev/null; then echo pushed $(git rev-parse --short HEAD); exit 0; fi
 sleep $((i*3))
done; echo PUSH FAILED; exit 1
