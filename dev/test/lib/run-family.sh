#!/bin/bash
# Runs the roulette-family tests at one viewport and prints one verdict line per test.
# usage: run-family.sh [WxH@dpr]   (needs: python3 -m http.server 8765 from the repo root)
B=http://localhost:8765/index.html; SZ=${1:-755x1000@1}; O=${OUT:-/tmp/tdr-out}; mkdir -p $O
cd "$(dirname "$0")/../../.."
run(){ n=$1; shift; s=$(date +%s); timeout 480 node "$@" >$O/$n.log 2>&1; rc=$?; e=$(( $(date +%s)-s ))
  bad=$(grep -ciE "FAIL|pageerror|did not|intercept|TimeoutError|Error:" $O/$n.log)
  v=PASS; [ $rc -ne 0 ] && v=FAIL; [ "$bad" -gt 0 ] && [ $rc -eq 0 ] && v="FAIL?($bad)"
  echo "$n,rc=$rc,$v,${e}s"; }
run podium dev/test/podium.js $B $SZ $O &
run minigames dev/test/minigames.js $B $SZ $O &
wait
run minigames-j71 dev/test/minigames-j71.js $B $SZ $O &
run inv-grade dev/test/inv-grade.js $B $SZ $O t1 &
wait
run toilette dev/test/toilette.js $B $SZ $O &
run mk-e2e dev/test/mk-e2e.js $B $SZ $O &
wait
run tutorial dev/test/tutorial.js $B $SZ $O t1 tour,skip,replay &
wait
