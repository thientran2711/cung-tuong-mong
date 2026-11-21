# KIT KEEPER #4 (session_01Rc5AsJkj5hx1zShFY8KnYZ) — report
Coordinator: MAIN CHÍNH 94 session_01Rc5AsLniSu9Gw8QDFt52Ph · kit reviewer: rv MSxp session_01Rc5AsMSxpxbsAMRSE5oWrq · predecessor keeper #3 (reports/kit-keeper-3.md HANDOVER).
Start: 21/11 ~13:13Z · depth 6 · START_CTX ≈ 3 % of the window (context_usage read 0; own estimate).

## 1. kit-opt-title-wrap — SẴN SÀNG KIỂM `review/kit-opt-title-wrap` @ bb52274d (from origin/main e87ae825)
PRIORITY #1 CHECK: OD L1803 (18/11 ~09:02Z «title never squeezed by the odds chip») + L2133 (21/11 ~04:00Z #49a «odds on the title row») | main jopic.js:259 KIT_OPT.stackW, jopic.js:326 .kodstk, j79.js:889 kp-kat-css, jk4.js kitCompactCSS | review/* none on this topic (kit-ef-unit-r2 touches the stat items only) | claims: keeper #3 handed it over (queue item 2).
Fault (MAIN 94 order 21/11 12:47Z): Fold option title one word per line beside the odds meter. Causes found: (a) the stack threshold read the CARD width (< 430 px), not the room the title gets; (b) the stack never showed anyway: `.oc` (inline-block, p1) beat `.kodm` (inline-flex), so `flex-direction:column` had no effect; a «Năm ăn năm thua» row meter took 150 px → title 33 px, 7 lines; (c) general act cards (kp-kat-css `flex-wrap:wrap`) dropped the meter to its OWN row whenever the title needed 2 lines (#49a breach, iPad Hành sự «Phát bạc cứu giúp cung nhân nghèo»); (d) compact/pane cards (kitCompactCSS nowrap) squeezed like (a).
Fix (ONE kit rule, j79 `kitOdFit` / `kitOdFit1` / `KIT_ODFIT`, KIT §6.2b-1) for EVERY `button.ka` whose `.kat` carries `.kodds`:
- title room = title row width − paddings − gap − meter in a row (bar + word, measured with the fonts on a canvas, so the choice does not depend on the current state). Title would not fit on one line beside it AND room < 12 em → `.kodstk`: meter stacks bar-over-word, a long word wraps under the bar at 5.4 em («Năm ăn / năm thua»); odds stay on the title row.
- only when even the stacked meter leaves < 7.5 em (a person card pane on a 390 px phone): `.kodrow` = meter under the title at the right (stacked). Never a 2-letter title.
- `.kodm.oc{display:inline-flex}` (the stack works; bar + word get the kit's 5 px gap everywhere).
- kp-kat-css: act card title `flex:1 1 0` (meter drops only when even 9 em + meter do not fit).
- jopic kitOptTier: the per-card `kodstk` toggle at 430 px is replaced by kitOdFit1; a layout that leaves a title < 7.5 em does not fit (2 columns → 1 column). `KIT_OPT.stackW` and the old jopic `.kodstk` rule removed (canon overwrite).
- runs: ResizeObserver (card width change) + kaNorm (new card → observed; title/odds text change → fitted next frame); no layout read on the kaNorm path (first version read clientWidth there: QC render 271/188 ms; now 228/213).
Test `node dev/test/kit-opt-title-wrap.js <url> <out>` (DEVS=412x1058,390x844 for secondary): 2 real option dialogs (Q+showModal, every odds word Liều…Nắm chắc, long/short titles) at option column auto/560/460/380/320/280 + Hành sự act tab, pop-maid, tab staff, tab rv; every visible card with a meter: (1) meter beside the title, never its own row (except .kodrow on a row narrower than meter + 7.5 em, counted as fallback), (2) title box ≥ min(one-line width, 7.5 em), (3) no one-word line except the last, (4) meter inside the card, not over the title. Seeded world (same people before/after).
Before / after (same test; LIVE e87ae825 vs bb52274d; bad = faults, title = narrowest title in em, lines = most title lines):
| device · scene | LIVE bad · title · lines | branch bad · title · lines |
|---|---|---|
| Fold dlg0 col auto (real) | 3 · 2.5 · 7 | 0 · 9.2 · 2 |
| Fold dlg0 col 320 / 280 | 3 · 3.8 · 6 / 5 · 0.7 · 7 | 0 · 10.4 · 2 / 0 · 8.0 · 3 (1 fallback) |
| Fold dlg1 col auto (real) | 2 · 5.7 · 3 | 0 · 9.5 · 2 |
| Fold dlg1 col 560 (2 col) / 280 | 5 · 3.7 · 5 / 5 · 3.9 · 4 | 0 · 24.8 · 1 (→ 1 col) / 0 · 7.7 · 2 |
| iPad dlg0 col auto (real) | 0 · 24.7 · 1 (1 col) | 0 · 8.7 · 2 (2 col) |
| iPad dlg1 col auto (real, 2 col) | 3 · 5.2 · 3 | 0 · 9.0 · 2 |
| iPad dlg0/dlg1 col 320 | 3 · 1.9 · 7 / 2 · 6.4 · 3 | 0 · 8.5 · 2 / 0 · 10.2 · 2 |
| iPad dlg0/dlg1 col 280 | 5 · 0 · 7 / 6 · 2 · 8 | 0 (3 / 4 fallback) |
| iPad Hành sự act tab (14 cards) | 1 (meter own row) | 0 |
| iPad pop-maid (15) / staff / rv | 2 / 1 / 3 (rv title 3.4 em, 4 lines) | 0 / 0 / 0 |
| Fold person cards (pop-maid/staff/rv) | 0 | 0 |
Full tables: every width in the test output (table.md). Secondary devices (DEVS=412x1058,390x844,1366x1024): PASS (390/412 person-card pane = kodrow fallback; option dialogs auto ≥ 8.5 em).
Real game dialogs (dev/test/opt-card-scan.js, 12 cases, Fold + iPad): narrowest title LIVE 2.5 em (Fold) / 5.2 em (iPad) → branch 9.2 / 8.7 em; all ≥ 8.7 em.
Gates: kit-opt-title-wrap Fold PASS + iPad PASS · quickcheck PASS (bb52274d: core gates PASS, old save ok, perf render 228/213 tab 485/595 buổi 1176/1124) — one QC run had G4 coop-one-world FAIL, the gate re-run 2× (seeds 7+3) PASS and the next full QC PASS (flaky, data-only gate; this change is CSS/JS layout) · coop-e2e 94/94.
Shots (looked at; CDN img/_review/kit-opt-title-wrap/): before-755-opt.jpg (title 7 lines, meter not stacked), after-755-opt.jpg (titles 2 lines, meter bar-over-word on the title row), before-1180-opt.jpg, after-1180-opt.jpg (2 columns, titles 2 lines), after-1180-act.jpg (Hành sự: «Nghỉ ngơi một lát» meter on the title row).
Note: «Sủng / +2» split in the shots = kit-ef-unit (fixed on review/kit-ef-unit-r2, not on main yet); merge of both branches: different lines of j79 (kp-kat-css block vs j63/kitRows), no conflict expected.

## Queue status
- (1) kit-opt-title-wrap → SSK sent (§1).
- Waiting rv verdicts: kit-ef-unit-r2 bb00fc02, kit-relrows-ms d80b9d2b (keeper #3); kit-focus r5 da873b4b, kit-win-pay 0e6fe923, kit-mark-fix-r3 99f1e576, kit-g4-plate 03181881 (keeper #2).
