#!/bin/bash
# usage: long.sh <worktree> <tag> [extra tests...]
WT=$1; TAG=$2; shift 2; L=/home/user/wt/rvlog/$TAG; mkdir -p $L; cd $WT || exit 1
T="ag-all.test ag-all-b ag-all-c ag-betray.test ag-carry.test ag-dayk ag-kh2 ag-know.test ag-mg2 ag-mgcal ag-mgh ag-par3 ag-paywin.test ag-rd ag-sell.test ag-soft.test ag-stf2 ag-taimat.test ag-taimat2.test ag-toil2 ag-truth.test ag-walk.test ag-wx agemp_check agent_check agmaid_check greet_check world_check2 ag-later.test $*"
for t in $T; do f=dev/test/$t.js; [ -f $f ] || { echo "MISSING $t"; continue; }; timeout 900 node $f dev/index.html > $L/$t.log 2>&1; echo "$t rc=$? | $(tail -1 $L/$t.log | cut -c1-160)"; done
node dev/test/ag-later-scan.js > $L/scan.log 2>&1; echo "scan rc=$? | $(tail -1 $L/scan.log)"
