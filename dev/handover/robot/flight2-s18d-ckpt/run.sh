#!/bin/bash
cd /home/user/wt/s18-h2
OUT=/home/user/wt/s18d-out
R=""; [ -f $OUT/flight2-s18d.ckpt.json ] && R="resume=1"
while true; do
  node dev/test/robot-rt.js http://127.0.0.1:8939/ $OUT dev=fold bot=bold seed=2026112557 life=flight2-s18d pin=1 $R >> $OUT/life.log 2>&1
  rc=$?
  echo "$(date -u +%FT%TZ) EXIT $rc" >> $OUT/life.log
  case $rc in 0|1|4) break;; esac
  R="resume=1"; sleep 5
done
echo "$(date -u +%FT%TZ) RUNNER DONE rc=$rc" >> $OUT/life.log
