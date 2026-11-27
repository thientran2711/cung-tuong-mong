#!/bin/bash
# usage: hpush.sh <msg> : copy scratch lc32.md to dev/handover/reports/land-chain-32.md and append scratch status line (if file st.txt exists) to MAIN_STATUS on the fresh handover tip; push; retry
S=/tmp/claude-0/-home-user-cung-tuong-mong/ef881d8f-432a-56f0-afdc-a176b718b1e4/scratchpad; HB=claude/cung-tuong-mong-handover-hj0h8w; W=/home/user/wt/lc32-h
for i in 1 2 3 4 5; do
 flock /home/user/wt/fetch.lock git -C /home/user/cung-tuong-mong fetch -q --depth=30 origin +refs/heads/$HB:refs/remotes/origin/handover || { sleep 5; continue; }
 if [ ! -d $W ]; then git -C /home/user/cung-tuong-mong worktree add -q --no-checkout --detach $W origin/handover; git -C $W sparse-checkout set --no-cone '/dev/handover/'; fi
 cd $W; git checkout -q --detach origin/handover -f
 cp $S/lc32.md dev/handover/reports/land-chain-32.md; mkdir -p dev/handover/reports/lc32-tools; cp $S/build.sh $S/asmunion.py $S/d3line.py $S/both.py $S/charmerge.py $S/hpush.sh dev/handover/reports/lc32-tools/; git add dev/handover/reports/lc32-tools
 [ -f $S/st.txt ] && cat $S/st.txt >> dev/handover/MAIN_STATUS.md
 git add dev/handover/reports/land-chain-32.md dev/handover/MAIN_STATUS.md
 git -c user.name=LC32 -c user.email=noreply@anthropic.com commit -q --no-verify -m "LC32: $1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Rc5AsKtJmn2L1UVTbDsRz8"
 if git push -q origin HEAD:refs/heads/$HB 2>/dev/null; then rm -f $S/st.txt; echo pushed $(git rev-parse --short HEAD); exit 0; fi
 sleep $((i*3))
done; echo PUSH FAILED; exit 1
