#!/bin/sh
# push2.sh cNN aXX
S=/tmp/claude-0/-home-user-cung-tuong-mong/d2c48bee-c04e-5005-940b-0d69eb219701/scratchpad; c=$1; a=$2
D=$S/cdn/img/_review/t8-reprompt
cp $S/w/out/${c}_${a}_t[78]_v?.png $D/; cp $S/w/out/${c}_${a}_sheet.jpg $D/${c}_${a}_t7t8_sheet.jpg
cd $S/cdn && python3 dev/site/cdn_sync.py $(cd $S/cdn; ls img/_review/t8-reprompt/${c}_${a}_*) 2>&1 | tail -4
for f in t7_v0 t8_v2; do curl -s https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/${c}_${a}_$f.png | md5sum; md5sum $D/${c}_${a}_$f.png; done
