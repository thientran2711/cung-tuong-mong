#!/bin/bash
# cont.sh topic "change" "note" swap test...   (finish a self-merge after a hand-resolved conflict; push if all green)
set -o pipefail
T=$1; CH=$2; NOTE=$3; SW=$4; shift 4; cd /home/user/wt/live
python3 dev/build/assemble.py >/dev/null && CTM_CHANGE="$CH" bash dev/site/build_site.sh >/dev/null 2>&1 || { echo BUILD-FAIL; exit 1; }
git add -A index.html sw.js assets.json
git commit -qm "SELF-MERGE LAND $T: merge LIVE $(git rev-parse --short origin/main) ($NOTE; index.html/sw.js rebuilt)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/<YOUR SESSION ID>" || { echo COMMIT-FAIL; exit 1; }
H=$(git rev-parse HEAD)
for t in "$@"; do echo "== $t"; timeout 900 sh -c "node $t" 2>&1 | tail -3 || { echo "TESTFAIL $t"; exit 1; }; done
G=$(timeout 1500 bash dev/tools/golive.sh $H 2>&1 | grep -E "QUICKCHECK PASS.*total|checks OK|FAIL" | tail -3); echo "$G"
if echo "$G" | grep -q 'QUICKCHECK FAIL' && echo "$G" | grep -q 'core gates PASS'; then echo RETRY-perf; G=$(timeout 1500 bash dev/tools/golive.sh $H 2>&1 | grep -E "QUICKCHECK PASS.*total|checks OK|FAIL" | tail -3); echo "$G"; fi
echo "$G" | grep -q 'checks OK' || { echo QC-FAIL; exit 1; }
timeout 1500 node dev/test/coop-e2e.js /tmp/e2e-$T > ../e2e-$T.log 2>&1; R=$(grep -E '^[0-9]+/[0-9]+ passed' ../e2e-$T.log|tail -1); echo "e2e: $R"; echo "$R" | grep -qE "^([0-9]+)/\1 passed" || { echo E2E-FAIL; exit 1; }
if [ "$SW" = 1 ]; then COOP_SWAP=1 timeout 1500 node dev/test/coop-e2e.js /tmp/e2e-$T-s > ../e2e-$T-s.log 2>&1; R=$(grep -E '^[0-9]+/[0-9]+ passed' ../e2e-$T-s.log|tail -1); echo "e2e SWAP: $R"; echo "$R" | grep -qE "^([0-9]+)/\1 passed" || { echo E2E-FAIL; exit 1; }; fi
flock /home/user/wt/fetch.lock git fetch -q --depth=30 origin main
git merge-base --is-ancestor origin/main $H && git push -q origin $H:refs/heads/main && echo "LANDED $T $H" || echo "PUSHFAIL $T"
