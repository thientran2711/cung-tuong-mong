## NO-BOOST (25/11, branch review/makeup-noboost, base LIVE 49f17d4d) — owner rule 25/11 ~04:29Z
PRIORITY #1 CHECK: OD 10 | ledger 0 | claims 0 | main 15 | review/* 0.
Rule: all looks except «Vụng về» and «Diêm dúa» keep the small-size boost (1.9, per-look weights, big.boost as LIVE). vung (incl. vungB) + diem: no boost; instead the macro cues go DOWN to x0.5 at the smallest face (lod 1), ramped by the same lod curve; full strength on big faces.
1. Her scene: stage layer is step 0 on LIVE (no boost); «Vụng về» heaviness = the vụng recipe itself (OD:L778).
2. ONE BAL place: BAL.toil.lod.soft:{looks:["vung","diem"],min:.5} (jtoil.js); toilLodT scales the cue parts by 1-(1-min)*lod for those looks, vụng powder dabs likewise. Other looks untouched.
3. CDN img/_review/makeup-noboost/: sheet-before.jpg / sheet-after.jpg (rows dep / vung / diem x lod 0..1), s3-pair.jpg (before | after at real avatar/card/chip face widths 90/60/42/28 px, real toilLodStep; dep same, vung+diem lighter).
## REVISION (owner 25/11 ~05:30Z)
Diêm dúa ok; big faces of vung + diem a little lighter, vung smallest = same absolute look as d8e0381b, diem smallest a bit stronger (reads gaudier than Khuynh thành). BAL.toil.lod.soft = {looks:["vung","diem"],big:.85,min:{vung:.588,diem:.7}}; factor on the macro cues = big*(1-(1-min)*lod) (toilLodSoft, jtoil.js). Absolute: vung small x.5 (unchanged), diem small x.595 (was .5), both x.85 on big faces. Other looks untouched (tuyet row pixel-identical before/after).
Sheet CDN img/_review/makeup-noboost/s4-pair.jpg: top = d8e0381b, bottom = new; rows Khuynh thành / vụng / diêm dúa x face widths 120 / 90 / 60 / 42 / 28 px (real toilLodStep).
