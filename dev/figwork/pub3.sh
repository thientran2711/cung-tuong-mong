# pub3.sh "message" : (owner review gate) commit img figures + dev/figwork from the art worktree scratchpad/wt-art7 and push to review/consort-art (never main, never the shared checkout)
S=/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad
W=$S/wt-art7; B=review/consort-art
cd $W || exit 1
for f in $S/figwork/*; do [ -f "$f" ] && case "$(basename $f)" in _*) ;; *) cp "$f" dev/figwork/;; esac; done
python3 -m json.tool img/FIGURES.json >/dev/null || { echo INVALID JSON; exit 1; }
git add img/ dev/figwork/ && git commit -q -m "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Rc5AsLPQEe167UjGtvecD3"
git fetch -q origin $B && git rebase -q origin/$B || { echo REBASE FAIL; exit 1; }
git push -q origin art7:$B && git log --oneline -1
