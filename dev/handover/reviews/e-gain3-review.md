# E-GAIN3 review — REVIEWER E-GAIN3-RV (27/11)

**VERDICT: PASS** (tier SMALL, text only) — review/e-gain3 **23b44074** (diff vs main 4cd3f974: j10, j15, j83, jactj4, jdf, jdoor wording + dev/test/gain-empty.js + report). No rule or number change found.
One residual (not caused by this diff, not a FAIL): a 4th empty «Dò la» option card, see §3.

## 1. Truth of the new Được text (law 3) and numbers (law 4)
Read against code on review/e-gain3:
- Tiến cử (j15) «công lao +BAL.ag.par3.house.merit» = j14 recommend → servMerit(s, BAL.ag.par3.house.merit). TRUE, number from BAL.
- Chưởng sự tra xét (j15) «chứng cứ balSg(BAL.eff.j14.evSearchMaids)» + «nghe ra chuyện đối thực» = j14 searchMaids (spy found → evA evSearchMaids; else knowDT). TRUE, BAL number, both branches.
- Cài người vào cung khác (j15) «người của ngươi vào một cung khác làm tai mắt» = PEND.plantsv thành line (j10). TRUE, no number typed.
- Mua đồ: door line reuses ONE const ILL_SHOP_X (also the public road's row) + illWayLine of the other roads via doorGain. TRUE, one text.
- Doors Hãm hại / Hạ uy thế / Tố cáo / Dò la / Ra uy / Mặc cả chứng cứ / Lấy của / Hại hoàng tự and Học: Được = first gain of each way's OWN line through kitParse (doorGain). Seen live on the built page (toi state): Dò la «Sai cung nữ thân tín lấy lòng · chứng cứ + · moi được mưu kế …», Hạ uy thế «Danh nàng ta −−− · 2 tuần không được lật thẻ · Sủng −−−», Tố cáo «Danh ++ · nàng bị quở … · bị phế hoặc giáng», Hãm hại «áo loang vết trà … · Sắc giảm 5–16 trong 1–4 tuần · bị hủy dung». All are the ways' own printed gains; bands/ranges come from the way line (BAL), nothing typed by doorGain.
- Lập phe / Mời (j10 facHTML): «được: lập phe với X … (nếu nàng nhận lời)» / «X vào phe ta (nếu nàng nhận lời)». No number. The «có phe thì được che chở» half is generic wording, not checked against a specific effect — minor.
- Typed numbers: grep of the diff found none (every figure is a BAL read or a way line). No FAIL.

## 2. Law 9 (kit first)
- doorGain (jdoor.js) is ONE shared helper (window.doorGain); every door caller (jdf rows, jactj4 j4Gain, j83 Mua đồ, Học door) calls it — no per-card copies.
- It parses with kitParse and reads .kr-duoc/.kr-thanh .ef; output is the kit's own span.g (green). KA_NOTHING / KA_RISK reused, not redefined.
- jopic.js kitOptFinal: untouched (not in the diff).
- No private chip/row styling: the diff adds no CSS and no class beyond the kit's g span. Visible in the shots: the kit «Được» row, green.

## 3. dev/test/gain-empty.js (built with assemble.py on this branch)
| run | cards | empty (distinct) | page errors |
|---|---|---|---|
| Fold 755x1000, 6 states | 1778 | 4: Hạ uy thế, Khiêu khích, Ra uy (cao, the 3 known) + **Dò la** | 0 |
| iPad 1180x820, 6 states | 1552 | 4: same 3 known + **Dò la** | 0 |
| main, state con only (isolated) | 208 | 11 (before) | 0 |
| e-gain3, state con only (isolated) | 403 | 1 (Hạ uy thế) | 0 |
| MUTANT=1 (doorGain blanked), toi | 358 | 7: Hãm hại, Hạ uy thế, Hại hoàng tự, Học, Mua đồ, Thưởng phạt, Tố cáo → **exit 1 = FAIL, as required** | 0 |

- The 3 known empties (cao pop-up: Khiêu khích / Hạ uy thế / Ra uy) are as briefed; the successor worker handles them.
- **Residual, 4th empty «Dò la»** (an OPTION card, class «opt ka kart», «Tốn 1 khắc», in a place-person dialog, e.g. Fold con:place:kn#1 / r4#0 / r4#1; iPad hau:home#1). It does NOT appear in isolated con runs of main or e-gain3, only in the full 6-state run (card order/state dependent), and the diff does not touch the Dò la / spy option card, so it looks pre-existing and was missed by the worker's own run (their full run showed only 3). Not a FAIL here (door cards are all fixed); hand to the successor with the 3 known: «Dò la» option under a place-person dialog, kit Được empty.

## 4. Census «Biếu quà ×16»
Not re-run card by card. Spot-check: Biếu quà cards already print «Thành: … +giftAf» (no empty Biếu quà in any of the full runs above). Accepted.

## 5. Regression
- charge-smoke.js (old-save spread, punishment): PASS, 0 page errors.
- odds-one-row.js (390x844): PASS.
- shown-odds.test.js: exit 1 «0/16 shown==rolled» on e-gain3 and «0/14» on main (same harness result on main → pre-existing, not from this diff).
- odds-no-unknown.js: output byte-identical between main and e-gain3 (exit 1 on both: guardrumour line≠, setup errors) → pre-existing.
- gain-empty full walks open every card and every option of its dialog: 0 page errors on Fold + iPad.
- Not run: act-audit smoke (own harness, slow), caoly-oldsave/evtruth-oldsave. gain-empty reuses the act-audit LIB (deser of a saved state, all surfaces), which exercises the same load path.

## 6. Shots (scratch only, not in git)
Fold 755x1000 (Mưu kế group: Dò la, Hạ uy thế, Tố cáo) and iPad 1180x820 (Hại người group: Hãm hại): kit «Được» row in green bullets, no overflow (scrollWidth ≤ clientWidth on every door button, probe `ov:false`), no clipping; the long Hãm hại gain wraps inside the card.

## 7. Result
PASS, SMALL. Follow-up for the successor: the 3 «cao» empties + the «Dò la» option card (§3).
