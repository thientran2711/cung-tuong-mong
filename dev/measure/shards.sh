#!/bin/bash
# usage: bash dev/measure/shards.sh <name> <shards> <lives-per-shard> [mode]   (env BALJ/FAIRJ/Q72J/XJ/CAP passed through)
# writes $OUT/<name>_<i>.json (OUT defaults to /tmp/bal); runs shards in parallel, waits for all
N=$1;K=${2:-3};L=${3:-20};MODE=${4:-sens};OUT=${OUT:-/tmp/bal};mkdir -p $OUT
D=$(cd "$(dirname "$0")" && pwd)
for i in $(seq 1 $K); do node $D/runbal.js $MODE $L $OUT/${N}_$i.json > $OUT/${N}_$i.log 2>&1 & done; wait
echo "done $N"
