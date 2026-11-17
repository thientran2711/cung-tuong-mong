#!/bin/sh
# PRIORITY RULE #1 check (owner OD:L5 + 17/11 GATE ZERO). Usage: sh dev/tools/prio1.sh "word1|word2|..."
# Run from a worktree of the handover branch. Prints hits in owner rulings, ledger, claims, live main code and review/* branches.
# Paste its summary line as the first line of every brief / order / report and in the chat to the owner.
P="$1"; [ -z "$P" ] && { echo "usage: prio1.sh 'regex'"; exit 2; }
L=/home/user/wt/fetch.lock; [ -f $L ] || touch $L
flock $L git fetch -q --depth=30 origin +main:refs/remotes/origin/main 2>/dev/null
OD=$(grep -n -i -E "$P" dev/OWNER_DECISIONS.md | cut -c1-160); LG=$(grep -n -i -E "$P" dev/handover/OWNER_LEDGER.md | cut -c1-160)
CL=$(grep -n -i -E "$P" dev/handover/CLAIMS.md dev/handover/FOREMAN_*_STATUS.md | tail -8 | cut -c1-160)
MA=$(git grep -n -i -E "$P" origin/main -- 'dev/build/j*.js' 'dev/kit/*.md' 2>/dev/null | cut -c1-160 | head -15)
RB=$(git ls-remote origin 'refs/heads/review/*' | awk '{print $2}' | sed 's#refs/heads/##' | grep -i -E "$P" | head -10)
echo "== OWNER_DECISIONS"; echo "$OD" | tail -10; echo "== OWNER_LEDGER"; echo "$LG" | tail -6
echo "== CLAIMS/STATUS"; echo "$CL"; echo "== MAIN code/kit"; echo "$MA"; echo "== review/* branch names"; echo "$RB"
n(){ [ -z "$1" ] && echo 0 || echo "$1" | wc -l; }
echo "PRIORITY #1 CHECK ('$P'): OD $(n "$OD") | ledger $(n "$LG") | claims $(n "$CL") | main $(n "$MA") | review/* $(n "$RB")"
