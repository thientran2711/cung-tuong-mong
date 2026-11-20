#!/bin/bash
# usage: run.sh <main|br> <seed> <lives> <capSec>
# env: BR=<branch worktree> MAIN=<main worktree> OUT=<out dir>; bot scripts are run from $BR (inpage6.js + inbc.js + this indt.js)
arm=$1; seed=$2; n=$3; cap=$4
BR=${BR:-/home/user/wt/rbc}; MAIN=${MAIN:-/home/user/wt/rmain}; OUT=${OUT:-/home/user/wt/rv-bot/out}
HERE=$(cd "$(dirname "$0")" && pwd); mkdir -p "$OUT"
G=$BR/index.html; [ "$arm" = main ] && G=$MAIN/index.html
# INP2 paths are relative to dev/measure of $BR
REL=$(python3 -c "import os,sys;print(os.path.relpath(sys.argv[1],sys.argv[2]))" "$HERE/indt.js" "$BR/dev/measure")
cd "$BR" && GAME=$G SEED=$seed HHSTOP=1 CAP=$cap INP=inpage6.js INP2=inbc.js,$REL \
  node dev/measure/runb.js sens $n "$OUT/life-$arm-$seed.json" > "$OUT/log-$arm-$seed.txt" 2>&1
