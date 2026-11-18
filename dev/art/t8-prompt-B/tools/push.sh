#!/bin/sh
# usage: push.sh cNN aXX
R=/home/user/w77c/cdn; c=$1; a=$2; K=img/_review/t8-reprompt
cp /home/user/w77c/work/out/${c}_${a}_t*_v*.png $R/$K/
cp /home/user/w77c/work/out/${c}_${a}_sheet.jpg $R/$K/${c}_${a}_t7t8_sheet.jpg
cd $R && python3 dev/site/cdn_sync.py $K/${c}_${a}_t7_v0.png $K/${c}_${a}_t7_v1.png $K/${c}_${a}_t7_v2.png $K/${c}_${a}_t8_v0.png $K/${c}_${a}_t8_v1.png $K/${c}_${a}_t8_v2.png $K/${c}_${a}_t7t8_sheet.jpg 2>&1 | tail -4
for f in t7_v0 t8_v2; do curl -s https://ctm-img.victoria-tntt.workers.dev/$K/${c}_${a}_$f.png | md5sum; md5sum $R/$K/${c}_${a}_$f.png; done
echo SHEET https://ctm-img.victoria-tntt.workers.dev/$K/${c}_${a}_t7t8_sheet.jpg
