#!/bin/bash
# G4 hook (KIT-STD-AUDIT, OD 27/11 ~04:33Z + ~04:39Z): KIT STANDARD SCAN — dev/test/kit-std-scan.js on Fold 755x1000 + iPad 1180x820 (gate mode SUBS=0).
# REPORT + BASELINE (law 11/16): FAIL when a rule's count is HIGHER than the frozen LIVE baseline dev/test/kit-std-baseline.json (counts may only shrink; only the
# coordinator lowers or raises the baseline, after KK fixes land). Scenes a build lacks (kitHand / kitPick / kitRing before they are live) count 0 in the baseline,
# so a branch that brings those parts must bring them CLEAN. Env from coregates: QC_WT QC_OUT QC_KIT.   exit 0 = PASS
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}; OUT=${QC_OUT:-/tmp/kit-std-scan}; mkdir -p "$OUT/kit-std"
B=$WT/dev/test/kit-std-baseline.json; [ -f "$B" ] || B=$KIT/dev/test/kit-std-baseline.json
SRC=$WT/dev/index.html; [ -f "$SRC" ] || SRC=$WT/index.html
SUBS=0 REPORT_ONLY=1 node "$KIT/dev/test/kit-std-scan.js" "$SRC" "$OUT/kit-std" > "$OUT/kit-std/scan.txt" 2>&1
node -e '
const fs=require("fs");const j=JSON.parse(fs.readFileSync(process.argv[1]+"/kit-std/kit-std-scan.json","utf8"));const b=JSON.parse(fs.readFileSync(process.argv[2],"utf8"));
const bad=[];for(const k of Object.keys(j.cnt)){const n=j.cnt[k],m=(b.cnt||{})[k]||0;if(n>m)bad.push(k+" "+n+" > baseline "+m)}
console.log("kit-std-scan total "+j.total+" (baseline "+b.total+") "+JSON.stringify(j.cnt));if(bad.length){console.log("FAIL "+bad.join(" · "));process.exit(1)}' "$OUT" "$B" || { grep -E '^FAIL' "$OUT/kit-std/scan.txt" | head -12; exit 1; }
