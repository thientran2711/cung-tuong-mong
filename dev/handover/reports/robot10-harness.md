# robot10-harness — ROBOT-10 harness phase 1 (Foreman D worker session_01964izFciAUDi8CYTVdLsUX)

PRIORITY #1 CHECK ('robot10|robot-10|ROBOT PLAYTEST|autoplay|playtest'): OD 2 (23/11 ~19:20Z ROBOT PLAYTEST BEFORE SHE PLAYS, ~20:45Z tally order) | main dev/measure/runb.js + inpage6.js + inty.js + run3full.sh (whole lives, 9-origin rotation, no roads) + topic bots (mg-bots, mort-bots, preg-bots, ledger-bot, evbot, entry-bots) + dev/test/coop-e2e.js | review/* none | claims: this job (CLAIMS row robot10, Foreman D child) — REUSED inpage6.js (the bot), inty.js (dressing), runb.js pattern (seeded Math.random, render-off bot page); nothing rebuilt.

Branch: review/robot10-harness · base main da829e9 (LIVE build 3e9088f91727; main had moved past f7016b8d when the job started) · head 84da4a4debef7041540952dde387b2d645fc44c4
Test-only: dev/measure/robot10.js, robot10-in.js, robot10-agg.js (new) + dev/measure/inpage6.js (default-off hooks). No game file, index.html or sw.js.
Delivery: this session has no push rights (session opened without the repo source; add_repo denied) → patch handed to Foreman D by message.

## Runner
`node dev/measure/robot10.js <origin> <branch|all|spread|1-4> <bots> <lives> [out]` — usage, outputs and "how to add a check" are the README block at the top of robot10.js.
`node dev/measure/robot10.js list` prints every origin + road the game has. `node dev/measure/robot10-agg.js <json|folder>... [--out dir]` → rates-<date>.md.
Env: GAME (path → served over local http, or the LIVE https URL) · PAR=3 · CAP=1800 s/life · UIEVERY=150 buổi · DEV=fold,ipad · SEED · LAGMS · UILAG · UILOAD · RTEVERY · OLDSAVE.
Outputs in [out] (default dev/handover/robot): `<origin>-<stamp>.md` (THE bug file: one row per distinct bug, lives hit, detail, repro save path, screenshot path), `<origin>-<stamp>.json` (per-life JSON incl. the owner's tally fields, the same from every runner), `saves/` (repro saves), `shots/` (first screenshot per UI bug; never in git).

## Coverage — the exact thân phận list (count 44 roads; from the game, `robot10.js list`)
9 origin cards × 4 ARC67 roads = 36: tt (tt_co, tt_oan, tt_tranh, tt_mat*) · dtq (dtq_bien, dtq_vu, dtq_binh, dtq_huynh) · muoi (muoi_tuoc, muoi_lau, muoi_doi, muoi_no) · cn (cn_chu, cn_tinh, cn_ban, cn_than) · nc (nc_gian, nc_su, nc_tuc, nc_vuong) · td (td_an, td_ke, td_song, td_tha) · ch (ch_co, ch_benh*, ch_ho, ch_bi) · thd (thd_tho, thd_sach, thd_tro, thd_hoc*) · cnv (cnv_chu, cnv_ban, cnv_mat, cnv_ma).
Hòa-thân country branches (ORIGIN_BR, par nc) × 4 = 8: bd (bd_san, bd_soi, bd_tuyet, bd_hen) · pf (pt_hai, pt_su, pt_tang, pt_dang).
*locked at start (arcOk67 false): tt_mat, ch_benh, thd_hoc → the life starts on another road and the harness logs per life when the lock opens (openAt) and whether the road is played (playAt); robot10-agg flags "never opened in ≥5 kiếp" as a BUG.
«dan»: there is NO origin or road "dan" in the game. j82.js:86 `return KG82_KIND[k]?k:"dan"` is the đàn (zither) mini-game KIND fallback, not a home road. BAL.orig.br has only nc:{nc,bd} (pf exists in ORIGIN_BR + roads but is not in the roulette weights — worth a look by the owner of hòa-thân).

## What one life checks (all automatic)
Fast bot page (render off, seeded): JS errors (pageerror + console.error the game swallows; blocked-asset noise filtered) · crash · stuck (inpage6 TIMEOUT / no progress) · SOFT-LOCK (game clock does not move for 20 «Sang ngày mới» presses → halt) · wall cap · stat sanity (NaN / negative / over cap) · save → JSON → load → save identical each real buổi (in place only at quiet moments) · one-core number audit (number printed on an option vs the effect block it belongs to: thành → win, hỏng → loss, else fx/cost) · cổ-trang wording (%, tỉ lệ / xác suất / phần trăm, «khả năng + vừa/cao/thấp…» off the VANPHONG ladder) on cards, options, journal, ending · lag per buổi · ending reached · forced origin/road really played.
Real-render pages Fold 755x1000 + iPad 1180x820 every UIEVERY buổi (+ once with the night flip pending): the bot's save loaded through the title slot (her real load path); then «Sang ngày mới» must move the clock; the open card + every tab scanned: page sideways scroll, cut text, text/buttons off screen, covered buttons, overlapping labelled buttons (same layer), text over text, % / off-ladder odds words, HUD numbers = state, long tasks on load / tab switch. First checkpoint also loads old saves (v5/v4/v3 headers, the life's first save, OLDSAVE files). Portraits not checked (pictures blocked).

## 10 personalities (robot10-in.js PERS; hooks in inpage6: __pw / __allowBad / __persOpts / __persPick / __minS, all default-off)
skilled (inpage6 sensible) · random · greedy (bạc ×8, max-bạc option) · cautious (sức/đức ×3, least-loss option, rests) · schemer (rival schemes every chance, dark acts allowed) · lover (affair road) · scholar (lessons/self-study first, tài ×4) · rebel (dark/defiant options, low đức) · lazy (only very good actions, takes the last/skip option) · speed (random, always the first option).

## Owner tally (OD 23/11 ~20:45Z) — per-life JSON `life` + robot10-agg.js
life.id (ending title) · type (the game's S.kesT: death exile fail leave throne grand fate rare | softlock cap stuck crash) · group (death / thường = exile fail leave throne / kỳ ngộ = fate / đại kết cục = grand / rare) · cause (deathChain line) · age · year · years · chapter · part (BAL.st14.parts) · maxRank + name · steps[{rank, name, buổi, age, year}] (every rank step incl. Hoàng hậu) · top{hoangHau (rank 7), nuDe, hoangThaiHau (ending title, j99succ)} · lock{road, openAt, playAt}. robot10-agg.js: overall, rank reach per rank, deaths by cause / stage / age, every ending id, per origin, per origin×road, per bot, per origin×road×bot, locked roads. Mapping of groups is mine (from jend KIT_END types) — MAIN may re-map.

## Proof run (nc × 10 bots × 1 kiếp, roads spread over all 4, LIVE URL, PAR 3)
Command: `GAME=https://thientran2711.github.io/cung-tuong-mong/index.html PAR=3 node dev/measure/robot10.js nc spread 10 1 <out>` (harness at f77e33b; LIVE build 3e9088f91727 = main da829e9) · wall 50.5 min for 10 lives · bug file dev/handover/robot/nc-20261123-2126.md (48 distinct rows) · rates dev/handover/robot/rates-20261123-2216.md.
| life (bot · road) | ending | max rank | years / age | real buổi | time (play / UI) | buổi change p50/p95/max (ms, render off) |
|---|---|---|---|---|---|---|
| skilled · nc_gian | death «Hồng nhan bạc mệnh» (emperor died, new Thái hậu forced her to follow, year 10) | Hoàng quý phi | 9.6 y / 27 | 1697 | 1190 s (UI 552) | 71 / 433 / 1988 |
| random · nc_su | inpage6 stuck | Tần | 0 / 20 | 115 | 91 s | 51 / 129 / 276 |
| greedy · nc_tuc | tab crashed (Target crashed) after 922 s | — | — | — | 922 s | — |
| cautious · nc_vuong | death «Hồng nhan bạc mệnh» («Tuổi trời đã tận, trọng bệnh», thọ 25) | Quý phi | 5 y / 25 | 887 | 476 s | 45 / 249 / 909 |
| schemer · nc_gian | death «Hồng nhan bạc mệnh» (trọng bệnh, thọ 20) | Tần | 2.75 y / 20 | 499 | 243 s | 28 / 168 / 512 |
| scholar · nc_tuc | death «Hồng nhan bạc mệnh» (emperor died year 4, forced to follow) | Tần | 2.9 y / 21 | 528 | 313 s | 65 / 247 / 561 |
| lazy · nc_gian | inpage6 stuck | Quý phi | — / 18 | 860 | 357 s | 54 / 215 / 602 |
| lover · nc_su | tab crashed after 818 s | — | — | — | 818 s | — |
| speed · nc_su | inpage6 stuck after 3 buổi (free «Hạ độc» loop) | Quý nhân | 0 / 18 | 3 | 88 s | — |
| rebel · nc_vuong | wall cap 1800 s, still alive | Phi | — / 36 | 2997 | 1834 s (UI 713) | 68 / 552 / 4172 |
Runtime per life: 90–1830 s; a whole life that ends ≈ 4–20 min; UI checkpoints ≈ 40 % of the time, save round-trips 5–8 %. Rates (10 lives): ending reached 60 % incl. inpage6 stuck rows → real endings 4/10, all death «Hồng nhan bạc mệnh» at age 20–27; rank reach Quý nhân 80 · Tần 70 · Phi 40 · Quý phi 30 · Hoàng quý phi 10 · Hoàng hậu 0.

Findings (LIVE; report only, sent to Foreman D):
1. SOFT-LOCK after load: a save loaded while the night flip is pending (jnf S.nfX open/wait) → «Sang ngày mới» never moves the clock (real title load, 12 presses). Hit in most lives at the night checkpoint. Suspected jnf.js:322-326 FLIPQ WeakSet of card objects not rebuilt by deserQ.
2. Free «Hạ độc» loop (speed bot, nc_su): the scheme repeats with no khắc used.
3. Bot step crash «Cannot read properties of undefined (reading 'heir')» in an option f() (smoke run, nc_gian schemer).
4. Browser tab crashed mid-life in 2/10 lives after ~14-15 min (greedy, lover): suspected renderer memory growth over a long life (or 9 headless pages on this 4-CPU box) — re-check with PAR=1.
5. Stats over cap: Danh 101, Sắc over 100 (inpage6 __bad).
6. Dư đồ map at iPad 1180: place labels / meta lines (mlab, mmeta «N bóng · đang cấm túc», em.ok) drawn over each other (screenshot seen: Trường Xuân / Vĩnh Hòa / Hàm An / Trường Môn viện).
7. Balance flags for the fixer: deaths «Tuổi trời đã tận, trọng bệnh» at age 20 and 25; emperor dying at 23–30 forcing her to follow — 4/4 deaths are «Hồng nhan bạc mệnh» before 28.
8. One-core option audit rows («Bạc +50/+60» vs fx bac −20 on bets, «Sức +6» vs suc −2 on «Chuyện lạ cần tra / Thay hết nước, đồ ăn», «Bạc −6» vs −35/−17): the robot compares a number printed in o.n + o.x OUTSIDE a «thành:/hỏng:» segment against o.fx / o.c / o.cost; these are most likely the win shown without a «thành:» marker (or a scaled value) → candidates only, the typed-stat worker judges (repro saves in the bug file).
Known false positives in this proof's bug file (fixed in the harness AFTER the run, 888226b): every «text over text» row with span.ef.* / krel / kname / kti on act-card effect rows (a wrapped inline chip measured as one rectangle); runner rows «Target crashed» are finding 4, not harness faults (classified as crash since 64f5199). «khả năng vừa/cao/thấp» rows no longer exist (side-chance scale is correct, OD:L221).

## Known gaps / notes
- Lives are long: whole life ≈ 4–20 min; phase 2 (40 lives per runner, 3 parallel) ≈ 3–5 h per runner. Lower UIEVERY cost or raise it (UIEVERY=300) if time matters; RTEVERY=2 halves round-trip cost.
- inpage6 bot limits: some mini-games have no Xong/Bỏ qua (the bot closes them with the kit ✕); random/speed bots hit inpage6 TIMEOUT often — each is listed with its state, but some may be bot limits, not game bugs.
- Number audit is option-text vs effect-block only; HUD vs state at UI checkpoints. No full BAL derivation audit of every shown number (that is the typed-stat family job).
- Old-save check uses header-downgraded copies of the life's own save + OLDSAVE files; no saves from older LIVE builds are bundled.
- Seeds make the bot's choices reproducible but timers/async in the game can still diverge; the repro save is the reliable repro.
- Portraits/pictures are blocked (owner: character pictures excluded), so picture-dependent layout is not seen.

## HANDOVER (rollover; the coordinator opens the successor with push)
State: branch review/robot10-harness head 84da4a4debef7041540952dde387b2d645fc44c4 (local only; Foreman D applies the patch from the artifact and pushes). Proof outputs in the artifact.
Successor scope (MAIN 111 orders, read verbatim in FOREMAN_D_STATUS: «FROM MAIN 111 (20:46Z 23/11)», «FROM MAIN 111 (20:50Z 23/11): OWNER ORDER #4» + its 11 sub-lines, «FROM MAIN 111 (21:33Z)» point 4):
(A) OWNER ORDER #4 metric set: enumerate from code every die(why) (~24) and every over(title) ending → full list + count in the report, 0 hits = «chưa ai gặp»; add per-life JSON + robot10-agg tables for DEATH / ENDINGS / RANK / FAMILY / FAVOR+SCHEMES / ECONOMY / MINI-GAMES per rank band (law 5) / KỲ NGỘ / BALANCE FLAGS (option ≥90 % or ≤2 %, roads never reached) / HEALTH / TIME (real minutes per kiếp + cumulative); write .md + .csv per round. Where to hook: robot10-in.js over() wrapper (R.life) for ending/death fields; add per-buổi counters in the nextBuoi wrapper (life0); option pick rates via the chooseM wrapper (already sees every option); robot10-agg.js builds tables from r.life — add new blocks + a csv writer.
(B) odds-word check must READ KIT_ODDS from the game (owner changed the act-odds ladder tonight, 7 bands, review/kit-odds-row-r; LIVE now 948c80a5): replace the typed ladder regex in robot10-in.js (ODDS) and uiScan (robot10.js) with a list read from window.KIT_ODDS (fallback: none); keep «khả năng vừa/cao/thấp» unflagged (side-chance scale, OD:L221); see dev/test/odds-scales-scan.js on review/odds-ladder-words.
Also: rebase on newest LIVE before phase 2; re-run the proof (`nc spread 10 1`) and replace the proof table.
