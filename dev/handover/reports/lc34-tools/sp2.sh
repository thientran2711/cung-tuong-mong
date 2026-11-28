#!/bin/bash
W=/home/user/wt/sp; O=/tmp/claude-0/-home-user-cung-tuong-mong/91da9bef-5288-585b-baf6-4ec29e0fa17c/scratchpad/sp; cd $W
until grep -q ALLDONE $O/summary.txt; do sleep 10; done
r(){ n=$1; shift; timeout 6000 "$@" > $O/$n.log 2>&1; echo "$n rc=$? :: $(tail -1 $O/$n.log)" >> $O/summary2.txt; }
: > $O/summary2.txt
r spc-fold node dev/test/save-pid-cards.js index.html fold
r spc-ipad node dev/test/save-pid-cards.js index.html ipadAir
echo ALLDONE >> $O/summary2.txt
