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

## 2. kit-mark-fix r5 — SẴN SÀNG KIỂM `review/kit-mark-fix-r5` @ 4a1b2450 (MAIN 95 order: LAND CHAIN 2 FAIL, real conflict in jk4.js vs LIVE 419079d7)
PRIORITY #1 CHECK: review/kit-mark-fix-rv4 123c4572 (keeper #2 r3 + rv merge) reused | main 99795d67 (incl. 419079d7 duodo-focus / K-INFO-TAP jk4 kitInfoOneLine hosts) | claims: keeper #2 topic → #4.
Merge: rv4 123c4572 + LIVE 99795d67 (newest; contains 419079d7). One conflict, jk4.js `kit-info-one` style block: kept LIVE's wider hosts (`.pc .pcb>.kb.kpkb>.kr>.krv` on the two `.pcpop` lines, K-INFO-TAP) AND kit-mark-fix's resize callback `kitInfoOneLine();kitPcMore()` + `kitPcTagColour` + `kitPcMore` (§6.3i/§6.3j). Everything else auto-merged (LIVE kszOwnAct3 + kitInfoOneLine selector, KIT.md). index/sw rebuilt.
Tests: kit-mark-fix.js Fold 4/4 PASS every run; iPad 4 scenes: 3 runs → 1 run all PASS, 2 runs one card FAIL (first scenes, `more:false` + rank/name colour not yet applied = observer timing, random world). The SAME flake shows on rv4 123c4572 (iPad pop-maid FAIL) → pre-existing, not from the merge. kit-info-tap.js (LIVE side) PASS (0 FAIL). quickcheck: run 1 FAIL perf tab 569/422 (limit 549), run 2 PASS (render 233/250, tab 438/430, buổi 1308/1047, core gates PASS) — perf noise.

## 3. kit-opt-title-wrap r2 — SẴN SÀNG KIỂM `review/kit-opt-title-wrap-r2` @ 486b922a (rv round 1 FAIL: flaky «meter on its own row», rv-kit-opt-title-wrap.md)
PRIORITY #1 CHECK: rv-kit-opt-title-wrap.md round 1 | main d3f44022 (merged in) | review/kit-opt-title-wrap bb52274d (base) | claims #4.
Root cause found with a decision log (debug only, `window.__kotwDbg`): NOT only canvas rounding. kitOptTier tries layouts synchronously (2 cols S → 1 col M → 1 col L) and calls kitOdFit1 in each trial; a trial row of 165/180 px set `kodrow`, the row then ended at 189/204 px — the ResizeObserver stays SILENT when the final size equals the size it last reported, so nothing refitted and the meter stayed under the title (`kodstk kodrow` on a 204 px row; the card had no picture yet in rv's file:// runs = .kopt without .kart → general wrap rule).
Fix (j79 kitOdFit1 / jopic kitOptTier, one rule for every card with a meter):
1. canvas compare with a 4 px pad (KIT_ODFIT.pad);
2. VERIFY on the real layout after every choice: a meter still under the title → next step (kodstk, then kodrow), and that card is fitted again from scratch 120 ms later (max 3) so a step taken on a passing layout never sticks;
3. kitOdFit1 records the width it decided for; the observer watches the title row (.kat), not the card;
4. kitOptTier re-fits every card after its trial layouts (`kitOdRefit`: next frame + 200 ms);
5. web fonts arriving (document.fonts.ready / loadingdone) re-fit every card.
Test (rv ask): every dialog opened REP=5 times per device, each width measured after 250/0/60/150/400 ms and then on the SETTLED layout (same boxes 150 ms; kitOptTier re-picks 50 ms after a resize, so a 0 ms read is a passing state).
Stability: before the fix (this harness, 4 parallel runs = busy CPU): 1180 dlg0 w320 FAIL 1 in 8 runs, 755 dlg0 w280 FAIL 2 in 8. After: 16/16 iPad-only + 16/16 Fold-only (REP=1, 4 parallel, debug on) + 8/8 full runs both devices (REP=5, 3 parallel + 1 file://dev/index.html) PASS; secondary 412/390/1366 PASS. Table unchanged from §1 (all titles ≥ 7.7 em, ≤ 3 lines).
Gates: quickcheck PASS (render 236/237, tab 450/515, buổi 1038/1278, core gates PASS) · coop-e2e 124/124 (one run 120/138 while another build ran on the box; LIVE 124/124 alone, branch re-run alone 124/124).

## 4. kit-mark-fix r5 (round 2) — SẴN SÀNG KIỂM `review/kit-mark-fix-r5` @ b4d82057 (MAIN 96: re-merge onto LIVE d3f44022)
Merge 4a1b2450 + LIVE d3f44022 (coop-guest-names): only index/sw conflicted → rebuilt.
Test flake fixed (it was pre-existing on rv4): kit-mark-fix.js iPad/Fold cards sometimes had NO rank colour and NO «more» cue — the person-card observer pass ran before the rank colour / card height settled, or not at all on that page. jk4: `kitPcTagColour` + `kitPcMore` now also run straight after every render / renderStage, once more 500 ms later (`kitPcLate`), and `kitPcMore` whenever a block of the card changes size (ResizeObserver on the card's children; pictures, fonts, late rows) + on picture load. Test: a world without the scene's person (popKind 'none') = SKIP, not FAIL. KIT.md §6.3i updated.
Results: kit-mark-fix.js 8 full runs: card checks 0 FAIL (before: 1–2 card FAILs in most runs, rv4 too); 2/8 runs iPad pop-maid «cards 0» (no person card on screen after the scene call = scene setup, not the card rule; seen on rv4 / first r5 too). kit-info-tap.js PASS. quickcheck PASS (render 215/251, tab 475/443). coop-e2e 124/124 (one run 123/124 «week after rebirth advances», re-run 124/124; LIVE worker).

## Queue status
- (1) kit-opt-title-wrap → SSK sent (§1).
- (2) kit-mark-fix r5 → SSK sent (§2); round 2 b4d82057 (§4).
- (3) kit-opt-title-wrap r2 486b922a → SSK (§3). Coordinator now MAIN CHÍNH 96 session_01Rc5AsNBD5TsxWsYmh8ZkSJ. Coordinator is now MAIN CHÍNH 95 session_01Rc5AsLPctRgeDvqEuLS7jr.
- Waiting rv verdicts: kit-ef-unit-r2 bb00fc02, kit-relrows-ms d80b9d2b (keeper #3); kit-focus r5 da873b4b, kit-win-pay 0e6fe923, kit-mark-fix-r3 99f1e576, kit-g4-plate 03181881 (keeper #2).

# HANDOVER — KIT KEEPER #4 (session_01Rc5AsJkj5hx1zShFY8KnYZ) → KIT KEEPER #5 (21/11 ~16:35Z, worker rollover: START_CTX ≈3 %, now ≈25–28 % est.; depth 6)
Coordinator: MAIN CHÍNH 97 session_01Rc5AsLuG71zn8SX9tkLTWk (opens the successor). Kit reviewer: rv MSxp session_01Rc5AsMSxpxbsAMRSE5oWrq.
Role/rules: unchanged (reports/kit-keeper-1.md + kit-keeper-2.md HANDOVERs; START_CORE 18 laws + START_WORKER).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

## Queue for #5 (in this order)
1. **kit-ef-unit r3 (MAIN 96/97, BLOCKS kit-win-pay 203cd559)**: LAND CHAIN 2 FAILED kit-ef-unit d46ad6de (= rv PASS of review/kit-ef-unit-r2 bb00fc02 + LIVE) at QUICKCHECK twice on PERF only: longTaskMaxMs 5349 > ceiling 5000; buổi 2182 vs LIVE 1701 ms; render 308 vs 271. Do: branch review/kit-ef-unit-r3 from d46ad6de, merge newest LIVE (MAIN said 468835a7 or newer), find what ef-unit adds per buổi render (suspects: j79 kitRows now tags every stat item via kaUnit/kaEfTag (per-row work), j63 kaUnit regex per item; check with the perf probe dev/tools/quickcheck.js / a CPU profile in Playwright), cut to ≤ LIVE +5 %, run quickcheck 3× (perf is noisy: I saw tab 438↔569 and buổi 1055↔2113 between runs of the SAME build — compare medians, run on an idle box), re-merge kit-win-pay on top if needed → SSK rv MSxp, report MAIN 97.
2. **kit-mark-fix r6 if rv FAILs b4d82057**: review/kit-mark-fix-r5 @ b4d82057 is SSK (round 2: render/renderStage hooks + kitPcLate +500 ms + ResizeObserver on card blocks + img load; test SKIPs a world without the person). rv MSxp's round-5 list also asked: (a) name colour in PURE CSS (e.g. `.pc>.pcl>.pcname{color:var(--rt)}` with --rt moved to .pcl / inherited — no JS timing), (b) + scroll + document.fonts.ready + rAF×2 after render for .kpmore, (c) test: each scene re-asserts the marks 1 s later; iPad ≥10 repeats clean. (a)+(c)+fonts.ready are NOT done yet in b4d82057 — do them first if rv FAILs (or proactively). Remaining test noise: iPad pop-maid «cards 0» 2/8 (no person card on screen after popKind = scene setup; investigate the scene, e.g. wait for #popw .pcpop).
3. **kit-opt-title-wrap r2**: review/kit-opt-title-wrap-r2 @ 486b922a SSK (waiting rv). Deterministic fix + 40/40 runs (§3). If rv wants «≥20 repeats at w320»: `REP=20 node dev/test/kit-opt-title-wrap.js <url> <out>` (REP repeats every width incl. 320).
4. After LIVE lands: CLAIMS LANDED + `python3 dev/site/cdn_sync.py --wipe-review kit-opt-title-wrap` (and keeper #3's kit-ef-unit, kit-relrows-ms).
Practical: worktrees /home/user/wt/k4ow (opt-title-wrap-r2; untracked live.html = LIVE copy for before/after, never commit), /home/user/wt/k4mf (kit-mark-fix-r5), /home/user/wt/k4live (detached LIVE d3f44022 for coop baseline), /home/user/wt/ho4 (handover). Servers: python3 -m http.server 8791 (k4ow root), 8792 (k4mf root). coop-e2e = `node dev/test/coop-e2e.js <outdir>` uses the worktree's dev/index.html; it FAILS when another build/test hogs the CPU — run it alone. quickcheck G4 coop-one-world is flaky (re-run the gate script alone).
FOR MAIN 97: keeper #4 stops here (rollover); please open KIT KEEPER #5 with this HANDOVER (queue item 1 = kit-ef-unit r3).
## Queue status
- (1) kit-opt-title-wrap → SSK sent (§1).
- (2) kit-mark-fix r5 → SSK sent (§2). Coordinator is now MAIN CHÍNH 95 session_01Rc5AsLPctRgeDvqEuLS7jr.
- Waiting rv verdicts: kit-ef-unit-r2 bb00fc02, kit-relrows-ms d80b9d2b (keeper #3); kit-focus r5 da873b4b, kit-win-pay 0e6fe923, kit-mark-fix-r3 99f1e576, kit-g4-plate 03181881 (keeper #2).
