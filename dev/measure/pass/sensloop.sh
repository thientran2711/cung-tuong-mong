#!/bin/bash
# keep one sensible shard running: after a renderer crash, start a new runb.js into the next file (prefix_<k>.json); foreground
# usage: sensloop.sh <game.html> <out prefix> <origin offset K> <seconds>
G=$1;P=$2;K=$3;T=$4;t0=$(date +%s);k=0
while [ $(( $(date +%s) - t0 )) -lt $T ]; do k=$((k+1))
 CAP=$(( T - ($(date +%s) - t0) )) bash $(dirname "$0")/sens1.sh $G ${P}_$k.json $((K+k)) 1 > ${P}_$k.log 2>&1
done
