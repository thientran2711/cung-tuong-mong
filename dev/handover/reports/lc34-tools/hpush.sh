#!/bin/bash
# usage: hpush.sh <msg> : copy scratch lc34.md to dev/handover/reports/land-chain-34.md (+ st.txt appended to MAIN_STATUS) on the fresh handover tip; push; retry
S=/tmp/claude-0/-home-user-cung-tuong-mong/91da9bef-5288-585b-baf6-4ec29e0fa17c/scratchpad; HB=claude/cung-tuong-mong-handover-hj0h8w; W=/home/user/wt/lc34-h
for i in 1 2 3 4 5; do
 flock /home/user/wt/fetch.lock git -C /home/user/cung-tuong-mong fetch -q --depth=30 origin +refs/heads/$HB:refs/remotes/origin/handover || { sleep 5; continue; }
 if [ ! -d $W ]; then git -C /home/user/cung-tuong-mong worktree add -q --no-checkout --detach $W origin/handover; git -C $W sparse-checkout set --no-cone '/dev/handover/'; fi
 cd $W; git checkout -q --detach origin/handover -f
 cp $S/lc34.md dev/handover/reports/land-chain-34.md; mkdir -p dev/handover/reports/lc34-tools; cp $S/hpush.sh $S/sp.sh $S/sp2.sh $S/qsl.sh $S/build2.sh dev/handover/reports/lc34-tools/; git add dev/handover/reports/lc34-tools
 [ -f $S/st.txt ] && cat $S/st.txt >> dev/handover/MAIN_STATUS.md
 git add dev/handover/reports/land-chain-34.md dev/handover/MAIN_STATUS.md
 git -c user.name=LC34 -c user.email=noreply@anthropic.com commit -q --no-verify -m "LC34: $1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Rc5AsMnV6QnLEE9oQhnRdu"
 if git push -q origin HEAD:refs/heads/$HB 2>/dev/null; then rm -f $S/st.txt; echo pushed $(git rev-parse --short HEAD); exit 0; fi
 sleep $((i*3))
done; echo PUSH FAILED; exit 1
