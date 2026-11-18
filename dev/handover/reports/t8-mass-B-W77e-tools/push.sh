#!/bin/sh
# usage: push.sh cNN aXX
S=/tmp/claude-0/-home-user-cung-tuong-mong/c4ae2eb8-6879-5a32-bca8-4f79e3a724b9/scratchpad; R=$S/root; c=$1; a=$2; D=img/_review/t8-reprompt
cp $S/out/${c}_${a}_t*_v*.png $R/$D/; cp $S/out/${c}_${a}_t7t8_sheet.jpg $R/$D/
cd $R && python3 dev/site/cdn_sync.py $(ls $D/${c}_${a}_* ) 2>&1 | tail -4
for f in t7_v0 t8_v2 t7t8_sheet; do e=png; [ $f = t7t8_sheet ] && e=jpg; curl -s https://ctm-img.victoria-tntt.workers.dev/$D/${c}_${a}_$f.$e | md5sum; md5sum $D/${c}_${a}_$f.$e; done
