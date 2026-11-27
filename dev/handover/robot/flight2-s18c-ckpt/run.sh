#!/bin/bash
cd /home/user/wt/s18-h2
OUT=/home/user/wt/s18c-out
R=""; [ -f $OUT/flight2-s18c.ckpt.json ] && R="resume=1"
while true; do
  node dev/test/robot-rt.js http://127.0.0.1:8938/ $OUT dev=fold bot=cautious seed=2026112550 life=flight2-s18c pin=1 $R >> $OUT/life.log 2>&1
  rc=$?
  echo "$(date -u +%FT%TZ) EXIT $rc" >> $OUT/life.log
  case $rc in 0|1|4) break;; esac
  R="resume=1"; sleep 5
done
echo "$(date -u +%FT%TZ) RUNNER DONE rc=$rc" >> $OUT/life.log
