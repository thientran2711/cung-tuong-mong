#!/bin/bash
# bash dev/site/hooks/install.sh : point this clone's git hooks at dev/site/hooks (worktrees share the setting)
R=$(git rev-parse --show-toplevel) || exit 1
chmod +x "$R/dev/site/hooks/pre-commit"
git -C "$R" config core.hooksPath dev/site/hooks && echo "hooks installed: core.hooksPath=dev/site/hooks"
