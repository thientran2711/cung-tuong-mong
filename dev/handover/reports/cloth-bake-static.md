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
