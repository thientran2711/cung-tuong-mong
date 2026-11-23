#!/bin/bash
# usage: run5b.sh <game.html> <label> [lives per shard=6]  -> 5 shards, 9-origin rotation, HHSTOP, inx+inpz counters
# env: SEEDB=<n> seeds shard i with SEED=n+i (same seeds in both arms of an off/on comparison), CAP=<s> per-shard time cap (default 9000)
G=$1;L=$2;N=${3:-6};W=${OUT:-/tmp/bal};mkdir -p $W
M=$(cd "$(dirname "$0")" && pwd)
for i in 1 2 3 4 5; do K=$(( (i-1)*N ))
 XJS="const s9=start;start=function(){window.__origO=[\"tt\",\"dtq\",\"muoi\",\"cn\",\"nc\",\"td\",\"ch\",\"thd\",\"cnv\"][(window.__oj=(window.__oj==null?$K:window.__oj+1))%9];return s9.apply(this,arguments)};${EXTRA:-}"
SD=${SEEDB:+$((SEEDB+i))}; SEED=$SD GAME=$G INP=inpage6.js INP2=inx.js,inpz.js HHSTOP=1 XJS="$XJS" CAP=${CAP:-9000} node $M/runb.js sens $N $W/${L}_$i.json > $W/${L}_$i.log 2>&1 &
done; wait; echo done $L; date
