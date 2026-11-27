# DLG-DEAD-BTN — dead dialog buttons family + item picker reach + NO-EFFECT-HOLD (MAIN 179 worker)

Worker session_01Rc5AsJAihYBEicPEmHh83N (opus, depth 1, START_CTX ≈ 4 % (get_session used_tokens reads 0 → own estimate), roll at ≈ 29 %, ceiling 60 %).
Coordinator MAIN 179 session_01Rc5AsKs9pwks1oTM4gcZSm · UI reviewer RV-175 (id via MAIN 179).
Branch **review/dlg-dead-btn** = review/live-bugs-2711-rv af294eb2 (Foreman D's gift dead tiles, FF on LIVE 772bee4f, merged first as ordered — not redone) + this work.

PRIORITY #1 CHECK ('dlg-dead-btn' / 'Đông sở' / 'Để sau' / 'kipgo' / 'no-effect'): OD 3 ('Đông sở', selection) | ledger 0 | claims: D-LIVEBUGS3 (gift tiles, review/live-bugs-2711-rv) | main 772bee4f: jnotice.js «Tin báo» close already «Đóng» = kit ✕ (KK56 X18), jverdict.js isNav (NAV release), jgpick.js 28.13i grid, jkring-item.js kitRingItem (maxN 24) | review/*: **titles-daycard-lrm3 14a3a4c2** (Foreman E E-TITLES3: «Danh hiệu mới» «Để sau» = the same fault, fixed in jkhand kitHandWants, waiting KK59 jkhand ack), **picker-dom eccb77fa** (Foreman D: item grid pages of BAL.kip.page tiles, waiting kit sign-off), live-bugs-2711-rv af294eb2 (merged) | KIT_REQUESTS: K-RING-ALL (kitRingItem cut at 24, KK59 owns) | archive: robot results review/flight2-s18 / flight2-s20 (s18b, s20b) read.
KIT CHECK: reuses kit ✕ (j3 kitCancelIx / kit-x), kit hand (jkhand) untouched, kit result card (j63 resultShow + jverdict RESULT-FIRST hold) — no new part, no CSS, no player word changed.

## Faults and what each one is (Fold 755x1000 + iPad 1180x820, real taps)
| # | Foreman F fault (LIVE) | root cause found | owner / fix |
|---|---|---|---|
| 1 | «Tin báo» «Để sau» dead after 3 real taps (s18b, LIVE 611fca61) | the panel's close-only option was a hand CARD named «Để sau» (a tap only lifts it) | **already fixed on LIVE 772bee4f** by KK56 (X18): jnotice names it «Đóng» → the kit ✕. Scan: ok on LIVE and branch. |
| 2 | «Danh hiệu mới» «Để sau» dead (F 12:20Z) | same family: dhNotice is a kit panel (kind reward) drawn as a HAND; «Để sau» is a card → one tap lifts, never closes; the panel has no ✕ | **review/titles-daycard-lrm3 14a3a4c2** (Foreman E, E-TITLES3, jkhand: a title panel is never a hand) — NOT redone here (law 13). Scan FAILs on LIVE + branch (expected until it lands); verified ok on 14a3a4c2 (table below). |
| 3 | «Đông sở» .dlg scrolled to the end has no close / next (s18b, s20b) | not a dead dialog: the selection free card (jselxday selxFree, kit scene panel .kpsc) is a DECISION card — its ways on are its 5 option cards («Ngồi yên chờ tới tối» etc.); it must not have a ✕ (closing it would leave her with no card during the 3 days, «Sang buổi» shut). Robots looked for ✕ / «Tiếp» only; their own note says «later visits unstuck at once by taps». The 150-tap no-clock loop = the robot choosing «Ra Dư đồ» → tapping its own part on the map (0 khắc) again and again. | harness false positive. Scan: after scrolling to the end every option is on screen and «Ngồi yên chờ tới tối» moves on by real tap (lift → ✓) on both devices, LIVE and branch. |
| 4 | «Biếu quà làm lành» 326 confirms disabled + dead item cards (s16c) | dead tiles = pieces she could never give listed as tiles | **review/live-bugs-2711-rv** (Foreman D, merged into this branch): y14 save 1,262 tiles → 207 pickable, confirm enabled. |
| 5 | item cards outside the viewport / «kipgo» off-screen after 8 scrolls (s16c iPad, s21a iPad, s18d Fold) | players see the RING (kitRingItem, kriOn) — every ring tile turns to the front and is tappable, the act runs; but the ring shows only KIT_RINGI.maxN = 24 pieces (the rest unreachable) = **K-RING-ALL** (KK59). Robots (and ring-off) see the GRID: every tile is reachable by real scrolling, but the confirm sits under the whole grid (goBelow px in the table: a person scrolls past every tile to give one) | K-RING-ALL → KK59 (kit keeper, filed already); grid confirm distance → **picker-dom** (pages of 24, Foreman D, waiting sign-off) — measured on it below; no change here (law 9: 28.13i is a kit part with a pending owner). |
| 6 | NO-EFFECT-HOLD (MAIN 178 ruling 13:00Z / 13:42Z: a «không được gì, cũng không mất gì» result must not hold) | jverdict RESULT-FIRST: any result card drawn by a choice held the next card behind «Tiếp ▸», also when it said only «ta không được gì, cũng không mất gì» | **fixed here** (jverdict.js `noFx`): such a card releases like a NAV option — the next card shows at once, the result card still shows and fades. A result with a gain still holds (control case). |

## Fixes in this branch
- `dev/build/jverdict.js`: `noFx(r)` reads kaLastResult (rows only «Ghi chú» «ta không được gì, cũng không mất gì», no Được / Mất / Kèm, no fold) → at the end of the choice `RF.mine=0` (stat `RF.stat.nofx`), and the late-card path skips the take-back. Same release as isNav; nothing else in the hold engine changed.
- `dev/build/jkhand.js` **K-HAND-STALE** (fault found by this scan, same family as F's «Tin báo» «Để sau» → «Đặt lại» / «Chọn lá này» dead): a card lifted on one queue card, then that card replaced by the next, left the lift plate + ✓/✕ pair on the new card with no lifted card — ✓ tapped 3× did nothing, the plate covered the hand. `kitHandStale(M)` hides them on a frame drawn with no lifted card; a ✓/✕ with no lifted card clears itself. Kit part → KK59 ack.
- `dev/test/dlg-dead-scan.js` (new): the family scan (below). index.html / sw.js rebuilt (`bash dev/site/build_site.sh`), assets.json = LIVE.

## Scan — `node dev/test/dlg-dead-scan.js [--root wt] [--dev fold,ipad] [--only …] [--save file] [--tiles N] [--out dir]`
Opens each dialog with the game's own producer (setup only), scrolls every scroller of the dialog to its END with real touch drags, hit-tests every way out
(realtap.js PROBE), REAL-TAPS the way out (rt.tap; option cards rt.choose = lift → ✓) and checks the dialog closed / moved on within 2.5 s.
Families: Tin báo (4 news / 24 news long / opened twice), closing toast «Tin báo», Danh hiệu mới, long event card (18 paragraphs, 6 options), Lịch tháng (once / twice),
selection «Đông sở», NO-EFFECT-HOLD + control, item pickers: ring face (Biếu quà làm lành / Tặng quà / Dâng quà — every ring tile to the front by › + front tap +
main act) and grid face (every tile by real scroll + tap, confirm reach + distance). Saves: F/handover fixtures y05-ncBtuc-035 (dialogs) and y14-ncBtuc-010 (chest 1,437).

### Before / after (full run, sequential, saves y05 dialogs / y14 pickers; tiles tested per grid: 120)
| case | device | LIVE 772bee4f | review/dlg-dead-btn |
|---|---|---|---|
| tinbao | fold | ok | ok |
| tinbao | ipad | ok | ok |
| tinbaolong | fold | ok | ok |
| tinbaolong | ipad | ok | ok |
| toast | fold | ok | ok |
| toast | ipad | ok | ok |
| danhhieu | fold | FAIL — «Để sau!» tapped 3× for real, dialog stays | FAIL — «Để sau!» tapped 3× for real, dialog stays |
| danhhieu | ipad | FAIL — «Để sau!» tapped 3× for real, dialog stays | FAIL — «Để sau!» tapped 3× for real, dialog stays |
| eventlong | fold | ok | ok |
| eventlong | ipad | ok | ok |
| lichthang | fold | ok | ok |
| lichthang | ipad | ok | ok |
| lichthang2 | fold | ok | ok |
| lichthang2 | ipad | ok | ok |
| tinbao2 | fold | ok | ok |
| tinbao2 | ipad | ok | ok |
| dongso | fold | FAIL — «Ngồi yên chờ tới tốiTốnkhôngĐượctới ngay buổi tối,» tapped 1× (order-dependent in the full run only; alone 2/2 ok on LIVE) | ok |
| dongso | ipad | ok | ok |
| nofx_hold | fold | FAIL — a no-effect result held the next card behind «Tiếp ▸» | ok |
| nofx_hold | ipad | FAIL — a no-effect result held the next card behind «Tiếp ▸» | ok |
| fx_hold_control | fold | ok | ok |
| fx_hold_control | ipad | ok | ok |
| grid_bieuqua | fold | ok (tiles 1262, confirm ok, 187 px below) | ok (tiles 207, confirm ok, 231 px below) |
| grid_bieuqua | ipad | ok (tiles 1262, confirm ok, 187 px below) | ok (tiles 207, confirm ok, 231 px below) |
| ring_bieuqua | fold | ok (offered 1261, ring 24, cut 1237, act ok) | ok (offered 207, ring 24, cut 183, act ok) |
| ring_bieuqua | ipad | ok (offered 1261, ring 24, cut 1237, act ok) | ok (offered 207, ring 24, cut 183, act ok) |
| ring_tangqua | fold | ok (offered 1367, ring 24, cut 1343, act locked) | SKIP — 0 pieces she can give (D's K-PICK-LIVE: dialog = text + ✕, no ring); the first full run's FAIL was the scan leaving the previous ring open (fixed in the scan, rerun) |
| ring_tangqua | ipad | ok (offered 1367, ring 24, cut 1343, act locked) | SKIP — same (0 pieces, rerun) |
| ring_dangqua | fold | ok (offered 1367, ring 24, cut 1343, act ok) | ok (offered 1368, ring 24, cut 1344, act ok) |
| ring_dangqua | ipad | ok (offered 1374, ring 24, cut 1350, act ok) | ok (offered 1368, ring 24, cut 1344, act ok) |
| stale_hand | fold | FAIL — stale ✓/✕ pair / lift plate on the new card (✓ dead) | ok |
| stale_hand | ipad | FAIL — stale ✓/✕ pair / lift plate on the new card (✓ dead) | ok |

Verified on the owners' branches with the same scan: **danhhieu** on review/titles-daycard-lrm3 14a3a4c2 → ok Fold + iPad (one real tap on «Để sau» closes). **grid_bieuqua** on review/picker-dom eccb77fa → ok, confirm still 230 px below the visible box on Fold + iPad (the «Kéo xuống» note in picker-dom's own report) → filed for KK59 below.
The ring cut at 24 (cut column) is K-RING-ALL, fixed by KK59 on review/kk59-ring 0fdce448 (MAIN 179 17:45Z) — not redone here.


## Gates
- `git merge-base --is-ancestor 772bee4f HEAD` ok · 0 deletions vs LIVE · built files rebuilt with dev/site/build_site.sh, assets.json = LIVE.
- dlg-dead-scan (table above): every FAIL on LIVE that this branch owns → ok (stale_hand ×2, nofx_hold ×2); danhhieu FAIL stays until titles-daycard-lrm3 lands (verified ok there).
- ob-verdict-3.test.js (RESULT-FIRST, jverdict): branch 34 ok / 1 FAIL = «family scan: every choice shows its result first» 0/47 — **LIVE 772bee4f fails the same check 0/45** (stale test case: the maker cards there no longer raise a result card the test sees); encounter hold, in-visit talk act, view panels, bots, old save all ok.
- Stills (looked at, Fold 755x1000 + iPad 1180x820), CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/dlg-dead-btn/ : before-/after-stale-hand-{fold,ipad}.jpg (LIVE: the old card's «Cách A» plate + ✓✕ over the new card «Việc thứ hai»; branch: clean hand), before-/after-nofx-{fold,ipad}.jpg (LIVE: «Ngắm hoa một lát» result card holds with «Tiếp ▸»; branch: the next card «Cung nữ bẩm báo» is up at once), ring-subline-fold.jpg. Wipe on verdict: `python3 dev/site/cdn_sync.py --wipe-review dlg-dead-btn`.

## Notes for the kit keeper (KK59) / MAIN
- K-HAND-STALE (jkhand, built here) needs KK59 ack (law 9) — see KIT_REQUESTS.
- Ring (kitRingItem) on Fold: the front item's sub line («Hoa điền · Dán trán khi điểm trang…») runs into the hint line «Vuốt để xoay · chạm món sáng để xem» (two text lines overlap under the ring). Kit part → KK59 (filed in KIT_REQUESTS as K-RING-SUBLINE).
- «Danh hiệu mới» for a title she already wears: its only option «Đã hiểu» is the ✕, so j3's empty state «Lúc này không còn việc để chọn» shows on a notice panel — not dead (✕ closes and applies), wording odd; for E's title work.

## Handover
ROLLOVER (context ≈ 30 % est., START ≈ 4 % → roll at 29 %): eb3703be is READY with RV-175; KK60 has the K-HAND-STALE ack. Worktree /home/user/wt/ddb (review/dlg-dead-btn), scan + fixtures in /home/user/wt/ddb-out/fx (y05, y14 from dev/handover/fixtures/save-growth).
NEXT JOB for the successor (MAIN 179 18:33Z): «Bổng lộc tháng …» (#kmrew) pops over the END CARD and over the «Lãnh cung» rank-drop screen (E robots ×14, F s2h). Rule: reward/notice pop-ups never cover a life-end card or rank-change screen — queue after it.
PRIORITY #1 CHECK done: CLAIMS:441 **E98 endcard-top** (review/endcard-top e560c7c2 + -r6 3f38961f, REVIEW PASS) is **already in LIVE 772bee4f** (kitEndClear in j93.js:42/55 removes .kmov/#kmrew at the end card). So the robots' cases are a path E98 misses → start from E98's kitEndClear / its test (review/endcard-top), find which producer pops #kmrew after the end card / during the Lãnh cung drop (j93 kmrew producer line ~257, stipend = econ-stipend), whole family = every #kmrew / .kmov / reward pop-up vs every life-end + rank-change screen. Also CLAIMS:410 coop-freeze-kmrew (co-op #kmrew freeze, B) = a separate fault, do not mix. RV-175 FAIL items, if any, go to the successor too.

---
# DLG-DEAD-BTN-2 (successor, session_01Rc5AsHhwsbeTWxuEgYu7fY; START_CTX ≈ 4 % est. (get_session reads 0), roll at ≈ 29 %, ceiling 60 %)
Branch **review/dlg-dead-btn-2 417a510c** = review/dlg-dead-btn ffa55582 (eb3703be: NO-EFFECT-HOLD + K-HAND-STALE, still at RV-175, no verdict yet) + RANK SCREEN FIRST.
PRIORITY #1 CHECK ('kmrew|Bổng lộc|end card|kitEndUp|kmLifeOver|rank screen'): OD — MAIN 179 rule (brief) | main 772bee4f: E98 j93 kmLifeOver/kitEndClear + jend KES_GATE/kesFront, KK29 kitEndUp, KK31 56.31c #modal watcher | review/* endcard-top e560c7c2 / -r6 3f38961f (= LIVE since lc29-ui f28d28b9, 27/11 10:27Z) | claims CLAIMS:441 E98 (done), CLAIMS:410 coop-freeze-kmrew (B, separate) | B LANHCUNG-EARLY (cause of the early drop, not mine).
KIT CHECK: reuses the kit scene queue (j93 kmPush / kmStage / kmPump), kit rank scenes kitEdict / kitGloom, kit notice (kitPanel) — no new part, no CSS, no player word.

## What the robots saw (root cause)
| report | build | finding |
|---|---|---|
| Foreman E 14 lives «Bổng lộc» over the END CARD (E-S1 608519237 18:01Z/18:04Z = the 14th) | that life ran on pinned build **fb660cb78eec** (review file: «Builds: 1b5137935266 → d3f360028603 → LIVE fb660cb78eec → pinned fb660cb78eec») — older than every LIVE sw.js since 26/11 20:43Z; E98 reached LIVE only at f28d28b9 (27/11 10:27Z) | **not a new path**: all 14 lives ended before E98 was on their build. On LIVE 772bee4f the E98 test is 124/124 PASS (8 endings × 26 popup sources × before/after + month-roll death), so the end card is covered. E should re-check on an unpinned LIVE life. |
| Foreman F s2h FLIGHT2-S2H (seed 2026112560, LIVE 772bee4f): HUD «Lãnh cung» behind «Bổng lộc tháng chín», then «Lãnh cung» | LIVE 772bee4f | **real, new family** (rank-change screen, not life end). monthTick runs monthPay (stipend chest → kmPush → kmPump starts it AT ONCE, same task) BEFORE the «Bị bỏ quên» cold() (j3:170) → the chest is up over the board while the state is already Lãnh cung; the kitGloom «Vào lãnh cung» is queued behind the chest; the «Lãnh cung» card waits in Q behind the month cards; the gloom then plays OVER the «Lãnh cung» card. Also the «Lãnh cung» notice uses cls "end" (dark frame) → KK29 kitEndUp() read it as the life end: a reward fired under it was DROPPED, and the KK31 watcher closed an open chest. Same for every rank change: demote («Bị giáng phẩm»), promote (kitEdict), restore («Rời lãnh cung»), and every kit pop-up (chest, stipend, kitGain, kitLearn, kitBloom, kitPersonReveal). |

## Fix (one rule in the kit queue, j93)
- `kmPush`: a non-rank scene starts one task later (setTimeout 0), so a pay-out made earlier in the same month roll / choice sees the rank change of that task. kend (ending entrance) and krank jobs start at once.
- `kmPushRank` (kitEdict, kitGloom → `krank`): played ahead of every other queued scene (kmPump picks kend / krank first).
- `kmRankWait()`: while a rank scene is queued / on screen, a rank change is in the state but not drawn yet (kmDiff snapshot → kmDiff() now), or a rank card (`rk:1`) is still in Q (shown or waiting), every other scene waits (kmPump retries every 250 ms). Rank cards marked `rk:1`: j14 «Lãnh cung», «Rời lãnh cung», jpun «Bị giáng phẩm».
- `kitEndUp()`: #modal.end counts as the life end only with S.dead (kmLifeOver) or Q[0].kend; «Lãnh cung» (cls end) no longer drops / closes rewards — they queue after it. Life end unchanged (E98 drops a dead life's scenes).
- Order now (s2h case): «Vào lãnh cung» gloom (with the reason «Bị bỏ quên, đưa vào lãnh cung») → month cards → «Lãnh cung» card → «Bổng lộc» chest.

## Scan — family before / after
`python3 dev/test/rank-screen-scan.py` (static, every kmPush producer + rank card): 16 producers; LIVE: 2 rank scenes not first + 3 rank cards unmarked; branch: 0 / 0 (j93 tablet/note/bloom/reward/ink, jfx kitGain, jflip ×2, jlevel kitLearn, jne, jpromo kitPersonReveal = pop-ups that wait; edict/gloom = rank scenes first; ink = ending first).
`node dev/test/rank-screen-first.js --save y05.json` (REAL taps Fold 755x1000 + iPad 1180x820, in-page sampler of the top layer; FAIL = a pop-up visible while a rank card is in Q or before the rank scene, or a reward never shown):
| case (rank change + pop-up, when) | LIVE 772bee4f fold / ipad | review/dlg-dead-btn-2 fold / ipad |
|---|---|---|
| monthroll (real monthTick «Bị bỏ quên») + its own stipend | FAIL chest before «Lãnh cung» / FAIL | ok / ok |
| cold / demote / promote / restore + stipend, before | FAIL ×4 / FAIL ×4 | ok ×4 / ok ×4 |
| cold + chest / gain / learn / bloom / person, before | FAIL ×5 / FAIL ×5 | ok ×5 / ok ×5 |
| cold + stipend / chest / gain / learn / bloom / person, after (fired while the rank screen is up) | FAIL ×6 / FAIL ×6 | ok ×6 / ok ×6 |
| demote + chest, restore + chest, after | FAIL ×2 / FAIL ×2 | ok ×2 / ok ×2 |
| total | **0/36** | **36/36** |
Regressions on the branch: endcard-top.js (E98) **124/124 PASS** (Fold + iPad) · kit-endcard-ink.js 4 cases 0 FAIL · dlg-dead-scan (tinbao, toast, eventlong, lichthang, dongso, nofx_hold, fx_hold_control, stale_hand) 16/16 ok.
Stills (looked at, Fold + iPad side by side) CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/dlg-dead-btn-2/ : before-chest-over-lanhcung (LIVE: «Bổng lộc tháng chín» chest over the board, HUD «Phế phi · lãnh cung»), before-monthroll-chest-first (LIVE: «Bổng lộc tháng mười · bị cắt xén» first), after-monthroll-gloom-first (branch: «Vào lãnh cung · Bị bỏ quên…» first), after-gloom-up-no-chest, after-chest-after-lanhcung-card. Wipe on verdict: `python3 dev/site/cdn_sync.py --wipe-review dlg-dead-btn-2`.
Seen, not mine: small stat chips (kitStatFx «Danh +1», «Bạc +63») still fly over the gloom on both builds (status chips, not pop-up scenes); the HUD date line reads «Tháng mười · undefined · năm thứ năm» after the test's direct monthTick (both builds; likely the harness calling monthTick outside endTurn).

## Gates
`git merge-base --is-ancestor 772bee4f 417a510c` ok · 0 deletions vs LIVE · built files rebuilt (dev/site/build_site.sh), assets.json = LIVE.

## Handover (if I roll)
Worktree /home/user/wt/ddb2 (review/dlg-dead-btn-2), LIVE copy /home/user/wt/live772, outputs + fixture /home/user/wt/ddb2-out (fx/y05.json). Waiting: RV-175 verdict on eb3703be (job 1) and on 417a510c (job 2).
