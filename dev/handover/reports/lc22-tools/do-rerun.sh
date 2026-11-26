SP=/tmp/claude-0/-home-user-cung-tuong-mong/3e807b63-1bf7-5ec4-af1b-dc63a015d060/scratchpad; W=$1; G=$2; mkdir -p $G; cd $W
r(){ n=$1; shift; s=$(date +%s); timeout 1500 "$@" > $G/$n.log 2>&1; e=$?; echo "$n exit=$e $(( $(date +%s)-s ))s :: $(tail -c 300 $G/$n.log | tr '\n' ' ' | cut -c1-200)" >> $G/SUMMARY; }
: > $G/SUMMARY; python3 $SP/srv.py 8796 $W >/dev/null 2>&1 & HP=$!; sleep 2; B=http://127.0.0.1:8796
r dayq-hold node dev/test/dayq-hold.js $B dev/index.html $G/dayq
r do-next-fold node dev/test/dialog-order-next-probe.js $B dev/index.html 755 1000 $G/next
r do-next-ipad node dev/test/dialog-order-next-probe.js $B dev/index.html 1180 820 $G/next
r do-held-fold node dev/test/dialog-order-held-probe.js $B dev/index.html 755 1000 $G/held
r do-held-ipad node dev/test/dialog-order-held-probe.js $B dev/index.html 1180 820 $G/held
r do-scan-fold node dev/test/dialog-order-scan.js $B dev/index.html 755 1000
r do-scan-ipad node dev/test/dialog-order-scan.js $B dev/index.html 1180 820
r dayq-order node dev/test/dayq-order.js $B dev/index.html $G/dqo
kill $HP
r dress-tap node dev/test/dress-tap.js index.html
r makeup-set node dev/test/makeup-set.js .
r audio-ipad node dev/test/audio-ipad.js
r info-tap-audit node dev/test/info-tap-audit.js index.html $G/info-tap.json
echo DONE >> $G/SUMMARY
