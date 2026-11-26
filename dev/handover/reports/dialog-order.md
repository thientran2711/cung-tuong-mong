# dialog-order (E96 = E-c «môn Ngôn» lag + talk/send pickers, E-e «out of order» dialogs) — SẴN SÀNG KIỂM review/dialog-order 7be57a8e

PRIORITY #1 CHECK ('dò la|dola|modal queue|out of order' + 'jdayq|dqActBlocks|kfoc|popw'): OD 34 | ledger 1 | claims 8 (E96 row = this session) | main: jdayq.js gate (c) (DAYQ-2/3, the cause), jdfv.js, jdfg.js | review/*: dialog-stack(-rv), flight-modal-deadlock(-r), kit-modal-spin(-rv), modal-scroll(-r1), kit-dialog-2(-land), dialog-dedup(-rv) — all already on main (git grep origin/main: jk4 / jnolock / dead-card.js / dialog-stack-scan.js), none touches gate (c); no robot sweep table from MAIN ROLE B #7 in reports/ yet (FOR MAIN line below) → own real-tap scan built (dev/test/dialog-order-scan.js). KK37 kit part (picker cards clipped) NOT touched.

Branch review/dialog-order from origin/main 5e013076 (main is now 02f564ae; the diff touches only jdayq.js / jbal2.js dayq / jdfg.js + 2 new tools → rebases clean). Commits 7318fd39, 5cb7ab5b, 7be57a8e.

## E-e — ROOT (one root for «Sai đi dò la shows nothing» AND «appears only after ✕»)
jdayq gate (c) «nothing painted inside an activity» (DAYQ-2) counts the person view she opened (jdfv kitFocus, `.kfoc`) as an activity and lets a card through only when her tap is INSIDE `.kfoc`. The view's act cards (Giao thiệp / Mưu kế / Hại người tabs) run through the docked person card `#popw` (jdfv dfRun clicks the hidden pop-up button), which lives OUTSIDE `.kfoc` → her own act read as «a card posted by the game» → the pick-who dialog was held in Q, #modal hidden, until ✕ closed the view, then dqArmModal painted it = exactly the owner's «out of order». A second path of the same family: acts that QUEUE their card and only call render() (pushDil → «Cài đồ vào rương», «Cùng chơi», «Thách đấu», «Xin bắt mạch»): the render net armed the painter, which waited on the open view the same way.

## FIX (jdayq.js only — the one queue gate, no per-act patch)
1. The person view OWNS its controls: `.kfoc` + its docked `#popw` (+ the view's intro layer). «Inside» is judged where her finger LANDED (capture-phase listener; the target is often re-rendered / detached before showModal runs).
2. A card she opens herself from inside the view is marked hers (`DQ.mine`): the gate never holds it and `dqPull` never takes it back.
3. A NEW card that her tap inside the view queues without painting (Q compared with the queue at pointerdown) is painted on top at once — looked for `BAL.dayq.mineLook` = 400 ms after the tap (ONE CORE, jbal2.js).
Cards the game posts by itself (no tap / a tap outside) still wait exactly as before (DAYQ-2/3 unchanged: dayq-hold 46/46 PASS).

## E-c — «môn Ngôn» lag (the on-figure «Lời hay» word game at «Trò chuyện với cung nữ», jdfg words)
Cause: every frame (60/s) the game (a) re-parsed the kit ✓/✗ sign SVG strings into new Path2D objects for every sign and (b) rewrote the kit clock chip's whole HTML (kitGameClock innerHTML = a layout + paint per frame). Fix (jdfg.js, the one dfGame shell → all 7 on-figure games): sign paths parsed once per sign; the clock chip is rebuilt only when its whole second changes.

Frame time, real path (maid view → «Trò chuyện với cung nữ» → «Sẵn sàng» → game), dev/measure/ngon-lag.js:

| device | CPU | before p50 / p95 / max ms · frames >33 ms · long tasks | after p50 / p95 / max · >33 ms · long tasks |
|---|---|---|---|
| Fold 755x1000 | 4x slower (phone) | 43.0 / 59.7 / 66.4 · 89 of 89 · 388 ms | 16.6 / 19.9 / 49.8 · 7 of 235 · 0 |
| iPad 1180x820 | 4x slower | 59.7 / 84.5 / 128.4 · 63 of 63 · 3433 ms | 16.7 / 28.4 · 7 of 220 · 153 ms (one 1071 ms frame = the game's end + reaction, not play) |
| Fold | 1x | 16.2 / 20.0 / 28.7 | 16.7 / 16.9 / 20.4 |
| iPad | 1x | 16.8 / 21.7 / 189 · 343 ms long | 16.7 / 20.5 / 96.7 · 249 ms |

Talk/send pickers: tap «Sai đi dò la» → picker on screen: before = NEVER (held until ✕); after = 627 ms Fold / 751 ms iPad (1x), ~2.9–3.2 s at CPU 4x. The remaining time is the shared kit dialog fitting (profile: kitDpFit / kitDpAll / kscue band / kitDlgFit forced layouts ≈ 0.7 s of 2.5 s at 4x) — a kit-wide cost of every person dialog with many option cards → FOR MAIN 151 / KK37 (below), not changed here (law 9).

## SCAN (law 11) — every act card of every person view, every place, real taps (dev/test/dialog-order-scan.js, seeded world SEED=7, same life before/after)
TOP = dialog / scene / mini-game intro on screen at once · HELD = card in Q, nothing on screen (the bug) · DIRECT = no dialog (in-place line, or a locked card showing its reason, e.g. «Chưa biết người này là ai» — looked at).

| run | before (LIVE 5e013076) | after (7be57a8e) |
|---|---|---|
| Fold 755x1000 | TOP 16 · HELD 4 · DIRECT 13 | TOP 25 · HELD 0 · DIRECT 14 |
| iPad 1180x820 | TOP 45 · HELD 17 · DIRECT 124 | TOP 59 · HELD 0 · DIRECT 130 |

HELD acts before → after: Giao việc phòng bị (HELD→TOP), Cùng chơi (9 → TOP), Thách đấu (8 → TOP), Cài đồ vào rương nàng ta (→ TOP), Xin bắt mạch (→ TOP); «Sai đi dò la» (owner's case, maid view, not dealt in the seeded scan life) → evidence below + measure tool. Per-act table (52 acts × before/after × Fold/iPad): dev/handover/shots/dialog-order/scan-table.md; raw rows scan-{main,fix}-{755,1180}.md.

## TESTS
- dev/test/dialog-order-scan.js (NEW, exit 1 on any HELD row / page error): Fold 0 HELD, iPad 0 HELD, 0 page errors.
- dev/test/dayq-hold.js PASS 46 cases (Fold+iPad; A4 = the person view still holds cards the GAME posts) · dayq-order.js PASS · dayq-ghost.js PASS all.
- Old save: save made with LIVE build (mk-oldsave.js) → loaded on the branch, 6 buổi played, Fold + iPad, 0 errors.
- No player-visible word added; no new UI part; one BAL key (BAL.dayq.mineLook).

## EVIDENCE (CDN upload refused: no R2 credentials in this session → fallback dev/handover/shots/dialog-order/ on the handover branch; looked at every shot)
- before-fold-1-after-tap.webp: tap «Sai đi dò la» → nothing (view only) · before-fold-2-after-x.webp: after ✕ the picker appears = her bug · after-fold-1-after-tap.webp: picker ON TOP of the view at once. Same three for iPad (before-ipad-1/2, after-ipad-1). Videos: before-fold.webm, after-fold.webm, before-ipad.webm, after-ipad.webm (real taps, dpr 2).

## FOR MAIN 151
1. ROLE B #7 robot sweep table («screens out of order / behind another box») was not in reports/ — when it lands, run it against review/dialog-order; dialog-order-scan.js covers every person-view act path.
2. KK37 (kit, picker cards): the tap → paint of a big person picker (dò la, gifts) is ~0.7 s on a fast device, ~3 s at phone speed; hot = kit dialog fit passes (kitDpFit / kitDpAll / band / kscue) re-measuring layout several times per open. Suggest KK37 batch those reads (one measure pass) in the same kit job. Tool: `PROF=1 node dev/measure/ngon-lag.js <base> dev/index.html 755 1000 4 1`.
