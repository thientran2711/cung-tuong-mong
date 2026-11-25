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
