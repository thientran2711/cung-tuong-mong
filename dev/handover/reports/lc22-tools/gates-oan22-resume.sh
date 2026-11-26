#!/bin/bash
# LC19 full gate chain on a stack head (sequential; QC alone last). usage: gates8.sh <wt> <outdir>
SP=/tmp/claude-0/-home-user-cung-tuong-mong/d1722c2f-a2c9-5430-8732-a39a2b47a7d4/scratchpad; W=$1; G=$2; mkdir -p $G; cd $W
r(){ n=$1; shift; s=$(date +%s); timeout 1500 "$@" > $G/$n.log 2>&1; e=$?; echo "$n exit=$e $(( $(date +%s)-s ))s :: $(tail -c 300 $G/$n.log | tr '\n' ' ' | cut -c1-200)" >> $G/SUMMARY; }
 python3 dev/build/assemble.py >/dev/null 2>&1
r info-tap-audit node dev/test/info-tap-audit.js index.html $G/info-tap.json
r fullscene-band node dev/test/fullscene-band.js .
r kit-entry-gate node dev/test/kit-entry-gate.js
r tainghe-info node dev/test/tainghe-info.js index.html $G/tainghe
r mg-color-scan python3 dev/test/mg-color-scan.py
r place-rules-scan python3 dev/test/place-rules-scan.py
python3 -m http.server 8795 --bind 127.0.0.1 >/dev/null 2>&1 & HP=$!; sleep 2
r ipad-size-ratio node dev/test/ipad-size-ratio.js http://127.0.0.1:8795/index.html $G/ipad.json
kill $HP
r kit-row-tap-size node dev/test/kit-row-tap-size.js index.html
r kit-ef-unit node dev/test/kit-ef-unit.js file://$PWD/index.html $G/efunit
r kit-e-rows node dev/test/kit-e-rows.js index.html
r kit-cost-rows-home node dev/test/kit-cost-rows-home.js index.html
r kit-gain-list-scan node dev/test/kit-gain-list-scan.js file://$PWD/index.html --fail
r emoseal-ipad node dev/test/emoseal-nonplay-scan.js file://$PWD/index.html 1180x820 20 --fail
r emoseal-fold node dev/test/emoseal-nonplay-scan.js file://$PWD/index.html 755x1000 20 --fail
r home-way-fold env DEV=fold node dev/test/home-way.js
r home-way-ipad env DEV=ipadAir node dev/test/home-way.js
r punish-weight-scan python3 dev/test/punish-weight-scan.py
r promo-root env GAME=$PWD/index.html node dev/test/promo-root.js
r balance-pace env GAME=$PWD/index.html node dev/test/balance-pace.js
r dress-tap node dev/test/dress-tap.js index.html
r mghelp-back-fold node dev/test/mghelp-back.js index.html 755x1000
r mghelp-back-ipad node dev/test/mghelp-back.js index.html 1180x820
r mg-back-fold node dev/test/mg-back.js index.html 755x1000
r mg-back-ipad node dev/test/mg-back.js index.html 1180x820
r ob-oan node dev/test/ob-oan.js $PWD /home/user/wt/ctp - 755x1000@1 1180x820@1
r kit-gloss-lower node dev/test/kit-gloss-lower.js
r ob-oan-scan python3 dev/test/ob-oan-scan.py
r ob-oan-enc node dev/test/ob-oan-enc.js $PWD - 755x1000@1 1180x820@1
r QC node dev/tools/quickcheck.js . ${QCBASE}/index.html --out $G/qc
echo DONE >> $G/SUMMARY
