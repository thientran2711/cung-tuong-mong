PRIORITY #1 CHECK ('phân phát|allotment|lệ tháng|dầu tóc|nến'): OD 0 | ledger 0 | claims monthly-allotment (worker session_01Rc5AsNLFYkPdJUDpjgwsaU) | main: jstip.js (BAL.stip goods), jration.js (monthly-ration-r6 LIVE 3fdfb437), j42 srvMonth, jagacts cx | review/* monthly-allotment only. Worker EXTENDS jstip/jration through wrappers, no duplicate table. Nothing rebuilt by the reviewer.

# review monthly-allotment — PASS 98f9f0f (READY FF)
Reviewer: BIG REVIEWER (opus) session_01Rc5AsLJxqXyKq4keVP4fuk, child of C-AG #20. Reviewed review/monthly-allotment @ 9aceea6 (FF over f43a2ba6). origin/main moved to fd6118c (art-wiring-1119) during review -> final-merged on review/monthly-allotment-r6: assemble.py conflict = main's list (+ jfigx.js) with jallot.js after jration.js; index.html/sw.js taken from main and rebuilt by dev/site/build_site.sh. Then main moved again to 7fb7c10 (ge-writers-w2) -> merged the same way. Main moved once more to 4217568 (odds-no-unknown) -> merged the same way. Result **review/monthly-allotment-r6 @ 98f9f0f**, ancestor = origin/main 4217568, diff vs main = the worker's 7 files (+329/-11).

## Reviewer fixes (r6, commit 657a340)
1. jallot.js had a private `STAT_NM` stat-name table duplicating j1 `NAMES` (law 4 one source / reuse) -> removed, uses `NAMES`.
2. Study-card note put the cost "cháy một cây nến" inside the green Thành column. Now `… : Tâm cơ +1 thêm · kèm: cháy một cây nến`, so the candle shows in the card's red **Kèm** row (j19 cardH convention). Looked: iPad 1180x820 card reads THÀNH "Tâm cơ +2 · buổi tối có nến thì thắp học khuya: Tâm cơ +1 thêm" / KÈM "cháy một cây nến" / BẠI.

## Laws
- 1 two-way: PASS. NPC consorts get the same rank lines through stipList/stipGoods, NPC faces lose Kiểu cầu kỳ without oil (lxCapRec), NPC agents burn candles in the same cx acts (jagacts hook), NPC staff and her staff get the same servant lệ, skimmed with their mistress for her and for NPCs alike.
- 2/3 equal value, gain-and-loss: PASS. Oil and candle are gain-with-item-cost; no cost-only road; candle burns only on a successful evening study (runOpt true / agTry), never in the morning.
- 4 one core: PASS (after fix 1). All counts/grades/prices in BAL.allot (same pattern as BAL.ration in jration); texts print the constants; price = max(floor, buyK x BAL.pay) (law C spread <= .03 checked by test).
- 5 harder as she climbs: n/a (grade rises with rank, per OD law C).
- 6c real objects: PASS. Every piece is an entry in a real bag (p.inv / s.inv / S.inv), bottles carry uses, used up when spent; NPC bags trimmed by the existing jstip npcKeep rule, NPC staff kept to BAL.allot.srv.keep (older pieces used up). Giftable/sellable (tg rv), shop sells grades 0-1.
- 7 wording: PASS. No %, "lần dùng", cổ trang lines; test checks no % / "lượt".
- 8 expert first: PASS. History §1 of reports/monthly-allotment.md (宮分 candles 白蠟/黃蠟/羊油蠟, 頭油 桂花油/刨花水, servants' 四季衣裳 + squeeze with mistress) on top of monthly-ration-history.md.
- 9/10 kit: PASS. Mirror note = kitRows inside existing `.kgr`; chest = stipReveal; help = HX.wage popup; card = j19 cardH; no CSS, no new frame. Looked at mirror shots (no oil: red kit row, Kiểu cầu kỳ presets hidden; with oil: "Nước bào hoa, còn 6 lần dùng") on Fold 755x1000 + iPad 1180x820: aligned with the Son phấn row, no overflow.
- 11 whole group: PASS. Every monthly receiver (consort, lãnh cung, player maid, NPC staff) and every rank-goods display (rank text, chest, log).
- Save compat: PASS. alInit first sight on render (old save gets one month), alFix fills bottle uses; quickcheck "old save ok"; BAL.allot.on=false = old behaviour (test).

## Tests
- `node dev/test/monthly-allotment.js` Fold 755x1000@2 + iPad 1180x820@2: ALL PASS on 9aceea6, 657a340, 2639a8d, 18a9b64 and 98f9f0f (post-merge). One run on 657a340 failed 4 rank checks (lawC/goods/evening/old save) because the test's start() loop landed a servant life (floor price, no stip) — reran: ALL PASS. Test flake, not game; worker may make the test assert !isSrv() after start.
- `node dev/test/monthly-ration.js`: branch PASS x2. On live main: 1st run FAIL mirror step ("Son môi" row + no #lxrush), 2nd run PASS -> **pre-existing FLAKY step on main**, not a hard failure and not from this branch (worker said "fails identically"; it is intermittent).
- `bash dev/tools/quickcheck.sh --cpu 4`: PASS on 9aceea6, 657a340, 2639a8d, 18a9b64 and 98f9f0f (core gates PASS, old save ok; perf medians within the gate on a noisy box).
- Probes: B4L = 3 = Buổi tối (alEvening correct); real deck card "Đọc binh thư, sử sách" at Buổi tối, o 100: candle 3 -> 2, gain applied; no page errors.

## Notes (non-blocking)
- Art for Foreman C: 6 item pictures listed in the worker report §5 (stand-ins in CTM_MISSING_PICS now).
- Player maid gets no candles (her study table SRVA.study is separate) — worker's known limit; NPC maids the same, so two-way holds.
Shots kept in scratch only; nothing committed, no CDN review folder used.
