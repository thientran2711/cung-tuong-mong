#!/bin/bash
# 2 cut workers looping over bg.txt (sources in .tywork/src); stop with: pkill -f ty-workers-loop
R=/home/user/wt/trung-y; T=$R/.tywork
work(){ while true; do TY_PART=$1 python3 $R/dev/art/trung-y/ty.py proc >> $T/proc$2.log 2>&1; sleep 30; done; }
work 0/3 0 & work 1/3 1 & work 2/3 2 & wait
