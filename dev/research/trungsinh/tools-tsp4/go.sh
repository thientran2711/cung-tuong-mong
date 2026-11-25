#!/bin/bash
export NODE_PATH=$(npm root -g); cd /tmp/ts
n0=$(wc -l < life.log)
[ -n "$1" ] && [ "$1" != 0 ] && ./pick.sh $1
node auto.js ${2:-40} | cut -c1-1200
echo "--- new log:"; tail -n +$((n0+1)) life.log | grep -E "MODAL|CHOSE|end month|FESTIVAL" | cut -c1-420 | tail -${3:-12}
