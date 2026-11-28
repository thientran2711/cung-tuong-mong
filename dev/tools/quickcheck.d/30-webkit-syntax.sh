#!/bin/bash
# quickcheck hook (KK66 webkit-lb 28/11; owner iPad 15/11 "Bị gì đây mới vào game"): the ONE game <script> must PARSE on older iPad/iPhone
# Safari (< 16.4). One regex lookbehind LITERAL (or flag v/d, class static block) anywhere = the whole game dead on that device.
# Runs dev/test/webkit-syntax.js on the sha's own dev/build (acorn tokens, ~2 s). Fix a hit with kRx("pattern","flags") (j0). Non-zero = the go-live FAILS.
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}
T="$KIT/dev/test/webkit-syntax.js"; [ -f "$T" ] || T="$WT/dev/test/webkit-syntax.js"; [ -f "$T" ] || { echo "webkit-syntax: test missing"; exit 1; }
L="${QC_OUT:-/tmp}/webkit-syntax.log"; node "$T" "$WT/dev/build" > "$L" 2>&1; rc=$?
[ $rc != 0 ] && grep '| parse' "$L" | head -20; echo "webkit-syntax: $(tail -1 "$L")"; exit $rc
