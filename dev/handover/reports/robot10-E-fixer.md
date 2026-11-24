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
