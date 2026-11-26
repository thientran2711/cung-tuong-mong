# dialog-order-r4 (DIALOG-ORDER-R4, session_01Rc5AsKRkr3F1TohQ4mYcPn): RV READY review/dialog-order-r4 0bc06a25

depth 1 · START_CTX ~2 %
PRIORITY #1 CHECK ('dialog-order|dress-tap'): OD 0 | claims 8 | main 1 | review/* 4. Reused review/dialog-order r3 (lander stage lc22-do 04fed510), the log dev/handover/reports/lc22-logs/dialog-order-dress-tap-fail.log, and the earlier report dev/handover/reports/dialog-order.md. KK44 was told before the edit and confirmed there is no clash: KK44 edits j3/jnolock (kitDlgFold); I edit jdayq only.

Branch: review/dialog-order-r4 = LIVE f573dc94 + lc22-do 04fed510 merged in (4e6ded93) → cfcd40e1 + 8c9df0f3 (fix) → 0bc06a25 (probe rename). Merge conflict in jdf.js: kept LIVE's ACT-MERGE door filter (DIN) together with r2's dimmed acts after talk (POP_DONE), with no `if(!done)`. Built files were rebuilt. CHANGE line = the lc22-do one.

## Root cause (dress-tap HOLD)
Her first Y phục tap in Điểm trang completes the day task «Thay y phục…». That queues a «Xong việc» card (kitPanel → doneCard), and the card is correctly held by gate (c), because #ov is an activity. Her NEXT tap inside #ov (the Trâm cài tab) calls render() → showModal(). The r2 line in the jdayq showModal wrapper, `if(a&&dqInside(a))DQ.mine=Q[0]`, marked ANY card painted during a tap inside an activity as «hers». That included this old card. So gate (c) let it through, dqPull no longer took it back, and the centre #modal (data-kreborn) covered her own screen. LIVE: dqPull takes the card back, so it never shows.

## Fix (jdayq.js only: ONE queue rule, no per-screen patch)
- A card is «hers» (DQ.mine) only when THIS tap queued it, i.e. it is not in DQ.preQ (the queue as it was when her finger came down).
- A card that was already waiting when she tapped inside her own screen is held (gate (c)), so it is not painted mid-flow. It comes when she leaves the screen. The hold applies only when the card is not on screen and not playing in-scene (the jdfv in-scene dialog keeps re-painting itself; dqPlaying keeps its path).
- No player word, no UI or kit part, and no BAL key were added.

## Scans and tests (real taps, Fold 755x1000 + iPad 1180x820)
### own-flow-hold-scan (NEW, dev/test/own-flow-hold-scan.js, law 11)
How it works: she opens her own screen with a tap. A GAME card is then posted (pushModal + render, no tap). Real taps inside the screen follow. After each tap the scan checks whether the waiting card was painted over her screen. Then she leaves, and the scan checks that the card is shown and not lost.
| flow | before (4e6ded93 = r3 on LIVE) | after (0bc06a25) | LIVE f573dc94 |
|---|---|---|---|
| Điểm trang (toil, #ov) | Fold OVER (card over the screen, Trâm cài tap blocked) · iPad OVER | waits, 5 taps, shown after leaving (Fold + iPad) | waits |
| Phối đồ (Hội phối đồ board) | waits | waits, 4 taps | waits |
| Mini-game (openMG) | waits | waits | waits |
| Shop (Nhờ thái giám mua đồ) | waits behind her shop | waits, 4 taps | waits |
| Gift picker (Tư trang → item → «Tặng») | waits behind the picker | waits, 3 taps | waits |
| Person view (.kfoc) | covered by dialog-order-scan HOLD=1 (below) | | |
Result: before FAIL 2/10 rows · after PASS 10/10 · LIVE PASS 10/10 · 0 page errors.

### Other tests
- dress-tap: before FAIL (modal intercepts the Trâm cài tap) · after PASS 32 · LIVE PASS 32. I also made the test itself steadier: it now seeds a second hairpin, because a new life sometimes owned only the worn one, which made it flaky on LIVE too.
- dialog-order-scan HOLD=1: Fold TOP 75 · iPad TOP 75 · DEAD/LOST/GAMEFIRST/HELD 0 · 0 errors.
- dialog-order-held-probe (renamed «Sai đi dò la» → «Dò la tin tức», which ACT-MERGE changed on LIVE): P1 picker on top · P2 Q=[picker, GAMECARD], game card shown after ✕, none lost · P3 a late card waits behind the picker. Fold + iPad.
- dialog-order-next-probe: N1 buổi 0→0 (the card waits behind the view) · N2 buổi 0→0 (the card is painted first). Fold + iPad.
- dayq-hold PASS 50 · dayq-order PASS · dayq-ghost PASS all.
- quickcheck.sh --runs 3:
  - QUICKCHECK PASS: open 2.0 s, old save ok, time-spill PASS.
  - perf, iPad CPU 4x, new/live alternating, median of 3: render 216/169 · tab 438/342 · buổi 992/762 ms · tasks>200 21/18. The perf gate passes. The extra cost is in the r3 base (dqTap on every event), not this one-line change. r3's own runs were 1800/1689 and 1878/2216, i.e. noise.
  - CORE GATES: 80-dialog-fixed «kit-dialog-2 a» and 90-button-crawl «Ô lưu · Lui» are the known LIVE fails.
  - 92-look-dedupe failed once («undefined» title). Rerun alone it gives PASS 3/3 on the branch and PASS on LIVE, so it was a flake.
- Stills: looked at Fold and iPad Điểm trang after the taps (scratch /home/user/wt/do4-shots). No card covers the screen. iPad shows the kit chip «Có tin đang chờ · xong việc đang làm đã».

## For MAIN 162
1. LAND: review/dialog-order-r4 0bc06a25 replaces lc22-do 04fed510. It merges cleanly onto LIVE f573dc94.
2. QUESTION (law 16; not changed): free TABS such as the Tư trang tab are not «activities». Under the existing M4 rule, a card the game posts while she is on a tab shows at once. Inside Tư trang the item card, «Tặng» picker and shop already keep waiting cards behind them (scan rows above). Making whole panel tabs hold cards would change a working rule, so it needs the owner's word.
3. Note: the Fold figure shows the tier figure, not the worn dress colour. That is how dress-tap check 4 defines it (kitDressFigSrc), and it is pre-existing.
