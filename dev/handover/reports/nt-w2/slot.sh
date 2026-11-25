#!/bin/bash
# slot.sh <name> <game.html> : 900 s of nt-run sens; a hang ends the part, a new part (fresh life) starts until 900 s are used
n=$1; g=$2; t0=$(date +%s); i=0; cd /home/user/wt/w9/dev/measure
while :; do el=$(( $(date +%s) - t0 )); rem=$(( 900 - el )); [ $rem -lt 60 ] && break; i=$((i+1))
 NT_GAME=$g node nt-run.js /home/user/wt/w9-out/$n-p$i.json $rem sens >> /home/user/wt/w9-out/$n.log 2>&1; echo "part $i end at $(( $(date +%s) - t0 ))s" >> /home/user/wt/w9-out/$n.log; done
echo DONE >> /home/user/wt/w9-out/$n.log
