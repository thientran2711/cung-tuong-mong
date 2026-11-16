#!/bin/bash
# SELF-TEST of the go-live gate (go-live kit; run when tier.js says 'go-live gate'). Nothing touches the real origin.
# usage: bash dev/tools/gate-selftest.sh <live main sha> <READY sha that contains it> [--perf]
#   rollback / golive on a SCRATCH origin (bare repo sharing this clone's objects, no copy):
#     A  first go-live: golive.sh tags the OLD main (…-baseline) BEFORE pushing; then `rollback.sh previous` (dry) -> the old main
#     A2 same without any tag (tags deleted): fallback = main's build line CTM_BI.h[0] -> the old main again
#     B  `rollback.sh previous --yes`: new commit on top (FF, no force), files == old main, the bad build stays an ancestor
#     C  `previous` again after B: never toggles forward to the rolled-away build (STOP or an older build)
#     D  a newer go-live on top of the rollback, then `previous` (dry) -> the rollback build (normal tagged rollback)
#     E  bad targets refused: a kit-branch commit inside main's history that never was live (the r1 blocker: it does not contain
#        the old main), and a commit that is not on main at all
#   every push is checked: old main must be an ancestor of new main (nothing lost, no force).
#   quickcheck is replaced by a stub INSIDE the scratch clone only (the browser check is proven separately with --perf).
#   --perf: quickcheck on the READY sha normally (must PASS) and with --inject-render-ms 250 (must FAIL on render/tab).
set -u
OLD=${1:?usage: gate-selftest.sh <live main sha> <READY sha> [--perf]}; NEW=${2:?READY sha}; PERF=${3:-}
TOP=$(git rev-parse --show-toplevel); OBJ=$(cd "$(git rev-parse --git-common-dir)" && pwd)/objects
OLD=$(git rev-parse "$OLD^{commit}"); NEW=$(git rev-parse "$NEW^{commit}")
D=$(mktemp -d /home/user/wt/gate-selftest-XXXX); trap 'rm -rf "$D"' EXIT
P=0; F=0; ok(){ echo "  PASS $*"; P=$((P+1)); }; bad(){ echo "  FAIL $*"; F=$((F+1)); }
mkrepo(){ git init -q $1 "$2"; local g; [ "$1" = --bare ] && g=$2 || g=$2/.git; echo "$OBJ" > $g/objects/info/alternates
  [ -f "$(git rev-parse --git-common-dir)/shallow" ] && cp "$(git rev-parse --git-common-dir)/shallow" $g/shallow; true; }
mkrepo --bare "$D/o.git"; git -C "$D/o.git" update-ref refs/heads/main "$OLD"
mkrepo "" "$D/w"; cd "$D/w"; git remote add origin "$D/o.git"; git config user.email gate@selftest; git config user.name gate-selftest
git sparse-checkout set --no-cone '/dev/tools/' '/dev/site/' '/dev/test/lib/' '/index.html' >/dev/null 2>&1
git fetch -q origin main:refs/remotes/origin/main; git checkout -q --detach "$NEW"
printf '#!/bin/bash\necho "QUICKCHECK PASS · (stub in gate-selftest scratch clone)"\n' > dev/tools/quickcheck.sh   # scratch only
om(){ git -C "$D/o.git" rev-parse main; }
push_ok(){ local a=$1 b; b=$(om); git -C "$D/o.git" merge-base --is-ancestor "$a" "$b" && ok "push FF: ${a:0:8} is an ancestor of new main ${b:0:8}" || bad "main ${a:0:8} -> ${b:0:8} is NOT fast-forward"; }
tgt(){ sed -n 's/^target \([0-9a-f]\{8\}\).*/\1/p' "$1"; }
echo "== A first go-live of ${NEW:0:8} on main ${OLD:0:8}, then rollback previous (dry)"
bash dev/tools/golive.sh "$NEW" --yes > "$D/A.log" 2>&1; tail -3 "$D/A.log" | sed 's/^/    /'
[ "$(om)" = "$NEW" ] && ok "main == ${NEW:0:8}" || bad "main is $(om)"; push_ok "$OLD"
git -C "$D/o.git" tag -l 'live/*-baseline' --points-at "$OLD" | grep -q . && ok "baseline tag on old main ${OLD:0:8} (made before the push)" || bad "no baseline tag on old main"
bash dev/tools/rollback.sh previous > "$D/A2.log" 2>&1; sed 's/^/    /' "$D/A2.log" | head -12
[ "$(tgt "$D/A2.log")" = "${OLD:0:8}" ] && ok "previous -> old main ${OLD:0:8}" || bad "previous -> $(tgt "$D/A2.log") (want ${OLD:0:8})"
grep -q "^dry run" "$D/A2.log" && [ "$(om)" = "$NEW" ] && ok "dry run changed nothing" || bad "dry run moved main"
echo "== A2 same with NO live/* tags (fallback: CTM_BI.h[0] of main)"
for t in $(git tag -l 'live/*'); do git tag -d "$t" >/dev/null; git push -q origin ":refs/tags/$t"; done
bash dev/tools/rollback.sh previous > "$D/A3.log" 2>&1; grep -E "^target|STOP" "$D/A3.log" | sed 's/^/    /'
if [ "$(tgt "$D/A3.log")" = "${OLD:0:8}" ]; then ok "no tags: previous -> old main ${OLD:0:8} (build line)"; elif grep -q "^STOP" "$D/A3.log"; then ok "no tags: STOP asking for a sha (safe)"; else bad "no tags: previous -> $(tgt "$D/A3.log")"; fi
git tag -a "live/20000101-000000-${OLD:0:8}-baseline" "$OLD" -m baseline; git tag -a "live/20000101-000001-${NEW:0:8}" "$NEW" -m new; git push -q origin --tags
echo "== B rollback previous --yes"
bash dev/tools/rollback.sh previous --yes > "$D/B.log" 2>&1; tail -2 "$D/B.log" | sed 's/^/    /'
C=$(om); push_ok "$NEW"
[ "$(git rev-parse "$C^{tree}")" = "$(git rev-parse "$OLD^{tree}")" ] && ok "main ${C:0:8} has exactly the files of ${OLD:0:8}" || bad "rollback tree differs from old main"
[ "$(git -C "$D/o.git" rev-parse "$C^")" = "$NEW" ] && ok "rollback commit sits on top of ${NEW:0:8} (history kept)" || bad "rollback parent wrong"
echo "== C previous again (must not toggle forward to ${NEW:0:8})"
sleep 1; bash dev/tools/rollback.sh previous > "$D/C.log" 2>&1; grep -E "skip|^target|STOP" "$D/C.log" | sed 's/^/    /'
c=$(tgt "$D/C.log"); if [ "$c" = "${NEW:0:8}" ]; then bad "toggled forward to the rolled-away build"; elif [ -z "$c" ] && grep -q "^STOP" "$D/C.log"; then ok "STOP (no older build) - no toggle"; elif git merge-base --is-ancestor "$c" "$OLD" 2>/dev/null; then ok "older build $c - no toggle"; else bad "unexpected target $c"; fi
echo "== D a newer build goes live on top of the rollback, then previous (dry)"
git checkout -q -f --detach "$C"; echo "<!-- gate-selftest $(date +%s) -->" >> index.html; git -c core.hooksPath=/dev/null commit -q -am "selftest: newer build"; N2=$(git rev-parse HEAD)
git checkout -q -f --detach "$NEW"; printf '#!/bin/bash\necho "QUICKCHECK PASS · (stub)"\n' > dev/tools/quickcheck.sh
sleep 1; bash dev/tools/golive.sh "$N2" --yes > "$D/D.log" 2>&1; tail -1 "$D/D.log" | sed 's/^/    /'; push_ok "$C"
bash dev/tools/rollback.sh previous > "$D/D2.log" 2>&1; grep -E "^target|STOP" "$D/D2.log" | sed 's/^/    /'
[ "$(tgt "$D/D2.log")" = "${C:0:8}" ] && ok "previous -> the rollback build ${C:0:8}" || bad "previous -> $(tgt "$D/D2.log") (want ${C:0:8})"
echo "== E bad targets are refused"
BADC=$(git rev-list "$OLD..$NEW" --no-merges | tail -1)   # a kit branch commit that does not contain old main
for x in "$BADC" "$(git commit-tree "$OLD^{tree}" -m stray)"; do
  bash dev/tools/rollback.sh "$x" --yes > "$D/E.log" 2>&1; grep -q "Refused" "$D/E.log" && [ "$(om)" = "$N2" ] && ok "refused ${x:0:8}: $(grep -o 'not [a-z ]*\(ancestor of live main\|known live build\)' "$D/E.log" | head -1); main unchanged" || { bad "${x:0:8} not refused"; tail -3 "$D/E.log"; }; done
git -C "$D/o.git" for-each-ref --format='%(refname:short) %(objectname:short=8)' refs/tags | sed 's/^/    tag /'
cd "$TOP"
if [ "$PERF" = "--perf" ]; then echo "== perf gate: quickcheck ${NEW:0:8} normal (must PASS) and +250 ms per render() (must FAIL)"
  bash dev/tools/quickcheck.sh "$NEW" > "$D/q1.log" 2>&1; r1=$?; tail -1 "$D/q1.log" | sed 's/^/    /'; [ $r1 = 0 ] && ok "normal noise PASS" || bad "normal run FAILED"
  bash dev/tools/quickcheck.sh "$NEW" --inject-render-ms 250 > "$D/q2.log" 2>&1; r2=$?; tail -1 "$D/q2.log" | sed 's/^/    /'
  [ $r2 != 0 ] && grep -q "renderMs\|tabMs" "$D/q2.log" && ok "+250 ms render FAILS (render/tab gate)" || bad "+250 ms render not caught"; fi
echo "GATE SELF-TEST: $P passed, $F failed"; [ $F = 0 ]
