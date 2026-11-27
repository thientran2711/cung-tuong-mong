# BIG REVIEW — review/rank-pace 548ef991 (D-RANKPACE) · reviewer session_01D3E3NX4yGtbqu67TN3HAQt (opus) · 27/11
PRIORITY #1 CHECK: OD PROMO-HIST 24/11 + MAIN 171 ORDER ~04:40Z (1) | main 98c77517 (then 0562e15f) jexam exTick + exSrvOpen = the only 2 window openers (scan re-run) | review/rank-pace 548ef991 on base review/promo-stack-lr4 e2c5d5ae; promo-stack remerge d79c08b5 not final | claims D-RANKPACE (Foreman D).
KIT CHECK: reuses the kit event card (Q item ev:1, kopt options, odds meter, kback «Để sau»); no new chip / row / frame. `dev/test/kit-std-scan.js` + KIT_CHECKLIST.md do not exist on main or the handover branch (KIT-STD-AUDIT not landed) → scan not runnable; the face was checked by eye on Fold + iPad.

## VERDICT: PASS on the rank-pace delta (with one law-4 fix by the reviewer) · LAND READY sha: NOT YET
The final merge waits for the final promo-stack-lr4 sha (Foreman D: successor session_01D3E3NbMdjyPsvcEGgZBrQ1 sends it). Then: merge review/rank-pace-rv onto it, rebuild, assets.json = LIVE, re-run rank-pace.js + quickcheck + coop-e2e (compare = LIVE), give the LAND READY sha.
Delta branch to merge: **review/rank-pace-rv 1aa79863** = 548ef991 + reviewer fix (below).

## Reviewer fix (small, on review/rank-pace-rv)
1. LAW 4: `exAskCdW` returned `n*3` (typed tuần-per-month) when `pbWkIn` was missing → now `pbWkIn(n)` only, the same reader as the Hành sự card (`cardH`). rank-pace.js ALL PASS after.

## Laws touched
- Law 2 (tiers): «Thi ngay» / «Để sau» = act now vs defer the one exam; different results, not two equal options. OK.
- Law 3: «Thi ngay» tốn Sức BAL.ex.suc + BAL.ex.k khắc, được thánh chỉ; «Để sau» = kback (defer, gain-only «giữ sức»). OK. The event face hides the «hỏng: chờ N tuần» row — that is KIT §28.6 (event choices show cost only) + kback name-only, not a branch fault; the Hành sự card still shows «trượt: chờ N tuần».
- Law 4: BAL.ex.win 3, BAL.ex.cdLapse 1, BAL.ex.k/suc; the typed fallback fixed (above).
- Law 5: exam bars (BAL.ex.bar, srvBar) and fail waits (cd[], srvCd[]) unchanged. Consort lapse = max(cdLapse, pbCdKy) = the kỳ wait (same as a fail) while the kỳ rule is on, so no loosening there. NOTE for D/MAIN (not a FAIL, numbers were GO'd): a serving maid's LAPSE now waits a flat 1 month where it waited srvCd[rank] (1→3); her fail wait still rises with rank.
- Law 7: odds word from oddsCl/word (KIT_ODDS, test (12)); no %.
- Laws 9–10: kit event card only. Law 12: Fold 755x1000 + iPad 1180x820 shots looked at (below).

## Gates
| gate | result |
|---|---|
| dev/test/rank-pace.js (scan + 12 cases, incl. old save open/lapsed window) | ALL PASS on 548ef991, on 1aa79863 and on the LIVE-merged build 080cf511 (local merge with LIVE 98c77517; j63 resultShow conflict = LIVE kaSenDeTitle + stack KAK rows) |
| promo-exam.js Fold+iPad, base e2c5d5ae vs 548ef991 | 18/20 vs 18/20, same 2 baseline FAILs (card Tốn+fail text, result frame) |
| quickcheck on 080cf511 | open 1842 ms 0 errors · old save from LIVE loads + plays a buổi · perf median new/live render 220/240, tab 546/602, buổi 1151/1389, tasks>200 27/27 · core gate G4 dialog-fixed 1 FAIL (Fold XL figure) = pre-existing: LIVE 98c77517 itself has 4 FAIL, base e2c5d5ae 0 |
| coop-e2e alone, COOP_EXAM=1 | merged 080cf511: stops after 29 ok (browser closed in buoiBoth) = LIVE (Foreman D: LIVE 611fca61 breaks the same way). 548ef991: 139/143, 4 FAIL «same world» S.fidUsed maid figures (coop-host-lag family, code not touched by this branch); exam probe skipped (both seats rolled serving-maid lives → no consort window). Worker's run: 151/151 with the probe on both seats. Re-run on the final sha. |
| robot rank-pace.js 3 lives × 60 months, base e2c5d5ae vs 548ef991 | below |

Robot (one life per side died at turn 0 in «before noexam», «before even» and «after even» = harness noise):
| profile | before: max rank · exams sat/pass · lapses · examCd unmet | after |
|---|---|---|
| NOEXAM | [1,2,5] · 0/0 · 13 lapses · examCd 30 % of months | [4,2,6] · 13/12 · 0 lapses · examCd 1 % |
| even | [6,7,6] · 18/17 · 0 | [6,6,7] · 27/23 · 0 (same within noise) |
Agrees with the worker's table: the exam row stops being the bottleneck; higher ranks are still held by kỳ wait, Hoàng hậu block and seats (law 5).

## Shots (scratch only, not in git; worker's CDN set img/_review/rank-pace/ fetched and looked at: 10 files, all served)
Merged build, Fold + iPad: window card «Khảo hạch tấn phong» (odds meter Rất vững, TỐN Sức 8 · 2 khắc, ĐƯỢC thánh chỉ, «Để sau» compact); last-tuần «Sắp hết hạn khảo hạch»; «Thi ngay» → exam board (Môn 1/2) with LIVE's RESULT FIRST card «KẾT QUẢ Thi ngay · Mất Sức −8» on top (LIVE ob-verdict-3 rule, same family as every choice); «Để sau» → the card stays in Hành sự. No page errors, no overflow seen.
Note: in play the card waits for the day-queue natural break (dayq DQ hold), like every dialog.

## Open (not this branch)
- coop-e2e on LIVE breaks after ~28–29 ok (Foreman D aware).
- dialog-fixed G4 FAIL on LIVE.
- C (exam for ranks 0→2) = sếp question via MAIN; D = Foreman F rt-offer.js «Lễ tấn phong <NPC>».
