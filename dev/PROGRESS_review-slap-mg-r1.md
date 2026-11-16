# review/slap-mg-r1 — reviewer r1 of review/slap-mg @3c4f1c81b (KIT §79)

Base: origin/main bad941b4 (contains facefx-all-r2). Merge commit + reviewer fixes on this branch.

## Merge
- Conflicts: assemble.py (main's module list + `jslap.js` after `jts.js`), jbal2.js (kept main's `BAL.rg` and the branch's `BAL.slap`), jface.js (branch's tiered slap on top of main's kit face-fx entry), KIT.md (kept main's §76 palace map / §77 rail; slap section renumbered §79 as the brief says). Generated files rebuilt (assemble.py + build_site.sh).

## Small fixes made by the reviewer
- ONE CORE: `odds:50` on the "Né đòn" card and `relAdd(S,a,-5)` on a full dodge were typed in jslap.js -> `BAL.slap.dodgeOdds` / `BAL.slap.missRel`.
- Old saves: main's tat `state()` (facefx-all-r2) sets a missing `sev` to 1 (nhẹ) while the branch's `slapSev` read it as 2 (vừa) -> one rule: nhẹ (jface.js + KIT §79 text).

## Face marks (the brief's main check)
- The mark is the `tat` entry of the shared `KIT_FACEFX` registry (cheekBox + kitFxVars, drawn through the one face-fx layer / kitFxLayers). No private overlay. Tier = class `s1/s2/s3` in the one face-fx stylesheet; nặng adds the painted `img/fx-slap-swell.png` (on the CDN, HTTP 200).

## Test results (755x1000)
- dev/test/slap-mg.js: no page errors; intro/bar no overflow; costs per tier OK (Đức -2/-4/-7, weeks 2/4/7, rel -15/-25/-40, Thái hậu on nặng); dodge card + game + result OK; NPC tier weights match BAL; spread 40 runs: skip 4/4 nhẹ, random tap 25/5/2, perfect-timing bot 0/1/3.
- The test's mark strip renders the person as an unmet silhouette ("Người lạ"), so it proves nothing about the marks (layers = 0 for every tier).

See dev/handover/reports/review-slap-mg-r1.md (docs branch) for the verdict.
