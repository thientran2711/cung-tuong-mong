# review stage-figsize-r1 (reviewer session, 11/16/2026)

Reviewed review/stage-figsize @ 2f071fe8 (= 91250714 stage fix + iPad safe-area commit in rot.js). Branch **review/stage-figsize-r1 @ 2994ce31** = 2f071fe8 + merge origin/main f1509d7c (assemble.py: union incl. jplfs.js + jcoopone.js + jlag2.js; index.html/sw.js/assets.json from main then rebuilt with build_site.sh). No code fixes needed.

## VERDICT: PASS 2994ce31 (stage part AND rot.js safe-area part)

| # | Check | Result |
|---|---|---|
| 1 | Figure scale | Body/stage: Fold 755x1000 .79, iPad 1180x820 .79 (492 of 623 px; live main measured .52 = the owner bug), 412x1058 .79. 1366x1024 .65 because of the pre-existing KIT_FIG.maxPx=542 cap (= .79 of the 1180 stage, owner 11/15; KIT.md 33). Same absolute size as the owner-approved 1180 look; not a regression. |
| 2 | Fold 2 fixed slots | stage-slots-fixed.js 755x1000: room/vườn/Thái y viện, every swipe view = 2 people, slots 189.5/436.5 on every view, floor same, pets at owner spot (cat right beside her, dog beside maid); nobody clipped, left figure clear of rail icons (looked at shots). A wide consort is pulled in <=33 px by kitSlotIn (by design). |
| 3 | No giant/clipped figure, label vs title | none at 755/1180/1366/412(host)/844 on figures. Minor, pre-existing, NOT blocking: 844x390 (stage 193 px) the 2-line name label of the left person ends 8 px below the stage bottom, and the place-title message wraps to 2 lines. |
| 4 | Side-card portraits | Hoàng thượng / Thái hậu / cung nữ thân tín load at every size; Hoàng hậu shows the grey silhouette (not met) = expected. |
| 5 | Devices | looked at 755x1000, 1180x820, 1366x1024, 844x390, 412x1058 (rotate prompt shows; unplayable state), Dư đồ map 755x1000 (side columns present). |
| 6 | KIT FIRST | slot geometry in KIT_SLOTS/kitSlotIn (jkit), KIT.md 33.12 + kit page sample; j59 only calls it; no per-place CSS; people use KIT_FIG .79. |
| 7 | Co-op | coop-e2e run 1 56/59 (room start "friend not yet a person/unknown", known flaky), run 2 **59/59**; coop-one-world PASS. |
| 8 | quickcheck | `QUICKCHECK PASS · 164 s · open 1338 ms · old save ok · render 261/273 ms` on 2994ce31. |
| rot.js | host-safe-area.js | PASS 7/7: 1366x1024 frame y75..1024 (flush bottom), 1180x820 insets 24/20 -> 17,24..1163,820, no-insets 0,0..1180,820, 1024x768, 755x1000, 412x1058 rotated. Note: on 4:3 iPad the spare 75 px strip is at the top (by design, owner photo). |

stage-slots-fixed.js PASS at 755x1000, 1180x820, 1366x1024, 844x390.

Shots (CDN, coordinator wipes: `python3 dev/site/cdn_sync.py --wipe-review stage-figsize-r1`): img/_review/stage-figsize-r1/ host-1180x820-room.jpg, host-1366x1024-room.jpg, r1-755x1000-room-v1.jpg, r1-755x1000-vuon-v1.jpg, r1-844x390-room-v1.jpg (https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-figsize-r1/<name>).

Open (optional follow-ups, not blocking): (a) 844x390 name label wrap/8 px clip; (b) 1366x1024 .65 by the kit cap — raise KIT_FIG.maxPx only if the owner wants bigger on the iPad Pro.
Context at stop ~25 %.
