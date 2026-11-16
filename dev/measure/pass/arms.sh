#!/bin/bash
# danh-balance arms, one sim at a time: build x bot, 48 lives, 4 pages (4 seeded streams), cap 144 tuần
cd /home/user/wt/danhbal/dev/measure
N=${N:-48};SD=${SD:-501}
for arm in after:hs before:hs after:mix before:mix; do b=${arm%%:*};m=${arm##*:}
 o=../../tmp/out/${b}_${m}_$SD.json; [ -s $o ] && python3 -c "import json,sys;sys.exit(0 if len(json.load(open('$o')))>=$N else 1)" && continue
 echo "$(date +%T) start $arm"; node run_par.js root/_$b.html sens $N $o ../../tmp/inp_$m.js 4 $SD > ../../tmp/out/${b}_${m}_$SD.log 2>&1; echo "$(date +%T) done $arm"
done
