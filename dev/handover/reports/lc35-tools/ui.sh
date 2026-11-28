#!/bin/bash
W=/home/user/wt/lc35-st; S=/tmp/claude-0/-home-user-cung-tuong-mong/16431846-4a1e-5251-849f-501ccdc71bb2/scratchpad; O=$S/ui; U=file://$W/dev/index.html; Y=$S/fx/y05-ncBtuc-035.json
while pgrep -f "$S/dq.sh" >/dev/null; do sleep 20; done
cd $W
r(){ n=$1; shift; timeout 2400 "$@" > $O/$n.log 2>&1; echo "$n rc=$? :: $(tail -1 $O/$n.log | cut -c1-200)" >> $O/summary.txt; }
: > $O/summary.txt
r webkit-syntax node dev/test/webkit-syntax.js dev/build
r gift-return-scan node dev/test/gift-return-scan.js $W $O/grs.md
r kit-gift-out node dev/test/kit-gift-out.js --root $W --save $Y
r khm-fold node dev/test/kit-hand-mat-scan.js $W fold
r khm-ipad node dev/test/kit-hand-mat-scan.js $W ipadAir
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
r goal-links node dev/test/goal-links.js $U 755x1000,1180x820
r rank-screen-first node dev/test/rank-screen-first.js --root $W --save $Y
r endcard-hold node dev/test/endcard-hold.js $W
r dlg-dead-scan node dev/test/dlg-dead-scan.js --root $W --only nofx,fx_hold,tgt_hold,stale_hand
r endcard-top node dev/test/endcard-top.js - $U
bash dev/tools/quickcheck.sh > $O/qc.log 2>&1; echo "quickcheck rc=$? :: $(grep '^QUICKCHECK' $O/qc.log | tail -1 | cut -c1-300)" >> $O/summary.txt
echo ALLDONE >> $O/summary.txt
