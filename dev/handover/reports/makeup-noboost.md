## NO-BOOST (25/11, branch review/makeup-noboost, base LIVE 49f17d4d) — revised by owner 25/11 ~04:27Z
PRIORITY #1 CHECK: OD 10 | ledger 0 | claims 0 | main 15 | review/* 0.
Owner rule: size boost stays for the good looks; «Vụng về» and «Diêm dúa» get NO boost at any size.
1. Her scene: stage layer is step 0 on LIVE (no boost); «Vụng về» heaviness = the vụng recipe itself (deliberate, OD:L778).
2. Change (one BAL place): BAL.toil.lod.noBoost:["vung","diem"] (jtoil.js). toilLodT returns the colours unchanged for these looks and the vụng powder dabs skip the boost. vung covers vungB too. Boost 1.9 stays for moc/vua/dep/tuyet (per-look weights unchanged). smuFx.big.boost 1.25 untouched (applies to the smudge/lem effect on large faces, not a look; not look-specific).
3. Shots CDN img/_review/makeup-noboost/: sheet-before/after.jpg (rows dep / vung / diem x lod 0..1: dep darkens as before, vung+diem constant), pair-755x1000.jpg, pair-1180x820.jpg (stage unchanged).
