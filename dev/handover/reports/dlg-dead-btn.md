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
Work complete; no rollover needed (context ≈ 28 % est.). Open for others: titles-daycard-lrm3 (E, danhhieu), kk59-ring (K-RING-ALL), KK59 acks K-HAND-STALE + notes K-PICK-GO-REACH / K-RING-SUBLINE.
