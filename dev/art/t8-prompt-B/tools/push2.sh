#!/bin/sh
# usage: push2.sh cNN aXX
W=/tmp/claude-0/-home-user-cung-tuong-mong/62b69157-7735-5560-aa68-82a57551a7a0/scratchpad; R=$W/cdn; c=$1; a=$2
D=img/_review/t8-reprompt
cp $W/work/out/${c}_${a}_t*_v*.png $R/$D/; cp $W/work/out/${c}_${a}_sheet.jpg $R/$D/${c}_${a}_t7t8_sheet.jpg
cd $R && python3 dev/site/cdn_sync.py $D/${c}_${a}_t7_v0.png $D/${c}_${a}_t7_v1.png $D/${c}_${a}_t7_v2.png $D/${c}_${a}_t8_v0.png $D/${c}_${a}_t8_v1.png $D/${c}_${a}_t8_v2.png $D/${c}_${a}_t7t8_sheet.jpg 2>&1 | tail -4
for f in t7_v0 t8_v2; do curl -s https://ctm-img.victoria-tntt.workers.dev/$D/${c}_${a}_$f.png | md5sum; md5sum $R/$D/${c}_${a}_$f.png; done
echo SHEET https://ctm-img.victoria-tntt.workers.dev/$D/${c}_${a}_t7t8_sheet.jpg
