# pub.sh "msg" : copy changed out/fig-*.webp into worktree img/, remake their por (porcrop), copy tools to dev/figwork/maidC/age1114/, commit + push
S=/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/agC
W=/home/user/cung-tuong-mong/.claude/worktrees/agent-a7a7268489937d5f2
cd $S
CH=""
for f in out/fig-maid-*.webp; do b=$(basename $f); cmp -s $f $W/img/$b || { cp $f $W/img/$b; CH="$CH $W/img/$b"; }; done
echo "changed: $(echo $CH | wc -w)"
[ -n "$CH" ] && python3 $W/dev/figwork/maidC/porcrop.py $CH 2>&1 | grep -vi "^eyes\|^face\|^ok\|wrote" | tail -3
T=$W/dev/figwork/maidC/age1114; mkdir -p $T
cp ag.py tx.py run.sh pub.sh fh.py log.txt notes.txt $T/ 2>/dev/null
cd $W && git add img dev/figwork && git commit -q -m "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01V1ZZH4TC8cGXxdYrwHpFqQ" && git log --oneline -1
for i in 1 2 3; do git push -q -u origin review/maid-art-c && break; sleep 5; done
