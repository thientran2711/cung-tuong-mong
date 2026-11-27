#!/bin/bash
# quickcheck hook (button-crawl-fix-4, owner OD 25/11 ~05:10Z «nút nào cũng work», law 11): a press never rebuilds the card under the finger.
# Runs dev/test/press-keep.js on the new build, Fold 755x1000 (touch) + iPad 1180x820 (mouse), real taps: kit option cards + the cung nữ «Tuyển chọn»
# card choose from a press on their Tốn/Được row; an open dialog left alone writes nothing (no self-triggering observer loop). ~1.5 min.
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}
T="$KIT/dev/test/press-keep.js"; [ -f "$T" ] || T="$WT/dev/test/press-keep.js"; [ -f "$T" ] || { echo "press-keep: no test in this kit"; exit 0; }
node "$T" "$QC_URL" > "${QC_OUT:-/tmp}/press-keep.log" 2>&1; rc=$?; grep '^FAIL' "${QC_OUT:-/tmp}/press-keep.log" | head -6; tail -1 "${QC_OUT:-/tmp}/press-keep.log"; exit $rc
