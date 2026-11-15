#!/bin/bash
# usage: run1b.sh <game.html> <label> <shard i> [lives=6] [origin offset K]   (one shard of run5b.sh; ORIG env -> fixed origin, no rotation)
G=$1;L=$2;i=$3;N=${4:-6};K=${5:-$(( (i-1)*N ))};W=${OUT:-/tmp/bal};mkdir -p $W
M=$(cd "$(dirname "$0")" && pwd)
if [ -n "$ORIG" ]; then XJS="${EXTRA:-0}"; else
XJS="const s9=start;start=function(){window.__origO=[\"tt\",\"dtq\",\"muoi\",\"cn\",\"nc\",\"td\",\"ch\",\"thd\",\"cnv\"][(window.__oj=(window.__oj==null?$K:window.__oj+1))%9];return s9.apply(this,arguments)};${EXTRA:-}"; fi
GAME=$G INP=inpage6.js INP2=inx.js,inpz.js HHSTOP=1 XJS="$XJS" CAP=9000 node $M/runb.js sens $N $W/${L}_$i.json > $W/${L}_$i.log 2>&1
echo done $L $i
