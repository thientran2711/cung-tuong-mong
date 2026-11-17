#!/bin/bash
# quickcheck hook (toil-looks2 17/11): the makeup COLOUR LAYERS of every mesh face (no fallback lip oval, lips inside the layer box, mouth between eyes and chin). Non-zero = the go-live FAILS.
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}
[ -f "$WT/dev/art/mkfit/consort-c01.json" ] || { echo "mk-layer-scan: sha has no dev/art/mkfit"; exit 1; }
URL=${QC_URL:-file://$WT/index.html}
( cd "$WT" && node "$KIT/dev/test/mk-layer-scan.js" "$URL" "$WT" ) > "${QC_OUT:-/tmp}/mk-layer-scan.log" 2>&1; rc=$?; tail -4 "${QC_OUT:-/tmp}/mk-layer-scan.log"; exit $rc
