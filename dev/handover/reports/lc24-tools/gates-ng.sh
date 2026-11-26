#!/bin/bash
SP=/tmp/claude-0/-home-user-cung-tuong-mong/ae980bc1-2c5a-5bdf-9e1c-50b5e2cba8e9/scratchpad; W=$1; G=$2; mkdir -p $G; cd $W
r(){ n=$1; shift; s=$(date +%s); timeout 2400 "$@" > $G/$n.log 2>&1; e=$?; echo "$n exit=$e $(( $(date +%s)-s ))s :: $(tail -c 300 $G/$n.log | tr '\n' ' ' | cut -c1-200)" >> $G/SUMMARY; }
: > $G/SUMMARY
echo "kitRowNil-grep :: index=$(grep -c kitRowNil index.html) dev=$(grep -c kitRowNil dev/index.html)" >> $G/SUMMARY
python3 $SP/srv.py 8797 $W >/dev/null 2>&1 & HP=$!; sleep 2
r scan-ipad node dev/test/ob-ngoaicung/scan.js http://127.0.0.1:8797/index.html $G/scan-ipad.json --play=600
r scan-fold node dev/test/ob-ngoaicung/scan.js http://127.0.0.1:8797/index.html $G/scan-fold.json --play=600 --size=755x1000@1
kill $HP
r quickcheck bash dev/tools/quickcheck.sh --runs 5
echo DONE >> $G/SUMMARY
