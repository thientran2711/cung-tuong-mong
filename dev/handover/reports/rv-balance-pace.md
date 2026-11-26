# rv-balance-pace — PASS c0f41387

PRIORITY #1 CHECK: OD 2540–2541 (k19 balance order, verbatim; 2541 also asks a measured table + options) + OD:L353 («KEEP the current speed … HH ~188 weeks», to be canon-overwritten) + OD L1483 («tài lên 100 quá nhanh»: 100 stays a lifetime mastery) + OD 25/11 ~23:48Z k18 (Năm bậc rows overlap → TÀI NGHỆ INFO, not this branch) | main 5e013076: BAL.art (jbal2), jbalcore crsPush, j23 resumeMG (typed ×.6), jtd tdPoints (typed), jtabs `[pts,100]` | review/promo-root 8169d9da (BIG PASS, rv-promo-root.md), review/balance-pace 2ddc495d (this) | claims: BALANCE-PACE session_01V1ZZH2xHnePtdE8gX8y2wU

Reviewer: RV-BALANCE-PACE (BIG review), for MAIN CHÍNH 150. Read: START_CORE (18 laws) + START_WORKER + START_REVIEWER, reports/balance-pace.md (on the branch), OD rows above, diff 1623b417..2ddc495d (13 build files).

**PASS sha c0f41387** = review/balance-pace-r1 (pushed): merge of review/promo-root 8169d9da (its report commit) onto 2ddc495d. Parents: 2ddc495d → 1623b417 → 5e013076 = origin/main now ⇒ MAIN can fast-forward main to c0f41387 and lands promo-root + balance-pace together. No code change by me. Merge-tree: 2ddc495d onto 8169d9da clean; onto LIVE 5e013076 clean (it is the merge base). Fresh assemble.py / build_site.sh reproduce index.html (only the CTM_BI line).

## 1. Law 4 — one core
- Every changed number reads BAL: BAL.art.gain [2,1.5,1.1,.9,.8], BAL.art.les {self:1,min:1} + BAL.tchMin through ONE rule jbalcore lesG (her j23 lesson, j83 quick, NPC j85 npcStudyDo); BAL.td.pts {self:[1,1,2,3], m:[2,2,3,4]} through jbalcore tdPts / jtd tdPoints (raw bands BAL.mgTier.lessonPts); bar = crsProg (phần inside the bậc / crsNeedP), Năm bậc rows = crsNeedP.
- Every lesson / quick button word now prints crsGainW / kStepW(lesG|tdPoints): jtabs ×5, j23 ×3, j85 ×5, jtds ×4, jrcp ×3, j83 ×3, j5, jtd ×2. Checked in game: Tài nghệ «tiến bộ một đến ba phần» (self), «hai đến bốn phần» (thầy / ma ma), Thái hậu «một đến ba phần» — each = lesG/tdPts at game points 1 and 3.
- Scan of all j*.js for «tiến bộ <typed number>»: none left in a lesson/quick button of the game. Left (pre-existing, not lesson buttons, NOT blocking — next whole-group pass):
  a. j24.js:51 event reward «nhạc sư chỉ ngón đàn: Cầm tiến bộ +1» + addArt("cam",1) typed.
  b. j85.js:144 NPC fallback when mg2 is off (co-op guest seat without AG): `g=1` / `2+R(2)` typed, not lesG (in solo/host play mg2 is on → lesG is used).
  c. Kit sample pages only (not game): jgrey.js:36 «+2..3», jkitpage.js:23 / jksize.js:189 «một hai phần» demo text.
  d. Lesson multipliers not in the button words: danh sư (j2 hireMaster S.master, ×2 for 3 months, text «3 tháng … gấp đôi» typed) and jkc «Mời danh sư … nhanh gấp rưỡi». While active, the real gain is higher than the button says (was so before too).
  (j2.js:184 «Học hỏi y lý … một phần» is dead: jact.js:67 filters it out.)

## 2. Law 2 — two-way
npcStudyDo uses lesG(paid?"teacher":"self", wkLessonPts(draw)) for arts and tdPoints(paid?"master":"self", draw) for Tứ đức = her rule; addArtP/addVir → crsPush = her ladder. balance-pace.js «NPC lesson uses lesG and moves her courses» ok. NPC mean art points at the end of the lives rise with hers (A good-hand re-run 42; worker 44). Note b above (mg2-off fallback).

## 3. Law 5 — harder as she climbs
Holds: gain per lesson point falls by bậc (2 → .8) and tier widths grow (10/15/20/25/30) ⇒ phần per bậc 5/10/19/28/38. No minigame / board file touched (diff = 13 files, none in jmgt/j82/j91/j92 board ease); boards still harden with rank (BAL.mgTier ease by rank-steps), and a harder board means fewer lesson points per play.
Law 3 / 2 (choices): self = g, teacher = g+1 (costs Bạc), Thái hậu = g (+3 Thái hậu, morning only, needs 40). Thái hậu was ≥ self before and still is; the gap to the teacher widened by 1 (teacher 4 vs Thái hậu 3 at a good game) — Thái hậu keeps her own gain (favour, no Bạc). Acceptable, noted.

## 4. Re-measure
- In-game ladder (my script on the branch build, crsPush + lesG, BAL.art.gain swapped): A good 2/5/12/21/33, avg 3/8/17/31/50, teacher good 2/4/9/16/25; B good 2/4/9/15/24, avg 2/6/13/23/36, teacher 1/3/7/12/18; C good 3/7/16/28/45, avg 4/11/23/42/67, teacher 2/6/12/21/34; phần per bậc A 5/10/19/28/38, B 4/8/14/20/28, C 7/14/25/39/50. = report table exactly. pace-calc.py same.
- Lives, dev/measure/pace.js, option A, «sens» bot, 4 seeds × 96 months (CAP 900 s/seed cut the horizon to 85.5 mo good / 78 mo avg on this box):

| run | first bậc 1 | first bậc 3 (reach) | Tông sư (reach) | bậc sum 1 y / 3 y / end | NPC art mean end | Tần | Phi | Quý phi | HH | lessons/mo |
|---|---|---|---|---|---|---|---|---|---|---|
| worker A good (96 mo) | 3 mo | 27 mo (96 %) | 65 mo (54 %) | 21 / 34.5 / 53 | 44 | 5.5 (4/4) | 26 (4/4) | 26 (3/4) | 66 (1/4) | ~3 |
| rv A good (85.5 mo) | 4 mo | 20 mo (81 %) | 58 mo (62 %) | 23 / 35.5 / 49 | 42 | 16.5 (4/4) | 21 (3/4) | 73 (3/4) | – (0/4) | 3.0 |
| rv A avg (78 mo) | 5 mo | 28 mo (71 %) | 81 mo (23 %) | 16.5 / 28.5 / 38 | 37 | 29 (4/4) | 37 (2/4) | 24 (1/4) | 79 (1/4) | 3.3 |

  Course pace reproduces within noise (bot lives are timer-driven, the seed does not fix them). Rank cells do NOT reproduce (Tần 5.5 → 16.5 mo; HH 1/4 → 0/4 good, 1/4 avg): 4 lives is noise for rank, as the worker says; the rank road is PROMO-ROOT's, unchanged here.

## 5. The k19 target — plain answer
- «A good player sees a level within a few days of play»: YES with A. A good hand reaches Nhập môn after 2 self-study games (4 khắc = the first day), bậc 2 after 5 games; one course to Tông sư in ~33 good games (~4 game days if she only studies it); bars now say «3/5» inside the bậc, not «2/100».
- «A real path to Hoàng hậu in one life»: A does not change it and does not claim to. HH is reached in 1 of 4 lives in the worker's runs and in 1 of 8 of mine (horizon ≤ 96 months); the HH road is set by Sủng/Danh/seat rules (PROMO-ROOT). So: skills — met; HH — a path exists but is rare in bot lives and needs a separate rank-pace measure with more lives (≥ 12) if sếp wants it judged.

## 6. Gates (on c0f41387)
- balance-pace.js PASS (all 11 ok, prints the A table). balance-core.js PASS 39/39.
- quickcheck (alone): CORE GATES FAIL only G4 90-button-crawl «Ô lưu · Lui» (pre-existing on LIVE, per brief); time-spill PASS; open 1923 ms, old LIVE save loads + plays a buổi, 0 errors; perf median new/live render 234/265, tab 567/521, buổi 2678/1924 (live runs 1432–5116: noise), tasks>200 27/25 → QUICKCHECK body PASS. A first quickcheck run also showed dialog-fixed #71 (Fold L dialog 538 vs 560) — flake: dialog-fixed.js alone PASS on the branch and on LIVE, and the second quickcheck run passed it.
- mg-back: 11/12 — FAIL 1 «jts Hoàng thượng triệu» rules ✕ onTop:false. Same FAIL on LIVE 5e013076 (run twice each) ⇒ pre-existing, not this branch (worker wrote 12/12; not reproduced here).
- coop-e2e 143/143.

## 7. Shots (looked at; scratch only, not in git)
Fold 755×1000 + iPad 1180×820, Tài nghệ tab (Tứ đức, Cầm kỳ thi họa) + «Năm bậc» card:
- Bars «0/5», «3/19», «3/10» — no «/100»; buttons «tiến bộ một đến ba phần» / «hai đến bốn phần»; cổ trang, no %, VANPHONG ok. Kit cards unchanged (no new UI part).
- «Năm bậc»: «Bậc 1 · Nhập môn · 5 phần … Bậc 5 · Tông sư · 38 phần» (phần of THAT bậc, same unit as the bar). The row label and reward still draw ON TOP of each other on both devices — identical on LIVE (owner k18 bug, OD ~23:48Z → TÀI NGHỆ INFO). Not caused here; the owner will still see it until that lands.
- The card shows only the «Năm bậc» section: the «Ghi chú» rows (where the worker changed «Điểm x/100» → «Tiến bộ x/y phần tới bậc …») do not render in the dialog (LIVE the same). Hand to TÀI NGHỆ INFO with k18. Nit in that row: «… tới bậc 2 · Chưa thạo» prints the CURRENT bậc name after the NEXT bậc number — should be artNm(l+1) or drop it.
- The worker's video was not re-checked (CDN); wipe review/balance-pace on land: `python3 dev/site/cdn_sync.py --wipe-review balance-pace`.

## 8. For MAIN
- Options for sếp (only BAL.art.gain differs; switching = one line): A [2,1.5,1.1,.9,.8] (on the branch), B [2.8,2.1,1.5,1.25,1.1], C [1.5,1.1,.8,.65,.6].
- Law 16 / 14: OD:L353 («KEEP the current speed … don't speed up») is a working owner rule this branch changes. It must be overwritten IN PLACE with her 25/11 ~23:52Z ruling + the option she picks; ask her (A/B/C) before or at landing — do not land silently over L353.
- Follow-ups (not blocking): §1 a–d whole-group typed numbers; HH rank pace = PROMO-ROOT / a larger rank measure.
