#!/bin/bash
SP=/tmp/claude-0/-home-user-cung-tuong-mong/ae980bc1-2c5a-5bdf-9e1c-50b5e2cba8e9/scratchpad; W=$1; G=$2; mkdir -p $G; cd $W
until grep -q DONE $SP/g-m3/SUMMARY 2>/dev/null; do sleep 10; done
r(){ n=$1; shift; s=$(date +%s); timeout 1500 "$@" > $G/$n.log 2>&1; e=$?; echo "$n exit=$e $(( $(date +%s)-s ))s :: $(tail -c 300 $G/$n.log | tr '\n' ' ' | cut -c1-200)" >> $G/SUMMARY; }
: > $G/SUMMARY
echo "kitRowNil-grep :: index=$(grep -c kitRowNil index.html) dev=$(grep -c kitRowNil dev/index.html)" >> $G/SUMMARY
r statpace-scan python3 dev/measure/statpace-scan.py
r pace-all node dev/test/pace-all.js index.html
r stat-pace node dev/test/stat-pace.js index.html
r balance-pace env GAME=$PWD/index.html node dev/test/balance-pace.js
r moodknow-step0 node dev/test/moodknow-step0.test.js file://$PWD/index.html
r ag-moodknow node dev/test/ag-moodknow.test.js file://$PWD/index.html
r promo-root env GAME=$PWD/index.html node dev/test/promo-root.js
r quickcheck bash dev/tools/quickcheck.sh --runs 5
echo DONE >> $G/SUMMARY
