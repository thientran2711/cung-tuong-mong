#!/bin/bash
# LC24 gates for a stage worktree. usage: gates-m3.sh <wt> <outdir>
SP=/tmp/claude-0/-home-user-cung-tuong-mong/ae980bc1-2c5a-5bdf-9e1c-50b5e2cba8e9/scratchpad; W=$1; G=$2; mkdir -p $G; cd $W
r(){ n=$1; shift; s=$(date +%s); timeout 1500 "$@" > $G/$n.log 2>&1; e=$?; echo "$n exit=$e $(( $(date +%s)-s ))s :: $(tail -c 300 $G/$n.log | tr '\n' ' ' | cut -c1-200)" >> $G/SUMMARY; }
: > $G/SUMMARY
echo "kitRowNil-grep :: index=$(grep -c kitRowNil index.html) dev=$(grep -c kitRowNil dev/index.html)" >> $G/SUMMARY
r ob-m3ui node dev/test/ob-m3ui.js index.html $SP/m3save.json $G/obm3
r kit-opt-art-tap node dev/test/kit-opt-art-tap.js index.html $G/oat
python3 $SP/srv.py 8796 $W >/dev/null 2>&1 & HP=$!; sleep 2
r kit-close node dev/test/kit-close.js http://127.0.0.1:8796/index.html $G/kc "" $SP/m3save.json
kill $HP
r quickcheck bash dev/tools/quickcheck.sh --runs 5
echo DONE >> $G/SUMMARY
