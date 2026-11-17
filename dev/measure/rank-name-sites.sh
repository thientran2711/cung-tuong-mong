#!/bin/sh
# rank-name-sites: static list of every SOURCE place that prints a rank and/or a name, grouped by the kit form it uses (kit-rank-name, owner 17/11 ~16:20Z item b).
# usage: sh dev/measure/rank-name-sites.sh   (run from the repo root)  — prints "form | file:count" lines, then the home-made leftovers that must go through kitRankName.
cd "$(dirname "$0")/../build" || exit 1
f() { printf '%-34s' "$1"; shift; grep -c "$@" j*.js | grep -v ':0$' | sed 's/\.js:/:/' | tr '\n' ' '; echo; }
echo "== STACK (kit form 1: title / rank / name) =="
f "kitRankName(stack) / kitNameRank(" -e 'kitNameRank(\|kitRankName('
f "pcHead (person card header)" -e 'pcHead('
f "kszRankName (frame / pendant tag)" -e 'kszRankName('
f "figure foot .j59t/.j59n" -e 'class="j59t"'
echo "== ONE LINE (kit form 2: rank name; result lines + Tuần lục only) =="
f "kitName(" -e 'kitName('
f "kitTitled(" -e 'kitTitled('
echo "== HOME-MADE rank+name concatenations (must use kitRankName / kitName) =="
f 'RANKS[..].n + name' -e 'RANKS\[[^]]*\]\.n}\? \${[^}]*name'
f 'rkName(..) + name' -e 'rkName([^)]*)} \${[^}]*name'
