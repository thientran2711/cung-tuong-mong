# pub.sh "message" : copy tools/ledgers to dev/figwork, validate, commit img+figwork, pull --rebase, push
S=/tmp/claude-0/-home-user-cung-tuong-mong/84f333ce-ebd1-5e4a-9b0c-43035da11b67/scratchpad/figwork
cd /home/user/cung-tuong-mong || exit 1
for f in $S/*; do [ -f "$f" ] && case "$(basename $f)" in _*) ;; *) cp "$f" dev/figwork/;; esac; done
python3 -m json.tool img/FIGURES.json >/dev/null || { echo INVALID JSON; exit 1; }
git add img/ dev/figwork/ && git commit -q -m "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Rc5AsMxVMCFH4VbUPpPfpt" && git pull -q --rebase --autostash origin main && git push -q origin main
git log --oneline -1
