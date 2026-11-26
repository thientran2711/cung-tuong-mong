#!/bin/bash
# LC19 full gate chain on a stack head (sequential; QC alone last). usage: gates8.sh <wt> <outdir>
SP=/tmp/claude-0/-home-user-cung-tuong-mong/ff67082d-61de-5735-be22-ba2a389ab142/scratchpad; W=$1; G=$2; mkdir -p $G; cd $W
r(){ n=$1; shift; s=$(date +%s); timeout 1500 "$@" > $G/$n.log 2>&1; e=$?; echo "$n exit=$e $(( $(date +%s)-s ))s :: $(tail -c 300 $G/$n.log | tr '\n' ' ' | cut -c1-200)" >> $G/SUMMARY; }
: > $G/SUMMARY; python3 dev/build/assemble.py >/dev/null 2>&1
python3 -I $SP/dupfn.py $W > $G/dup.txt; if diff $SP/dup_live.txt $G/dup.txt > $G/dup-globals.log; then echo "dup-globals exit=0 :: same as LIVE" >> $G/SUMMARY; else echo "dup-globals exit=1 :: $(tr '\n' ' ' < $G/dup-globals.log)" >> $G/SUMMARY; fi
r global-names node dev/test/global-names/scan.js
r news-runner-lines node dev/test/news-runner-lines.js dev/index.html
r tinbao-scan node dev/test/tinbao-words/scan.js
r place-rules node dev/test/place-rules.js
r stage-stay node dev/test/stage-stay.js
r mg-color node dev/test/mg-color.js dev/index.html
r mg-craft node dev/test/mg-craft.js dev/index.html --kinds=kim,ve
r art-slots node dev/test/art-slots.js
r makeup-set node dev/test/makeup-set.js .
r makeup-set-scan node dev/test/makeup-set-scan.js
r mg-noword-kit node dev/test/mg-noword-kit.js
r audio-ipad node dev/test/audio-ipad.js
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
r home-way-label-fold env DEV=fold node dev/test/home-way-label.js
r home-way-label-ipad env DEV=ipadAir node dev/test/home-way-label.js
r kit-why-scan-fold env DEV=fold node dev/test/kit-why-scan.js
r kit-why-scan-ipad env DEV=ipadAir node dev/test/kit-why-scan.js
r QC node dev/tools/quickcheck.js . ${QCBASE}/index.html --out $G/qc
echo DONE >> $G/SUMMARY
