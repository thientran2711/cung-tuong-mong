#!/bin/bash
# quickcheck hook (act-pic-match 18/11): the manifests LIVE on the CDN must not be below the committed floor (FIGURES*, ACTS.json, EVENTS.json), ACTS.json
# must have its "log" rules and "-h" keys. A stale-checkout cdn_sync overwrote them on 17/11 02:41Z and nobody noticed for a day. Non-zero = the go-live FAILS.
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}
python3 "$KIT/dev/site/manifest_guard.py" --live-check > "${QC_OUT:-/tmp}/manifest-guard.log" 2>&1; rc=$?; tail -6 "${QC_OUT:-/tmp}/manifest-guard.log"; [ $rc = 0 ] || exit $rc
# cdn-kc-guard 19/11: every manifest push path (CLI, direct put(), DELETE, --prune, --allow-shrink without --reason) stays guarded
python3 -I "$KIT/dev/test/manifest-guard-selftest.py" > "${QC_OUT:-/tmp}/manifest-guard-selftest.log" 2>&1; rc=$?; tail -1 "${QC_OUT:-/tmp}/manifest-guard-selftest.log"; exit $rc
