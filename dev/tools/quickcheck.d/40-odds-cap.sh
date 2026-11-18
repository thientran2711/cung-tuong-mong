#!/bin/bash
# quickcheck hook (odds-cap r3 review 18/11, owner OD 17/11 17:00Z + 17:35Z): capRes keeps every noise-draw result inside the ONE odds cap
# (final chance = oddsCl(o): floor BAL.odds.lo, cap BAL.odds.hi). Unit draw on the sha's own j1/jbal, ~0.1 s. Non-zero = the go-live FAILS.
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}
T="$KIT/dev/test/odds-cap.js"; [ -f "$T" ] || T="$WT/dev/test/odds-cap.js"; [ -f "$T" ] || { echo "odds-cap: test missing"; exit 1; }
grep -q "^function capRes(" "$WT/dev/build/j1.js" || { echo "odds-cap: sha has no capRes (pre odds-cap build)"; exit 0; }
OC_BUILD="$WT/dev/build" node "$T" > "${QC_OUT:-/tmp}/odds-cap.log" 2>&1; rc=$?; tail -1 "${QC_OUT:-/tmp}/odds-cap.log"; exit $rc
