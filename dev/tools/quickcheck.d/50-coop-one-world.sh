#!/bin/bash
# G4 hook: co-op ONE WORLD probe (owner CO-OP FIRST 16/11 ~20:32Z: in co-op both players read the SAME number; review/coop-one-world).
# Runs the SHA's own dev/test/coop-one-world.js (coop-serve.js serves the files next to the script, so the sha's copy tests the sha's build;
# the kit's copy would test the kit's build). Two seeds. Exit != 0 = go-live FAIL.
set -o pipefail
CT=$QC_WT/dev/test/coop-one-world.js
[ -f "$CT" ] || { echo "coop-one-world: the sha has no dev/test/coop-one-world.js (it is on main since f1509d7c) — merge main"; exit 1; }
grep -q "COOP_ONE" "$QC_WT/dev/index.html" || { echo "coop-one-world: the build has no one-world guards (jcoopone.js)"; exit 1; }
rc=0
for sd in 7 3; do
  if SEED=$sd timeout 240 node "$CT" > "$QC_OUT/g4-coop-one-world-$sd.txt" 2>&1; then echo "seed $sd PASS: $(tail -1 "$QC_OUT/g4-coop-one-world-$sd.txt" | cut -c1-200)"
  else echo "seed $sd FAIL:"; tail -6 "$QC_OUT/g4-coop-one-world-$sd.txt"; rc=1; fi
done
exit $rc
