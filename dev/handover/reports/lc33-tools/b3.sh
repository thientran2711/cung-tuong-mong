#!/bin/bash
W=/home/user/wt/b3a; S=/tmp/claude-0/-home-user-cung-tuong-mong/393fe91b-79d5-54af-81c6-941a14485066/scratchpad; O=$S/b3; U=file://$W/index.html; cd $W
until grep -q ALLDONE $S/eg/summary.txt; do sleep 20; done
python3 dev/build/assemble.py >/dev/null
r(){ n=$1; shift; timeout 2400 "$@" > $O/$n.log 2>&1; echo "$n rc=$? :: $(tail -1 $O/$n.log)" >> $O/summary.txt; }
: > $O/summary.txt
r srvmerit-guard node dev/test/srvmerit-guard.js $U
r veil-fold node dev/test/veil-buoi-scan.js $U 755x1000
r veil-ipad node dev/test/veil-buoi-scan.js $U 1180x820
r law1-audit node dev/test/law1-audit.test.js
r noise-sampler node dev/test/noise-sampler-pure.js index.html
r s3e-fold node dev/test/s3e-display-fix.js index.html 755x1000
r door-row-hint-fold node dev/test/door-row-hint.js $U $O/drh.json 755x1000@1
r mgskin-wire node dev/test/mgskin-wire.js index.html
echo ALLDONE >> $O/summary.txt
