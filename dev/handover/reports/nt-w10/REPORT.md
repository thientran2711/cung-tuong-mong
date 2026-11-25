# SEAT W10 (successor of W9, 25/11) — review/net-ghen-2 @ b8795da6 — SSK
PRIORITY #1 CHECK: OD net-ghen / LAW 11 wave 2 (FOREMAN_D_STATUS) | main none (not landed) | review/net-ghen-2 e6c88875 (W5–W9) + review/net-ghen-r1 de69f206 (RV4) | claims W10 (CLAIMS.md by D). Reused: relshow-scan + relshow-bal.js, nt-w8 rc-scan/rc-sum/rt tools, act-audit AA.scen.

Commits: 4586780a (merge de69f206), 17b66c20 (relshow-scan gate fix), b8795da6 (site rebuilt).

## R3 — de69f206 merged
review/net-ghen-2 did NOT carry it (merge-base 6d7d2da9). Merged (index.html/sw.js conflict → ours, then rebuilt): jration.js:190 now `ghenUp(v,T.ghen,…)`; the built index.html has it (b8795da6).

## R1 — relshow-scan «RAW 29»: a measurement fault, not code
- Cause: relshow-scan reads the sign of every `balSg(BAL.x)` from dev/test/relshow-bal.json (gitignored; built by `node dev/test/relshow-bal.js <abs dev/index.html> dev/test/relshow-bal.json`). W9's box never built it → sign 0 → every BAL-path FALL landed in RAW. W5–W8 had the file on their own boxes, so they measured 0. Nothing in the scan or the sites changed.
- Proof: with the dump built, RAW 0 (oán NEG 13→16, aff NEG 131→168). All 29 sites print falls: BAL values −2…−25 (j24 go_2 −5, go_4 −6, go_8 −3; j25 go_2 −3; j30 f −10; j55 tdProbe −8; j68e ok −5; cv.ngAff.cold −10; j70 ok_3 −3; j71 go_4 −3, ok −2; j72 fn_8 −6, fn_10 −12; j8 f −8, f_6 −20, judge −10, giveTo −25; j78 f −15, f_2 −10, f_3 −5; j9 run_8 −15; jaudit run −3; jpoison found −15; cv.tsBorrow.cost −2; jtsb go_10 −5, go_13 −3). j28 oanAdd/affAdd scale only n>0 → shown == applied.
RAW before/after (relshow-scan on the same source, 17b66c20; only change = dev/test/relshow-bal.json present):
| kind | class | without dump (W9) | with fresh dump (W10) |
|---|---|---|---|
| oán | NEG | 13 | 16 |
| oán | WIRED | 79 | 78 |
| oán | RAW | 2 | 0 |
| thiện cảm | NEG | 131 | 168 |
| thiện cảm | LOY / DIRECT / TH | 15 / 66 / 16 | 14 / 59 / 14 |
| thiện cảm | RAW | 27 | 0 |
| total sites | | 599 | 599 |
(The 29 RAW move to NEG; the small LOY/DIRECT/TH/WIRED moves are sites whose BAL sign is negative and now classify as NEG first.)
- So the 29 were NOT wired through pvQuy (it would print the same number; told Foreman D in an interim message). Instead the gate is fixed so it cannot lie again: relshow-scan exits 1 with the build command when the dump is missing or older than dev/index.html.

## R2 — kit request
Present in dev/kit/KIT_REQUESTS.md (W9: «KIT REQUEST (25/11 W9 …) result card rows for OTHER people's stats and lost servants», line 263; K-EF-REL note line 255). Not hand-built. KNOWN, WAITING ON KIT.

## Gates on b8795da6
| gate | result |
|---|---|
| build (build_site.sh + assemble) | OK |
| one-core-guard / -text / -text-rule / -bind | PASS ×4 (bind 1524 prints, 0 mismatches) |
| c6-cancel-scan | 0 cards |
| relshow-scan --fail-raw (fresh dump) | PASS, RAW 0 (exit 0) |
| relshow-rt | PASS |
| net-build | PASS 203/203 |
| rc-scan dau,hau + rc-sum | 594 runs, 332 cards, 0 page errors; NOT named 36 (below) |
| two-way-oldsave (old = origin/main 9f72524b) | exit 0, 0 page errors, talk list builds; loop stays at turn 0 (why below) |
| quickcheck ALONE | PASS 735 s (core gates, time-spill, open 2456 ms, old save ok, perf new/live render 279/320, buổi 1320/1704) |
| coop-e2e (fresh assemble, alone) | 142/142 on the first run (no re-run needed) |
| real taps Fold 755x1000 + iPad 1180x820 (IPT) | 0 page errors; see below |

rc-scan NOT named 36 = only the known residuals: (a) «Đổi người» servant leaves — servant af 14 + loyal 14 (= the kit request); (b) familiarity on Thỉnh an Hoàng hậu arrival kn.r1/r3/r4 + Múa kn.x21 (5); (c) Múa LOSE S.sung 8→5 ×2, Múa LOSE Bạc 200→215 (stipend landing in the act, 1). consort ev / oán / aff / ghen / myaff, court af, her maid: 0 not named. «consort evon»: 0 changes occurred in this run (cannot confirm W9's evOn row by scan; same as W9).

two-way-oldsave turn 0: S.turn counts MONTHS (monthTick). The loop clears only Q and S.mg; in week 2 the «Kính sự phòng» card (her thẻ bài night choice) stays pending, so endTurn returns every call (checked: 30 calls, tuần stuck at 1, card «Kính sự phòng» each time). Tool limit, not a game fault; the load + 0 page errors part is valid.

Real taps (shots looked at, kept in scratch, not uploaded):
- Fold: Hậu cung → Hoàng hậu → Hại nhỏ → Tung tin đồn: both options «Danh nàng ta −8 · tin cậy Cung nữ … +3» fit; Giao cho người làm → life warning → Bày mưu: «Ra tay ngay» shows the act card (Tốn không tốn bạc / Được Danh nàng ta −8 · tin cậy … +3) ✔ (W9 fix). Visitor Hỏi han sức khỏe → result card «Được: Đáp ứng …: thiện cảm +1 · đã chuyện trò 2 lần …» readable ✔.
- iPad: same rumor flow → Bày mưu dialog: Ra tay ngay true numbers, bày mưu rows Mất «mất một chứng cứ, mất lòng người» ✔. Result after Ra tay ngay: «ta không được gì, cũng không mất gì» while the deed resolves later (= N4 / NB-a known) and the sentence carries the NEXT event «Tần … sai người sang thách đấu ngươi» (= W9 residual f, seen again).
- Fold night after my test setup would not advance («Sang ngày mới», S.tonight="me"): my harness had removed overlays by hand; not reproduced in quickcheck/coop-e2e (both play buổi/weeks). Not counted as a game fault; next seat may re-tap from a clean start.
- NOT tapped this seat: Tát, Phạt quỳ, Ngáng chân, Bỏ phấn lạ, Ban thưởng, gift, elder Hỏi chuyện/Biếu, court Biếu (W9's list; W10 changed no card).

## Open for Foreman D
Kit request (R2) for MAIN/kit keeper; residuals a (= kit request), b, c, f; N4 «ta không được gì» on dispatch (same kit request family); N1/N2/N3/N5/N6 from RV4 untouched by this seat.

## HANDOVER
None needed (SSK). If FAIL: worktree recipe in nt-w9 §HANDOVER; before relshow-scan run `python3 dev/build/assemble.py && node dev/test/relshow-bal.js $PWD/dev/index.html dev/test/relshow-bal.json`.

---
# ROUND 2 (Foreman D depth 4 order 15:10Z: fold RV4 N1/N2/N3/N5) — review/net-ghen-2 @ d0bdb6dc — SSK
PRIORITY #1 CHECK: OD net-ghen LAW 11 wave 2 | main none | review/net-ghen-2 b8795da6 | claims W10. Reused: j1 ghenUp, jaudit pvOanAny, dev/measure nt-run/nt-sum/nt-norm.
Commits: 02b218e1 (N2/N3/N5), d0bdb6dc (site rebuilt).

## Changes
- N2 jshelf.js shelfReact: the two direct `obs.ghen=…` raises (her lavish shelf seen; her ngự ban items seen) and their NPC `oanAdd(obs,t,n*ghenOanK)` twins now go through ONE call `ghenUp(obs,n,why,t)`: t = her → obs.ghen +n + Chạnh lòng feeling (new: the feeling); t = an NPC → oán toward t × BAL.net.ghenOanK + feeling (same amount as before). Reasons «thấy ngươi/‹tên› bày đồ xa hoa», «… bày đồ ngự ban». In-page check: ghen 14→18 (+2 +2, same numbers as before), 4 ghenUp calls with the right by. Side note: a co-op seat t (t.coop) now takes ghenUp's co-op path (raise ghen) like every other ghenUp site.
- N3 jagacts3.js P3C.dance: her card keeps «phi tần ghen +N» (ghenAll = their ghen of her); an NPC dancer's option text is now `pvOanAny(ghenN(BAL.ghen.dance)×BAL.net.ghenOanK,"phi tần oán nàng ta")` → «phi tần oán nàng ta +1 đến +4» (what ghenUp applies; numbers from BAL, range per unknown nết). relshow-scan: oán WIRED 78→79, RAW 0.
- N5 jbal2.js comment «42 %» → «59 % … (RV4 robot on 96c2859e: 15168 of 25898 ghenUp gain)».
- N4 (kit wait) and N6 (kit keeper) not touched, per order.

## N1 robot (nt-run sens, 900 s per slot, 4 slots in parallel × 3 rounds = 12 slots ALONE; nt-sum / nt-norm). No BAL tuned.
| build | slots | weeks | ghen p50/p90 NPC→her | NPC→her band-3 | NPC→NPC band-3 | all band-3 | proud÷gentle |
|---|---|---|---|---|---|---|---|
| RV4 de69f206 (6 slots) | 6 | 1395 | 14/96 | 11.2 % | 40.5 % | 25.6 % | 2.13 |
| W10 d0bdb6dc | 12 | 786 | 72/96 | 150/944 = 15.9 % | 194/464 = 41.8 % | 344/1408 = 24.4 % | 2.05 |
| A/B control b8795da6 (pre-N2/N3) | 4 | 213 | 81/96 | 25/234 = 10.7 % | 110/224 = 49.1 % | 135/458 = 29.5 % | 4.25 (small sample) |
- Targets hold on d0bdb6dc: all band-3 ≤ 30 % ✓, proud÷gentle ≥ 2 ✓. ghenUp gain toward her: 45209, caused by her 45209 / by an NPC 0 ✓.
- CAVEAT: every slot on this box stopped early with «bot step hang >120s» / «read hang» (12/12 runs; avg 65 weeks/slot vs RV4 232). The control build b8795da6 hangs the same way (4/4), so it is the harness under 4-way load, not N2/N3. Short lives = early weeks, which is why ghen p50 reads 72–81 here vs 14 on RV4's long lives (same on the control). A reviewer wanting RV4-comparable p50 should run 3 slots, not 4.

## Gates on d0bdb6dc
| gate | result |
|---|---|
| build (build_site + assemble) | OK |
| one-core ×4 | PASS (bind 0 mismatches) |
| c6-cancel-scan | 0 cards |
| relshow-scan --fail-raw (fresh dump) | PASS RAW 0 (oán 104 sites, WIRED 79) |
| relshow-rt | PASS |
| net-build | PASS 203/203 |
| rc-scan dau,hau + rc-sum | 1003 runs, 602 cards, 0 page errors; not named 39 = residual a 26 (servant leaves), b 3 (Thỉnh an familiarity), c 10 (Múa LOSE Sủng 8→5 ×2 — her card's Bại says only «Danh −6»; Bạc 380→395 stipend landing during the act ×8). «consort evon»: 4 changes, 0 not named → W9's row confirmed. All consort families 0. |
| quickcheck ALONE | PASS 746 s (render 278/299, buổi 1714/1699) |
| coop-e2e fresh, alone | 142/142 first run |
| real taps Fold + iPad | her Múa card text read from the page on both devices: «Kèm phi tần ghen +4», unchanged ✓; a real TAP on it NOT achieved (in the act-audit 'hau' setup the dealt card sits in a hidden list; Hành sự / Tài nghệ / Học tập taps did not surface it). The NPC dancer text and jshelf have no card she sees. 0 page errors. |

Open for Foreman D: residual c is a real shown ≠ applied on her Múa card (Bại omits Sủng −3) — pre-existing, family «lose row of an act card»; kit request family for a/f; RV4 N4/N6 with the kit keeper.

---
# ROUND 3 (Foreman D depth 5, 16:43Z: fix residual c, whole family) — review/net-ghen-2 @ a5768ba8 — SSK + ROLLOVER
PRIORITY #1 CHECK: OD net-ghen LAW 11 wave 2 | main none | review/net-ghen-2 d0bdb6dc | claims W10. Reused: jstagehere actMove/ACT_PLACE, j41 accGrant/accHas, act-audit LIB.
Commits: e4d86c92 (fix + scan), a5768ba8 (site).

## Root cause (traced with call stacks)
Residual c was NOT the Múa card's own lose row. After any act card, jstagehere `actMove` walks her into the act's place (ACT_PLACE; Múa trong yến tiệc → thu = Cần Chính điện) through goTo. goTo's door rule (j2:137: Emperor there, Sủng < 40, a hidden roll fails → «bị đuổi về», apply {sung:−3}) ran on that walk although actMove had just given her the place's pass (accGrant). So a separate, unshown roll took Sủng −3 after the result card. The Bạc +15 seen with «Để ý một nam nhân áo gấm» / «Xin rút thẻ bài» / Thỉnh an Thái hậu is the ma ma quest reward (tq14 note «go»), shown by its own «Xong việc» card; not hidden.

## Fix (LAW 11 family = every stat goTo can change on an act walk)
j2 goTo thu: no chase when she holds a pass for the place (`accHas(S,k)`: an act walked her in, or a summons / Xin yết kiến let her in). A plain map walk with no pass never reaches this rule (j41 access gate stops it first; checked: plain walk Sủng unchanged, blocked by the gate). No BAL number touched.

## Scan: dev/test/actwalk-scan.js (new; every ACT_PLACE act, Emperor + every rival put at the place, rolls forced fail and pass, setter traps name the call site; exit 1 on any hidden change)
| | acts | walks | walks with a stat change not on any card | quest reward (own card) |
|---|---|---|---|---|
| before (d0bdb6dc) | 25 | 50 | 1 — Múa trong yến tiệc → thu, fail: Sủng 20→17 | 1 (Thỉnh an Thái hậu → tn, Bạc +15) |
| after (a5768ba8) | 25 | 50 | 0 | 1 (same) |
Ngự hoa viên's «gặp Hoàng thượng: Sủng +3/+1» door rule is in the family too but does not fire on an act walk in this build (scan: 0 for both vuon acts).

rc-scan check of the card: Múa lose now applies Danh −6, Sức −20, Bạc −10 (+15 quest) = card «Mất Danh −6 · Sức −20 · Bạc −10» ✓ (before: Sủng 8→5 hidden).

## Gates on a5768ba8
| gate | result |
|---|---|
| build | OK |
| one-core ×4 / c6 | PASS / 0 cards |
| relshow-scan --fail-raw | PASS RAW 0 |
| relshow-rt / net-build | PASS / PASS |
| actwalk-scan | PASS 0 (was 1) |
| rc-scan dau,hau | 780 runs, 417 cards, 0 page errors; not named 45: servant af/loyal 17/17 (= residual a, kit wait), familiarity 7, her stat 4 (all = quest Bạc +15 with its own card); Múa Sủng gone; consort families 0 |
| quickcheck ALONE | PASS 765 s |
| coop-e2e fresh alone | 142/142 first run |
| real taps | NOT done this round: a lose on the Múa card cannot be forced by real taps; the fix is in goTo (no card text changed). |

## Still open — SAME walk family, familiarity (next seat)
familiarity 7 not named: Thỉnh an Hoàng hậu → kn (kn.r1/r2/r4 None→2) = residual b, and NEW in this scan Múa / Để ý một nam nhân áo gấm → kn.x29 None→1 (a man met on arrival at thu/vuon). Same cause: people met on the act walk raise S.known AFTER the result card was built. Suggested fix (kit rows already exist: W9's KREG familiarity rows in j63): in jstagehere actMove snapshot S.known, and after goTo append the risen steps to kaLastResult (or the pending card when __actPend) through the same j63 familiarity row builder; extend actwalk-scan to S.known (its K list) and expect 0.

## HANDOVER (ROLLOVER: my context is at the roll line)
1. Worktree: sparse review/net-ghen-2 @ a5768ba8 (`/home/user/wt/w10` may be gone; recipe in nt-w9 §HANDOVER). `python3 dev/build/assemble.py`; before relshow-scan: `node dev/test/relshow-bal.js $PWD/dev/index.html dev/test/relshow-bal.json`.
2. Do the familiarity walk fix above (LAW 9: use the existing j63 KREG row, no new chip), add S.known to actwalk-scan, re-run every gate in the tables (rc-scan, quickcheck ALONE, coop-e2e alone).
3. Tools: rc-scan/rc-sum in dev/handover/reports/nt-w8/; robot: dev/measure/nt-run.js (use 3 slots, not 4 — 4-way load hangs the bot).
