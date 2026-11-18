#!/bin/bash
# usage: push.sh AGENT "msg" ; reads TSV lines from stdin, appends to batch-maid-rest.md
R=/home/user/cung-tuong-mong/dev/handover/reports/fig-cutout-clean; W=/home/user/wt/w5c/dev/handover/reports/fig-cutout-clean
cp $R/hd-entries/W5c-$1.json $W/hd-entries/ && rm -f $R/hd-entries/W5c-$1.json
cat >> $W/batch-maid-rest.md
cd /home/user/wt/w5c && git add dev/handover/reports/fig-cutout-clean && git commit -qm "$2"
for i in 1 2 3; do C=$(git rev-parse HEAD); flock /home/user/wt/fetch.lock git fetch -q --depth=1 origin claude/cung-tuong-mong-handover-hj0h8w; git checkout -q -B w5c FETCH_HEAD; git cherry-pick $C >/dev/null 2>&1; git push -q origin w5c:claude/cung-tuong-mong-handover-hj0h8w 2>&1 | grep -q rejected || break; done
grep -rn "^<<<<<<< " dev | head -1; echo pushed
