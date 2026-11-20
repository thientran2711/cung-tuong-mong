#!/bin/bash
# quickcheck hook (npc-purpose 18/11, owner OD 18/11 ~04:08Z): every converted NPC-event row calls the jagwhy goal helper; no row changed without a goal source. Non-zero = the go-live FAILS.
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}
[ -f "$WT/dev/test/npc-purpose-rows.json" ] || { echo "npc-purpose-scan: sha has no rows file (skipped)"; exit 0; }
( cd "$WT" && node "$KIT/dev/test/npc-purpose-scan.js" ) > "${QC_OUT:-/tmp}/npc-purpose-scan.log" 2>&1; rc=$?; tail -3 "${QC_OUT:-/tmp}/npc-purpose-scan.log"; exit $rc
