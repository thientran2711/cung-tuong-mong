#!/bin/sh
# FF main to HEAD of live worktree if origin/main is HEAD^2 (merge) or HEAD's ancestor-parent
cd /home/user/wt/live && flock /home/user/wt/fetch.lock sh -c 'git fetch -q --depth=30 origin main; M=$(git rev-parse origin/main); P2=$(git rev-parse -q --verify HEAD^2); if [ "$M" = "$P2" ] || [ "$M" = "$(git rev-parse HEAD^1)" ]; then git push -q origin HEAD:refs/heads/main && echo FF-OK $(git rev-parse --short HEAD); else echo MAIN-MOVED $(git rev-parse --short origin/main); fi'
