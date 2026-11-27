#!/bin/bash
# quickcheck hook (button-crawl-fix-6 25/11, F #12; robot s4d no-clock loops + BIG REVIEWER #4 stale S.mg): never a greyed «Sang buổi» with nothing on
# screen — a visitor scene parked by a tab change is one tap away (button says «Có người đang đợi · về phòng»); a stale S.mg (no mini-game on screen)
# is healed by the jdayq safety net. Fold + iPad, real taps. ~2 min. NEXT_SAVE=<robot save flight2-s4d-loop3/loop-3-save.json> adds part A.
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}
grep -q "function dqBring" "$WT/dev/build/jdayq.js" 2>/dev/null || { echo "next-dead: sha has no dqBring (pre button-crawl-fix-6 build)"; exit 0; }
T="$WT/dev/test/next-dead.js"; [ -f "$T" ] || T="$KIT/dev/test/next-dead.js"
node "$T" "$QC_URL" > "${QC_OUT:-/tmp}/next-dead.log" 2>&1; rc=$?; tail -1 "${QC_OUT:-/tmp}/next-dead.log"; exit $rc
