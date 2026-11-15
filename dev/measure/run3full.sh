#!/bin/bash
# usage: run3full.sh <game.html> <label> [lives per shard=4]  -> 3 shards, 9-origin rotation, NO HHSTOP (whole lives: Thái hậu / Hoàng thái hậu endings),
# counters inx + inbuoi (khắc vs Sức limit per buổi)
G=$1;L=$2;N=${3:-4};W=${OUT:-/tmp/bal};mkdir -p $W
M=$(cd "$(dirname "$0")" && pwd)
for i in 1 2 3; do K=$(( (i-1)*N ))
 XJS="const s9=start;start=function(){window.__origO=[\"tt\",\"dtq\",\"muoi\",\"cn\",\"nc\",\"td\",\"ch\",\"thd\",\"cnv\"][(window.__oj=(window.__oj==null?$K:window.__oj+1))%9];return s9.apply(this,arguments)};${EXTRA:-}"
 GAME=$G INP=inpage6.js INP2=inx.js,inbuoi.js XJS="$XJS" CAP=${CAP:-6000} node $M/runb.js sens $N $W/${L}_$i.json > $W/${L}_$i.log 2>&1 &
done; wait; echo done $L; date
