#!/bin/sh
# usage: push.sh cNN aXX
W=/tmp/claude-0/-home-user-cung-tuong-mong/2aef95ff-82e2-5b41-bec1-0d990005f65f/scratchpad/work; R=/tmp/claude-0/-home-user-cung-tuong-mong/2aef95ff-82e2-5b41-bec1-0d990005f65f/scratchpad/cdn; c=$1; a=$2
mkdir -p $R/img/_review/t8-reprompt
cp $W/out/${c}_${a}_t*_v*.png $R/img/_review/t8-reprompt/
cp $W/out/${c}_${a}_sheet.jpg $R/img/_review/t8-reprompt/${c}_${a}_t7t8_sheet.jpg
cd $R && python3 dev/site/cdn_sync.py img/_review/t8-reprompt/${c}_${a}_t7_v0.png img/_review/t8-reprompt/${c}_${a}_t7_v1.png img/_review/t8-reprompt/${c}_${a}_t7_v2.png img/_review/t8-reprompt/${c}_${a}_t8_v0.png img/_review/t8-reprompt/${c}_${a}_t8_v1.png img/_review/t8-reprompt/${c}_${a}_t8_v2.png img/_review/t8-reprompt/${c}_${a}_t7t8_sheet.jpg 2>&1 | tail -4
for f in t7_v0 t8_v2 t7t8_sheet; do e=png; [ $f = t7t8_sheet ] && e=jpg; curl -s https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/${c}_${a}_$f.$e | md5sum; md5sum $R/img/_review/t8-reprompt/${c}_${a}_$f.$e; done
