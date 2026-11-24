#!/bin/bash
# landq2.sh queuefile : lines "branch|sha|topic|change|test1;test2|swap(0/1)". Stops at first failure. Pushes FF only when all gates pass.
Q=$1
while IFS='|' read -r BR SHA T CH TS SW; do
  [ -z "$BR" ] && continue
  git -C /home/user/wt/live fetch -q --depth=30 origin main; if git -C /home/user/wt/live merge-base --is-ancestor $SHA origin/main 2>/dev/null; then echo "SKIP $T (already in main)"; continue; fi
  IFS=';' read -ra TA <<< "$TS"; L=/home/user/wt/sland-$T.log
  bash /home/user/wt/sland.sh "$BR" "$SHA" "$T" "$CH" "${TA[@]}" > $L 2>&1
  H=$(grep '^HEAD ' $L | awk '{print $2}')
  if grep -q 'QUICKCHECK FAIL' $L && grep -q 'core gates PASS' $L && grep -q 'perf:' $L && [ -n "$H" ]; then echo "RETRY quickcheck $T (perf-only)"; (cd /home/user/wt/live && timeout 1500 bash dev/tools/golive.sh $H 2>&1 | grep -E "QUICKCHECK PASS.*total|checks OK|FAIL" | tail -3) >> $L; fi
  grep -q '^TESTFAIL' $L && { echo "FAIL $T tests"; grep TESTFAIL $L; exit 1; }
  grep -q 'QUICKCHECK PASS' $L && grep -q 'checks OK' $L && [ -n "$H" ] || { echo "FAIL $T (see $L)"; grep -E 'CONFLICT|FAIL' $L | head -3; exit 1; }
  cd /home/user/wt/live
  timeout 1500 node dev/test/coop-e2e.js /tmp/e2e-$T > /home/user/wt/e2e-$T.log 2>&1; R=$(grep -E "^[0-9]+/[0-9]+ passed" /home/user/wt/e2e-$T.log|tail -1); echo "coop-e2e $T: ${R:-none}"
  echo "$R" | grep -qE "^([0-9]+)/\1 passed" || { echo "FAIL $T e2e"; exit 1; }
  if [ "$SW" = 1 ]; then COOP_SWAP=1 timeout 1500 node dev/test/coop-e2e.js /tmp/e2e-$T-s > /home/user/wt/e2e-$T-s.log 2>&1; R=$(grep -E "^[0-9]+/[0-9]+ passed" /home/user/wt/e2e-$T-s.log|tail -1); echo "coop-e2e SWAP $T: ${R:-none}"; echo "$R" | grep -qE "^([0-9]+)/\1 passed" || { echo "FAIL $T e2e swap"; exit 1; }; fi
  flock /home/user/wt/fetch.lock git fetch -q --depth=30 origin main
  if git merge-base --is-ancestor origin/main $H && git push -q origin $H:refs/heads/main; then echo "LANDED $T $H"; else echo "PUSHFAIL $T $H"; exit 1; fi
  cd /home/user/wt
done < $Q
echo QUEUE DONE
