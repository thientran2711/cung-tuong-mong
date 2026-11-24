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
