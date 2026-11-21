#!/bin/bash
# usage: run4c.sh <game.html> <label> <lives per chunk> <seed1> [seed2 ...]  -> one browser per seed (run ≤4 at once: renderer memory grows ~150 MB a life),
# 9-origin rotation starting at seed%9, HHSTOP, inx+inpz counters, out $OUT/<label>_s<seed>.json; env EXTRA (js after load), CAP (s, default 6900)
G=$1;L=$2;N=$3;shift 3;W=${OUT:-/tmp/bal};mkdir -p $W;M=$(cd "$(dirname "$0")" && pwd)
for S in "$@"; do K=$((S%9))
 XJS="const s9=start;start=function(){window.__origO=[\"tt\",\"dtq\",\"muoi\",\"cn\",\"nc\",\"td\",\"ch\",\"thd\",\"cnv\"][(window.__oj=(window.__oj==null?$K:window.__oj+1))%9];return s9.apply(this,arguments)};${EXTRA:-}"
 SEED=$S GAME=$G INP=inpage6.js INP2=inx.js,inpz.js HHSTOP=1 XJS="$XJS" CAP=${CAP:-6900} node $M/runb.js sens $N $W/${L}_s$S.json > $W/${L}_s$S.log 2>&1 &
done; wait; echo done $L "$@"; date
