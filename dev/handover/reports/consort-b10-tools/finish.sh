#!/bin/bash
# usage: finish.sh <cNN> file1 file2 ... (basenames in <cNN>/v, e.g. v1_t7.png) ; also rebuilds + uploads sheet
c=$1; shift; cd /home/user/wt/w60c
D=root/img/_review/consort-tiers/$c/b10-a26; mkdir -p $D
fl=()
for f in "$@"; do b=${f%.png}; v=${b%%_*}; t=${b#*_}; n=${c}_a26_${t}_${v}.png; [ "${f}" != "${f%_prev_yellow.png}" ] && n=${c}_a26_${t%_prev_yellow}_${v}_prev_yellow.png; [ "${f}" != "${f%_prev_yellow.png}" ] || cp $c/v/$f $D/$n; [ "${f}" != "${f%_prev_yellow.png}" ] || fl+=($D/$n); done
python3 sheet2.py $c/v $D/${c}_a26_b10_sheet.jpg $c; fl+=($D/${c}_a26_b10_sheet.jpg)
(cd root && python3 dev/site/cdn_sync.py "${fl[@]/root\//}" 2>&1 | tail -5; python3 dev/site/cdn_sync.py --check 2>&1 | tail -3)
