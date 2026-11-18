# cloth-bake-static — report

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 (tea worker untouched) | main: jcloth.js bake only on stage path | review/* cloth-tea*, cloth-xoc* not touched | archive 0.
depth: worker (child of Foreman B ROOT-2). START_CTX ~8%.

## Root cause
`clothXocLayer` (jcloth.js) returned "" while the bake was still running. Only the stage path (kitFigFx) re-draws after the bake; static paths print kitFxLayers once, so a cold cache left them without the cloth mark forever.

## Fix (kit layer code only, jcloth.js)
- Cold cache now prints a blank WAIT layer (`img.kclo.kclo-wait`, same box/vars, same kit slot, under every face mark); when the bake finishes `clothPatch` puts the picture into every wait layer in the page. Cold = warm; stage path unchanged (its picture is hidden only under a FINISHED layer: `.kclo:not(.kclo-wait)`).
- Layer-order wrapper regex accepts the wait layer. `clothCacheReset()` added for tests. No private drawing, no new numbers (BAL untouched).

## Figure paths (git grep kitFxLayers / kitFxPut / kfxf)
| path | code | cloth layer |
|---|---|---|
| stage figures + her own `#mefig` + NPC + co-op friend token | kitFigFx -> kitFxPut | yes (friend = same token path, both seats) |
| podium (Bảng vàng, tranh ghế, hoàng tự, công chúa) | jface kpodFit -> kitFxPut | yes (same call) |
| event-stage / Dư đồ person figure | kitStageFig (jk4) -> kitFxLayers | yes (was missing cold) |
| mirror close-up | kitFaceZoom (jtoil) | yes (was missing cold; face crop, robe off-frame) |
| mirror reveal (Điểm trang) | toilReveal (jtoil) | yes (was missing cold) |
| portraits, person cards, list rows, avatars | pcPort/mdH + KIT_BAKE | NO by design: avatar = ID card, lasting marks only (jk2b comment, owner 17/11); cloth only on `fig-*` files |

## Before / after (test dev/test/cloth-bake-static.js, lv3; before = origin/main jcloth.js, wait 5 s)
| path | wet(uot)/mud(bun)/xốc cold BEFORE | cold AFTER | warm (both) |
|---|---|---|---|
| stage | baked | baked | baked |
| event-stage | MISSING x3 | baked x3 | baked |
| mirror close-up | MISSING x3 | baked x3 | baked |
| mirror reveal | MISSING x3 | baked x3 | baked |
Fold 755x1000@2 and iPad 1180x820@2: 24/24 PASS after.

## Tests
cloth-xoc OK, cloth-stain OK, one-core-guard PASS (fails 0). coop-e2e: exit 0, 63 ok, 0 FAIL (live Worker). quickcheck: started, still comparing against live when this report was written (slow) — reviewer to rerun.
Shots (scratch, not in git, looked at): Fold event-stage xốc cold = creases on robe; iPad mirror reveal xốc cold = creases aligned to the figure; mirror zoom = face only (robe off-frame, expected).

## Open
- Tea is OFF (MAIN's worker); same wait-layer path will serve it with no change.

## REVIEW r1 (sonnet SMALL reviewer, session_01N1tNP6FHq1uXMKTRfLvg5j; branch review/cloth-bake-static, base = current origin/main a95e8d41, no merge needed)
PRIORITY #1 CHECK: OD 0 for the fix itself (ID-card rule = OD:L1677 + 18/11 03:20Z/03:30Z lines) | ledger 0 | claims 0 conflicts | main 0 | review/* tea untouched.
1. Paths: git grep kitFxLayers/kitFxPut/kitStageFig/kitFaceZoom: stage, #mefig, NPC, co-op token, podium all go through kitFxPut; Dư đồ/event-stage (jk4, jpdlg, j79, j87, jfigseal, jkitpage, jmark) all go through kitStageFig; mirror = kitFaceZoom + toilReveal. 24-case test PASS on Fold + iPad. FOUND ONE MISS: on a cold cache the kitFxPut paths (podium, token) patched the layer but left the plain picture visible under it (warm hides it, `kclo-on`). FIXED in clothPatch (toggle kclo-on on the layer's own picture); test now has a 5th path `put` (cold/warm x uot/bun/xoc) = 30 cases, PASS both devices (before fix: 3 cold cases MISSING).
2. Leak: clothPatch is a one-shot querySelectorAll keyed by the bake entry id; no listeners, no timers, nothing to clear. A wait layer only ever receives the picture of its own file+level, so a fast switch cannot paint another person; layers in a closed view are detached nodes (harmless). Residual (pre-existing): a failed bake leaves a blank invisible wait layer (before: no layer) and the entry is not retried until evicted; no visual harm.
3. ID-card claim: backed for SMALL avatars (OD:L1677: base + lasting marks only). NOT fully backed for the LARGE person-card portrait: OD 17/11 20:25Z says the large portrait always shows today's look. Cloth marks are body marks and portraits are face crops (robe off-frame), so nothing is visibly missing today. QUESTION FOR MAIN: should the large full-body card figure (if any) show cloth? Not a FAIL.
4. KIT FIRST: layer built in the kit slot via kitFxLayers wrapper (jcloth.js); regex accepts the wait layer so order cold = warm; only CSS is `img.kclo-wait{opacity:0}` (invisible placeholder, no look). OK.
5. Tea OFF untouched; switches still read BAL.looks.* (no BAL change). 
Tests: cloth-bake-static 30/30 Fold 755x1000@2 + iPad 1180x820@2; cloth-xoc OK; cloth-stain OK; one-core-guard PASS fails 0; quickcheck PASS (164 s, old save ok, perf same as live; core gates + time-spill PASS); coop-e2e 63/63. Shots (scratch, not in git, looked at): Fold event-stage xốc cold, iPad mirror reveal xốc cold, iPad put xốc cold = creases on robe, face untouched.
VERDICT: PASS (with the r1 fix).
