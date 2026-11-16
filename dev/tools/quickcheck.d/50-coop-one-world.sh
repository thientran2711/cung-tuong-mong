#!/bin/bash
# Go-live gate (quickcheck.d contract, review/one-core-land): co-op ONE WORLD (owner OD:L96; review/coop-one-world).
# Two seats on one page + the real server merge3: the guest's week must change no world path, merged == host, her acts kept.
# env QC_WT = worktree with the built sha, QC_KIT = kit root, QC_OUT = log dir. Exit 0 = PASS. ~30 s.
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}; OUT=${QC_OUT:-/tmp}
T="$KIT/dev/test/coop-one-world.js"; [ -f "$T" ] || { echo "coop-one-world: probe missing in kit"; exit 1; }
grep -q "COOP_ONE" "$WT/dev/index.html" || { echo "coop-one-world: build has no one-world guards (jcoopone.js)"; exit 1; }
rc=0; for s in 7 3; do QC_WT="$WT" SEED=$s timeout 120 node "$T" > "$OUT/coop-one-world-$s.log" 2>&1 || rc=1; tail -1 "$OUT/coop-one-world-$s.log"; done
exit $rc
