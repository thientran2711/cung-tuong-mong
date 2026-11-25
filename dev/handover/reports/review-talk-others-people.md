# REVIEW — review/talk-others-people b7604887 (W2, «Hỏi lén», WORKLIST #26) — VERDICT: FAIL (3 blocking; 1 dead button fixed by the reviewer)

PRIORITY #1 CHECK: OD 24/11 ~07:58Z / ~08:08Z / ~08:12Z read verbatim (+ ~08:05Z/~08:20Z ring context) | WORKLIST_OPEN #26 (D) | main 9f72524b: no jsvt (servant-trust lives on review/d-followups-1-rv cc4fed89, LAND READY) | review/talk-others-people b7604887 = d-followups-1-rv cc4fed89 + 89fd188a + b7604887 (based ok, lands after it) | claims: D ROOT seat W → W2 session_01D3E3NYFRLosstH2Jpw3nQP. Rules: START_CORE (18 laws), START_WORKER, START_REVIEWER, brief «SEAT W», reports/worklist-9-26.md.

Reviewer: session_01D3E3Nb7G3pi5N3uqUqqmAn, 25/11. Reviewer branch: review/talk-others-people-rv (fix commit on top of b7604887).

## What the branch does
`svTalk(a,s,len)`: «Hỏi lén» = the covert talk with another house's servant: no greeting owed (no bất kính), seen less (SVT_COVERT.len, −BAL.svt.seen.covert), heavier when seen (BAL.svt.tin.len 13 / rel.len 10 vs 8 / 6), BAL.svt.kLen 3 khắc vs k 2, same gain (learn the master's nết); NPC masters choose it by nết in svtMonth (svtLenO = npc.len 30 + lenSharp 25). Buttons: j10 «Kẻ hầu cung khác» row + j15 card «Giao thiệp» group; `svtGiao` merges the jsvt talks into a named woman's existing «Giao thiệp» group and removes her elder «Hỏi chuyện».

## Gates
| Gate | Result |
|---|---|
| dev/test/servant-trust.js (on the reviewer fix) | 89/89 PASS |
| dev/measure/svt-scan.py | 68 sites, 0 UNWIRED |
| dev/test/one-core-guard.js | PASS (fails 0) |
| dev/test/coop-e2e.js | 142/142 |
| dev/test/svt-len-rt.js REAL TAPS, mid-game save (robot-rt.js slice of a real-tap life, khắc reset to 0 in the save = setup), Fold 755x1000 + iPad 1180x820 | PASS both (Fold: refused branch, iPad: talked branch); 0 dead, 0 jsClicks. Shots looked at 3× (card before / after on both devices): one «Giao thiệp» tab, one «Hỏi chuyện», «Hỏi lén · Tốn 3 khắc», kit pbtn rows, after the tap both grey with «Cần ✗ hết khắc trong ngày». |
| bash dev/tools/quickcheck.sh (on the reviewer fix 98f093b3) | PASS · open 2218 ms · old save ok · perf new/live render 279/297, tab 735/824, buổi 1627/2073 · core gates PASS |

## Laws
- Law 1 two-way: PARTLY — NPC masters hỏi lén NPC servants AND her servants (svtMonth, t===S) ✓; MISSING: on the cung-nữ road an NPC who approaches HER (PEND.svtAsk) is always the open talk (svtEtq + svTouch "talk") — never the covert one (B2).
- Law 2 equal value: OK by construction (open = 2 khắc + bất kính risk when the master stands there + normal seen odds; covert = 3 khắc, no bất kính, seen −20 pts, loss ×1.6 when seen; same gain). No measure; acceptable for this size.
- Law 3 gain + loss: OK (gain = master's nết learned; loss = Chủ tin / thiện cảm when seen, khắc).
- Law 4 BAL only: OK (BAL.svt.kLen / tin.len / rel.len / npc.len / lenSharp; one-core green).
- Law 6(b): OK (real servants of real houses; witness rule unchanged).
- Kit first: OK (pbtn in the existing group; no new part). VANPHONG: button words OK; result toast wrong (B3).

## Fixed by the reviewer (98f093b3 on review/talk-others-people-rv)
R1. DEAD BUTTON: on the j15 card «Hỏi lén» took its lock reason from `t2 = whyTime(2)`; with 2 khắc left (`can(3)` false) the reason was empty → the button looked enabled and a real tap did nothing (servAct returns on !can). Seen on the robot's real save (buổi tối, 2/4 khắc): FAIL «khắc spent 0, SVT.stat.len 0→0». Fix: `whyTime(BAL.svt.kLen)` (and `whyTime(BAL.svt.k)` for «Hỏi chuyện», one core instead of the typed 2). Family scan of every pbtn using a shared t2 in dev/build: all others cost 2 khắc in BAL (svSearch / wkGive / wkShow / artLes / kidTeach / kidCare / td / staff talk) → no other dead button. After the fix the same save shows «Hỏi lén … Cần ✗ hết khắc trong ngày». j10 already used `disabled` from can(kLen).

## FINDINGS — blocking
B1. The elder «Hỏi chuyện» drop loses a working gain (law 16: never undo a working thing). One «Hỏi chuyện» on the card is RIGHT (two same-name buttons confuse, and the #26 refusal/suspicion rule must apply to every talk with another house's people), but the dropped elder talk (jstaff servAct "hoi": her thiện cảm `st.af.me += BAL.eff.jstaff.meAct`, k61Meet acquaintance step, the palace news line `talkLine(st)`) is not carried into the jsvt talk, which only gives the master's nết. Fix: when the target is a named woman (st.eid) and she does NOT refuse, svTalk (open and lén) also runs the elder talk gain (same function, one place), so the merged button keeps every gain + the #26 effects; servant-trust case for it.
B2. Law 1: PEND.svtAsk (an NPC / NPC's servant approaches HER on the cung-nữ road) has no covert variant. Use the same svtLenO(nết) roll: a covert ask skips the greeting / bất kính on her master and uses SVT_COVERT for her master's suspicion (svTouch kind "len"), and the card line says it is a secret talk. Test in servant-trust.
B3. KẾT QUẢ after a successful «Hỏi lén» / «Hỏi chuyện» says «ta không được gì, cũng không mất gì» although she learned the master's nết (iPad shot ipad-after: DẠO NÀY «Thúy Vi chịu nói chuyện…»). D has already ordered W2 to fix this as a LAW 11 family (every knowledge gain counts as a gain in the result toast) — required before LAND; recheck in round 2.

## Non-blocking
N1. Thái hậu's household named women (Cung Thái hậu row, t:"thh") still have the plain elder «Hỏi chuyện» with no #26 refusal / suspicion effect. They are another master's people too; ask D whether #26 covers the Thái hậu's household (it reads as yes from ~08:12Z «bất kỳ một cái hành động nào»), else note it as decided out of scope.
N2. svt-len-rt.js needs a save with ≥ 3 khắc free; let it pick a buổi with room (or report «locked, correct reason» as a pass) instead of failing on a full buổi.

## Verdict
FAIL — B1, B2, B3. W2 builds on review/talk-others-people-rv 98f093b3 (has R1). Round 2 = delta check + servant-trust + svt-len-rt Fold/iPad + quickcheck. LIVE has not moved (origin/main 9f72524b); this branch lands only after d-followups-1-rv anyway.
