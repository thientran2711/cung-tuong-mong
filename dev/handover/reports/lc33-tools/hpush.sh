#!/bin/bash
S=/tmp/claude-0/-home-user-cung-tuong-mong/393fe91b-79d5-54af-81c6-941a14485066/scratchpad; HB=claude/cung-tuong-mong-handover-hj0h8w; W=/home/user/wt/lc33-h
for i in 1 2 3 4 5; do
 flock /home/user/wt/fetch.lock git -C /home/user/cung-tuong-mong fetch -q --depth=30 origin +refs/heads/$HB:refs/remotes/origin/handover || { sleep 5; continue; }
 if [ ! -d $W ]; then git -C /home/user/cung-tuong-mong worktree add -q --no-checkout --detach $W origin/handover; git -C $W sparse-checkout set --no-cone '/dev/handover/'; fi
 cd $W; git checkout -q --detach origin/handover -f
 cp $S/lc33.md dev/handover/reports/land-chain-33.md; git add dev/handover/reports/land-chain-33.md; [ -f $S/fe.txt ] && cat $S/fe.txt >> dev/handover/FOREMAN_E_STATUS.md && git add dev/handover/FOREMAN_E_STATUS.md
 git -c user.name=LC33 -c user.email=noreply@anthropic.com commit -q --no-verify -m "LC33: $1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Rc5AsNBC5amrkZhbDeusae"
 if git push -q origin HEAD:refs/heads/$HB 2>/dev/null; then rm -f $S/fe.txt; echo pushed $(git rev-parse --short HEAD); exit 0; fi
 sleep $((i*3))
done; echo PUSH FAILED; exit 1
