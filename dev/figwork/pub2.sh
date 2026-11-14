# pub2.sh "message" : publish img figures + dev/figwork via a separate clean worktree (never touches the shared checkout's index/stash)
S=/tmp/claude-0/-home-user-cung-tuong-mong/84f333ce-ebd1-5e4a-9b0c-43035da11b67/scratchpad
M=/home/user/cung-tuong-mong; W=$S/wt
for f in $S/figwork/*; do [ -f "$f" ] && case "$(basename $f)" in _*) ;; *) cp "$f" $M/dev/figwork/;; esac; done
python3 -m json.tool $M/img/FIGURES.json >/dev/null || { echo INVALID JSON; exit 1; }
cd $W || exit 1
git fetch -q origin main && git checkout -q --detach origin/main || exit 1
cp $M/img/fig-consort-*.webp $M/img/por-consort-*.webp $M/img/FIGURES.json img/ 2>/dev/null
cp $M/img/fig-player-*.webp $M/img/por-player-*.webp img/ 2>/dev/null
cp $M/dev/figwork/* dev/figwork/ 2>/dev/null
python3 -m json.tool img/FIGURES.json >/dev/null || { echo INVALID JSON; exit 1; }
git add img/ dev/figwork/ && git commit -q -m "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Rc5AsMxVMCFH4VbUPpPfpt" && git push -q origin HEAD:main
git log --oneline -1
