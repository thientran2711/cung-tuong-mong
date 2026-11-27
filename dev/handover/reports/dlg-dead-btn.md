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

## Fix in this branch (one file of game code)
- `dev/build/jverdict.js`: `noFx(r)` reads kaLastResult (rows only «Ghi chú» «ta không được gì, cũng không mất gì», no Được / Mất / Kèm, no fold) → at the end of the choice `RF.mine=0` (stat `RF.stat.nofx`), and the late-card path skips the take-back. Same release as isNav; nothing else in the hold engine changed.
- `dev/test/dlg-dead-scan.js` (new): the family scan (below). index.html / sw.js rebuilt (`bash dev/site/build_site.sh`), assets.json = LIVE.

## Scan — `node dev/test/dlg-dead-scan.js [--root wt] [--dev fold,ipad] [--only …] [--save file] [--tiles N] [--out dir]`
Opens each dialog with the game's own producer (setup only), scrolls every scroller of the dialog to its END with real touch drags, hit-tests every way out
(realtap.js PROBE), REAL-TAPS the way out (rt.tap; option cards rt.choose = lift → ✓) and checks the dialog closed / moved on within 2.5 s.
Families: Tin báo (4 news / 24 news long / opened twice), closing toast «Tin báo», Danh hiệu mới, long event card (18 paragraphs, 6 options), Lịch tháng (once / twice),
selection «Đông sở», NO-EFFECT-HOLD + control, item pickers: ring face (Biếu quà làm lành / Tặng quà / Dâng quà — every ring tile to the front by › + front tap +
main act) and grid face (every tile by real scroll + tap, confirm reach + distance). Saves: F/handover fixtures y05-ncBtuc-035 (dialogs) and y14-ncBtuc-010 (chest 1,437).

BEFORE_AFTER_TABLE

## Gates
GATES

## Notes for the kit keeper (KK59) / MAIN
- Ring (kitRingItem) on Fold: the front item's sub line («Hoa điền · Dán trán khi điểm trang…») runs into the hint line «Vuốt để xoay · chạm món sáng để xem» (two text lines overlap under the ring). Kit part → KK59 (filed in KIT_REQUESTS as K-RING-SUBLINE).
- «Danh hiệu mới» for a title she already wears: its only option «Đã hiểu» is the ✕, so j3's empty state «Lúc này không còn việc để chọn» shows on a notice panel — not dead (✕ closes and applies), wording odd; for E's title work.

## Handover
(none yet — work in progress)
