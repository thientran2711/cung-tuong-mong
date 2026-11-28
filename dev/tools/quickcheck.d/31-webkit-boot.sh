#!/bin/bash
# quickcheck hook (KK66 webkit-lb 28/11; owner iPad 15/11): boot the NEW build as older Safari (< 16.4) would — RegExp throws on any lookbehind,
# so a pattern built at run time with new RegExp("(?<…") instead of kRx kills the game too (the static 30-webkit-syntax gate cannot see those).
# Runs dev/test/webkit-boot.js on $QC_URL: 0 page errors, boot cover lets go, title up, VP.fix same as native. Non-zero = the go-live FAILS.
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}
T="$KIT/dev/test/webkit-boot.js"; [ -f "$T" ] || T="$WT/dev/test/webkit-boot.js"; [ -f "$T" ] || { echo "webkit-boot: test missing"; exit 1; }
[ -n "$QC_URL" ] || { echo "webkit-boot: no QC_URL"; exit 1; }
O="${QC_OUT:-/tmp}"; timeout 300 node "$T" "$QC_URL" "$O" > "$O/webkit-boot.log" 2>&1; rc=$?
[ $rc != 0 ] && grep -E '^FAIL|old-safari' "$O/webkit-boot.log" | head -8 | cut -c1-400; echo "webkit-boot: $(tail -1 "$O/webkit-boot.log")"; exit $rc
