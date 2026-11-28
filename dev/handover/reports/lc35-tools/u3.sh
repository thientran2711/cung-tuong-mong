#!/bin/bash
S=/tmp/claude-0/-home-user-cung-tuong-mong/16431846-4a1e-5251-849f-501ccdc71bb2/scratchpad; W=/home/user/wt/lc35-gb; O=$S/u3
true
cd $W; r(){ n=$1; shift; timeout 2400 "$@" > $O/$n.log 2>&1; echo "$n rc=$? :: $(tail -1 $O/$n.log | cut -c1-200)" >> $O/summary.txt; }
: > $O/summary.txt
r coop-qcard node dev/test/coop-qcard.js
r kit-stage node dev/test/kit-stage.js index.html
r oldsave-r1 node dev/test/oldsave-r1.js $O/oldsave
bash dev/tools/quickcheck.sh > $O/qc.log 2>&1; echo "quickcheck rc=$? :: $(grep '^QUICKCHECK' $O/qc.log | tail -1 | cut -c1-300)" >> $O/summary.txt
echo ALLDONE >> $O/summary.txt
