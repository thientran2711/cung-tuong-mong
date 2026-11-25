#!/bin/bash
# guard for flight2-s2e: restart with resume=1 if the process dies; stop + copy final JSON on LIFE DONE
O=/home/user/wt/out3; U=https://thientran2711.github.io/cung-tuong-mong/; L=flight2-s2e
cd /home/user/wt/rt
ARGS="dev=fold origin=thd road=thd_tho bot=bold seed=2026112517 life=$L"
FIRST=1
while true; do
  if grep -q 'LIFE DONE' $O/$L.log 2>/dev/null; then cp $O/$L.json $O/$L.final.json; echo LIFE-DONE-COPIED; exit 0; fi
  if ! pgrep -f "robot-rt.js.*life=$L" >/dev/null; then
    if [ $FIRST = 1 ] && [ ! -f $O/$L.ckpt.json ]; then node dev/test/robot-rt.js $U $O $ARGS >> $O/$L.log 2>&1
    else node dev/test/robot-rt.js $U $O $ARGS resume=1 >> $O/$L.log 2>&1; fi
    FIRST=0
  fi
  sleep 5
done
