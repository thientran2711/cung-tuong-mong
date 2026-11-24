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
(in progress)
