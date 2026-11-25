#!/bin/bash
# quickcheck hook (button crawler, owner OD 25/11 ~05:10Z «cho robot đi bấm từng cái nút ... nó work cho đúng» + real taps «như người bấm thật»):
# FAST mode of dev/test/button-crawl.js on the new build, Fold 755x1000: the title screen + a fresh life's home screen and every screen one
# tap away; every visible button is REAL-TAPPED (dev/test/realtap.js: elementFromPoint hit-check, then a touch tap at its centre).
# FAIL = a dead button (covered / off-screen), a JS error on a tap, or a ✕/close that does not close its frame. ~1.5 min.
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}
T="$KIT/dev/test/button-crawl.js"; [ -f "$T" ] || { echo "button-crawl: no crawler in this kit"; exit 0; }
O="${QC_OUT:-/tmp}/button-crawl"; mkdir -p "$O"
node "$T" --fast --game "$QC_URL" --out "$O" > "$O/run.log" 2>&1; rc=$?; grep -E '^  FAIL' "$O/run.log" | head -8; tail -1 "$O/run.log"; exit $rc
