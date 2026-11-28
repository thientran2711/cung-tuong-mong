#!/bin/bash
# exits on LIFE DONE / BUILD MISMATCH after last RESUME / runner dead / SAVE FROZEN (last 2 CP save sizes equal, or ckpt not rewritten for 25 min) / 55 min
cd /home/user/wt; L=out5/flight2-s2g.log; K=out5/flight2-s2g.ckpt.json; end=$((SECONDS+3300))
while true; do
  grep -q 'LIFE DONE' $L && { echo REASON done; break; }
  awk '/^RESUME flight2/{n=NR} /^BUILD MISMATCH/{m=NR} END{exit !(m>n)}' $L && { echo REASON mismatch; break; }
  pgrep -f 'robot-rt.*s2g' >/dev/null || { echo REASON dead; break; }
  s=$(grep -E '^CP' $L | tail -2 | grep -oE 'save [0-9]+' | uniq | wc -l)
  [ "$(grep -cE '^CP' $L)" -ge 2 ] && [ "$s" = 1 ] && { echo REASON frozen-equal-sizes; break; }
  [ $(( $(date +%s) - $(stat -c %Y $K) )) -gt 1500 ] && { echo REASON frozen-ckpt-stale; break; }
  [ $SECONDS -ge $end ] && { echo REASON timer; break; }
  sleep 30
done
grep -E '^STATUS' $L | tail -1; grep -E '^CP|LIFE DONE|BUILD' $L | tail -3 | cut -c1-200; ls -l --time-style=+%T $K; date -u
