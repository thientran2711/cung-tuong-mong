#!/bin/bash
arm=$1; seed=$2; n=$3; cap=$4; OUT=/home/user/wt/rv-bot/outk; mkdir -p $OUT
G=/home/user/wt/$arm/index.html
cd /home/user/wt/rbc && GAME=$G SEED=$seed HHSTOP=1 CAP=$cap INP=inpage6.js INP2=inbc.js,../../../rv-bot/indt.js,instudy.js \
  node dev/measure/runb.js sens $n $OUT/life-$arm-$seed.json > $OUT/log-$arm-$seed.txt 2>&1
