#!/bin/bash
W=/home/user/wt/sp; O=/tmp/claude-0/-home-user-cung-tuong-mong/91da9bef-5288-585b-baf6-4ec29e0fa17c/scratchpad/sp; cd $W
r(){ n=$1; shift; timeout 2400 "$@" > $O/$n.log 2>&1; echo "$n rc=$? :: $(tail -1 $O/$n.log)" >> $O/summary.txt; }
: > $O/summary.txt
r spc node dev/test/save-pid-cards.js index.html fold,ipadAir
r evc node dev/test/save-evc-onscreen.js index.html fold,ipadAir
r sul node dev/test/save-unseen-lists.js index.html fold,ipadAir 1
r rewind node dev/test/save-rewind.js index.html fold,ipadAir
r look node dev/test/look-dedupe.js
r oldsave node dev/test/oldsave-r1.js $O/oldsave
r nls node dev/test/notice-late-save.js index.html
r death node dev/test/save-death-rebirth.js index.html fold,ipadAir
echo ALLDONE >> $O/summary.txt
