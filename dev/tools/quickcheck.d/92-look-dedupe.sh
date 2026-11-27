#!/bin/bash
# quickcheck hook (button-crawl-fix-2 25/11, law 11): look-up panels (Tâm trạng · X, Đã biết về X, Chứng cứ về X) — one per title, never saved,
# one ✕ closes; kit cards come back from a save with their body; the flight2 poisoned save (1998 empty copies) loads clean. Fold + iPad, real taps. ~1 min.
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}
grep -q "isLookCard" "$WT/dev/build/j3.js" 2>/dev/null || { echo "look-dedupe: sha has no look-up dedupe (pre button-crawl-fix-2 build)"; exit 0; }
T="$WT/dev/test/look-dedupe.js"; [ -f "$T" ] || T="$KIT/dev/test/look-dedupe.js"
node "$T" "$QC_URL" > "${QC_OUT:-/tmp}/look-dedupe.log" 2>&1; rc=$?; tail -1 "${QC_OUT:-/tmp}/look-dedupe.log"; exit $rc
