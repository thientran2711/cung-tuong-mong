# REVIEW — review/temper-perception 3119cf02 (T2/T2b, design rows #4 + #5) — VERDICT: FAIL (2 blocking)

PRIORITY #1 CHECK: OD 25/11 ~05:45Z + ~08:05Z (Option A) read verbatim | reports/temper-perception.md (f18a2b25) + temper-design.md (c)(d) | main 9f72524b jtrong DEED/trongMul, j95 motiveOK, jagknow, jmoodknow, jmem; review/temper-outburst 6b85187e (PASS r2) | claims T2 → T2b → T2c (D). Rules: START_CORE (18 laws), START_WORKER, START_REVIEWER.

Reviewer: session_01D3E3Nb7G3pi5N3uqUqqmAn, 25/11. Reviewer branch: **review/temper-perception-rv 3598bce8** = 3119cf02 + merge of review/temper-outburst 6b85187e (as the brief orders: T2 sits on T1). Only conflict: jemoact.js eaDo — kept T2's wrapper (`tpAt` snapshot when the deed starts → `tpOut` after) around T1's body, renamed `eaDo0`; every T1 caller (eaMeChoose, jfeel feelDo `window.eaDo`) goes through the wrapper. Rebuilt. (Branch head fa9d8925 = WIP measure files only, not reviewed.)

## Gates on 3598bce8 (T1 + T2 together)
| Gate | Result |
|---|---|
| dev/test/temper-perception.js REAL TAPS Fold 755x1000@2 + iPad 1180x820@2 | 7/7 PASS both (gateNo, gateYes, eaHook, math, label, npcMood, oldsave), 0 dead, 0 errors. Shots looked at: Fold gateNo — greyed «Khiêu khích» + kit pop «chưa có cớ»; iPad label — «TÍNH NẾT chưa rõ · xem ta: Khẩu xà tâm Phật» on the kit row, DẠO NÀY «Người chứng kiến: …» |
| dev/test/temper-outburst.js real taps Fold + iPad (T1 on the merged build) | PASS both |
| dev/measure/temper-equal.js | 36 rows fail 0, 330 cells ok |
| dev/test/one-core-guard.js | PASS |
| dev/test/coop-e2e.js | 142/142 ×2 (one earlier run 141/146 while quickcheck ran on the same CPUs; live Worker; not kept) |
| quickcheck | run 1 FAIL perf only (longTaskMax 4394 vs live 2586, limit 4138) while coop-e2e shared the CPUs; run 2 alone: PASS · open 2205 ms · old save ok · perf new/live render 311/279, tab 602/635, buổi 1776/1594 · core gates PASS |

## Laws
- Law 1: one rule tpDeed for her and every doer; her Khiêu khích / Trút giận / Hạ nhục pass the same motiveOK gate (Option A, OD ~08:05Z) ✓. The mood term changes EVERY NPC's hostile gate → B2.
- Law 3 / 4: all numbers in BAL.tp (base, trọng steps, caps th 6 / hh 8 / Sủng 4 per 36 tuần, hiCap 2) ✓; one-core green.
- Law 6(a): only eye-witnesses (the ONE roster at that khắc, snapshot at the deed's start — T2b fix B1) and real gossip / tellers judge ✓.
- Law 7 / VANPHONG: words «chưa có cớ», «cớ: oán N · …», labels «Khẩu xà tâm Phật» / «Hung hăng độc địa», «xem ta:» — wording row #6 still waits on CO-NGU (N1).
- Kit: kit pop + kit tap-word row; no private CSS ✓.

## FINDINGS — blocking
B1. HALF OF THE OUTBURST OPTIONS ARE NEVER JUDGED (LAW 11, design (c) «every kind of person»). tpOut judges only `BAL.tp.base[r.k]`. On the merged build, consort reactions judged: dapdo, mang, danh, khac, pham, khoc, cham (+noimoc via use), tui, thuong, khoe, tiec. NOT judged although they hurt someone in front of people: **kexau** (Kể xấu tình địch — the design's «ke», Tín −), **caugat** (Cáu gắt với người hầu ≈ mang), **treo** (Bày trò trêu người — the rival or the staff), **bove** (Không tiếp, bỏ về — a snub), **khoetai** (Khoe tài ≈ khoe), **soat** (Lục soát tẩm cung — every servant suspected). And no harmful outburst of the other kinds is judged (Hoàng thượng noi, Thái hậu quo, servants cai, men mcai, court qgian, children kquay …), while the rule says every doer. Fix: a base + DEED tag row for every harmful (and the kind) reaction of R_ + BAL.feel.act, or map them to the existing deed (kexau→ke, caugat→mang, khoetai→khoe …), whole table; a scan that lists every EA_REACT / feel act key with judged yes/no (before/after table).
B2. NPC MOOD-TERM RATE NOT MEASURED. BAL.tp.moodM +10 enters motiveOK for EVERY NPC hostile act (rumor, spy, trip, frame, poison …), not only hers; ROOT D ordered the rate check (law 1, never let NPC harm flood); the T2b handover says it is not done (early one-tuần sample: 275 calls, 11 pass, 1 owed to mood). Required before land: gate pass rate and NPC harm deeds per year with moodM 10 vs 0 (a few real-tap lives per arm, robot-rt.js like T1's temper-hh-rt.js), tune moodM if NPC harms rise noticeably.

## Non-blocking
N1. Wording row #6 not agreed (CO-NGU unreachable): «xem ta:» vs «xem ngươi:», the two labels, the «cớ:» line. D routes; the PASS of row #6 is separate.
N2. Her harm acts (Hại nhỏ / Hại nặng / Sát hại, rumours) still skip the reason gate («người chơi tự chọn») while NPCs need a motive for the same kinds (H95). The owner ruled gây sự only (OD ~08:05Z); D / MAIN decide whether law 1 carries it to harms — do not re-ask her what she ruled.
N3. Sổ: «Người chứng kiến: Tăng Trầm Bích -1.» is glued to the END of the line before (the farewell of a visit) instead of to the «Khiêu khích» line it belongs to (temper-perception.json gateYes logs). Attach it to the deed's own line.
N4. HOST gate matches her cards by name («Khiêu khích», «Trút giận», «Hạ nhục»); a renamed card escapes the gate — key it by the card id.

## Verdict
FAIL — B1, B2. Build on review/temper-perception-rv 3598bce8 (already holds T1). Round 2 = delta + the judged-yes/no scan + the mood-rate numbers + temper-perception.js / temper-outburst.js Fold+iPad + quickcheck.

## ROUND 2 — review/temper-perception-rv ab5d65ee (T1b → T1c; B2 = T2c) — VERDICT: FAIL (2 blocking)
Reviewer RV3 (successor of session_01D3E3Nb7G3pi5N3uqUqqmAn), 25/11 ~11:40Z.
PRIORITY #1 CHECK: OD 25/11 ~05:45Z + ~08:05Z «Bộc phát theo tính cách» | main 9f72524b (ancestor of ab5d65ee ✓) | review/temper-outburst now c02602fb (dc1eb6cb + c02602fb = G4 measure-only commits after 6b85187e, not in this branch; not needed for land) | review/temper-perception-rv ab5d65ee base 3598bce8 | claims D: T1c (fixes) / T2c (B2). Rules read: START_CORE (18 laws), START_WORKER, START_REVIEWER, temper-design (c)(d), round 1 above, worker ROUND 2 report.

### Gates (rerun by RV3 on ab5d65ee, own build)
| Gate | Result |
|---|---|
| quickcheck.sh ALONE (nothing else on the CPUs) | **PASS** · open 2423 ms · old save ok · perf new/live render 246/315, tab 648/651, buổi 1694/1625, tasks>200 25/28 · core gates PASS · own build ✓ |
| temper-perception.js REAL TAPS Fold 755x1000@2 + iPad 1180x820@2 | 7/7 both, dead 0, errors 0. Shots looked at (gateYes/gateNo/label both devices): kit stage + kit pop, no overflow |
| temper-outburst.js real taps Fold + iPad | PASS both (hot/timid/jfeel/npc/cap/old, dead 0, errs 0) |
| temper-equal.js / temper-signs.js | 36 rows fail 0, 330 cells / 17 rows wrong 0 |
| one-core-guard.js | PASS (fails 0) |
| coop-e2e.js (live Worker) | 142/142 first run |
| temper-judged.js (worker scan) | 66 rows · not judged 0 — **but see B1-R: the scan's «judged» count is false** |
| N3 | ✓ «Khiêu khích: thành. Danh 33 → 34. Người chứng kiến: Vu Thanh Từ -1 · Mạnh Hàm Chương -1.» on the card's own line (Fold + iPad logs) |
| N4 | ✓ HOST keyed by `tw` (j2 talk cards + jtwoway twOpts) |

### FINDINGS — blocking
**B1-R. For servants, men, ministers, nữ quan and children NOTHING IS JUDGED (law 1 / law 11; round 1 B1 not met for 5 of 8 kinds).** `dev/build/jtperc.js:55` `tpP(k)` resolves an «x…» key with `relMSOf(...)`, but `relMSOf` is declared INSIDE jhc.js's IIFE (`dev/build/jhc.js:10` opens `(function(){`, `:86` defines it, never exported) → in the page `typeof relMSOf==="undefined"`, the try/catch swallows the ReferenceError → `tpP` = null for every relMS doer → `tpJudge` (jtperc.js:105 `if(!X||…)return 0`) returns before anything; `tpUp` (jtperc.js:139 `if(!X)return`) never tells anyone either. RV3 live probe (eyes = her + 2 consorts, the same call the scan makes):
| doer | tpK | tpP(tpK) | it.j marks | tpJudge ran | state changed |
|---|---|---|---|---|---|
| Hoàng thượng (noi) | emp | ✓ | 3 | 3 | yes |
| Thái hậu (quo) | th | ✓ | 3 | 3 | yes |
| her maid (cai) | xx1 | **null** | 3 | **0** | **no** |
| another palace's servant (cai) | xs2 | **null** | 3 | **0** | **no** |
| a man (mcai) | xm0 | **null** | 3 | **0** | **no** |
| a minister (qgian) | xx28 | **null** | 3 | **0** | **no** |
| a child (kquay) | xx16 | **null** | 3 | **0** | **no** |
Same with real roster (tpAt) over 40 khắc: 40/40 «judged» marks, 0 numbers landed for maid/servant/man/minister/child. (`tpLand(O,X,d)` itself works when called directly: msAffAdd lands.) The scan is green only because it counts `Object.keys(it.j)`, which tpDeed fills BEFORE tpJudge runs (jtperc.js:124).
Fix: (1) export the resolver (`window.relMSOf=relMSOf` in jhc.js, or resolve through the already-global `window.relPerson`/`k61Ent`/`servById` in jtperc) — and note relKey already gives «x16»-style keys, so tpK makes «xx16»; check `relMSOf("x16")` returns the person; (2) temper-judged.js must count what LANDS (TP.stat.eye delta or tpJudge's return / the onlooker's thiện cảm before→after), not `it.j` keys; add a column per doer kind «numbers landed»; (3) whole group: every place that calls a jhc-closure function from outside (grep jtperc + other modules for relMSOf/relMSFace) — list in the report; (4) rerun the before/after table.

**B2. NPC mood-term rate — still not enough lives to judge.** T2c interim (11:0xZ, build 3119cf02, 1 life per arm, none finished): pass rate on (moodM 10) 29.1 % / off 21.2 % / main 11.8 %; passes owed to mood (counterfactual, same life) 26/244 = 10.7 % overall, by kind provoke 13/95, **frame 8/26 (31 %)**, bribe 3/5, rumor 2/114; NPC gây sự deeds/buổi on .149 vs off .049. n=1 per arm and different life lengths → not conclusive; T2c's fuller table ~11:30Z then final. RV3 reading so far: the within-life counterfactual (+~12 % passes overall) is the honest measure, not on-vs-off; the frame share (31 % of frame passes owed to mood) is the worry — a vu oan is a heavy harm, and her own harms skip the gate (N2), so a mood bonus on NPC frame/poison has no counterpart on her side (law 1 does not demand it there). Suggested tune for D: apply moodM only to the gây sự kinds (provoke / vent / humil / gossip-rumor), the scope the owner ruled (OD ~08:05Z), until N2 is decided; then re-measure. PASS needs the final table (≥3 finished lives per arm, or the counterfactual over ≥2 full lives) showing NPC harm deeds per year not up noticeably.

### Non-blocking
N5. Design (c) lists a DEED row `cau {Kiệm −}` (Cầu khấn khắp nơi); the build files `cau` as self-only. Defensible (it touches nobody) — D decides; if kept self, note it in temper-design.
N6. tpDeed's knowledge record writes doer `"v"+xk` → «vemp», «vth», «vx…» for non-consort doers (jtperc.js:120); harmless today (knwUp only compares to «me»/«v<id>»), but give them their own key when fixing B1-R.
N1 / N2 unchanged (D / MAIN).

### Laws
1 ✗ (B1-R: the same rule does not reach 5 kinds of doer) · 2/3 ✓ (temper-equal 0 fail) · 4 ✓ (all in BAL.tp, one-core green) · 6 ✓ (eye-witness roster / tellers only) · 7 ✓ (no new player words except existing «Người chứng kiến») · 9 ✓ (no new UI; kit pop/row) · 11 ✗ (B1-R; scan false-green).

### Verdict
**FAIL — B1-R, B2.** T1c: fix B1-R on review/temper-perception-rv (from ab5d65ee), rerun scan with «landed» column + temper-perception/outburst Fold+iPad + quickcheck alone. T2c: final B2 table (+ D's call on moodM scope). Shots in scratch only, deleted; no CDN review folder used.

### RV3 HANDOVER (rollover, 25/11 ~12:10Z) — for the round-3 reviewer
- Done: ROUND 2 above (FAIL B1-R + B2); review/temper-outburst-fix PASS 39561518 (reports/review-temper-outburst.md).
- Round 3 target: T1c's new sha on review/temper-perception-rv (from ab5d65ee), + temper-outburst-fix 39561518 merged in (D order), + D's B2 decision (moodM only for gây sự kinds provoke/vent/humil/rumor), N5 (cau {Kiệm −} per design), N6 (knowledge-record doer key).
- Verify B1-R yourself, not with the worker's scan: in the page `typeof relMSOf` / `tpP(tpK(X))===X` for her maid, another palace's servant, a man, a minister (trS().H isMin), a nữ quan, a child (allKids()[0][0]); fire `tpOut(X,{k,n},{target:null},{pl:"x",kh:0,eyes:[S,c0,c1]})` and check TP.stat.eye moves by 3 and the onlookers' thiện cảm (S.rl / S.af / c.rl / c.af) changes. My probe scripts were in scratch (gone); rebuild from that recipe. Also over ~40 khắc with the real roster (tpAt).
- Rerun: temper-judged (must count LANDED), temper-moodsrc, temper-perception.js + temper-outburst.js real taps Fold 755x1000@2 + iPad 1180x820@2 (serve the worktree with python3 -m http.server), temper-equal, temper-signs, one-core-guard, coop-e2e, quickcheck ALONE last.
- B2: PASS needs T2c's final table (≥3 finished lives per arm, moodM limited to gây sự) showing NPC harm deeds/year not noticeably up.
- Worktrees: /home/user/wt/tp (ab5d65ee), /home/user/wt/tof (39561518), /home/user/wt/ho (handover, NOT sparse, 2 GB — delete when done).

## ROUND 3 — review/temper-perception-rv 97d6ba10 (T1c; B2 = T2c) — VERDICT: PENDING B2 (everything else green)
Reviewer RV3b = session_01D3E3NYPeSt6UMJaxqBPTqC (successor of RV3), 25/11 ~12:40Z.
PRIORITY #1 CHECK: ROUND 1 + 2 + RV3 HANDOVER above | main 9f72524b ancestor of 97d6ba10 ✓ | review/temper-outburst-fix 39561518 merged (d0ae8c7d) ✓ | claims RV3b; T1c → T1d (fixer on call), T2c (B2). Rules read: START_CORE (18 laws), START_WORKER, START_REVIEWER.

### B1-R — verified BY HAND (own probe, not temper-judged.js)
`typeof relMSOf`/`window.relMSOf` = function. tpOut(X,{k,n},{target:null},{pl:"x",kh:0,eyes:[S,c0,c1]}):
| doer | tpK | tpP(tpK)===X | TP.stat.eye Δ | onlookers' aff before → after |
|---|---|---|---|---|
| her maid | xx1 | ✓ | 3 | 0,0,0 → −1,−2,−1 |
| other palace's servant | xs2 | ✓ | 3 | 0,0,0 → −1,−2,−1 |
| a man | xm0 | ✓ | 3 | 0,0,0 → −1,−2,−1 |
| a minister (trS().H isMin) | xx28 | ✓ | 3 | 0,0,0 → −1,−2,−1 |
| nữ quan (S.court.tq) | xx2 | ✓ | 3 | 0,0,0 → −1,−2,−1 |
| a child | xx16 | ✓ | 3 | 0,0,0 → −1,−2,−1 |
5 more shots accumulate (maid / man / child −1,−2,−2 → −9,−15,−15). Real roster (tpAt) over 40 khắc, judged / landed: maid 80/80 · other servant 240/238 · man 40/40 · minister 40/40 · child 240/240.
Family: every function defined inside the jhc.js IIFE and not exported, called from another module → only `sbar`, and those callers (j53/j54/j55/jagmin/jkidlife) use jtin's own global sbar (different signature); no other closure leak. ✓
N5 ✓ (cau base +1, DEED {Kiệm −1}) · N6 ✓ (tpAb: me/emp/th, v<id> consort, s<sid> servant, else kOf61).
B2 code ✓: BAL.tp.moodK = provoke/vent/humil/gossip/rumor; tpMoodM(a,kind) 0 for every other kind; motiveOK passes its kind (her = NPC, law 1).

### Gates (own build = commit except the CTM_BI build line)
| Gate | Result |
|---|---|
| temper-judged.js | 66 rows · self 26 · not judged 0 · judged but no effect 0 · helpers missing 0 · mood term outside gây sự 0 wrong |
| temper-moodsrc / temper-equal / temper-signs | wrong 0 / 36 rows fail 0, 330 cells / 17 rows wrong 0 |
| one-core-guard | PASS (fails 0) |
| temper-perception.js REAL TAPS Fold 755x1000@2 + iPad 1180x820@2 | 7/7 both, dead 0, errors 0; shots looked at (gateYes Fold: Danh 33→34, kit stage; label iPad: «TÍNH NẾT chưa rõ · xem ta: Khẩu xà tâm Phật» on the kit row) |
| temper-outburst.js real taps Fold + iPad | PASS both (hot/stale/timid/jfeel/npc/cap/old, errs 0, dead 0) |
| coop-e2e.js | 142/142 |
| quickcheck.sh ALONE | PASS · open 1974 ms · old save ok · perf new/live render 266/229, tab 645/611, buổi 2051/3570, tasks>200 27/28 · core gates PASS |

### Laws
1 ✓ (one rule reaches all 8 kinds of doer; mood term same for her and NPCs) · 2/3 ✓ · 4 ✓ (BAL.tp, one-core green) · 6 ✓ · 7 ✓ (no new player words) · 9 ✓ (no new UI) · 11 ✓ (B1-R whole group + scan counts what lands).

### Open
B2 only: T2c's final run on 97d6ba10 (3 finished lives per arm main / on / off, real-tap robot-rt, counters: gate pass % by kind, passes owed to mood, executed NPC harm acts per year by kind, gây sự deeds) — T2c ETA ~5–6 h from 12:40Z. PASS 97d6ba10 when NPC harm deeds/year are not noticeably up on vs off; else FAIL → T1d / D tune.
Shots in scratch only, deleted; no CDN review folder used.
