# charge-evidence — ONE BIG REVIEW (opus, session_01D3E3NYvhVEvTMxZjLhU7A5, depth 3, START_CTX ~4 %)

PRIORITY #1 CHECK: OD 26/11 ~05:15Z «D4 A» + ~05:35Z final find-odds row (05:20Z / 05:25Z replaced) + ~04:15Z (3) evidence per charge + ~05:55Z (vượt phẩm → NHẸ; MAIN recs applied) | FOREMAN_D_STATUS FROM MAIN 152 05:15Z + 05:35Z | main 02f564ae (LIVE, = origin/main at verdict) | review/punish-reason-rv 8351f5ab (D1 PASS, merged in) | review/charge-evidence 442bf25b (tree reviewed) | claims D1+D4 row = worker #3 session_01D3E3Na6fYWKmC7N5t9iRx5.

## VERDICT: PASS — review/charge-evidence-rv (442bf25b + reviewer fixes; origin/main 02f564ae is an ancestor → fast-forward)

## The fold «Bày mưu hại người» → «Ức hiếp quấy phá»
Accepted (law 16/17: not re-asked). The approved table A (reports/punish-reason.md) had «Bày mưu chưa thành» as a side row: «alone → 2 pieces, Có cơ, cấm túc». Ức hiếp quấy phá has the same 2 pieces and the same cấm túc, so the fold keeps that row's weight; the only change is one band easier (Vững, band 5, vs Có cơ, 4). The other half of the row («counts as 1 piece toward the charge of the planned act») is NOT the closer choice in this code: a charge's cap is max(pieces needed, deed weight) once any deed of it exists, so a plan begun would open a full Mưu hại 3/3 → lãnh cung for a poisoning that never happened (law 6a). Ức hiếp is the closest of the eight.

## Findings and what was done
| # | finding | law | fix (review/charge-evidence-rv) |
|---|---|---|---|
| 1 | «Trình Hoàng hậu» still worked on the TOTAL: the live executor is jaudit T.f → jrcv rcvJudge (her card as Hoàng hậu / an NPC queen), not the j78 act the worker gated; a proven charge spent BAL.eff.jaudit.evF of any pieces and always gave «cấm túc 1 tháng» (a proven Tư thông → cấm túc; a 1-piece Vượt phẩm → cấm túc instead of phạt bổng). Report claimed this road was by charge. | 1, 6a, D1 | jcharge wraps T.f: the proven charge's pieces are spent (CHSKIP redirect of the typed spend), the target carries chTr, and «Xét tội theo chứng cứ» (now or later on her card) runs chPunish by that charge; AI TỐ = the presenter. Card cost / gain + j78out read the charge (chPunTxt). Probe: Vượt phẩm 1/1 → phạt bổng 20, no cấm túc, vp pieces 0; NPC → her Mưu hại 3/3 → lãnh cung, pieces spent. |
| 2 | Guard «Cung chủ (Phi+) −1» used guardRk 5 = Quý phi (RANKS[4] = Phi); the in-game paragraph said «từ Phi» — text and rule disagreed; the sim labelled rank 5 «Phi». | canon 05:35Z, 4 | guardRk 4; the paragraph prints RANKS[guardRk].n; sim uses rank 4 (table numbers unchanged, now true for a real Phi). |
| 3 | Whole family: 8 deed keys written by live roads had no charge and fell to the Ức hiếp default — mlpoison (maid-line poisoning), mlframe / mlhframe (maid-line frame), mlbeat, ls (birth date off the Kính sự phòng register), cyfake (false pregnancy), cylie (false cycle report), cyforge (bribing Kính sự phòng). A maid-line poisoning was only «ức hiếp, 2 pieces, cấm túc». | 11, 6a | BAL.charge.deed: mlpoison mh · mlframe/mlhframe vo · mlbeat uh · ls/cyfake/cylie tt (table A row H «thai không khớp sổ») · cyforge mc. New scan family deed_unmapped in dev/test/charge-scan.py (every key from deedAdd / deedOnce / cyDeed / mlCaught / DEEDW / DEEDX vs the map): 442bf25b 8 → rv 0. |
| 4 | The evidence card and her notice listed the SAME line for each piece («bỏ độc vào điểm tâm của Tần ???» ×3; notice «2 món chứng:» + one line) — table A rule 4 says each piece by kind + line. | 6a, D1 (WHICH evidence) | BAL.charge.C[c].pk (kinds per charge, cổ trang); the record and the notice show «deed · kind», one line per piece («… · tang vật», «… · lời khai người hầu», «… · dấu vết nơi ra tay»). Looked at Fold + iPad. |
| 5 | Typed number in jcharge oAccuse (+15 per piece). | 4 | BAL.charge.accW. |

Known gaps carried (stated by the worker, not blocking; for Foreman D as follow-ups):
- (a) law 6c, WHOLE GAME (pre-existing family, not new here): every «tịch thu» (j8 conf, chPunish vp / đồ cấm) removes the item from the chest with no place it goes (itGone does not exist; there is no Nội vụ phủ store). Needs one store + every confiscation site routed to it — a job, not a review fix.
- (b) Mua chuộc người hầu: table A «người hầu bị đuổi» not done (the deed carries no servant id). Ức hiếp: «bồi bạc cho người bị hại» not done.
- (c) Trình Hoàng hậu card odds still add +8 per piece of the TOTAL (closure in jaudit, legacy formula); the spend and punishment are per charge.
- (d) Seen in a Fold shot, NOT this branch: the «Người bên cạnh» visitor frame drew the Hoàng hậu figure over the scene picture and text (755x1000) → kit keeper (KK) to check the visitor frame figure size.

## Laws checked
1 two-way: same functions for her and NPCs; NPC → her via Trình Hoàng hậu + Tố giác probed; Tai mắt warning (smoke). · 2/3: heavy charge = more searches, harsher; light = quick, mild. · 4: all charge numbers BAL.charge (fixed the one typed). · 5: crime base + Tâm cơ + guard. · 6a: a piece only for a real deed (old save with no deed → 0 pieces after the load sweep; with a deed → spread onto it). · 6c: see gap (a). · 7: odds words only («Tìm chứng: Tùy duyên»), no %. · 9: kit panel rows / pbtn cards, no private CSS (no CSS in the diff). · 11: charge-scan 5 families 0. · 12: Fold 755x1000 + iPad 1180x820 shots + worker videos looked at (contact sheets + last 40 s, 3 passes). · 16/17: fold judged, not re-asked. · D1: one punishment, max one rank (giang = one rank; cold = lãnh cung only).

Find odds vs canon 05:35Z: crime band ✓ · MASTER Tâm cơ vs target ±1 per tcStep 20, cap ±2 ✓ · sent servant ±1 only at extremes ✓ · Tai mắt ≥ matMid +1, ≥ matHigh +2, planted eye +1, cap +2 ✓ · guard target Phi+ −1 ✓ (after fix 2) · each miss +1 (cap 6, reset on a find) ✓ · Tai mắt warns her when searched ✓ · «Tìm chứng» paragraph on the search dialog, word on each picker card and evidence rows, «chưa đủ chứng một tội: …» on the accusation ✓.

## Tests (file:// build of review/charge-evidence-rv a749efdf)
| test | 442bf25b | rv |
|---|---|---|
| charge-smoke.js | 31/31, 0 errors | 31/31, 0 errors |
| charge-scan.py | 4 families 0 (deed_unmapped 8 with the new family) | 5 families 0 |
| charge-taps.js 755x1000 | PASS, 7 searches → Tố giác → lãnh cung | PASS, same; pieces named by kind |
| charge-taps.js 1180x820 | PASS, 8 searches → lãnh cung | PASS |
| punish-reason.js 755x1000 / 1180x820 | ALL PASS / ALL PASS | ALL PASS / ALL PASS |
| cold-faction.js | 20/20 | 20/20 |
| receiver-choice.test.js (jrcv, touched by fix 1) | – | 85 ok, 0 FAIL |
| charge-sim.js | table in charge-evidence.md | same numbers (Phi now rank 4) |
| reviewer probe (scratch) | – | guard Phi/Tần · map · Trình HH light + NPC→her cold · pieces distinct · old save no-deed / spread · save keeps evc: all PASS (no-deed case: the target's real tryst deed gave tt pieces — correct) · 0 page errors |

Shots / videos in scratch only; CDN folder img/_review/charge-evidence left for the lander.
