#!/bin/bash
# quickcheck hook (button-crawl-fix-5 25/11, F #10 robot s6d: «Sang ngày mới» greyed with cards in Q and nothing on screen): a card is held only
# while a person view is ON SCREEN; a view parked by a tab change / gone holds nothing; a card left in Q with nothing on screen is shown
# (jdayq dqWake). Fold + iPad, real taps. ~1.5 min. QSL_SAVE=<localStorage dump> adds the old-save check (saves are not in git).
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}
grep -q "function dqWake" "$WT/dev/build/jdayq.js" 2>/dev/null || { echo "q-softlock: sha has no dqWake (pre button-crawl-fix-5 build)"; exit 0; }
T="$WT/dev/test/q-softlock.js"; [ -f "$T" ] || T="$KIT/dev/test/q-softlock.js"
node "$T" "$QC_URL" > "${QC_OUT:-/tmp}/q-softlock.log" 2>&1; rc=$?; tail -1 "${QC_OUT:-/tmp}/q-softlock.log"; exit $rc
