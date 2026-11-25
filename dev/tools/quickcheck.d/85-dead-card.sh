#!/bin/bash
# quickcheck hook (flight-modal-deadlock 25/11, law 11): no VIỆC card whose every option is greyed with no way out (soft-lock).
# Runs dev/test/dead-card.js on the new build: scan of every buildable card at bạc 0 + the two fixed j68c seeds + the jdeadcard net. ~1 min.
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}
[ -f "$WT/dev/build/jdeadcard.js" ] || { echo "dead-card: sha has no jdeadcard net (pre flight-modal-deadlock build)"; exit 0; }
T="$KIT/dev/test/dead-card.js"; [ -f "$T" ] || T="$WT/dev/test/dead-card.js"
node "$T" "$QC_URL" > "${QC_OUT:-/tmp}/dead-card.log" 2>&1; rc=$?; tail -1 "${QC_OUT:-/tmp}/dead-card.log"; exit $rc
