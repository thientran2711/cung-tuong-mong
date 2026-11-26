#!/bin/bash
# LC19 full gate chain on a stack head (sequential; QC alone last). usage: gates8.sh <wt> <outdir>
SP=/tmp/claude-0/-home-user-cung-tuong-mong/3e807b63-1bf7-5ec4-af1b-dc63a015d060/scratchpad; W=$1; G=$2; mkdir -p $G; cd $W
r(){ n=$1; shift; s=$(date +%s); timeout 1500 "$@" > $G/$n.log 2>&1; e=$?; echo "$n exit=$e $(( $(date +%s)-s ))s :: $(tail -c 300 $G/$n.log | tr '\n' ' ' | cut -c1-200)" >> $G/SUMMARY; }
: > $G/SUMMARY; python3 dev/build/assemble.py >/dev/null 2>&1
r global-names node dev/test/global-names/scan.js
r place-rules node dev/test/place-rules.js
r stage-stay node dev/test/stage-stay.js
r info-tap-audit node dev/test/info-tap-audit.js index.html $G/info-tap.json
r kit-entry-gate node dev/test/kit-entry-gate.js
r kit-e-rows node dev/test/kit-e-rows.js index.html
r kit-cost-rows-home node dev/test/kit-cost-rows-home.js index.html
r kit-gain-list-scan node dev/test/kit-gain-list-scan.js file://$PWD/index.html --fail
r home-way-fold env DEV=fold node dev/test/home-way.js
r home-way-ipad env DEV=ipadAir node dev/test/home-way.js
r promo-root env GAME=$PWD/index.html node dev/test/promo-root.js
r balance-pace env GAME=$PWD/index.html node dev/test/balance-pace.js
r dress-tap node dev/test/dress-tap.js index.html
r mghelp-back-fold node dev/test/mghelp-back.js index.html 755x1000
r mghelp-back-ipad node dev/test/mghelp-back.js index.html 1180x820
r mg-back-fold node dev/test/mg-back.js index.html 755x1000
r mg-back-ipad node dev/test/mg-back.js index.html 1180x820
r home-way-label-fold env DEV=fold node dev/test/home-way-label.js
r home-way-label-ipad env DEV=ipadAir node dev/test/home-way-label.js
r kit-why-scan-fold env DEV=fold node dev/test/kit-why-scan.js
r kit-why-scan-ipad env DEV=ipadAir node dev/test/kit-why-scan.js
r observer-leak-fold node dev/test/observer-leak.js index.html 755x1000
r observer-leak-ipad node dev/test/observer-leak.js index.html 1180x820
r scroll-cue-loop-fold node dev/test/scroll-cue-loop.js index.html 755x1000
r scroll-cue-loop-ipad node dev/test/scroll-cue-loop.js index.html 1180x820
r QC node dev/tools/quickcheck.js . ${QCBASE}/index.html --out $G/qc
echo DONE >> $G/SUMMARY
