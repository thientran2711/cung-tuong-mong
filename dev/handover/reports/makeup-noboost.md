## NO-BOOST (25/11, branch review/makeup-noboost, base LIVE 49f17d4d)
PRIORITY #1 CHECK: OD 10 | ledger 0 | claims 0 | main 15 | review/* 0 | archive 0 (toil.lod / lkLodMul / big.boost).
1. Her scene: the stage layer is step 0 on LIVE (measured: stage img.kmkc dataset.mkk |L0, step forced 0 since 18/11) => NO boost applied on her stage; the heaviness of «Vụng về» is the vụng recipe itself (lilac lid, strong blush, red lip; deliberately clumsy, OD:L778). Smaller places (avatars/cards/chips under 95 px face) WERE boosted x1.9 (before sheet: rows get darker left to right).
2. Removed: BAL.toil.lod.boost 1.9 -> 1 (jtoil.js; feeds toilLodT, vụng dabs, jlooks lkLodMul smudge) and BAL.looks.smuFx.big.boost 1.25 -> 1 (jlooks.js). Code paths kept; one place each, no typed numbers elsewhere.
3. Shots on CDN img/_review/makeup-noboost/: sheet-before.jpg / sheet-after.jpg (same face, lod 0..1: before differs, after identical), pair-755x1000.jpg and pair-1180x820.jpg (before | after, stage unchanged).
4. Tests: smudge-code.js PASS (growing, balOnly, no errs).
