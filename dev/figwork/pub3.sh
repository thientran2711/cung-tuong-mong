# pub3.sh "message" : (owner review gate) commit img figures + dev/figwork from the art worktree scratchpad/wt-art3 and push to review/consort-art (never main, never the shared checkout)
S=/tmp/claude-0/-home-user-cung-tuong-mong/84f333ce-ebd1-5e4a-9b0c-43035da11b67/scratchpad
W=$S/wt-art3; B=review/consort-art
cd $W || exit 1
for f in $S/figwork/*; do [ -f "$f" ] && case "$(basename $f)" in _*) ;; *) cp "$f" dev/figwork/;; esac; done
python3 -m json.tool img/FIGURES.json >/dev/null || { echo INVALID JSON; exit 1; }
git add img/ dev/figwork/ && git commit -q -m "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Rc5AsMxVMCFH4VbUPpPfpt"
git fetch -q origin $B && git rebase -q origin/$B || { echo REBASE FAIL; exit 1; }
git push -q origin HEAD:refs/heads/$B && git log --oneline -1
