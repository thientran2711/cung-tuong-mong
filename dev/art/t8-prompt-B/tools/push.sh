#!/bin/sh
# usage: push.sh cNN
R=/home/user/wt/w77-cdn; c=$1
cp /home/user/wt/w77-work/out/${c}_a18_t*_v*.png $R/img/_review/t8-reprompt/
cp /home/user/wt/w77-work/out/${c}_sheet.jpg $R/img/_review/t8-reprompt/${c}_a18_t7t8_sheet.jpg
cd $R && python3 dev/site/cdn_sync.py img/_review/t8-reprompt/${c}_a18_t7_v0.png img/_review/t8-reprompt/${c}_a18_t7_v1.png img/_review/t8-reprompt/${c}_a18_t7_v2.png img/_review/t8-reprompt/${c}_a18_t8_v0.png img/_review/t8-reprompt/${c}_a18_t8_v1.png img/_review/t8-reprompt/${c}_a18_t8_v2.png img/_review/t8-reprompt/${c}_a18_t7t8_sheet.jpg 2>&1 | tail -4
for f in t7_v0 t8_v2; do curl -s https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/${c}_a18_$f.png | md5sum; md5sum $R/img/_review/t8-reprompt/${c}_a18_$f.png; done
