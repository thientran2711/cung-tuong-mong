#!/bin/bash
# quickcheck hook (review r1 17/11): every player-face anchor set must be plausible and the toil-fit mouth must agree with the face-mesh lips. Exit code decides: non-zero = the go-live FAILS.
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}
T="$KIT/dev/test/anchor-table.py"; [ -f "$T" ] || { echo "anchor-table: check missing in kit"; exit 1; }
[ -f "$WT/dev/art/toil-fit2.json" ] || { echo "anchor-table: sha has no dev/art/toil-fit2.json"; exit 1; }
ANCHOR_ROOT="$WT" python3 "$T" > "${QC_OUT:-/tmp}/anchor-table.log" 2>&1; rc=$?
head -6 "${QC_OUT:-/tmp}/anchor-table.log"; exit $rc
