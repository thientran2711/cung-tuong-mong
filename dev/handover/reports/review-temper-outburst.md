# REVIEW — review/temper-outburst 394e6ea6 (BIG tier, seat T1) — VERDICT: FAIL (3 blocking, all small)

PRIORITY #1 CHECK: OD 25/11 ~05:45Z (1) + ~08:05Z read verbatim | main 9f72524b jemoact.js eaMeOut/eaPick/R_/BAL.ea, jfeel.js feelActTick/feelDo/BAL.feel.act, jbal2.js BAL.pm.val | review/temper-outburst 394e6ea6 (base = origin/main 9f72524b, LIVE has not moved) | claims D ROOT seat T1 (worker session_01D3E3NZEbGABqJK79fgHJ5q). Rules read: START_CORE (18 laws), START_WORKER, START_REVIEWER, brief D-temper-robot-0725 COMMON + SEAT T1, temper-design.md, temper-outburst.md.

Reviewer: session_01D3E3Nb7G3pi5N3uqUqqmAn, 25/11.

## Gates run (all on the branch, rebuilt by the reviewer: the branch had NO own build — index.html/sw.js unchanged vs main; local rebuild commit 86692a9d, not pushed)
| Gate | Result |
|---|---|
| dev/measure/temper-equal.js | PASS — 36 rows within 10 ± 8 bạc (ref + live palace), gain on every option, 330 temper × feeling cells: 0 under 3 options, 0 spread fail, 0 page errors |
| dev/test/temper-outburst.js real taps, Fold 755x1000@2 + iPad 1180x820@2 | PASS — hot / timid / jfeel / npc / cap / old all ok, 0 errors, 0 dead taps |
| shots (looked at 3×: 755x1000-hot/-timid/-jfeel, 1180x820-hot/-timid/-jfeel) | kit event frame «Lòng không giữ được», 4 option rows Tốn / Được / Mất / Gợi ý, odds meter + word, no «Tiếp tục»/«Nhịn», no overflow, no cut text («Kéo xuống» hint on Fold as everywhere). Kit-first OK, no private CSS. |
| dev/test/emotion-acts.js @Fold, branch vs main | branch FAIL 5 (gian, vui, scoldlive, hit, lock) vs main FAIL 7 (same + gen + one more); branch ⊂ main, no regression. NOTE: the worker's report says 4 pre-existing fails — `lock` also fails on main (event drawn differs), record it as pre-existing too. |
| dev/test/one-core-guard.js | PASS (fails 0) |
| dev/test/oldsave-r1.js (old = main build) | 16/16 |
| dev/test/coop-e2e.js | 142/142 |
| bash dev/tools/quickcheck.sh (on 86692a9d) | PASS · open 2013 ms · old save ok · perf new/live render 286/278, tab 661/525, buổi 1563/1498 · core gates PASS |

## Laws
- Law 1 two-way: PASS — NPC consorts pick from the same eaOpts list (eaPick + jfeel feelActTick, npc parity 100%).
- Law 2 equal value: PASS by the measure, BUT see F2 (one option's real cost is not the priced one).
- Law 3 gain + loss: PASS (vent on every option; joy rows carry a stat gain).
- Law 4 BAL only: PASS (BAL.ea.pick, BAL.pm.val + loy/duc/th/hh/sung/tai/ghen; one-core guard green).
- Law 7 odds in words: PASS (cấm túc roll shows «Mong manh»; meter words from BAL.odds).
- Law 9 kit first: PASS (existing event frame + option rows, fx → Tốn/Được/Mất, x → hint).
- VANPHONG: FAIL on F1 (signs).

## FINDINGS — blocking (fix the whole family, LUẬT SỬA CẢ NHÓM)
F1. WRONG SIGN on others' rising stats in the option text (`eaOptX`, jemoact.js: every L entry is printed `${label} −${n}`). Shown today (start palace): «Giang Diệu Hoa oán ngươi −10» (Mắng cung nữ cung khác, Kể xấu), «… oán ngươi −3» (Châm chọc, Nói móc), «kẻ ganh ghen −6» (Khoe khoang, Chủ động mời), «−5» (Khoe tài). The applied change is + (oanAdd / ghenAll; eaDo's own result line says «oán ngươi +10»). Shown ≠ applied, and it reads as a GOOD thing. Fix: a loss that RAISES someone's Oán / ghen prints «+n»; scan every L label of eaPx (both jemoact and jfeel rows) and add a before/after table.
F2. «Mắng cung nữ cung khác» (k khac) is priced and labelled «X oán ngươi +10», but when X outranks the doer eaDo takes the other branch: for her → «X sẽ đến hỏi tội» (no Oán), for an NPC → Oán hiOan 20 + punish when queen / punRk. The option shows a cost that is not the one applied (law 2 + "the number shown is the number applied"). Fix: eaPx `khac` follows the same `hi` branch as eaDo (hỏi tội line for her; hiOan + cấm-túc word for NPC pricing), keep net inside 10 ± 8 (temper-equal.js rerun).
F3. Harshness order broken by the re-tune: «Đánh cung nữ» now costs the maid Lòng −4 (and Danh 0) while «Mắng cung nữ» costs −5; the hint still says «mang tiếng ác». Beating must hurt the victim at least as much as scolding (law 6 real world; owner ~05:45Z «hại người … chắc chắn là mình mất thiện cảm»). Fix: restore a harsher victim cost for Đánh (≥ Mắng) and balance it with the design's own gain for Đánh (temper-design (b): servants fear her — her staff do not leak her secrets for a few tuần, BAL key) or a Danh cost that matches «mang tiếng ác»; rerun temper-equal.js. Check the same order in the jfeel twins (caugat vs mang).

## Non-blocking
N1. Push the branch WITH its own build (python3 dev/build/assemble.py && bash dev/site/build_site.sh, commit index.html + sw.js) — quickcheck step 1 needs it.
N2. temper-outburst.js `hot` case: mood −80 → −1 after a vent of 15 (the fresh state recomputes the bar), so `s1.mood>s0.mood` proves little; assert the vent the way the jfeel case does (−71 → −56 = pick.vent).
N3. Soát tẩm cung lands at net 2 in a small palace (edge of tol); fine by the measure, watch it when T2 adds witnesses.

## G4 (robot arms) — needed for PASS?
Not for this PASS. The guarantee is in code (BAL.ea.pick.cap danh 6 / duc 3 / hh 8 per 36 tuần + one Phạm thượng per 36 tuần; Sủng/Thái hậu never an outburst cost), it is the same for every temper and NPC, and the runb TIMEOUT at turn 0 also happens on main 9f72524b (harness fault, not this branch). The arms (temper-hh.js / intemper.js) must be run on review/robot-realtap once its port lands and before T2 (perception) goes live, since T2 is what makes temper change who likes her.

## Next
Worker fixes F1–F3 (+ N1, N2) on review/temper-outburst, reruns temper-equal.js + temper-outburst.js (Fold + iPad) and reports READY; re-review is a short delta check of eaOptX / eaPx / BAL.ea.fx + the two scripts.
Scratch shots: /home/user/wt/rv-temper-shots (outside git; deleted with this verdict).
