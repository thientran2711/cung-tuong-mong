#!/bin/sh
# usage: hpush.sh "commit msg"  (run after edits in /home/user/wt/ho; union-resolves rebase conflicts)
cd /home/user/wt/ho || exit 1
B=claude/cung-tuong-mong-handover-hj0h8w
git add -A dev && git commit -qm "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/<YOUR SESSION ID>" || true
for i in 1 2 3 4 5; do
  flock /home/user/wt/fetch.lock git fetch -q --depth=30 origin $B
  if ! git rebase -q origin/$B 2>/dev/null; then
    while true; do
      for f in $(git diff --name-only --diff-filter=U); do sed -i '/^<<<<<<< /d;/^=======$/d;/^>>>>>>> /d' "$f"; git add "$f"; done
      GIT_EDITOR=true git rebase --continue >/dev/null 2>&1 && break
      git diff --name-only --diff-filter=U | grep -q . || { git rebase --skip >/dev/null 2>&1 || break; }
      git status | grep -q "rebase in progress" || break
    done
  fi
  git push -q origin HEAD:$B && { echo PUSHED $(git rev-parse --short HEAD); exit 0; }
  sleep $((i*3))
done
echo PUSH FAILED; exit 1
