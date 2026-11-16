# promo-skip-r1 — report + review (main s12 reviewer, session_01UV1SzixY6z6k4yg5Fc3gvp, opus)
Branch: review/promo-skip-r1 = review/promo-skip@16a5d35 + origin/main 5e5c412 + reviewer fixes. Result: **PASS 7453911c3** (origin/main is an ancestor; fast-forward ready).

## What the worker branch does (missing worker report, written here)
Owner OD:L1222 / L1224 / L1228: long-road promotion rewards = DIRECT rank; ordinary promotion by conditions keeps the exam.
- ONE hook `promoReward(p,src)` in jexam.js, switch `PROMO_SRC`: son1 (mother's FIRST prince) direct; later son / princess = exam at once, conditions waived (exGrace); reign road winner emp / th / quyen = direct.
- Seats (j30 SEATCAP) apply: direct reward on a full seat → `promoFullSeat` = large one-off compensation (Bạc 4 × next rank's stipend, Danh, 2 ngự ban, phong hiệu or Bạc, house power), loss = lục cung ghen; rank unchanged, next rank via normal exam (no "Ân chỉ chờ phong", OD:L1228). A passed grace exam waits for a free seat.
- Every reward has a loss (`promoCost`): son1 → Hoàng hậu + other princes' mothers oán; emp → Thái hậu −, losing side oán; th → Sủng −, 2 Thái hậu errands (j72); quyen → Danh −, one strike-back after 24 months.
- j67 cnv_ma servant-arc endings that SAY "lên một bậc" now give the servant rank (`e67srvUp`, cap srvMax, fallback Công lao).
- Numbers: BAL.psk (jbal2.js). Full audit table of 20 promotion paths: dev/PROGRESS_review_promo-skip.md on the branch.

## Review against owner rules
| rule | check | result |
|---|---|---|
| OD:L1222/L1224 long road direct, first prince direct, later prince + princess exam | promo-skip.js + reign.js outcome texts | PASS |
| OD:L1228 no "Ân chỉ chờ phong"; full seat = big compensation then normal exam | promo-skip.js full-seat checks | PASS |
| OD:L1148 +1 servant per rank stays | jpromo prCheck watches S.rank (state diff), so exDirectUp / exGraceUp also trigger it; probe: rank 1→2 via exDirectUp → staff 1→3 (queued servant), capOf [2,2]; promo-rules.js «promotion → one new servant» PASS | PASS |
| OD:L1250 entry rank earned by selection exam | branch touches no entry/origin rank; all new grants are mid-life rewards. NOTE for main: j97 cnv servant-road «phá lệ» decree to Quý nhân (pre-existing, not this branch) is a maid's entry into consort ranks — main to decide if L1250 covers it | PASS (note) |
| OD:L1267 one core | new numbers all in BAL.psk; texts print the constants. FIXED: exDirectUp / exGraceUp typed `ghenAll(10)` → BAL.psk.ghen. Remaining typed numbers in birthP (ghen 15/8, Sủng/Danh gains) are pre-existing on main → whole-game one-core audit, not this branch | PASS after fix |
| LUẬT SỬA CẢ NHÓM — player text of the rule | FAIL found: 3 help texts still had the old rule (jexam gloss «Sinh hoàng tử: tấn phong ngay» for every son; j6 + jtabs «Sinh hoàng tử: được ân thi ngay»); j68i reason «mẹ có hoàng tử, dưới bậc Quý phi» wrong (cap is Hoàng quý phi, only first son). FIXED: one function `promoRuleTxt()` (reads PROMO_SRC) used by all three; j68i reason → «sinh hạ hoàng tử đầu lòng (thăng một bậc, không qua khảo hạch)» | PASS after fix |
| Kit / VANPHONG | no new UI parts (log/edict text only, kit edict + chest/reveal unchanged); no %, cổ trang wording | PASS |

## Fixes on r1 (commit b792f7b)
jbal2.js BAL.psk.ghen; jexam.js promoRuleTxt + gloss + ghen; j6.js, jtabs.js help line; j68i.js reason; dev/test/promo-skip.js +1 check (help texts read the one rule text).

## Tests (after the last merge of origin/main 5e5c412)
- dev/test/promo-skip.js 12/12 PASS (11 + new text check), 0 page errors.
- dev/test/reign.js 755x1000 PASS, 1180x820 PASS.
- dev/test/promo-rules.js 755x1000@2 + 1180x820@2: 0 FAIL. promo-next-rank.js: errors none. promo-exam.js 755x1000@2: 0 FAIL.
- Boot 755x1000@2 and 1180x820@2: title + Kính sự phòng intro render, 0 page errors, no horizontal overflow (screens looked at).

## Update 16/11 ~08:50Z (asked by main s12/s14)
- Worker final sha 7f655c55 (PROGRESS doc only: per-origin Hoàng hậu rate + cap proposal; no code) merged → review/promo-skip-r1 **c53abdec6**. HH-rate cap proposal: report only, NOT applied (balance → Foreman B).
- Full suite: every dev/test/*.js (252, non-coop) run on the branch AND on origin/main 5e5c412 with the same args (150 s each). Exit codes equal except 6; re-run singly: shop-fix and thieu-le are flaky on both builds (branch now 0/0, main thieu-le 1); cloud-save, log-sync, opt-render, rel-row pass on the branch and fail/time out only on main's run. No branch-only failure. (~200 tests exit non-zero on BOTH builds because they need other args — symmetric, not this branch.)
- coop-e2e (live Worker): main 59/59; branch run 1 59/60 («fold #next enabled» while «Chờ hảo hữu…», next step passed = sync timing), run 2 59/59. PASS.
- Waiting for s14 GO → re-merge main → "READY <sha>".

## READY 16/11 ~12:30Z (s16 GO)
- Re-merged main a5d9d2b → **READY b85cdb1ef**. promo-skip 12/12, reign 755+1180 PASS, promo-next-rank ok, boot clean.
- PRE-EXISTING on main a5d9d2b (fails identically on main alone): promo-rules.js rank-up chest «Phẩm phục …» and servant person reveal screens do not show (3 FAIL). Not this branch; reported to s16.
