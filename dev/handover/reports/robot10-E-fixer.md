# ROBOT-10 E FIXER (opus BIG) — session_01DgYSWmGEnSrXt1ri867YPN (FOREMAN E ROOT session_01DgYSWnqZ3AVxm7MJEgeznN)
PRIORITY #1 CHECK ('robot10|thd|cnv|bd|pf|nc-fix'): OD 1 (L2204 23/11 ~19:20Z ROBOT PLAYTEST BEFORE SHE PLAYS) | main dev/measure/robot10*.js LIVE 1ddbe155 (LIVE now 14ba8768) | review/* robot10-nc-fix-1-rv ad3fa9be + nc-fix-2-rv 977a70e9 (PASS, LAND READY), robot10-nc-fix-3 449cbe08 (in review), robot10-reco-rv | claims: D robot10 nc fixer row; no E runner file yet.
Brief: dev/handover/briefs/E-robot10-fixer.md. Read: START_CORE (18 laws), START_WORKER, E-common, D triage reports/robot10-nc-fixer.md, harness header dev/measure/robot10.js.
START_CTX ≈ 5 % (1 M window); rollover at 30 %, ceiling 60 %.
Owned elsewhere (skip, mark «owned»): save→load drift (D nc-fix-1/3), stage layers over tabs (D nc-fix-2), stat clamp Danh/Đức (fix-kframe-heir-rv), poisonedFish Sức (typed-stat-bal-rv), soft-lock after load (LIVE 14ba8768), Dư đồ label overlap (MAIN), lag/memory (D robot10-lag), balance numbers (robot10-reco / MAIN). Harness false positives known from D: HUD mid-tween (500 ms hudTween), inpage6 vs kitConfirm «Bỏ cuộc?», Bạc win block read as cost (fixed 521331fc), death names «${…}» (harness catalogue).

## STATUS
(24/11 ~08:40Z) Foreman E = session_01DgYSWmMmAvPErmAnZ8iZEh (child 2). Round-1 files triaged (R1 thd partial, R3 cnv_chu, R4 cnv_mat, R5 pt_hai interim, R6 pt_tang partial33, R7 bd_san partial12). Runs played LIVE 14ba8768 (before kframe-heir 35647d5, typed-stat-bal 2308b42, nc-fix-1/2 2899d1f2/43cf5434, robot10-lag c0dff1b3 landed). E saves were NOT pushed (dev/handover/robot/saves/ has only nc saves) — repros built from nc-B-tuc saves + code. HOLD per Foreman E: save→load→save (S.logs / S.visit / S.il.seq) and «Sang ngày mới» stuck after load (Fold) wait for MAIN.

## 1. Triage — E round 1 (rows merged across R1 R3 R4 R5 R6 R7; lives = sum)
| family (rows) | verdict | owner / branch | proof |
|---|---|---|---|
| save→load→save changes state (all 6 files, every life) | HOLD (Foreman E asks MAIN whether D owns it) | D nc-fix-1 LIVE 2899d1f2 / nc-fix-3 in review | — |
| «Sang ngày mới» stuck after load, Fold (all 6) | HOLD (same) | LIVE 14ba8768 fix-evening-softlock was the base of the run → new case | — |
| «Sức +6» vs suc −2 «Thay hết nước, đồ ăn» (all 6, 17 lives) | fixed LIVE | typed-stat-bal 2308b42 (BAL.eff.j68f fishSwapBac −10 / fishSwapSuc 2) | jbaleff.js:137 on LIVE fd85907a |
| «Bạc +8» vs bac=20 «Nhận bạc, làm tai mắt» (R3 R4, 72 lives) | harness false positive | E-FIX-2 (harness) | the card line she sees (dilLine) = «ngay: Bạc +20 · mỗi tháng Bạc +8 · kèm: …»; +20 = BAL.coopBribe.pay now, +8 = BAL.ag.why.srv.pun.spyPay per month; the audit read o.n+o.x only (no fx part) and took the monthly pay as the option's effect |
| «Tâm cơ +3/+2» vs tamco −1 (R6 jrd_pt2, R7 jrd_bd), «Sủng +2/+3» vs sung −1 (R5 jrd_pt) | harness false positive | E-FIX-2 | road beat options (j67 PEND): fx = o.c (the price), the x text is the WIN block fmt(o.w); she sees «tốn: Tâm cơ −1 · thành: Tâm cơ +3 · …» (j67 line); the audit compared the win number with the price because the returned option carries no w |
| stat out of range danh/duc/sac/tai = 101 (all 6) | fixed LIVE | kframe-heir 35647d5 (j1 statSet clamp) | dev/test/scan-stat-clamp.py on LIVE fd85907a: 0 unclamped (re-check in round 2) |
| JS «econ card TypeError: null.queen» (R1 3, R6 3, R7 1 lives) | REAL | E-FIX-1 | jstip.js:133 Khất bổng row rkName(SK.sup‖queenP()) — queenP() is null when the Hoàng hậu seat is empty and nobody hostile ranks above her; the whole bổng lộc card then fails (no card, no lễ nghĩa choice that month) |
| JS «jptime npcDeed thaopet .t» (R6 1 life) | fixed LIVE | kframe-heir 35647d5 (jpet thaopet: no pet left → actNone) | LIVE 14ba8768 jpet.js:213 had no guard; LIVE fd85907a has it |
| stuck TIMEOUT «Bỏ cuộc?» opts [] over a MƯU game (Thời cơ, Tung tin đồn: Truyền lời, Nghe lén: Nghe ngóng) (R3 R5 R6) | harness | E-FIX-2 | render-off bot presses the kit ✕ on a jsgame with no Xong/Bỏ qua (robot10 __ovX); j82 kg82Back then asks kitConfirm «Bỏ cuộc?» on #modal; inpage6 never presses [data-kcf-yes] → no progress |
| stuck TIMEOUT other (R1 lc out:1, R4 tgk) | needs a repro save (E saves not pushed) | open — ask runners to push saves/ | — |
| no ending within 1800 s wall cap | harness cap | — | lives alive at year 15–18 |
| mem: bot page heap / DOM growth | to confirm harness vs game | E-FIX-2 (census added) | robot10-lag report §3: DOM bursts while render is off |
| lag (tab switch > 400 ms, buổi > 1.5 s) | owned | D robot10-lag (LIVE c0dff1b3) | — |
| Dư đồ go tab mmeta/mlab/em text over text; mspot covered / overlap (iPad + Fold) | owned | MAIN (Dư đồ map lane; map-perf LIVE 056c240) | — |
| kfoc rows: rel p.past × kfoc-next / p / kname / kti; story kchkt × kfoc-sayn; kid span × kfoc-sayn | fixed LIVE | D nc-fix-2 LIVE 43cf5434 (run base had no fix) | — |
| kbk-* text over text on every Fold tab (Tuần lục, «night flip pending») | harness false positive | E-FIX-2 | dev/test/r10e-book-probe.js (nc-B save 005, Fold): the flip-book stacks its leaves; the overlaps are the front page's header vs the SAME header on the leaves under it (elementFromPoint at the hidden one's points = the front page). Shot of the page looked: clean. |
| court tab span.kgl.kfx / span.r text off screen x 318..1007 (R3 1 life) | needs repro (1 hit) | open | — |

## 2. Fix branches
### E-FIX-1 «a person read from an empty seat» — review/robot10-e-fix-1 8f97171e1f006809c47039f4adbba8d887e24ad9 (base LIVE fd85907a)
Cause: the bổng lộc card's khất bổng row named rkName(SK.sup‖queenP()); with the Hoàng hậu seat empty and no hostile superior, queenP() = null → rkOf(null).queen throws inside econStipend's try → the whole month card is lost (no Bổng lộc frame, no lễ nghĩa choice). Same family: two NPC act closures resolved queenP() when the act LANDS (jagacts3 facSell agAt(queenP()), jagacts4 rougeBeg palaceOf(queenP())) — the seat can empty in between.
Fix: jecon keeps who ordered the khất bổng (p.cutBy, read before it is cleared) on SK.cutBy; jstip stipCutWho(SK) = cutBy ‖ the superior ‖ the Hoàng hậu ‖ «Nội vụ phủ» (law 6a/6b: a real orderer, never an empty seat; an order given by someone else now names that person, not the Hoàng hậu); jagacts3/4 closures read the seat when they run, "kn" when empty.
Scan dev/test/r10e-null-seat-scan.js (every direct queenP() read handed to a person helper / field, and every variable taken from queenP() used before a guard):
| | LIVE fd85907a | fix-1 |
|---|---|---|
| unguarded direct reads | 3 (jstip:133, jagacts3:200, jagacts4:49) | 0 |
| variables from queenP() used before a guard | 0 of 86 | 0 of 88 |
Runtime dev/test/r10e-econ-noqueen.js (nc-B save 005, seat emptied, khất bổng set): LIVE = «econ card TypeError: Cannot read properties of null (reading 'queen')» at rkOf ← rkName ← stipEvent ← econStipend (= the robot's row), 4 FAIL; fix-1 = card built, row «Khất bổng theo ý Nội vụ phủ» / «theo ý Hoàng hậu» (cutBy) / seat filled unchanged «theo ý Hoàng hậu», 0 errors — ALL OK.
Tests: quickcheck PASS 298 s (old save ok; perf new/live render 350/348, tab 650/676, buổi 1645/1735 ms; core gates PASS; its «NOT BUILT» line was the uncommitted tree — built + committed after) · bongloc-options 14/14 · bongloc-group-scan ok. No UI/kit/wording change except the orderer name in an existing row; no BAL number; co-op not touched (isSrv seat skips stipSkim as before).

### E-FIX-2 harness (TEST-ONLY: dev/measure + dev/test, no game file) — review/robot10-e-fix-2 19183dcac3310a87aa6c87224ccf95de9725b24d (base LIVE fd85907a)
| row family | cause in the harness | change | proof (LIVE harness → fixed) |
|---|---|---|---|
| number «Bạc +8» vs bac 20, «Tâm cơ +3» vs tamco −1, «Sủng +2» vs sung −1 | auditOpt read o.n+o.x: no «ngay: <fx>» part; a road beat's x = its WIN block while fx = its price; «mỗi tháng Bạc +8» (monthly tai mắt pay) read as the option's effect | robot10-in auditOpt reads the line the kit draws (j67 line / dilLineRaw), «ngay:» = fx segment, per-period «mỗi tháng/tuần/năm…» amounts skipped; auditOpt exposed as __r10.auditOpt | dev/test/r10e-audit.js (every road beat of every ARC67 arc drawn via PEND.j67 = 2727 beats / 8954 options + «Bạc lạ»): 13 + 1 rows → 0 + 0 |
| kbk-* text over text on every tab (Tuần lục) | the flip-book stacks its leaves; a leaf's header lies on the same header of the leaves under it | uiScan text-over-text only when BOTH texts are seen (top element at one of 5 points) and not on different flip-book leaves (.kbk-sheet / .kbk-face; 3D hit-testing unreliable) | dev/test/r10e-uiscan-book.js (robot's own uiScan, nc-B save 005, 4 book pages): Fold 28 kbk rows → 0, iPad → 0; a real text laid on a page title is still reported on both devices. Book pages looked at (Fold p1, iPad p3–4): clean |
| stuck TIMEOUT «Bỏ cuộc?» opts [] over a MƯU game | after the bot's ✕ on a live jsgame, j82 asks kitConfirm; inpage6 never pressed it | inpage6 modalStep presses [data-kcf-yes] first (the caller's own lose path, as she would) | dev/test/r10e-kcf.js: LIVE confirm left / closed by «Thôi» (loop) → fixed: lose path ran in 1 step |
| mem «bot page keeps growing» | unknown | memSample adds a DOM census (nodes in the document by holder, S.logs, Q) and the mem row prints it | short real run (pf pt_hai, 1 bot, 1 life, CAP 480 s, UIEVERY 40): census in-document nodes 1430 → 781 flat while the CDP count 5878 → 2100 (it also counts detached nodes held by JS); no mem row in 11 min. A long round shows which holder grows |
Short real run on the fixed harness: 7 rows (soft-lock after load, wall cap, save drift = HOLD families; lag; 3 bet rows that my first draft caused — removed, audit back to the old rule for «thành:» of plain options; re-scan 0/0). No harness crash.
Not changed: plain options keep the old «thành:» rule (win block from o.w only).
SSK: SẴN SÀNG KIỂM robot10-e-fix-2 19183dca (SMALL reviewer: test-only). Runners should take it before round 2.

## 3. Open / for Foreman E
- HOLD (MAIN): save→load→save drift rows (S.logs.0, S.visit.people.0.sk / S.visit.tk, S.il.seq) and «Sang ngày mới» stuck after load on Fold — every file has them.
- Needs repro saves (runners did not push saves/): TIMEOUT at «lc out:1» (R1) and «tgk» (R4); court tab span.kgl.kfx off screen x 318..1007 (R3, 1 hit).
- Design note for MAIN/content: road option «Nhờ người quen lo liệu, không dùng bạc» costs Sức −19 while its kèm says «tốn bạc» (Hầu bệnh / Mùa dịch beats).
- Remaining round-1 files (R2, R8, full R5/R6/R7) not yet triaged.

## HANDOVER (rollover: START_CTX ~5 % + 25 % reached, ctx ~36 %)
Successor fixer: read this report, briefs/E-robot10-fixer.md, D's reports/robot10-nc-fixer.md. Branches: review/robot10-e-fix-1 8f97171e (game, SSK sent), review/robot10-e-fix-2 19183dca (harness, SSK). Tests: dev/test/r10e-*.js (usage in headers; saves: dev/handover/robot/nc-B-tuc/saves/*.json work). Handover pushes: fetch --force refspec, checkout fresh, append, commit, push — never rebase. Worktrees /home/user/wt/e10-* are scratch (deleted).

# FIXER #2 (successor) — session_01DgYSWmqVHbtQnrFEo7E9r6 (FOREMAN E child3 session_01DgYSWorDW5KeoX9ahdEfda)
PRIORITY #1 CHECK ('robot10 fixer Truyền lời tgk Nghe lén kgl.kfx quota save size il.box'): OD 0 | ledger 0 | claims: row «robot10 E FIXER #2 successor» (mine) | main: jil.js «save size bounded (reviewer r1)» notes only, no quota handling | review/* robot10-e-fix-1 (PASS, LAND READY), robot10-e-fix-2 (mine now), robot10-saves-r1/-r4 (repro saves) | archive 0.
START_CTX ≈ 5 % (1 M window; get_session reads 0); rollover at 30 %, ceiling 60 %. Owned by F (skipped, «owned: F»): save→load→save drift, Fold «Sang ngày mới» after load, shown≠applied gain, bot-page memory leak.
Tools (scratch, not in git): /home/user/wt/e10b-t/replay.js = replay a robot save with the robot's own bot (inpage6 + robot10-in, PROBE=<act> DIRECT=1 opens a scheme game, DIAG=<expr> at a stall).

## 4. Triage — round 1 rest (R2 thd_tro, R8 bd_tuyet, R1 tho-with17harness, R4 tgk) + queue rows
| family (rows) | verdict | owner / branch | proof |
|---|---|---|---|
| stuck «Tung tin đồn: Truyền lời» (R8 7 lives, Q:402) + «Nghe lén / Dò la: Nghe ngóng» | HARNESS | E-FIX-2 (r1 kcf-yes) | saves-r1 save, DIRECT probe: LIVE harness Q +1 per step («Bỏ cuộc?» ×300, stn 299 → TIMEOUT); fix-2: confirm answered, life goes on (rumor and spy) |
| «forced road bd_tuyet not played» (R8 speed-2) | HARNESS (follow-on) | E-FIX-2 | the same TIMEOUT at buổi 0 before the road was read (life row: TIMEOUT, 0 buổi) |
| TIMEOUT «lc out:1» (R1 6 lives) + «tgk» (R4 2 lives) | HARNESS | E-FIX-2 r3 0673d1a1 | R1 json ring = lesson:@lc ×400; tgk save replayed (cautious seed 77) → TIMEOUT ring lesson:@tgk ×8: an art at 100 points below level 5 → j2 lesson() refuses; bot's lessonCands lacked the gate, the option had no L (never banned). The player never sees this path (her lessons are lessonMode in Tài nghệ) |
| CAP no-ending, rank 5–7 (R8 11, R6 13, R1 13) | harness wall cap (1800 s) | — | years keep advancing to the cap (R1 skilled-2: 19 years, 2693 buổi), other lives of the same bot end normally (death, Xuất gia, băng hà); raise CAP or speed for long lives |
| **save does not load: setItem exceeded the quota** (R1 scholar-4, year 17) | **REAL** | **E-FIX-3** | nc-B-tuc save 010 = 4.97 M chars at year 14 (Chrome ~5.2 M per site); S.il.box 2.08 M = 15 808 Nội vụ phủ «kho»/«net» pieces = USED-UP candles / hair oil / son phấn boxes (NPC monthly spend runs inside the guarded stipGoods → routed as stock); j6 save() swallowed the error |
| crash (R2 3 lives renderer OOM, 393 k nodes) + mem rows | owned: F (bot-page memory leak) | F fixer | — |
| save drift, «Sang ngày mới» after load, «Sức +6» vs suc −2 | owned: F | — | — |
| stat 101 danh/duc/sac/tai (R2 R8 R1) | fixed LIVE (kframe-heir 35647d5) | — | runs played the pre-fix build |
| econ card null.queen (R8 1, R1 3) | E-FIX-1 PASS (LAND READY) | — | — |
| kbk-* text over text (R8 R1, every Fold tab) | HARNESS | E-FIX-2 r1 | flip-book leaves (r10e-uiscan-book) |
| kfoc rows (p.past × kfoc-next, kchkt × kfoc-sayn) | fixed LIVE (D nc-fix-2 43cf5434) | — | — |
| Dư đồ go tab mmeta / em / mlab / mspot | owned: MAIN | — | — |
| lag rows | owned: D robot10-lag | — | — |
| R1 real-page JS (renderHud2 .replace undefined ×52, «sl» undefined ×5, kitImgErr not defined ×14), 1 life scholar-3 | needs repro | open | all in the one life whose save hit the quota → likely the real page after a refused save (no save loaded); re-check after fix-3 |
| court tab span.kgl.kfx off screen x 318..1007 (R3 1 hit) | needs repro | open | text = person card «Dạo này: Trong cung: …» (jpcf pcfLog via kitFactTap); a one-line 689 px span: probably inside a clipped (overflow hidden) parent the harness does not treat as a scroller; no save |
| kmrow × kmtake «Trân phẩm Nến sáp trắng … Nhận» (R8 1 life, every Fold tab), kmchip.kmck «Thường tại × Thường tại» (R2 1 life, every tab), em.pcs × kstv / kfoc-sayn (R8 kid tab) | needs repro | open | one life each; the same overlay on every tab = a reward / rank card held open over the tabs |

## 5. Fix branches (FIXER #2)
### E-FIX-2 r2 + r3 (TEST-ONLY) — review/robot10-e-fix-2 0673d1a1a42b4de8126d072ef6cf103e6e31d81c
- r2 145a1f54 (E76r FAIL 1): auditOpt compares HER Sủng via sgNow (sg(): nồng nàn ×1.3, lạnh lùng ×.7 on gains — what fmt draws AND apply applies). dev/test/r10e-audit-trait.js (4 trait sets × raw −4 −2 +2 +5: shown = real S.sung change, no row; a raw-typed line under a trait still flagged): 19183dca **8 FAIL** → ALL OK. r10e-audit 2727 beats 0/0, r10e-kcf ok.
- r3 0673d1a1: lessonCands uses the game's gate artPts<100, lesson option has an L. dev/test/r10e-lesson.js (tgk save; one art level 4 / 100 pts): 145a1f54 TIMEOUT ring lesson ×4 → ok.
### E-FIX-3 «used-up consumables pile up in the store → the save outgrows storage» — review/robot10-e-fix-3 e1ee6041fe6c7dd591bac73d367dd3ff4603d2e3 (base LIVE fd85907a)
Cause: candles, hair oil, son phấn boxes are durable for jil (ilDur) and every code path that SPENDS them splices them out; inside the guarded stipGoods (NPC spend: jallot alNpcSpend, jration lxNpcSpend, the NPC surplus trim) they were routed to the Nội vụ phủ store as «kho» stock; outside a guard (her toilette, her study candle, lxGive to the last use) the census «netted» them into the store. +~1 100 pieces a year, never handed back; at ~year 16–17 the save passes the browser limit and j6 save() failed silently (she keeps playing, nothing is kept).
Fix (law 6c kept: a used-up consumable is not lost, like tea / medicine): jil ilUsedUp(e) marks a spent piece; ilGone and the census skip it. Marked at every spend site (scan below). Old saves: once per loaded ledger the used-up allotment remains (al*/lx* «kho»/«net» in the store; a son phấn box only when empty) are taken out of the box (ids leave the census map). j6 save(): a refused write shows the kit notice CTM_WAIT.saveBlocked once (existing words «Không ghi được sổ (chỗ cất trong máy bị chặn hoặc đã đầy).»).
Scan (every splice of an al*/lx* piece in jallot / jration / jstip):
| site | what | LIVE | fix-3 |
|---|---|---|---|
| jallot alNpcSpend | NPC hair oil spent | → store «kho» | used up |
| jallot toilette (jallot:71) | her / NPC oil at a sitting | census «net» | used up |
| jallot alLight | candle burnt at evening study | census «net» / «kho» | used up |
| jallot staff keep trim | servants' older pieces («used up» per jallot) | census «net» | used up (al/lx only) |
| jration lxSpend | son phấn box spent to 0 | census «net» | used up |
| jration lxNpcSpend | NPC son phấn spent | → store «kho» | used up |
| jration lxGive | box given to its last use (copy g carries the rest) | census «net» | used up |
| jstip NPC surplus trim | NPC's older candles / oil beyond npcKeep | → store «kho» | used up (al only; lx never trimmed) |
dev/test/r10e-save-size.js (nc-B-tuc save 010, year 14, the robot's sensible bot, 1 game year):
| | LIVE fd85907a | fix-3 |
|---|---|---|
| save chars start → +1 year | 4 339 545 → 4 689 526 (+350 k / year) | 4 339 545 → 2 982 811 |
| S.il.box pieces | 15 923 → 17 057 | 15 923 → 1 253 |
| used-up consumables in the store | 14 740 → 15 612 | 14 740 → 0 |
Tests: quickcheck **PASS** 501 s (core gates PASS, old save ok, perf new/live render 147/179, tab 329/317, buổi 964/1011 ms) · monthly-allotment ALL PASS (same as LIVE) · monthly-ration 2 FAIL «mirror rows = owned colours», «mirror note + rush» = the SAME 2 FAIL on LIVE fd85907a (pre-existing) · item-ledger.js crashes on LIVE too (stale test: sellItem box entry not found at step 2; pre-existing). No UI/kit change except the existing kit notice; no BAL number; co-op: jil co-op paths untouched (ilUsedUp only skips routing of a spent piece).
Not in fix-3 (next): R[].inv 6 654 pieces (0.58 M) and her own inv 1 357 at year 14, nmReg 0.33 M, rlog 0.19 M — still grow; a fresh-life growth measure is the next step.

## HANDOVER (FIXER #2 → #3; rollover: START_CTX ~5 % + 25 % reached, ctx ~30 %)
Successor: read briefs/E-robot10-fixer.md, this report (§3–§5), E-common. Branches in review: review/robot10-e-fix-2 0673d1a1 (test-only, r2+r3, SSK sent), review/robot10-e-fix-3 e1ee6041 (game, SSK sent); e-fix-1 PASS LAND READY. Answer review FAILs on those branches first.
Next (in order): (1) save growth after fix-3 — measure a FRESH life (node dev/test/r10e-save-size.js - 6 on fix-3) and the next holders at year 14: rivals' inv 6 654 pieces (y_va/y_ho/y_sa clothes 2 200, lx 1 600), her inv 1 357, S.nmReg 0.33 M, S.rlog 0.19 M, S.intel 0.13 M — same rule: a real piece never vanishes, but a used-up / worn-out one is not kept; check owner rules before any cap. (2) open UI rows need saves from the runners (R3 018.json kgl.kfx, R8 cautious-3 kmtake, R2 rebel-3 kmchip, R8 em.pcs) — ask Foreman E for single saves on a review/robot10-saves-* branch. (3) R1 real-page JS (renderHud2 .replace / «sl» / kitImgErr) — re-run the R1 thd_tho life with fix-3; if it comes back, get its save.
Scratch tools (not in git, recreate if gone): replay a save with the robot's bot = inpage6 + inty + robot10-in evaluated in a BOT_INIT page, deser(save), loop __bot.step(mode,300) (see dev/test/r10e-lesson.js for the page setup). Saves used: review/robot10-saves-r1 (thd_tho year 1), review/robot10-saves-r4 (cnv_mat year 1), handover dev/handover/robot/nc-B-tuc/saves/20261124-0057-010.json (year 14, 4.97 M chars).
HANDOVER ADDENDUM (Foreman E messages 09:23–09:53Z read after the rollover): fix-3 acceptance items NOT yet done — do them on review/robot10-e-fix-3 before its review: (a) law 6c: fix-3 treats spent candles / hair oil / son phấn boxes as USED UP (not routed), and drops the used-up al*/lx* «kho»/«net» remains from old saves; Foreman E asked that every kho piece stays traceable — state this design in the SSK (used-up = like tea/medicine, IL_USED_KD precedent) or, if the reviewer disagrees, log each drop in S.il.log («dùng hết») instead of silent removal; (b) old-save test with the 4.97 M save: load → slimmer save, no lost lasting items for her or NPCs (count non-al/lx pieces before/after); (c) coop-e2e Fold host + COOP_SWAP; (d) scan table of every other S.* / R[] array that grows without bound (inv, logs, visit, nmReg, rlog, intel…). New input files to triage: thd-20261124-R1-tho-merged.md, pf-20261124-0256-R6.md (22 CAP), thd-20261124-0842-R2.md.

# FIXER #3 (successor) — session_01DgYSWogKvvnwna26yqXVT5 (FOREMAN E child3 session_01DgYSWorDW5KeoX9ahdEfda)
PRIORITY #1 CHECK ('ilUsedUp saveBlocked save size'): OD 0 | ledger 0 | claims 0 | main 0 | review/* robot10-e-fix-2 0673d1a1 + robot10-e-fix-3 e1ee6041 (FIXER #2) | archive 0. Law 6c text: START_CORE law 6(c) + OD 18/11 ~16:20Z (no owner rule on store caps found).
START_CTX ≈ 5 % (1 M window); rollover at 30 %, ceiling 60 %.

## 6. E-FIX-3 r2 — review/robot10-e-fix-3 434a4a30 (on r1 e1ee6041; base LIVE fd85907a)
Why r2: r1 broke law 6c — it marked an NPC's TRIMMED surplus (unburnt candles, hair oil with lượt left) as used up, and its old-save cleanup dropped every al*/lx* «kho»/«net» store record. In the 4.97 M save that was 10 354 pieces with uses left (8 210 unburnt candles, 2 144 oil bottles with lượt) + 4 386 spent remains.
Design r2 (law 6c: every piece traceable; a piece with uses left is never dropped; save stays small):
- SPENT (candle burnt, oil / son phấn box at its last use): ilUsedUp(e,p) at the spend site → not routed, not netted; counted in S.il.used[owner][item] (a ledger count, bounded: owners × kinds).
- SURPLUS WITH USES LEFT (jstip NPC trim, jallot staff trim): ilStock(e) → Nội vụ phủ COUNTED stock S.il.stock[item(.lượt)] (fungible goods: one number per kind, not one record each). jstip stipGoods hands an NPC's candle / hair oil out of that stock first (ilStockTake, fullest bottle first) → the stock never grows past one month's surplus.
- OLD SAVES: once per loaded ledger (ilWeek), ilOldMove moves al*/lx* «kho»/«net» records: spent → S.il.used[owner], uses left → S.il.stock; her own pieces with uses left and son phấn boxes with lượt left (colour + lượt) keep their records; S.il.conv = [[week, spent, stocked]] logs the move.
- j6 save(): unchanged from r1 (refused write → kit notice CTM_WAIT.saveBlocked once).
### Old save no-loss (dev/test/r10e-oldsave-noloss.js, nc-B-tuc 20261124-0057-010.json, year 14)
| | before | after load |
|---|---|---|
| save chars | 4 345 880 | 2 770 661 |
| S.il.box records | 15 923 | 1 183 |
| lasting items (not al/lx), 73 owners (her, NPCs, store by owner) | 6 551 | 6 551 (0 per-owner mismatches) |
| al/lx with uses left (held + store + counted stock), per item | e.g. alnen0 4 936, aldau0 1 896 | equal for all 21 items (0 mismatches) |
| spent remains in the store → S.il.used | 4 386 | +4 386 |
| page errors | — | 0 |
Result: ALL OK.
### Consumable scan (dev/test/r10e-consume-scan.py: every place an al*/lx* piece leaves a bag in jallot / jration / jstip)
| file:line | function | where the piece goes |
|---|---|---|
| jallot.js:64 | alNpcSpend | ilUsedUp |
| jallot.js:71 | (wrap) | ilUsedUp |
| jallot.js:82 | (wrap) | ilUsedUp |
| jallot.js:110 | (wrap) | ilStock |
| jration.js:102 | (wrap) | ilUsedUp |
| jration.js:136 | lxGive | ilUsedUp |
| jration.js:173 | (wrap) | ilUsedUp |
| jstip.js:104 | (wrap) | ilStock |
| jstip.js:125 | stipRestore | guarded stipRestore → store record «kho» (a real piece, uses left) |
| jstip.js:179 | (wrap) | not an allotment consumable (tea served; IL_USED_KD «Trà», used up) |
sites 10 · unmarked 0
LIVE fd85907a: the same 10 sites, 9 unmarked (→ «kho»/«net» records); r2: 0 unmarked.
### Growth after the fix (dev/test/r10e-save-size.js, sensible bot; dev/test/r10e-grow-scan.js)
| run | LIVE fd85907a (FIXER #2) | r2 |
|---|---|---|
| year-14 save, +1 game year | 4 339 545 → 4 689 526 (+350 k) | 4 339 545 → (load 2 770 661) → 2 967 243 (+197 k from the slim load) ; store 938 records, 0 used-up consumables in it |
| fresh life, year 1 → 4 | — | 73 436 → 1 266 729 (+~400 k / year in the first years); S.il 48 k; S.il.stock 8 kinds (628 pieces counted) |
Growing holders still left (year 14 → 15, chars/year): R[].inv +53 k (7 263 pieces), S.rlog +21 k (bounded: 181 k at year 14 vs 188 k at year 4), R[].staff +13 k, R[].shn +12 k, R[].ky +12 k, R[].dsn +12 k, S.inv +9 k (her 1 467 pieces), S.intel +8 k, R[].wdSeen +5 k, S.knw +5 k, S.nmReg +3 k (304 k, 13 427 rows). At ~+200 k / year a year-15 save (2.97 M) reaches the ~5.2 M browser limit near year ~26 → step (3) of the order (save growth: R[].inv first). Full tables: run the scan on two saves.
### Tests on 434a4a30
quickcheck **PASS** 559 s (core gates PASS, old save ok, perf new/live render 221/207, tab 399/379, buổi 1118/2238 ms) · coop-e2e Fold host **142/142** · COOP_SWAP=1 (iPad host) **142/142** · monthly-allotment ALL PASS · bongloc-options 14/14 · monthly-ration 2 FAIL «mirror rows = owned colours», «mirror note + rush» = the same 2 pre-existing FAIL as LIVE fd85907a (FIXER #2 §5) · r10e-oldsave-noloss ALL OK · r10e-consume-scan 0 unmarked.
No UI / kit / wording change in r2; no new BAL number (stock has no cap: it drains by the NPC issue). Co-op: NPC issue / trim run on the host only (as before); S.il.used / stock / conv are plain S.il fields.
SSK: SẴN SÀNG KIỂM robot10-e-fix-3 434a4a30 (BIG: game, item ledger).

## 7. Save growth after fix-3 r2 — what still grows (order step 3; measure only, no code yet)
Source: year-14 save → +1 game year on 434a4a30 (r10e-save-size OUT=, r10e-grow-scan). Post-fix rate ≈ +200 k chars / year → a year-15 save (2.97 M) reaches the ~5.2 M browser limit near year ~26; a fresh life is 1.27 M at year 4.
| family (year 14 → 15) | pieces | +chars / yr | cause | owner rule / who decides |
|---|---|---|---|---|
| NPC dresses sewn from the monthly cloth (y_* src «may») | 1 651 → 1 848 | +19 k | jwdinv useItem/wdSew: every lụa / vải bông / gấm piece an NPC gets becomes a dress; a dress is a lasting piece and never leaves (one rank-1 NPC holds 122 «Áo lụa Hàng Châu vân thủy») | lasting item → may NOT be dropped (law 6c). Needs a real road: old dresses handed down to her maids / sold / kept as cloth when she has enough — new behaviour = FEATURE FREEZE (law 18) → MAIN / parking |
| NPC other dresses + hair / jewel / sachet sets (promotion sets jpromo prGive, wdGain) | 1 862 → 2 105 | +15 k | every rank-up set (y + trâm + vòng + ngọc bội + túi thơm) adds; nothing ever leaves an NPC | same: lasting → MAIN |
| NPC son phấn boxes (lx*, never trimmed) | 1 633 → 1 738 | +7 k | issue 4 parts / month vs BAL.ration.npc.use 3 lượt per part spent → boxes pile up | balance number (BAL.ration.npc.use / uses) → robot10-reco / MAIN |
| NPC food / tea / wine (banhtrai, ruoucuc, tragoi, trahop, traicay; promotion extras) | ~760 → ~820 | +4 k | NPCs never eat / drink them (non-durable for jil: they also stay in DEAD NPCs' bags, 371 pieces) | consuming them would be «used up» (S.il.used count, law 6c ok) but it is a new NPC behaviour → MAIN |
| trân phẩm tp (NPC 188 → 223, her 107 → 123) | | +12 k | each piece is a long record (prize text) | lasting → keep |
| her own bag (S.inv 1 357 → 1 467: 573 candles / oil, tea, tp) | | +9 k | hers; she can sell / give | keep |
| S.rlog / S.nmReg / S.intel / S.knw | | +21 k / +3 k / +8 k / +5 k | rlog is already bounded (181 k at y14 vs 188 k at y4); nmReg 13 427 rows (name register) | owned by their modules; not law 6c |
Technical option with no rule change (for MAIN): the browser slot could hold a compressed save (j16 saveCode «CTM2» gzip already exists for export; save() / loadSlot() are synchronous, so it needs a sync codec or an async save) — typically 5–10× smaller, old saves keep loading by prefix. Not started: a save-format change touches cloud save (jcloud rawSlot / writeSlot) and Sổ › export.

## 8. Step 4 UI rows — E-FIX-4 (harness, TEST-ONLY) review/robot10-e-fix-4 e4022143 (on fix-2 r3 0673d1a1)
| row | verdict | cause | proof |
|---|---|---|---|
| R3 cnv_chu schemer-4 Fold court tab: «text off screen» span.kgl.kfx x 318..1007 + span.r 715..804 (saves-r5 R3-018.json) | HARNESS false positive | the text sits in the kit one-line person row «Dạo này» (KIT §6.3h: .krv overflow hidden, cut «…» + «!» opens the full text); the robot's uiScan took the full text box, not the part she sees. Live page (looked, Fold): row cut correctly with «!» | dev/test/r10e-offscreen-clip.js: fix-2 r3 harness FAIL 1 (Fold x 324..1295, iPad 753..1724) → e4022143 ALL OK on Fold 755x1000 + iPad 1180x820; a real unclipped text past the edge is still reported |
Change: dev/measure/robot10.js uiScan «seen» box = text box cut by every clipping ancestor that ends INSIDE the screen (a screen-wide wrapper's clip still counts). No game file.
Still open (waiting for saves on review/robot10-saves-r5): R8 cautious-3 kmrow×kmtake, R2 rebel-3 kmchip, R8 em.pcs kid tab.
SSK: SẴN SÀNG KIỂM robot10-e-fix-4 e4022143 (SMALL, test-only; lands after fix-2 r3).

## 9. Step 4 rest — E-FIX-4 r2 review/robot10-e-fix-4 66728c90 (TEST-ONLY, on fix-2 r3; saves review/robot10-saves-r5)
| row | verdict | cause | proof (robot's own uiScan, old = fix-2 r3 harness) |
|---|---|---|---|
| R2 rebel-3 «text over text span.kmchip.kmck × span.kmchip.kmck Thường tại × Thường tại» (every Fold tab) | HARNESS | the demotion card's rank chip cracks in two aria-hidden clip-path halves of the SAME words over a hidden layout copy (j93 kmRankDownHTML kmck-a/b) — by design | dev/test/r10e-uiscan-copy.js (the game's own chip, Fold + iPad): old FAIL 1 → ALL OK; different words and a non-aria-hidden double draw still reported |
| R8 bd_tuyet cautious-3 «button covered: div.kmrow under button.kbtn.kmtake» (every Fold tab) | HARNESS | long reward list (j93 kitReward .km-done) keeps «Nhận» position:sticky at the bottom of its scrolling list; rows pass under it while she scrolls; the last row scrolls clear | dev/test/r10e-uiscan-sticky.js (game's own list, 14 items, Fold + iPad): old FAIL 1 → ALL OK; a non-sticky button laid on a row still reported |
| R8 bd_tuyet skilled-2 «em.pcs × kstv Đã mất × Nhiều chuyện» (iPad kid tab) | NOT REPRODUCED | saves-r5 R8-skilled-2.json, iPad kid tab, old harness: 0 rows; page looked: dead prince card fine (bottom rows under the kit scroll fade, scrollable). The Fold twin (#2353, save 081) not tried | open: needs save 081 (Fold) if it comes back in round 2 |
| R8 bd_hen «real page console.error TypeError: Cannot read properties of undefined (reading '1')» (5/5 skilled lives, 44 hits, Fold + iPad) | NOT REPRODUCED yet | saves-r5 R8-hen-skilled-1.json (earliest autosave) loaded on LIVE 178cac37 + fix-3 build: load, night after load, every tab, act card + «Sang ngày mới» ×3, v5/v4/v3 headers → 0 hits. The robot row had no detail | harness change in r2: every real-page console.error row now carries the Error's top frames + «@ năm … buổi #» + its checkpoint save. A 1-life rerun (bd bd_hen skilled, LAG=0) on fix-4 is running in /home/user/wt/e10c-out/r8 |
| R3 kgl.kfx off screen | HARNESS (r1 e4022143, §8) | | r10e-offscreen-clip ALL OK on r2 too |
SSK: SẴN SÀNG KIỂM robot10-e-fix-4 66728c90 (SMALL, test-only; replaces e4022143).

## 10. E81r FAIL item 3 (r1) — r3 WIP review/robot10-e-fix-3 fc995c46 (NOT SSK)
Done: j6 saveBlocked() = ONE kit notice for every save writer; save(), jcloud writeSlot (LS.set false), jcoopworld snapSave (local write in its own try → notice; seatPush always runs), jcoopthine:203 guest copy (→ notice). j16 Sổ › Ghi vào ô already prints CTM_WAIT.saveBlocked. Scan dev/test/r10e-savewrite-scan.py: 5 save writers, r1 e1ee6041 3 silent → 0.
Open: dev/test/r10e-saveblocked.js does not reach j6's inner write — with setItem stubbed to throw, save() writes nothing (only «hclh-h2c» throws); a save() wrapper returns early in the test page (suspects: j52 NLP, jcloud STALE / C.k guard, jqsave / jspread holds — __jqoff / __spreadOff already set). saveBlocked() itself shows the notice (checked in page). Next: find the guard (log which wrapper returns), then coop-e2e + COOP_SWAP on r3, quickcheck, SSK «robot10-e-fix-3 <sha>» (E81r is re-reviewing r2 434a4a30 and named this item; Foreman E: priority over step 4).

## HANDOVER (FIXER #3 → #4; rollover: START_CTX ~5 % + 25 % reached, ctx ~30 %)
State: fix-3 r2 434a4a30 SSK'd (E81r re-reviewing); r3 WIP fc995c46 on top (above). fix-4 r2 66728c90 SSK'd (E82r SMALL, test-only harness on fix-2 r3: R3 kgl.kfx clip, R2 kmck chip crack, R8 sticky «Nhận», JS rows carry stack + buổi + save). fix-2 r3 0673d1a1 (E80r). Step 3 (save growth) = FOR MAIN decision, do not build (a)–(d) until MAIN answers (§7).
Running at rollover: 1-life rerun «node dev/measure/robot10.js bd bd_hen skilled 1» on the fix-4 harness in /home/user/wt/e10c-out/r8 (LAG=0) — when done, read its bug file for the «reading '1'» row: it now has the stack + save → fix the real JS (R8 bd_hen, 5/5 skilled lives). If the box was recycled, rerun it.
Not reproduced: R8 em.pcs × kstv (iPad kid tab, saves-r5 R8-skilled-2 → 0 rows; Fold twin = R8 save 081 not tried).
Worktrees (scratch, delete when done): /home/user/wt/e10c-f3 (fix-3), /home/user/wt/e10c-f4 (fix-4), /home/user/wt/e10c-live (main 178cac37 assembled), /home/user/wt/e10c-ho (handover). Data: /home/user/wt/e10c-data (s010 = the 4.97 M save, saves-r5 files, robot10-old.js = fix-2 r3 harness for before/after). Tools: /home/user/wt/e10c-tools (jsprobe.js, uis.js, ovl.js, hopush.sh).

# FIXER #4 (successor) — session_01DgYSWoKmRE1ddnzL3kKLN7 (FOREMAN E child3 session_01DgYSWorDW5KeoX9ahdEfda)
PRIORITY #1 CHECK ('saveBlocked save writers'): OD 0 | ledger 0 | claims FIXER #3 (rolled) | main 0 | review/* robot10-e-fix-3 r3 WIP fc995c46, r2 434a4a30 (E81r reviewing), robot10-e-fix-4 r2 66728c90 (E83r PASS e75c2715) | archive 0.
START_CTX ≈ 7 % (1 M window); rollover at ~32 %, ceiling 60 %.

## 11. E-FIX-3 r3 — review/robot10-e-fix-3 f0a5f92c (on r2 434a4a30; E81r item 3)
Game change (fc995c46, FIXER #3): j6 saveBlocked() = ONE kit notice (CTM_WAIT.saveBlocked, existing words «Không ghi được sổ (chỗ cất trong máy bị chặn hoặc đã đầy).», id-deduped) for every save writer: j6 save(); jcloud writeSlot (LS.set false → notice); jcoopworld snapSave (snap built first, local write in its own try → notice, seatPush ALWAYS runs after); jcoopthine:203 guest copy (→ notice). j16 Sổ › Ghi vào ô already prints the same words.
Test fix (f0a5f92c): dev/test/r10e-saveblocked.js never reached j6's write because it loaded the save with a bare deser() and left the page's boot flag quiet=true (j1), so save() returned at its own `if(!S||quiet)` guard. It now loads like j6 «Tiếp tục» (quiet=true; deser; quiet=false). No wrapper (j52 NLP, jcloud STALE/C.k, jqsave, jspread, jslots, jcoopworld) was the cause.
| check | LIVE 178cac37 (+fix-4 harness, e75c2715) | r3 f0a5f92c |
|---|---|---|
| r10e-saveblocked.js (saves-r5 R3-018, setItem refused) | FAIL 2: save refused 4× («hclh-save-v2-3»), no notice | ALL OK: notice ×4 calls → one kit chip on screen, 0 page errors |
| r10e-savewrite-scan.py (save writers) | r1 e1ee6041: 5 writers, 3 silent | 5 writers, 0 silent |
Tests on f0a5f92c: quickcheck **PASS** 569 s (core gates PASS, time-spill PASS, old save ok; perf new/live render 202/135, tab 391/391, buổi 1404/1110 ms — a robot life ran on the same box, noisy) · coop-e2e Fold host **142/142** · COOP_SWAP=1 **142/142** · monthly-allotment ALL PASS (42) · r2 tests unchanged (r10e-oldsave-noloss, r10e-consume-scan: no jil/jallot/jration/jstip change in r3).
No UI / kit / wording / BAL change in r3. E81r's r2 verdict not received yet — r3 holds r2 unchanged; answer it on this branch when it comes.
SSK: SẴN SÀNG KIỂM robot10-e-fix-3 f0a5f92c (BIG: save writers + item ledger; = r2 434a4a30 + E81r item 3).

## 12. R4 cnv_ma (cnv-20261124-1104-R4.md) row 4 — TIMEOUT speed-4, «Bỏ cuộc?» with opts []
Verdict: HARNESS, already fixed by E-FIX-2 (inpage6.js:19–21, review/robot10-e-fix-2 → inside fix-4-r2m e75c2715, not on main yet). «Bỏ cuộc?» is the kit confirm (j82 kg82Ask → j79 kitConfirm on #modal): its yes button sits in the body ([data-kcf-yes]), so Q opts are always [] by design; the LIVE inpage6 only pressed Q opts and waited. origin/main inpage6 has no kcfYes → R4 ran on the old harness. Lands with fix-2 r3 / fix-4.

## 13. R3 cnv_ban (cnv-20261124-0641-R3.md, OLD harness) — UI rows triage
| rows | what | verdict | owner |
|---|---|---|---|
| 13–16 | [ipad] go tab: button.mspot covered / overlap | owned | MAIN Dư đồ map lane (map-label-overlap b7598e72 is in main; the run's game sha is not in the file — if its base ⊇ b7598e72 the spot overlap is still there → MAIN) |
| 17–26, 28–31 | [ipad] go tab: span.mmeta / span.mlab / em / em.ok text over text (the map spot labels) | owned | MAIN (same map lane; not a one-line clip, aria-hidden copy or sticky case → the fix-4 r2 harness rules do not clear them) |
| 27 | [fold] rel tab: #panel > p.past × button.kfoc-next | fixed LIVE | D nc-fix-2 43cf5434 (stage layer leaking over tabs; same family as §3 row) |
| 2, 5 | soft-lock after load / save→load→save drift | owned | F (skip) |
| 4 | econ card null.queen | fixed | fix-1 / nc-fix-4 |
| 6–10 | «Bạc +8» vs bac=20, Sức +6 vs −2, stat range danh/duc/sac | owned | same families as §3 (BIG3 chain / stat clamp / one-core audit) |
| 1, 11, 12 | memory / lag | owned | D robot10-lag |
| 3 | no ending within 1800 s cap | harness cap | — |
No row on the fix-4 r2 harness rules (clip / aria-hidden copy / sticky) in this file; no new real E bug. Only open question → MAIN: Dư đồ go-tab label overlap on iPad (25/50 lives).

## 14. E-FIX-3 r4 — review/robot10-e-fix-3 b76ccc59 (on r3 f0a5f92c; E81r r2 + r3 verdict item: law 1, one stock rule)
Rule chosen (the simpler one that keeps law 6c + law 1): **the Nội vụ phủ counted stock hands out only FULL pieces** — a whole candle, a hair-oil bottle with all its lượt (BAL.allot.oil.uses) — i.e. exactly the piece her own monthly issue mints. Part-used bottles stay COUNTED in S.il.stock (real, findable; one number per kind × lượt, so the save stays small). Her issue and every NPC's issue now give the same piece.
Run-on fix (same family, found by the new test): the NPC trim put an EMPTY bottle (0 lượt) into the stock («aldau0.0»). ilStock(e,n,p) now counts a 0-lượt bottle as used up for its holder (S.il.used), never as stock. Both trim sites pass the holder (jstip:104 NPC, jallot:110 staff).
Issue-path scan (every place a month's al*/lx* piece is handed out):
| site | who | piece |
|---|---|---|
| jallot alInit | her / NPC first set | minted full (alFix) |
| jallot :102 monthly issue | her | minted full |
| jallot :110 alStaffGive | her staff | minted full |
| jstip :103 stipGoods | every NPC | stock FULL piece first (r4), else minted full |
| jstip :126 stipRestore | skim given back | minted full (k0) |
| jration lxInit / lx issue | her + NPCs | minted full box |
| trims jstip :104 / jallot :110 | NPC / staff surplus | uses left → stock (counted); empty → used up (r4) |
dev/test/r10e-stock-full.js (saves-r5 R3-018):
| check | r3 f0a5f92c | r4 |
|---|---|---|
| stock {oil 2 lượt ×3, 4 lượt ×2, full ×1, candles ×2} → takes | 6, 4, … (fullest first, part-used handed out) | 6 then mint; candles ×2 |
| NPC month issue with only 2-lượt oil in stock | NPCs got 6 / 4 / 2 lượt | 6 / 6 / 6 |
| empty bottle at the trim | «aldau0.0» into the stock | used up (S.il.used) |
| result | FAIL 4 | ALL OK |
Also taken: E81r's r10e-saveblocked fix (close the loaded life's dialog before looking for the chip; review/robot10-e-fix-3-r 183fb7e9) → ALL OK.
Tests on b76ccc59: quickcheck **PASS** 525 s (core gates, old save ok; perf new/live render 199/194, tab 403/392, buổi 1750/1236 ms) · coop-e2e Fold host **142/142** · COOP_SWAP=1 **142/142** · monthly-allotment ALL PASS (42) · r10e-oldsave-noloss (R3-018, 2.40 M → 1.64 M chars) ALL OK, lasting 2 807 = 2 807, 0 mismatches · r10e-consume-scan 0 unmarked · r10e-saveblocked ALL OK · r10e-stock-full ALL OK.
LOAD-COMPARE (coop-e2e, same box, one after another; branch test file = 142 checks, LIVE's = 162):
| run | start → end (UTC) | load avg 1/5/15 at start | result |
|---|---|---|---|
| r4 b76ccc59 Fold host | 11:39:49 → 11:42:21 | 2.78 2.12 2.21 (a robot life running) | 142/142 |
| LIVE 178cac37 game (fix-4-r2m checkout) Fold host | 11:42:21 → 11:55:48 | 6.72 3.94 2.88 | **134/162, 28 FAIL from week 0** (#next stays «Sẵn sàng», Q 8 dialogs queued) = the LIVE regression, not this branch |
| r4 COOP_SWAP | 11:55:48 → 11:57:51 | 0.34 1.05 1.85 | 142/142 |
No UI / kit / wording / BAL number change in r4 (BAL.allot.oil.uses read, not typed).
SSK: SẴN SÀNG KIỂM robot10-e-fix-3 b76ccc59 (BIG; = r3 + one full-piece stock rule).

## 15. E-FIX-5 «reading '1'» (R8 bd_hen, 5/5 skilled lives; R8 chunk2 27d53caf too) — review/robot10-e-fix-5 6b96055a (on fix-4-r2m e75c2715 = LIVE 178cac37 + fix-4 harness)
Rerun: 1 bd_hen skilled life on fix-4-r2m → the row came back (Fold 13 + iPad 14 hits) but still WITHOUT a stack. Harness gap: with RECYCLE on (default) the real pages are re-opened at each checkpoint and their errors were moved to R.uiErrs without the stack / buổi / save (robot10.js:188 → :211 printed ''). Fixed in robot10.js (test-only). Rerun (CAP 700, UIEVERY 60, Fold): `TypeError … at srkName ← rkOfFace ← pServ ← relMSFace ← relPerson @ năm 6 th4 t2 b2 (buổi #890)` + repro save.
Cause: the hòa-thân road men (jrd_bd «mbd_*», jrd_pt «mpt_*», role «Sứ thần», added to S.men) failed every DISPLAY «is a man» test, which only knew ids m<digits> (relMan). The Giao tình person picker drew the envoy as a SERVANT → srkName → SRK["Sứ thần"] undefined → TypeError (every checkpoint, both devices), and filed him under «Cung nhân».
Fix (one shared predicate, law 11): j9 relManP(p) = relMan(p) OR a road man id /^m[a-z]+_/ that is in S.men. Used at every display site: jhc relMSFace (face), jhc relPerson (row: name + «Sứ thần» rank chip), jhc whoL (name on relation lines), jhc relGrp (group «Nam nhân»), jkrel man flag. relMan itself (relation keys / af maps) is NOT changed → saves keep their numbers. No kit part, no wording, no BAL.
Family scan dev/test/r10e-manid-scan.py (every «is a man» test by id / relMan):
| file:line | before (e75c2715) | after |
|---|---|---|
| jhc:70 whoL / :79 relPerson / :94 relMSFace / :104 relGrp / jkrel:43 | relMan or m<digits> → road man = servant (5 OPEN) | relManP |
| j9 relKey / relHk / msAff / msAffAdd / relOwner (relMan) | relation keys | kept (road man keeps his j61 key x<n> + af map) |
| j95:101 mention key, jhc:86 relMSOf | m<digits> | kept (road man resolves via his j61 key) |
| jnet:14 netSex | /^m\d/ | kept (road man has rw → «m» first) |
| jcoopask:75 | m<digits> = host menInit set, never asked | kept (road men are hers → asked: intended) |
| total | 20 sites, 5 display open | 0 open |
dev/test/r10e-roadman.js (bd_hen save, Fold 755x1000 + iPad 1180x820; every tab + the Giao tình picker):
| check | e75c2715 | 6b96055a |
|---|---|---|
| servant title asked for a non-servant (srkName) | «Sứ thần Mật Hồ Đạt» ×N | none |
| console.error | TypeError «reading '1'» at srkName | 0 |
| envoy in «Nam nhân» / not in «Cung nhân» | no (Nam nhân 4, Cung nhân 28) | yes (Nam nhân 5, Cung nhân 27) |
| result | FAIL 6 | ALL OK |
Looked (Fold + iPad, scratch shots): picker «Nam nhân 5» shows «Sứ thần Hồ Đạt» with a man's face and the same kit rank chip as the other men; nothing cut, no overflow.
Tests on 6b96055a: quickcheck run 1 FAIL perf only (buổi new runs 2790 / 924 / 4866 vs live 1346 / 1029 / 1115 — one run below live: noise) → rerun --runs 5 **PASS** (render 225/214, tab 398/382, buổi 1402/1193 ms; one slow branch-side outlier 8 398 ms, the other 4 at 1 097–1 520) · core gates PASS, old save ok · tier BIG (j9 logic) → coop-keymove-unit 12/12 · hc-portrait Fold + iPad 0 FAIL · ag-all-c 1 FAIL «Dò la pays the player's cost (15 bạc)» = the SAME FAIL on the base e75c2715 (2/2 runs; pre-existing, not this branch).
Co-op: no co-op file touched (display predicates only).
SSK: SẴN SÀNG KIỂM robot10-e-fix-5 6b96055a (BIG tier by j9 logic; small diff: 5 display sites + harness).

## HANDOVER (FIXER #4 → #5, written early at ctx ~28 %; rollover line START_CTX 7 % + 25 % = 32 %)
State: review/robot10-e-fix-3 **b76ccc59** (r4, SSK; E81r reviews) · review/robot10-e-fix-5 **6b96055a** (SSK; on fix-4-r2m e75c2715, which is E83r PASS / LAND READY) · fix-2 r3 0673d1a1 and fix-4 r2 inside fix-4-r2m. Save growth step 3 (a)–(d) = FOR MAIN, do not build (§7).
Answered rows: R4 «Bỏ cuộc?» opts [] = harness, fixed in fix-2 (§12); R3 cnv_ban UI rows = MAIN map lane / landed / owned (§13); R8 bd_hen «reading '1'» = fixed in fix-5 (§15).
Known non-branch reds: coop-e2e on bare LIVE 178cac37 = 134/162 from week 0 (Q 8 dialogs) — LIVE regression; ag-all-c «Dò la pays 15 bạc» FAIL on base too; monthly-ration 2 FAIL pre-existing (§5).
Scratch (this box; recreate if gone): worktrees /home/user/wt/f4-f3 (fix-3), /home/user/wt/f4-f4 (fix-5), /home/user/wt/f4-ho (handover, sparse: CLAIMS / STATUS / this report); tools /home/user/wt/f4-tools/hopush.sh "<msg>" <edit.sh> (fresh fetch + checkout -f + edit + commit + push, retries); data /home/user/wt/f4-data (R3-018.json + R8-hen-skilled-1.json from review/robot10-saves-r5 dev/handover/robot/saves-r5/, hen-003.json = fix-5 repro save from the rerun, also in /home/user/wt/f4-out/r8b/saves/). Robot rerun: `PAR=1 LAG=0 CAP=700 UIEVERY=60 DEV=fold node dev/measure/robot10.js bd bd_hen skilled 1 <out>` on a fix-5 checkout.
Next for the successor: answer E81r on fix-3 r4 and the fix-5 reviewer if they FAIL; triage new runner files Foreman E forwards.

## 16. Re-merge after main d521656c (test-mrfoot) — Foreman E child4 order 12:51Z
| branch | = old head + main | conflicts | dev/build vs old head | own suite | coop-e2e Fold host | COOP_SWAP | quickcheck |
|---|---|---|---|---|---|---|---|
| review/robot10-e-fix-3-r2 2e7e489b | 8693dc06 (contains r4 b76ccc59) | none | identical | r10e-stock-full / saveblocked / oldsave-noloss ALL OK | 142/142 | 142/142 | PASS (render 206/223, tab 369/352, buổi 1068/1194 ms) |
| review/leave-palace-r4 9aa54fa2 | 8d93c027 | none | identical | leave-palace 135/135 | 142/142 | 141/142 (1 FAIL S.fidUsed.50 A=undefined B=consort:c27 after week 1) → reruns below | PASS (render 208/195, tab 288/371, buổi 1657/2029 ms) |
Bare main d521656c coop-e2e Fold host 142/142 (12:54Z, load 0.7) → the 11:42Z week-0 failure on 178cac37 is gone with test-mrfoot.
leave-palace-r4 COOP_SWAP reruns: 142/142, 142/142 → 1 FAIL in 3 runs (S.fidUsed.50 A=undefined B=consort:c27, «same world on both seats», after week 1). Bare main d521656c COOP_SWAP: 142/142, 142/142 (0 in 2). dev/build of r4 = 8d93c027 (unchanged by the merge), so it is not a merge effect; 1/3 vs 0/2 does not prove flake or real — the leave-palace reviewer should judge if fidUsed is on its path.

# FIXER #5 (successor) — session_01DgYSWkYxbaSjuykrs5JW4Q (FOREMAN E child6 session_01DgYSWm2QasYcAi4WDAWKaX) · depth 7
PRIORITY #1 CHECK ('robot10-e-fix|lazy TIMEOUT|Sang ngày mới|j59t|fixer #5|spyQueen|selfLoop|fix-hadoc-loop|nfX'): OD 3 | ledger 0 | claims 8 | main 15 | review/* 10 (robot-fix-cnv(-2) F night stall harness; robot10-e-fix-1 null.queen; fix-hadoc-loop LIVE; fix-2 r3 lesson filter inside fix-5-r) | archive 0.
START_CTX ≈ 4 % (1 M window; get_session reads 0) → rollover at 29 %, ceiling 60 %. LIVE = origin/main 8eceeef9.

## 17. Triage — R8 (bd_tuyet 50 lives on 14ba8768 + main harness; bd_hen 50 lives: c1/c2 on 14ba8768 + fix-2 r1, c3–c5 on 9e89619a = LIVE fd85907a + fix-2 r3)
| family (R8 rows) | verdict | owner / branch | proof |
|---|---|---|---|
| (a) lazy TIMEOUT rank 5–6: ring «spyQueen / dilemma» ×400, logs «Dò la: Thôi.» (bd_tuyet lazy-5, bd_hen c3 lazy-2 / lazy-5) | HARNESS | **E-FIX-6** (this) | robot10-in PERS.lazy takes the LAST option of every card; «Dò la» on the Hoàng hậu opens jtamco's road card (Làm như thường / Hao tâm cơ / Thuê người / **Thôi**) → «Thôi» → no time passes → sensibleStep chose spyQueen again: that option had no L label, so the 3-per-buổi ban never reached it. dev/test/r10e-selfloop.js on R8-cautious-3 (rank 6): before = TIMEOUT, after = moves on |
| (a') skilled TIMEOUT ring «lesson» ×400 (bd_hen c1 skilled-1, fix-2 r1 harness) | HARNESS, fixed | E-FIX-2 r3 0673d1a1 (inside fix-5-r) | inpage6 lessonCands now has the j2 lesson() gate artPts<100 (r10e-lesson.js ok on this branch) |
| (a'') speed TIMEOUT «Bày mưu ↔ Hạ độc / Hủy dung» ring dilemma ×400 (bd_tuyet speed-1, speed-4) | REAL, fixed LIVE | fix-hadoc-loop a8004db6 (jtamco/j70 «ROBOT-10 bug B»; not in 14ba8768, in LIVE) | no such row in c3–c5 (LIVE fd85907a base) |
| (a''') TIMEOUT «Bỏ cuộc?» opts [] over a MƯU game (bd_tuyet random-2/3/4, speed-2) | HARNESS, fixed | E-FIX-2 kcfYes (inside fix-5-r) | old main harness on the bd_tuyet run |
| (h) «forced road bd_tuyet not played» (speed-2) | HARNESS | E-FIX-6 (row text) | the life TIMEOUT'd on «Bỏ cuộc?» at buổi 0 (row a''') → never reached the road; robot10.js now says «life ended before its first buổi: TIMEOUT» instead of «road locked» |
| (b) «Sang ngày mới» stuck after load, Fold (every file) | owned | **Foreman F** review/robot-fix-cnv 1f046fb7 / robot-fix-cnv-2 f78c695c (harness: the robot did not answer the flip scene / km-reward / kitFocus / #dawn; probe dev/test/r10-night-after-load.js, real stuck 0) — not on main yet | robot-fix-cnv.md §1 F2, §3, R1 «NOT REPRODUCED» |
| (c) [fold] REAL page memory grows (c4 scholar-2: heap 64→84 MB, DOM 4.7k→31.6k over 1845 s) | owned | D robot10-lag (+ F r10-dom-census / r10-leak-path on robot-fix-cnv-2) | 1 life; bot-page mem rows = same owner |
| (d) [ipad] act tab text cut span.j59t «Cung nữ thân tín tam đẳng» (c4, 2 lives) | REAL (kit rule) → **KIT REQUEST** | kit keeper (dev/kit/KIT_REQUESTS.md 24/11 robot10 E FIXER #5) + FOR MAIN | kitFitTitle (j59.js:53) stops at the 9 px floor; nowrap + overflow hidden (j59.js:337) then clips; no kit change by the fixer |
| (e) CAP: no ending at wall cap 1800 s, ranks 3–7 (bd_tuyet 11, bd_hen ~20) | HARNESS cap (+ balance → robot10-reco) | robot10-reco (MAIN/owner) for rank reach / death age | lives alive at age 29–34, year 11–16, ~1 900–2 250 buổi; wall time = play ≈ 1 850 s of which UI checkpoints ≈ 1 000–1 200 s (buổi p50 ≈ 70 ms); endings ARE reached on the same road (deaths age 18–30, Xuất gia, ranks to Hoàng hậu). Not a game with no reachable ending |
| (f) econ card TypeError null.queen (bd_tuyet cautious-3) | REAL, fixed on branch | robot10-e-fix-1 8f97171e (LAND READY, not on main: jstip:133 still rkName(SK.sup‖queenP()) on 8eceeef9) | — |
| (g) stat out of range danh/duc/sac/tai = 101 (bd_tuyet; bd_hen c1/c2) | fixed LIVE | kframe-heir 35647d5 (j1 statSet clamp) | only the runs on 14ba8768; 0 rows in c3–c5 (LIVE fd85907a base) |
| «Sủng ±n» vs applied sung (c1/c2) | harness false positive, fixed | fix-2 r3 (R8 report: gone on r3m) | — |
| real-page TypeError «reading '1'» fold+ipad | REAL, fixed | robot10-e-fix-5-r 7876bf70 (LAND READY) | §15 |
| save→load→save drift, tab lag, buổi > 1.5 s, mspot / kmrow overlap, text over text on go tab | owned | F robot-fix-cnv (save R2) / D nc-fix-3 · D robot10-lag · MAIN Dư đồ map lane | as §1 / §13 |
| c4 lover-5 «Target page closed» | harness (runner) | — | one life, page closed by the box |

## 18. E-FIX-6 «the bot re-chooses an act it declined / that was refused» (TEST-ONLY: dev/measure + dev/test) — review/robot10-e-fix-6
Base: review/robot10-e-fix-5-r 7876bf70 (fix-2 r3 + fix-4 r2 + fix-5 harness, LAND READY) merged with LIVE origin/main 8eceeef9 (b69b0da6; conflicts only index.html/sw.js → rebuilt). Needs fix-5-r's harness (inpage6 kcfYes / lesson gate) — so it lands after / with fix-5-r.
Fix (whole family, law 11): inpage6 sensibleStep labels EVERY option from its note("key") (after __persOpts, which reads !o.L) before the 3-per-buổi ban; a label that hits the ban is counted in window.__selfLoop and robot10.js prints ONE harness row «bot re-chose an act with no progress … dropped for that buổi» with the keys (so a real refusal stays visible). robot10.js «forced road not played» says when the life ended before its first buổi.
Family scan dev/test/r10e-optlabel-scan.py (every option site in inpage6 + robot10-in / intn / instory hooks):
| site | before (fix-5-r) | after |
|---|---|---|
| inpage6:104 spyQueen | no L → never banned (OPEN) | auto label n:spyQueen |
| inpage6 charity / card / talk / lesson / selfStudy / virStudy / go | labelled | labelled |
| robot10-in:37 rival acts, intn:31, instory:63/68/71 | labelled | labelled |
| any future unlabelled option | OPEN | auto label |
| open sites | 1 | 0 |
Proof dev/test/r10e-selfloop.js (R8-cautious-3, rank 6, lazy persona, 450 sensible steps):
| check | before (fix-5-r inpage6) | after |
|---|---|---|
| road cards opened | 201 | 123 |
| result | TIMEOUT | no TIMEOUT, clock moved |
| selfLoop | — | spyQueen ×40 buổi |
| test | FAIL | ok |
r10e-lesson.js (fix-2 r3 proof) on this branch: ok.
