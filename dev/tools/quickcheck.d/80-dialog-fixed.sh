#!/bin/bash
# quickcheck hook (kit-dialog 21/11, owner marks #44 #47 #49, angry repeat): the kit dialog frame + option card regression test dev/test/dialog-fixed.js on Fold 755x1000 + iPad 1180x820:
# odds on the title row, iPad 2 columns, picture fills the card, only the option list scrolls, ONE Trân nữ seal place + size, same figure in same-size frames. Non-zero = the go-live FAILS.
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}
T="$KIT/dev/test/dialog-fixed.js"; [ -f "$T" ] || { echo "dialog-fixed: test missing in kit"; exit 1; }
URL=${QC_URL:-file://$WT/index.html}
( cd "$WT" && timeout 280 node "$T" "$URL" "${QC_OUT:-/tmp}/dialog-fixed-shots" ) > "${QC_OUT:-/tmp}/dialog-fixed.log" 2>&1; rc=$?; grep '^FAIL' "${QC_OUT:-/tmp}/dialog-fixed.log" | head -5; tail -1 "${QC_OUT:-/tmp}/dialog-fixed.log"; exit $rc
