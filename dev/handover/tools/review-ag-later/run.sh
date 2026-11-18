#!/bin/bash
# usage: run.sh <worktree> <tag> <coopN> <g4N>   (2 busy loops while running)
WT=$1; TAG=$2; CN=${3:-9}; GN=${4:-5}; L=/home/user/wt/rvlog/$TAG; mkdir -p $L; cd $WT || exit 1
( while :; do :; done ) & B1=$!; ( while :; do :; done ) & B2=$!; trap "kill $B1 $B2 2>/dev/null" EXIT
for i in $(seq 1 $CN); do timeout 900 node dev/test/coop-e2e.js /home/user/wt/rvlog/$TAG/e2e$i > $L/coop$i.log 2>&1; echo "coop$i rc=$? $(grep -cE '^\s*(ok|PASS)' $L/coop$i.log) $(tail -1 $L/coop$i.log)"; done
for i in $(seq 1 $GN); do for s in 7 3; do QC_WT=$WT SEED=$s timeout 180 node dev/test/coop-one-world.js > $L/g4-$i-$s.log 2>&1; echo "g4 $i s$s rc=$? $(tail -1 $L/g4-$i-$s.log)"; done; done
