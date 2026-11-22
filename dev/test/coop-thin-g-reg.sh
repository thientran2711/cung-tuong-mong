#!/bin/bash
# coop-thin G regression lane (worker #1): copy kept in the repo so a successor in a new container has it; logs to /home/user/wt/ctg-out
# coop-thin G regression lane: each suite -> its own log, one summary line each in reg-sum.txt
cd ${WT:-/home/user/wt/ctg}; W=${W:-http://127.0.0.1:8787}; O=${O:-/home/user/wt/ctg-out}; mkdir -p $O; SUM=$O/reg-sum.txt  # WT / W / O env (coop-thin-g-f1 #7)
run(){ local name=$1; shift; local t0=$(date +%s); timeout 1500 "$@" > $O/r-$name.log 2>&1; local rc=$?; local last=$(grep -E "^[a-z0-9 -]+ [0-9]+/[0-9]+|ALL OK|PASS|FAIL:|passed|failed" $O/r-$name.log | tail -1 | cut -c1-160); local nf=$(grep -c "^FAIL" $O/r-$name.log); echo "$name rc=$rc fails=$nf $(( $(date +%s)-t0 ))s :: $last" >> $SUM; }
for x in "$@"; do case $x in
 g4) run g4 env WEEKS=4 node dev/test/coop-thin-g.js $W 13 0;;
 g4s) run g4s env WEEKS=4 node dev/test/coop-thin-g.js $W 13 1;;
 gup) run gup env UP=1 WEEKS=2 node dev/test/coop-thin-g.js $W 13 0;;
 a) run a node dev/test/coop-thin-a.js $W 13 0;; as) run as node dev/test/coop-thin-a.js $W 13 1;;
 b) run b node dev/test/coop-thin-b.js $W 13 0;; bs) run bs node dev/test/coop-thin-b.js $W 13 1;;
 c) run c node dev/test/coop-thin-c.js $W 13 0;; cs) run cs node dev/test/coop-thin-c.js $W 13 1;;
 d) run d node dev/test/coop-thin-d.js $W 13 0;; ds) run ds node dev/test/coop-thin-d.js $W 13 1;;
 e) run e node dev/test/coop-thin-e.js $W 13 0;; es) run es node dev/test/coop-thin-e.js $W 13 1;;
 f1) run f1 node dev/test/coop-thin-f1.js $W 13 0;; f1s) run f1s node dev/test/coop-thin-f1.js $W 13 1;;
 f2) run f2 node dev/test/coop-thin-f2.js $W 13 0;; f2s) run f2s node dev/test/coop-thin-f2.js $W 13 1;;
 f3) run f3 node dev/test/coop-thin-f3.js $W 13 0;; f3s) run f3s node dev/test/coop-thin-f3.js $W 13 1;;
 f4) run f4 node dev/test/coop-thin-f4.js $W 13 0;; f4s) run f4s node dev/test/coop-thin-f4.js $W 13 1;;
 f5) run f5 node dev/test/coop-thin-f5.js $W 13 0;; f5s) run f5s node dev/test/coop-thin-f5.js $W 13 1;;
 f6) run f6 node dev/test/coop-thin-f6.js $W 13 0;; f6s) run f6s node dev/test/coop-thin-f6.js $W 13 1;;
 f6b) run f6b node dev/test/coop-thin-f6b.js $W 13 0;; f6bs) run f6bs node dev/test/coop-thin-f6b.js $W 13 1;;
 hn) run hn node dev/test/coop-thin-hostnull.js $W 13 0;;
 e2e) run e2e env THIN=13 node dev/test/coop-e2e.js $O/e2e $W;; e2es) run e2es env THIN=13 COOP_SWAP=1 node dev/test/coop-e2e.js $O/e2es $W;;
 e2e0) run e2e0 node dev/test/coop-e2e.js $O/e2e0 $W;;
 night) run night env THIN=13 node dev/test/coop-night.js $O/night $W;;
 timer) run timer env THIN=13 node dev/test/coop-timer.js $O/timer $W;;
 cyc) run cyc env THIN=13 node dev/test/coop-cyc.js $O/cyc $W;; cycs) run cycs env THIN=13 COOP_SWAP=1 node dev/test/coop-cyc.js $O/cycs $W;;
 trip0) run trip0 env TRIP=1 WEEKS=36 node dev/test/coop-thin-g.js $W 13 0;; trip1) run trip1 env TRIP=1 WEEKS=36 node dev/test/coop-thin-g.js $W 13 1;;
 trip0b) run trip0b env TRIP=1 WEEKS=36 node dev/test/coop-thin-g.js $W 13 0;; trip1b) run trip1b env TRIP=1 WEEKS=36 node dev/test/coop-thin-g.js $W 13 1;;
 e2e0s) run e2e0s env COOP_SWAP=1 node dev/test/coop-e2e.js $O/e2e0s $W;; e2e0n) run e2e0n env COOP_NC_FORCE=1 node dev/test/coop-e2e.js $O/e2e0n $W;;
 as9) run as9 node dev/test/coop-arrive-see.js $W 9 0;; as9s) run as9s node dev/test/coop-arrive-see.js $W 9 1;;
 as13) run as13 node dev/test/coop-arrive-see.js $W 13 0;; as13s) run as13s node dev/test/coop-arrive-see.js $W 13 1;;
 emo) run emo node dev/test/coop-emo-seat.js $O/emo $W;; perf) run perf env CPU=4 MONTH=1 node dev/test/coop-thin-g-perf.js $W 13;;
 bl) for s in 1 2 3 4 5 6; do run bl$s node dev/test/bongloc-coop.js $W 13; done;; blc) for s in 1 2 3; do run blc$s node dev/test/bongloc-coop-catch.js $W; done;;
 wlag) run wlag node dev/test/coop-week-lag.js $W 13;;
 ow) for s in 1 2 3 4 5 6 7 8 9 10; do run ow$s env SEED=$s node dev/test/coop-one-world.js; done;;
esac; done
echo "== lane done $*" >> $SUM
