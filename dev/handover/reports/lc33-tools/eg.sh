#!/bin/bash
W=/home/user/wt/eg3; S=/tmp/claude-0/-home-user-cung-tuong-mong/393fe91b-79d5-54af-81c6-941a14485066/scratchpad; O=$S/eg; U=file://$W/index.html; cd $W
r(){ n=$1; shift; timeout 2400 "$@" > $O/$n.log 2>&1; echo "$n rc=$? :: $(tail -1 $O/$n.log)" >> $O/summary.txt; }
: > $O/summary.txt
r act-literal node dev/measure/act-literal-scan.js dev/build
r egain3c-parity node dev/test/egain3c-parity.js .tmp/old.html dev/index.html
r oldsave-r1 node dev/test/oldsave-r1.js $O/oldsave
r door-row-hint-fold node dev/test/door-row-hint.js $U $O/drh-f.json 755x1000@1
r door-row-hint-ipad node dev/test/door-row-hint.js $U $O/drh-i.json 1180x820@1
r gain-empty-fold node dev/test/gain-empty.js $U $O/ge-f.json 755x1000@1
r mgskin-wire node dev/test/mgskin-wire.js index.html
r kit-ring-all node dev/test/kit-ring-all.js $U
echo ALLDONE >> $O/summary.txt
