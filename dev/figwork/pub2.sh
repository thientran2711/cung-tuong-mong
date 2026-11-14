# pub2.sh "message" : (owner review gate) push to branch review/consort-art, NOT main; publish img figures + dev/figwork via a separate clean worktree (never touches the shared checkout's index/stash)
S=/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad
M=/home/user/cung-tuong-mong; W=$S/wt
for f in $S/figwork/*; do [ -f "$f" ] && case "$(basename $f)" in _*) ;; *) cp "$f" $M/dev/figwork/;; esac; done
python3 -m json.tool $M/img/FIGURES.json >/dev/null || { echo INVALID JSON; exit 1; }
cd $W || exit 1
B=review/consort-art
git fetch -q origin main; if git fetch -q origin $B 2>/dev/null; then git checkout -q --detach origin/$B; else git checkout -q --detach origin/main; fi || exit 1
cp $M/img/fig-consort-*.webp $M/img/por-consort-*.webp $M/img/FIGURES.json img/ 2>/dev/null
cp $M/img/fig-player-*.webp $M/img/por-player-*.webp img/ 2>/dev/null
cp $M/dev/figwork/* dev/figwork/ 2>/dev/null
python3 -m json.tool img/FIGURES.json >/dev/null || { echo INVALID JSON; exit 1; }
git add img/ dev/figwork/ && git commit -q -m "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Rc5AsLPQEe167UjGtvecD3" && git push -q origin HEAD:refs/heads/$B
git log --oneline -1
