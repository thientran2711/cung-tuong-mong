#!/bin/bash
# landq.sh queuefile : lines "branch|sha|topic|change". Lands sequentially; perf-only quickcheck FAIL retried once; stops at first real failure.
Q=$1
while IFS='|' read -r BR SHA T CH; do
  [ -z "$BR" ] && continue
  L=/home/user/wt/sland-$T.log
  for try in 1 2; do
    bash /home/user/wt/sland.sh "$BR" "$SHA" "$T" "$CH" > $L 2>&1
    if grep -q 'QUICKCHECK FAIL' $L && grep -q 'core gates PASS' $L && grep -q 'perf:' $L && [ $try = 1 ]; then echo "RETRY $T (perf-only)"; continue; fi
    break
  done
  H=$(grep '^HEAD ' $L | awk '{print $2}')
  E2E=ok; if grep -q "QUICKCHECK PASS" $L; then (cd /home/user/wt/live && timeout 1500 node dev/test/coop-e2e.js /tmp/e2e-$T > /home/user/wt/e2e-$T.log 2>&1); R=$(grep -E "^[0-9]+/[0-9]+ passed" /home/user/wt/e2e-$T.log | tail -1); echo "$R" | grep -qE "^([0-9]+)/\1 passed" || E2E=fail; echo "coop-e2e $T: ${R:-none}"; fi
  if grep -q 'QUICKCHECK PASS' $L && grep -q "checks OK" $L && [ -n "$H" ] && [ $E2E = ok ]; then
    cd /home/user/wt/live && flock /home/user/wt/fetch.lock git fetch -q --depth=30 origin main
    if git merge-base --is-ancestor origin/main $H && git push -q origin $H:refs/heads/main; then echo "LANDED $T $H"; else echo "PUSHFAIL $T $H"; exit 1; fi
  else echo "FAIL $T (see $L)"; grep -E 'CONFLICT|FAIL' $L | head -3; exit 1; fi
done < $Q
echo QUEUE DONE
