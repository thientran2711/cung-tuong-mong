## NO-BOOST (25/11, branch review/makeup-noboost, base LIVE 49f17d4d) — owner rule 25/11 ~04:29Z
PRIORITY #1 CHECK: OD 10 | ledger 0 | claims 0 | main 15 | review/* 0.
Rule: all looks except «Vụng về» and «Diêm dúa» keep the small-size boost (1.9, per-look weights, big.boost as LIVE). vung (incl. vungB) + diem: no boost; instead the macro cues go DOWN to x0.5 at the smallest face (lod 1), ramped by the same lod curve; full strength on big faces.
1. Her scene: stage layer is step 0 on LIVE (no boost); «Vụng về» heaviness = the vụng recipe itself (OD:L778).
2. ONE BAL place: BAL.toil.lod.soft:{looks:["vung","diem"],min:.5} (jtoil.js); toilLodT scales the cue parts by 1-(1-min)*lod for those looks, vụng powder dabs likewise. Other looks untouched.
3. CDN img/_review/makeup-noboost/: sheet-before.jpg / sheet-after.jpg (rows dep / vung / diem x lod 0..1), s3-pair.jpg (before | after at real avatar/card/chip face widths 90/60/42/28 px, real toilLodStep; dep same, vung+diem lighter).
## REVISION (owner 25/11 ~05:42Z, final)
Vụng big a little lighter (x.85), vụng smallest = same absolute look as d8e0381b (x.5); Diêm dúa big EXACTLY as before (x1), diêm smallest a bit stronger (x.595, was .5) so it reads gaudier than Khuynh thành. BAL.toil.lod.soft = {looks:["vung","diem"],big:{vung:.85,diem:1},min:{vung:.588,diem:.595}}; factor on the macro cues = big*(1-(1-min)*lod) (toilLodSoft, jtoil.js). Other looks untouched (Khuynh thành row pixel-identical).
Sheet CDN img/_review/makeup-noboost/s4-pair.jpg: top = d8e0381b, bottom = new; rows Khuynh thành / vụng / diêm dúa x face widths 120 / 90 / 60 / 42 / 28 px.
## FOLLOW-UP (owner 25/11 ~05:33Z)
Every look other than Vụng về / Diêm dúa gets NO small-size boost: BAL.toil.lod.boost 1.9 -> 1 (jtoil.js) and BAL.looks.smuFx.big.boost 1.25 -> 1 (jlooks.js). Vụng/diêm (BAL.toil.lod.soft) untouched: pixel-identical to 74068c07 in every cell. Sheet CDN img/_review/makeup-noboost/s5-pair.jpg: left = 74068c07, right = new; rows đẹp / Khuynh thành / vụng / diêm x 120/90/60/42/28 px (đẹp + Khuynh thành: big cells identical, small cells now = big strength).
