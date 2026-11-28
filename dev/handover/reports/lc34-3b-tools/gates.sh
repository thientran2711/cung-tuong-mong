#!/bin/bash
cd /home/user/wt/r3b; L=/home/user/wt/r3b-logs
run(){ n=$1; shift; s=$(date +%s); timeout 1500 "$@" > $L/$n.log 2>&1; echo "$n exit=$? $(( $(date +%s)-s ))s :: $(tail -1 $L/$n.log | cut -c1-200)" >> $L/summary.txt; }
: > $L/summary.txt
run oan-pace node dev/test/oan-pace.js dev/index.html
run tai-mat-know node dev/test/tai-mat-know.test.js dev/index.html
run tai-mat-scan node dev/test/tai-mat-know-scan.js dev/build
run rank-pace node dev/test/rank-pace.js dev/index.html
run pace-speed node dev/test/pace-speed.js dev/index.html
run stat-pace node dev/test/stat-pace.js dev/index.html
run leave-palace node dev/test/leave-palace.test.js dev/index.html
run act-move-law3 node dev/test/act-move-law3-scan.js dev/index.html
run reignend node dev/test/reignend.js dev/index.html
run charge-trinh node dev/test/charge-trinh-punish.js dev/index.html
run ghen-shown node dev/test/ghen-shown.js
run webkit-syntax node dev/test/webkit-syntax.js dev/build
run lookbehind python3 dev/test/lookbehind-scan.py
run punish-scan python3 dev/test/punish-scan.py
run punish-weight python3 dev/test/punish-weight-scan.py
echo DONE >> $L/summary.txt
