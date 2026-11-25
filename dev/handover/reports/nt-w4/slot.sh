#!/bin/bash
# slot.sh <name> <game.html> [sec=900]: nt-run sens; a hang ends the part, a new part (fresh life) starts until the time is used
n=$1; g=$2; T=${3:-900}; t0=$(date +%s); i=0; cd /home/user/wt/ghen/dev/measure
while :; do el=$(( $(date +%s) - t0 )); rem=$(( T - el )); [ $rem -lt 60 ] && break; i=$((i+1))
 NT_GAME=$g node nt-run.js /home/user/wt/ghen-out/$n-p$i.json $rem sens >> /home/user/wt/ghen-out/$n.log 2>&1; echo "part $i end at $(( $(date +%s) - t0 ))s" >> /home/user/wt/ghen-out/$n.log; done
echo DONE >> /home/user/wt/ghen-out/$n.log
