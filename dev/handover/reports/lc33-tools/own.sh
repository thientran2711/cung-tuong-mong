#!/bin/bash
W=/home/user/wt/ui3; S=/tmp/claude-0/-home-user-cung-tuong-mong/393fe91b-79d5-54af-81c6-941a14485066/scratchpad; O=$S/out; U=file://$W/dev/index.html
cd $W
r(){ n=$1; shift; timeout 1500 "$@" > $O/$n.log 2>&1; echo "$n rc=$? :: $(tail -1 $O/$n.log)" >> $O/summary.txt; }
: > $O/summary.txt
r kit-res-fold node dev/test/kit-res-fold.js dev/index.html
r rtoast node dev/test/rtoast-stage-scan.js dev/index.html
r kit-title-name node dev/test/kit-title-name.js dev/index.html
r kit-dlg-avatar node dev/test/kit-dlg-avatar.js $U $O/dlgav
r mgskin-wire node dev/test/mgskin-wire.js index.html
r kit-mgskin node dev/test/kit-mgskin.js dev/index.html
r s3e-fold node dev/test/s3e-display-fix.js index.html 755x1000
r s3e-ipad node dev/test/s3e-display-fix.js index.html 1180x820
r kit-odds-dark node dev/test/kit-odds-dark.js $U $O/odds
SWEEP=1 r kit-focus-keepin node dev/test/kit-focus-keepin.js $U $O/focus
r kit-ring-all node dev/test/kit-ring-all.js $U
r kit-ring-band node dev/test/kit-ring-band.js $U
r kit-pick-go node dev/test/kit-pick-go.js --save $S/fx/y05-ncBtuc-035.json --only grid_bieuqua,grid_tangqua,grid_dangqua,grid_dangtha,grid_plant --tiles 2
r goal-links node dev/test/goal-links.js $U 755x1000,1180x820
r rank-screen-first node dev/test/rank-screen-first.js --root $W --save $S/fx/y05-ncBtuc-035.json
r endcard-hold node dev/test/endcard-hold.js $W
r dlg-dead-scan node dev/test/dlg-dead-scan.js --root $W --only nofx,fx_hold,tgt_hold,stale_hand
r endcard-top node dev/test/endcard-top.js - $U
echo ALLDONE >> $O/summary.txt
