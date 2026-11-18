# REVIEW kit-set-lines 699bc1b — PASS
PRIORITY #1 CHECK: brief briefs/kit-set-lines.md + report reports/kit-set-lines.md; OD 17/11 ~20:47Z/~21:20Z; KIT_REQUESTS row (6); main a95e8d4.

## Checks
- Fast-forward of live main a95e8d4: OK (merge-base = a95e8d4).
- Kit-first: ONE part kitSetLines (jdisp.js, window.kitSetLines) used by display-room footer AND shelfOpen (jshelf, kitFacts fallback only if part absent); CSS inside the existing kit-disp style; registered in KIT.md 89.6 + kit sample 89 (4 fixture lines); row (6) closed. No other reader of shelfView().sets.
- Wording: lines come from jshelf (text unchanged, only field k added); fixture lines have no typed number (one-core-guard PASS).
- BAL.shelf.ui stays 0 (jbal2); display room + rail hidden on live, nothing visible changes today.
- Shots LOOKED (fold 755x1000@2, ipadAir 1180x820@2): footer under the cabinet, 4 dot kinds readable, no cut text, no overflow; broken cabinet image top-left = known stub.

## Tests (my runs on 699bc1b)
- display-room fold PASS; ipadAir PASS 2 of 3 runs. The FAIL run: real-data block expects >=2 glowing pieces, but the random new life was under rank for the fan, so the set was correctly "khuyet" (bad) and glow = 0. Strip text = shelfView text and modal rows matched. Test-data flake (random origin), not a product bug. Suggest: pin rank / over-rank in that block.
- set-bonus-check PASS; shelf-check PASS; one-core-guard PASS; quickcheck PASS (old save ok, core gates PASS, time-spill guard PASS).
- Not run: ipadPro/foldLand, coop-e2e (same layout code / no coop change).
