#!/bin/bash
# runs phone-bars.js one size+mode per process (browser stays small): bash dev/test/pb-run.sh <outdir>
O=${1:-dev/test/out/pb}; mkdir -p $O; rc=0
for M in ${PB_MODES:-cons srv}; do for S in ${PB_SIZES:-755x1000@2 1180x820@2 1366x1024@2 412x1058@2 390x844@3 1024x768@2}; do
 PB_MODE=$M node dev/test/phone-bars.js $O/$M-${S%@*} $S > $O/$M-${S%@*}.log 2>&1 || { echo "FAIL $M $S"; rc=1; }
done; done; exit $rc
